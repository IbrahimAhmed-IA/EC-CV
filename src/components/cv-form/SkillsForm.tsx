import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useCV } from "@/context/CVContext";
import type { Skill } from "@/context/CVContext";
import { Code, Plus, Trash2 } from "lucide-react";
import type React from "react";
import { useState } from "react";

const SkillsForm: React.FC = () => {
  const { cvData, addSkill, updateSkill, removeSkill } = useCV();
  const [newSkill, setNewSkill] = useState<Omit<Skill, "id">>({
    name: "",
    level: 3,
  });

  const handleNewSkillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewSkill((prev) => ({ ...prev, [name]: value }));
  };

  const handleNewSkillLevelChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setNewSkill((prev) => ({
      ...prev,
      level: Number.parseInt(e.target.value),
    }));
  };

  const handleSkillLevelChange = (
    id: string,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const skill = cvData.skills.find((s) => s.id === id);
    if (skill) {
      updateSkill({ ...skill, level: Number.parseInt(e.target.value) });
    }
  };

  const handleAddSkill = () => {
    if (newSkill.name.trim()) {
      addSkill(newSkill);
      setNewSkill({ name: "", level: 3 });
    }
  };

  const handleSkillNameChange = (
    id: string,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const skill = cvData.skills.find((s) => s.id === id);
    if (skill) {
      updateSkill({ ...skill, name: e.target.value });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Code className="mr-2 h-5 w-5" />
          <span>Skills</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {cvData.skills.length > 0 ? (
          <div className="space-y-4">
            {cvData.skills.map((skill) => (
              <div
                key={skill.id}
                className="flex items-center justify-between space-x-4 rounded-md border border-input bg-background p-3"
              >
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <Input
                      value={skill.name}
                      onChange={(e) => handleSkillNameChange(skill.id, e)}
                      className="h-8 w-full"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-2"
                      onClick={() => removeSkill(skill.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Label htmlFor={`level-${skill.id}`} className="text-xs">
                      Proficiency:
                    </Label>
                    <input
                      type="range"
                      id={`level-${skill.id}`}
                      min="1"
                      max="5"
                      value={skill.level}
                      onChange={(e) => handleSkillLevelChange(skill.id, e)}
                      className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
                    />
                    <span className="w-5 text-xs">{skill.level}/5</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex h-24 items-center justify-center rounded-md border border-dashed border-muted-foreground/50">
            <p className="text-sm text-muted-foreground">
              No skills added yet. Add your skills and proficiency levels.
            </p>
          </div>
        )}

        <Separator />

        <div className="space-y-4">
          <h3 className="text-sm font-medium">Add New Skill</h3>
          <div className="flex items-center space-x-2">
            <div className="flex-1 space-y-2">
              <div>
                <Label htmlFor="skillName">Skill Name</Label>
                <Input
                  id="skillName"
                  name="name"
                  value={newSkill.name}
                  onChange={handleNewSkillChange}
                  placeholder="e.g., JavaScript, Project Management, etc."
                />
              </div>
              <div className="flex items-center space-x-2">
                <Label htmlFor="skillLevel" className="text-xs">
                  Proficiency:
                </Label>
                <input
                  type="range"
                  id="skillLevel"
                  min="1"
                  max="5"
                  value={newSkill.level}
                  onChange={handleNewSkillLevelChange}
                  className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
                />
                <span className="w-5 text-xs">{newSkill.level}/5</span>
              </div>
            </div>
            <Button
              onClick={handleAddSkill}
              className="mt-6"
              disabled={!newSkill.name.trim()}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="mt-4 text-xs text-muted-foreground">
          <p>
            Proficiency Level: 1 = Novice, 2 = Beginner, 3 = Intermediate, 4 =
            Advanced, 5 = Expert
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillsForm;
