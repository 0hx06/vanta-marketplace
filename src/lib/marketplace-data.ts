export type ProductStatus = "active" | "paused" | "review";

export type Product = {
  id: string;
  name: string;
  game: string;
  category: string;
  subcategory: string;
  description: string;
  price: number;
  currency: string;
  stock: number;
  seller: string;
  sellerVerified: boolean;
  sellerRating: number;
  sales: number;
  tags: string[];
  status: ProductStatus;
  createdAt: string;
  updatedAt: string;
  features: string[];
  images: string[];
  badge: string;
};

export type Seller = {
  id: string;
  name: string;
  tagline: string;
  verified: boolean;
  rating: number;
  sales: number;
  responseTime: string;
  location: string;
  specialties: string[];
  avatar: string;
  discord: string;
  discordUrl: string;
};

export const games = ["Valorant"];

export const categories = ["Compte", "Rang", "Boost", "Skin"]; 

export const productCatalog: Product[] = [
  {
    id: "p-101",
    name: "Compte Valorant Radiant",
    game: "Valorant",
    category: "Compte",
    subcategory: "Radiant",
    description:
      "Compte Valorant prêt à jouer avec historique propre, skins, badges et progression premium.",
    price: 69,
    currency: "EUR",
    stock: 8,
    seller: "Aurora Guild",
    sellerVerified: true,
    sellerRating: 4.9,
    sales: 1842,
    tags: ["compte", "radiant", "valorant"],
    status: "active",
    createdAt: "2026-08-12",
    updatedAt: "2026-09-20",
    features: ["Historique vérifié", "Livraison rapide", "Support en live"],
    images: ["#7C3AED", "#EF4444", "#18181B"],
    badge: "Top seller",
  },
  {
    id: "p-102",
    name: "Compte Valorant Ascendant",
    game: "Valorant",
    category: "Compte",
    subcategory: "Ascendant",
    description:
      "Compte Valorant avec rank stable, agents débloqués et skins premium pour une expérience fluide.",
    price: 49,
    currency: "EUR",
    stock: 12,
    seller: "Ghostline",
    sellerVerified: true,
    sellerRating: 5,
    sales: 936,
    tags: ["compte", "ascendant", "valorant"],
    status: "active",
    createdAt: "2026-07-18",
    updatedAt: "2026-09-21",
    features: ["Agents unlockés", "Rang stable", "Livraison sécurisée"],
    images: ["#1F2937", "#7C3AED", "#F59E0B"],
    badge: "Best value",
  },
  {
    id: "p-103",
    name: "Compte Valorant Immortal",
    game: "Valorant",
    category: "Compte",
    subcategory: "Immortal",
    description:
      "Compte Valorant premium pour jouer niveau compétitif avec progression solide et accès rapide.",
    price: 89,
    currency: "EUR",
    stock: 5,
    seller: "HexTide",
    sellerVerified: true,
    sellerRating: 4.8,
    sales: 2210,
    tags: ["compte", "immortal", "valorant"],
    status: "active",
    createdAt: "2026-06-03",
    updatedAt: "2026-09-21",
    features: ["Progression compétitive", "Packaging propre", "Vérification rapide"],
    images: ["#111827", "#7C3AED", "#22C55E"],
    badge: "Hot deal",
  },
  {
    id: "p-104",
    name: "Compte Valorant Gold + Agent",
    game: "Valorant",
    category: "Compte",
    subcategory: "Gold",
    description:
      "Compte Valorant avec agents complets, skins et progression de départ pour monter plus vite.",
    price: 29,
    currency: "EUR",
    stock: 20,
    seller: "Aurora Guild",
    sellerVerified: true,
    sellerRating: 4.7,
    sales: 1287,
    tags: ["compte", "agent", "valorant"],
    status: "active",
    createdAt: "2026-08-01",
    updatedAt: "2026-09-22",
    features: ["Agents inclus", "Bonne progression", "Service sécurisé"],
    images: ["#0F172A", "#EF4444", "#A78BFA"],
    badge: "Popular",
  },
  {
    id: "p-105",
    name: "Compte Valorant Unranked Clean",
    game: "Valorant",
    category: "Compte",
    subcategory: "Unranked",
    description:
      "Compte Valorant noir avec historique propre, apprentissage rapide et première impression premium.",
    price: 24,
    currency: "EUR",
    stock: 30,
    seller: "Ghostline",
    sellerVerified: true,
    sellerRating: 4.9,
    sales: 1342,
    tags: ["compte", "clean", "valorant"],
    status: "active",
    createdAt: "2026-07-25",
    updatedAt: "2026-09-18",
    features: ["Clean account", "Facile à prendre en main", "Livraison rapide"],
    images: ["#0B1220", "#F97316", "#7C3AED"],
    badge: "New",
  },
  {
    id: "p-106",
    name: "Compte Valorant Edge Pack",
    game: "Valorant",
    category: "Rang",
    subcategory: "Boost",
    description:
      "Offre Valorant orientée progression rapide avec skins, rang visuel et accès premium boostés.",
    price: 32,
    currency: "EUR",
    stock: 26,
    seller: "HexTide",
    sellerVerified: true,
    sellerRating: 4.8,
    sales: 3021,
    tags: ["rang", "boost", "valorant"],
    status: "active",
    createdAt: "2026-08-11",
    updatedAt: "2026-09-22",
    features: ["Rang visuel", "Boost rapide", "Support strict"],
    images: ["#111827", "#3B82F6", "#22C55E"],
    badge: "Bundle",
  },
];

