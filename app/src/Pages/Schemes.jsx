import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  DollarSign, 
  GraduationCap, 
  Users, 
  Briefcase, 
  Heart,
  Home,
  CheckCircle2,
  ExternalLink,
  Star,
  Trophy
} from "lucide-react";
import { motion } from "framer-motion";

export default function Schemes() {
  const [language, setLanguage] = useState("en");

  const schemeCategories = {
    en: {
      subsidy: {
        title: "Subsidy Schemes",
        icon: DollarSign,
        color: "bg-green-500",
        schemes: [
          {
            name: "PAHAL (LPG Subsidy)",
            description: "Direct subsidy transfer for domestic LPG cylinders",
            benefits: ["Direct cash transfer to bank account", "Reduced LPG prices", "Transparent subsidy system"],
            eligibility: "All LPG consumers with valid bank account",
            amount: "₹200-300 per cylinder"
          },
          {
            name: "Fertilizer Subsidy",
            description: "Direct subsidy to farmers for fertilizer purchases",
            benefits: ["Reduced fertilizer costs", "Direct bank credit", "No middleman involvement"],
            eligibility: "Farmers with valid land records",
            amount: "Variable based on fertilizer type"
          },
          {
            name: "Food Subsidy (TPDS)",
            description: "Pilot projects for direct food subsidy transfers",
            benefits: ["Cash instead of grains", "Freedom of choice", "Reduced leakages"],
            eligibility: "BPL families in pilot areas",
            amount: "₹1000-2000 per month"
          }
        ]
      },
      education: {
        title: "Education & Scholarships",
        icon: GraduationCap,
        color: "bg-blue-500",
        schemes: [
          {
            name: "Pre-Matric Scholarships (SC/ST/OBC)",
            description: "Financial assistance for students from classes 1-10",
            benefits: ["Tuition fee support", "Maintenance allowance", "Books and stationery"],
            eligibility: "SC/ST/OBC students with family income < ₹2.5 lakh",
            amount: "₹1,000-10,000 per year"
          },
          {
            name: "Post-Matric Scholarships",
            description: "Support for higher education students",
            benefits: ["Tuition fees", "Maintenance allowance", "Study material"],
            eligibility: "SC/ST/OBC students in colleges/universities",
            amount: "₹2,000-20,000 per year"
          },
          {
            name: "National Means-cum-Merit Scholarship (NMMSS)",
            description: "Merit-based scholarship for class 9-12 students",
            benefits: ["Merit recognition", "Financial support", "Encouragement for higher studies"],
            eligibility: "Students with >55% marks in class 8",
            amount: "₹12,000 per year"
          }
        ]
      },
      pension: {
        title: "Pension & Social Security",
        icon: Users,
        color: "bg-purple-500",
        schemes: [
          {
            name: "Indira Gandhi National Old Age Pension",
            description: "Monthly pension for senior citizens",
            benefits: ["Regular monthly income", "Social security", "Healthcare support"],
            eligibility: "Citizens above 60 years, BPL families",
            amount: "₹200-500 per month"
          },
          {
            name: "National Widow Pension",
            description: "Financial support for widows",
            benefits: ["Monthly pension", "Social protection", "Livelihood support"],
            eligibility: "Widows aged 40-79 years, BPL families",
            amount: "₹300-500 per month"
          },
          {
            name: "National Disability Pension",
            description: "Support for persons with disabilities",
            benefits: ["Monthly financial aid", "Healthcare assistance", "Social inclusion"],
            eligibility: "Persons with 80%+ disability",
            amount: "₹300-500 per month"
          }
        ]
      },
      employment: {
        title: "Employment & Welfare",
        icon: Briefcase,
        color: "bg-orange-500",
        schemes: [
          {
            name: "MGNREGA",
            description: "Guaranteed employment for rural households",
            benefits: ["100 days guaranteed work", "Direct wage payment", "Asset creation"],
            eligibility: "Rural households willing to do manual work",
            amount: "₹200-300 per day"
          },
          {
            name: "PM-KISAN",
            description: "Income support for small and marginal farmers",
            benefits: ["Direct income transfer", "No conditions", "Three installments per year"],
            eligibility: "Small & marginal farmers (<2 hectares)",
            amount: "₹6,000 per year"
          },
          {
            name: "PM Ujjwala Yojana",
            description: "Free LPG connections for BPL families",
            benefits: ["Free LPG connection", "Deposit-free cylinder", "Clean cooking fuel"],
            eligibility: "BPL women beneficiaries",
            amount: "₹1,600 connection support"
          }
        ]
      },
      health: {
        title: "Health & Medical Schemes",
        icon: Heart,
        color: "bg-red-500",
        schemes: [
          {
            name: "Janani Suraksha Yojana (JSY)",
            description: "Cash assistance for institutional deliveries",
            benefits: ["Safe delivery", "Financial support", "Reduced maternal mortality"],
            eligibility: "Pregnant women from BPL families",
            amount: "₹600-1,400 per delivery"
          },
          {
            name: "Ayushman Bharat (PM-JAY)",
            description: "Health insurance coverage",
            benefits: ["₹5 lakh health cover", "Cashless treatment", "Secondary care"],
            eligibility: "Families as per SECC-2011 database",
            amount: "Up to ₹5,00,000 per family/year"
          }
        ]
      },
      housing: {
        title: "Housing & Infrastructure",
        icon: Home,
        color: "bg-indigo-500",
        schemes: [
          {
            name: "PM Awas Yojana (Gramin)",
            description: "Housing assistance for rural poor",
            benefits: ["Pucca house construction", "Direct bank transfer", "Technical support"],
            eligibility: "Houseless families in rural areas",
            amount: "₹1.2-1.3 lakh per house"
          },
          {
            name: "Swachh Bharat Mission (Gramin)",
            description: "Toilet construction incentive",
            benefits: ["Individual household toilets", "Community sanitation", "Behavioral change"],
            eligibility: "Rural households without toilets",
            amount: "₹12,000 per toilet"
          }
        ]
      }
    },
    hi: {
      subsidy: {
        title: "सब्सिडी योजनाएं",
        icon: DollarSign,
        color: "bg-green-500",
        schemes: [
          {
            name: "पहल (एलपीजी सब्सिडी)",
            description: "घरेलू एलपीजी सिलेंडर के लिए प्रत्यक्ष सब्सिडी स्थानान्तरण",
            benefits: ["बैंक खाते में प्रत्यक्ष नकद स्थानान्तरण", "कम एलपीजी दरें", "पारदर्शी सब्सिडी प्रणाली"],
            eligibility: "वैध बैंक खाते वाले सभी एलपीजी उपभोक्ता",
            amount: "₹200-300 प्रति सिलेंडर"
          }
        ]
      }
      // ... other categories would be translated similarly
    }
  };

  const currentSchemes = schemeCategories[language];

  return (
    <div className="min-h-screen bg-[var(--background-light)] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-blue-100 text-[var(--secondary-blue)]">
            {language === "en" ? "Government Schemes" : "सरकारी योजनाएं"}
          </Badge>
          <h1 className="text-3xl md:text-5xl font-bold text-[var(--primary-blue)] mb-4">
            {language === "en" ? "DBT-Enabled Schemes" : "डीबीटी-सक्षम योजनाएं"}
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            {language === "en" 
              ? "Discover government schemes that benefit directly through DBT-enabled bank accounts"
              : "डीबीटी-सक्षम बैंक खातों के माध्यम से सीधे लाभ देने वाली सरकारी योजनाओं की खोज करें"
            }
          </p>

          {/* Language Toggle */}
          <div className="flex justify-center mt-6">
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
        </div>

        {/* Category Tabs */}
        <Tabs defaultValue="education" className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-8">
            {Object.entries(currentSchemes).map(([key, category]) => (
              <TabsTrigger key={key} value={key} className="flex items-center gap-2 text-xs">
                <category.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{category.title}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(currentSchemes).map(([key, category]) => (
            <TabsContent key={key} value={key}>
              <div className="mb-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 ${category.color} rounded-xl flex items-center justify-center`}>
                    <category.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-[var(--primary-blue)]">{category.title}</h2>
                    <p className="text-gray-600">
                      {language === "en" 
                        ? `${category.schemes.length} schemes available with direct benefit transfer`
                        : `प्रत्यक्ष लाभ स्थानान्तरण के साथ ${category.schemes.length} योजनाएं उपलब्ध`
                      }
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.schemes.map((scheme, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="h-full bg-white border border-[var(--border-color)] hover:shadow-lg transition-all duration-300 hover:border-[var(--primary-orange)]">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg text-[var(--primary-blue)] mb-2">
                              {scheme.name}
                            </CardTitle>
                            <Badge className={`${category.color} text-white mb-2`}>
                              {scheme.amount}
                            </Badge>
                          </div>
                          <Trophy className="w-5 h-5 text-[var(--primary-orange)]" />
                        </div>
                        <p className="text-gray-600 text-sm">{scheme.description}</p>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-green-500" />
                              {language === "en" ? "Benefits" : "लाभ"}
                            </h4>
                            <ul className="space-y-1">
                              {scheme.benefits.map((benefit, idx) => (
                                <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-1.5 flex-shrink-0" />
                                  {benefit}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">
                              {language === "en" ? "Eligibility" : "पात्रता"}
                            </h4>
                            <p className="text-sm text-gray-600">{scheme.eligibility}</p>
                          </div>

                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full border-[var(--primary-blue)] text-[var(--primary-blue)] hover:bg-[var(--primary-blue)] hover:text-white"
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            {language === "en" ? "Learn More" : "और जानें"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Key Platforms */}
        <Card className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 border border-[var(--border-color)]">
          <CardHeader>
            <CardTitle className="text-2xl text-[var(--primary-blue)] text-center">
              {language === "en" ? "Key DBT Platforms" : "मुख्य डीबीटी प्लेटफॉर्म"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="p-4">
                <div className="w-16 h-16 bg-[var(--primary-blue)] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-[var(--primary-blue)] mb-2">
                  {language === "en" ? "National Scholarship Portal (NSP)" : "राष्ट्रीय छात्रवृत्ति पोर्टल (एनएसपी)"}
                </h3>
                <p className="text-sm text-gray-600">
                  {language === "en" 
                    ? "Single window for scholarship applications"
                    : "छात्रवृत्ति आवेदनों के लिए एकल खिड़की"
                  }
                </p>
              </div>

              <div className="p-4">
                <div className="w-16 h-16 bg-[var(--secondary-blue)] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-[var(--primary-blue)] mb-2">
                  {language === "en" ? "NPCI Aadhaar Payment Bridge" : "एनपीसीआई आधार पेमेंट ब्रिज"}
                </h3>
                <p className="text-sm text-gray-600">
                  {language === "en" 
                    ? "Routes DBT payments via Aadhaar mapping"
                    : "आधार मैपिंग के माध्यम से डीबीटी भुगतान की राह"
                  }
                </p>
              </div>

              <div className="p-4">
                <div className="w-16 h-16 bg-[var(--primary-orange)] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-[var(--primary-blue)] mb-2">
                  {language === "en" ? "PFMS" : "पीएफएमएस"}
                </h3>
                <p className="text-sm text-gray-600">
                  {language === "en" 
                    ? "Public Financial Management System for tracking"
                    : "ट्रैकिंग के लिए सार्वजनिक वित्तीय प्रबंधन प्रणाली"
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}