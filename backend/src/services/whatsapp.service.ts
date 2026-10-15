import https from 'https';

export interface WhatsAppMessageResult {
  success: boolean;
  mode: 'cloud_api' | 'click_to_chat';
  webUrl: string;
  message?: string;
  error?: string;
}

export class WhatsAppService {
  private static get apiToken(): string {
    return process.env.WHATSAPP_TOKEN || process.env.WHATSAPP_API_TOKEN || '';
  }
  private static get phoneNumberId(): string {
    return process.env.WHATSAPP_PHONE_NUMBER_ID || process.env.WHATSAPP_PHONE_ID || '';
  }
  public static get businessPhone(): string {
    return process.env.WHATSAPP_BUSINESS_PHONE || '+9187XXXXX001';
  }
  private static get frontendUrl(): string {
    return (process.env.FRONTEND_URL || 'http://localhost:3000').split(',')[0].trim();
  }

  /**
   * Builds the formatted message text for a royal order.
   */
  public static buildOrderMessage(order: {
    orderNumber: string;
    customerName: string;
    totalAmount: number;
    paymentMethod: string;
    deliveryAddress: string;
    items?: Array<{ name: string; quantity: number }>;
  }, branchName: string): string {
    const itemsList = order.items && order.items.length > 0
      ? order.items.map(i => `• ${i.name} (x${i.quantity})`).join('\n')
      : '• Signature Palegar Royal Feast';

    return `👑 *KRITUNGA THE PALEGAR'S CUISINE*
*Royal Feast Confirmed!* 🏺🔥

*Order ID:* ${order.orderNumber}
*Honored Guest:* ${order.customerName}
*Royal Stronghold:* ${branchName}
*Items:*
${itemsList}

*Grand Total:* ₹${order.totalAmount} (${order.paymentMethod.toUpperCase()})
*Delivery to:* ${order.deliveryAddress}

*Track Live Earthen Dum Preparation:*
${this.frontendUrl}/track/${order.orderNumber}

_Crafted in earthen handis over natural wood embers since 1999._`;
  }

  /**
   * Builds the formatted message text for table reservations.
   */
  public static buildReservationMessage(reservation: {
    bookingNumber: string;
    guestName: string;
    partySize: number;
    reservationDate: string;
    timeSlot: string;
    tableType: string;
  }, branchName: string, branchAddress: string): string {
    return `👑 *KRITUNGA THE PALEGAR'S CUISINE*
*Table Reserved Successfully!* 🏛️✨

*Booking Reference:* ${reservation.bookingNumber}
*Honored Guest:* ${reservation.guestName}
*Banquet Party:* ${reservation.partySize} Guests
*Imperial Seating:* ${reservation.tableType}
*Date & Slot:* ${reservation.reservationDate} • ${reservation.timeSlot}

*Royal Stronghold:*
${branchName}
${branchAddress}

_We eagerly await your imperial arrival._`;
  }

  /**
   * Builds formatted message text for royal convention & banquet hall bookings.
   */
  public static buildConventionMessage(convention: {
    bookingNumber: string;
    organizerName: string;
    eventType: string;
    hallPreference: string;
    expectedGuests: number;
    eventDate: string;
    timeSlot: string;
    cateringPreference: string;
  }, branchName: string): string {
    return `👑 *KRITUNGA PALACE CONVENTIONS & BANQUETS*
*Royal Event Booking Inquiry Received!* 🏛️🎉

*Inquiry Reference:* ${convention.bookingNumber}
*Event Organizer:* ${convention.organizerName}
*Celebration Type:* ${convention.eventType}
*Grand Hall:* ${convention.hallPreference}
*Expected Guests:* ${convention.expectedGuests} Guests
*Event Date & Slot:* ${convention.eventDate} • ${convention.timeSlot}
*Catering Style:* ${convention.cateringPreference}

*Royal Stronghold:* ${branchName}

_Our Royal Banquet Concierge will contact you within 2 business hours with layout options, tasting session arrangements, and custom banquet proposals._`;
  }

  /**
   * Generates a zero-cost click-to-chat WhatsApp link.
   */
  public static generateWebUrl(phone: string, text: string): string {
    // Strip non-digits except leading +
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const encodedText = encodeURIComponent(text);
    return cleanPhone
      ? `https://wa.me/${cleanPhone}?text=${encodedText}`
      : `https://wa.me/?text=${encodedText}`;
  }

  /**
   * Dispatches WhatsApp notification (via Meta Cloud API if token exists, or returns WebUrl).
   */
  public static async notifyCustomer(
    customerPhone: string,
    messageText: string,
    destinationBusinessPhone?: string
  ): Promise<WhatsAppMessageResult> {
    // In Click-to-Chat mode on the website, the user clicking is the customer.
    // The link opens a chat TO the restaurant business phone so the customer sends the booking to the restaurant.
    const chatRecipient = destinationBusinessPhone || this.businessPhone;
    const webUrl = this.generateWebUrl(chatRecipient, messageText);

    // If Cloud API credentials exist, attempt real programmatic dispatch
    if (this.apiToken && this.phoneNumberId) {
      try {
        const cleanPhone = customerPhone.replace(/[^0-9]/g, '');
        const payload = JSON.stringify({
          messaging_product: 'whatsapp',
          to: cleanPhone,
          type: 'text',
          text: { preview_url: true, body: messageText }
        });

        const success = await this.sendViaCloudApi(payload);
        if (success) {
          console.log(`[WhatsApp API] Notification sent to ${cleanPhone}`);
          return {
            success: true,
            mode: 'cloud_api',
            webUrl,
            message: 'Notification sent via WhatsApp Cloud API.'
          };
        }
      } catch (err: any) {
        console.warn('[WhatsApp API] Cloud API error, fallback to click-to-chat:', err.message);
      }
    }

    // Default zero-cost mode
    console.log(`[WhatsApp Service] Generated click-to-chat link for ${customerPhone}`);
    return {
      success: true,
      mode: 'click_to_chat',
      webUrl,
      message: 'Click-to-chat WhatsApp receipt link generated.'
    };
  }

  private static sendViaCloudApi(payload: string): Promise<boolean> {
    return new Promise((resolve) => {
      const options = {
        hostname: 'graph.facebook.com',
        path: `/v18.0/${this.phoneNumberId}/messages`,
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiToken}`,
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(payload)
        }
      };

      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
            resolve(true);
          } else {
            console.warn('[WhatsApp Cloud API] Rejected:', data);
            resolve(false);
          }
        });
      });

      req.on('error', (e) => {
        console.warn('[WhatsApp Cloud API] Request failed:', e.message);
        resolve(false);
      });

      req.write(payload);
      req.end();
    });
  }
}

export default WhatsAppService;
