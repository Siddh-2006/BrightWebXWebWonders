import React from "react";
import { FileText, Calendar, Mail } from "lucide-react";

const TermsAndConditions = ({ isDarkMode = false }) => {
  const bgColor = isDarkMode ? "bg-transparent" : "bg-white";
  const textColor = isDarkMode ? "text-white" : "text-black";
  const mutedText = isDarkMode ? "text-gray-300" : "text-gray-600";
  const accentColor = isDarkMode ? "text-orange-400" : "text-blue-600";

  return (
    <div className={`min-h-screen px-4 sm:px-6 lg:px-8 py-6 sm:py-10 ${bgColor} ${textColor}`}>
      <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-bold ${accentColor} mb-3 sm:mb-4`}>Terms & Conditions</h1>
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 ${mutedText} text-xs sm:text-sm`}>
            <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>Last updated: July 30, 2025</span>
          </div>
        </div>

        {/* Introduction */}
        <div className="mb-6 sm:mb-10">
          <p className={`${mutedText} text-base sm:text-lg leading-relaxed text-center max-w-3xl mx-auto px-2`}>
            By using our website and services, you agree to these terms. They're designed to create a safe, 
            fair environment for everyone. Please read them carefully.
          </p>
        </div>

        {/* Terms Sections */}
        <section className="space-y-4 sm:space-y-6">
          <div>
            <h2 className={`text-lg sm:text-xl lg:text-2xl font-semibold ${textColor} mb-3 sm:mb-4`}>1. Acceptance of Terms</h2>
            <p className={`${mutedText} leading-relaxed text-sm sm:text-base`}>
              By accessing or using our website and services, you confirm that you have read, understood, 
              and agree to be bound by these Terms & Conditions. If you don't agree with any part of these 
              terms, you must not use our services.
            </p>
          </div>

          <div>
            <h2 className={`text-lg sm:text-xl lg:text-2xl font-semibold ${textColor} mb-3 sm:mb-4`}>2. Changes to Terms</h2>
            <p className={`${mutedText} leading-relaxed text-sm sm:text-base`}>
              We may update these terms from time to time to reflect changes in our services or legal 
              requirements. We'll notify you of significant changes by email or through a prominent notice 
              on our website. Your continued use after changes means you accept the updated terms.
            </p>
          </div>

          <div>
            <h2 className={`text-lg sm:text-xl lg:text-2xl font-semibold ${textColor} mb-3 sm:mb-4`}>3. Account Requirements</h2>
            <p className={`${mutedText} leading-relaxed mb-2 sm:mb-3 text-sm sm:text-base`}>To use our services, you must:</p>
            <ul className={`${mutedText} space-y-1 sm:space-y-2 ml-4 sm:ml-6 text-sm sm:text-base`}>
              <li>• Be at least 13 years old (or the legal age in your jurisdiction)</li>
              <li>• Provide accurate and complete registration information</li>
              <li>• Keep your account credentials secure and confidential</li>
              <li>• Notify us immediately of any unauthorized use of your account</li>
            </ul>
          </div>

          <div>
            <h2 className={`text-lg sm:text-xl lg:text-2xl font-semibold ${textColor} mb-3 sm:mb-4`}>4. What You Can't Do</h2>
            <p className={`${mutedText} leading-relaxed mb-2 sm:mb-3 text-sm sm:text-base`}>You agree not to:</p>
            <ul className={`${mutedText} space-y-1 sm:space-y-2 ml-4 sm:ml-6 text-sm sm:text-base`}>
              <li>• Use our services for any illegal or unauthorized purpose</li>
              <li>• Harass, abuse, or harm other users</li>
              <li>• Upload malicious code, viruses, or harmful content</li>
              <li>• Attempt to gain unauthorized access to our systems</li>
              <li>• Interfere with the proper functioning of our services</li>
              <li>• Violate any laws or regulations in your jurisdiction</li>
            </ul>
          </div>

          <div>
            <h2 className={`text-lg sm:text-xl lg:text-2xl font-semibold ${textColor} mb-3 sm:mb-4`}>5. Our Content & Your Rights</h2>
            <p className={`${mutedText} leading-relaxed mb-2 sm:mb-3 text-sm sm:text-base`}>
              All content on our platform, including text, graphics, logos, images, and software, is owned 
              by us or our licensors and protected by copyright laws. You may not:
            </p>
            <ul className={`${mutedText} space-y-1 sm:space-y-2 ml-4 sm:ml-6 text-sm sm:text-base`}>
              <li>• Copy, modify, or distribute our content without permission</li>
              <li>• Use our trademarks or logos without written consent</li>
              <li>• Reverse engineer or attempt to extract source code</li>
              <li>• Create derivative works based on our content</li>
            </ul>
          </div>

          <div>
            <h2 className={`text-lg sm:text-xl lg:text-2xl font-semibold ${textColor} mb-3 sm:mb-4`}>6. Privacy & Your Data</h2>
            <p className={`${mutedText} leading-relaxed text-sm sm:text-base`}>
              Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect 
              your information. By using our services, you also agree to our Privacy Policy. We don't sell 
              your personal data, you can request data deletion anytime, and we use industry-standard security measures.
            </p>
          </div>

          <div>
            <h2 className={`text-lg sm:text-xl lg:text-2xl font-semibold ${textColor} mb-3 sm:mb-4`}>7. Limitation of Liability</h2>
            <p className={`${mutedText} leading-relaxed text-sm sm:text-base`}>
              Our services are provided "as is" without warranties. We're not liable for any indirect, 
              incidental, or consequential damages arising from your use of our services. Our total 
              liability is limited to the amount you've paid us in the past 12 months.
            </p>
          </div>

          <div>
            <h2 className={`text-lg sm:text-xl lg:text-2xl font-semibold ${textColor} mb-3 sm:mb-4`}>8. Account Termination</h2>
            <p className={`${mutedText} leading-relaxed text-sm sm:text-base`}>
              We may suspend or terminate your account if you violate these terms, engage in harmful 
              behavior, or for any reason with 30 days' notice. You can also close your account at 
              any time through your account settings.
            </p>
          </div>

          <div>
            <h2 className={`text-lg sm:text-xl lg:text-2xl font-semibold ${textColor} mb-3 sm:mb-4`}>9. Dispute Resolution</h2>
            <p className={`${mutedText} leading-relaxed text-sm sm:text-base`}>
              If you have a dispute with us, we encourage you to contact us first to try to resolve it 
              informally. Any legal disputes will be resolved through binding arbitration rather than 
              court proceedings, except where prohibited by law.
            </p>
          </div>

          <div>
            <h2 className={`text-lg sm:text-xl lg:text-2xl font-semibold ${textColor} mb-3 sm:mb-4`}>10. Contact Us</h2>
            <p className={`${mutedText} leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base`}>
              If you have questions about these Terms & Conditions or need clarification on any point, 
              our legal team is here to help and will respond within 2 business days.
            </p>
            <p className={`${mutedText} text-sm sm:text-base`}>
              Email us at: <a href="mailto:legal@sportshub.com" className={`${accentColor} hover:underline font-medium break-all`}>legal@sportshub.com</a>
            </p>
          </div>
        </section>

        {/* Footer */}
        <div className={`text-center mt-8 sm:mt-12 pt-6 sm:pt-8 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <p className={`text-xs sm:text-sm ${mutedText} max-w-2xl mx-auto px-2 leading-relaxed`}>
            These terms constitute the entire agreement between you and us regarding your use of our services. 
            If any provision is found unenforceable, the remaining provisions will remain in effect.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;