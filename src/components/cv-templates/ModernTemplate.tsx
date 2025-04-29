import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { CVData } from "@/context/CVContext";
import { getInitials } from "@/lib/utils";
import {
  Briefcase,
  Calendar,
  Github,
  Globe,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import type React from "react";

interface ModernTemplateProps {
  data: CVData;
}

const ModernTemplate: React.FC<ModernTemplateProps> = ({ data }) => {
  const { personalInfo, education, workExperience, skills } = data;

  return (
    <div className="cv-page flex h-full w-full flex-col bg-white p-5 font-sans text-black">
      {/* Header */}
      <header className="border-b border-gray-200 pb-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h1 className="text-xl font-bold tracking-tight text-gray-900">
              {personalInfo.fullName || "Full Name"}
            </h1>
            <h2 className="text-sm font-medium text-blue-600">
              {personalInfo.jobTitle || "Job Title"}
            </h2>
            <p className="mt-1 max-w-xl text-xs leading-relaxed text-gray-600">
              {personalInfo.summary || "Professional summary goes here..."}
            </p>
          </div>
          {personalInfo.profilePic && (
            <Avatar className="h-16 w-16 rounded-md border border-gray-100 shadow-sm">
              <AvatarImage
                src={personalInfo.profilePic}
                alt={personalInfo.fullName}
              />
              <AvatarFallback className="text-lg">
                {getInitials(personalInfo.fullName)}
              </AvatarFallback>
            </Avatar>
          )}
        </div>

        {/* Contact Info */}
        <div className="mt-3 flex flex-wrap gap-2 text-xs text-gray-600">
          {personalInfo.email && (
            <div className="flex items-center gap-1">
              <Mail className="h-3 w-3 text-blue-600" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-1">
              <Phone className="h-3 w-3 text-blue-600" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.address && (
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3 text-blue-600" />
              <span>{personalInfo.address}</span>
            </div>
          )}
          {personalInfo.website && (
            <div className="flex items-center gap-1">
              <Globe className="h-3 w-3 text-blue-600" />
              <span>{personalInfo.website}</span>
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center gap-1">
              <Linkedin className="h-3 w-3 text-blue-600" />
              <span>{personalInfo.linkedin}</span>
            </div>
          )}
          {personalInfo.github && (
            <div className="flex items-center gap-1">
              <Github className="h-3 w-3 text-blue-600" />
              <span>{personalInfo.github}</span>
            </div>
          )}
        </div>
      </header>

      {/* Content */}
      <div className="mt-4 grid flex-1 grid-cols-3 gap-4">
        {/* Main Content - Experience & Education */}
        <div className="col-span-2 space-y-4">
          {/* Work Experience */}
          {workExperience.length > 0 && (
            <section>
              <h3 className="mb-2 flex items-center text-sm font-semibold text-gray-900">
                <Briefcase className="mr-1 h-3.5 w-3.5 text-blue-600" />
                Work Experience
              </h3>
              <div className="space-y-3">
                {workExperience.map((exp) => (
                  <div key={exp.id} className="space-y-1 border-l border-blue-100 pl-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-medium text-gray-900">{exp.position}</h4>
                      <div className="flex items-center text-xs text-gray-600">
                        <Calendar className="mr-1 h-3 w-3 text-blue-600" />
                        <span>
                          {exp.startDate} -{" "}
                          {exp.current ? "Present" : exp.endDate}
                        </span>
                      </div>
                    </div>
                    <div className="text-xs font-medium text-blue-600">
                      {exp.company} {exp.location && `| ${exp.location}`}
                    </div>
                    <p className="text-xs leading-relaxed text-gray-600">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <section>
              <h3 className="mb-2 flex items-center text-sm font-semibold text-gray-900">
                <GraduationCap className="mr-1 h-3.5 w-3.5 text-blue-600" />
                Education
              </h3>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id} className="space-y-1 border-l border-blue-100 pl-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-medium text-gray-900">
                        {edu.degree}{" "}
                        {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}
                      </h4>
                      <div className="flex items-center text-xs text-gray-600">
                        <Calendar className="mr-1 h-3 w-3 text-blue-600" />
                        <span>
                          {edu.startDate} - {edu.endDate}
                        </span>
                      </div>
                    </div>
                    <div className="text-xs font-medium text-blue-600">
                      {edu.institution}
                    </div>
                    <p className="text-xs leading-relaxed text-gray-600">{edu.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar - Skills */}
        <div className="col-span-1 space-y-4">
          {skills.length > 0 && (
            <section className="rounded-md bg-gray-50 p-3">
              <h3 className="mb-2 text-sm font-semibold text-gray-900">
                Skills
              </h3>
              <div className="space-y-2">
                {skills.map((skill) => (
                  <div key={skill.id} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-gray-900">
                        {skill.name}
                      </span>
                      <span className="text-xs font-medium text-blue-600">
                        {getSkillLevel(skill.level)}
                      </span>
                    </div>
                    <div className="h-1 w-full overflow-hidden rounded-full bg-gray-200">
                      <div
                        className="h-full rounded-full bg-blue-600"
                        style={{ width: `${(skill.level / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

const getSkillLevel = (level: number): string => {
  switch (level) {
    case 1:
      return "Novice";
    case 2:
      return "Beginner";
    case 3:
      return "Intermediate";
    case 4:
      return "Advanced";
    case 5:
      return "Expert";
    default:
      return "";
  }
};

export default ModernTemplate;
