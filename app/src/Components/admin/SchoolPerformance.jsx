
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { School as SchoolIcon, TrendingUp, TrendingDown } from "lucide-react";

export default function SchoolPerformance({ schools, students, language }) {
  const getSchoolStats = (school) => {
    const schoolStudents = students.filter(s => s.school_id === school.id);
    const readyCount = schoolStudents.filter(s => s.dbt_status === "ready").length;
    const total = schoolStudents.length;
    const readiness = total > 0 ? Math.round((readyCount / total) * 100) : 0;
    
    return { total, readyCount, readiness };
  };

  const getPerformanceTrend = (readiness) => {
    if (readiness >= 80) return { icon: TrendingUp, color: "text-green-500" };
    if (readiness >= 60) return { icon: TrendingUp, color: "text-yellow-500" };
    return { icon: TrendingDown, color: "text-[var(--accent-red)]" };
  };

  return (
    <Card className="bg-white border border-[var(--border-color)]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-[var(--primary-blue)]">
          <SchoolIcon className="w-5 h-5" />
          {language === "en" ? "School Performance" : "स्कूल प्रदर्शन"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead>{language === "en" ? "School" : "स्कूल"}</TableHead>
                <TableHead>{language === "en" ? "District" : "जिला"}</TableHead>
                <TableHead>{language === "en" ? "Students" : "छात्र"}</TableHead>
                <TableHead>{language === "en" ? "DBT Ready" : "डीबीटी तैयार"}</TableHead>
                <TableHead>{language === "en" ? "Progress" : "प्रगति"}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {schools.map((school) => {
                const stats = getSchoolStats(school);
                const trend = getPerformanceTrend(stats.readiness);
                
                return (
                  <TableRow key={school.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-[var(--primary-blue)]">{school.name}</p>
                        <p className="text-xs text-gray-500">{school.principal_name}</p>
                      </div>
                    </TableCell>
                    <TableCell>{school.district}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-[var(--border-color)]">{stats.total}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <trend.icon className={`w-4 h-4 ${trend.color}`} />
                        <span className="font-medium">{stats.readyCount}/{stats.total}</span>
                      </div>
                    </TableCell>
                    <TableCell className="w-32">
                      <div className="space-y-1">
                        <Progress value={stats.readiness} className="h-2 [&>div]:bg-[var(--primary-orange)]" />
                        <p className="text-xs text-gray-500 text-center">{stats.readiness}%</p>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
