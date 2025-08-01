import React from "react";
import { ShieldCheck, Mail, Circle } from "lucide-react";

const PrivacyPolicy = ({ isDarkMode = false }) => {
  const mutedText = isDarkMode ? "text-gray-400" : "text-gray-600";
  const policyGradient = isDarkMode
    ? "bg-gradient-to-r from-orange-400 to-orange-600"
    : "bg-gradient-to-r from-blue-500 to-cyan-500";

  return (
    <div className="flex justify-center px-4 pt-30 pb-10 sm:px-6 lg:px-8">
      <div className="w-full max-w-3xl">
        {/* Title + Icon */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <ShieldCheck className={`w-8 h-8 ${isDarkMode ? "text-orange-400" : "text-blue-600"}`} />
          <h1 className="text-3xl sm:text-4xl font-bold text-center">
            <span className={isDarkMode ? "text-white" : "text-black"}>Privacy </span>
            <span className={`bg-clip-text text-transparent ${policyGradient}`}>Policy</span>
          </h1>
        </div>

        {/* Bullet Points */}
        <div className="space-y-4 text-left">
          {[
            "We only collect basic info like email and password during signup.",
            "Your personal data is never sold, shared, or used for ads.",
            "All data is stored securely and only for essential functionality.",
            "We respect your privacy — no tracking or profiling.",
            "This platform is built purely for educational purposes."
          ].map((item, index) => (
            <div key={index} className={`flex items-start gap-3 ${mutedText}`}>
              <Circle className="w-4 h-4 mt-1 shrink-0" />
              <p className="text-sm sm:text-base leading-relaxed">{item}</p>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div className="pt-10 text-center">
          <p className={`text-sm sm:text-base mb-2 ${mutedText}`}>
            For any questions or concerns, feel free to reach out to us:
          </p>
          <div className="flex items-center justify-center gap-2">
            <Mail className={`w-5 h-5 ${isDarkMode ? "text-orange-400" : "text-blue-600"}`} />
            <a
              href="mailto:support@sportshub.com"
              className={`text-sm sm:text-base hover:underline ${isDarkMode ? "text-orange-400" : "text-blue-600"}`}
            >
              support@sportshub.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
