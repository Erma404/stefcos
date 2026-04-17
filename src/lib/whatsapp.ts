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
    `Bonjour STEFCOS 👋, je souhaite passer une commande.\n\n` +
    `🛒 *Commande N° ${orderId}*\n` +
    `▸ ${product.name} (${product.subtitle}) x${quantity} — ${formatPrice(total)}\n` +
    `💰 *Total : ${formatPrice(total)}*\n\n` +
    `📋 *Mes informations :*\n` +
    `• Prénom : \n` +
    `• Quartier / Zone : \n` +
    `• Paiement : avant livraison (TMoney) / à la livraison\n\n` +
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
    `Bonjour STEFCOS 👋, je souhaite passer une commande.\n\n` +
    `🛒 *Commande N° ${orderId}*\n`;
  items.forEach(({ product, quantity }) => {
    message += `▸ ${product.name} (${product.subtitle}) x${quantity} — ${formatPrice(product.price * quantity)}\n`;
  });
  message +=
    `💰 *Total : ${formatPrice(totalPrice)}*\n\n` +
    `📋 *Mes informations :*\n` +
    `• Prénom : \n` +
    `• Quartier / Zone : \n` +
    `• Paiement : avant livraison (TMoney) / à la livraison\n\n` +
    `Merci de confirmer ma commande !`;
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
};

export const buildWhatsAppGenericUrl = (text?: string) => {
  const message = text || "Bonjour STEFCOS 👋, je souhaite avoir des informations sur vos produits.";
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
};
