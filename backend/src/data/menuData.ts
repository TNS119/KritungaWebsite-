import { ProductPack } from '../types';

export const MENU_ITEMS: ProductPack[] = [
  {
    id: "palegar-dum-biryani",
    name: "Palegar Special Dum Biryani",
    subtitle: "The Signature Royal Potli Dum",
    tag: "MOST ICONIC",
    price: 449,
    originalPrice: 549,
    portion: "Serves 1-2 (750g)",
    spiceLevel: 4,
    description: "Cooked in traditional clay pots sealed with dough over slow-burning embers. Aged long-grain basmati infused with tender meat and Kritunga's secret 21-spice blend.",
    highlights: [
      "Aged Royal Basmati Rice",
      "Marinated for 12 Hours in Spiced Curd",
      "Sealed Earthen Pot Coal Dum",
      "Served with Spicy Mirchi Ka Salan & Raitha"
    ],
    badges: ["Signature Recipe", "100% Desi Ghee", "Claypot Cooked"],
    specs: {
      dumHours: "3.5 Hours",
      spiceBlend: "21 Secret Herbs & Roots",
      oilGhee: "Pure A2 Cow Ghee",
      aromaProfile: "Saffron, Cardamom & Smoked Clove"
    }
  },
  {
    id: "natu-kodi-ragi-mudda",
    name: "Natu Kodi & Ragi Mudda Feast",
    subtitle: "Fiery Country Chicken & Steamed Millet",
    tag: "RAYALASEEMA HERITAGE",
    price: 529,
    originalPrice: 629,
    portion: "Serves 1-2 (850g)",
    spiceLevel: 5,
    description: "Free-range country chicken cooked in a volcanic Guntur red chilli and shallot gravy, served with authentic hand-rolled steaming hot Ragi Sangati.",
    highlights: [
      "Free-Range Country Chicken (Natu Kodi)",
      "Stone-Ground Guntur Red Chilli Paste",
      "Authentic Steamed Finger Millet Balls",
      "Pure Ghee Glaze & Roasted Cashew Garnish"
    ],
    badges: ["Extreme Spice Level", "High Protein", "Ancient Millet"],
    specs: {
      dumHours: "2 Hours Slow Simmer",
      spiceBlend: "Guntur Sannam & Byadgi Chillies",
      oilGhee: "Cold Pressed Groundnut Oil + Ghee",
      aromaProfile: "Fiery Pepper, Garlic & Curry Leaf"
    }
  },
  {
    id: "gongura-mutton-pot",
    name: "Gongura Mutton Pot Feast",
    subtitle: "Tangy Sorrel Leaves with Succulent Lamb",
    tag: "CHEF'S CROWN",
    price: 599,
    originalPrice: 719,
    portion: "Serves 1-2 (800g)",
    spiceLevel: 4,
    description: "Tender bone-in prime lamb morsels braised with freshly harvested tart Gongura leaves, crushed peppercorns, and served with aromatic Palegar Jeera Rice.",
    highlights: [
      "Prime Grass-Fed Tender Lamb Chops",
      "Freshly Picked Farm Gongura Sorrel Leaves",
      "Served with Fragrant Ghee Jeera Rice",
      "Handcrafted in Heavy Brass Degchis"
    ],
    badges: ["Tangy & Fiery", "Melt-In-Mouth Lamb", "Copper Degchi"],
    specs: {
      dumHours: "4 Hours Low Flame",
      spiceBlend: "Gongura, Star Anise, Black Stone Flower",
      oilGhee: "Pure Buffalo Ghee",
      aromaProfile: "Tart Sorrel, Roasted Cumin & Nutmeg"
    }
  },
  {
    id: "royal-palegar-banquet",
    name: "Royal Palegar Grand Banquet",
    subtitle: "The Complete Emperor's Feast (Serves 4)",
    tag: "ULTIMATE FEAST BOX",
    price: 1499,
    originalPrice: 1899,
    portion: "Serves 4-5 (2.8kg)",
    spiceLevel: 4,
    description: "The ultimate royal gathering box: 1x Palegar Mutton Biryani, 1x Natu Kodi Fry, 1x Gongura Paneer Tikka, 4x Butter Naan, Raitha, Mirchi Salan, and Royal Double Ka Meetha.",
    highlights: [
      "Full Spread of Signature Meats & Breads",
      "Includes 2x Royal Desserts (Double Ka Meetha & Gulab Jamun)",
      "Served in Premium Insulated Royal Caskets",
      "Complete Accompaniments & Palegar Digestifs"
    ],
    badges: ["Family Banquet", "Includes Starters & Desserts", "Free Delivery"],
    specs: {
      dumHours: "Freshly Assembled to Order",
      spiceBlend: "Complete Master Potli Selection",
      oilGhee: "Royal Golden Ghee Trio",
      aromaProfile: "Full Royal Palegar Feast Bouquet"
    }
  }
];
