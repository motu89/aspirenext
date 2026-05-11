import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="max-w-[800px] mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm mb-6" style={{ color: '#8b7355' }}>
        <Link href="/" className="hover:text-warm-accent">Home</Link>
        <span className="mx-2">/</span>
        <span style={{ color: '#5e3a1c' }}>Privacy Policy</span>
      </nav>

      <div className="bg-white rounded-2xl p-6 md:p-10 shadow-sm">
        <h1 className="text-3xl font-bold mb-2" style={{ color: '#5e3a1c' }}>
          Privacy Policy
        </h1>
        <div className="section-underline w-24 mb-6" />
        <p className="text-sm mb-6" style={{ color: '#8b7355' }}>Last updated: November 2024</p>

        <div className="space-y-6 text-sm leading-relaxed" style={{ color: '#553b0a' }}>
          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: '#5e3a1c' }}>1. Introduction</h2>
            <p>
              Welcome to Aspire Furniture UK (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). We are committed to protecting and respecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and purchase our products.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: '#5e3a1c' }}>2. Information We Collect</h2>
            <p className="mb-2">We may collect and process the following types of information:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Personal Information:</strong> Name, delivery address, postcode, phone number, and WhatsApp number that you provide when placing an order or contacting us.</li>
              <li><strong>Order Information:</strong> Product selections, sizes, colours, quantities, and payment preferences.</li>
              <li><strong>Communication Data:</strong> Records of correspondence between you and us, including WhatsApp messages, emails, and phone calls.</li>
              <li><strong>Technical Data:</strong> IP address, browser type, operating system, referring URLs, and access times when you visit our website.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: '#5e3a1c' }}>3. How We Use Your Information</h2>
            <p className="mb-2">We use the information we collect for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>To process and fulfil your orders, including delivery arrangements</li>
              <li>To communicate with you about your orders, deliveries, and any issues</li>
              <li>To provide customer support and respond to your enquiries</li>
              <li>To send order confirmations and delivery updates via WhatsApp or SMS</li>
              <li>To improve our website, products, and services</li>
              <li>To comply with legal obligations</li>
              <li>To prevent fraud and ensure the security of our services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: '#5e3a1c' }}>4. Sharing Your Information</h2>
            <p>We do not sell, trade, or rent your personal information to third parties. We may share your information with:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li><strong>Delivery Partners:</strong> We share your name, address, and phone number with our delivery partners solely for the purpose of delivering your order.</li>
              <li><strong>Payment Processors:</strong> If you use electronic payment methods, your payment details are processed by secure third-party payment processors.</li>
              <li><strong>Legal Requirements:</strong> We may disclose your information if required by law, regulation, or legal process.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: '#5e3a1c' }}>5. Data Security</h2>
            <p>
              We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: '#5e3a1c' }}>6. Data Retention</h2>
            <p>
              We retain your personal information only for as long as necessary to fulfil the purposes for which it was collected, including to satisfy any legal, accounting, or reporting requirements. Order records are typically retained for a period of 2 years after the order date.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: '#5e3a1c' }}>7. Your Rights</h2>
            <p>Under UK data protection laws (UK GDPR), you have the right to:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate or incomplete information</li>
              <li>Request deletion of your personal information</li>
              <li>Object to the processing of your personal information</li>
              <li>Request data portability</li>
              <li>Withdraw consent at any time (where processing is based on consent)</li>
            </ul>
            <p className="mt-2">
              To exercise any of these rights, please contact us at{' '}
              <a href="mailto:info@aspirefurnitureuk.com" className="underline" style={{ color: '#8b5a2b' }}>
                info@aspirefurnitureuk.com
              </a>{' '}
              or WhatsApp us at{' '}
              <a href="https://wa.me/447494821146" className="underline" style={{ color: '#8b5a2b' }}>
                +44 7494 821146
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: '#5e3a1c' }}>8. Cookies</h2>
            <p>
              Our website may use cookies to enhance your browsing experience. Cookies are small data files stored on your device. You can control cookie settings through your browser preferences. However, disabling cookies may affect the functionality of our website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: '#5e3a1c' }}>9. Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: '#5e3a1c' }}>10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws. Any changes will be posted on this page with an updated &quot;Last updated&quot; date. We encourage you to review this policy periodically.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: '#5e3a1c' }}>11. Contact Us</h2>
            <p>If you have any questions or concerns about this Privacy Policy or our data practices, please contact us:</p>
            <div className="mt-3 p-4 rounded-lg" style={{ backgroundColor: '#f5f1e9' }}>
              <p><strong>Aspire Furniture UK</strong></p>
              <p>Email: <a href="mailto:info@aspirefurnitureuk.com" className="underline" style={{ color: '#8b5a2b' }}>info@aspirefurnitureuk.com</a></p>
              <p>Phone/WhatsApp: <a href="tel:+447494821146" className="underline" style={{ color: '#8b5a2b' }}>+44 7494 821146</a></p>
              <p>Address: United Kingdom</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
