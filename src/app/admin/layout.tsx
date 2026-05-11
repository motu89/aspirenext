'use client';

import { useEffect } from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    const paymentMethods = document.querySelector('[data-payment-methods]');
    const whatsappFloat = document.querySelector('[data-whatsapp-float]');
    
    if (header) header.style.display = 'none';
    if (footer) footer.style.display = 'none';
    if (paymentMethods) (paymentMethods as HTMLElement).style.display = 'none';
    if (whatsappFloat) (whatsappFloat as HTMLElement).style.display = 'none';
    
    return () => {
      if (header) header.style.display = '';
      if (footer) footer.style.display = '';
      if (paymentMethods) (paymentMethods as HTMLElement).style.display = '';
      if (whatsappFloat) (whatsappFloat as HTMLElement).style.display = '';
    };
  }, []);

  return (
    <div className="admin-layout" style={{ background: '#f0f0f5' }}>
      {children}
    </div>
  );
}
