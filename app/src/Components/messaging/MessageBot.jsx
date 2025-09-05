import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  Phone, 
  CheckCircle2, 
  AlertCircle,
  FileText,
  Users,
  Clock
} from "lucide-react";

export default function MessageBot({ language = "en" }) {
  const [activeCommands, setActiveCommands] = useState([]);

  const commands = {
    en: [
      {
        command: "HELP",
        description: "Get list of all available commands",
        response: "Available commands: STATUS, DOCS, SCHEMES, QUIZ, BANK, SUPPORT"
      },
      {
        command: "STATUS [last4digits]",
        description: "Check DBT status using Aadhaar last 4 digits",
        response: "Checking DBT status for ****{digits}. Please wait..."
      },
      {
        command: "DOCS",
        description: "Get required documents list",
        response: "Required Documents:\n1. Aadhaar Card\n2. Bank Passbook\n3. Income Certificate\n4. Educational Certificates"
      },
      {
        command: "SCHEMES",
        description: "List available scholarship schemes",
        response: "Popular Schemes:\n• Pre-Matric Scholarships\n• Post-Matric Scholarships\n• NMMSS\n• State-specific schemes"
      },
      {
        command: "QUIZ",
        description: "Take DBT knowledge quiz",
        response: "Starting DBT Quiz! Question 1/5: What does DBT stand for?"
      },
      {
        command: "BANK [pincode]",
        description: "Find nearby banks for DBT seeding",
        response: "Nearest banks in {pincode}:\n• SBI Branch - 2km\n• HDFC Bank - 3km\n• PNB Branch - 1.5km"
      },
      {
        command: "SUPPORT",
        description: "Connect with human support",
        response: "Connecting you to support agent. Please wait..."
      }
    ],
    hi: [
      {
        command: "मदद",
        description: "सभी उपलब्ध कमांड की सूची प्राप्त करें",
        response: "उपलब्ध कमांड: स्थिति, दस्तावेज, योजनाएं, क्विज़, बैंक, सहायता"
      },
      {
        command: "स्थिति [अंतिम4अंक]",
        description: "आधार के अंतिम 4 अंकों का उपयोग करके डीबीटी स्थिति जांचें",
        response: "****{digits} के लिए DBT स्थिति जांची जा रही है। कृपया प्रतीक्षा करें..."
      },
      {
        command: "दस्तावेज",
        description: "आवश्यक दस्तावेजों की सूची प्राप्त करें",
        response: "आवश्यक दस्तावेज:\n1. आधार कार्ड\n2. बैंक पासबुक\n3. आय प्रमाणपत्र\n4. शैक्षणिक प्रमाणपत्र"
      }
    ]
  };

  const currentCommands = commands[language];

  const botFeatures = {
    en: [
      {
        icon: CheckCircle2,
        title: "Instant Verification",
        description: "Check DBT status in real-time via SMS/WhatsApp"
      },
      {
        icon: FileText,
        title: "Document Guidance",
        description: "Get step-by-step document requirements"
      },
      {
        icon: Users,
        title: "Multi-language Support",
        description: "Available in English and Hindi"
      },
      {
        icon: Clock,
        title: "24/7 Availability",
        description: "Get help anytime, anywhere"
      }
    ],
    hi: [
      {
        icon: CheckCircle2,
        title: "तत्काल सत्यापन",
        description: "SMS/व्हाट्सऐप के माध्यम से रियल-टाइम में DBT स्थिति जांचें"
      },
      {
        icon: FileText,
        title: "दस्तावेज मार्गदर्शन",
        description: "चरण-दर-चरण दस्तावेज आवश्यकताएं प्राप्त करें"
      },
      {
        icon: Users,
        title: "बहुभाषी समर्थन",
        description: "अंग्रेजी और हिंदी में उपलब्ध"
      },
      {
        icon: Clock,
        title: "24/7 उपलब्धता",
        description: "कभी भी, कहीं भी सहायता प्राप्त करें"
      }
    ]
  };

  const currentFeatures = botFeatures[language];

  return (
    <div className="space-y-6">
      {/* Bot Features */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {currentFeatures.map((feature, index) => (
          <Card key={index} className="bg-white border border-[var(--border-color)]">
            <CardContent className="p-4 text-center">
              <feature.icon className="w-8 h-8 text-[var(--primary-blue)] mx-auto mb-3" />
              <h3 className="font-semibold text-sm mb-2">{feature.title}</h3>
              <p className="text-xs text-gray-600">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Available Commands */}
      <Card className="bg-white border border-[var(--border-color)]">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-[var(--primary-blue)]">
            <MessageSquare className="w-6 h-6" />
            {language === "en" ? "Message Bot Commands" : "संदेश बॉट कमांड"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              {language === "en" ? 
                "Send these commands via WhatsApp (+91-98765-43210) or SMS to get instant help:" :
                "तत्काल सहायता के लिए व्हाट्सऐप (+91-98765-43210) या SMS के माध्यम से ये कमांड भेजें:"
              }
            </p>
            
            <div className="grid gap-3">
              {currentCommands.map((cmd, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-[var(--primary-blue)] text-white font-mono">
                          {cmd.command}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">{cmd.description}</p>
                      <div className="p-2 bg-white border-l-4 border-[var(--primary-orange)] text-xs text-gray-600">
                        📱 {cmd.response}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        const phoneNumber = "919876543210";
                        const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(cmd.command.split(' ')[0])}`;
                        window.open(whatsappUrl, '_blank');
                      }}
                    >
                      <Phone className="w-4 h-4 mr-1" />
                      {language === "en" ? "Try" : "आज़माएं"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Information */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-[var(--primary-blue)] mb-2">
                {language === "en" ? "Contact Information" : "संपर्क जानकारी"}
              </h4>
              <div className="space-y-2 text-sm">
                <p><strong>WhatsApp:</strong> +91-98765-43210</p>
                <p><strong>SMS:</strong> +91-98765-43210</p>
                <p><strong>Helpline:</strong> 1800-XXX-XXXX (Toll Free)</p>
                <p className="text-xs text-gray-600 mt-3">
                  {language === "en" ? 
                    "* Standard messaging rates may apply for SMS. WhatsApp requires internet connection." :
                    "* SMS के लिए मानक संदेश दरें लागू हो सकती हैं। व्हाट्सऐप के लिए इंटरनेट कनेक्शन आवश्यक है।"
                  }
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}