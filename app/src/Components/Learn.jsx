import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CheckCircle2,
  XCircle,
  CreditCard,
  Landmark,
  ArrowRight,
  Users,
  AlertCircle,
  BookOpen,
  Video,
  Play
} from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function Learn() {
  const [language, setLanguage] = useState("en");

  const content = {
    en: {
      title: "Learn About Direct Benefit Transfer (DBT)",
      subtitle: "Understanding the difference between Aadhaar-linked and DBT-enabled bank accounts",
      videoSection: "Educational Videos",
      comparison: {
        aadhaar: {
          title: "Aadhaar-Linked Account",
          description: "Basic linking of your bank account with Aadhaar number",
          features: [
            "Bank account is connected to your Aadhaar",
            "Used for identity verification",
            "Required for KYC compliance",
            "Basic account linkage only"
          ],
          limitations: [
            "Cannot receive direct government benefits",
            "Scholarships may face delays",
            "Additional steps required for transfers"
          ]
        },
        dbt: {
          title: "DBT-Enabled Account",
          description: "Advanced account ready for direct government benefit transfers",
          features: [
            "All benefits of Aadhaar-linking PLUS:",
            "Direct scholarship transfers",
            "Faster government benefit delivery",
            "NPCI mapper integration",
            "Real-time transfer capability"
          ],
          benefits: [
            "Instant scholarship credits",
            "No intermediary delays",
            "Transparent transaction tracking",
            "Reduced bureaucratic steps"
          ]
        }
      },
      steps: {
        title: "How to Enable DBT on Your Account",
        items: [
          "Visit your bank branch with Aadhaar card",
          "Request DBT enablement (not just linking)",
          "Fill out the DBT seeding form",
          "Provide a recent photograph",
          "Get confirmation receipt",
          "Verify status after 2-3 working days"
        ]
      }
    },
    hi: {
      title: "प्रत्यक्ष लाभ अंतरण (डीबीटी) के बारे में जानें",
      subtitle: "आधार-लिंक्ड और डीबीटी-सक्षम बैंक खातों के बीच अंतर को समझना",
      videoSection: "शैक्षणिक वीडियो",
      comparison: {
        aadhaar: {
          title: "आधार-लिंक्ड खाता",
          description: "आपके बैंक खाते का आधार नंबर के साथ बुनियादी लिंकिंग",
          features: [
            "बैंक खाता आपके आधार से जुड़ा है",
            "पहचान सत्यापन के लिए उपयोग",
            "केवाईसी अनुपालन के लिए आवश्यक",
            "केवल बुनियादी खाता लिंकेज"
          ],
          limitations: [
            "प्रत्यक्ष सरकारी लाभ प्राप्त नहीं कर सकता",
            "छात्रवृत्ति में देरी हो सकती है",
            "स्थानान्तरण के लिए अतिरिक्त चरण आवश्यक"
          ]
        },
        dbt: {
          title: "डीबीटी-सक्षम खाता",
          description: "प्रत्यक्ष सरकारी लाभ स्थानान्तरण के लिए तैयार उन्नत खाता",
          features: [
            "आधार-लिंकिंग के सभी फायदे प्लस:",
            "प्रत्यक्ष छात्रवृत्ति स्थानान्तरण",
            "तेज़ सरकारी लाभ वितरण",
            "एनपीसीआई मैपर एकीकरण",
            "रियल-टाइम स्थानान्तरण क्षमता"
          ],
          benefits: [
            "तत्काल छात्रवृत्ति क्रेडिट",
            "कोई मध्यस्थ देरी नहीं",
            "पारदर्शी लेनदेन ट्रैकिंग",
            "कम नौकरशाही कदम"
          ]
        }
      },
      steps: {
        title: "अपने खाते पर डीबीटी कैसे सक्षम करें",
        items: [
          "आधार कार्ड के साथ अपनी बैंक शाखा जाएं",
          "डीबीटी सक्षमता का अनुरोध करें (केवल लिंकिंग नहीं)",
          "डीबीटी सीडिंग फॉर्म भरें",
          "हाल की फोटो प्रदान करें",
          "पुष्टि रसीद प्राप्त करें",
          "2-3 कार्य दिवसों बाद स्थिति सत्यापित करें"
        ]
      }
    }
  };

  const currentContent = content[language];

  const videoPlaceholders = [
    {
      id: 1,
      title: language === "en" ? "What is DBT? Complete Guide" : "डीबीटी क्या है? संपूर्ण गाइड",
      duration: "5:32",
      thumbnail: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=200&fit=crop&auto=format"
    },
    {
      id: 2,
      title: language === "en" ? "Step-by-Step Aadhaar Seeding Process" : "चरण-दर-चरण आधार सीडिंग प्रक्रिया",
      duration: "8:15",
      thumbnail: "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=300&h=200&fit=crop&auto=format"
    },
    {
      id: 3,
      title: language === "en" ? "Common Scholarship Rejection Issues" : "सामान्य छात्रवृत्ति अस्वीकरण समस्याएं",
      duration: "6:47",
      thumbnail: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=300&h=200&fit=crop&auto=format"
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--background-light)] p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-orange-100 text-[var(--primary-orange)]">
            {language === "en" ? "Educational Content" : "शैक्षणिक सामग्री"}
          </Badge>
          <h1 className="text-3xl md:text-5xl font-bold text-[var(--primary-blue)] mb-4">
            {currentContent.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            {currentContent.subtitle}
          </p>
        </div>

        {/* Language Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-full p-1 shadow-md border border-[var(--border-color)]">
            <Button
              variant={language === "en" ? "primary" : "ghost"}
              onClick={() => setLanguage("en")}
              className={`rounded-full px-6 ${language === 'en' ? 'bg-[var(--primary-blue)] text-white hover:bg-blue-900' : 'text-gray-700'}`}
            >
              English
            </Button>
            <Button
              variant={language === "hi" ? "primary" : "ghost"}
              onClick={() => setLanguage("hi")}
              className={`rounded-full px-6 ${language === 'hi' ? 'bg-[var(--primary-blue)] text-white hover:bg-blue-900' : 'text-gray-700'}`}
            >
              हिंदी
            </Button>
          </div>
        </div>

        {/* Video Section */}
        <Card className="mb-12 bg-white border border-[var(--border-color)] shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-[var(--primary-blue)] flex items-center gap-3">
              <Video className="w-8 h-8" />
              {currentContent.videoSection}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {videoPlaceholders.map((video) => (
                <div key={video.id} className="relative group cursor-pointer">
                  <div className="relative overflow-hidden rounded-lg">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                      <div className="w-16 h-16 bg-[var(--primary-orange)] rounded-full flex items-center justify-center">
                        <Play className="w-8 h-8 text-white ml-1" />
                      </div>
                    </div>
                    <Badge className="absolute bottom-2 right-2 bg-black/70 text-white">
                      {video.duration}
                    </Badge>
                  </div>
                  <h3 className="mt-3 font-semibold text-gray-900 line-clamp-2">{video.title}</h3>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Button variant="outline" className="border-[var(--primary-orange)] text-[var(--primary-orange)] hover:bg-orange-50">
                <Video className="w-4 h-4 mr-2" />
                {language === "en" ? "View All Videos" : "सभी वीडियो देखें"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Comparison Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Aadhaar-Linked */}
          <Card className="border-2 border-[var(--primary-orange)] bg-white">
            <CardHeader className="bg-orange-50">
              <div className="flex items-center gap-3">
                <XCircle className="w-8 h-8 text-[var(--primary-orange)]" />
                <CardTitle className="text-xl text-[var(--primary-orange)]">
                  {currentContent.comparison.aadhaar.title}
                </CardTitle>
              </div>
              <p className="text-orange-700">{currentContent.comparison.aadhaar.description}</p>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {language === "en" ? "Features:" : "विशेषताएं:"}
                  </h4>
                  <ul className="space-y-2">
                    {currentContent.comparison.aadhaar.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-[var(--accent-red)] mb-2">
                    {language === "en" ? "Limitations:" : "सीमाएं:"}
                  </h4>
                  <ul className="space-y-2">
                    {currentContent.comparison.aadhaar.limitations.map((limitation, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-[var(--accent-red)]">
                        <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        {limitation}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* DBT-Enabled */}
          <Card className="border-2 border-[var(--secondary-blue)] bg-white">
            <CardHeader className="bg-blue-50">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-8 h-8 text-[var(--secondary-blue)]" />
                <CardTitle className="text-xl text-[var(--secondary-blue)]">
                  {currentContent.comparison.dbt.title}
                </CardTitle>
              </div>
              <p className="text-blue-700">{currentContent.comparison.dbt.description}</p>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {language === "en" ? "Features:" : "विशेषताएं:"}
                  </h4>
                  <ul className="space-y-2">
                    {currentContent.comparison.dbt.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-green-700 mb-2">
                    {language === "en" ? "Benefits:" : "लाभ:"}
                  </h4>
                  <ul className="space-y-2">
                    {currentContent.comparison.dbt.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-green-600">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* How to Enable DBT */}
        <Card className="mt-12 bg-white border border-[var(--border-color)] shadow-lg">
          <CardHeader className="bg-[var(--primary-blue)] text-white">
            <CardTitle className="text-2xl flex items-center gap-3">
              <Landmark className="w-8 h-8" />
              {currentContent.steps.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentContent.steps.items.map((step, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-[var(--primary-orange)] text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-gray-700">{step}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link to={createPageUrl("SelfCheck")}>
                <Button size="lg" className="bg-[var(--primary-orange)] hover:bg-orange-700">
                  {language === "en" ? "Check My Status Now" : "अब मेरी स्थिति जांचें"}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Quick Facts */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <Card className="bg-orange-50 border-[var(--primary-orange)] border">
            <CardHeader>
              <CardTitle className="text-[var(--primary-orange)] flex items-center gap-2">
                <Users className="w-6 h-6" />
                {language === "en" ? "Did You Know?" : "क्या आप जानते हैं?"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-orange-800">
                {language === "en"
                  ? "Over 40% of students face scholarship delays due to incorrect DBT setup"
                  : "40% से अधिक छात्रों को गलत डीबीटी सेटअप के कारण छात्रवृत्ति में देरी का सामना करना पड़ता है"
                }
              </p>
            </CardContent>
          </Card>

          <Card className="bg-blue-50 border-[var(--secondary-blue)] border">
            <CardHeader>
              <CardTitle className="text-[var(--secondary-blue)] flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6" />
                {language === "en" ? "Success Rate" : "सफलता दर"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-800">
                {language === "en" 
                  ? "Students with DBT-enabled accounts receive scholarships 85% faster"
                  : "डीबीटी-सक्षम खातों वाले छात्रों को 85% तेज़ छात्रवृत्ति मिलती है"
                }
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-100 border-gray-300">
            <CardHeader>
              <CardTitle className="text-gray-700 flex items-center gap-2">
                <Video className="w-6 h-6" />
                {language === "en" ? "Take Action" : "कार्रवाई करें"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-3">
                {language === "en"
                  ? "Ready to test your knowledge?"
                  : "अपने ज्ञान का परीक्षण करने के लिए तैयार हैं?"
                }
              </p>
              <Link to={createPageUrl("Quiz")}>
                <Button variant="outline" size="sm" className="border-gray-400 text-gray-700 hover:bg-gray-200">
                  {language === "en" ? "Take Quiz" : "क्विज़ लें"}
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}