import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useCV } from "@/context/CVContext";
import type { WorkExperience } from "@/context/CVContext";
import { Briefcase, ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react";
import type React from "react";
import { useState } from "react";

const WorkExperienceForm: React.FC = () => {
  const {
    cvData,
    addWorkExperience,
    updateWorkExperience,
    removeWorkExperience,
  } = useCV();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [newWorkExperience, setNewWorkExperience] = useState<
    Omit<WorkExperience, "id">
  >({
    company: "",
    position: "",
    startDate: "",
    endDate: "",
    current: false,
    location: "",
    description: "",
  });

  const handleNewWorkExperienceChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setNewWorkExperience((prev) => ({ ...prev, [name]: value }));
  };

  const handleCurrentCheckbox = (checked: boolean, id?: string) => {
    if (id) {
      // Update existing experience
      const experience = cvData.workExperience.find((exp) => exp.id === id);
      if (experience) {
        updateWorkExperience({
          ...experience,
          current: checked,
          endDate: checked ? "Present" : experience.endDate,
        });
      }
    } else {
      // Update new experience form
      setNewWorkExperience((prev) => ({
        ...prev,
        current: checked,
        endDate: checked ? "Present" : prev.endDate,
      }));
    }
  };

  const handleAddWorkExperience = () => {
    addWorkExperience(newWorkExperience);
    setNewWorkExperience({
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      current: false,
      location: "",
      description: "",
    });
  };

  const handleUpdateWorkExperience = (
    id: string,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    const experience = cvData.workExperience.find((exp) => exp.id === id);
    if (experience) {
      updateWorkExperience({ ...experience, [name]: value });
    }
  };

  const toggleExpanded = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Briefcase className="mr-2 h-5 w-5" />
          <span>Work Experience</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {cvData.workExperience.length > 0 ? (
          <div className="space-y-4">
            {cvData.workExperience.map((experience) => (
              <div
                key={experience.id}
                className="rounded-md border border-input bg-background p-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">
                      {experience.position || "Position"} at{" "}
                      {experience.company || "Company"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {experience.startDate} -{" "}
                      {experience.current ? "Present" : experience.endDate}{" "}
                      {experience.location && `| ${experience.location}`}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleExpanded(experience.id)}
                    >
                      {expanded[experience.id] ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeWorkExperience(experience.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>

                {expanded[experience.id] && (
                  <div className="mt-4 space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <Label htmlFor={`company-${experience.id}`}>
                          Company
                        </Label>
                        <Input
                          id={`company-${experience.id}`}
                          name="company"
                          value={experience.company}
                          onChange={(e) =>
                            handleUpdateWorkExperience(experience.id, e)
                          }
                          placeholder="Company Name"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`position-${experience.id}`}>
                          Position
                        </Label>
                        <Input
                          id={`position-${experience.id}`}
                          name="position"
                          value={experience.position}
                          onChange={(e) =>
                            handleUpdateWorkExperience(experience.id, e)
                          }
                          placeholder="Job Title"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`location-${experience.id}`}>
                          Location
                        </Label>
                        <Input
                          id={`location-${experience.id}`}
                          name="location"
                          value={experience.location}
                          onChange={(e) =>
                            handleUpdateWorkExperience(experience.id, e)
                          }
                          placeholder="New York, NY"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label htmlFor={`startDate-${experience.id}`}>
                            Start Date
                          </Label>
                          <Input
                            id={`startDate-${experience.id}`}
                            name="startDate"
                            value={experience.startDate}
                            onChange={(e) =>
                              handleUpdateWorkExperience(experience.id, e)
                            }
                            placeholder="Jan 2020"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`endDate-${experience.id}`}>
                            End Date
                          </Label>
                          <Input
                            id={`endDate-${experience.id}`}
                            name="endDate"
                            value={experience.endDate}
                            onChange={(e) =>
                              handleUpdateWorkExperience(experience.id, e)
                            }
                            placeholder="Dec 2022"
                            disabled={experience.current}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`current-${experience.id}`}
                        checked={experience.current}
                        onCheckedChange={(checked) =>
                          handleCurrentCheckbox(
                            checked as boolean,
                            experience.id,
                          )
                        }
                      />
                      <Label
                        htmlFor={`current-${experience.id}`}
                        className="text-sm cursor-pointer"
                      >
                        I currently work here
                      </Label>
                    </div>

                    <div>
                      <Label htmlFor={`description-${experience.id}`}>
                        Description
                      </Label>
                      <Textarea
                        id={`description-${experience.id}`}
                        name="description"
                        value={experience.description}
                        onChange={(e) =>
                          handleUpdateWorkExperience(experience.id, e)
                        }
                        placeholder="Describe your responsibilities and achievements..."
                        className="h-32 resize-none"
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
              No work experience added yet. Add your professional experience.
            </p>
          </div>
        )}

        <Separator />

        <div className="space-y-4">
          <h3 className="text-sm font-medium">Add New Work Experience</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                name="company"
                value={newWorkExperience.company}
                onChange={handleNewWorkExperienceChange}
                placeholder="Company Name"
              />
            </div>
            <div>
              <Label htmlFor="position">Position</Label>
              <Input
                id="position"
                name="position"
                value={newWorkExperience.position}
                onChange={handleNewWorkExperienceChange}
                placeholder="Job Title"
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                value={newWorkExperience.location}
                onChange={handleNewWorkExperienceChange}
                placeholder="New York, NY"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  name="startDate"
                  value={newWorkExperience.startDate}
                  onChange={handleNewWorkExperienceChange}
                  placeholder="Jan 2020"
                />
              </div>
              <div>
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  name="endDate"
                  value={newWorkExperience.endDate}
                  onChange={handleNewWorkExperienceChange}
                  placeholder="Dec 2022"
                  disabled={newWorkExperience.current}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="current"
              checked={newWorkExperience.current}
              onCheckedChange={(checked) =>
                handleCurrentCheckbox(checked as boolean)
              }
            />
            <Label htmlFor="current" className="text-sm cursor-pointer">
              I currently work here
            </Label>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={newWorkExperience.description}
              onChange={handleNewWorkExperienceChange}
              placeholder="Describe your responsibilities and achievements..."
              className="h-32 resize-none"
            />
          </div>

          <Button
            onClick={handleAddWorkExperience}
            className="w-full"
            disabled={!newWorkExperience.company || !newWorkExperience.position}
          >
            <Plus className="mr-2 h-4 w-4" /> Add Experience
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkExperienceForm;
