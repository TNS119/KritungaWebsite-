import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const OUTLETS = [
  {
    id: "nalgonda-flagship",
    name: "Kritunga Restaurant — Nalgonda",
    city: "Nalgonda",
    address: "Chandanapalli, Hyderabad Road, Nalgonda, Telangana 508001",
    phone: "+91 91234 56789"
  }
];

const MENU_ITEMS = [
  {
    id: "palegar-dum-biryani",
    slug: "palegar-dum-biryani",
    name: "Palegar Special Dum Biryani",
    subtitle: "The Signature Royal Potli Dum",
    tag: "MOST ICONIC",
    price: 449,
    originalPrice: 549,
    portion: "Serves 1-2 (750g)",
    spiceLevel: 4,
    description: "Cooked in traditional clay pots sealed with dough over slow-burning embers. Aged long-grain basmati infused with tender meat and Kritunga's secret 21-spice blend."
  },
  {
    id: "natu-kodi-ragi-mudda",
    slug: "natu-kodi-ragi-mudda",
    name: "Natu Kodi & Ragi Mudda Feast",
    subtitle: "Fiery Country Chicken & Steamed Millet",
    tag: "RAYALASEEMA HERITAGE",
    price: 529,
    originalPrice: 629,
    portion: "Serves 1-2 (850g)",
    spiceLevel: 5,
    description: "Free-range country chicken cooked in a volcanic Guntur red chilli and shallot gravy, served with authentic hand-rolled steaming hot Ragi Sangati."
  },
  {
    id: "gongura-mutton-pot",
    slug: "gongura-mutton-pot",
    name: "Gongura Mutton Pot Feast",
    subtitle: "Tangy Sorrel Leaves with Succulent Lamb",
    tag: "CHEF'S CROWN",
    price: 599,
    originalPrice: 719,
    portion: "Serves 1-2 (800g)",
    spiceLevel: 4,
    description: "Tender bone-in prime lamb morsels braised with freshly harvested tart Gongura leaves, crushed peppercorns, and served with aromatic Palegar Jeera Rice."
  },
  {
    id: "royal-palegar-banquet",
    slug: "royal-palegar-banquet",
    name: "Royal Palegar Grand Banquet",
    subtitle: "The Complete Emperor's Feast (Serves 4)",
    tag: "ULTIMATE FEAST BOX",
    price: 1499,
    originalPrice: 1899,
    portion: "Serves 4-5 (2.8kg)",
    spiceLevel: 4,
    description: "The ultimate royal gathering box: 1x Palegar Mutton Biryani, 1x Natu Kodi Fry, 1x Gongura Paneer Tikka, 4x Butter Naan, Raitha, Mirchi Salan, and Royal Double Ka Meetha."
  }
];

async function main() {
  console.log("Seeding Nalgonda flagship branch...");
  for (const outlet of OUTLETS) {
    await prisma.outlet.upsert({
      where: { id: outlet.id },
      update: outlet,
      create: outlet
    });
  }

  console.log("Purging all other branches...");
  await prisma.reservation.updateMany({
    data: { outletId: "nalgonda-flagship" }
  });
  await prisma.conventionBooking.updateMany({
    data: { outletId: "nalgonda-flagship" }
  });
  await prisma.order.updateMany({
    data: { outletId: "nalgonda-flagship" }
  });
  await prisma.outlet.deleteMany({
    where: {
      id: { not: "nalgonda-flagship" }
    }
  });

  console.log("Seeding menu items...");
  for (const item of MENU_ITEMS) {
    await prisma.menuItem.upsert({
      where: { id: item.id },
      update: item,
      create: item
    });
  }

  console.log("Database seeded successfully with royal heritage data!");
}

main()
  .catch((e) => {
    console.error("Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
