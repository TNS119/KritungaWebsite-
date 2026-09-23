export interface ProductPack {
  id: string;
  name: string;
  subtitle: string;
  tag: string;
  price: number;
  originalPrice: number;
  portion: string;
  spiceLevel: number;
  description: string;
  highlights: string[];
  badges: string[];
  specs: {
    dumHours: string;
    spiceBlend: string;
    oilGhee: string;
    aromaProfile: string;
  };
}

export interface OrderItem {
  productId: string;
  quantity: number;
  spiceLevel: number;
  specialInstructions?: string;
}

export interface CreateOrderRequest {
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  items: OrderItem[];
  spiceLevel: number;
  paymentMethod: 'cod' | 'upi' | 'card';
}

export interface OrderResponse {
  orderId: string;
  status: 'confirmed' | 'preparing' | 'delivered';
  customerName: string;
  customerPhone: string;
  totalAmount: number;
  itemsCount: number;
  estimatedDeliveryMinutes: number;
  createdAt: string;
}

export interface ReservationRequest {
  guestName: string;
  guestPhone: string;
  guestEmail: string;
  partySize: number;
  reservationDate: string;
  reservationTime: string;
  specialRequests?: string;
}
