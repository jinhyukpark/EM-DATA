import { useState, useEffect } from "react";

export interface TestItemOption {
  text: string;
  isNormal: boolean;
}

export interface TestItem {
  id: number;
  question: string;
  answerType: "multiple_choice" | "text" | "ox";
  options: TestItemOption[];
}

export interface Template {
  id: number;
  name: string;
  isDefault: boolean;
  items: TestItem[];
}

const defaultTemplates: Template[] = [
  { id: 1, name: "Basic QA Check", isDefault: true, items: [
    { id: 1, question: "Is the service responding correctly?", answerType: "ox", options: [] },
    { id: 2, question: "Are all endpoints accessible?", answerType: "ox", options: [] },
  ]},
  { id: 2, name: "Performance Review", isDefault: false, items: [
    { id: 1, question: "Response time within SLA?", answerType: "ox", options: [] },
    { id: 2, question: "Performance rating:", answerType: "multiple_choice", options: [{ text: "Excellent", isNormal: true }, { text: "Good", isNormal: true }, { text: "Fair", isNormal: false }, { text: "Poor", isNormal: false }] },
    { id: 3, question: "Additional notes:", answerType: "text", options: [] },
  ]},
  { id: 3, name: "Data Validation", isDefault: false, items: [
    { id: 1, question: "Data format is correct?", answerType: "ox", options: [] },
    { id: 2, question: "All required fields present?", answerType: "ox", options: [] },
    { id: 3, question: "Data quality score:", answerType: "multiple_choice", options: [{ text: "100%", isNormal: true }, { text: "90-99%", isNormal: true }, { text: "80-89%", isNormal: false }, { text: "Below 80%", isNormal: false }] },
  ]},
];

export function useTemplates() {
  const [templates, setTemplates] = useState<Template[]>(() => {
    const saved = localStorage.getItem("qa_templates");
    return saved ? JSON.parse(saved) : defaultTemplates;
  });

  useEffect(() => {
    localStorage.setItem("qa_templates", JSON.stringify(templates));
  }, [templates]);

  const addTemplate = (name: string, items: TestItem[]) => {
    const newTemplate = {
      id: Date.now(),
      name,
      isDefault: false,
      items,
    };
    setTemplates([...templates, newTemplate]);
  };

  const updateTemplate = (id: number, updates: Partial<Template>) => {
    setTemplates(templates.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  const deleteTemplate = (id: number) => {
    setTemplates(templates.filter(t => t.id !== id));
  };

  return { templates, addTemplate, updateTemplate, deleteTemplate, setTemplates };
}
