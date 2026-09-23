import { Router, Request, Response } from 'express';
import { ReservationRequest } from '../types';

const router = Router();

const reservations = new Map<string, any>();

// POST /api/reservations - Book a royal dining table
router.post('/', (req: Request, res: Response) => {
  const body: ReservationRequest = req.body;

  if (!body.guestName || !body.guestPhone || !body.partySize || !body.reservationDate) {
    return res.status(400).json({
      success: false,
      message: 'Guest name, phone, party size, and date are required.'
    });
  }

  const reservationId = `RES-${Math.floor(1000 + Math.random() * 9000)}`;
  const reservation = {
    reservationId,
    ...body,
    status: 'confirmed',
    tableType: body.partySize > 4 ? 'Royal Palegar Banquet Diwan' : 'Regal Courtyard Table',
    createdAt: new Date().toISOString()
  };

  reservations.set(reservationId, reservation);

  res.status(201).json({
    success: true,
    message: 'Table reserved at Kritunga The Palegar’s Cuisine.',
    reservation
  });
});

export default router;
