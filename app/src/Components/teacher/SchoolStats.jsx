
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle2, XCircle, Clock, AlertCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function StudentList({ students, isLoading, language }) {
  const getStatusIcon = (status) => {
    switch (status) {
      case "ready": return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case "not_ready": return <XCircle className="w-4 h-4 text-red-500" />;
      case "pending": return <Clock className="w-4 h-4 text-blue-500" />;
      default: return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      ready: "bg-green-100 text-green-800 border-green-200",
      not_ready: "bg-orange-100 text-[var(--primary-orange)] border-orange-200", 
      pending: "bg-blue-100 text-[var(--secondary-blue)] border-blue-200",
      not_checked: "bg-gray-100 text-gray-800 border-gray-200"
    };

    const labels = {
      en: {
        ready: "Ready",
        not_ready: "Not Ready",
        pending: "Pending",
        not_checked: "Not Checked"
      },
      hi: {
        ready: "तैयार",
        not_ready: "तैयार नहीं",
        pending: "लंबित",
        not_checked: "जांच नहीं हुई"
      }
    };

    return (
      <Badge variant="outline" className={styles[status] || styles.not_checked}>
        {labels[language][status] || labels[language].not_checked}
      </Badge>
    );
  };

  return (
    <Card className="bg-white border border-[var(--border-color)]">
      <CardHeader>
        <CardTitle className="text-[var(--primary-blue)]">
          {language === "en" ? "Student Overview" : "छात्र अवलोकन"}
          <Badge variant="outline" className="ml-2 border-[var(--border-color)]">
            {students.length} {language === "en" ? "students" : "छात्र"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead>{language === "en" ? "Name" : "नाम"}</TableHead>
                <TableHead>{language === "en" ? "Class" : "कक्षा"}</TableHead>
                <TableHead>{language === "en" ? "Phone" : "फोन"}</TableHead>
                <TableHead>{language === "en" ? "DBT Status" : "डीबीटी स्थिति"}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array(5).fill(0).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-20" /></TableCell>
                  </TableRow>
                ))
              ) : students.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                    {language === "en" ? 
                      "No students added yet. Upload CSV to get started." :
                      "अभी तक कोई छात्र नहीं जोड़े गए। शुरू करने के लिए CSV अपलोड करें।"
                    }
                  </TableCell>
                </TableRow>
              ) : (
                students.map((student) => (
                  <TableRow key={student.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-xs text-gray-500">****{student.aadhaar_last_4}</p>
                      </div>
                    </TableCell>
                    <TableCell>{student.class_grade}</TableCell>
                    <TableCell>****{student.phone.slice(-4)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(student.dbt_status)}
                        {getStatusBadge(student.dbt_status)}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
