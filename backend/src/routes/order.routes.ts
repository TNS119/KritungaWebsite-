import { Router, Request, Response } from 'express';
import { CreateOrderRequest, OrderResponse } from '../types';
import { MENU_ITEMS } from '../data/menuData';

const router = Router();

// In-memory order store
const orders = new Map<string, OrderResponse>();

// POST /api/orders - Place a new royal feast order
router.post('/', (req: Request, res: Response) => {
  const body: CreateOrderRequest = req.body;

  if (!body.customerName || !body.customerPhone || !body.customerAddress) {
    return res.status(400).json({
      success: false,
      message: 'Missing customer details (name, phone, or address are required).'
    });
  }

  if (!body.items || !Array.isArray(body.items) || body.items.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Order must contain at least one item.'
    });
  }

  let totalAmount = 0;
  let itemsCount = 0;

  for (const item of body.items) {
    const product = MENU_ITEMS.find((p) => p.id === item.productId);
    const itemPrice = product ? product.price : 449;
    const qty = Math.max(1, item.quantity || 1);
    totalAmount += itemPrice * qty;
    itemsCount += qty;
  }

  const orderId = `PLG-${Math.floor(100000 + Math.random() * 900000)}`;
  const order: OrderResponse = {
    orderId,
    status: 'confirmed',
    customerName: body.customerName,
    customerPhone: body.customerPhone,
    totalAmount,
    itemsCount,
    estimatedDeliveryMinutes: 45,
    createdAt: new Date().toISOString()
  };

  orders.set(orderId, order);

  res.status(201).json({
    success: true,
    message: 'Royal Palegar feast order placed successfully!',
    order
  });
});

// GET /api/orders/:id - Get order details
router.get('/:id', (req: Request, res: Response) => {
  const order = orders.get(req.params.id);
  if (!order) {
    return res.status(404).json({
      success: false,
      message: `Order '${req.params.id}' not found.`
    });
  }

  res.json({
    success: true,
    data: order
  });
});

export default router;
