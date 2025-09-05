
import React, { useState, useEffect } from "react";
import { Student, School } from "@/entities/all";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3, 
  Users, 
  School as SchoolIcon,
  TrendingUp,
  Download,
  Filter,
  MapPin
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

import DistrictOverview from "../components/admin/DistrictOverview";
import SchoolPerformance from "../components/admin/SchoolPerformance";

export default function AdminDashboard() {
  const [students, setStudents] = useState([]);
  const [schools, setSchools] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [language, setLanguage] = useState("en");
  const [selectedDistrict, setSelectedDistrict] = useState("all");

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
    setIsLoading(false);
  };

  const getDistrictStats = () => {
    const districts = {};
    schools.forEach(school => {
      const district = school.district;
      if (!districts[district]) {
        districts[district] = { 
          schools: 0, 
          students: 0, 
          ready: 0,
          name: district 
        };
      }
      districts[district].schools += 1;
      
      const schoolStudents = students.filter(s => s.school_id === school.id);
      districts[district].students += schoolStudents.length;
      districts[district].ready += schoolStudents.filter(s => s.dbt_status === "ready").length;
    });
    
    return Object.values(districts).map(d => ({
      ...d,
      readiness: d.students > 0 ? Math.round((d.ready / d.students) * 100) : 0
    }));
  };

  const getStatusDistribution = () => {
    const statusCounts = {
      ready: students.filter(s => s.dbt_status === "ready").length,
      not_ready: students.filter(s => s.dbt_status === "not_ready").length,
      not_checked: students.filter(s => s.dbt_status === "not_checked").length,
      pending: students.filter(s => s.dbt_status === "pending").length
    };

    return [
      { name: "Ready", value: statusCounts.ready, color: "#22c55e" },
      { name: "Not Ready", value: statusCounts.not_ready, color: "var(--primary-orange)" },
      { name: "Not Checked", value: statusCounts.not_checked, color: "#6b7280" },
      { name: "Pending", value: statusCounts.pending, color: "var(--secondary-blue)" }
    ];
  };

  const exportDistrictReport = () => {
    const districtStats = getDistrictStats();
    const csvContent = [
      ["District", "Schools", "Total Students", "DBT Ready", "Readiness %"],
      ...districtStats.map(d => [d.name, d.schools, d.students, d.ready, d.readiness])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `district-dbt-report-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const content = {
    en: {
      title: "Admin Dashboard",
      subtitle: "District-level DBT readiness analytics and management",
      overview: "District Overview",
      performance: "School Performance",
      distribution: "Status Distribution",
      totalStudents: "Total Students",
      totalSchools: "Total Schools", 
      avgReadiness: "Average Readiness",
      topPerformer: "Top Performer"
    },
    hi: {
      title: "एडमिन डैशबोर्ड",
      subtitle: "जिला-स्तरीय डीबीटी तैयारी एनालिटिक्स और प्रबंधन",
      overview: "जिला अवलोकन",
      performance: "स्कूल प्रदर्शन",
      distribution: "स्थिति वितरण",
      totalStudents: "कुल छात्र",
      totalSchools: "कुल स्कूल",
      avgReadiness: "औसत तैयारी",
      topPerformer: "शीर्ष प्रदर्शनकर्ता"
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

          <div className="flex gap-3 items-center">
            {/* Language Toggle */}
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
            
            <Button onClick={exportDistrictReport} variant="outline" className="border-[var(--primary-blue)] text-[var(--primary-blue)] hover:bg-blue-50">
              <Download className="w-4 h-4 mr-2" />
              {language === "en" ? "Export Report" : "रिपोर्ट निर्यात"}
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white border border-[var(--border-color)]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {currentContent.totalStudents}
              </CardTitle>
              <Users className="h-4 w-4 text-[var(--primary-blue)]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{students.length}</div>
              <p className="text-xs text-gray-500">
                {language === "en" ? "Across all schools" : "सभी स्कूलों में"}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border border-[var(--border-color)]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {currentContent.totalSchools}
              </CardTitle>
              <SchoolIcon className="h-4 w-4 text-[var(--secondary-blue)]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{schools.length}</div>
              <p className="text-xs text-gray-500">
                {language === "en" ? "Participating schools" : "भाग लेने वाले स्कूल"}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border border-[var(--border-color)]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {currentContent.avgReadiness}
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {students.length > 0 ? 
                  Math.round((students.filter(s => s.dbt_status === "ready").length / students.length) * 100) : 0
                }%
              </div>
              <p className="text-xs text-gray-500">
                {language === "en" ? "District average" : "जिला औसत"}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border border-[var(--border-color)]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {currentContent.topPerformer}
              </CardTitle>
              <MapPin className="h-4 w-4 text-[var(--primary-orange)]" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold truncate text-[var(--primary-blue)]">
                {schools[0]?.name || "-"}
              </div>
              <p className="text-xs text-gray-500">
                {language === "en" ? "Best performing school" : "सर्वश्रेष्ठ प्रदर्शन करने वाला स्कूल"}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Analytics */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* District Overview Chart */}
          <DistrictOverview 
            data={getDistrictStats()}
            language={language}
            currentContent={currentContent}
          />

          {/* Status Distribution */}
          <Card className="bg-white border border-[var(--border-color)]">
            <CardHeader>
              <CardTitle className="text-[var(--primary-blue)]">{currentContent.distribution}</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={getStatusDistribution()}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {getStatusDistribution().map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap gap-2 mt-4">
                {getStatusDistribution().map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm">{item.name}: {item.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* School Performance Table */}
        <SchoolPerformance 
          schools={schools}
          students={students}
          language={language}
        />
      </div>
    </div>
  );
}
