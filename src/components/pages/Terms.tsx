import React from "react";
import { motion } from "framer-motion";

const Terms: React.FC = () => {
  return (
    <section className="w-full bg-[#f6f7f9] min-h-screen py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 lg:p-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#171b25] mb-6 sm:mb-8 text-center">
            Terms and Conditions
          </h1>

          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <p className="text-sm sm:text-base">
              <strong>Last updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-[#171b25] mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="text-sm sm:text-base leading-relaxed">
                By accessing and using Motary's services, you accept and agree
                to be bound by the terms and provision of this agreement. If you
                do not agree to abide by the above, please do not use this
                service.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-[#171b25] mb-4">
                2. Vehicle Information
              </h2>
              <p className="text-sm sm:text-base leading-relaxed">
                All vehicle information provided on our platform is accurate to
                the best of our knowledge. However, we recommend that you
                inspect the vehicle personally or through a qualified mechanic
                before making a purchase decision. Motary is not responsible for
                any discrepancies in vehicle condition that may not be apparent
                from the provided information.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-[#171b25] mb-4">
                3. Pricing and Payment
              </h2>
              <p className="text-sm sm:text-base leading-relaxed">
                All prices listed are in USD and are subject to change without
                notice. Final pricing may vary based on negotiations, additional
                services, or market conditions. Payment terms will be discussed
                and agreed upon during the purchase process. We reserve the
                right to refuse service to anyone at any time.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-[#171b25] mb-4">
                4. Vehicle Inspection and Test Drive
              </h2>
              <p className="text-sm sm:text-base leading-relaxed">
                We strongly recommend that all buyers inspect the vehicle and
                take a test drive before finalizing the purchase. Any issues
                discovered during inspection or test drive should be discussed
                with our sales team before proceeding with the transaction.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-[#171b25] mb-4">
                5. Warranty and Returns
              </h2>
              <p className="text-sm sm:text-base leading-relaxed">
                Vehicle warranties are subject to manufacturer terms and
                conditions. Motary provides a limited warranty on our services
                and will work with you to resolve any legitimate concerns.
                Returns are subject to our return policy and must be initiated
                within 7 days of purchase.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-[#171b25] mb-4">
                6. Privacy and Data Protection
              </h2>
              <p className="text-sm sm:text-base leading-relaxed">
                We are committed to protecting your privacy. Your personal
                information will be used solely for the purpose of facilitating
                your vehicle purchase and will not be shared with third parties
                without your consent, except as required by law.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-[#171b25] mb-4">
                7. Limitation of Liability
              </h2>
              <p className="text-sm sm:text-base leading-relaxed">
                Motary shall not be liable for any indirect, incidental,
                special, consequential, or punitive damages, including without
                limitation, loss of profits, data, use, goodwill, or other
                intangible losses, resulting from your use of our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-[#171b25] mb-4">
                8. Governing Law
              </h2>
              <p className="text-sm sm:text-base leading-relaxed">
                These terms and conditions are governed by and construed in
                accordance with the laws of Morocco, and you irrevocably submit
                to the exclusive jurisdiction of the courts in that state or
                location.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-[#171b25] mb-4">
                9. Contact Information
              </h2>
              <p className="text-sm sm:text-base leading-relaxed">
                If you have any questions about these Terms and Conditions,
                please contact us at:
                <br />
                Email: info@motary.com
                <br />
                Phone: +212 600 000 000
                <br />
                Address: Casablanca, Morocco
              </p>
            </section>

            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm sm:text-base text-gray-600">
                <strong>Note:</strong> By proceeding with any purchase through
                Motary, you acknowledge that you have read, understood, and
                agree to be bound by these Terms and Conditions.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Terms;
