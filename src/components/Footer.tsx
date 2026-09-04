import Link from 'next/link';

export default function Footer() {
  return (
    <footer data-footer id="footer" className="mt-auto" style={{ backgroundColor: '#2a2a2a', color: '#ffffff' }}>
      <div className="max-w-[1200px] mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center sm:text-left">
          {/* Contact Us */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="text-lg font-bold mb-4" style={{ color: '#d4a056' }}>
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm" style={{ color: '#cccccc' }}>
              <li className="flex items-center justify-center sm:justify-start gap-2">
                <i className="fa fa-envelope" style={{ color: '#d4a056' }} />
                <a href="mailto:aspirefurniture7@gmail.com" className="hover:text-white transition-colors">
                  aspirefurniture7@gmail.com
                </a>
              </li>
              <li className="flex items-center justify-center sm:justify-start gap-2">
                <i className="fa fa-phone" style={{ color: '#d4a056' }} />
                <a href="tel:+447897060826" className="hover:text-white transition-colors">
                  +447897060826
                </a>
              </li>
              <li className="flex items-center justify-center sm:justify-start gap-2">
                <i className="fa fa-whatsapp" style={{ color: '#25D366' }} />
                <a
                  href="https://wa.me/447897060826"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp: +447897060826
                </a>
              </li>
              <li className="flex items-center justify-center sm:justify-start gap-2">
                <i className="fa fa-map-marker" style={{ color: '#d4a056' }} />
                <span>Rd, Chorlton-cum-Hardy, Manchester M21 8AG, UK</span>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="text-lg font-bold mb-4" style={{ color: '#d4a056' }}>
              Legal
            </h3>
            <ul className="space-y-3 text-sm" style={{ color: '#cccccc' }}>
              <li className="flex items-center justify-center sm:justify-start gap-2">
                <Link href="/privacy" className="hover:text-white transition-colors flex items-center gap-2">
                  <i className="fa fa-shield" style={{ color: '#d4a056' }} />
                  Privacy Policy
                </Link>
              </li>
              <li className="flex items-center justify-center sm:justify-start gap-2">
                <Link href="/return" className="hover:text-white transition-colors flex items-center gap-2">
                  <i className="fa fa-exchange" style={{ color: '#d4a056' }} />
                  Return Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Why Choose Us */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="text-lg font-bold mb-4" style={{ color: '#d4a056' }}>
              Why Choose Us
            </h3>
            <ul className="space-y-3 text-sm" style={{ color: '#cccccc' }}>
              <li className="flex items-center justify-center sm:justify-start gap-2">
                <i className="fa fa-check-circle" style={{ color: '#25D366' }} />
                Free UK Delivery
              </li>
              <li className="flex items-center justify-center sm:justify-start gap-2">
                <i className="fa fa-check-circle" style={{ color: '#25D366' }} />
                Cash on Delivery
              </li>
              <li className="flex items-center justify-center sm:justify-start gap-2">
                <i className="fa fa-check-circle" style={{ color: '#25D366' }} />
                Premium Quality
              </li>
              <li className="flex items-center justify-center sm:justify-start gap-2">
                <i className="fa fa-check-circle" style={{ color: '#25D366' }} />
                Budget Prices
              </li>
              <li className="flex items-center justify-center sm:justify-start gap-2">
                <i className="fa fa-check-circle" style={{ color: '#25D366' }} />
                Easy Returns
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
