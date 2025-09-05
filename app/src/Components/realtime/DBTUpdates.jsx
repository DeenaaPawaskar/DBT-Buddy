import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  QrCode, 
  Download, 
  Wifi, 
  WifiOff,
  Smartphone,
  MessageCircle,
  FileText,
  Share
} from "lucide-react";
import { QRCodeSVG } from "../ui/qr-code";

export default function OfflineQR({ language = "en" }) {
  const [selectedService, setSelectedService] = useState("whatsapp");

  const services = {
    whatsapp: {
      title: language === "en" ? "WhatsApp Support" : "व्हाट्सऐप सहायता",
      number: "+919876543210",
      message: language === "en" ? 
        "Hi! I need help with DBT scholarship verification." :
        "नमस्ते! मुझे DBT छात्रवृत्ति सत्यापन में सहायता चाहिए।",
      icon: MessageCircle,
      color: "bg-green-500"
    },
    sms: {
      title: language === "en" ? "SMS Support" : "SMS सहायता",
      number: "+919876543210",
      message: "HELP",
      icon: Smartphone,
      color: "bg-blue-500"
    },
    helpline: {
      title: language === "en" ? "Toll-Free Helpline" : "टोल-फ्री हेल्पलाइन",
      number: "1800-XXX-XXXX",
      message: "",
      icon: FileText,
      color: "bg-purple-500"
    }
  };

  const content = {
    en: {
      title: "Offline Access QR Codes",
      subtitle: "Scan these codes to access DBT services even without internet",
      description: "These QR codes work offline and can be saved/printed for later use",
      instructions: [
        "Save these QR codes to your phone gallery",
        "Print them and keep in your documents folder",
        "Share with friends and family who need DBT help",
        "Scan anytime to get instant support"
      ],
      downloadAll: "Download All QR Codes",
      shareCode: "Share QR Code"
    },
    hi: {
      title: "ऑफलाइन एक्सेस QR कोड",
      subtitle: "इंटरनेट के बिना भी DBT सेवाओं का उपयोग करने के लिए इन कोड्स को स्कैन करें",
      description: "ये QR कोड ऑफलाइन काम करते हैं और बाद में उपयोग के लिए सेव/प्रिंट किए जा सकते हैं",
      instructions: [
        "इन QR कोड्स को अपनी फोन गैलरी में सेव करें",
        "इन्हें प्रिंट करें और अपने दस्तावेजों के फोल्डर में रखें",
        "उन दोस्तों और परिवार के साथ साझा करें जिन्हें DBT सहायता चाहिए",
        "तत्काल सहायता के लिए कभी भी स्कैन करें"
      ],
      downloadAll: "सभी QR कोड डाउनलोड करें",
      shareCode: "QR कोड साझा करें"
    }
  };

  const currentContent = content[language];

  const generateQRUrl = (service) => {
    const { number, message } = services[service];
    
    switch (service) {
      case 'whatsapp':
        return `https://api.whatsapp.com/send?phone=${number.replace('+', '')}&text=${encodeURIComponent(message)}`;
      case 'sms':
        return `sms:${number}?body=${encodeURIComponent(message)}`;
      case 'helpline':
        return `tel:${number}`;
      default:
        return '';
    }
  };

  const downloadQR = (service) => {
    const svg = document.querySelector(`#qr-${service} svg`);
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      canvas.width = 150;
      canvas.height = 150;
      
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
        const url = canvas.toDataURL('image/png');
        const a = document.createElement('a');
        a.href = url;
        a.download = `dbt-buddy-${service}-qr.png`;
        a.click();
      };
      
      img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    }
  };

  const downloadAllQRs = async () => {
    // In a real implementation, we'd generate a zip file with all QR codes
    for (const service of Object.keys(services)) {
      setTimeout(() => downloadQR(service), 100 * Object.keys(services).indexOf(service));
    }
  };

  const shareQR = async (service) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `DBT Buddy - ${services[service].title}`,
          text: currentContent.subtitle,
          url: generateQRUrl(service)
        });
      } catch (error) {
        console.log('Share failed:', error);
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(generateQRUrl(service));
      alert(language === "en" ? "Link copied to clipboard!" : "लिंक क्लिपबोर्ड पर कॉपी किया गया!");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-[var(--primary-blue)]">
            <QrCode className="w-8 h-8" />
            <div>
              <h3 className="text-xl">{currentContent.title}</h3>
              <p className="text-sm text-gray-600 font-normal">{currentContent.subtitle}</p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert className="bg-blue-50 border-blue-200 mb-4">
            <WifiOff className="w-4 h-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              {currentContent.description}
            </AlertDescription>
          </Alert>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-3 text-[var(--primary-blue)]">
                {language === "en" ? "How to use:" : "उपयोग कैसे करें:"}
              </h4>
              <ul className="space-y-2">
                {currentContent.instructions.map((instruction, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <div className="w-5 h-5 bg-[var(--primary-orange)] text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5 flex-shrink-0">
                      {index + 1}
                    </div>
                    {instruction}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-center">
              <Button
                onClick={downloadAllQRs}
                className="bg-[var(--primary-blue)] hover:bg-blue-900"
              >
                <Download className="w-4 h-4 mr-2" />
                {currentContent.downloadAll}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* QR Code Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {Object.entries(services).map(([key, service]) => (
          <Card key={key} className="bg-white border border-[var(--border-color)]">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-[var(--primary-blue)]">
                <div className={`p-2 ${service.color} rounded-lg`}>
                  <service.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg">{service.title}</h3>
                  <p className="text-sm text-gray-600 font-normal">{service.number}</p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div id={`qr-${key}`} className="p-4 bg-white border-2 border-dashed border-gray-300 rounded-lg flex justify-center">
                <QRCodeSVG 
                  value={generateQRUrl(key)} 
                  size={150}
                />
              </div>

              {service.message && (
                <div className="p-2 bg-gray-50 rounded text-xs text-gray-600">
                  <strong>{language === "en" ? "Auto Message:" : "स्वचालित संदेश:"}</strong><br />
                  "{service.message}"
                </div>
              )}

              <div className="flex gap-2 justify-center">
                <Button
                  onClick={() => downloadQR(key)}
                  variant="outline"
                  size="sm"
                  className="border-gray-300"
                >
                  <Download className="w-4 h-4 mr-1" />
                  {language === "en" ? "Download" : "डाउनलोड"}
                </Button>
                
                <Button
                  onClick={() => shareQR(key)}
                  variant="outline"
                  size="sm"
                  className="border-blue-300 text-blue-600"
                >
                  <Share className="w-4 h-4 mr-1" />
                  {language === "en" ? "Share" : "साझा करें"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Usage Statistics */}
      <Card className="bg-gray-50 border-gray-200">
        <CardContent className="p-6">
          <div className="grid md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-[var(--primary-blue)]">24/7</div>
              <div className="text-sm text-gray-600">
                {language === "en" ? "Available" : "उपलब्ध"}
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">0KB</div>
              <div className="text-sm text-gray-600">
                {language === "en" ? "Data Usage" : "डेटा उपयोग"}
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">3</div>
              <div className="text-sm text-gray-600">
                {language === "en" ? "Contact Methods" : "संपर्क विधियां"}
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">∞</div>
              <div className="text-sm text-gray-600">
                {language === "en" ? "Usage Limit" : "उपयोग सीमा"}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}