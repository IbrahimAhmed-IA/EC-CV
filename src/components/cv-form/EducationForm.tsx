import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useCV } from "@/context/CVContext";
import type { Education } from "@/context/CVContext";
import {
  ChevronDown,
  ChevronUp,
  GraduationCap,
  Plus,
  Trash2,
} from "lucide-react";
import type React from "react";
import { useState } from "react";

const EducationForm: React.FC = () => {
  const { cvData, addEducation, updateEducation, removeEducation } = useCV();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [newEducation, setNewEducation] = useState<Omit<Education, "id">>({
    institution: "",
    degree: "",
    fieldOfStudy: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const handleNewEducationChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setNewEducation((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddEducation = () => {
    addEducation(newEducation);
    setNewEducation({
      institution: "",
      degree: "",
      fieldOfStudy: "",
      startDate: "",
      endDate: "",
      description: "",
    });
  };

  const handleUpdateEducation = (
    id: string,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    const education = cvData.education.find((edu) => edu.id === id);
    if (education) {
      updateEducation({ ...education, [name]: value });
    }
  };

  const toggleExpanded = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <GraduationCap className="mr-2 h-5 w-5" />
          <span>Education</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {cvData.education.length > 0 ? (
          <div className="space-y-4">
            {cvData.education.map((education) => (
              <div
                key={education.id}
                className="rounded-md border border-input bg-background p-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">
                      {education.institution || "Institution Name"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {education.degree}
                      {education.fieldOfStudy &&
                        ` in ${education.fieldOfStudy}`}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleExpanded(education.id)}
                    >
                      {expanded[education.id] ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeEducation(education.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>

                {expanded[education.id] && (
                  <div className="mt-4 space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <Label htmlFor={`institution-${education.id}`}>
                          Institution
                        </Label>
                        <Input
                          id={`institution-${education.id}`}
                          name="institution"
                          value={education.institution}
                          onChange={(e) =>
                            handleUpdateEducation(education.id, e)
                          }
                          placeholder="University or School Name"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`degree-${education.id}`}>Degree</Label>
                        <Input
                          id={`degree-${education.id}`}
                          name="degree"
                          value={education.degree}
                          onChange={(e) =>
                            handleUpdateEducation(education.id, e)
                          }
                          placeholder="Bachelor's, Master's, etc."
                        />
                      </div>
                      <div>
                        <Label htmlFor={`fieldOfStudy-${education.id}`}>
                          Field of Study
                        </Label>
                        <Input
                          id={`fieldOfStudy-${education.id}`}
                          name="fieldOfStudy"
                          value={education.fieldOfStudy}
                          onChange={(e) =>
                            handleUpdateEducation(education.id, e)
                          }
                          placeholder="Computer Science, Business, etc."
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label htmlFor={`startDate-${education.id}`}>
                            Start Date
                          </Label>
                          <Input
                            id={`startDate-${education.id}`}
                            name="startDate"
                            type="text"
                            value={education.startDate}
                            onChange={(e) =>
                              handleUpdateEducation(education.id, e)
                            }
                            placeholder="Sep 2018"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`endDate-${education.id}`}>
                            End Date
                          </Label>
                          <Input
                            id={`endDate-${education.id}`}
                            name="endDate"
                            type="text"
                            value={education.endDate}
                            onChange={(e) =>
                              handleUpdateEducation(education.id, e)
                            }
                            placeholder="Jun 2022"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor={`description-${education.id}`}>
                        Description
                      </Label>
                      <Textarea
                        id={`description-${education.id}`}
                        name="description"
                        value={education.description}
                        onChange={(e) => handleUpdateEducation(education.id, e)}
                        placeholder="Describe your achievements, coursework, etc."
                        className="h-24 resize-none"
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex h-24 items-center justify-center rounded-md border border-dashed border-muted-foreground/50">
            <p className="text-sm text-muted-foreground">
              No education added yet. Add your educational background.
            </p>
          </div>
        )}

        <Separator />

        <div className="space-y-4">
          <h3 className="text-sm font-medium">Add New Education</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="institution">Institution</Label>
              <Input
                id="institution"
                name="institution"
                value={newEducation.institution}
                onChange={handleNewEducationChange}
                placeholder="University or School Name"
              />
            </div>
            <div>
              <Label htmlFor="degree">Degree</Label>
              <Input
                id="degree"
                name="degree"
                value={newEducation.degree}
                onChange={handleNewEducationChange}
                placeholder="Bachelor's, Master's, etc."
              />
            </div>
            <div>
              <Label htmlFor="fieldOfStudy">Field of Study</Label>
              <Input
                id="fieldOfStudy"
                name="fieldOfStudy"
                value={newEducation.fieldOfStudy}
                onChange={handleNewEducationChange}
                placeholder="Computer Science, Business, etc."
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  name="startDate"
                  type="text"
                  value={newEducation.startDate}
                  onChange={handleNewEducationChange}
                  placeholder="Sep 2018"
                />
              </div>
              <div>
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  name="endDate"
                  type="text"
                  value={newEducation.endDate}
                  onChange={handleNewEducationChange}
                  placeholder="Jun 2022"
                />
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={newEducation.description}
              onChange={handleNewEducationChange}
              placeholder="Describe your achievements, coursework, etc."
              className="h-24 resize-none"
            />
          </div>

          <Button
            onClick={handleAddEducation}
            className="w-full"
            disabled={!newEducation.institution || !newEducation.degree}
          >
            <Plus className="mr-2 h-4 w-4" /> Add Education
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EducationForm;
