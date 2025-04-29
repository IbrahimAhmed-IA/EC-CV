import type React from "react";
import type { CVData } from "@/context/CVContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Linkedin,
  Github,
  Calendar,
  GraduationCap,
  Briefcase,
} from "lucide-react";

interface ProfessionalTemplateProps {
  data: CVData;
}

const ProfessionalTemplate: React.FC<ProfessionalTemplateProps> = ({ data }) => {
  const { personalInfo, education, workExperience, skills } = data;

  return (
    <div className="cv-page flex h-full w-full flex-col overflow-hidden bg-white font-serif text-slate-800">
      {/* Header with colored background */}
      <header className="bg-slate-800 px-5 py-4 text-white">
        <div className="flex items-center gap-4">
          {personalInfo.profilePic && (
            <Avatar className="h-16 w-16 border-2 border-white/20 shadow-sm">
              <AvatarImage
                src={personalInfo.profilePic}
                alt={personalInfo.fullName}
              />
              <AvatarFallback className="bg-slate-700 text-lg">
                {getInitials(personalInfo.fullName)}
              </AvatarFallback>
            </Avatar>
          )}
          <div className="flex-1">
            <h1 className="text-xl font-bold uppercase tracking-tight">
              {personalInfo.fullName || "Full Name"}
            </h1>
            <h2 className="text-sm font-light text-slate-300">
              {personalInfo.jobTitle || "Job Title"}
            </h2>
            <p className="mt-1 max-w-xl text-xs leading-relaxed text-slate-300">
              {personalInfo.summary || "Professional summary goes here..."}
            </p>
          </div>
        </div>
      </header>

      <div className="flex flex-1 flex-row">
        {/* Left sidebar */}
        <div className="w-1/4 bg-slate-50 p-4">
          <div className="space-y-4">
            {/* Contact Details */}
            <section>
              <h3 className="mb-2 border-b border-slate-300 pb-1 text-sm font-bold text-slate-800">
                Contact Details
              </h3>
              <div className="space-y-2">
                {personalInfo.email && (
                  <div className="flex items-center gap-1.5">
                    <Mail className="h-3 w-3 text-slate-700" />
                    <span className="text-xs">{personalInfo.email}</span>
                  </div>
                )}
                {personalInfo.phone && (
                  <div className="flex items-center gap-1.5">
                    <Phone className="h-3 w-3 text-slate-700" />
                    <span className="text-xs">{personalInfo.phone}</span>
                  </div>
                )}
                {personalInfo.address && (
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-3 w-3 text-slate-700" />
                    <span className="text-xs">{personalInfo.address}</span>
                  </div>
                )}
                {personalInfo.website && (
                  <div className="flex items-center gap-1.5">
                    <Globe className="h-3 w-3 text-slate-700" />
                    <span className="text-xs">{personalInfo.website}</span>
                  </div>
                )}
                {personalInfo.linkedin && (
                  <div className="flex items-center gap-1.5">
                    <Linkedin className="h-3 w-3 text-slate-700" />
                    <span className="text-xs">{personalInfo.linkedin}</span>
                  </div>
                )}
                {personalInfo.github && (
                  <div className="flex items-center gap-1.5">
                    <Github className="h-3 w-3 text-slate-700" />
                    <span className="text-xs">{personalInfo.github}</span>
                  </div>
                )}
              </div>
            </section>

            {/* Skills */}
            {skills.length > 0 && (
              <section>
                <h3 className="mb-2 border-b border-slate-300 pb-1 text-sm font-bold text-slate-800">
                  Skills
                </h3>
                <div className="space-y-2">
                  {skills.map((skill) => (
                    <div key={skill.id} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-slate-800">{skill.name}</span>
                      </div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`h-1 w-5 ${
                              i < skill.level
                                ? "bg-slate-700"
                                : "bg-slate-300"
                            } ${i > 0 ? "ml-0.5" : ""}`}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="w-3/4 p-4">
          {/* Work Experience */}
          {workExperience.length > 0 && (
            <section className="mb-4">
              <h3 className="mb-2 flex items-center border-b border-slate-300 pb-1 text-sm font-bold text-slate-800">
                <Briefcase className="mr-1 h-3.5 w-3.5 text-slate-700" />
                Professional Experience
              </h3>
              <div className="space-y-3">
                {workExperience.map((exp) => (
                  <div key={exp.id} className="relative border-l border-slate-300 pl-3">
                    <div className="absolute -left-1 top-1 h-2 w-2 rounded-full bg-slate-700" />
                    <div className="mb-0.5 flex flex-col justify-between md:flex-row md:items-center">
                      <h4 className="text-xs font-bold text-slate-800">{exp.position}</h4>
                      <div className="flex items-center text-xs text-slate-600">
                        <Calendar className="mr-1 h-3 w-3 text-slate-700" />
                        <span>
                          {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                        </span>
                      </div>
                    </div>
                    <div className="text-xs font-medium text-slate-700">
                      {exp.company} {exp.location && `| ${exp.location}`}
                    </div>
                    <p className="mt-0.5 text-xs leading-normal text-slate-600">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <section>
              <h3 className="mb-2 flex items-center border-b border-slate-300 pb-1 text-sm font-bold text-slate-800">
                <GraduationCap className="mr-1 h-3.5 w-3.5 text-slate-700" />
                Education
              </h3>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id} className="relative border-l border-slate-300 pl-3">
                    <div className="absolute -left-1 top-1 h-2 w-2 rounded-full bg-slate-700" />
                    <div className="mb-0.5 flex flex-col justify-between md:flex-row md:items-center">
                      <h4 className="text-xs font-bold text-slate-800">
                        {edu.degree} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}
                      </h4>
                      <div className="flex items-center text-xs text-slate-600">
                        <Calendar className="mr-1 h-3 w-3 text-slate-700" />
                        <span>
                          {edu.startDate} - {edu.endDate}
                        </span>
                      </div>
                    </div>
                    <div className="text-xs font-medium text-slate-700">
                      {edu.institution}
                    </div>
                    <p className="mt-0.5 text-xs leading-normal text-slate-600">{edu.description}</p>
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

export default ProfessionalTemplate;
