import data from "../data.json";

export function useCartTotal(cart: Record<number, number>) {
  return Object.entries(cart).reduce((sum, [id, qty]) => {
    const dessert = data.find((d) => d.id === Number(id));
    return sum + (dessert ? dessert.price * qty : 0);
  }, 0);
}

export function useCartDesserts(cart: Record<number, number>) {
  return Object.entries(cart).map(([id, quantity]) => ({
    id: Number(id),
    quantity,
  }));
}