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
  Star
} from "lucide-react";

interface CreativeTemplateProps {
  data: CVData;
}

const CreativeTemplate: React.FC<CreativeTemplateProps> = ({ data }) => {
  const { personalInfo, education, workExperience, skills } = data;

  return (
    <div className="cv-page bg-white font-sans text-neutral-800">
      {/* Diagonal design header */}
      <div className="relative bg-gradient-to-r from-purple-600 to-blue-500 p-8 text-white">
        <div className="relative z-10">
          <div className="flex flex-col items-center md:flex-row md:items-start md:justify-between">
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold tracking-tight">
                {personalInfo.fullName || "Full Name"}
              </h1>
              <h2 className="mt-2 text-xl font-light opacity-90">
                {personalInfo.jobTitle || "Job Title"}
              </h2>
              <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed opacity-80 md:mx-0">
                {personalInfo.summary || "Professional summary goes here..."}
              </p>
            </div>
            {personalInfo.profilePic && (
              <Avatar className="mt-6 h-32 w-32 border-4 border-white/30 md:mt-0">
                <AvatarImage
                  src={personalInfo.profilePic}
                  alt={personalInfo.fullName}
                />
                <AvatarFallback className="bg-purple-700 text-2xl">
                  {getInitials(personalInfo.fullName)}
                </AvatarFallback>
              </Avatar>
            )}
          </div>

          {/* Contact Details */}
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm md:justify-start">
            {personalInfo.email && (
              <div className="flex items-center gap-1">
                <Mail className="h-4 w-4 opacity-80" />
                <span>{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-1">
                <Phone className="h-4 w-4 opacity-80" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.address && (
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4 opacity-80" />
                <span>{personalInfo.address}</span>
              </div>
            )}
            {personalInfo.website && (
              <div className="flex items-center gap-1">
                <Globe className="h-4 w-4 opacity-80" />
                <span>{personalInfo.website}</span>
              </div>
            )}
            {personalInfo.linkedin && (
              <div className="flex items-center gap-1">
                <Linkedin className="h-4 w-4 opacity-80" />
                <span>{personalInfo.linkedin}</span>
              </div>
            )}
            {personalInfo.github && (
              <div className="flex items-center gap-1">
                <Github className="h-4 w-4 opacity-80" />
                <span>{personalInfo.github}</span>
              </div>
            )}
          </div>
        </div>

        {/* Diagonal design element */}
        <div className="absolute bottom-0 left-0 right-0 h-8 translate-y-1/2 bg-white"
          style={{clipPath: "polygon(0 100%, 100% 0, 100% 100%, 0 100%)"}} />
      </div>

      <div className="p-8 pt-12">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Left Column */}
          <div>
            {/* Work Experience */}
            {workExperience.length > 0 && (
              <section className="mb-8">
                <h3 className="mb-6 flex items-center text-xl font-bold text-purple-600">
                  <Briefcase className="mr-2 h-6 w-6" />
                  Work Experience
                </h3>
                <div className="space-y-6">
                  {workExperience.map((exp) => (
                    <div
                      key={exp.id}
                      className="rounded-lg border-l-4 border-purple-500 bg-white p-4 shadow-sm transition-all hover:shadow-md"
                    >
                      <div className="mb-2 flex flex-col justify-between md:flex-row md:items-center">
                        <h4 className="font-bold text-neutral-800">{exp.position}</h4>
                        <div className="mt-1 flex items-center text-sm text-neutral-500 md:mt-0">
                          <Calendar className="mr-1 h-3 w-3" />
                          <span>
                            {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                          </span>
                        </div>
                      </div>
                      <div className="text-sm font-medium text-purple-600">
                        {exp.company} {exp.location && `| ${exp.location}`}
                      </div>
                      <p className="mt-2 text-sm text-neutral-600">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Skills */}
            {skills.length > 0 && (
              <section>
                <h3 className="mb-6 flex items-center text-xl font-bold text-purple-600">
                  <Star className="mr-2 h-6 w-6" />
                  Skills
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {skills.map((skill) => (
                    <div
                      key={skill.id}
                      className="rounded-lg bg-white p-4 shadow-sm transition-all hover:shadow-md"
                    >
                      <div className="mb-2 font-medium">{skill.name}</div>
                      <div className="flex items-center">
                        {Array.from({ length: 5 }, (_, idx) => (
                          <div
                            key={`${skill.id}-${idx}`}
                            className={`mr-1 h-1.5 rounded-full ${
                              idx < skill.level ? "bg-purple-500" : "bg-gray-200"
                            }`}
                            style={{ width: "15%" }}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column */}
          <div>
            {/* Education */}
            {education.length > 0 && (
              <section>
                <h3 className="mb-6 flex items-center text-xl font-bold text-purple-600">
                  <GraduationCap className="mr-2 h-6 w-6" />
                  Education
                </h3>
                <div className="space-y-6">
                  {education.map((edu) => (
                    <div
                      key={edu.id}
                      className="rounded-lg border-l-4 border-blue-500 bg-white p-4 shadow-sm transition-all hover:shadow-md"
                    >
                      <div className="mb-2 flex flex-col justify-between md:flex-row md:items-center">
                        <h4 className="font-bold text-neutral-800">
                          {edu.degree} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}
                        </h4>
                        <div className="mt-1 flex items-center text-sm text-neutral-500 md:mt-0">
                          <Calendar className="mr-1 h-3 w-3" />
                          <span>
                            {edu.startDate} - {edu.endDate}
                          </span>
                        </div>
                      </div>
                      <div className="text-sm font-medium text-blue-600">
                        {edu.institution}
                      </div>
                      <p className="mt-2 text-sm text-neutral-600">{edu.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreativeTemplate;
