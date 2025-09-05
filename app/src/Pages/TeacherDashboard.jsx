
import React, { useState, useEffect } from "react";
import { Student, School } from "@/entities/all";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Upload, 
  Download, 
  Send,
  CheckCircle2,
  AlertCircle,
  FileText,
  MessageCircle
} from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

import StudentUpload from "../components/teacher/StudentUpload";
import StudentList from "../components/teacher/StudentList";
import SchoolStats from "../components/teacher/SchoolStats";

export default function TeacherDashboard() {
  const [students, setStudents] = useState([]);
  const [schools, setSchools] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    const [studentData, schoolData] = await Promise.all([
      Student.list("-created_date"),
      School.list("-created_date")
    ]);
    setStudents(studentData);
    setSchools(schoolData);
    if (schoolData.length > 0) {
      setSelectedSchool(schoolData[0]);
    }
    setIsLoading(false);
  };

  const handleStudentUpload = async (uploadedStudents) => {
    // Process uploaded students
    for (const student of uploadedStudents) {
      await Student.create({
        ...student,
        school_id: selectedSchool?.id
      });
    }
    loadData(); // Refresh data
  };

  const sendReminders = async () => {
    // Mock sending reminders
    alert(language === "en" ? 
      "Reminders sent to students who need DBT enablement!" :
      "डीबीटी सक्षमता चाहने वाले छात्रों को रिमाइंडर भेजे गए!"
    );
  };

  const exportReport = () => {
    const csvContent = [
      ["Name", "Phone", "Last 4 Digits", "Class", "DBT Status"],
      ...students.map(student => [
        student.name,
        student.phone,
        student.aadhaar_last_4,
        student.class_grade,
        student.dbt_status
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dbt-readiness-report-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getReadinessPercentage = () => {
    if (students.length === 0) return 0;
    const readyCount = students.filter(s => s.dbt_status === "ready").length;
    return Math.round((readyCount / students.length) * 100);
  };

  const content = {
    en: {
      title: "Teacher Dashboard",
      subtitle: "Manage student DBT readiness across your school",
      uploadTitle: "Upload Student Data",
      statsTitle: "School Statistics",
      studentsTitle: "Student Overview",
      actions: {
        export: "Export Report",
        sendReminders: "Send Reminders",
        upload: "Upload CSV"
      }
    },
    hi: {
      title: "शिक्षक डैशबोर्ड", 
      subtitle: "अपने स्कूल में छात्र डीबीटी तैयारी का प्रबंधन करें",
      uploadTitle: "छात्र डेटा अपलोड करें",
      statsTitle: "स्कूल आंकड़े",
      studentsTitle: "छात्र अवलोकन",
      actions: {
        export: "रिपोर्ट निर्यात करें",
        sendReminders: "रिमाइंडर भेजें",
        upload: "CSV अपलोड करें"
      }
    }
  };

  const currentContent = content[language];

  return (
    <div className="min-h-screen bg-[var(--background-light)] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[var(--primary-blue)]">{currentContent.title}</h1>
            <p className="text-gray-600 mt-1">{currentContent.subtitle}</p>
          </div>
          
          {/* Language Toggle */}
          <div className="flex gap-3 items-center">
            <div className="bg-white rounded-full p-1 shadow-md border border-[var(--border-color)]">
              <Button
                variant={language === 'en' ? 'primary' : 'ghost'}
                onClick={() => setLanguage("en")}
                size="sm"
                className={`rounded-full ${language === 'en' ? 'bg-[var(--primary-blue)] text-white hover:bg-blue-900' : 'text-gray-700'}`}
              >
                English
              </Button>
              <Button
                variant={language === 'hi' ? 'primary' : 'ghost'}
                onClick={() => setLanguage("hi")}
                size="sm"
                className={`rounded-full ${language === 'hi' ? 'bg-[var(--primary-blue)] text-white hover:bg-blue-900' : 'text-gray-700'}`}
              >
                हिंदी
              </Button>
            </div>
            
            <Button onClick={exportReport} variant="outline" className="border-[var(--secondary-blue)] text-[var(--secondary-blue)] hover:bg-blue-50">
              <Download className="w-4 h-4 mr-2" />
              {currentContent.actions.export}
            </Button>
            <Button onClick={sendReminders} className="bg-[var(--primary-orange)] hover:bg-orange-700">
              <MessageCircle className="w-4 h-4 mr-2" />
              {currentContent.actions.sendReminders}
            </Button>
          </div>
        </div>

        {/* School Statistics */}
        <div className="grid lg:grid-cols-4 gap-6 mb-8">
          <SchoolStats
            title={language === "en" ? "Total Students" : "कुल छात्र"}
            value={students.length}
            icon={Users}
            bgColor="bg-[var(--primary-blue)]"
          />
          <SchoolStats
            title={language === "en" ? "DBT Ready" : "डीबीटी तैयार"}
            value={students.filter(s => s.dbt_status === "ready").length}
            icon={CheckCircle2}
            bgColor="bg-green-500"
          />
          <SchoolStats
            title={language === "en" ? "Need Action" : "कार्रवाई चाहिए"}
            value={students.filter(s => s.dbt_status === "not_ready").length}
            icon={AlertCircle}
            bgColor="bg-[var(--primary-orange)]"
          />
          <SchoolStats
            title={language === "en" ? "Readiness %" : "तैयारी %"}
            value={`${getReadinessPercentage()}%`}
            icon={FileText}
            bgColor="bg-[var(--secondary-blue)]"
          />
        </div>

        {/* Progress Overview */}
        <Card className="mb-8 bg-white border border-[var(--border-color)]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[var(--primary-blue)]">
              <CheckCircle2 className="w-6 h-6 text-green-500" />
              {language === "en" ? "DBT Readiness Progress" : "डीबीटी तैयारी प्रगति"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>{language === "en" ? "Overall Progress" : "समग्र प्रगति"}</span>
                <span className="font-semibold">{getReadinessPercentage()}%</span>
              </div>
              <Progress value={getReadinessPercentage()} className="h-3 [&>div]:bg-[var(--primary-orange)]" />
              <p className="text-sm text-gray-600">
                {students.filter(s => s.dbt_status === "ready").length} 
                {language === "en" ? " out of " : " में से "} 
                {students.length} 
                {language === "en" ? " students are DBT ready" : " छात्र डीबीटी तैयार हैं"}
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Student Upload */}
          <div className="lg:col-span-1">
            <StudentUpload 
              onUpload={handleStudentUpload}
              language={language}
              currentContent={currentContent}
            />
          </div>

          {/* Student List */}
          <div className="lg:col-span-2">
            <StudentList 
              students={students}
              isLoading={isLoading}
              language={language}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
