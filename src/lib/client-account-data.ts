export type LocalOrder = {
  id: string;
  item: string;
  status: string;
  amount: number;
  createdAt: string;
};

export function readLocalOrders(): LocalOrder[] {
  if (typeof window === "undefined") return [];
  try {
    const value = JSON.parse(window.localStorage.getItem("vanta-orders") || "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

export function readLocalFavorites(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const value = JSON.parse(window.localStorage.getItem("vanta-favorites") || "[]");
    return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
  } catch {
    return [];
  }
}
