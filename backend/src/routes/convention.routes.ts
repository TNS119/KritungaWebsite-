import { Router, Request, Response } from 'express';
import prisma from '../services/db.service';
import WhatsAppService from '../services/whatsapp.service';

const router = Router();

// GET /api/conventions/outlets - Get list of outlets available for convention & banquet hosting
router.get('/outlets', async (_req: Request, res: Response) => {
  try {
    const outlets = await prisma.outlet.findMany({
      where: { isActive: true },
      orderBy: { city: 'asc' }
    });
    res.json({ success: true, data: outlets });
  } catch (err: any) {
    console.error('Error fetching convention outlets:', err);
    res.status(500).json({ success: false, message: 'Could not fetch convention venues.' });
  }
});

// GET /api/conventions - List recent convention inquiries
router.get('/', async (req: Request, res: Response) => {
  try {
    const { status, outletId } = req.query;
    const whereClause: any = {};
    if (status && typeof status === 'string') {
      whereClause.status = status;
    }
    if (outletId && typeof outletId === 'string') {
      whereClause.outletId = outletId;
    }

    const bookings = await prisma.conventionBooking.findMany({
      where: whereClause,
      include: { outlet: true },
      orderBy: { createdAt: 'desc' },
      take: 50
    });

    res.json({ success: true, count: bookings.length, data: bookings });
  } catch (err: any) {
    console.error('Error listing convention bookings:', err);
    res.status(500).json({ success: false, message: 'Could not fetch convention records.' });
  }
});

// POST /api/conventions - Submit a royal convention & banquet hall booking inquiry
router.post('/', async (req: Request, res: Response) => {
  try {
    const {
      organizerName,
      organizerPhone,
      organizerEmail,
      companyName,
      eventType,
      hallPreference,
      expectedGuests,
      eventDate,
      timeSlot,
      cateringPreference,
      additionalServices,
      specialRequests,
      outletId,
      estimatedBudget
    } = req.body;

    if (!organizerName || !organizerPhone || !eventType || !expectedGuests || !eventDate || !timeSlot) {
      return res.status(400).json({
        success: false,
        message: 'Organizer name, phone, event type, guest count, event date, and time slot are required.'
      });
    }

    // Resolve outlet/branch
    let chosenOutletId = outletId;
    if (!chosenOutletId) {
      const defaultOutlet = await prisma.outlet.findFirst({ where: { isActive: true } });
      chosenOutletId = defaultOutlet?.id || 'nalgonda-flagship';
    }

    const outlet = await prisma.outlet.findUnique({ where: { id: chosenOutletId } });

    // Determine Hall Preference if not explicitly chosen
    const resolvedHall = hallPreference || (
      parseInt(expectedGuests, 10) > 300
        ? 'Grand Rayalaseema Palace Hall (300-800 Guests)'
        : parseInt(expectedGuests, 10) > 100
        ? 'Palegar Heritage Diwan (100-300 Guests)'
        : 'Royal Courtyard Pavilion (50-150 Guests)'
    );

    const resolvedCatering = cateringPreference || 'Signature Rayalaseema Pot Biryani & Royal Non-Veg Banquet';

    // Generate unique inquiry reference code, e.g. CNV-5928
    const bookingNumber = `CNV-${Math.floor(1000 + Math.random() * 9000)}`;

    const newConventionBooking = await prisma.conventionBooking.create({
      data: {
        bookingNumber,
        outletId: chosenOutletId,
        organizerName,
        organizerPhone,
        organizerEmail: organizerEmail || null,
        companyName: companyName || null,
        eventType,
        hallPreference: resolvedHall,
        expectedGuests: parseInt(expectedGuests, 10) || 50,
        eventDate,
        timeSlot,
        cateringPreference: resolvedCatering,
        additionalServices: additionalServices
          ? (typeof additionalServices === 'string' ? additionalServices : JSON.stringify(additionalServices))
          : null,
        specialRequests: specialRequests || null,
        estimatedBudget: estimatedBudget || null,
        status: 'REQUEST_RECEIVED'
      },
      include: {
        outlet: true
      }
    });

    // Generate Royal WhatsApp Concierge Message
    const branchName = outlet ? outlet.name : 'Kritunga Palegar Stronghold';
    const waText = WhatsAppService.buildConventionMessage({
      bookingNumber: newConventionBooking.bookingNumber,
      organizerName: newConventionBooking.organizerName,
      eventType: newConventionBooking.eventType,
      hallPreference: newConventionBooking.hallPreference,
      expectedGuests: newConventionBooking.expectedGuests,
      eventDate: newConventionBooking.eventDate,
      timeSlot: newConventionBooking.timeSlot,
      cateringPreference: newConventionBooking.cateringPreference
    }, branchName);

    const waResult = await WhatsAppService.notifyCustomer(newConventionBooking.organizerPhone, waText);

    res.status(201).json({
      success: true,
      message: 'Royal Convention & Banquet Hall booking inquiry successfully submitted.',
      booking: {
        ...newConventionBooking,
        whatsappUrl: waResult.webUrl,
        whatsappMode: waResult.mode
      }
    });
  } catch (err: any) {
    console.error('Error creating convention booking:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to submit convention booking inquiry.',
      error: err.message
    });
  }
});

// GET /api/conventions/:bookingNumber - Retrieve details of a convention booking
router.get('/:bookingNumber', async (req: Request, res: Response) => {
  try {
    const { bookingNumber } = req.params;
    const booking = await prisma.conventionBooking.findUnique({
      where: { bookingNumber },
      include: { outlet: true }
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: `Convention booking '${bookingNumber}' not found.`
      });
    }

    res.json({ success: true, data: booking });
  } catch (err: any) {
    console.error('Error fetching convention booking:', err);
    res.status(500).json({ success: false, message: 'Could not fetch convention booking.' });
  }
});

// PATCH /api/conventions/:bookingNumber/status - Update convention booking status
router.patch('/:bookingNumber/status', async (req: Request, res: Response) => {
  try {
    const { bookingNumber } = req.params;
    const { status } = req.body;

    const validStatuses = ['REQUEST_RECEIVED', 'UNDER_REVIEW', 'ADVANCE_PAID', 'CONFIRMED', 'CANCELLED'];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Status must be one of: ${validStatuses.join(', ')}`
      });
    }

    const updated = await prisma.conventionBooking.update({
      where: { bookingNumber },
      data: { status },
      include: { outlet: true }
    });

    res.json({
      success: true,
      message: `Convention booking '${bookingNumber}' status updated to ${status}.`,
      data: updated
    });
  } catch (err: any) {
    console.error('Error updating convention booking status:', err);
    res.status(500).json({ success: false, message: 'Could not update status.' });
  }
});

export default router;