export const sellers: Seller[] = [
  {
    id: "seller-1",
    name: "Aurora Guild",
    tagline: "Comptes Premium, rangs sécurisés et service pro sur Valorant.",
    verified: true,
    rating: 4.9,
    sales: 1842,
    responseTime: "5 min",
    location: "EU-West",
    specialties: ["RADIANT", "Compte", "Boost"],
    avatar: "AG",
    discord: "@auroraguild",
    discordUrl: "https://discord.com/users/auroraguild",
  },
  {
    id: "seller-2",
    name: "Ghostline",
    tagline: "Accounts clean, vérifiés et livrés en toute discrétion.",
    verified: true,
    rating: 5,
    sales: 936,
    responseTime: "10 min",
    location: "NA-Central",
    specialties: ["Compte", "Rang", "Support"],
    avatar: "GL",
    discord: "@ghostlinevlt",
    discordUrl: "https://discord.com/users/ghostlinevlt",
  },
  {
    id: "seller-3",
    name: "HexTide",
    tagline: "Vente de comptes Valorant avec accompagnement et ticket rapide.",
    verified: true,
    rating: 4.8,
    sales: 1287,
    responseTime: "15 min",
    location: "APAC",
    specialties: ["Compte", "Skin", "Rang"],
    avatar: "HT",
    discord: "@hextide",
    discordUrl: "https://discord.com/users/hextide",
  },
];

export const featuredGames = [
  { name: "Valorant", offers: 134, accent: "from-violet-500 to-fuchsia-500" },
  { name: "Rang", offers: 82, accent: "from-red-500 to-orange-400" },
  { name: "Compte", offers: 64, accent: "from-cyan-500 to-blue-600" },
  { name: "Skin", offers: 34, accent: "from-amber-500 to-red-500" },
];

export const reviews = [
  { id: 1, user: "Jules", rating: 5, text: "Fast delivery and transparent communication." },
  { id: 2, user: "Amélie", rating: 5, text: "The seller gave me clear instructions and a smooth order." },
  { id: 3, user: "Milo", rating: 4, text: "Product quality and support were above expectations." },
];

export const orders = [
  { id: "ORD-2048", item: "Valorant Ranked Boost", status: "Paid", total: "$29.00" },
  { id: "ORD-2049", item: "CS2 Premium Case Pack", status: "Processing", total: "$38.00" },
  { id: "ORD-2050", item: "Apex Legion Coaching", status: "Completed", total: "$18.00" },
];

export const walletHistory = [
  { label: "Top-up", amount: "+$120.00", date: "2026-09-20" },
  { label: "Purchase", amount: "-$29.00", date: "2026-09-18" },
  { label: "Payout", amount: "+$64.50", date: "2026-09-16" },
];

export const notifications = [
  "Your order ORD-2048 has been confirmed.",
  "Aurora Guild replied to your ticket.",
  "A product you follow is back in stock.",
  "A new promotion is live for Valorant boosts.",
];

export const supportCategories = [
  "Order",
  "Payment",
  "Seller",
  "Product",
  "Refund",
  "Technical",
  "Report",
  "Other",
];

export const faqs = [
  {
    question: "Can I buy digital services safely?",
    answer:
      "Yes. The platform only permits legal, authorized offers and enforces moderation, verification, and fraud protections. Public listings do not expose sensitive account data.",
  },
  {
    question: "Do sellers need approval?",
    answer:
      "Yes. Seller applications are moderated before accounts are activated for public listing.",
  },
  {
    question: "How are refunds handled?",
    answer:
      "Refund eligibility depends on delivery status, seller policy, and dispute review by the support team.",
  },
];

export function getProductById(id: string) {
  return productCatalog.find((product) => product.id === id) ?? null;
}

export function getProductsForGame(game: string) {
  return productCatalog.filter((product) => product.game.toLowerCase() === game.toLowerCase());
}
