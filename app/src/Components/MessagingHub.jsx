import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  QrCode, 
  Zap, 
  Volume2,
  Smartphone,
  Wifi,
  Bell
} from "lucide-react";

import WhatsAppIntegration from "../components/messaging/WhatsAppIntegration";
import MessageBot from "../components/messaging/MessageBot";
import DBTUpdates from "../components/realtime/DBTUpdates";
import OfflineQR from "../components/messaging/OfflineQR";
import TextToSpeech from "../components/tts/TextToSpeech";

export default function MessagingHub() {
  const [language, setLanguage] = useState("en");

  const content = {
    en: {
      title: "Messaging & Communication Hub",
      subtitle: "Connect with DBT services via WhatsApp, SMS, and voice assistants",
      whatsapp: "WhatsApp Support",
      bot: "Message Bot",
      updates: "Real-time Updates", 
      offline: "Offline Access",
      tts: "Voice Assistant"
    },
    hi: {
      title: "मैसेजिंग और कम्युनिकेशन हब",
      subtitle: "व्हाट्सऐप, SMS, और वॉयस असिस्टेंट के माध्यम से DBT सेवाओं से जुड़ें",
      whatsapp: "व्हाट्सऐप सहायता",
      bot: "मैसेज बॉट",
      updates: "रियल-टाइम अपडेट",
      offline: "ऑफलाइन एक्सेस",
      tts: "वॉयस असिस्टेंट"
    }
  };

  const currentContent = content[language];

  const demoText = language === "en" ? 
    "Welcome to DBT Buddy! Your Digital Scholarship Assistant. We help you check DBT readiness, learn about schemes, and get real-time updates about your scholarship applications. You can access our services via WhatsApp, SMS, or through our voice assistant in both English and Hindi." :
    "डीबीटी मित्र में आपका स्वागत है! आपका डिजिटल छात्रवृत्ति सहायक। हम आपको DBT तैयारी जांचने, योजनाओं के बारे में जानने, और आपके छात्रवृत्ति आवेदनों के बारे में रियल-टाइम अपडेट प्राप्त करने में मदद करते हैं। आप हमारी सेवाओं का उपयोग व्हाट्सऐप, SMS, या अंग्रेजी और हिंदी दोनों में हमारे वॉयस असिस्टेंट के माध्यम से कर सकते हैं।";

  return (
    <div className="min-h-screen bg-[var(--background-light)] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge className="mb-4 bg-blue-100 text-[var(--secondary-blue)]">
            {language === "en" ? "Communication Services" : "संचार सेवाएं"}
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--primary-blue)] mb-4">
            {currentContent.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {currentContent.subtitle}
          </p>

          {/* Language Toggle */}
          <div className="flex justify-center mt-6">
            <div className="bg-white rounded-full p-1 shadow-md border border-[var(--border-color)]">
              <button
                onClick={() => setLanguage("en")}
                className={`px-6 py-2 rounded-full transition-all ${
                  language === 'en' 
                    ? 'bg-[var(--primary-blue)] text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage("hi")}
                className={`px-6 py-2 rounded-full transition-all ${
                  language === 'hi' 
                    ? 'bg-[var(--primary-blue)] text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                हिंदी
              </button>
            </div>
          </div>
        </div>

        {/* Service Tabs */}
        <Tabs defaultValue="whatsapp" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8 h-12">
            <TabsTrigger value="whatsapp" className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">{currentContent.whatsapp}</span>
            </TabsTrigger>
            <TabsTrigger value="bot" className="flex items-center gap-2">
              <Smartphone className="w-4 h-4" />
              <span className="hidden sm:inline">{currentContent.bot}</span>
            </TabsTrigger>
            <TabsTrigger value="updates" className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              <span className="hidden sm:inline">{currentContent.updates}</span>
            </TabsTrigger>
            <TabsTrigger value="offline" className="flex items-center gap-2">
              <QrCode className="w-4 h-4" />
              <span className="hidden sm:inline">{currentContent.offline}</span>
            </TabsTrigger>
            <TabsTrigger value="tts" className="flex items-center gap-2">
              <Volume2 className="w-4 h-4" />
              <span className="hidden sm:inline">{currentContent.tts}</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="whatsapp">
            <WhatsAppIntegration language={language} />
          </TabsContent>

          <TabsContent value="bot">
            <MessageBot language={language} />
          </TabsContent>

          <TabsContent value="updates">
            <DBTUpdates language={language} />
          </TabsContent>

          <TabsContent value="offline">
            <OfflineQR language={language} />
          </TabsContent>

          <TabsContent value="tts">
            <div className="space-y-6">
              <TextToSpeech 
                text={demoText} 
                language={language} 
                showControls={true}
              />
              
              {/* Additional TTS Features */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-white border border-[var(--border-color)]">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-[var(--primary-blue)]">
                      <Volume2 className="w-5 h-5" />
                      {language === "en" ? "Voice Features" : "आवाज़ सुविधाएं"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <span className="text-sm">
                          {language === "en" ? "High-quality AI voices" : "उच्च-गुणवत्ता AI आवाज़ें"}
                        </span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full" />
                        <span className="text-sm">
                          {language === "en" ? "Multiple voice options" : "कई आवाज़ विकल्प"}
                        </span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-purple-500 rounded-full" />
                        <span className="text-sm">
                          {language === "en" ? "Adjustable speed & volume" : "समायोज्य गति और आवाज़"}
                        </span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-orange-500 rounded-full" />
                        <span className="text-sm">
                          {language === "en" ? "Works offline after generation" : "बनाने के बाद ऑफलाइन काम करता है"}
                        </span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-white border border-[var(--border-color)]">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-[var(--primary-blue)]">
                      <Bell className="w-5 h-5" />
                      {language === "en" ? "Use Cases" : "उपयोग के मामले"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <span className="text-sm">
                          {language === "en" ? "Learning content accessibility" : "सीखने की सामग्री पहुंच"}
                        </span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full" />
                        <span className="text-sm">
                          {language === "en" ? "Visually impaired support" : "दृष्टिबाधित समर्थन"}
                        </span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-purple-500 rounded-full" />
                        <span className="text-sm">
                          {language === "en" ? "Multi-tasking while listening" : "सुनते समय मल्टी-टास्किंग"}
                        </span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-orange-500 rounded-full" />
                        <span className="text-sm">
                          {language === "en" ? "Voice-guided tutorials" : "आवाज़-निर्देशित ट्यूटोरियल"}
                        </span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Quick Stats */}
        <div className="mt-12 grid md:grid-cols-4 gap-6">
          <Card className="bg-green-50 border-green-200 text-center">
            <CardContent className="p-6">
              <MessageCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-700">WhatsApp</div>
              <div className="text-sm text-green-600">
                {language === "en" ? "Real-time Support" : "रियल-टाइम सहायता"}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-blue-50 border-blue-200 text-center">
            <CardContent className="p-6">
              <Smartphone className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-700">SMS</div>
              <div className="text-sm text-blue-600">
                {language === "en" ? "Works Offline" : "ऑफलाइन काम करता है"}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-purple-50 border-purple-200 text-center">
            <CardContent className="p-6">
              <QrCode className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-700">QR Codes</div>
              <div className="text-sm text-purple-600">
                {language === "en" ? "Instant Access" : "तत्काल पहुंच"}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-orange-50 border-orange-200 text-center">
            <CardContent className="p-6">
              <Volume2 className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-700">Voice AI</div>
              <div className="text-sm text-orange-600">
                {language === "en" ? "Audio Content" : "ऑडियो सामग्री"}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}