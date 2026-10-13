import { Router, Request, Response } from 'express';
import prisma from '../services/db.service';
import WhatsAppService from '../services/whatsapp.service';

const router = Router();

// Order lifecycle stages
const STAGES = [
  { key: 'CONFIRMED', label: 'Order Confirmed', step: 1, percent: 25, desc: 'Your royal order has been received by the kitchen.' },
  { key: 'PREPARING_DUM', label: 'Braising in Earthen Dum', step: 2, percent: 55, desc: 'Sealed with dough over glowing wood embers for maximum aromatic infusion.' },
  { key: 'OUT_FOR_DELIVERY', label: 'Out for Royal Dispatch', step: 3, percent: 85, desc: 'Hot clay handi caskets in tamper-proof thermal packaging.' },
  { key: 'DELIVERED', label: 'Feast Arrived at Palace', step: 4, percent: 100, desc: 'Delivered hot to your dining table. Enjoy the Palegar feast!' }
];

// GET /api/orders/track/:orderNumber - Fetch live tracking details
router.get('/track/:orderNumber', async (req: Request, res: Response) => {
  try {
    const { orderNumber } = req.params;

    const order = await prisma.order.findUnique({
      where: { orderNumber },
      include: {
        outlet: true,
        items: true
      }
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: `Order #${orderNumber} not found.`
      });
    }

    // Determine current stage & timing
    const currentStage = STAGES.find(s => s.key === order.status) || STAGES[0];
    const createdAtTime = new Date(order.createdAt).getTime();
    const elapsedMinutes = Math.max(0, Math.floor((Date.now() - createdAtTime) / 60000));
    const remainingMinutes = Math.max(5, order.estimatedMinutes - elapsedMinutes);

    // Generate WhatsApp direct link for customer queries
    const branchName = order.outlet ? order.outlet.name : 'Kritunga Palegar Kitchen';
    const waText = WhatsAppService.buildOrderMessage({
      orderNumber: order.orderNumber,
      customerName: order.customerName,
      totalAmount: order.totalAmount,
      paymentMethod: order.paymentMethod,
      deliveryAddress: order.deliveryAddress,
      items: order.items.map(i => ({ name: i.name, quantity: i.quantity }))
    }, branchName);
    const waUrl = WhatsAppService.generateWebUrl(order.customerPhone, waText);

    res.json({
      success: true,
      data: {
        order,
        tracking: {
          currentStage,
          stages: STAGES,
          elapsedMinutes,
          remainingMinutes,
          whatsappUrl: waUrl
        }
      }
    });
  } catch (err: any) {
    console.error('Error tracking order:', err);
    res.status(500).json({ success: false, message: 'Could not track order.' });
  }
});

// PATCH /api/orders/track/:orderNumber/status - Admin endpoint to advance order status
router.patch('/track/:orderNumber/status', async (req: Request, res: Response) => {
  try {
    const { orderNumber } = req.params;
    const { status } = req.body;

    const validStatuses = ['CONFIRMED', 'PREPARING_DUM', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED'];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
      });
    }

    const updated = await prisma.order.update({
      where: { orderNumber },
      data: { status }
    });

    res.json({
      success: true,
      message: `Order #${orderNumber} updated to ${status}`,
      data: updated
    });
  } catch (err: any) {
    console.error('Error updating order status:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
