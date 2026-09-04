import Link from 'next/link';

export default function ReturnPage() {
  return (
    <div className="max-w-[800px] mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm mb-6" style={{ color: '#8b7355' }}>
        <Link href="/" className="hover:text-warm-accent">Home</Link>
        <span className="mx-2">/</span>
        <span style={{ color: '#5e3a1c' }}>Return Policy</span>
      </nav>

      <div className="bg-white rounded-2xl p-6 md:p-10 shadow-sm">
        <h1 className="text-3xl font-bold mb-2" style={{ color: '#5e3a1c' }}>
          Return Policy
        </h1>
        <div className="section-underline w-24 mb-6" />
        <p className="text-sm mb-6" style={{ color: '#8b7355' }}>Last updated: November 2024</p>

        <div className="space-y-6 text-sm leading-relaxed" style={{ color: '#553b0a' }}>
          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: '#5e3a1c' }}>1. Our Commitment</h2>
            <p>
              At Aspire Furniture UK, we want you to be completely satisfied with your purchase. If you are not happy with your order for any reason, we are here to help. We understand that buying furniture online can be a big decision, and we want to make the process as stress-free as possible.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: '#5e3a1c' }}>2. Cancellation Before Delivery</h2>
            <p>
              You may cancel your order at any time before delivery at no additional cost. Simply contact us via WhatsApp or phone, and we will process your cancellation immediately. If you have already made a payment, a full refund will be issued within 3-5 working days.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: '#5e3a1c' }}>3. Return Eligibility</h2>
            <p className="mb-2">You may be eligible for a return if:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>The product arrives damaged or defective</li>
              <li>The product is significantly different from the description or images shown on our website</li>
              <li>The wrong product or size has been delivered</li>
              <li>Parts are missing from your order</li>
            </ul>
            <p className="mt-2">
              <strong>Please note:</strong> You must report any issues within <strong>48 hours</strong> of receiving your order. Please send us photos or videos of the issue via WhatsApp so we can assess the situation quickly.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: '#5e3a1c' }}>4. Non-Returnable Items</h2>
            <p className="mb-2">The following items are not eligible for return:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Products that have been assembled, used, or modified</li>
              <li>Products returned after the 48-hour reporting window</li>
              <li>Custom-made or personalised items (unless defective)</li>
              <li>Items damaged due to improper handling by the customer</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: '#5e3a1c' }}>5. How to Initiate a Return</h2>
            <p>To initiate a return, please follow these steps:</p>
            <ol className="list-decimal pl-6 space-y-2 mt-2">
              <li>
                <strong>Contact Us:</strong> Send us a message on WhatsApp at{' '}
                <a href="https://wa.me/447897060826" className="underline" style={{ color: '#8b5a2b' }}>
                  +44 7897 060826
                </a>{' '}
                or call us. Include your order ID and photos/videos of the issue.
              </li>
              <li>
                <strong>Assessment:</strong> Our team will review your case and respond within 24 hours. We may ask for additional information or photos.
              </li>
              <li>
                <strong>Resolution:</strong> Depending on the issue, we will offer one of the following:
                <ul className="list-disc pl-6 space-y-1 mt-1">
                  <li>Full refund</li>
                  <li>Replacement of the affected product or parts</li>
                  <li>Exchange for a different size or colour</li>
                  <li>Partial refund for minor issues</li>
                </ul>
              </li>
              <li>
                <strong>Pickup/Collection:</strong> If a return is approved, we will arrange collection of the product from your address at no additional cost to you.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: '#5e3a1c' }}>6. Refund Process</h2>
            <p className="mb-2">
              Once your return is approved and the product is collected:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Cash on Delivery orders:</strong> Refund will be processed via bank transfer within 5-7 working days</li>
              <li><strong>Electronic payment orders:</strong> Refund will be processed to your original payment method within 5-10 working days</li>
            </ul>
            <p className="mt-2">
              You will receive confirmation from us once your refund has been processed.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: '#5e3a1c' }}>7. Delivery Issues</h2>
            <p>
              If your delivery is delayed beyond the estimated timeframe, please contact us and we will look into it immediately. We track all deliveries and will provide you with updates. If a delivery cannot be completed, we will reschedule at a convenient time for you.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: '#5e3a1c' }}>8. Damaged During Transit</h2>
            <p>
              If your product arrives damaged, please do not refuse the delivery. Instead, accept the delivery, note the damage with the delivery driver, and contact us immediately with photos. We will arrange a replacement or repair at no extra cost to you.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: '#5e3a1c' }}>9. Customer Satisfaction Guarantee</h2>
            <p>
              We pride ourselves on excellent customer service. If you have any concerns about your order, please reach out to us before leaving a review. We will do everything we can to resolve any issues and ensure you are happy with your purchase. Your satisfaction is our top priority.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: '#5e3a1c' }}>10. Contact Us</h2>
            <p>If you have any questions about our return policy or need to initiate a return, please contact us:</p>
            <div className="mt-3 p-4 rounded-lg" style={{ backgroundColor: '#f5f1e9' }}>
              <p><strong>Aspire Furniture UK</strong></p>
              <p>WhatsApp: <a href="https://wa.me/447897060826" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: '#8b5a2b' }}>+44 7494 821146</a></p>
              <p>Phone: <a href="tel:+447897060826" className="underline" style={{ color: '#8b5a2b' }}>+44 7494 821146</a></p>
              <p>Email: <a href="mailto:info@aspirefurnitureuk.com" className="underline" style={{ color: '#8b5a2b' }}>info@aspirefurnitureuk.com</a></p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
