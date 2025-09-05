import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import {
  Home,
  BookOpen,
  CheckCircle2,
  Trophy,
  Users,
  BarChart3,
  Globe,
  Menu,
  X,
  ShieldCheck,
  Award,
  MapPin,
  Gift,
  MessageCircle,
  Volume2,
  VolumeX,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const navigationItems = [
  {
    title: "Home",
    url: createPageUrl("Home"),
    icon: Home,
  },
  {
    title: "Learn About DBT",
    url: createPageUrl("Learn"),
    icon: BookOpen,
  },
  {
    title: "Check DBT Status",
    url: createPageUrl("SelfCheck"),
    icon: CheckCircle2,
  },
  {
    title: "DBT Schemes",
    url: createPageUrl("Schemes"),
    icon: Gift,
  },
  {
    title: "Take Quiz",
    url: createPageUrl("Quiz"),
    icon: Trophy,
  },
  {
    title: "Find Banks",
    url: createPageUrl("FindBank"),
    icon: MapPin,
  },
  {
    title: "Messaging Hub",
    url: createPageUrl("MessagingHub"),
    icon: MessageCircle,
  },
  {
    title: "Teacher Dashboard",
    url: createPageUrl("TeacherDashboard"),
    icon: Users,
  },
  {
    title: "Admin Dashboard",
    url: createPageUrl("AdminDashboard"),
    icon: BarChart3,
  }
];

// Helper to extract text from React children
const extractText = (children) => {
  return React.Children.toArray(children)
    .map(child => {
      if (typeof child === 'string' || typeof child === 'number') {
        return String(child);
      }
      if (React.isValidElement(child) && child.props.children) {
        // Avoid reading interactive elements or icons
        if (['button', 'input', 'a', 'svg'].includes(child.type) || child.props['aria-hidden']) {
          return '';
        }
        return extractText(child.props.children);
      }
      return '';
    })
    .join(' ')
    .replace(/\s+/g, ' ') // Collapse multiple spaces
    .trim();
};


export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [language, setLanguage] = useState("en");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const mainContentRef = useRef(null);
  const currentUtteranceRef = useRef(null);

  // Cleanup and stop speech synthesis
  const stopSpeech = () => {
    try {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      if (currentUtteranceRef.current) {
        currentUtteranceRef.current = null;
      }
      setIsSpeaking(false);
    } catch (error) {
      console.warn('Error stopping speech:', error);
      setIsSpeaking(false);
    }
  };

  useEffect(() => {
    // Stop speech when navigating to a new page
    stopSpeech();
  }, [location.pathname]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopSpeech();
    };
  }, []);

  const toggleLanguage = () => {
    stopSpeech();
    setLanguage(prev => prev === "en" ? "hi" : "en");
  };

  const handleToggleTTS = () => {
    if (!('speechSynthesis' in window)) {
      alert("Your browser does not support Text-to-Speech.");
      return;
    }

    if (isSpeaking) {
      stopSpeech();
      return;
    }

    try {
      let contentText = '';
      
      // Try to get text from main content ref
      if (mainContentRef.current) {
        contentText = mainContentRef.current.innerText;
      }
      
      // Fallback to extracting from children
      if (!contentText && children) {
        contentText = extractText(children);
      }

      if (!contentText || contentText.trim().length === 0) {
        console.warn("No text content found to speak.");
        return;
      }

      // Limit text length to avoid very long speech
      const maxLength = 1000;
      if (contentText.length > maxLength) {
        contentText = contentText.substring(0, maxLength) + "...";
      }

      const utterance = new SpeechSynthesisUtterance(contentText);
      utterance.lang = language === 'en' ? 'en-US' : 'hi-IN';
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;

      utterance.onstart = () => {
        setIsSpeaking(true);
      };

      utterance.onend = () => {
        setIsSpeaking(false);
        currentUtteranceRef.current = null;
      };

      utterance.onerror = (event) => {
        console.warn('Speech synthesis error:', event.error);
        // Don't show error for "interrupted" as it's expected when user stops
        if (event.error !== 'interrupted') {
          console.error('Speech synthesis error:', event.error);
        }
        setIsSpeaking(false);
        currentUtteranceRef.current = null;
      };

      utterance.onpause = () => {
        setIsSpeaking(false);
      };

      utterance.onresume = () => {
        setIsSpeaking(true);
      };

      currentUtteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
      
    } catch (error) {
      console.error('Error starting speech synthesis:', error);
      setIsSpeaking(false);
    }
  };

  const getPageTitle = () => {
    const titles = {
      en: {
        "Home": "DBT Buddy",
        "Learn": "Learn About DBT",
        "SelfCheck": "Check DBT Status",
        "Schemes": "DBT Schemes",
        "Quiz": "DBT Quiz",
        "FindBank": "Find Banks",
        "MessagingHub": "Messaging Hub",
        "TeacherDashboard": "Teacher Dashboard",
        "AdminDashboard": "Admin Dashboard"
      },
      hi: {
        "Home": "डीबीटी मित्र",
        "Learn": "डीबीटी के बारे में जानें",
        "SelfCheck": "डीबीटी स्थिति जांचें",
        "Schemes": "डीबीटी योजनाएं",
        "Quiz": "डीबीटी क्विज़",
        "FindBank": "बैंक खोजें",
        "MessagingHub": "मैसेजिंग हब",
        "TeacherDashboard": "शिक्षक डैशबोर्ड",
        "AdminDashboard": "एडमिन डैशबोर्ड"
      }
    };
    return titles[language][currentPageName] || "DBT Buddy";
  };

  return (
    <SidebarProvider>
      <style>{`
        :root {
          --primary-orange: #D9531E;
          --primary-blue: #283B4F;
          --secondary-blue: #3A87AD;
          --accent-red: #C44A4A;
          --background-light: #f8f9fa;
          --text-dark: #333333;
          --text-light: #FFFFFF;
          --border-color: #dee2e6;
        }
      `}</style>
      <div className="min-h-screen flex w-full bg-[var(--background-light)] text-[var(--text-dark)]">
        <Sidebar className="border-r border-[var(--border-color)] bg-white">
          <SidebarHeader className="border-b border-[var(--border-color)] p-4 bg-[var(--primary-blue)]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[var(--primary-orange)] rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-white text-lg">
                  {language === "en" ? "DBT Buddy" : "डीबीटी मित्र"}
                </h2>
                <p className="text-xs text-gray-300">
                  {language === "en" ? "Scholarship Readiness Check" : "छात्रवृत्ति तैयारी जांच"}
                </p>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent className="p-3">
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-medium text-gray-500 uppercase tracking-wider px-3 py-2">
                {language === "en" ? "Navigation" : "नेवीगेशन"}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        className={`hover:bg-orange-50 hover:text-[var(--primary-orange)] transition-all duration-200 rounded-lg mb-1 ${
                          location.pathname === item.url ? 'bg-orange-100 text-[var(--primary-orange)] font-semibold' : 'text-[var(--primary-blue)]'
                        }`}
                      >
                        <Link to={item.url} className="flex items-center gap-3 px-4 py-3">
                          <item.icon className="w-5 h-5" />
                          <span className="font-medium">
                            {language === "en" ? item.title : {
                              "Home": "होम",
                              "Learn About DBT": "डीबीटी सीखें",
                              "Check DBT Status": "डीबीटी जांचें",
                              "DBT Schemes": "डीबीटी योजनाएं",
                              "Take Quiz": "क्विज़ लें",
                              "Find Banks": "बैंक खोजें",
                              "Messaging Hub": "मैसेजिंग हब",
                              "Teacher Dashboard": "शिक्षक डैशबोर्ड",
                              "Admin Dashboard": "एडमिन डैशबोर्ड"
                            }[item.title] || item.title}
                          </span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup className="mt-4">
              <SidebarGroupLabel className="text-xs font-medium text-gray-500 uppercase tracking-wider px-3 py-2">
                {language === "en" ? "Quick Info" : "त्वरित जानकारी"}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <div className="px-4 py-3 space-y-3">
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-[var(--secondary-blue)]">
                      <ShieldCheck className="w-4 h-4" />
                      <span className="font-medium">
                        {language === "en" ? "Privacy First" : "गोपनीयता प्राथमिकता"}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--secondary-blue)] opacity-80 mt-1">
                      {language === "en" ? "No Aadhaar data stored" : "कोई आधार डेटा संग्रहीत नहीं"}
                    </p>
                  </div>
                </div>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t border-[var(--border-color)] p-4 bg-gray-50">
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={toggleLanguage}
                className="w-full flex items-center gap-2 border-[var(--primary-blue)] text-[var(--primary-blue)] hover:bg-[var(--primary-blue)] hover:text-white"
              >
                <Globe className="w-4 h-4" />
                <span>{language === "en" ? "हिंदी" : "English"}</span>
              </Button>
              <Button
                variant="outline"
                onClick={handleToggleTTS}
                className={`border-[var(--primary-orange)] hover:bg-[var(--primary-orange)] hover:text-white transition-colors ${
                  isSpeaking ? 'bg-[var(--primary-orange)] text-white' : 'text-[var(--primary-orange)]'
                }`}
                size="icon"
                aria-label={isSpeaking ? "Stop Text to Speech" : "Start Text to Speech"}
              >
                {isSpeaking ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </Button>
            </div>
            <div className="mt-3 text-center">
              <Badge variant="outline" className="text-xs border-[var(--border-color)]">
                SIH 2024 - PS #25059
              </Badge>
            </div>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col">
          <header className="bg-white border-b border-[var(--border-color)] px-6 py-4 md:hidden shadow-sm">
            <div className="flex items-center justify-between">
              <SidebarTrigger className="hover:bg-gray-100 p-2 rounded-lg transition-colors duration-200" />
              <h1 className="text-xl font-bold text-[var(--primary-blue)]">{getPageTitle()}</h1>
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={handleToggleTTS} 
                  className={`transition-colors ${
                    isSpeaking ? 'bg-orange-100 text-[var(--primary-orange)]' : 'text-[var(--primary-orange)]'
                  }`}
                >
                  {isSpeaking ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </Button>
                <Button variant="ghost" size="icon" onClick={toggleLanguage} className="text-[var(--primary-blue)]">
                  <Globe className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </header>

          <div ref={mainContentRef} className="flex-1 overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}