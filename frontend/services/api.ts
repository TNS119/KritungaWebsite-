// Type-safe API client for Kritunga Palegar Cuisine

const isServer = typeof window === 'undefined';
const API_BASE = process.env.NEXT_PUBLIC_API_URL
  ? process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, '')
  : isServer
    ? 'http://localhost:5000'
    : '';


export interface Outlet {
  id: string;
  name: string;
  city: string;
  address: string;
  phone: string;
  isActive: boolean;
}

export interface OrderItemPayload {
  productId?: string;
  name: string;
  quantity: number;
  price: number;
}

export interface CreateOrderPayload {
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  deliveryAddress: string;
  outletId: string;
  spicePreference: string;
  paymentMethod: 'upi' | 'card' | 'cod';
  items: OrderItemPayload[];
  extraRagiMudda: boolean;
  extraDoubleKaMeetha: boolean;
}

export interface OrderResponseData {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress?: string;
  spicePreference?: string;
  totalAmount: number;
  deliveryFee: number;
  paymentStatus: string;
  paymentMethod: string;
  status: string;
  estimatedMinutes: number;
  createdAt: string;
  outlet?: Outlet;
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    unitPrice: number;
  }>;
  whatsappUrl?: string;
  whatsappMode?: string;
}

export interface ReservationPayload {
  guestName: string;
  guestPhone: string;
  guestEmail?: string;
  outletId: string;
  partySize: number;
  reservationDate: string;
  timeSlot: string;
  tableType: string;
  specialRequests?: string;
}

export interface ReservationResponseData {
  id: string;
  bookingNumber: string;
  guestName: string;
  guestPhone: string;
  partySize: number;
  reservationDate: string;
  timeSlot: string;
  tableType: string;
  status: string;
  outlet?: Outlet;
  whatsappUrl?: string;
}

export interface ConventionPayload {
  organizerName: string;
  organizerPhone: string;
  organizerEmail?: string;
  companyName?: string;
  eventType: string;
  hallPreference: string;
  expectedGuests: number;
  eventDate: string;
  timeSlot: string;
  cateringPreference: string;
  additionalServices?: string[];
  specialRequests?: string;
  outletId?: string;
  estimatedBudget?: string;
}

export interface ConventionResponseData {
  id: string;
  bookingNumber: string;
  organizerName: string;
  organizerPhone: string;
  organizerEmail?: string;
  companyName?: string;
  eventType: string;
  hallPreference: string;
  expectedGuests: number;
  eventDate: string;
  timeSlot: string;
  cateringPreference: string;
  additionalServices?: string;
  specialRequests?: string;
  status: string;
  outlet?: Outlet;
  whatsappUrl?: string;
  whatsappMode?: string;
  createdAt: string;
}

export interface TrackingData {
  order: OrderResponseData;
  tracking: {
    currentStage: {
      key: string;
      label: string;
      step: number;
      percent: number;
      desc: string;
    };
    stages: Array<{
      key: string;
      label: string;
      step: number;
      percent: number;
      desc: string;
    }>;
    elapsedMinutes: number;
    remainingMinutes: number;
    whatsappUrl?: string;
  };
}

export const api = {
  // Outlets
  getOutlets: async (): Promise<Outlet[]> => {
    try {
      const res = await fetch(`${API_BASE}/api/orders/outlets`);
      const json = await res.json();
      return json.success ? json.data : [];
    } catch (err) {
      console.error('Failed to load outlets:', err);
      return [];
    }
  },

  // Orders
  createOrder: async (payload: CreateOrderPayload): Promise<{ success: boolean; message: string; order?: OrderResponseData }> => {
    const res = await fetch(`${API_BASE}/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return res.json();
  },

  getOrder: async (orderNumber: string): Promise<OrderResponseData | null> => {
    const res = await fetch(`${API_BASE}/api/orders/${orderNumber}`);
    const json = await res.json();
    return json.success ? json.data : null;
  },

  trackOrder: async (orderNumber: string): Promise<TrackingData | null> => {
    const res = await fetch(`${API_BASE}/api/orders/track/${orderNumber}`);
    const json = await res.json();
    return json.success ? json.data : null;
  },

  // Reservations
  createReservation: async (payload: ReservationPayload): Promise<{ success: boolean; message: string; reservation?: ReservationResponseData }> => {
    const res = await fetch(`${API_BASE}/api/reservations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return res.json();
  },

  // Convention & Banquet Bookings
  createConventionBooking: async (
    payload: ConventionPayload
  ): Promise<{ success: boolean; message: string; booking?: ConventionResponseData }> => {
    const res = await fetch(`${API_BASE}/api/conventions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return res.json();
  },

  getConventionBooking: async (bookingNumber: string): Promise<ConventionResponseData | null> => {
    try {
      const res = await fetch(`${API_BASE}/api/conventions/${bookingNumber}`);
      const json = await res.json();
      return json.success ? json.data : null;
    } catch (err) {
      console.error('Failed to load convention booking:', err);
      return null;
    }
  },
};

export default api;

