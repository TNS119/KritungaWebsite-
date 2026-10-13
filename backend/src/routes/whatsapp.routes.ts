import { Router, Request, Response } from 'express';
import { WhatsAppService } from '../services/whatsapp.service';
import prisma from '../services/db.service';

const router = Router();

// GET /api/whatsapp/webhook - Meta Cloud API webhook verification
router.get('/webhook', (req: Request, res: Response) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || 'kritunga_palegar_verify_token';

  if (mode && token) {
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('[WhatsApp Webhook] Verification successful');
      return res.status(200).send(challenge);
    }
    return res.sendStatus(403);
  }
  res.sendStatus(400);
});

// POST /api/whatsapp/webhook - Incoming events (e.g. delivery receipts)
router.post('/webhook', (req: Request, res: Response) => {
  const body = req.body;
  if (body.object) {
    console.log('[WhatsApp Webhook Event Received]:', JSON.stringify(body, null, 2));
    return res.status(200).send('EVENT_RECEIVED');
  }
  res.sendStatus(404);
});

// POST /api/whatsapp/order-receipt - Generate or dispatch receipt for order
router.post('/order-receipt', async (req: Request, res: Response) => {
  try {
    const { orderNumber } = req.body;
    if (!orderNumber) {
      return res.status(400).json({ success: false, message: 'orderNumber is required.' });
    }

    const order = await prisma.order.findUnique({
      where: { orderNumber },
      include: { outlet: true, items: true }
    });

    if (!order) {
      return res.status(404).json({ success: false, message: `Order ${orderNumber} not found.` });
    }

    const branchName = order.outlet ? order.outlet.name : 'Kritunga Palegar Kitchen';
    const message = WhatsAppService.buildOrderMessage({
      orderNumber: order.orderNumber,
      customerName: order.customerName,
      totalAmount: order.totalAmount,
      paymentMethod: order.paymentMethod,
      deliveryAddress: order.deliveryAddress,
      items: order.items.map(i => ({ name: i.name, quantity: i.quantity }))
    }, branchName);

    const result = await WhatsAppService.notifyCustomer(order.customerPhone, message);

    res.json({
      success: true,
      data: result
    });
  } catch (err: any) {
    console.error('WhatsApp order receipt error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
