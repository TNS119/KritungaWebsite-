import { Router, Request, Response } from 'express';
import prisma from '../services/db.service';
import WhatsAppService from '../services/whatsapp.service';

const router = Router();

// GET /api/reservations/outlets - Get list of outlets available for reservations
router.get('/outlets', async (_req: Request, res: Response) => {
  try {
    const outlets = await prisma.outlet.findMany({
      where: { isActive: true },
      orderBy: { city: 'asc' }
    });
    res.json({ success: true, data: outlets });
  } catch (err: any) {
    console.error('Error fetching reservation outlets:', err);
    res.status(500).json({ success: false, message: 'Could not fetch outlets.' });
  }
});

// POST /api/reservations - Book a royal dining table with Prisma persistence & WhatsApp receipt
router.post('/', async (req: Request, res: Response) => {
  try {
    const {
      guestName,
      guestPhone,
      guestEmail,
      outletId,
      partySize,
      reservationDate,
      timeSlot,
      tableType,
      specialRequests
    } = req.body;

    if (!guestName || !guestPhone || !partySize || !reservationDate || !timeSlot) {
      return res.status(400).json({
        success: false,
        message: 'Guest name, phone, party size, reservation date, and time slot are required.'
      });
    }

    // Resolve outlet
    let chosenOutletId = outletId;
    if (!chosenOutletId) {
      const defaultOutlet = await prisma.outlet.findFirst({ where: { isActive: true } });
      chosenOutletId = defaultOutlet?.id || 'nalgonda-flagship';
    }

    const outlet = await prisma.outlet.findUnique({ where: { id: chosenOutletId } });

    // Determine Table Type if not provided
    const resolvedTableType = tableType || (partySize > 4 ? 'Royal Palegar Banquet Diwan' : 'Regal Courtyard Table');

    // Generate Booking reference e.g. RES-4921
    const bookingNumber = `RES-${Math.floor(1000 + Math.random() * 9000)}`;

    const newReservation = await prisma.reservation.create({
      data: {
        bookingNumber,
        outletId: chosenOutletId,
        guestName,
        guestPhone,
        guestEmail: guestEmail || null,
        partySize: parseInt(partySize, 10) || 2,
        reservationDate,
        timeSlot,
        tableType: resolvedTableType,
        specialRequests: specialRequests || null,
        status: 'CONFIRMED'
      },
      include: {
        outlet: true
      }
    });

    // Build WhatsApp Confirmation
    const branchName = outlet ? outlet.name : 'Kritunga Palegar Stronghold';
    const branchAddress = outlet ? outlet.address : 'Main Dining Hall';
    const waText = WhatsAppService.buildReservationMessage({
      bookingNumber: newReservation.bookingNumber,
      guestName: newReservation.guestName,
      partySize: newReservation.partySize,
      reservationDate: newReservation.reservationDate,
      timeSlot: newReservation.timeSlot,
      tableType: newReservation.tableType
    }, branchName, branchAddress);

    const waResult = await WhatsAppService.notifyCustomer(newReservation.guestPhone, waText);

    res.status(201).json({
      success: true,
      message: 'Table reserved at Kritunga The Palegar’s Cuisine.',
      reservation: {
        ...newReservation,
        whatsappUrl: waResult.webUrl,
        whatsappMode: waResult.mode
      }
    });
  } catch (err: any) {
    console.error('Error booking reservation:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to reserve table.',
      error: err.message
    });
  }
});

// GET /api/reservations/:bookingNumber - Fetch reservation details
router.get('/:bookingNumber', async (req: Request, res: Response) => {
  try {
    const { bookingNumber } = req.params;
    const reservation = await prisma.reservation.findUnique({
      where: { bookingNumber },
      include: { outlet: true }
    });

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: `Reservation '${bookingNumber}' not found.`
      });
    }

    res.json({ success: true, data: reservation });
  } catch (err: any) {
    console.error('Error fetching reservation:', err);
    res.status(500).json({ success: false, message: 'Could not fetch reservation.' });
  }
});

export default router;
