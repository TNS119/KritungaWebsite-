import { Router, Request, Response } from 'express';
import prisma from '../services/db.service';
import WhatsAppService from '../services/whatsapp.service';

const router = Router();

// GET /api/orders/outlets - Get list of active restaurant branches
router.get('/outlets', async (_req: Request, res: Response) => {
  try {
    const outlets = await prisma.outlet.findMany({
      where: { isActive: true },
      orderBy: { city: 'asc' }
    });
    res.json({ success: true, data: outlets });
  } catch (err: any) {
    console.error('Error fetching outlets:', err);
    res.status(500).json({ success: false, message: 'Could not fetch outlets.' });
  }
});

// POST /api/orders - Place a new royal feast order with Prisma persistence & WhatsApp receipt
router.post('/', async (req: Request, res: Response) => {
  try {
    const {
      customerName,
      customerPhone,
      customerEmail,
      deliveryAddress,
      outletId,
      spicePreference,
      paymentMethod,
      items,
      extraRagiMudda,
      extraDoubleKaMeetha
    } = req.body;

    if (!customerName || !customerPhone || !deliveryAddress) {
      return res.status(400).json({
        success: false,
        message: 'Guest name, phone, and delivery address are required.'
      });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Order must contain at least one item.'
      });
    }

    // Resolve or fallback outlet
    let chosenOutletId = outletId;
    if (!chosenOutletId) {
      const defaultOutlet = await prisma.outlet.findFirst({ where: { isActive: true } });
      chosenOutletId = defaultOutlet?.id || 'nalgonda-flagship';
    }

    const outlet = await prisma.outlet.findUnique({ where: { id: chosenOutletId } });

    // Calculate item pricing from database where possible
    let totalBase = 0;
    const orderItemsData: Array<{
      menuItemId?: string;
      name: string;
      quantity: number;
      unitPrice: number;
      addons?: string;
    }> = [];

    for (const item of items) {
      let unitPrice = item.price || 449;
      let itemName = item.name || 'Palegar Special Dish';

      if (item.productId) {
        const dbProduct = await prisma.menuItem.findUnique({ where: { id: item.productId } });
        if (dbProduct) {
          unitPrice = dbProduct.price;
          itemName = dbProduct.name;
        }
      }

      const qty = Math.max(1, item.quantity || 1);
      totalBase += unitPrice * qty;

      const addonsList: string[] = [];
      if (extraRagiMudda) addonsList.push('Extra Ghee Ragi Mudda (+₹90)');
      if (extraDoubleKaMeetha) addonsList.push('Royal Double Ka Meetha (+₹120)');

      orderItemsData.push({
        menuItemId: item.productId,
        name: itemName,
        quantity: qty,
        unitPrice,
        addons: addonsList.length > 0 ? JSON.stringify(addonsList) : undefined
      });
    }

    // Add-on calculation
    const qtyTotal = orderItemsData.reduce((acc, curr) => acc + curr.quantity, 0);
    const addonsCost = (extraRagiMudda ? 90 * qtyTotal : 0) + (extraDoubleKaMeetha ? 120 * qtyTotal : 0);
    const subtotal = totalBase + addonsCost;
    const deliveryFee = subtotal > 1000 ? 0 : 49;
    const grandTotal = subtotal + deliveryFee;

    // Generate unique royal order number e.g. KRIT-918234
    const orderNumber = `KRIT-${Math.floor(100000 + Math.random() * 900000)}`;

    const newOrder = await prisma.order.create({
      data: {
        orderNumber,
        outletId: chosenOutletId,
        customerName,
        customerPhone,
        customerEmail: customerEmail || null,
        deliveryAddress,
        spicePreference: spicePreference || 'Authentic Palegar Fire (Signature)',
        paymentMethod: paymentMethod || 'upi',
        totalAmount: grandTotal,
        deliveryFee,
        status: 'CONFIRMED',
        paymentStatus: paymentMethod === 'cod' ? 'PENDING' : 'SUCCESS',
        items: {
          create: orderItemsData
        }
      },
      include: {
        outlet: true,
        items: true
      }
    });

    // Build & trigger WhatsApp notification
    const branchName = outlet ? outlet.name : 'Kritunga Palegar Kitchen';
    const waText = WhatsAppService.buildOrderMessage({
      orderNumber: newOrder.orderNumber,
      customerName: newOrder.customerName,
      totalAmount: newOrder.totalAmount,
      paymentMethod: newOrder.paymentMethod,
      deliveryAddress: newOrder.deliveryAddress,
      items: newOrder.items.map(i => ({ name: i.name, quantity: i.quantity }))
    }, branchName);

    const waResult = await WhatsAppService.notifyCustomer(newOrder.customerPhone, waText);

    res.status(201).json({
      success: true,
      message: 'Palegar Royal Feast dispatched successfully!',
      order: {
        ...newOrder,
        whatsappUrl: waResult.webUrl,
        whatsappMode: waResult.mode
      }
    });
  } catch (err: any) {
    console.error('Error creating order:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to create royal order.',
      error: err.message
    });
  }
});

// GET /api/orders/:orderNumber - Fetch specific order details
router.get('/:orderNumber', async (req: Request, res: Response) => {
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
        message: `Order '${orderNumber}' not found.`
      });
    }

    res.json({ success: true, data: order });
  } catch (err: any) {
    console.error('Error fetching order:', err);
    res.status(500).json({ success: false, message: 'Could not fetch order.' });
  }
});

export default router;
