export default function PaymentMethods() {
  return (
    <section data-payment-methods style={{ backgroundColor: '#f9f9f9', padding: '20px 0', width: '100%' }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-5">
          {/* Payment Icons */}
          <div className="flex items-center justify-center gap-6 md:gap-8 flex-wrap">
            <i className="fa fa-cc-visa text-4xl md:text-5xl transition-transform hover:scale-110" style={{ color: '#555555' }} />
            <i className="fa fa-cc-mastercard text-4xl md:text-5xl transition-transform hover:scale-110" style={{ color: '#555555' }} />
            <i className="fa fa-cc-amex text-4xl md:text-5xl transition-transform hover:scale-110" style={{ color: '#555555' }} />
            <i className="fa fa-paypal text-4xl md:text-5xl transition-transform hover:scale-110" style={{ color: '#555555' }} />
            <i className="fa fa-apple text-4xl md:text-5xl transition-transform hover:scale-110" style={{ color: '#555555' }} />
            <i className="fa fa-google text-4xl md:text-5xl transition-transform hover:scale-110" style={{ color: '#555555' }} />
          </div>
          {/* Copyright */}
          <p className="text-sm whitespace-nowrap text-center" style={{ color: '#666666' }}>
            &copy; 2024 Aspire Furniture All Rights Reserved
          </p>
        </div>
      </div>
    </section>
  );
}
