'use client';

export default function WhatsAppFloat() {
  return (
    <a
      data-whatsapp-float
      href="https://wa.me/447494821146"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 hover:scale-110 transition-transform"
      aria-label="Chat on WhatsApp"
    >
      <img
        src="/images/whatsapp-icon.png"
        alt="WhatsApp"
        width="48"
        height="48"
        className="block"
      />
    </a>
  );
}
