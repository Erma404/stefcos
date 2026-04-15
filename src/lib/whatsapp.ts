import type { Product } from "@/data/products";

const PHONE = "33611109870";

export const formatPrice = (price: number) =>
  new Intl.NumberFormat("fr-FR").format(price) + " FCFA";

const generateOrderId = () => {
  const year = new Date().getFullYear();
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `STC-${year}-${rand}`;
};

export const buildWhatsAppProductUrl = (product: Product, quantity = 1) => {
  const total = product.price * quantity;
  const orderId = generateOrderId();
  const message =
    `Bonjour STEFCOS 👋, je souhaiterais passer une commande.\n\n` +
    `🛒 *Commande N° ${orderId}*\n\n` +
    `▸ ${product.name} (${product.subtitle}) x${quantity} — ${formatPrice(total)}\n\n` +
    `💰 *Total : ${formatPrice(total)}*\n\n` +
    `Merci de confirmer ma commande !`;
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
};

export const buildWhatsAppConseilUrl = () => {
  const message = "Bonjour STEFCOS 👋, j'aimerais recevoir des conseils personnalisés pour ma peau. Pouvez-vous m'aider ?";
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
};

export const buildWhatsAppCartUrl = (items: { product: Product; quantity: number }[], totalPrice: number) => {
  const orderId = generateOrderId();
  let message =
    `Bonjour STEFCOS 👋, je souhaiterais passer une commande.\n\n` +
    `🛒 *Commande N° ${orderId}*\n\n`;
  items.forEach(({ product, quantity }) => {
    message += `▸ ${product.name} (${product.subtitle}) x${quantity} — ${formatPrice(product.price * quantity)}\n`;
  });
  message += `\n💰 *Total : ${formatPrice(totalPrice)}*\n\nMerci de confirmer ma commande !`;
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
};

export const buildWhatsAppGenericUrl = (text?: string) => {
  const message = text || "Bonjour STEFCOS 👋, je souhaite avoir des informations sur vos produits.";
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
};
