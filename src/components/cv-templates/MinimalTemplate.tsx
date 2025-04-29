import type React from "react";
import type { CVData } from "@/context/CVContext";
import { getInitials } from "@/lib/utils";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Linkedin,
  Github,
  Calendar,
} from "lucide-react";

interface MinimalTemplateProps {
  data: CVData;
}

const MinimalTemplate: React.FC<MinimalTemplateProps> = ({ data }) => {
  const { personalInfo, education, workExperience, skills } = data;

  return (
    <div className="cv-page h-full w-full bg-white p-6 font-sans text-slate-800">
      {/* Header */}
      <header className="mb-4 border-b border-slate-200 pb-4">
        <h1 className="mb-1 text-xl font-bold uppercase tracking-wide text-slate-900">
          {personalInfo.fullName || "Full Name"}
        </h1>
        <h2 className="mb-2 text-sm font-medium text-slate-600">
          {personalInfo.jobTitle || "Job Title"}
        </h2>

        {/* Contact Info */}
        <div className="mt-2 flex flex-wrap gap-4 text-xs text-slate-600">
          {personalInfo.email && (
            <div className="flex items-center gap-1">
              <Mail className="h-3 w-3 text-slate-400" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-1">
              <Phone className="h-3 w-3 text-slate-400" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.address && (
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3 text-slate-400" />
              <span>{personalInfo.address}</span>
            </div>
          )}
          {personalInfo.website && (
            <div className="flex items-center gap-1">
              <Globe className="h-3 w-3 text-slate-400" />
              <span>{personalInfo.website}</span>
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center gap-1">
              <Linkedin className="h-3 w-3 text-slate-400" />
              <span>{personalInfo.linkedin}</span>
            </div>
          )}
          {personalInfo.github && (
            <div className="flex items-center gap-1">
              <Github className="h-3 w-3 text-slate-400" />
              <span>{personalInfo.github}</span>
            </div>
          )}
        </div>
      </header>

      {personalInfo.summary && (
        <div className="mb-4">
          <h3 className="mb-1 text-sm font-semibold uppercase text-slate-700">Profile</h3>
          <p className="text-xs leading-relaxed text-slate-600">
            {personalInfo.summary}
          </p>
        </div>
      )}

      <div className="flex space-x-4">
        {/* Main Column */}
        <div className="w-2/3 space-y-4">
          {/* Work Experience */}
          {workExperience.length > 0 && (
            <section>
              <h3 className="mb-2 text-sm font-semibold uppercase text-slate-700">
                Experience
              </h3>
              <div className="space-y-3">
                {workExperience.map((exp) => (
                  <div key={exp.id} className="space-y-1">
                    <div className="flex items-baseline justify-between">
                      <h4 className="text-xs font-medium text-slate-800">
                        {exp.position}
                      </h4>
                      <div className="flex items-center text-xs text-slate-500">
                        <Calendar className="mr-1 h-2.5 w-2.5 text-slate-400" />
                        <span className="text-[10px]">
                          {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                        </span>
                      </div>
                    </div>
                    <div className="text-xs font-medium text-slate-600">
                      {exp.company} {exp.location && `| ${exp.location}`}
                    </div>
                    <p className="text-xs leading-relaxed text-slate-600">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <section>
              <h3 className="mb-2 text-sm font-semibold uppercase text-slate-700">
                Education
              </h3>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id} className="space-y-1">
                    <div className="flex items-baseline justify-between">
                      <h4 className="text-xs font-medium text-slate-800">
                        {edu.degree} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}
                      </h4>
                      <div className="flex items-center text-xs text-slate-500">
                        <Calendar className="mr-1 h-2.5 w-2.5 text-slate-400" />
                        <span className="text-[10px]">
                          {edu.startDate} - {edu.endDate}
                        </span>
                      </div>
                    </div>
                    <div className="text-xs font-medium text-slate-600">
                      {edu.institution}
                    </div>
                    {edu.description && (
                      <p className="text-xs leading-relaxed text-slate-600">
                        {edu.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Side Column */}
        <div className="w-1/3 space-y-4">
          {/* Skills */}
          {skills.length > 0 && (
            <section>
              <h3 className="mb-2 text-sm font-semibold uppercase text-slate-700">
                Skills
              </h3>
              <div className="space-y-2">
                {skills.map((skill) => (
                  <div key={skill.id} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-800">
                        {skill.name}
                      </span>
                    </div>
                    <div className="h-1 w-full overflow-hidden rounded-full bg-slate-200">
                      <div
                        className="h-full rounded-full bg-slate-500"
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

export default MinimalTemplate;
