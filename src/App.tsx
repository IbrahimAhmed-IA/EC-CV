import CVForm from "@/components/cv-form/CVForm";
import CVPreview from "@/components/cv-templates/CVPreview";
import { CVProvider } from "@/context/CVContext";
import MainLayout from "@/layouts/MainLayout";
import React from "react";

function App() {
  return (
    <CVProvider>
      <MainLayout>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <CVForm />
          <CVPreview />
        </div>
      </MainLayout>
    </CVProvider>
  );
}

export default App;
