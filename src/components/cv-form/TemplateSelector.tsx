import type React from "react";
import { useCV } from "@/context/CVContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Layout } from "lucide-react";

const templates = [
  {
    id: "modern",
    name: "Modern",
    description: "Clean and minimal design with a modern touch",
    color: "bg-primary/10 border-primary",
    preview: (
      <div className="flex flex-col space-y-1">
        <div className="h-3 w-full rounded bg-gray-300"></div>
        <div className="flex space-x-1">
          <div className="h-10 w-10 rounded-full bg-primary/20"></div>
          <div className="flex-1 space-y-1">
            <div className="h-2 w-20 rounded bg-gray-300"></div>
            <div className="h-2 w-16 rounded bg-gray-300"></div>
          </div>
        </div>
        <div className="flex space-x-1">
          <div className="h-14 w-1/3 rounded bg-gray-200"></div>
          <div className="h-14 w-2/3 rounded bg-gray-200"></div>
        </div>
      </div>
    ),
  },
  {
    id: "professional",
    name: "Professional",
    description: "Traditional layout ideal for formal applications",
    color: "bg-slate-100 border-slate-700",
    preview: (
      <div className="flex flex-col space-y-1">
        <div className="h-5 w-full rounded bg-slate-700"></div>
        <div className="flex">
          <div className="h-24 w-1/3 rounded-bl bg-slate-200 p-1">
            <div className="mb-1 h-2 w-12 rounded bg-slate-400"></div>
            <div className="h-2 w-full rounded bg-slate-400"></div>
            <div className="mt-1 h-2 w-full rounded bg-slate-400"></div>
          </div>
          <div className="h-24 w-2/3 p-1">
            <div className="mb-1 h-2 w-12 rounded bg-slate-300"></div>
            <div className="h-2 w-full rounded bg-slate-300"></div>
            <div className="mt-1 h-2 w-full rounded bg-slate-300"></div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "creative",
    name: "Creative",
    description: "Vibrant and dynamic design for creative fields",
    color: "bg-gradient-to-r from-purple-100 to-blue-100 border-purple-500",
    preview: (
      <div className="flex flex-col space-y-1">
        <div className="h-6 w-full rounded-t bg-gradient-to-r from-purple-500 to-blue-500"></div>
        <div className="flex flex-wrap gap-1 p-1">
          <div className="h-3 w-1/3 rounded-md bg-purple-200 p-0.5">
            <div className="h-full w-full rounded bg-purple-300"></div>
          </div>
          <div className="h-3 w-1/3 rounded-md bg-blue-200 p-0.5">
            <div className="h-full w-1/2 rounded bg-blue-300"></div>
          </div>
          <div className="h-3 w-1/2 rounded-md bg-purple-200 p-0.5">
            <div className="h-full w-2/3 rounded bg-purple-300"></div>
          </div>
          <div className="h-3 w-1/3 rounded-md bg-blue-200 p-0.5">
            <div className="h-full w-full rounded bg-blue-300"></div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Simple and elegant design focused on content",
    color: "bg-white border-neutral-300",
    preview: (
      <div className="flex flex-col space-y-2 p-1">
        <div className="space-y-0.5">
          <div className="h-2 w-20 rounded bg-neutral-300"></div>
          <div className="h-2 w-16 rounded bg-neutral-300"></div>
        </div>
        <div className="flex flex-wrap gap-1">
          <div className="h-2 w-8 rounded-full border border-neutral-300"></div>
          <div className="h-2 w-10 rounded-full border border-neutral-300"></div>
          <div className="h-2 w-6 rounded-full border border-neutral-300"></div>
        </div>
        <div className="space-y-0.5">
          <div className="h-1.5 w-full rounded bg-neutral-200"></div>
          <div className="h-1.5 w-full rounded bg-neutral-200"></div>
          <div className="h-1.5 w-2/3 rounded bg-neutral-200"></div>
        </div>
      </div>
    ),
  },
];

const TemplateSelector: React.FC = () => {
  const { cvData, setTemplate } = useCV();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Layout className="mr-2 h-5 w-5" />
          <span>Choose Template</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {templates.map((template) => (
            <div
              key={template.id}
              className={`group cursor-pointer overflow-hidden rounded-md border-2 transition-all hover:shadow-md ${
                cvData.template === template.id
                  ? "border-primary ring-2 ring-primary/20"
                  : "border-input hover:border-primary/50"
              }`}
              onClick={() => setTemplate(template.id)}
            >
              <div className={`mb-2 h-24 overflow-hidden ${template.color}`}>
                {template.preview}
              </div>
              <div className="p-2">
                <h3 className="text-sm font-medium">{template.name}</h3>
                <p className="text-xs text-muted-foreground">
                  {template.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TemplateSelector;
