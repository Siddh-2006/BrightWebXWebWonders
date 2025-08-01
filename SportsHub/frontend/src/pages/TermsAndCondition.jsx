import React from "react";
import { FileText, Calendar, Mail } from "lucide-react";

const TermsAndConditions = ({ isDarkMode = false }) => {
  const textColor = isDarkMode ? "text-white" : "text-black";
  const mutedText = isDarkMode ? "text-gray-300" : "text-gray-600";
  const accentColor = isDarkMode ? "text-orange-400" : "text-blue-600";

  return (
    <div className={`min-h-screen px-4 sm:px-6 lg:px-8 py-10 pt-30 ${isDarkMode ? "bg-transparent" : "bg-white"} ${textColor}`}>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <FileText className={`w-6 h-6 ${accentColor}`} />
          <h1 className={`text-2xl sm:text-3xl font-bold ${accentColor}`}>Terms & Conditions</h1>
        </div>
        <div className={`flex justify-center items-center text-xs sm:text-sm ${mutedText}`}>
          <Calendar className="w-4 h-4 mr-1" />
          <span>Last updated: July 30, 2025</span>
        </div>

        {/* Summary */}
        <p className={`${mutedText} text-sm sm:text-base leading-relaxed`}>
          By using this platform, you agree to the terms outlined below. These are simple and meant to ensure everyone uses the platform responsibly and respectfully.
        </p>

        <ul className={`list-disc pl-5 space-y-2 text-sm sm:text-base ${mutedText}`}>
          <li>Be respectful to others while using the platform.</li>
          <li>Don’t misuse or try to hack the website.</li>
          <li>Don’t post inappropriate content.</li>
          <li>Your data is safe and never shared without your consent.</li>
          <li>Admins can remove accounts that violate basic rules.</li>
        </ul>

        {/* Contact */}
        <div className="pt-6 border-t mt-8 sm:mt-10 border-gray-600 dark:border-gray-700">
          <div className="flex items-center justify-center gap-2 mt-6">
            <span className={`text-sm sm:text-base ${mutedText}`}>Feel free to contact us :</span>
            <Mail className={`w-5 h-5 ${accentColor}`} />
            <a
              href="mailto:support@sportshub.com"
              className={`text-sm sm:text-base hover:underline ${accentColor}`}
            >
              support@sportshub.com
            </a>
          </div>
        </div>
        <p className={`text-center text-xs sm:text-sm mt-4 ${mutedText}`}>
          These guidelines are for a smooth experience. By continuing to use the site, you accept these terms.
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
