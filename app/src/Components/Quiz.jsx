import React, { useState, useEffect } from "react";
import { QuizResult } from "@/entities/QuizResult";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Trophy, 
  Clock, 
  CheckCircle2, 
  XCircle,
  Star,
  RotateCcw,
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [startTime] = useState(Date.now());
  const [language, setLanguage] = useState("en");

  const questions = {
    en: [
      {
        id: 1,
        question: "What is the main difference between Aadhaar-linked and DBT-enabled bank accounts?",
        options: [
          "DBT-enabled accounts can receive direct government benefits",
          "Aadhaar-linked accounts are more secure",
          "There is no difference",
          "DBT accounts require higher minimum balance"
        ],
        correct: 0
      },
      {
        id: 2,
        question: "Which organization manages the DBT mapping system?",
        options: ["UIDAI", "RBI", "NPCI", "Ministry of Finance"],
        correct: 2
      },
      {
        id: 3,
        question: "What happens if your bank account is NOT DBT-enabled when scholarships are disbursed?",
        options: [
          "You receive the money immediately",
          "The transfer may fail or be delayed",
          "The money goes to a different account",
          "Nothing changes"
        ],
        correct: 1
      },
      {
        id: 4,
        question: "To enable DBT on your account, you need to visit:",
        options: [
          "Aadhaar enrollment center",
          "Post office",
          "Your bank branch",
          "Government office"
        ],
        correct: 2
      },
      {
        id: 5,
        question: "What documents do you typically need to enable DBT seeding?",
        options: [
          "Aadhaar card and recent photograph",
          "PAN card and income certificate",
          "Voter ID and electricity bill",
          "Passport and birth certificate"
        ],
        correct: 0
      }
    ],
    hi: [
      {
        id: 1,
        question: "आधार-लिंक्ड और डीबीटी-सक्षम बैंक खातों के बीच मुख्य अंतर क्या है?",
        options: [
          "डीबीटी-सक्षम खाते प्रत्यक्ष सरकारी लाभ प्राप्त कर सकते हैं",
          "आधार-लिंक्ड खाते अधिक सुरक्षित हैं",
          "कोई अंतर नहीं है",
          "डीबीटी खातों में उच्च न्यूनतम शेष की आवश्यकता है"
        ],
        correct: 0
      },
      {
        id: 2,
        question: "डीबीटी मैपिंग सिस्टम का प्रबंधन कौन सा संगठन करता है?",
        options: ["यूआईडीएआई", "आरबीआई", "एनपीसीआई", "वित्त मंत्रालय"],
        correct: 2
      },
      {
        id: 3,
        question: "यदि छात्रवृत्ति वितरण के समय आपका बैंक खाता डीबीटी-सक्षम नहीं है तो क्या होता है?",
        options: [
          "आपको तुरंत पैसा मिल जाता है",
          "स्थानान्तरण असफल या विलंबित हो सकता है",
          "पैसा दूसरे खाते में चला जाता है",
          "कुछ नहीं बदलता"
        ],
        correct: 1
      },
      {
        id: 4,
        question: "अपने खाते पर डीबीटी सक्षम करने के लिए आपको यहाँ जाना होगा:",
        options: [
          "आधार नामांकन केंद्र",
          "डाकघर",
          "आपकी बैंक शाखा",
          "सरकारी कार्यालय"
        ],
        correct: 2
      },
      {
        id: 5,
        question: "डीबीटी सीडिंग सक्षम करने के लिए आपको आम तौर पर किन दस्तावेजों की आवश्यकता होती है?",
        options: [
          "आधार कार्ड और हाल की तस्वीर",
          "पैन कार्ड और आय प्रमाणपत्र",
          "मतदाता पहचान पत्र और बिजली बिल",
          "पासपोर्ट और जन्म प्रमाणपत्र"
        ],
        correct: 0
      }
    ]
  };

  const currentQuestions = questions[language];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAnswer = (optionIndex) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);

    if (currentQuestion < currentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      finishQuiz(newAnswers);
    }
  };

  const finishQuiz = async (finalAnswers) => {
    const correct = finalAnswers.filter((answer, index) => 
      answer === currentQuestions[index].correct
    ).length;
    
    const score = (correct / currentQuestions.length) * 100;
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    
    let badge = "beginner";
    if (score >= 90) badge = "hero";
    else if (score >= 70) badge = "expert";
    else if (score >= 50) badge = "intermediate";

    // Save result (using phone as anonymous identifier)
    await QuizResult.create({
      student_phone: "anonymous_" + Date.now(),
      score,
      total_questions: currentQuestions.length,
      correct_answers: correct,
      time_taken_seconds: timeTaken,
      badge_earned: badge,
      language
    });

    setShowResult({ score, correct, badge, timeTaken });
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
    setTimeLeft(600);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getBadgeColor = (badge) => {
    const colors = {
      beginner: "bg-gray-500",
      intermediate: "bg-blue-500", 
      expert: "bg-purple-500",
      hero: "bg-gold-500 from-yellow-400 to-yellow-600"
    };
    return colors[badge] || "bg-gray-500";
  };

  if (showResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-2xl"
        >
          <Card className="bg-white/90 backdrop-blur-sm border-none shadow-2xl">
            <CardHeader className="text-center pb-6">
              <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                <Trophy className="w-12 h-12 text-white" />
              </div>
              <CardTitle className="text-2xl md:text-3xl font-bold">
                {language === "en" ? "Quiz Complete!" : "क्विज़ पूरा!"}
              </CardTitle>
              <Badge className={`${getBadgeColor(showResult.badge)} text-white text-lg px-4 py-2`}>
                {showResult.badge.charAt(0).toUpperCase() + showResult.badge.slice(1)} 
                {language === "en" ? " Badge Earned" : " बैज अर्जित"}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <p className="text-2xl font-bold text-blue-600">{showResult.score}%</p>
                  <p className="text-sm text-blue-700">
                    {language === "en" ? "Score" : "स्कोर"}
                  </p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <p className="text-2xl font-bold text-green-600">
                    {showResult.correct}/{currentQuestions.length}
                  </p>
                  <p className="text-sm text-green-700">
                    {language === "en" ? "Correct" : "सही"}
                  </p>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-lg font-semibold mb-4">
                  {language === "en" ? 
                    `Completed in ${Math.floor(showResult.timeTaken / 60)}:${(showResult.timeTaken % 60).toString().padStart(2, '0')}` :
                    `${Math.floor(showResult.timeTaken / 60)}:${(showResult.timeTaken % 60).toString().padStart(2, '0')} में पूरा`
                  }
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button onClick={resetQuiz} variant="outline" size="lg">
                    <RotateCcw className="w-5 h-5 mr-2" />
                    {language === "en" ? "Try Again" : "फिर कोशिश करें"}
                  </Button>
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    <CheckCircle2 className="w-5 h-5 mr-2" />
                    {language === "en" ? "Check DBT Status" : "डीबीटी स्थिति जांचें"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Quiz Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {language === "en" ? "DBT Knowledge Quiz" : "डीबीटी ज्ञान क्विज़"}
          </h1>
          
          {/* Language Toggle */}
          <div className="flex justify-center mb-6">
            <div className="bg-white rounded-full p-1 shadow-lg">
              <Button
                variant={language === "en" ? "default" : "ghost"}
                onClick={() => setLanguage("en")}
                className="rounded-full px-4 md:px-6"
                size="sm"
              >
                English
              </Button>
              <Button
                variant={language === "hi" ? "default" : "ghost"}
                onClick={() => setLanguage("hi")}
                className="rounded-full px-4 md:px-6"
                size="sm"
              >
                हिंदी
              </Button>
            </div>
          </div>

          {/* Quiz Progress */}
          <div className="flex justify-between items-center mb-4">
            <Badge variant="outline" className="text-xs md:text-sm">
              {language === "en" ? "Question" : "प्रश्न"} {currentQuestion + 1}/{currentQuestions.length}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1 text-xs md:text-sm">
              <Clock className="w-3 h-3" />
              {formatTime(timeLeft)}
            </Badge>
          </div>
          <Progress value={((currentQuestion + 1) / currentQuestions.length) * 100} className="h-2" />
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-white/90 backdrop-blur-sm border-none shadow-2xl">
              <CardHeader>
                <CardTitle className="text-lg md:text-2xl leading-relaxed">
                  {currentQuestions[currentQuestion].question}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {currentQuestions[currentQuestion].options.map((option, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full text-left justify-start p-4 md:p-6 h-auto hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
                      onClick={() => handleAnswer(index)}
                    >
                      <div className="flex items-center gap-4 w-full">
                        <div className="w-6 h-6 md:w-8 md:h-8 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-600 flex-shrink-0">
                          {String.fromCharCode(65 + index)}
                        </div>
                        <p className="text-sm md:text-lg text-gray-700">{option}</p>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Quiz Stats */}
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4 text-center">
              <Trophy className="w-6 md:w-8 h-6 md:h-8 text-blue-600 mx-auto mb-2" />
              <p className="font-semibold text-blue-800 text-sm md:text-base">
                {language === "en" ? "Earn Badges" : "बैज अर्जित करें"}
              </p>
              <p className="text-xs text-blue-600">
                {language === "en" ? "Score 90%+ for Hero badge" : "हीरो बैज के लिए 90%+ स्कोर करें"}
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4 text-center">
              <CheckCircle2 className="w-6 md:w-8 h-6 md:h-8 text-green-600 mx-auto mb-2" />
              <p className="font-semibold text-green-800 text-sm md:text-base">
                {language === "en" ? "Learn & Practice" : "सीखें और अभ्यास करें"}
              </p>
              <p className="text-xs text-green-600">
                {language === "en" ? "Improve your DBT knowledge" : "अपना डीबीटी ज्ञान बेहतर बनाएं"}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-purple-50 border-purple-200">
            <CardContent className="p-4 text-center">
              <Star className="w-6 md:w-8 h-6 md:h-8 text-purple-600 mx-auto mb-2" />
              <p className="font-semibold text-purple-800 text-sm md:text-base">
                {language === "en" ? "Track Progress" : "प्रगति ट्रैक करें"}
              </p>
              <p className="text-xs text-purple-600">
                {language === "en" ? "See your improvement over time" : "समय के साथ अपना सुधार देखें"}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}