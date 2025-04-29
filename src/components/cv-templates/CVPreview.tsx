import type React from "react";
import { useRef } from "react";
import { useCV } from "@/context/CVContext";
import ModernTemplate from "./ModernTemplate";
import ProfessionalTemplate from "./ProfessionalTemplate";
import CreativeTemplate from "./CreativeTemplate";
import MinimalTemplate from "./MinimalTemplate";
import { Button } from "@/components/ui/button";
import { Download, Printer, FileCheck } from "lucide-react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { useToast } from "@/hooks/use-toast";

const templates = {
  modern: ModernTemplate,
  professional: ProfessionalTemplate,
  creative: CreativeTemplate,
  minimal: MinimalTemplate,
};

// A4 dimensions in mm
const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;

const CVPreview: React.FC = () => {
  const { cvData } = useCV();
  const { toast } = useToast();
  const pdfRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    if (!pdfRef.current) return;

    try {
      toast({
        title: "Generating PDF",
        description: "Please wait while we prepare your CV...",
      });

      // Increase scale for better quality
      const canvas = await html2canvas(pdfRef.current, {
        scale: 4, // Increased from 2 to 4 for higher quality
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        imageTimeout: 0,
        allowTaint: true,
        letterRendering: true,
      });

      const imgData = canvas.toDataURL("image/jpeg", 1.0); // Use highest quality JPEG
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: [A4_WIDTH_MM, A4_HEIGHT_MM],
        compress: false, // Disable compression for higher quality
      });

      // Add the image to the PDF at the correct dimensions
      pdf.addImage(imgData, "JPEG", 0, 0, A4_WIDTH_MM, A4_HEIGHT_MM);
      pdf.save(`${cvData.personalInfo.fullName || "CV"}.pdf`);

      toast({
        title: "CV Downloaded",
        description: "Your CV has been downloaded successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to download CV. Please try again.",
        variant: "destructive",
      });
      console.error("PDF generation error:", error);
    }
  };

  // Dynamically select the template based on the user's choice
  const SelectedTemplate =
    templates[cvData.template as keyof typeof templates] || ModernTemplate;

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
        <h2 className="text-2xl font-bold tracking-tight">Preview</h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button variant="default" size="sm" onClick={handleDownloadPDF}>
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-[1000px] border border-gray-200 shadow">
        <div
          className="a4-container relative mx-auto shadow-sm"
          style={{
            width: "100%",
            aspectRatio: `${A4_WIDTH_MM} / ${A4_HEIGHT_MM}`,
          }}
        >
          <div
            ref={pdfRef}
            className="cv-preview absolute inset-0 w-full bg-white"
          >
            <SelectedTemplate data={cvData} />
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-md bg-muted p-4 text-sm">
        <div className="flex items-start">
          <FileCheck className="mr-2 mt-0.5 h-4 w-4" />
          <p>
            <strong>Tip:</strong> This CV is set to A4 size (210×297mm). To get
            the best results, make sure all sections are filled with accurate
            information. Try different templates to find the one that best
            showcases your experience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CVPreview;
