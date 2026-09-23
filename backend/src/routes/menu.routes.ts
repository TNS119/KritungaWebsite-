import { Router, Request, Response } from 'express';
import { MENU_ITEMS } from '../data/menuData';

const router = Router();

// GET /api/menu - List all Palegar feast packages
router.get('/', (req: Request, res: Response) => {
  res.json({
    success: true,
    count: MENU_ITEMS.length,
    data: MENU_ITEMS
  });
});

// GET /api/menu/:id - Retrieve specific feast package
router.get('/:id', (req: Request, res: Response) => {
  const item = MENU_ITEMS.find((p) => p.id === req.params.id);
  if (!item) {
    return res.status(404).json({
      success: false,
      message: `Menu item with id '${req.params.id}' not found.`
    });
  }
  res.json({
    success: true,
    data: item
  });
});

export default router;
