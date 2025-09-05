import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: {
        en: "Hello! I'm DBT Buddy 🎓 - your specialized AI assistant for Direct Benefit Transfer scholarships and Aadhaar seeding queries. How can I help you today?",
        hi: "नमस्ते! मैं डीबीटी मित्र हूँ 🎓 - प्रत्यक्ष लाभ अंतरण छात्रवृत्ति और आधार सीडिंग के लिए आपका विशेष AI सहायक। आज मैं आपकी कैसे सहायता कर सकता हूँ?"
      },
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [language, setLanguage] = useState('en');
  const [isTyping, setIsTyping] = useState(false);

  const dbtKnowledgeBase = {
    dbtStatus: {
      keywords: ['dbt status', 'check status', 'seeding status', 'aadhaar seeded', 'bank linked'],
      response: {
        en: "**Quick Answer**: Check your DBT status at https://myaadhaar.uidai.gov.in/\n\n**Steps to Check**:\n1. Visit UIDAI portal\n2. Enter Aadhaar/VID + OTP\n3. View 'Bank Account Details'\n4. Status shows: Seeded/Not Seeded\n\n**Next Steps**: If 'Not Seeded', visit your bank branch with Aadhaar + Passbook to enable DBT seeding.\n\nNeed more help? Ask me anything about DBT scholarships! 🎓",
        hi: "**त्वरित उत्तर**: अपनी डीबीटी स्थिति https://myaadhaar.uidai.gov.in/ पर जांचें\n\n**जांचने के चरण**:\n1. यूआईडीएआई पोर्टल पर जाएं\n2. आधार/VID + OTP डालें\n3. 'बैंक खाता विवरण' देखें\n4. स्थिति: सीड/नॉट सीड\n\n**अगले कदम**: यदि 'नॉट सीड' है, तो डीबीटी सीडिंग के लिए आधार + पासबुक के साथ बैंक शाखा जाएं।"
      }
    },
    scholarshipRejection: {
      keywords: ['rejected', 'rejection', 'not approved', 'failed', 'denied'],
      response: {
        en: "**Common Rejection Reasons**:\n- UID NEVER ENABLED FOR DBT\n- Account inactive/closed\n- Invalid documents\n\n**Immediate Steps**:\n1. Check rejection reason in NSP portal\n2. Verify DBT status at myaadhaar.uidai.gov.in\n3. If DBT issue: Visit bank for seeding\n4. Re-apply after fixing issues\n\n**Grievance**: File on NSP Grievance Portal with OTR number\n\nWhat's your specific rejection reason? 🎓",
        hi: "**सामान्य अस्वीकृति कारण**:\n- UID NEVER ENABLED FOR DBT\n- खाता निष्क्रिय/बंद\n- अमान्य दस्तावेज\n\n**तत्काल कदम**:\n1. NSP पोर्टल में अस्वीकृति कारण जांचें\n2. myaadhaar.uidai.gov.in पर डीबीटी स्थिति सत्यापित करें\n3. यदि डीबीटी समस्या: सीडिंग के लिए बैंक जाएं\n4. समस्या ठीक करने के बाद दोबारा आवेदन करें"
      }
    },
    aadharSeeding: {
      keywords: ['seeding', 'link bank', 'enable dbt', 'bank linking', 'aadhaar bank'],
      response: {
        en: "**Aadhaar Bank Seeding Methods**:\n\n1. **Bank Branch Visit** (Recommended)\n   - Carry Aadhaar + Bank passbook\n   - Fill DBT consent form\n   - Get acknowledgment receipt\n\n2. **Online Methods**:\n   - Net banking portal\n   - Mobile banking app\n   - Some banks support SMS\n\n**Processing Time**: 7-10 working days\n**Verification**: Check status at myaadhaar.uidai.gov.in\n\nWhich bank are you using? I can provide specific steps! 🎓",
        hi: "**आधार बैंक सीडिंग विधियां**:\n\n1. **बैंक शाखा जाएं** (सुझाई गई)\n   - आधार + बैंक पासबुक ले जाएं\n   - डीबीटी सहमति फॉर्म भरें\n   - पावती रसीद लें\n\n2. **ऑनलाइन तरीके**:\n   - नेट बैंकिंग पोर्टल\n   - मोबाइल बैंकिंग ऐप\n   - कुछ बैंक SMS समर्थित करते हैं\n\n**प्रसंस्करण समय**: 7-10 कार्य दिवस"
      }
    },
    paymentDelay: {
      keywords: ['payment delay', 'money not received', 'pfms', 'not credited', 'approved but no money'],
      response: {
        en: "**Payment Delay Solutions**:\n\n**Check Payment Status**:\n1. PFMS Portal: pfms.nic.in\n2. Enter your details to track\n3. Status shows: Success/Failed/Pending\n\n**Common Delays**:\n- PFMS processing: 30-45 days after approval\n- Bank technical issues\n- DBT mapping problems\n\n**Action Steps**:\n1. Wait 3-7 days if status shows 'Sent to Bank'\n2. Contact bank if delayed beyond this\n3. File grievance with transaction ID\n\nNeed help checking PFMS status? 🎓",
        hi: "**भुगतान विलंब समाधान**:\n\n**भुगतान स्थिति जांचें**:\n1. PFMS पोर्टल: pfms.nic.in\n2. ट्रैक करने के लिए अपना विवरण दर्ज करें\n3. स्थिति: सफल/असफल/लंबित\n\n**सामान्य विलंब**:\n- PFMS प्रसंस्करण: अनुमोदन के 30-45 दिन बाद\n- बैंक तकनीकी समस्याएं\n- डीबीटी मैपिंग समस्याएं"
      }
    },
    documents: {
      keywords: ['documents', 'certificates', 'income certificate', 'caste certificate', 'bonafide'],
      response: {
        en: "**Required Documents Checklist**:\n\n**Essential Documents**:\n✅ Aadhaar Card (original + copy)\n✅ Bank Passbook/Statement\n✅ Income Certificate (annual renewal)\n✅ Educational certificates\n\n**Category-Specific**:\n✅ Caste Certificate (SC/ST/OBC schemes)\n✅ Bonafide Certificate from institution\n✅ Admission proof\n\n**Document Tips**:\n- All certificates must be valid\n- Income certificate renewed annually\n- Clear scanned copies (under 1MB)\n\nWhich specific document do you need help with? 🎓",
        hi: "**आवश्यक दस्तावेज चेकलिस्ट**:\n\n**आवश्यक दस्तावेज**:\n✅ आधार कार्ड (मूल + कॉपी)\n✅ बैंक पासबुक/स्टेटमेंट\n✅ आय प्रमाणपत्र (वार्षिक नवीनीकरण)\n✅ शैक्षणिक प्रमाणपत्र\n\n**श्रेणी-विशिष्ट**:\n✅ जाति प्रमाणपत्र (SC/ST/OBC योजनाएं)\n✅ संस्थान से बोनाफाइड प्रमाणपत्र\n✅ प्रवेश प्रमाण"
      }
    }
  };

  const quickActions = {
    en: [
      "Check DBT Status",
      "Scholarship Rejected",
      "Payment Delay",
      "Aadhaar Seeding",
      "Required Documents",
      "File Grievance"
    ],
    hi: [
      "डीबीटी स्थिति जांचें",
      "छात्रवृत्ति अस्वीकृत",
      "भुगतान विलंब",
      "आधार सीडिंग",
      "आवश्यक दस्तावेज",
      "शिकायत दर्ज करें"
    ]
  };

  const findBestResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    // Check each knowledge base entry
    for (const [key, data] of Object.entries(dbtKnowledgeBase)) {
      if (data.keywords.some(keyword => message.includes(keyword))) {
        return data.response[language];
      }
    }

    // Default response for non-DBT queries
    return language === 'en' 
      ? "I specialize only in DBT scholarships and Aadhaar seeding queries. For other topics, please contact the appropriate helpdesk.\n\nI can help you with:\n• DBT status checks\n• Scholarship rejections\n• Aadhaar seeding process\n• Payment delays\n• Required documents\n• Grievance procedures\n\nPlease ask me anything related to these topics! 🎓"
      : "मैं केवल डीबीटी छात्रवृत्ति और आधार सीडिंग प्रश्नों में विशेषज्ञ हूं। अन्य विषयों के लिए, कृपया उपयुक्त हेल्पडेस्क से संपर्क करें।\n\nमैं आपकी इनमें मदद कर सकता हूं:\n• डीबीटी स्थिति जांच\n• छात्रवृत्ति अस्वीकरण\n• आधार सीडिंग प्रक्रिया\n• भुगतान विलंब\n• आवश्यक दस्तावेज\n• शिकायत प्रक्रिया\n\nकृपया इन विषयों से संबंधित कोई भी प्रश्न पूछें! 🎓";
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        content: findBestResponse(inputMessage),
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickAction = (action) => {
    setInputMessage(action);
    handleSendMessage();
  };

  const toggleWidget = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: "spring" }}
      >
        <Button
          onClick={toggleWidget}
          className="w-16 h-16 rounded-full bg-[var(--primary-orange)] hover:bg-orange-700 shadow-lg hover:shadow-xl transition-all duration-300"
          size="lg"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 90 }}
              >
                <X className="w-6 h-6 text-white" />
              </motion.div>
            ) : (
              <motion.div
                key="message"
                initial={{ scale: 0, rotate: 90 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: -90 }}
              >
                <MessageCircle className="w-6 h-6 text-white" />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
        
        {/* Notification Badge */}
        {!isOpen && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-2 -right-2"
          >
            <Badge className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              DBT Help
            </Badge>
          </motion.div>
        )}
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-40"
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <Card className="w-96 h-[500px] shadow-2xl border-none">
              <CardHeader className="bg-[var(--primary-blue)] text-white rounded-t-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[var(--primary-orange)] rounded-full flex items-center justify-center">
                      <MessageCircle className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">DBT Buddy</CardTitle>
                      <p className="text-xs text-gray-300">
                        {language === 'en' ? 'Scholarship Assistant' : 'छात्रवृत्ति सहायक'}
                      </p>
                    </div>
                  </div>
                  
                  {/* Language Toggle */}
                  <div className="flex bg-white/20 rounded-full p-1">
                    <Button
                      variant={language === 'en' ? 'secondary' : 'ghost'}
                      size="sm"
                      onClick={() => setLanguage('en')}
                      className="text-xs px-2 py-1 h-6 text-white hover:bg-white/30"
                    >
                      EN
                    </Button>
                    <Button
                      variant={language === 'hi' ? 'secondary' : 'ghost'}
                      size="sm"
                      onClick={() => setLanguage('hi')}
                      className="text-xs px-2 py-1 h-6 text-white hover:bg-white/30"
                    >
                      हि
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="flex flex-col h-[420px] p-0">
                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.type === 'user'
                            ? 'bg-[var(--primary-orange)] text-white'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        <div className="whitespace-pre-line text-sm">
                          {typeof message.content === 'object' 
                            ? message.content[language] 
                            : message.content}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 p-3 rounded-lg">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Quick Actions */}
                {messages.length === 1 && (
                  <div className="p-4 border-t bg-gray-50">
                    <p className="text-xs text-gray-600 mb-2">
                      {language === 'en' ? 'Quick Actions:' : 'त्वरित क्रियाएं:'}
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {quickActions[language].slice(0, 4).map((action, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuickAction(action)}
                          className="text-xs p-2 h-8 border-[var(--primary-orange)] text-[var(--primary-orange)] hover:bg-orange-50"
                        >
                          {action}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Message Input */}
                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder={language === 'en' ? 'Ask about DBT scholarships...' : 'डीबीटी छात्रवृत्ति के बारे में पूछें...'}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button 
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim()}
                      className="bg-[var(--primary-orange)] hover:bg-orange-700"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}