
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, FileText, Download } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function StudentUpload({ onUpload, language, currentContent }) {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const processCSV = async () => {
    if (!file) return;
    
    setIsUploading(true);
    
    // Mock CSV processing
    setTimeout(() => {
      const mockStudents = [
        { name: "Rahul Kumar", phone: "9876543210", aadhaar_last_4: "1234", class_grade: "12th" },
        { name: "Priya Sharma", phone: "9876543211", aadhaar_last_4: "5678", class_grade: "11th" },
        { name: "Amit Singh", phone: "9876543212", aadhaar_last_4: "9012", class_grade: "12th" }
      ];
      onUpload(mockStudents);
      setFile(null);
      setIsUploading(false);
    }, 2000);
  };

  const downloadTemplate = () => {
    const template = "Name,Phone,Aadhaar_Last_4,Class_Grade\nRahul Kumar,9876543210,1234,12th\nPriya Sharma,9876543211,5678,11th";
    const blob = new Blob([template], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'student_data_template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="bg-white border border-[var(--border-color)]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-[var(--primary-blue)]">
          <Upload className="w-5 h-5" />
          {currentContent.uploadTitle}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert className="bg-blue-50 border-blue-200">
          <FileText className="w-4 h-4 text-[var(--secondary-blue)]" />
          <AlertDescription className="text-blue-800">
            {language === "en" ? 
              "Upload student data via CSV file. Download template below." :
              "CSV फ़ाइल के माध्यम से छात्र डेटा अपलोड करें। नीचे टेम्पलेट डाउनलोड करें।"
            }
          </AlertDescription>
        </Alert>

        <div>
          <Label>{language === "en" ? "Select CSV File" : "CSV फ़ाइल चुनें"}</Label>
          <Input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="mt-2"
          />
        </div>

        <div className="space-y-2">
          <Button
            onClick={processCSV}
            disabled={!file || isUploading}
            className="w-full bg-[var(--primary-orange)] hover:bg-orange-700"
          >
            {isUploading ? (
              language === "en" ? "Uploading..." : "अपलोड कर रहे हैं..."
            ) : (
              currentContent.actions.upload
            )}
          </Button>
          
          <Button
            variant="outline"
            onClick={downloadTemplate}
            className="w-full border-[var(--primary-blue)] text-[var(--primary-blue)] hover:bg-blue-50"
          >
            <Download className="w-4 h-4 mr-2" />
            {language === "en" ? "Download Template" : "टेम्पलेट डाउनलोड"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
