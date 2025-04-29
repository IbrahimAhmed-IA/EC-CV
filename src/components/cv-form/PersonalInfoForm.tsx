import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageCropper } from "@/components/ui/image-cropper";
import { useCV } from "@/context/CVContext";
import { getInitials } from "@/lib/utils";
import type React from "react";
import { useState } from "react";
import { CameraIcon } from "lucide-react";

const PersonalInfoForm: React.FC = () => {
  const { cvData, updatePersonalInfo } = useCV();
  const { personalInfo } = cvData;
  const [cropperOpen, setCropperOpen] = useState(false);
  const [tempImageUrl, setTempImageUrl] = useState<string>("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    updatePersonalInfo({ [name]: value });
  };

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Open cropper with the image
        setTempImageUrl(reader.result as string);
        setCropperOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = (croppedImage: string) => {
    updatePersonalInfo({ profilePic: croppedImage });
    setCropperOpen(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Avatar className="h-24 w-24 border">
              <AvatarImage
                src={personalInfo.profilePic}
                alt="Profile picture"
              />
              <AvatarFallback className="text-xl">
                {getInitials(personalInfo.fullName)}
              </AvatarFallback>
            </Avatar>
            <input
              type="file"
              id="profilePic"
              accept="image/*"
              className="hidden"
              onChange={handleProfilePicChange}
            />
            <Button
              variant="outline"
              size="sm"
              className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
              onClick={() => document.getElementById("profilePic")?.click()}
            >
              <CameraIcon className="h-4 w-4" />
            </Button>

            {cropperOpen && tempImageUrl && (
              <ImageCropper
                open={cropperOpen}
                onClose={() => setCropperOpen(false)}
                onCropComplete={handleCropComplete}
                imageUrl={tempImageUrl}
                aspectRatio={1}
              />
            )}
          </div>
          <div className="flex-1 space-y-2">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                value={personalInfo.fullName}
                onChange={handleInputChange}
                placeholder="John Doe"
              />
            </div>
            <div>
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input
                id="jobTitle"
                name="jobTitle"
                value={personalInfo.jobTitle}
                onChange={handleInputChange}
                placeholder="Frontend Developer"
              />
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={personalInfo.email}
              onChange={handleInputChange}
              placeholder="john.doe@example.com"
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              value={personalInfo.phone}
              onChange={handleInputChange}
              placeholder="+1 (555) 123-4567"
            />
          </div>
          <div>
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              name="address"
              value={personalInfo.address}
              onChange={handleInputChange}
              placeholder="New York, NY"
            />
          </div>
          <div>
            <Label htmlFor="website">Website (optional)</Label>
            <Input
              id="website"
              name="website"
              value={personalInfo.website}
              onChange={handleInputChange}
              placeholder="https://yourportfolio.com"
            />
          </div>
          <div>
            <Label htmlFor="linkedin">LinkedIn (optional)</Label>
            <Input
              id="linkedin"
              name="linkedin"
              value={personalInfo.linkedin}
              onChange={handleInputChange}
              placeholder="https://linkedin.com/in/johndoe"
            />
          </div>
          <div>
            <Label htmlFor="github">GitHub (optional)</Label>
            <Input
              id="github"
              name="github"
              value={personalInfo.github}
              onChange={handleInputChange}
              placeholder="https://github.com/johndoe"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="summary">Professional Summary</Label>
          <Textarea
            id="summary"
            name="summary"
            value={personalInfo.summary}
            onChange={handleInputChange}
            placeholder="Write a short summary about yourself and your career goals..."
            className="h-32 resize-none"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalInfoForm;
