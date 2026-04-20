import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { Product, ProductVariant } from "@/data/products";

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: ProductVariant;
  cartKey: string; // product.id ou product.id-size
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  addItem: (product: Product, quantity?: number, variant?: ProductVariant) => void;
  removeItem: (cartKey: string) => void;
  updateQuantity: (cartKey: string, quantity: number) => void;
  totalItems: number;
  totalPrice: number;
  originalPrice: number;
  totalDiscount: number;
  getItemDiscount: (quantity: number) => number;
}

const CartContext = createContext<CartContextType | null>(null);

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};

export const getItemDiscount = (quantity: number): number => {
  if (quantity >= 3) return 0.10;
  if (quantity >= 2) return 0.05;
  return 0;
};

const getUnitPrice = (item: CartItem): number =>
  item.selectedVariant?.price ?? item.product.price;

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = useCallback((product: Product, quantity = 1, variant?: ProductVariant) => {
    const cartKey = variant ? `${product.id}-${variant.size}` : product.id;
    setItems((prev) => {
      const existing = prev.find((i) => i.cartKey === cartKey);
      if (existing) {
        return prev.map((i) =>
          i.cartKey === cartKey ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { product, quantity, selectedVariant: variant, cartKey }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((cartKey: string) => {
    setItems((prev) => prev.filter((i) => i.cartKey !== cartKey));
  }, []);

  const updateQuantity = useCallback((cartKey: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.cartKey !== cartKey));
    } else {
      setItems((prev) =>
        prev.map((i) => (i.cartKey === cartKey ? { ...i, quantity } : i))
      );
    }
  }, []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const originalPrice = items.reduce((sum, i) => sum + getUnitPrice(i) * i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => {
    const discount = getItemDiscount(i.quantity);
    return sum + getUnitPrice(i) * i.quantity * (1 - discount);
  }, 0);
  const totalDiscount = originalPrice - totalPrice;

  return (
    <CartContext.Provider
      value={{ items, isOpen, setIsOpen, addItem, removeItem, updateQuantity, totalItems, totalPrice, originalPrice, totalDiscount, getItemDiscount }}
    >
      {children}
    </CartContext.Provider>
  );
};
