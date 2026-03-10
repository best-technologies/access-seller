export default function TermsAndConditions() {
  return (
    <>
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-brand-500 mb-8">
            Terms and Conditions
          </h1>

          <p className="text-sm text-gray-500 mb-8">
            Last Updated: February 12, 2026
          </p>

          <section className="mb-8">
            <p className="text-gray-700 leading-relaxed mb-4">
              Welcome to Access&Sellr. These Terms and Conditions (&quot;Terms&quot;)
              govern your access to and use of the Access&Sellr website,
              including the purchase of books, e-books, and related products and
              services. By accessing or using our website, you agree to be bound
              by these Terms.
            </p>
            <p className="text-gray-700 leading-relaxed">
              If you do not agree with any part of these Terms, you must not use
              our website. Please read them carefully.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              1. Definitions
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>
                <strong>&quot;Access&Sellr,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;</strong>{" "}
                refers to Access&Sellr, the online bookstore operated from
                Ibadan, Nigeria.
              </li>
              <li>
                <strong>&quot;You&quot; or &quot;User&quot;</strong> refers to any
                individual who accesses or uses our website, whether as a buyer,
                affiliate marketer, or visitor.
              </li>
              <li>
                <strong>&quot;Products&quot;</strong> refers to all items listed
                for sale on our platform, including physical books, e-books, and
                digital content.
              </li>
              <li>
                <strong>&quot;Services&quot;</strong> refers to all functionality
                provided through our website, including browsing, purchasing,
                account management, and the affiliate programme.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              2. Account Registration
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              To make purchases or access certain features of our website, you
              may need to create an account. When registering, you agree to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Provide accurate, current, and complete information</li>
              <li>Maintain the security of your password and account</li>
              <li>Accept responsibility for all activities that occur under your account</li>
              <li>Notify us immediately of any unauthorised use of your account</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              We reserve the right to suspend or terminate accounts that violate
              these Terms or engage in fraudulent activity.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              3. Products and Pricing
            </h2>
            <div className="space-y-6">
              <div className="border-l-4 border-brand-500 pl-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Product Descriptions
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  We strive to ensure that product descriptions, images, and
                  pricing on our website are accurate. However, we do not
                  guarantee that all information is error-free. If a product is
                  listed at an incorrect price or with inaccurate information, we
                  reserve the right to correct the error and, if necessary,
                  cancel any orders placed based on that error.
                </p>
              </div>

              <div className="border-l-4 border-gray-300 pl-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Pricing
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  All prices on our website are displayed in Nigerian Naira (₦).
                  Prices are subject to change without notice. Any applicable
                  shipping fees will be displayed at checkout before you complete
                  your purchase.
                </p>
              </div>

              <div className="border-l-4 border-gray-300 pl-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Availability
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  All products are subject to availability. We reserve the right
                  to limit the quantity of items available for purchase and to
                  discontinue any product at any time without prior notice.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              4. Orders and Payment
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              When you place an order on our website, you are making an offer to
              purchase the selected products. We reserve the right to accept or
              decline any order at our discretion.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>
                Payment must be made at the time of purchase using one of our
                accepted payment methods: bank transfer, Mastercard, Visa, or
                Verve.
              </li>
              <li>
                Your order is confirmed only after we have verified and received
                your payment.
              </li>
              <li>
                We use secure third-party payment processors to handle your
                payment information. We do not store your full card details on
                our servers.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              5. Shipping and Delivery
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We deliver physical books to addresses across Nigeria. Delivery
              times may vary depending on your location and the availability of
              the items ordered.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Estimated delivery times are provided at checkout and in your order confirmation email</li>
              <li>We are not responsible for delays caused by third-party shipping carriers, customs, or events beyond our control</li>
              <li>Risk of loss and title for physical items pass to you upon delivery</li>
              <li>E-books and digital products are delivered electronically and are available immediately upon successful payment</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              6. Returns and Refunds
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Returns and refunds are governed by our{" "}
              <a
                href="/refund-policy"
                className="text-brand-500 hover:text-brand-600 underline"
              >
                Refund Policy
              </a>
              . Please review it carefully for details on eligibility, timelines,
              and the process for requesting a return or refund.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              7. E-Books and Digital Content
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              When you purchase an e-book or digital product, you are granted a
              limited, non-exclusive, non-transferable licence to access and read
              the content for personal use only. You may not:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Reproduce, distribute, or share the e-book with others</li>
              <li>Modify, adapt, or create derivative works from the content</li>
              <li>Use the content for commercial purposes without written permission</li>
              <li>Remove or alter any copyright notices or proprietary markings</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              8. Affiliate Programme
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Access&Sellr offers an affiliate programme that allows users to
              earn commissions by referring customers to our platform. By
              participating in the affiliate programme, you agree to the
              following:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>You will promote our products honestly and accurately</li>
              <li>You will not engage in spam, misleading advertising, or any fraudulent activity to generate referrals</li>
              <li>Commission rates and structures are set by Access&Sellr and may change at our discretion</li>
              <li>Commissions are earned only on qualifying purchases made through your referral link</li>
              <li>We reserve the right to withhold or revoke commissions if fraudulent activity is detected</li>
              <li>Payouts are processed according to our affiliate programme terms and payment schedule</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              9. Intellectual Property
            </h2>
            <p className="text-gray-700 leading-relaxed">
              All content on this website — including text, images, logos,
              graphics, product listings, and software — is the property of
              Access&Sellr or its content suppliers and is protected by Nigerian
              and international copyright and intellectual property laws. You may
              not copy, reproduce, distribute, or create derivative works from
              any content on this website without our prior written consent.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              10. Prohibited Conduct
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              When using our website, you agree not to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Use our website for any unlawful purpose</li>
              <li>Attempt to gain unauthorised access to our systems, accounts, or data</li>
              <li>Interfere with or disrupt the operation of our website</li>
              <li>Submit false, misleading, or fraudulent information</li>
              <li>Use automated tools (bots, scrapers) to access or collect data from our site without permission</li>
              <li>Impersonate any person or entity, or misrepresent your affiliation</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              11. Limitation of Liability
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              To the fullest extent permitted by law, Access&Sellr shall not be
              liable for any indirect, incidental, special, consequential, or
              punitive damages, including but not limited to loss of profits,
              data, or goodwill, arising from:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Your use of or inability to use our website</li>
              <li>Any errors, inaccuracies, or omissions in our content or products</li>
              <li>Unauthorised access to or alteration of your data</li>
              <li>Any third-party conduct on or related to our website</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              Our total liability to you for any claim arising from your use of
              our website shall not exceed the amount you paid for the specific
              product or service giving rise to the claim.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              12. Indemnification
            </h2>
            <p className="text-gray-700 leading-relaxed">
              You agree to indemnify, defend, and hold harmless Access&Sellr,
              its officers, directors, employees, and affiliates from any
              claims, damages, losses, liabilities, and expenses (including
              legal fees) arising from your use of our website, your violation of
              these Terms, or your infringement of any third-party rights.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              13. Governing Law
            </h2>
            <p className="text-gray-700 leading-relaxed">
              These Terms are governed by and construed in accordance with the
              laws of the Federal Republic of Nigeria. Any disputes arising from
              or relating to these Terms shall be resolved in the courts located
              in Ibadan, Oyo State, Nigeria.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              14. Changes to These Terms
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to update or modify these Terms at any time.
              Changes will be posted on this page with an updated &quot;Last
              Updated&quot; date. Your continued use of our website after any
              changes constitutes your acceptance of the revised Terms. We
              encourage you to review these Terms periodically.
            </p>
          </section>

          <section className="mb-8 bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Contact Us
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions about these Terms and Conditions, please
              contact us:
            </p>
            <div className="text-gray-700 space-y-2">
              <p>
                <strong>Email:</strong> accessseller01@gmail.com
              </p>
              <p>
                <strong>Phone:</strong> +2348025321179
              </p>
              <p>
                <strong>Address:</strong> The Knowledge Hub, 121/123 Obafemi Awolowo Way, Oke Ado, Ibadan, Nigeria
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
