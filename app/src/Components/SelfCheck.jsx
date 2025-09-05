
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle2, 
  XCircle, 
  Smartphone, 
  Lock,
  ArrowRight,
  RefreshCw,
  AlertCircle,
  Shield,
  Clock
} from "lucide-react";
import { motion } from "framer-motion";

export default function SelfCheck() {
  const [step, setStep] = useState(1); // 1: form, 2: otp, 3: results
  const [formData, setFormData] = useState({
    virtualId: "",
    phone: "",
    otp: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [language, setLanguage] = useState("en");

  const content = {
    en: {
      title: "Check Your DBT Readiness",
      subtitle: "Verify if your bank account is ready for direct scholarship transfers",
      privacyNotice: "🔒 Privacy First: We use Virtual ID simulation only. No Aadhaar data is stored.",
      form: {
        virtualIdLabel: "Virtual ID (Demo)",
        virtualIdPlaceholder: "Enter demo VID (1234-5678-9012-3456)",
        phoneLabel: "Mobile Number",
        phonePlaceholder: "Enter your mobile number",
        submitButton: "Start Verification"
      },
      otp: {
        title: "OTP Verification",
        description: "Enter the OTP sent to your mobile number",
        placeholder: "Enter 6-digit OTP",
        resend: "Resend OTP",
        verify: "Verify & Check Status"
      },
      results: {
        ready: {
          title: "🎉 You're DBT Ready!",
          description: "Your bank account is properly configured for direct scholarship transfers.",
          actions: ["No further action needed", "Scholarships will be credited directly", "Keep your details updated"]
        },
        notReady: {
          title: "⚠️ Action Required",
          description: "Your account needs DBT enablement for scholarship transfers.",
          actions: ["Visit your bank branch", "Request DBT seeding (not just linking)", "Bring Aadhaar card and recent photo"]
        }
      }
    },
    hi: {
      title: "अपनी डीबीटी तैयारी जांचें",
      subtitle: "सत्यापित करें कि आपका बैंक खाता प्रत्यक्ष छात्रवृत्ति स्थानान्तरण के लिए तैयार है",
      privacyNotice: "🔒 गोपनीयता पहले: हम केवल वर्चुअल आईडी सिमुलेशन का उपयोग करते हैं। कोई आधार डेटा संग्रहीत नहीं किया जाता।",
      form: {
        virtualIdLabel: "वर्चुअल आईडी (डेमो)",
        virtualIdPlaceholder: "डेमो VID दर्ज करें (1234-5678-9012-3456)",
        phoneLabel: "मोबाइल नंबर",
        phonePlaceholder: "अपना मोबाइल नंबर दर्ज करें",
        submitButton: "सत्यापन शुरू करें"
      },
      otp: {
        title: "ओटीपी सत्यापन",
        description: "आपके मोबाइल नंबर पर भेजा गया ओटीपी दर्ज करें",
        placeholder: "6-अंकीय ओटीपी दर्ज करें",
        resend: "ओटीपी दोबारा भेजें",
        verify: "सत्यापित करें और स्थिति जांचें"
      },
      results: {
        ready: {
          title: "🎉 आप डीबीटी तैयार हैं!",
          description: "आपका बैंक खाता प्रत्यक्ष छात्रवृत्ति स्थानान्तरण के लिए उचित रूप से कॉन्फ़िगर किया गया है।",
          actions: ["कोई और कार्रवाई आवश्यक नहीं", "छात्रवृत्ति सीधे जमा की जाएगी", "अपना विवरण अपडेट रखें"]
        },
        notReady: {
          title: "⚠️ कार्रवाई आवश्यक",
          description: "आपके खाते को छात्रवृत्ति स्थानान्तरण के लिए डीबीटी सक्षमता की आवश्यकता है।",
          actions: ["अपनी बैंक शाखा जाएं", "डीबीटी सीडिंग का अनुरोध करें (केवल लिंकिंग नहीं)", "आधार कार्ड और हाल की फोटो लेकर आएं"]
        }
      }
    }
  };

  const currentContent = content[language];

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setStep(2);
      setIsLoading(false);
    }, 2000);
  };

  const handleOtpVerification = () => {
    setIsLoading(true);
    // Mock verification logic
    setTimeout(() => {
      // Randomly determine readiness for demo
      const isReady = Math.random() > 0.5;
      setResult({
        isReady,
        aadhaarSeeded: true,
        dbtEnabled: isReady,
        lastUpdated: new Date().toISOString()
      });
      setStep(3);
      setIsLoading(false);
    }, 3000);
  };

  const resetFlow = () => {
    setStep(1);
    setFormData({ virtualId: "", phone: "", otp: "" });
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-[var(--background-light)] p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--primary-blue)] mb-4">
            {currentContent.title}
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            {currentContent.subtitle}
          </p>
          
          {/* Language Toggle */}
          <div className="flex justify-center mb-6">
            <div className="bg-white rounded-full p-1 shadow-md border border-[var(--border-color)]">
              <Button
                variant={language === "en" ? "default" : "ghost"}
                onClick={() => setLanguage("en")}
                className={`rounded-full px-6 ${language === 'en' ? 'bg-[var(--primary-blue)] text-white hover:bg-blue-900' : 'text-gray-700'}`}
              >
                English
              </Button>
              <Button
                variant={language === "hi" ? "default" : "ghost"}
                onClick={() => setLanguage("hi")}
                className={`rounded-full px-6 ${language === 'hi' ? 'bg-[var(--primary-blue)] text-white hover:bg-blue-900' : 'text-gray-700'}`}
              >
                हिंदी
              </Button>
            </div>
          </div>

          <Alert className="bg-blue-50 border-[var(--secondary-blue)] border-l-4 max-w-2xl mx-auto">
            <Shield className="w-4 h-4 text-[var(--secondary-blue)]" />
            <AlertDescription className="text-[var(--secondary-blue)]">
              {currentContent.privacyNotice}
            </AlertDescription>
          </Alert>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <Progress value={(step / 3) * 100} className="h-2 [&>div]:bg-[var(--primary-orange)]" />
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <span>{language === "en" ? "Step" : "चरण"} {step}/3</span>
            <span>
              {language === "en" ? 
                ["Details", "Verification", "Results"][step - 1] :
                ["विवरण", "सत्यापन", "परिणाम"][step - 1]
              }
            </span>
          </div>
        </div>

        {/* Step 1: Form */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card className="bg-white border border-[var(--border-color)] shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-[var(--primary-blue)]">
                  {language === "en" ? "Enter Your Details" : "अपना विवरण दर्ज करें"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="virtualId">{currentContent.form.virtualIdLabel}</Label>
                    <Input
                      id="virtualId"
                      value={formData.virtualId}
                      onChange={(e) => setFormData({...formData, virtualId: e.target.value})}
                      placeholder={currentContent.form.virtualIdPlaceholder}
                      className="mt-2"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {language === "en" ? "Demo mode: Use any 16-digit format" : "डेमो मोड: कोई भी 16-अंकीय प्रारूप उपयोग करें"}
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="phone">{currentContent.form.phoneLabel}</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder={currentContent.form.phonePlaceholder}
                      className="mt-2"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-[var(--primary-orange)] hover:bg-orange-700" 
                    size="lg"
                    disabled={!formData.virtualId || !formData.phone || isLoading}
                  >
                    {isLoading ? (
                      <>
                        <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                        {language === "en" ? "Processing..." : "प्रसंस्करण..."}
                      </>
                    ) : (
                      <>
                        {currentContent.form.submitButton}
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Step 2: OTP */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card className="bg-white border border-[var(--border-color)] shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Smartphone className="w-8 h-8 text-[var(--primary-blue)]" />
                  <div>
                    <CardTitle className="text-2xl text-[var(--primary-blue)]">{currentContent.otp.title}</CardTitle>
                    <p className="text-gray-600">{currentContent.otp.description}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {language === "en" ? "Sent to" : "भेजा गया"} ****{formData.phone.slice(-4)}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="otp">OTP</Label>
                  <Input
                    id="otp"
                    value={formData.otp}
                    onChange={(e) => setFormData({...formData, otp: e.target.value})}
                    placeholder={currentContent.otp.placeholder}
                    className="mt-2 text-center text-2xl tracking-widest"
                    maxLength={6}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {language === "en" ? "Demo: Use any 6 digits (e.g., 123456)" : "डेमो: कोई भी 6 अंक उपयोग करें (जैसे 123456)"}
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <Button
                    onClick={handleOtpVerification}
                    className="w-full bg-[var(--primary-orange)] hover:bg-orange-700"
                    size="lg"
                    disabled={formData.otp.length !== 6 || isLoading}
                  >
                    {isLoading ? (
                      <>
                        <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                        {language === "en" ? "Verifying..." : "सत्यापित कर रहे हैं..."}
                      </>
                    ) : (
                      currentContent.otp.verify
                    )}
                  </Button>
                  <Button variant="outline" size="sm" className="border-[var(--secondary-blue)] text-[var(--secondary-blue)] hover:bg-blue-50">
                    <Clock className="w-4 h-4 mr-2" />
                    {currentContent.otp.resend}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Step 3: Results */}
        {step === 3 && result && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card className={`border-2 ${
              result.isReady 
                ? "border-green-400 bg-green-50" 
                : "border-[var(--primary-orange)] bg-orange-50"
            } shadow-xl`}>
              <CardHeader className="text-center pb-4">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center bg-white shadow-lg">
                  {result.isReady ? (
                    <CheckCircle2 className="w-12 h-12 text-green-500" />
                  ) : (
                    <AlertCircle className="w-12 h-12 text-[var(--primary-orange)]" />
                  )}
                </div>
                <CardTitle className={`text-3xl ${result.isReady ? 'text-green-700' : 'text-[var(--primary-orange)]'}`}>
                  {result.isReady 
                    ? currentContent.results.ready.title 
                    : currentContent.results.notReady.title
                  }
                </CardTitle>
                <p className="text-lg text-gray-600">
                  {result.isReady 
                    ? currentContent.results.ready.description 
                    : currentContent.results.notReady.description
                  }
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Status Details */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-white rounded-xl shadow-sm border">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-6 h-6 text-green-500" />
                      <div>
                        <p className="font-semibold">
                          {language === "en" ? "Aadhaar Seeded" : "आधार सीड किया गया"}
                        </p>
                        <p className="text-sm text-green-600">
                          {language === "en" ? "Account linked with Aadhaar" : "आधार के साथ खाता लिंक"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-white rounded-xl shadow-sm border">
                    <div className="flex items-center gap-3">
                      {result.dbtEnabled ? (
                        <CheckCircle2 className="w-6 h-6 text-green-500" />
                      ) : (
                        <XCircle className="w-6 h-6 text-[var(--primary-orange)]" />
                      )}
                      <div>
                        <p className="font-semibold">
                          {language === "en" ? "DBT Enabled" : "डीबीटी सक्षम"}
                        </p>
                        <p className={`text-sm ${result.dbtEnabled ? 'text-green-600' : 'text-[var(--primary-orange)]'}`}>
                          {result.dbtEnabled 
                            ? (language === "en" ? "Ready for transfers" : "स्थानान्तरण के लिए तैयार")
                            : (language === "en" ? "Needs enablement" : "सक्षमता की आवश्यकता")
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Steps */}
                <div className="p-6 bg-white rounded-xl shadow-sm border">
                  <h3 className="font-semibold text-lg mb-4 text-[var(--primary-blue)]">
                    {language === "en" ? "Next Steps:" : "अगले चरण:"}
                  </h3>
                  <ul className="space-y-3">
                    {(result.isReady 
                      ? currentContent.results.ready.actions 
                      : currentContent.results.notReady.actions
                    ).map((action, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-white ${
                          result.isReady ? 'bg-green-500' : 'bg-[var(--primary-orange)]'
                        }`}>
                          {index + 1}
                        </div>
                        <p className="text-gray-700 mt-0.5">{action}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button onClick={resetFlow} variant="outline" size="lg" className="border-[var(--primary-blue)] text-[var(--primary-blue)] hover:bg-blue-50">
                    {language === "en" ? "Check Another Account" : "दूसरा खाता जांचें"}
                  </Button>
                  {!result.isReady && (
                    <Button size="lg" className="bg-[var(--primary-orange)] hover:bg-orange-700">
                      {language === "en" ? "Find Nearby Bank" : "नज़दीकी बैंक खोजें"}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
