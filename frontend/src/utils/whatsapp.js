export const WHATSAPP_NUMBER = '628812704174';

export const getWhatsAppUrl = (message) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const GENERAL_WHATSAPP_MESSAGE =
  'Halo Rent & Go, saya ingin bertanya tentang layanan rental mobil.';
