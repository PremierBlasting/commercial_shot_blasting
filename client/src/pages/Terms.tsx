import { Header } from "@/components/Header";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Footer } from "@/components/Footer";

export default function Terms() {
  return (
    <div className="min-h-screen bg-[#F5F1E8]">
      <Header onOpenQuotePopup={() => {}} />
      
      <Breadcrumb items={[
        { label: "Home", href: "/" },
        { label: "Terms & Conditions", href: "/terms", isCurrentPage: true }
      ]} className="container mt-6" />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8 md:p-12">
          <h1 className="text-4xl font-bold text-[#2C5F7F] mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
            Terms and Conditions
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              Last updated: January 2026
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#2C5F7F] mb-4">1. Introduction</h2>
              <p className="text-gray-700 mb-4">
                Welcome to Commercial Shot Blasting ("we," "our," or "us"). These Terms and Conditions govern your use of our website and services. By accessing our website or engaging our services, you agree to be bound by these terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#2C5F7F] mb-4">2. Services</h2>
              <p className="text-gray-700 mb-4">
                Commercial Shot Blasting provides professional shot blasting and surface preparation services across the UK. Our services include but are not limited to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Steel shot blasting</li>
                <li>Concrete surface preparation</li>
                <li>Rust removal and prevention</li>
                <li>Paint stripping</li>
                <li>Automotive restoration</li>
                <li>Industrial equipment cleaning</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#2C5F7F] mb-4">3. Quotations and Pricing</h2>
              <p className="text-gray-700 mb-4">
                All quotations provided are valid for 30 days from the date of issue unless otherwise stated. Prices are subject to change based on site conditions, material costs, and project scope variations. Final pricing will be confirmed in writing before work commences.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#2C5F7F] mb-4">4. Payment Terms</h2>
              <p className="text-gray-700 mb-4">
                Payment terms will be specified in your project quotation. Standard payment terms are:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Deposit may be required for larger projects</li>
                <li>Final payment due upon completion of work</li>
                <li>Payment methods accepted: Bank transfer, cheque, or cash</li>
                <li>Late payment may incur additional charges</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#2C5F7F] mb-4">5. Project Scheduling</h2>
              <p className="text-gray-700 mb-4">
                We will make every effort to complete work within agreed timeframes. However, completion dates are estimates and may be affected by weather conditions, site access, unforeseen circumstances, or client-requested changes. We will communicate any delays promptly.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#2C5F7F] mb-4">6. Client Responsibilities</h2>
              <p className="text-gray-700 mb-4">
                Clients are responsible for:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Providing safe and adequate access to work areas</li>
                <li>Ensuring utilities and services are clearly marked</li>
                <li>Removing or protecting items that may be damaged during work</li>
                <li>Providing accurate information about site conditions and materials</li>
                <li>Obtaining necessary permissions for work on their property</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#2C5F7F] mb-4">7. Health and Safety</h2>
              <p className="text-gray-700 mb-4">
                We maintain comprehensive health and safety procedures and hold appropriate insurance coverage. Our team follows all relevant UK health and safety regulations. Clients must ensure that our team has a safe working environment and notify us of any site-specific hazards.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#2C5F7F] mb-4">8. Warranty and Liability</h2>
              <p className="text-gray-700 mb-4">
                We warrant that our services will be performed with reasonable skill and care. Our liability is limited to the value of the specific service provided. We are not liable for:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Pre-existing defects in materials or structures</li>
                <li>Damage caused by client-provided information being inaccurate</li>
                <li>Consequential losses or business interruption</li>
                <li>Issues arising from inadequate site preparation by the client</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#2C5F7F] mb-4">9. Cancellation Policy</h2>
              <p className="text-gray-700 mb-4">
                Cancellations must be made in writing. Cancellation charges may apply:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>More than 7 days before scheduled work: No charge</li>
                <li>3-7 days before scheduled work: 25% of quoted price</li>
                <li>Less than 3 days before scheduled work: 50% of quoted price</li>
                <li>Same day cancellation: 100% of quoted price</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#2C5F7F] mb-4">10. Waste Management</h2>
              <p className="text-gray-700 mb-4">
                We are committed to environmental responsibility and comply with all relevant UK waste management practices. Waste materials are disposed of in accordance with current legislation, and we maintain appropriate waste carrier licenses.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#2C5F7F] mb-4">11. Intellectual Property</h2>
              <p className="text-gray-700 mb-4">
                All content on this website, including text, images, logos, and design elements, is the property of Commercial Shot Blasting or its licensors and is protected by UK and international copyright laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#2C5F7F] mb-4">12. Privacy and Data Protection</h2>
              <p className="text-gray-700 mb-4">
                We are committed to protecting your privacy and comply with the UK Data Protection Act 2018 and GDPR. Please refer to our Privacy Policy for detailed information about how we collect, use, and protect your personal data.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#2C5F7F] mb-4">13. Dispute Resolution</h2>
              <p className="text-gray-700 mb-4">
                In the event of any dispute arising from these terms or our services, we encourage clients to contact us directly to resolve the matter amicably. If a resolution cannot be reached, disputes will be governed by English law and subject to the exclusive jurisdiction of the English courts.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#2C5F7F] mb-4">14. Changes to Terms</h2>
              <p className="text-gray-700 mb-4">
                We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting to our website. Continued use of our services after changes constitutes acceptance of the modified terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#2C5F7F] mb-4">15. Contact Information</h2>
              <p className="text-gray-700 mb-4">
                For questions about these Terms and Conditions, please contact us:
              </p>
              <div className="bg-[#F5F1E8] p-6 rounded-lg">
                <p className="text-gray-700 mb-2"><strong>Phone:</strong> 07970 566409</p>
                <p className="text-gray-700 mb-2"><strong>Email:</strong> info@commercialshotblasting.co.uk</p>
                <p className="text-gray-700"><strong>Service Area:</strong> Professional service across England & Wales</p>
              </div>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
