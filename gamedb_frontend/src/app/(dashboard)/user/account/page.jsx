"use client";
import React, { useState } from "react";
import {
  PaperclipIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  UserIcon,
  BriefcaseIcon,
  MailIcon,
  DollarSignIcon,
} from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function Page() {
  const [expandedSection, setExpandedSection] = useState("personal");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDownload = (fileName) => {
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 3000);
  };

  const sections = {
    personal: {
      icon: <UserIcon className="size-5" />,
      title: "Personal Information",
      content: (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-medium">Full Name</span>
            <span className="text-muted-foreground">Margot Foster</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">Email</span>
            <span className="text-blue-400">margotfoster@example.com</span>
          </div>
        </div>
      ),
    },
    application: {
      icon: <BriefcaseIcon className="size-5" />,
      title: "Application Details",
      content: (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-medium">Position</span>
            <Badge variant="secondary">Backend Developer</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">Expected Salary</span>
            <Badge variant="outline" className="text-emerald-400">
              $120,000
            </Badge>
          </div>
        </div>
      ),
    },
  };

  return (
    <Card className="max-w-3xl mx-auto border-border">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">
            Application Review
          </h2>
          <Badge variant="secondary" className="text-xs">
            Under Review
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          Submitted on January 16, 2025
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        {showConfirmation && (
          <Alert className="mb-4">
            <AlertDescription>
              Download started. The file will open in a new window.
            </AlertDescription>
          </Alert>
        )}

        {Object.entries(sections).map(([key, section]) => (
          <div key={key} className="border rounded-lg overflow-hidden">
            <Button
              variant="ghost"
              className="w-full flex items-center justify-between p-4 hover:bg-accent"
              onClick={() =>
                setExpandedSection(expandedSection === key ? null : key)
              }
            >
              <div className="flex items-center gap-3">
                {section.icon}
                <span className="font-semibold">{section.title}</span>
              </div>
              {expandedSection === key ? (
                <ChevronUpIcon className="size-5" />
              ) : (
                <ChevronDownIcon className="size-5" />
              )}
            </Button>
            {expandedSection === key && (
              <div className="p-4 bg-muted border-t border-border">
                {section.content}
              </div>
            )}
          </div>
        ))}

        <div className="border rounded-lg p-4 space-y-4">
          <div className="flex items-center gap-3">
            <PaperclipIcon className="size-5" />
            <h3 className="font-semibold">Attachments</h3>
          </div>

          <div className="space-y-3">
            {[
              { name: "resume_back_end_developer.pdf", size: "2.4mb" },
              { name: "coverletter_back_end_developer.pdf", size: "4.5mb" },
            ].map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-card rounded border border-border"
              >
                <div className="flex items-center gap-3">
                  <PaperclipIcon className="size-4 text-muted-foreground" />
                  <span className="font-medium">{file.name}</span>
                  <Badge variant="secondary" className="text-xs">
                    {file.size}
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-blue-400 hover:text-blue-300"
                  onClick={() => handleDownload(file.name)}
                >
                  Download
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-3">About</h3>
          <p className="text-muted-foreground text-sm">
            Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim
            incididunt cillum culpa consequat. Excepteur qui ipsum aliquip
            consequat sint. Sit id mollit nulla mollit nostrud in ea officia
            proident. Irure nostrud pariatur mollit ad adipisicing reprehenderit
            deserunt qui eu.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
