import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCV } from "@/context/CVContext";
import { useToast } from "@/hooks/use-toast";
import { Download, RefreshCcw, Save } from "lucide-react";
import type React from "react";
import EducationForm from "./EducationForm";
import PersonalInfoForm from "./PersonalInfoForm";
import SkillsForm from "./SkillsForm";
import TemplateSelector from "./TemplateSelector";
import WorkExperienceForm from "./WorkExperienceForm";

const CVForm: React.FC = () => {
  const { resetCV } = useCV();
  const { toast } = useToast();

  const handleReset = () => {
    if (
      window.confirm(
        "Are you sure you want to reset your CV? All data will be lost.",
      )
    ) {
      resetCV();
      toast({
        title: "CV Reset",
        description: "Your CV has been reset to default values.",
      });
    }
  };

  const handleSave = () => {
    const cvData = JSON.stringify(localStorage.getItem("cv-data"));
    localStorage.setItem("cv-data", cvData);
    toast({
      title: "CV Saved",
      description: "Your CV data has been saved to local storage.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
        <h2 className="text-2xl font-bold tracking-tight">Build Your CV</h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
          <Button variant="outline" size="sm" onClick={handleReset}>
            <RefreshCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>
      </div>

      <Tabs defaultValue="personal">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="template">Template</TabsTrigger>
        </TabsList>
        <TabsContent value="personal" className="mt-6">
          <PersonalInfoForm />
        </TabsContent>
        <TabsContent value="education" className="mt-6">
          <EducationForm />
        </TabsContent>
        <TabsContent value="experience" className="mt-6">
          <WorkExperienceForm />
        </TabsContent>
        <TabsContent value="skills" className="mt-6">
          <SkillsForm />
        </TabsContent>
        <TabsContent value="template" className="mt-6">
          <TemplateSelector />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CVForm;
