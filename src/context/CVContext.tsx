import type React from "react";
import { type ReactNode, createContext, useContext, useState } from "react";

// Define types for CV data
export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  address: string;
  website?: string;
  linkedin?: string;
  github?: string;
  summary: string;
  profilePic?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  location: string;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number; // 1-5
}

export interface CVData {
  personalInfo: PersonalInfo;
  education: Education[];
  workExperience: WorkExperience[];
  skills: Skill[];
  template: string;
}

// Default data
const defaultCVData: CVData = {
  personalInfo: {
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    address: "",
    website: "",
    linkedin: "",
    github: "",
    summary: "",
    profilePic: "",
  },
  education: [],
  workExperience: [],
  skills: [],
  template: "modern",
};

// Create context
interface CVContextType {
  cvData: CVData;
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
  addEducation: (edu: Omit<Education, "id">) => void;
  updateEducation: (edu: Education) => void;
  removeEducation: (id: string) => void;
  addWorkExperience: (exp: Omit<WorkExperience, "id">) => void;
  updateWorkExperience: (exp: WorkExperience) => void;
  removeWorkExperience: (id: string) => void;
  addSkill: (skill: Omit<Skill, "id">) => void;
  updateSkill: (skill: Skill) => void;
  removeSkill: (id: string) => void;
  setTemplate: (template: string) => void;
  resetCV: () => void;
}

const CVContext = createContext<CVContextType | undefined>(undefined);

// Generate a simple ID
const generateId = () => Math.random().toString(36).substring(2, 9);

// Provider component
export const CVProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cvData, setCVData] = useState<CVData>(defaultCVData);

  const updatePersonalInfo = (info: Partial<PersonalInfo>) => {
    setCVData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...info },
    }));
  };

  const addEducation = (edu: Omit<Education, "id">) => {
    const newEdu = { ...edu, id: generateId() };
    setCVData((prev) => ({
      ...prev,
      education: [...prev.education, newEdu],
    }));
  };

  const updateEducation = (edu: Education) => {
    setCVData((prev) => ({
      ...prev,
      education: prev.education.map((e) => (e.id === edu.id ? edu : e)),
    }));
  };

  const removeEducation = (id: string) => {
    setCVData((prev) => ({
      ...prev,
      education: prev.education.filter((e) => e.id !== id),
    }));
  };

  const addWorkExperience = (exp: Omit<WorkExperience, "id">) => {
    const newExp = { ...exp, id: generateId() };
    setCVData((prev) => ({
      ...prev,
      workExperience: [...prev.workExperience, newExp],
    }));
  };

  const updateWorkExperience = (exp: WorkExperience) => {
    setCVData((prev) => ({
      ...prev,
      workExperience: prev.workExperience.map((e) =>
        e.id === exp.id ? exp : e,
      ),
    }));
  };

  const removeWorkExperience = (id: string) => {
    setCVData((prev) => ({
      ...prev,
      workExperience: prev.workExperience.filter((e) => e.id !== id),
    }));
  };

  const addSkill = (skill: Omit<Skill, "id">) => {
    const newSkill = { ...skill, id: generateId() };
    setCVData((prev) => ({
      ...prev,
      skills: [...prev.skills, newSkill],
    }));
  };

  const updateSkill = (skill: Skill) => {
    setCVData((prev) => ({
      ...prev,
      skills: prev.skills.map((s) => (s.id === skill.id ? skill : s)),
    }));
  };

  const removeSkill = (id: string) => {
    setCVData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s.id !== id),
    }));
  };

  const setTemplate = (template: string) => {
    setCVData((prev) => ({ ...prev, template }));
  };

  const resetCV = () => {
    setCVData(defaultCVData);
  };

  const value = {
    cvData,
    updatePersonalInfo,
    addEducation,
    updateEducation,
    removeEducation,
    addWorkExperience,
    updateWorkExperience,
    removeWorkExperience,
    addSkill,
    updateSkill,
    removeSkill,
    setTemplate,
    resetCV,
  };

  return <CVContext.Provider value={value}>{children}</CVContext.Provider>;
};

// Custom hook
export const useCV = () => {
  const context = useContext(CVContext);
  if (context === undefined) {
    throw new Error("useCV must be used within a CVProvider");
  }
  return context;
};
