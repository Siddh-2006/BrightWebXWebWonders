import React from "react";
import { Shield, Eye, Users, Cookie, UserCheck, Mail, Calendar, Lock } from "lucide-react";

const PrivacyPolicy = ({ isDarkMode = false }) => {
  const bgColor = isDarkMode ? "bg-transparent" : "bg-transparent";
  const containerBg = isDarkMode ? "bg-transparent" : "bg-transparent";
  const textColor = isDarkMode ? "text-gray-100" : "text-gray-800";
  const mutedText = isDarkMode ? "text-gray-300" : "text-gray-600";
  const accentColor = isDarkMode ? "text-orange-400" : "text-blue-600";
  const borderColor = isDarkMode ? "border-gray-700" : "border-gray-200";
  const cardBg = isDarkMode ? "bg-gray-700/50" : "bg-blue-50";

  const sections = [
    {
      icon: Shield,
      title: "Information We Collect",
      content: {
        intro: "We collect information you provide directly and automatically when you use our services:",
        points: [
          {
            category: "Personal Information",
            items: [
              "Full name and contact details (email, phone number)",
              "Account credentials and profile information",
              "Payment information and billing address",
              "Communications and feedback you send to us"
            ]
          },
          {
            category: "Automatic Information",
            items: [
              "IP address, browser type, and device information",
              "Usage patterns, pages visited, and time spent",
              "Location data (if you enable location services)",
              "Cookies and similar tracking technologies"
            ]
          },
          {
            category: "Third-Party Information",
            items: [
              "Information from social media platforms (with your consent)",
              "Data from our business partners and service providers",
              "Publicly available information from online sources"
            ]
          }
        ]
      }
    },
    {
      icon: Eye,
      title: "How We Use Your Information",
      content: {
        intro: "We use your information for legitimate business purposes including:",
        points: [
          {
            category: "Service Delivery",
            items: [
              "Providing, maintaining, and improving our services",
              "Processing transactions and managing your account",
              "Personalizing your experience and content recommendations",
              "Providing customer support and responding to inquiries"
            ]
          },
          {
            category: "Communication",
            items: [
              "Sending important updates about our services",
              "Marketing communications (with your consent)",
              "Security alerts and administrative notices",
              "Surveys and feedback requests"
            ]
          },
          {
            category: "Analytics & Improvement",
            items: [
              "Analyzing usage patterns to improve our services",
              "Conducting research and development",
              "Monitoring and preventing fraud and security threats",
              "Complying with legal obligations and regulations"
            ]
          }
        ]
      }
    },
    {
      icon: Users,
      title: "Information Sharing & Disclosure",
      content: {
        intro: "We may share your information in the following circumstances:",
        points: [
          {
            category: "Service Providers",
            items: [
              "Cloud hosting and data storage providers",
              "Payment processors and financial institutions",
              "Analytics and marketing service providers",
              "Customer support and communication platforms"
            ]
          },
          {
            category: "Legal Requirements",
            items: [
              "When required by law or legal process",
              "To protect our rights, property, or safety",
              "To prevent fraud or security threats",
              "In connection with business transfers or mergers"
            ]
          },
          {
            category: "With Your Consent",
            items: [
              "When you explicitly agree to share information",
              "For marketing partnerships (opt-in only)",
              "Social media integrations you authorize",
              "Third-party applications you connect"
            ]
          }
        ]
      }
    },
    {
      icon: Cookie,
      title: "Cookies & Tracking Technologies",
      content: {
        intro: "We use various technologies to collect and store information:",
        points: [
          {
            category: "Essential Cookies",
            items: [
              "Authentication and security cookies",
              "Session management and user preferences",
              "Load balancing and performance optimization",
              "Shopping cart and transaction processing"
            ]
          },
          {
            category: "Analytics Cookies",
            items: [
              "Website usage statistics and performance metrics",
              "User behavior analysis and heatmaps",
              "A/B testing and feature optimization",
              "Error tracking and debugging information"
            ]
          },
          {
            category: "Marketing Cookies",
            items: [
              "Personalized advertising and content",
              "Social media integration and sharing",
              "Cross-platform tracking (with consent)",
              "Retargeting and conversion tracking"
            ]
          }
        ]
      }
    },
    {
      icon: UserCheck,
      title: "Your Privacy Rights",
      content: {
        intro: "You have several rights regarding your personal information:",
        points: [
          {
            category: "Access & Control",
            items: [
              "Right to access your personal data we hold",
              "Right to update or correct inaccurate information",
              "Right to delete your personal data (right to be forgotten)",
              "Right to restrict or object to certain processing"
            ]
          },
          {
            category: "Data Portability",
            items: [
              "Right to receive your data in a portable format",
              "Right to transfer your data to another service",
              "Right to obtain copies of your information",
              "Right to know how your data is processed"
            ]
          },
          {
            category: "Communication Preferences",
            items: [
              "Opt-out of marketing communications anytime",
              "Manage cookie preferences in your browser",
              "Control location tracking settings",
              "Adjust notification and alert preferences"
            ]
          }
        ]
      }
    }
  ];

  return (
    <div className={`min-h-screen ${bgColor} transition-colors pt-20 md:pt-0 duration-300`}>
      <div className={`${containerBg} shadow-lg transition-colors duration-300`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12 mt-6 sm:mt-10">
            <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 ${cardBg} rounded-full mb-4 sm:mb-6`}>
              <Shield className={`w-6 h-6 sm:w-8 sm:h-8 ${accentColor}`} />
            </div>
            <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-bold ${textColor} mb-3 sm:mb-4`}>Privacy Policy</h1>
            <div className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 ${mutedText} text-xs sm:text-sm`}>
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Last updated: July 30, 2025</span>
            </div>
          </div>

          {/* Introduction */}
          <div className={`${cardBg} rounded-lg sm:rounded-xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-10 border ${borderColor}`}>
            <h2 className={`text-lg sm:text-xl lg:text-2xl font-semibold ${textColor} mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3`}>
              <Lock className={`w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 ${accentColor}`} />
              Our Commitment to Your Privacy
            </h2>
            <p className={`${mutedText} leading-relaxed text-sm sm:text-base lg:text-lg`}>
              At our company, we believe privacy is a fundamental human right. This policy explains how we collect, 
              use, and protect your personal information when you use our services. We are committed to being 
              transparent about our data practices and giving you control over your information.
            </p>
          </div>

          {/* Dynamic Sections */}
          {sections.map((section, index) => {
            const IconComponent = section.icon;
            return (
              <div key={index} className={`bg-white ${isDarkMode ? "dark:bg-gray-800" : "dark:bg-blue-50"} rounded-lg sm:rounded-xl shadow-md border ${borderColor} mb-6 sm:mb-8 overflow-hidden transition-colors duration-300`}>
                <div className={`${cardBg} px-4 sm:px-6 lg:px-8 py-4 sm:py-6 border-b ${borderColor}`}>
                  <h2 className={`text-lg sm:text-xl lg:text-2xl font-semibold ${textColor} flex items-center gap-2 sm:gap-3`}>
                    <IconComponent className={`w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 ${accentColor}`} />
                    {section.title}
                  </h2>
                </div>
                
                <div className="p-4 sm:p-6 lg:p-8">
                  <p className={`${mutedText} mb-4 sm:mb-6 text-sm sm:text-base lg:text-lg leading-relaxed`}>
                    {section.content.intro}
                  </p>
                  
                  <div className="space-y-6 sm:space-y-8">
                    {section.content.points.map((pointGroup, pointIndex) => (
                      <div key={pointIndex}>
                        <h3 className={`text-base sm:text-lg font-semibold ${textColor} mb-3 sm:mb-4 flex items-center gap-2`}>
                          <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 ${accentColor.replace('text-', 'bg-')} rounded-full`}></div>
                          {pointGroup.category}
                        </h3>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-3">
                          {pointGroup.items.map((item, itemIndex) => (
                            <div key={itemIndex} className={`flex items-start gap-2 sm:gap-3 p-3 sm:p-4 rounded-md sm:rounded-lg ${isDarkMode ? 'bg-gray-700/30' : 'bg-gray-50'} border ${borderColor}`}>
                              <div className={`w-1 h-1 sm:w-1.5 sm:h-1.5 ${accentColor.replace('text-', 'bg-')} rounded-full mt-2 flex-shrink-0`}></div>
                              <span className={`${mutedText} text-xs sm:text-sm leading-relaxed`}>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Additional Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-10">
            <div className={`bg-white ${isDarkMode ? "dark:bg-gray-800" : "dark:bg-blue-50"} rounded-lg sm:rounded-xl shadow-md border ${borderColor} p-4 sm:p-6 lg:p-8 transition-colors duration-300`}>
              <h2 className={`text-base sm:text-lg lg:text-xl font-semibold ${textColor} mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3`}>
                <Shield className={`w-4 h-4 sm:w-5 sm:h-5 ${accentColor}`} />
                Data Security
              </h2>
              <p className={`${mutedText} leading-relaxed mb-3 sm:mb-4 text-xs sm:text-sm`}>
                We implement industry-standard security measures to protect your information, including encryption, 
                secure servers, and regular security audits.
              </p>
              <div className={`text-xs sm:text-sm ${mutedText} space-y-1`}>
                <p>• End-to-end encryption for sensitive data</p>
                <p>• Regular security assessments and updates</p>
                <p>• Secure data centers with 24/7 monitoring</p>
              </div>
            </div>

            <div className={`bg-white ${isDarkMode ? "dark:bg-gray-800" : "dark:bg-blue-50"} rounded-lg sm:rounded-xl shadow-md border ${borderColor} p-4 sm:p-6 lg:p-8 transition-colors duration-300`}>
              <h2 className={`text-base sm:text-lg lg:text-xl font-semibold ${textColor} mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3`}>
                <Calendar className={`w-4 h-4 sm:w-5 sm:h-5 ${accentColor}`} />
                Policy Updates
              </h2>
              <p className={`${mutedText} leading-relaxed mb-3 sm:mb-4 text-xs sm:text-sm`}>
                We may update this privacy policy periodically. We'll notify you of significant changes through 
                email or prominent notices on our website.
              </p>
              <div className={`text-xs sm:text-sm ${mutedText} space-y-1`}>
                <p>• Email notifications for major changes</p>
                <p>• 30-day notice period for significant updates</p>
                <p>• Version history available upon request</p>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className={`${cardBg} rounded-lg sm:rounded-xl p-4 sm:p-6 lg:p-8 border ${borderColor} text-center`}>
            <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 ${isDarkMode ? 'bg-gray-600' : 'bg-white'} rounded-full mb-4 sm:mb-6 shadow-md`}>
              <Mail className={`w-6 h-6 sm:w-8 sm:h-8 ${accentColor}`} />
            </div>
            <h2 className={`text-lg sm:text-xl lg:text-2xl font-semibold ${textColor} mb-3 sm:mb-4`}>Questions or Concerns?</h2>
            <p className={`${mutedText} mb-4 sm:mb-6 leading-relaxed max-w-2xl mx-auto text-sm sm:text-base px-2`}>
              If you have any questions about this privacy policy or how we handle your personal information, 
              we're here to help. Our privacy team responds to all inquiries within 48 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center items-center text-sm">
              <a 
                href="mailto:privacy@yourwebsite.com" 
                className={`${accentColor} hover:underline font-medium flex items-center gap-2 break-all`}
              >
                <Mail className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                privacy@yourwebsite.com
              </a>
              <span className={`${mutedText} hidden sm:block`}>•</span>
              <span className={`${mutedText} text-xs sm:text-sm text-center`}>
                Privacy Officer: Available Monday-Friday, 9 AM - 5 PM EST
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;