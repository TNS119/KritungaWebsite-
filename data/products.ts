export interface ProductPack {
  id: string;
  name: string;
  subtitle: string;
  tag: string;
  price: number;
  originalPrice: number;
  portion: string;
  spiceLevel: number; // 1 - 5
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

export interface StoryMilestone {
  frameStart: number;
  frameEnd: number;
  phase: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
}

export const STORY_MILESTONES: StoryMilestone[] = [
  {
    frameStart: 1,
    frameEnd: 60,
    phase: "PHASE 01",
    badge: "THE ROYAL INVOCATION",
    title: "The Sacred Palegar Veil",
    subtitle: "Embroidered Heritage of Rayalaseema Warlords",
    description: "Centuries of royal culinary traditions, zealously preserved under royal silk, preparing to unveil the majestic royal banquet."
  },
  {
    frameStart: 61,
    frameEnd: 120,
    phase: "PHASE 02",
    badge: "THE GRAND BANQUET",
    title: "The Imperial Spread",
    subtitle: "A Feast Fit for Rayalaseema Royalty",
    description: "Golden long-grain basmati, fiery tandoori roasts, and simmering copper handi gravies unveiled in all their regal glory."
  },
  {
    frameStart: 121,
    frameEnd: 180,
    phase: "PHASE 03",
    badge: "AROMATIC ALCHEMY",
    title: "The Steaming Dum Crucible",
    subtitle: "Slow Coal Embers & Saffron Infusion",
    description: "Fragrant plumes of steam carry the secret 21-spice potli alchemy, pure desi ghee, and succulent slow-cooked tender meat."
  },
  {
    frameStart: 181,
    frameEnd: 240,
    phase: "PHASE 04",
    badge: "THE HERITAGE SEAL",
    title: "Crowned in Gold & Spice",
    subtitle: "The Undisputed Monarch of Rayalaseema Ruchulu",
    description: "The golden crest of Kritunga shines above the steaming feast — an eternal promise of authentic fiery perfection."
  }
];

export const PRODUCT_PACKS: ProductPack[] = [
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

export const SENSORY_PHYSICS = [
  {
    title: "The 21-Spice Secret Potli",
    tagline: "Ancestral Formula",
    icon: "Sparkles",
    metric: "21",
    metricUnit: "Secret Botanicals",
    description: "Stone-ground Stone Flower (Kalpasi), Star Anise, Marathi Moggu, and roasted Guntur Podi tied in muslin and infused slowly into the grain.",
    gradient: "from-amber-600/30 to-red-900/30",
    borderGlow: "group-hover:border-palegar-gold/60"
  },
  {
    title: "Earthen Clay Pot Dum",
    tagline: "Thermal Inertia Physics",
    icon: "Flame",
    metric: "180°C",
    metricUnit: "Uniform Radiant Heat",
    description: "Porous baked red clay handis create a micro-convection cyclone that traps moisture, ensuring every grain of basmati remains long, distinct, and tender.",
    gradient: "from-red-600/30 to-orange-900/30",
    borderGlow: "group-hover:border-palegar-chilli/60"
  },
  {
    title: "Pure Golden Desi Ghee",
    tagline: "Velvety Mouthfeel",
    icon: "Droplets",
    metric: "99.8%",
    metricUnit: "Pure Clarified Butter",
    description: "Slow-churned bilona ghee drizzled generously over steaming dum layers, unlocking fat-soluble aromatics that explode on your palate.",
    gradient: "from-yellow-500/30 to-amber-900/30",
    borderGlow: "group-hover:border-yellow-400/60"
  },
  {
    title: "Guntur Fiery Heat Wave",
    tagline: "The Rayalaseema Kick",
    icon: "Zap",
    metric: "85,000",
    metricUnit: "Scoville Heat Units",
    description: "Sun-dried red chillies with intense capsaicin heat, balanced perfectly by caramelised onions, sour curd, and cooling royal spices.",
    gradient: "from-rose-600/30 to-red-950/30",
    borderGlow: "group-hover:border-rose-500/60"
  }
];

export const INTENSITY_METRICS = [
  { label: "Spiciness & Chilli Punch", score: 96, desc: "Guntur Sannam & Bedgi fire" },
  { label: "Aroma & Dum Dispersion", score: 99, desc: "Saffron, Cardamom & Clove steam" },
  { label: "Meat Tenderness & Succulence", score: 98, desc: "12-hour spiced curd marinade" },
  { label: "Grain Fluffiness & Separation", score: 95, desc: "2-year aged Extra Long Basmati" },
  { label: "Heritage Authenticity", score: 100, desc: "Centuries-old Palegar warlord recipes" },
];
