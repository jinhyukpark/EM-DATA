import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation, useParams } from "wouter";
import {
  Building2,
  FileText,
  TrendingUp,
  Newspaper,
  LayoutDashboard,
  Database,
  ChevronDown,
  Server,
  Cloud,
  Settings,
  User,
  Users,
  Shield,
  ClipboardCheck,
  Plus,
  Trash2,
  ArrowLeft,
  List,
  MessageSquare,
  CheckSquare,
  GripVertical,
  BookOpen,
  Lightbulb,
  UserCog,
  Calendar,
  Clock,
  Repeat,
  Menu,
  Check,
  X,
  Star,
  Save,
  FileStack,
  MoreVertical,
  Copy,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Sidebar from "@/components/Sidebar";

const services = [
  { id: 1, name: "Company Data Pipeline" },
  { id: 2, name: "Patent Crawler Service" },
  { id: 3, name: "News API Integration" },
  { id: 4, name: "Stock Data Collector" },
  { id: 5, name: "ML Prediction Service" },
];

const inspectors = [
  { id: 1, name: "John Kim", role: "Senior Engineer", avatar: "JK" },
  { id: 2, name: "Sarah Lee", role: "QA Lead", avatar: "SL" },
  { id: 3, name: "Mike Park", role: "DevOps Engineer", avatar: "MP" },
  { id: 4, name: "Emily Choi", role: "Data Engineer", avatar: "EC" },
  { id: 5, name: "David Jung", role: "Backend Developer", avatar: "DJ" },
];

type AnswerType = "multiple_choice" | "text" | "ox";

interface TestItemOption {
  text: string;
  isNormal: boolean;
}

interface TestItem {
  id: number;
  question: string;
  answerType: AnswerType;
  options: TestItemOption[];
}

const weekDays = [
  { id: "mon", label: "Mon" },
  { id: "tue", label: "Tue" },
  { id: "wed", label: "Wed" },
  { id: "thu", label: "Thu" },
  { id: "fri", label: "Fri" },
  { id: "sat", label: "Sat" },
  { id: "sun", label: "Sun" },
];

const existingTests: Record<string, {
  serviceName: string;
  procedureName: string;
  types: string[];
  inspectors: string[];
  startDate: string;
  endDate: string;
  isRepeating: boolean;
  selectedDays: string[];
  timeOption: "anytime" | "specific" | "preset";
  specificTime: string;
  presetTime: string;
  testItems: TestItem[];
}> = {
  "1": {
    serviceName: "Company Data Pipeline",
    procedureName: "Data Integrity Check",
    types: ["Internal", "External"],
    inspectors: ["John Kim", "Sarah Lee"],
    startDate: "2024-12-01",
    endDate: "2025-06-30",
    isRepeating: true,
    selectedDays: ["mon", "wed", "fri"],
    timeOption: "preset",
    specificTime: "",
    presetTime: "10:00",
    testItems: [
      { id: 1, question: "Are all required fields populated correctly?", answerType: "ox", options: [] },
      { id: 2, question: "Is the data format consistent across all records?", answerType: "ox", options: [] },
      { id: 3, question: "What is the data quality score?", answerType: "multiple_choice", options: [{ text: "Excellent (95-100%)", isNormal: true }, { text: "Good (80-94%)", isNormal: true }, { text: "Fair (60-79%)", isNormal: false }, { text: "Poor (<60%)", isNormal: false }] },
      { id: 4, question: "Are there any duplicate records?", answerType: "ox", options: [] },
      { id: 5, question: "Additional notes on data quality:", answerType: "text", options: [] },
    ]
  },
  "2": {
    serviceName: "Patent Crawler Service",
    procedureName: "API Response Validation",
    types: ["Internal"],
    inspectors: ["Sarah Lee"],
    startDate: "2024-11-01",
    endDate: "2025-05-31",
    isRepeating: true,
    selectedDays: ["tue", "thu"],
    timeOption: "anytime",
    specificTime: "",
    presetTime: "",
    testItems: [
      { id: 1, question: "Is the API response time within acceptable limits (<500ms)?", answerType: "ox", options: [] },
      { id: 2, question: "Are all required fields present in the response?", answerType: "ox", options: [] },
      { id: 3, question: "Error handling status:", answerType: "multiple_choice", options: [{ text: "All errors handled", isNormal: true }, { text: "Some errors unhandled", isNormal: false }, { text: "Major issues found", isNormal: false }] },
    ]
  },
  "3": {
    serviceName: "News API Integration",
    procedureName: "Performance Benchmark",
    types: ["External"],
    inspectors: ["Mike Park", "Emily Choi"],
    startDate: "2024-10-15",
    endDate: "2025-04-15",
    isRepeating: true,
    selectedDays: ["mon", "wed", "fri"],
    timeOption: "specific",
    specificTime: "09:30",
    presetTime: "",
    testItems: [
      { id: 1, question: "Average response time meets SLA?", answerType: "ox", options: [] },
      { id: 2, question: "Peak load performance:", answerType: "multiple_choice", options: [{ text: "Excellent", isNormal: true }, { text: "Good", isNormal: true }, { text: "Needs Improvement", isNormal: false }, { text: "Critical", isNormal: false }] },
    ]
  }
};

import { TimePicker } from "@/components/ui/time-picker";

export default function AddTestProcedure() {
  const params = useParams();
  const editId = params.id;
  const isEditMode = !!editId;
  const existingData = editId ? existingTests[editId] : null;
  
  const [, setLocation] = useLocation();
  const [serviceName, setServiceName] = useState(existingData?.serviceName || "");
  const [procedureName, setProcedureName] = useState(existingData?.procedureName || "");
  const [selectedTypes, setSelectedTypes] = useState<string[]>(existingData?.types || []);
  const [typeSearchOpen, setTypeSearchOpen] = useState(false);
  const [typeSearchQuery, setTypeSearchQuery] = useState("");
  
  const [availableTypes, setAvailableTypes] = useState([
    { id: 1, name: "Internal" },
    { id: 2, name: "External" },
    { id: 3, name: "Security" },
    { id: 4, name: "Performance" },
    { id: 5, name: "Data Integrity" },
  ]);

  const toggleType = (typeName: string) => {
    if (selectedTypes.includes(typeName)) {
      setSelectedTypes(selectedTypes.filter(t => t !== typeName));
    } else {
      if (selectedTypes.length < 5) {
        setSelectedTypes([...selectedTypes, typeName]);
      }
    }
  };

  const [assignedInspectors, setAssignedInspectors] = useState<string[]>(existingData?.inspectors || []);
  const [showInspectorDropdown, setShowInspectorDropdown] = useState(false);
  const [testItems, setTestItems] = useState<TestItem[]>(existingData?.testItems || []);
  const [nextId, setNextId] = useState(existingData?.testItems?.length ? existingData.testItems.length + 1 : 1);
  const [startDate, setStartDate] = useState(existingData?.startDate || "");
  const [endDate, setEndDate] = useState(existingData?.endDate || "");
  const [isRepeating, setIsRepeating] = useState(existingData?.isRepeating || false);
  const [selectedDays, setSelectedDays] = useState<string[]>(existingData?.selectedDays || []);
  const [dayInspectors, setDayInspectors] = useState<Record<string, string[]>>({});
  const [activeDayDropdown, setActiveDayDropdown] = useState<string | null>(null);
  const [assignPerDay, setAssignPerDay] = useState(false);
  const [hasSpecificTime, setHasSpecificTime] = useState(existingData?.timeOption !== "anytime");
  const [specificTime, setSpecificTime] = useState(existingData?.specificTime || "");
  const [timeOption, setTimeOption] = useState<"anytime" | "specific" | "preset">(existingData?.timeOption || "anytime");
  const [presetTime, setPresetTime] = useState(existingData?.presetTime || "");
  const [activeTab, setActiveTab] = useState<"basic">("basic");
  const [itemSettingsOpen, setItemSettingsOpen] = useState(false);
  const [typeToDelete, setTypeToDelete] = useState<{name: string, id?: number} | null>(null);
  
  const [serviceSearchOpen, setServiceSearchOpen] = useState(false);
  const [serviceSearchQuery, setServiceSearchQuery] = useState("");

  // Template state
  const [templates, setTemplates] = useState<{id: number; name: string; isDefault: boolean; items: TestItem[]}[]>([
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
  ]);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [newTemplateName, setNewTemplateName] = useState("");
  const [showTemplateDropdown, setShowTemplateDropdown] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState<number | null>(null);
  const [templateModified, setTemplateModified] = useState(false);
  const [templateItems, setTemplateItems] = useState<TestItem[]>([]);
  const [templateNextId, setTemplateNextId] = useState(1);
  const [templateCurrentPage, setTemplateCurrentPage] = useState(1);
  const TEMPLATES_PER_PAGE = 7; // 7 templates + 1 new button = 8 items per page
  
  const [showSaveOptionsModal, setShowSaveOptionsModal] = useState(false);
  const [saveOption, setSaveOption] = useState<"today" | "next" | "custom">("today");
  const [customApplyDate, setCustomApplyDate] = useState("");
  const [templateEditMode, setTemplateEditMode] = useState(false);
  const [editingTemplateId, setEditingTemplateId] = useState<number | null>(null);
  const [showUpdateAlertModal, setShowUpdateAlertModal] = useState(false);

  const startEditTemplate = (e: React.MouseEvent, templateId: number) => {
    e.stopPropagation();
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setNewTemplateName(template.name);
      setTemplateItems(template.items.map(item => ({ ...item })));
      setTemplateNextId(template.items.length ? Math.max(...template.items.map(i => i.id)) + 1 : 1);
      setEditingTemplateId(templateId);
      setTemplateEditMode(true);
    }
  };
  
  // Track original assigned inspectors and days to detect changes
  const [originalInspectors, setOriginalInspectors] = useState<string[]>(existingData?.inspectors || []);
  const [originalDays, setOriginalDays] = useState<string[]>(existingData?.selectedDays || []);
  const [originalDayInspectors, setOriginalDayInspectors] = useState<Record<string, string[]>>({});

  const addTemplateItem = () => {
    setTemplateItems([...templateItems, { id: templateNextId, question: "", answerType: "text", options: [{ text: "", isNormal: true }, { text: "", isNormal: false }, { text: "", isNormal: false }, { text: "", isNormal: false }] }]);
    setTemplateNextId(templateNextId + 1);
  };

  const updateTemplateItem = (id: number, field: string, value: string) => {
    setTemplateItems(templateItems.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const removeTemplateItem = (id: number) => {
    setTemplateItems(templateItems.filter(item => item.id !== id));
  };

  const addTemplateItemOption = (itemId: number) => {
    setTemplateItems(
      templateItems.map((item) => {
        if (item.id === itemId) {
          return { ...item, options: [...item.options, { text: "", isNormal: false }] };
        }
        return item;
      })
    );
  };

  const updateTemplateItemOption = (itemId: number, optionIndex: number, value: string) => {
    setTemplateItems(
      templateItems.map((item) => {
        if (item.id === itemId) {
          const newOptions = [...item.options];
          newOptions[optionIndex] = { ...newOptions[optionIndex], text: value };
          return { ...item, options: newOptions };
        }
        return item;
      })
    );
  };

  const toggleTemplateItemOptionNormal = (itemId: number, optionIndex: number) => {
    setTemplateItems(
      templateItems.map((item) => {
        if (item.id === itemId) {
          const newOptions = [...item.options];
          newOptions[optionIndex] = { 
            ...newOptions[optionIndex], 
            isNormal: !newOptions[optionIndex].isNormal 
          };
          return { ...item, options: newOptions };
        }
        return item;
      })
    );
  };

  const removeTemplateItemOption = (itemId: number, optionIndex: number) => {
    setTemplateItems(
      templateItems.map((item) => {
        if (item.id === itemId && item.options.length > 2) {
          const newOptions = item.options.filter((_, idx) => idx !== optionIndex);
          return { ...item, options: newOptions };
        }
        return item;
      })
    );
  };

  const saveTemplateInternal = () => {
    if (newTemplateName.trim() && templateItems.length > 0) {
      if (editingTemplateId) {
        setTemplates(templates.map(t => 
          t.id === editingTemplateId 
            ? { ...t, name: newTemplateName.trim(), items: templateItems.map(item => ({ ...item })) }
            : t
        ));
      } else {
        const newTemplate = {
          id: templates.length ? Math.max(...templates.map(t => t.id)) + 1 : 1,
          name: newTemplateName.trim(),
          isDefault: false,
          items: templateItems.map(item => ({ ...item })),
        };
        setTemplates([...templates, newTemplate]);
      }
      setNewTemplateName("");
      setTemplateItems([]);
      setTemplateNextId(1);
      setEditingTemplateId(null);
      setTemplateEditMode(false);
    }
  };

  const saveAsTemplate = () => {
    if (newTemplateName.trim()) {
      const newId = templates.length ? Math.max(...templates.map(t => t.id)) + 1 : 1;
      const newTemplate = {
        id: newId,
        name: newTemplateName.trim(),
        isDefault: false,
        items: testItems.map(item => ({ ...item })),
      };
      setTemplates([...templates, newTemplate]);
      setSelectedTemplateId(newId);
      setNewTemplateName("");
      setShowTemplateModal(false);
    }
  };

  const loadTemplate = (templateId: number) => {
    if (testItems.length > 0 && selectedTemplateId !== templateId) {
      if (!window.confirm("기존 항목이 모두 삭제됩니다. 계속하시겠어요?")) return;
    }
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setTestItems(template.items.map((item, idx) => ({ ...item, id: idx + 1 })));
      setNextId(template.items.length + 1);
      setSelectedTemplateId(templateId);
      setTemplateModified(false);
    }
    setShowTemplateDropdown(false);
  };

  const setDefaultTemplate = (templateId: number) => {
    setTemplates(templates.map(t => ({ ...t, isDefault: t.id === templateId })));
  };

  const deleteTemplate = (templateId: number) => {
    if (!window.confirm("템플릿을 삭제하시겠습니까?")) return;
    setTemplates(templates.filter(t => t.id !== templateId));
    if (selectedTemplateId === templateId) {
      setSelectedTemplateId(null);
    }
  };

  const saveToSelectedTemplate = () => {
    // This function is no longer used for automatic saving, but kept for reference if needed.
    // We use saveTemplateInternal for explicit saves.
    if (selectedTemplateId && testItems.length > 0) {
      setTemplates(templates.map(t => 
        t.id === selectedTemplateId 
          ? { ...t, items: testItems.map(item => ({ ...item })) }
          : t
      ));
      setTemplateModified(false);
    }
  };

  const handleDuplicateTemplate = () => {
    if (selectedTemplateId && testItems.length > 0) {
        // 1. Save current changes to the existing template
        const updatedTemplates = templates.map(t => 
            t.id === selectedTemplateId 
                ? { ...t, items: testItems.map(item => ({ ...item })) }
                : t
        );
        
        // 2. Create new duplicate template
        const originalTemplate = updatedTemplates.find(t => t.id === selectedTemplateId);
        if (originalTemplate) {
            const newId = Math.max(...updatedTemplates.map(t => t.id)) + 1;
            const newTemplate = {
                ...originalTemplate,
                id: newId,
                name: `${originalTemplate.name} (Copy)`,
                isDefault: false,
                items: testItems.map(item => ({ ...item }))
            };
            
            setTemplates([...updatedTemplates, newTemplate]);
            setSelectedTemplateId(newId);
            setTemplateModified(false);
        }
    }
  };

  const handleItemSettingsSave = () => {
    // Show save options modal regardless of edit mode to allow applying changes
    // Alternatively, we can check if it's Edit mode to show the modal, but if the user wants it to be shown, we should just show it.
    // Let's modify this to ALWAYS show the modal when Item Settings are saved if there are changes.
    setShowSaveOptionsModal(true);
  };

  const confirmItemSettingsSave = () => {
    // We want to show the 'apply changes' modal if items were changed during edit mode
    // (excluding when just template editing was active, which should be self-contained)
    if (isEditMode && !templateEditMode) {
      setShowSaveOptionsModal(true);
    } else {
      setShowSaveOptionsModal(false);
      setItemSettingsOpen(false);
    }
  };

  const handleSave = () => {
    // Check if inspectors or days changed in edit mode
    const inspectorChanged = JSON.stringify(originalInspectors) !== JSON.stringify(assignedInspectors);
    const daysChanged = JSON.stringify(originalDays) !== JSON.stringify(selectedDays);
    const dayInspectorsChanged = JSON.stringify(originalDayInspectors) !== JSON.stringify(dayInspectors);

    if (isEditMode && (inspectorChanged || daysChanged || dayInspectorsChanged)) {
      setShowUpdateAlertModal(true);
    } else {
      console.log({ serviceName, procedureName, testItems });
      setLocation("/qa-report");
    }
  };

  const confirmProcedureSave = () => {
    setShowUpdateAlertModal(false);
    console.log({ serviceName, procedureName, testItems, saveOption });
    setLocation("/qa-report");
  };

  const toggleDayInspector = (dayId: string, inspectorName: string) => {
    setDayInspectors(prev => {
      const current = prev[dayId] || [];
      if (current.includes(inspectorName)) {
        return { ...prev, [dayId]: current.filter(i => i !== inspectorName) };
      } else {
        return { ...prev, [dayId]: [...current, inspectorName] };
      }
    });
  };

  const presetTimes = [
    { id: "09:00", label: "09:00 AM" },
    { id: "10:00", label: "10:00 AM" },
    { id: "11:00", label: "11:00 AM" },
    { id: "14:00", label: "02:00 PM" },
    { id: "15:00", label: "03:00 PM" },
    { id: "16:00", label: "04:00 PM" },
  ];

  const toggleInspector = (inspectorName: string) => {
    if (assignedInspectors.includes(inspectorName)) {
      setAssignedInspectors(assignedInspectors.filter(i => i !== inspectorName));
    } else {
      setAssignedInspectors([...assignedInspectors, inspectorName]);
    }
  };

  const toggleDay = (dayId: string) => {
    if (selectedDays.includes(dayId)) {
      setSelectedDays(selectedDays.filter(d => d !== dayId));
    } else {
      setSelectedDays([...selectedDays, dayId]);
    }
  };

  const addTestItem = () => {
    setTestItems([
      ...testItems,
      {
        id: nextId,
        question: "",
        answerType: "text",
        options: [{ text: "", isNormal: true }, { text: "", isNormal: false }, { text: "", isNormal: false }, { text: "", isNormal: false }],
      },
    ]);
    setNextId(nextId + 1);
    if (selectedTemplateId) setTemplateModified(true);
  };

  const updateTestItem = (id: number, field: keyof TestItem, value: any) => {
    setTestItems(
      testItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
    if (selectedTemplateId) setTemplateModified(true);
  };

  const updateOption = (itemId: number, optionIndex: number, value: string) => {
    setTestItems(
      testItems.map((item) => {
        if (item.id === itemId) {
          const newOptions = [...item.options];
          newOptions[optionIndex] = { ...newOptions[optionIndex], text: value };
          return { ...item, options: newOptions };
        }
        return item;
      })
    );
    if (selectedTemplateId) setTemplateModified(true);
  };

  const toggleOptionNormal = (itemId: number, optionIndex: number) => {
    setTestItems(
      testItems.map((item) => {
        if (item.id === itemId) {
          const newOptions = [...item.options];
          newOptions[optionIndex] = { 
            ...newOptions[optionIndex], 
            isNormal: !newOptions[optionIndex].isNormal 
          };
          return { ...item, options: newOptions };
        }
        return item;
      })
    );
    if (selectedTemplateId) setTemplateModified(true);
  };

  const removeTestItem = (id: number) => {
    setTestItems(testItems.filter((item) => item.id !== id));
    if (selectedTemplateId) setTemplateModified(true);
  };

  const addOption = (itemId: number) => {
    setTestItems(
      testItems.map((item) => {
        if (item.id === itemId) {
          return { ...item, options: [...item.options, { text: "", isNormal: false }] };
        }
        return item;
      })
    );
    if (selectedTemplateId) setTemplateModified(true);
  };

  const removeOption = (itemId: number, optionIndex: number) => {
    setTestItems(
      testItems.map((item) => {
        if (item.id === itemId && item.options.length > 2) {
          const newOptions = item.options.filter((_, idx) => idx !== optionIndex);
          return { ...item, options: newOptions };
        }
        return item;
      })
    );
    if (selectedTemplateId) setTemplateModified(true);
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex bg-slate-50 overflow-hidden">
      <div className="hidden lg:block flex-shrink-0">
        <Sidebar />
      </div>

      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="relative w-64">
            <Sidebar />
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <header className="bg-white border-b border-slate-200 flex-shrink-0 z-40">
          <div className="px-4 md:px-8 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 -ml-2 text-slate-600 hover:text-slate-900"
              >
                <Menu className="w-5 h-5" />
              </button>
              <Link href={isEditMode ? `/qa-report/test/${editId}` : "/qa-report"} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5 text-slate-600" />
              </Link>
              <div>
                <h1 className="text-xl font-semibold tracking-tight text-slate-800">
                  {isEditMode ? "Edit Test Procedure" : "Add Test Procedure"}
                </h1>
                <p className="text-sm text-slate-500 mt-0.5">
                  {isEditMode ? "Modify the test procedure settings and test items" : "Create a new test procedure with test items"}
                </p>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-8 bg-white overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              {/* Basic Info + Item Settings */}
              <div className="flex items-end justify-between mb-6 gap-4">
                <div>
                  <h2 className="text-base font-semibold tracking-tight text-slate-900" data-testid="title-basic-info">Basic Info</h2>
                  <p className="text-xs text-slate-500 mt-1" data-testid="text-basic-info-hint">Set the procedure details. Configure items in Item Settings.</p>
                </div>

                <button
                  onClick={() => setItemSettingsOpen(true)}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold shadow-sm shadow-blue-600/20 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition"
                  data-testid="button-open-item-settings"
                >
                  <Settings className="w-4 h-4 text-white/90" />
                  Item Settings
                </button>
              </div>

              <div className="space-y-6 mb-8">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Service Name</label>
                    <Popover open={serviceSearchOpen} onOpenChange={setServiceSearchOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={serviceSearchOpen}
                          className="w-full justify-between h-10 px-3 border-slate-200 text-slate-800 font-normal bg-white hover:bg-slate-50"
                          data-testid="select-service-trigger"
                        >
                          {serviceName
                            ? services.find((s) => s.name === serviceName)?.name || serviceName
                            : "Select or enter a service..."}
                          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-2 bg-white shadow-md border-slate-200" align="start">
                         <Input
                            placeholder="Search or add new service..."
                            value={serviceSearchQuery}
                            onChange={(e) => setServiceSearchQuery(e.target.value)}
                            className="mb-2 h-9"
                         />
                         <div className="max-h-[200px] overflow-y-auto space-y-1">
                            {services
                                .filter(s => s.name.toLowerCase().includes(serviceSearchQuery.toLowerCase()))
                                .map(s => (
                                <div key={s.id} className="flex items-center w-full px-2 py-1.5 text-sm rounded-sm hover:bg-slate-100 group">
                                    <button
                                        onClick={() => {
                                            setServiceName(s.name);
                                            setServiceSearchOpen(false);
                                            setServiceSearchQuery("");
                                        }}
                                        className="flex flex-1 items-center text-left"
                                    >
                                        <Check className={`mr-2 h-4 w-4 flex-shrink-0 ${serviceName === s.name ? "opacity-100 text-blue-600" : "opacity-0"}`} />
                                        <span className="truncate">{s.name}</span>
                                    </button>
                                </div>
                            ))}
                            {serviceSearchQuery && !services.some(s => s.name.toLowerCase() === serviceSearchQuery.toLowerCase()) && (
                                <button
                                    onClick={() => {
                                        setServiceName(serviceSearchQuery);
                                        setServiceSearchOpen(false);
                                        setServiceSearchQuery("");
                                    }}
                                    className="flex items-center w-full px-2 py-1.5 text-sm rounded-sm hover:bg-slate-100 text-left text-blue-600"
                                >
                                    <Plus className="mr-2 h-4 w-4" />
                                    Create "{serviceSearchQuery}"
                                </button>
                            )}
                             {!serviceSearchQuery && services.length === 0 && (
                                 <p className="text-sm text-slate-500 p-2">No services found.</p>
                             )}
                         </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Procedure Name</label>
                    <Input
                      value={procedureName}
                      onChange={(e) => setProcedureName(e.target.value)}
                      placeholder="e.g., Data Integrity Check"
                      className="border-slate-200"
                      data-testid="input-procedure-name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Type (Max 5)</label>
                    <Popover open={typeSearchOpen} onOpenChange={setTypeSearchOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={typeSearchOpen}
                          className="w-full justify-between h-auto min-h-10 px-3 py-2 border-slate-200 text-slate-800 font-normal bg-white hover:bg-slate-50"
                          data-testid="select-type-trigger"
                          disabled={selectedTypes.length >= 5}
                        >
                          <div className="flex flex-wrap gap-1.5 items-center">
                            {selectedTypes.length > 0 ? (
                              selectedTypes.map(type => (
                                <span key={type} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 text-xs font-medium border border-blue-100">
                                  {type}
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setTypeToDelete({ name: type });
                                    }}
                                    className="hover:text-blue-900 focus:outline-none"
                                  >
                                    <X className="w-3 h-3" />
                                  </button>
                                </span>
                              ))
                            ) : (
                              <span className="text-slate-500">Select or enter types...</span>
                            )}
                          </div>
                          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-2 bg-white shadow-md border-slate-200" align="start">
                         <Input
                            placeholder="Search or add new type..."
                            value={typeSearchQuery}
                            onChange={(e) => setTypeSearchQuery(e.target.value)}
                            className="mb-2 h-9"
                         />
                         <div className="max-h-[200px] overflow-y-auto space-y-1">
                            {availableTypes
                                .filter(t => t.name.toLowerCase().includes(typeSearchQuery.toLowerCase()))
                                .map(t => (
                                <div key={t.id} className="flex items-center w-full px-2 py-1 text-sm rounded-sm hover:bg-slate-100">
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            toggleType(t.name);
                                            if (selectedTypes.length >= 4 && !selectedTypes.includes(t.name)) {
                                              setTypeSearchOpen(false);
                                            }
                                            setTypeSearchQuery("");
                                        }}
                                        className="flex items-center text-left"
                                    >
                                        <Check className={`mr-2 h-4 w-4 flex-shrink-0 ${selectedTypes.includes(t.name) ? "opacity-100 text-blue-600" : "opacity-0"}`} />
                                        <span className="truncate">{t.name}</span>
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setTypeToDelete({ name: t.name, id: t.id });
                                        }}
                                        className="p-0.5 text-black hover:text-red-600 hover:bg-red-50 rounded transition-all ml-1 flex-shrink-0"
                                        title="Remove type"
                                    >
                                        <X className="h-3.5 w-3.5" />
                                    </button>
                                </div>
                            ))}
                            {typeSearchQuery && !availableTypes.some(t => t.name.toLowerCase() === typeSearchQuery.toLowerCase()) && (
                                <button
                                    onClick={() => {
                                        const newType = { id: Math.max(...availableTypes.map(at => at.id), 0) + 1, name: typeSearchQuery };
                                        setAvailableTypes([...availableTypes, newType]);
                                        toggleType(newType.name);
                                        if (selectedTypes.length >= 4) {
                                          setTypeSearchOpen(false);
                                        }
                                        setTypeSearchQuery("");
                                    }}
                                    className="flex items-center w-full px-2 py-1.5 text-sm rounded-sm hover:bg-slate-100 text-left text-blue-600"
                                >
                                    <Plus className="mr-2 h-4 w-4" />
                                    Create "{typeSearchQuery}"
                                </button>
                            )}
                             {!typeSearchQuery && availableTypes.length === 0 && (
                                 <p className="text-sm text-slate-500 p-2">No types found.</p>
                             )}
                         </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="relative">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Assigned Participant(s)</label>
                    <button
                      onClick={() => setShowInspectorDropdown(!showInspectorDropdown)}
                      className="w-full h-10 px-3 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-left flex items-center justify-between"
                      data-testid="select-inspector"
                    >
                      <span className={assignedInspectors.length > 0 ? "text-slate-800" : "text-slate-400"}>
                        {assignedInspectors.length > 0 
                          ? assignedInspectors.length === 1 
                            ? assignedInspectors[0]
                            : `${assignedInspectors.length} participants selected`
                          : "Select participants..."
                        }
                      </span>
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    </button>
                    {showInspectorDropdown && (
                      <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                        {inspectors.map((i) => (
                          <button
                            key={i.id}
                            onClick={() => toggleInspector(i.name)}
                            className="w-full px-3 py-2 text-left text-sm hover:bg-slate-50 flex items-center gap-3"
                          >
                            <div className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${
                              assignedInspectors.includes(i.name)
                                ? "bg-blue-600 border-blue-600"
                                : "border-slate-300"
                            }`}>
                              {assignedInspectors.includes(i.name) && (
                                <Check className="w-3 h-3 text-white" />
                              )}
                            </div>
                            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xs font-medium text-white flex-shrink-0">
                              {i.avatar}
                            </div>
                            <span className="text-slate-800">{i.name}</span>
                            <span className="text-slate-400 text-xs">- {i.role}</span>
                          </button>
                        ))}
                      </div>
                    )}
                    {assignedInspectors.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {assignedInspectors.map((name) => {
                          const inspector = inspectors.find(i => i.name === name);
                          return (
                            <div key={name} className="flex items-center gap-2 p-1.5 pr-3 bg-slate-50 border border-slate-200 rounded-full">
                              <div
                                className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-[10px] font-medium text-white shadow-sm"
                                title={name}
                              >
                                {inspector?.avatar || name.split(" ").map(n => n[0]).join("")}
                              </div>
                              <span className="text-xs font-medium text-slate-700">{name}</span>
                              <button onClick={() => toggleInspector(name)} className="ml-1 text-slate-400 hover:text-slate-600 focus:outline-none">
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-6 p-5 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <h3 className="text-sm font-semibold text-slate-700">Schedule</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1.5">Start Date</label>
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full h-9 px-3 border border-slate-200 rounded-lg text-sm bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        data-testid="input-start-date"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1.5">End Date</label>
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full h-9 px-3 border border-slate-200 rounded-lg text-sm bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        data-testid="input-end-date"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-2">Repeat on Days</label>
                      <div className="flex gap-2 mb-3">
                        <button
                          onClick={() => {
                            if (selectedDays.length === weekDays.length) {
                              setSelectedDays([]);
                            } else {
                              setSelectedDays(weekDays.map(d => d.id));
                            }
                          }}
                          className={`w-12 h-10 rounded-lg text-xs font-medium transition-all ${
                            selectedDays.length === weekDays.length
                              ? "bg-slate-700 text-white border border-slate-700"
                              : "bg-white border border-slate-200 text-slate-600 hover:border-blue-300"
                          }`}
                        >
                          전체
                        </button>
                        {weekDays.map((day) => (
                            <button
                              key={day.id}
                              onClick={() => toggleDay(day.id)}
                              className={`w-10 h-10 rounded-lg text-xs font-medium transition-all ${
                                selectedDays.includes(day.id)
                                  ? "bg-blue-600 text-white"
                                  : "bg-white border border-slate-200 text-slate-600 hover:border-blue-300"
                              }`}
                              data-testid={`day-${day.id}`}
                            >
                              {day.label}
                            </button>
                          ))}
                        </div>
                        
                        {selectedDays.length > 0 && (
                          <div className="mt-4 space-y-3">
                            <div className="grid gap-2">
                              {selectedDays.map((dayId) => {
                                const day = weekDays.find(d => d.id === dayId);
                                const assignedForDay = dayInspectors[dayId] || [];
                                return (
                                  <div key={dayId} className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-lg">
                                    <span className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs font-medium">
                                      {day?.label}
                                    </span>
                                    <div className="flex-1 relative">
                                      <button
                                        onClick={() => setActiveDayDropdown(activeDayDropdown === dayId ? null : dayId)}
                                        className="w-full min-h-[36px] py-1.5 px-3 border border-slate-200 rounded-lg text-sm bg-white text-left flex items-center justify-between hover:border-blue-300"
                                      >
                                        <div className="flex flex-wrap gap-1 flex-1 pr-2">
                                          {assignedForDay.length > 0 ? (
                                            assignedForDay.map(name => {
                                              const inspector = inspectors.find(i => i.name === name);
                                              return (
                                                <div key={name} className="flex items-center gap-1.5 bg-slate-100 px-2 py-0.5 rounded-md">
                                                  <div className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-[9px] font-medium text-white">
                                                    {inspector?.avatar}
                                                  </div>
                                                  <span className="text-xs text-slate-700">{name}</span>
                                                </div>
                                              );
                                            })
                                          ) : (
                                            <span className="text-slate-400">Select inspectors...</span>
                                          )}
                                        </div>
                                        <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
                                      </button>
                                      {activeDayDropdown === dayId && (
                                        <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-40 overflow-y-auto">
                                          {inspectors.map((i) => (
                                            <button
                                              key={i.id}
                                              onClick={() => toggleDayInspector(dayId, i.name)}
                                              className="w-full px-3 py-2 text-left text-sm hover:bg-slate-50 flex items-center gap-2"
                                            >
                                              <div className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${
                                                assignedForDay.includes(i.name)
                                                  ? "bg-blue-600 border-blue-600"
                                                  : "border-slate-300"
                                              }`}>
                                                {assignedForDay.includes(i.name) && (
                                                  <Check className="w-3 h-3 text-white" />
                                                )}
                                              </div>
                                              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xs font-medium text-white flex-shrink-0">
                                                {i.avatar}
                                              </div>
                                              <span>{i.name}</span>
                                            </button>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-500 mb-2">Inspection Time</label>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <button
                            onClick={() => { setTimeOption("anytime"); setHasSpecificTime(false); }}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                              timeOption === "anytime"
                                ? "border-blue-500 bg-blue-50 text-blue-700"
                                : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                            }`}
                            data-testid="time-anytime"
                          >
                            <span className="text-sm font-medium">Anytime</span>
                          </button>
                          <button
                            onClick={() => { setTimeOption("preset"); setHasSpecificTime(true); }}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                              timeOption === "preset"
                                ? "border-blue-500 bg-blue-50 text-blue-700"
                                : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                            }`}
                            data-testid="time-preset"
                          >
                            <span className="text-sm font-medium">Preset Time</span>
                          </button>
                          <button
                            onClick={() => { setTimeOption("specific"); setHasSpecificTime(true); }}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                              timeOption === "specific"
                                ? "border-blue-500 bg-blue-50 text-blue-700"
                                : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                            }`}
                            data-testid="time-specific"
                          >
                            <Clock className="w-4 h-4" />
                            <span className="text-sm font-medium">Custom Time</span>
                          </button>
                        </div>

                        {timeOption === "preset" && (
                          <div className="flex flex-wrap gap-2">
                            {presetTimes.map((time) => (
                              <button
                                key={time.id}
                                onClick={() => setPresetTime(time.id)}
                                className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                                  presetTime === time.id
                                    ? "bg-blue-600 text-white"
                                    : "bg-white border border-slate-200 text-slate-600 hover:border-blue-300"
                                }`}
                                data-testid={`preset-time-${time.id}`}
                              >
                                {time.label}
                              </button>
                            ))}
                          </div>
                        )}

                        {timeOption === "specific" && (
                          <div data-testid="input-specific-time">
                            <TimePicker
                              value={specificTime}
                              onChange={(value) => setSpecificTime(value)}
                              className="h-9 w-[140px]"
                            />
                          </div>
                        )}
                      </div>
                  </div>
                </div>
              </div>


              {/* Item Settings Modal */}
              {itemSettingsOpen && (
              <div
                className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                onClick={() => setItemSettingsOpen(false)}
                data-testid="modal-item-settings"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.98, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.15 }}
                  className="relative bg-white rounded-2xl w-full max-w-5xl shadow-2xl overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
                    <div>
                      <h2 className="text-lg font-semibold text-slate-900">
                        {templateEditMode ? "Template Settings" : "Item Settings"}
                      </h2>
                      <p className="text-sm text-slate-500 mt-0.5">
                        {templateEditMode ? "Set up your reusable template items" : "Set up test items and templates"}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        if (templateEditMode) {
                          setTemplateEditMode(false);
                        } else {
                          setItemSettingsOpen(false);
                        }
                      }}
                      className="p-2 rounded-lg hover:bg-slate-100 text-slate-600"
                      data-testid="button-close-item-settings"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="p-6 overflow-y-auto max-h-[72vh] pb-24">

                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-white/0" />

                  <div className="absolute inset-x-0 bottom-0 border-t border-slate-200 bg-white/95 backdrop-blur px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      {templateEditMode ? (
                        <>
                          <Button
                            variant="outline"
                            className="border-slate-300 text-slate-700 hover:bg-slate-100"
                            onClick={() => setTemplateEditMode(false)}
                          >
                            Cancel
                          </Button>
                          <Button
                            className="bg-blue-600 hover:bg-blue-700"
                            onClick={saveTemplateInternal}
                            disabled={!newTemplateName.trim()}
                          >
                            Save Template
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            variant="outline"
                            className="border-slate-300 text-slate-700 hover:bg-slate-100"
                            onClick={() => setItemSettingsOpen(false)}
                            data-testid="button-item-settings-cancel"
                          >
                            Cancel
                          </Button>
                          <Button
                            className="bg-blue-600 hover:bg-blue-700"
                            onClick={handleItemSettingsSave}
                            data-testid="button-item-settings-save"
                          >
                            Save
                          </Button>
                        </>
                      )}
                    </div>
                  </div>

                {/* Template Section */}
                {!templateEditMode && (
                <div className="mb-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <FileStack className="w-5 h-5 text-blue-600" />
                      <h3 className="font-medium text-slate-800">Templates</h3>
                    </div>
                    {templates.length > TEMPLATES_PER_PAGE && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setTemplateCurrentPage(Math.max(1, templateCurrentPage - 1))}
                          disabled={templateCurrentPage === 1}
                          className="p-1 rounded-md bg-white border border-slate-200 text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <span className="text-xs text-slate-500 font-medium">
                          {templateCurrentPage} / {Math.ceil(templates.length / TEMPLATES_PER_PAGE)}
                        </span>
                        <button
                          onClick={() => setTemplateCurrentPage(Math.min(Math.ceil(templates.length / TEMPLATES_PER_PAGE), templateCurrentPage + 1))}
                          disabled={templateCurrentPage >= Math.ceil(templates.length / TEMPLATES_PER_PAGE)}
                          className="p-1 rounded-md bg-white border border-slate-200 text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {/* Add New Template Button - Always First on First Page */}
                    {templateCurrentPage === 1 && (
                      <button
                        onClick={() => {
                          setTemplateEditMode(true);
                          setEditingTemplateId(null);
                          setNewTemplateName("");
                          setTemplateItems([]);
                          setTemplateNextId(1);
                        }}
                        className="p-4 bg-white rounded-lg border-2 border-dashed border-slate-300 hover:border-blue-400 hover:bg-blue-50 transition-all flex flex-col items-center justify-center gap-2 min-h-[100px]"
                        data-testid="add-template-btn"
                      >
                        <Plus className="w-6 h-6 text-blue-500" />
                        <span className="text-xs font-medium text-slate-600">New Template</span>
                      </button>
                    )}

                    {/* Template Items */}
                    {templates
                      .slice(
                        templateCurrentPage === 1 ? 0 : (templateCurrentPage - 1) * TEMPLATES_PER_PAGE - 1,
                        templateCurrentPage === 1 ? TEMPLATES_PER_PAGE : templateCurrentPage * TEMPLATES_PER_PAGE - 1
                      )
                      .map((template) => (
                      <div
                        key={template.id}
                        className={`relative p-4 pt-8 bg-white rounded-lg border-2 transition-all cursor-pointer hover:shadow-md group min-h-[100px] ${
                          selectedTemplateId === template.id 
                            ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200" 
                            : template.isDefault 
                              ? "border-blue-300 bg-blue-50/30" 
                              : "border-slate-200 hover:border-blue-300"
                        }`}
                        onClick={() => loadTemplate(template.id)}
                      >
                        {template.isDefault && (
                          <div className="absolute top-2 left-2">
                            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                          </div>
                        )}
                        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 rounded p-0.5">
                          <button
                            onClick={(e) => startEditTemplate(e, template.id)}
                            className="p-1.5 rounded hover:bg-slate-100 text-slate-400 hover:text-blue-500"
                            title="Edit"
                          >
                            <Settings className="w-4 h-4" /> {/* Use Edit icon ideally, fallback to Settings if Edit not imported */}
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); deleteTemplate(template.id); }}
                            className="p-1.5 rounded hover:bg-red-50 text-slate-400 hover:text-red-500"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <FileStack className="w-4 h-4 text-blue-500 flex-shrink-0" />
                          <span className="font-medium text-sm text-slate-800 truncate">{template.name}</span>
                        </div>
                        <p className="text-xs text-slate-500">{template.items.length} test items</p>
                      </div>
                    ))}
                  </div>
                </div>
                )}
                
                {templateEditMode && (
                  <div className="mb-6 bg-slate-50 rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                    <div className="p-4 border-b border-slate-200 bg-white flex items-center gap-3">
                      <button 
                        onClick={() => setTemplateEditMode(false)}
                        className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md transition-colors"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <div>
                        <h3 className="text-sm font-semibold text-slate-800">
                          {editingTemplateId ? 'Edit Template' : 'Create New Template'}
                        </h3>
                      </div>
                    </div>
                    
                    <div className="p-5">
                      <div className="mb-6">
                        <label className="block text-xs font-medium text-slate-600 mb-1.5">Template Name</label>
                        <Input
                          value={newTemplateName}
                          onChange={(e) => setNewTemplateName(e.target.value)}
                          placeholder="e.g., Basic QA Checklist"
                          className="max-w-md bg-white"
                        />
                      </div>
                      
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-semibold text-slate-800">Template Items</h4>
                        <Button 
                          onClick={addTemplateItem} 
                          className="gap-2 bg-blue-600 hover:bg-blue-700"
                          data-testid="add-template-item"
                        >
                          <Plus className="w-4 h-4" />
                          Add Item
                        </Button>
                      </div>
                      
                      {templateItems.length === 0 ? (
                        <div className="text-center py-10 border-2 border-dashed border-slate-200 rounded-lg bg-white/50">
                          <ClipboardCheck className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                          <p className="text-sm font-medium text-slate-500">No items added</p>
                          <p className="text-xs text-slate-400 mt-1 mb-4">Add items to build your template</p>
                          <Button 
                            onClick={addTemplateItem} 
                            variant="outline" 
                            className="h-8 gap-1.5 border-blue-200 text-blue-600 hover:bg-blue-50 text-xs font-medium"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            Add First Item
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {templateItems.map((item, index) => (
                            <motion.div
                              key={item.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="border border-slate-200 rounded-xl p-5 bg-white shadow-sm"
                            >
                              <div className="flex items-start gap-4">
                                <div className="flex items-center gap-2 pt-2">
                                  <GripVertical className="w-4 h-4 text-slate-300" />
                                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-medium">
                                    {index + 1}
                                  </span>
                                </div>
                                <div className="flex-1 space-y-4">
                                  <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Question</label>
                                    <Input
                                      value={item.question}
                                      onChange={(e) => updateTemplateItem(item.id, "question", e.target.value)}
                                      placeholder="Enter your question..."
                                      className="border-slate-200 bg-white"
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Answer Type</label>
                                    <div className="flex items-center gap-3">
                                      <button
                                        onClick={() => updateTemplateItem(item.id, "answerType", "multiple_choice")}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                                          item.answerType === "multiple_choice"
                                            ? "border-blue-500 bg-blue-50 text-blue-700"
                                            : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                                        }`}
                                      >
                                        <List className="w-4 h-4" />
                                        <span className="text-sm font-medium">Multiple Choice</span>
                                      </button>
                                      <button
                                        onClick={() => updateTemplateItem(item.id, "answerType", "text")}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                                          item.answerType === "text"
                                            ? "border-green-500 bg-green-50 text-green-700"
                                            : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                                        }`}
                                      >
                                        <MessageSquare className="w-4 h-4" />
                                        <span className="text-sm font-medium">Text</span>
                                      </button>
                                      <button
                                        onClick={() => updateTemplateItem(item.id, "answerType", "ox")}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                                          item.answerType === "ox"
                                            ? "border-purple-500 bg-purple-50 text-purple-700"
                                            : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                                        }`}
                                      >
                                        <CheckSquare className="w-4 h-4" />
                                        <span className="text-sm font-medium">O/X</span>
                                      </button>
                                    </div>
                                  </div>

                                  {item.answerType === "multiple_choice" && (
                                    <div>
                                      <div className="flex items-center justify-between mb-2">
                                        <label className="block text-sm font-medium text-slate-700">Options</label>
                                        <button
                                          onClick={() => addTemplateItemOption(item.id)}
                                          className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                                        >
                                          <Plus className="w-3 h-3" />
                                          Add Option
                                        </button>
                                      </div>
                                      <div className="grid grid-cols-1 gap-3">
                                        {item.options.map((opt, optIndex) => (
                                          <div key={optIndex} className="flex items-center gap-2">
                                            <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-xs font-medium flex-shrink-0">
                                              {optIndex + 1}
                                            </span>
                                            <div className="flex-1 flex items-center gap-2">
                                              <Input
                                                value={opt.text}
                                                onChange={(e) => updateTemplateItemOption(item.id, optIndex, e.target.value)}
                                                placeholder={`Option ${optIndex + 1}`}
                                                className="border-slate-200 bg-white text-sm flex-1"
                                              />
                                              <div className="flex items-center gap-2 px-2 bg-slate-50 border border-slate-100 rounded h-10">
                                                <label className="flex items-center gap-2 cursor-pointer select-none">
                                                  <input 
                                                    type="checkbox" 
                                                    checked={opt.isNormal}
                                                    onChange={() => toggleTemplateItemOptionNormal(item.id, optIndex)}
                                                    className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                                  />
                                                  <span className={`text-xs font-medium ${opt.isNormal ? 'text-blue-600' : 'text-slate-400'}`}>Normal</span>
                                                </label>
                                              </div>
                                            </div>
                                            {item.options.length > 2 && (
                                              <button
                                                onClick={() => removeTemplateItemOption(item.id, optIndex)}
                                                className="p-1 hover:bg-red-50 rounded transition-colors flex-shrink-0"
                                              >
                                                <Trash2 className="w-3.5 h-3.5 text-red-400" />
                                              </button>
                                            )}
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  {item.answerType === "text" && (
                                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                                      <p className="text-sm text-slate-500 italic">Inspector will enter a text response</p>
                                    </div>
                                  )}

                                  {item.answerType === "ox" && (
                                    <div className="flex items-center gap-6 bg-slate-50 border border-slate-200 rounded-lg p-4">
                                      <div className="flex items-center gap-2">
                                        <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm font-bold">O</span>
                                        <span className="text-sm text-slate-600">Pass / Yes</span>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <span className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-sm font-bold">X</span>
                                        <span className="text-sm text-slate-600">Fail / No</span>
                                      </div>
                                    </div>
                                  )}
                                </div>
                                <button
                                  onClick={() => removeTemplateItem(item.id)}
                                  className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                  <Trash2 className="w-4 h-4 text-red-400" />
                                </button>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Create Template Modal */}
                {showTemplateModal && (
                  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-white rounded-xl w-full max-w-md shadow-xl"
                    >
                      <div className="p-6 border-b border-slate-200">
                        <h3 className="text-lg font-semibold text-slate-800">Create New Template</h3>
                        <p className="text-sm text-slate-500 mt-1">Save current test items as a reusable template</p>
                      </div>
                      
                      <div className="p-6">
                        <label className="block text-sm font-medium text-slate-700 mb-2">Template Name</label>
                        <Input
                          value={newTemplateName}
                          onChange={(e) => setNewTemplateName(e.target.value)}
                          placeholder="e.g., Basic QA Checklist"
                          data-testid="template-name-input"
                        />
                        {testItems.length > 0 && (
                          <p className="text-xs text-slate-500 mt-2">
                            This will save {testItems.length} test item(s) from below as a template.
                          </p>
                        )}
                      </div>
                      
                      <div className="p-4 border-t border-slate-200 flex justify-end gap-2 bg-slate-50 rounded-b-xl">
                        <Button onClick={() => setShowTemplateModal(false)} variant="outline">Cancel</Button>
                        <Button 
                          onClick={saveAsTemplate} 
                          className="bg-blue-600 hover:bg-blue-700" 
                          disabled={!newTemplateName.trim()}
                        >
                          Save Template
                        </Button>
                      </div>
                    </motion.div>
                  </div>
                )}

                {/* When editing a template, hide the main Test Items area completely */}
                {!templateEditMode && (
                  <>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-lg font-semibold text-slate-800">Test Items</h2>
                      <div className="flex gap-2">
                        <Button 
                          onClick={() => setShowTemplateModal(true)} 
                          variant="outline" 
                          className="gap-2 border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-blue-600"
                          disabled={testItems.length === 0}
                          data-testid="save-to-template"
                        >
                          <Save className="w-4 h-4" />
                          Save to Template
                        </Button>
                        <Button onClick={addTestItem} className="gap-2 bg-blue-600 hover:bg-blue-700" data-testid="add-test-item">
                          <Plus className="w-4 h-4" />
                          Add Test Item
                        </Button>
                      </div>
                    </div>

                {testItems.length === 0 ? (
                  <div className="text-center py-16 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
                    <ClipboardCheck className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-600 font-medium mb-1">No test items added yet</p>
                    <p className="text-slate-400 text-sm mb-6">
                      Start building your test procedure by adding test items.
                    </p>
                    <Button onClick={addTestItem} variant="outline" className="gap-2 border-blue-300 text-blue-600 hover:bg-blue-50" data-testid="add-first-item">
                      <Plus className="w-4 h-4" />
                      Add First Test Item
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {testItems.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="border border-slate-200 rounded-xl p-5 bg-slate-50/50"
                        data-testid={`test-item-${item.id}`}
                      >
                        <div className="sr-only" data-testid={`text-item-settings-dirty-${item.id}`}>{item.question}</div>
                        <div className="flex items-start gap-4">
                          <div className="flex items-center gap-2 pt-2">
                            <GripVertical className="w-4 h-4 text-slate-300" />
                            <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-medium">
                              {index + 1}
                            </span>
                          </div>
                          <div className="flex-1 space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-2">Question</label>
                              <Input
                                value={item.question}
                                onChange={(e) => updateTestItem(item.id, "question", e.target.value)}
                                placeholder="Enter your question..."
                                className="border-slate-200 bg-white"
                                data-testid={`question-${item.id}`}
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-2">Answer Type</label>
                              <div className="flex items-center gap-3">
                                <button
                                  onClick={() => updateTestItem(item.id, "answerType", "multiple_choice")}
                                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                                    item.answerType === "multiple_choice"
                                      ? "border-blue-500 bg-blue-50 text-blue-700"
                                      : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                                  }`}
                                  data-testid={`type-multiple-${item.id}`}
                                >
                                  <List className="w-4 h-4" />
                                  <span className="text-sm font-medium">Multiple Choice</span>
                                </button>
                                <button
                                  onClick={() => updateTestItem(item.id, "answerType", "text")}
                                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                                    item.answerType === "text"
                                      ? "border-green-500 bg-green-50 text-green-700"
                                      : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                                  }`}
                                  data-testid={`type-text-${item.id}`}
                                >
                                  <MessageSquare className="w-4 h-4" />
                                  <span className="text-sm font-medium">Text</span>
                                </button>
                                <button
                                  onClick={() => updateTestItem(item.id, "answerType", "ox")}
                                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                                    item.answerType === "ox"
                                      ? "border-purple-500 bg-purple-50 text-purple-700"
                                      : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                                  }`}
                                  data-testid={`type-ox-${item.id}`}
                                >
                                  <CheckSquare className="w-4 h-4" />
                                  <span className="text-sm font-medium">O/X</span>
                                </button>
                              </div>
                            </div>

                            {item.answerType === "multiple_choice" && (
                              <div>
                                <div className="flex items-center justify-between mb-2">
                                  <label className="block text-sm font-medium text-slate-700">Options</label>
                                  <button
                                    onClick={() => addOption(item.id)}
                                    className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                                    data-testid={`add-option-${item.id}`}
                                  >
                                    <Plus className="w-3 h-3" />
                                    Add Option
                                  </button>
                                </div>
                                <div className="grid grid-cols-1 gap-3">
                                  {item.options.map((opt, optIndex) => (
                                    <div key={optIndex} className="flex items-center gap-2">
                                      <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-xs font-medium flex-shrink-0">
                                        {optIndex + 1}
                                      </span>
                                      <div className="flex-1 flex items-center gap-2">
                                        <Input
                                          value={opt.text}
                                          onChange={(e) => updateOption(item.id, optIndex, e.target.value)}
                                          placeholder={`Option ${optIndex + 1}`}
                                          className="border-slate-200 bg-white text-sm flex-1"
                                          data-testid={`option-${item.id}-${optIndex}`}
                                        />
                                        <div className="flex items-center gap-2 px-2 bg-slate-50 border border-slate-100 rounded h-10">
                                            <label className="flex items-center gap-2 cursor-pointer select-none">
                                                <input 
                                                    type="checkbox" 
                                                    checked={opt.isNormal}
                                                    onChange={() => toggleOptionNormal(item.id, optIndex)}
                                                    className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                                />
                                                <span className={`text-xs font-medium ${opt.isNormal ? 'text-blue-600' : 'text-slate-400'}`}>Normal</span>
                                            </label>
                                        </div>
                                      </div>
                                      {item.options.length > 2 && (
                                        <button
                                          onClick={() => removeOption(item.id, optIndex)}
                                          className="p-1 hover:bg-red-50 rounded transition-colors flex-shrink-0"
                                          data-testid={`remove-option-${item.id}-${optIndex}`}
                                        >
                                          <Trash2 className="w-3.5 h-3.5 text-red-400" />
                                        </button>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {item.answerType === "text" && (
                              <div className="bg-white border border-slate-200 rounded-lg p-4">
                                <p className="text-sm text-slate-500 italic">Inspector will enter a text response</p>
                              </div>
                            )}

                            {item.answerType === "ox" && (
                              <div className="flex items-center gap-6 bg-white border border-slate-200 rounded-lg p-4">
                                <div className="flex items-center gap-2">
                                  <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm font-bold">O</span>
                                  <span className="text-sm text-slate-600">Pass / Yes</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-sm font-bold">X</span>
                                  <span className="text-sm text-slate-600">Fail / No</span>
                                </div>
                              </div>
                            )}
                          </div>
                          <button
                            onClick={() => removeTestItem(item.id)}
                            className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                            data-testid={`delete-item-${item.id}`}
                          >
                            <Trash2 className="w-4 h-4 text-red-400" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
                  </>
                )}
                {/* Save Options Modal */}
                {showSaveOptionsModal && (
                  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-white rounded-xl w-full max-w-md shadow-xl"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="p-6 border-b border-slate-200">
                        <h3 className="text-lg font-semibold text-slate-800">Apply Changes</h3>
                        <p className="text-sm text-slate-500 mt-1">When would you like these changes to take effect?</p>
                      </div>
                      
                      <div className="p-6 space-y-3">
                        <label 
                          className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            saveOption === "today" ? "border-blue-500 bg-blue-50" : "border-slate-200 hover:border-blue-300"
                          }`}
                        >
                          <div className="flex h-5 items-center">
                            <input
                              type="radio"
                              name="saveOption"
                              checked={saveOption === "today"}
                              onChange={() => setSaveOption("today")}
                              className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <span className="block text-sm font-medium text-slate-900">Apply from Today</span>
                            <span className="block text-xs text-slate-500 mt-0.5">
                              Changes take effect immediately. <span className="text-amber-600 font-medium">Note: Today's progress will be reset.</span>
                            </span>
                          </div>
                        </label>

                        <label 
                          className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            saveOption === "next" ? "border-blue-500 bg-blue-50" : "border-slate-200 hover:border-blue-300"
                          }`}
                        >
                          <div className="flex h-5 items-center">
                            <input
                              type="radio"
                              name="saveOption"
                              checked={saveOption === "next"}
                              onChange={() => setSaveOption("next")}
                              className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <span className="block text-sm font-medium text-slate-900">Apply from Next Cycle</span>
                            <span className="block text-xs text-slate-500 mt-0.5">
                              Changes will take effect from the next scheduled day. Today's progress remains intact.
                            </span>
                          </div>
                        </label>

                        <label 
                          className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            saveOption === "custom" ? "border-blue-500 bg-blue-50" : "border-slate-200 hover:border-blue-300"
                          }`}
                        >
                          <div className="flex h-5 items-center">
                            <input
                              type="radio"
                              name="saveOption"
                              checked={saveOption === "custom"}
                              onChange={() => setSaveOption("custom")}
                              className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                            />
                          </div>
                          <div className="w-full">
                            <span className="block text-sm font-medium text-slate-900">Select Specific Date</span>
                            <span className="block text-xs text-slate-500 mt-0.5 mb-2">
                              Choose a specific date from when these changes should apply.
                            </span>
                            {saveOption === "custom" && (
                              <div className="mt-2 w-full max-w-[200px]" onClick={(e) => e.stopPropagation()}>
                                <Input
                                  type="date"
                                  value={customApplyDate}
                                  onChange={(e) => setCustomApplyDate(e.target.value)}
                                  className="h-9 text-sm"
                                  min={new Date().toISOString().split('T')[0]}
                                />
                              </div>
                            )}
                          </div>
                        </label>
                      </div>
                      
                      <div className="p-4 border-t border-slate-200 flex justify-end gap-2 bg-slate-50 rounded-b-xl">
                        <Button 
                          variant="outline" 
                          className="border-slate-300 text-slate-700 hover:bg-slate-100" 
                          onClick={() => setShowSaveOptionsModal(false)}
                        >
                          Cancel
                        </Button>
                        <Button 
                          onClick={confirmItemSettingsSave} 
                          className="bg-blue-600 hover:bg-blue-700 px-6" 
                        >
                          Apply Changes
                        </Button>
                      </div>
                    </motion.div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}

              <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-slate-200">
                <Link href="/qa-report">
                  <Button variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-100">Cancel</Button>
                </Link>
                <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 px-8" data-testid="save-procedure">
                  {isEditMode ? "Update Procedure" : "Save Procedure"}
                </Button>
              </div>

              {/* Inspector/Days Update Alert Modal */}
              {showUpdateAlertModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-2xl w-full max-w-md shadow-xl overflow-hidden"
                  >
                    <div className="bg-amber-50 p-6 flex flex-col items-center text-center border-b border-amber-100">
                      <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                        <AlertCircle className="w-6 h-6 text-amber-600" />
                      </div>
                      <h3 className="text-lg font-bold text-amber-900 mb-1">Schedule Changes Detected</h3>
                      <p className="text-sm text-amber-700/80">
                        You have modified the inspection days or assigned inspectors.
                      </p>
                    </div>
                    
                    <div className="p-6">
                      <p className="text-sm text-slate-600 mb-4">
                        Please select when these changes should take effect:
                      </p>
                      
                      <div className="p-6 space-y-3">
                        <label 
                          className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            saveOption === "today" ? "border-amber-500 bg-amber-50/50" : "border-slate-200 hover:border-amber-300"
                          }`}
                        >
                          <div className="flex h-5 items-center">
                            <input
                              type="radio"
                              name="alertSaveOption"
                              checked={saveOption === "today"}
                              onChange={() => setSaveOption("today")}
                              className="w-4 h-4 text-amber-600 focus:ring-amber-500"
                            />
                          </div>
                          <div>
                            <span className="block text-sm font-medium text-slate-900">Apply from Today</span>
                            <span className="block text-xs text-amber-600 font-medium mt-1">
                              Warning: This will reset all current progress for today.
                            </span>
                          </div>
                        </label>

                        <label 
                          className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            saveOption === "next" ? "border-amber-500 bg-amber-50/50" : "border-slate-200 hover:border-amber-300"
                          }`}
                        >
                          <div className="flex h-5 items-center">
                            <input
                              type="radio"
                              name="alertSaveOption"
                              checked={saveOption === "next"}
                              onChange={() => setSaveOption("next")}
                              className="w-4 h-4 text-amber-600 focus:ring-amber-500"
                            />
                          </div>
                          <div>
                            <span className="block text-sm font-medium text-slate-900">Apply from Next Cycle</span>
                            <span className="block text-xs text-slate-500 mt-0.5">
                              Changes will apply to future dates. Today's progress remains intact.
                            </span>
                          </div>
                        </label>

                        <label 
                          className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            saveOption === "custom" ? "border-amber-500 bg-amber-50/50" : "border-slate-200 hover:border-amber-300"
                          }`}
                        >
                          <div className="flex h-5 items-center">
                            <input
                              type="radio"
                              name="alertSaveOption"
                              checked={saveOption === "custom"}
                              onChange={() => setSaveOption("custom")}
                              className="w-4 h-4 text-amber-600 focus:ring-amber-500"
                            />
                          </div>
                          <div className="w-full">
                            <span className="block text-sm font-medium text-slate-900">Select Specific Date</span>
                            <span className="block text-xs text-slate-500 mt-0.5 mb-2">
                              Choose a specific date from when these changes should apply.
                            </span>
                            {saveOption === "custom" && (
                              <div className="mt-2 w-full max-w-[200px]" onClick={(e) => e.stopPropagation()}>
                                <Input
                                  type="date"
                                  value={customApplyDate}
                                  onChange={(e) => setCustomApplyDate(e.target.value)}
                                  className="h-9 text-sm"
                                  min={new Date().toISOString().split('T')[0]}
                                />
                              </div>
                            )}
                          </div>
                        </label>
                      </div>
                    </div>
                    
                    <div className="p-4 border-t border-slate-100 flex justify-end gap-2 bg-slate-50">
                      <Button 
                        variant="outline" 
                        className="border-slate-300 text-slate-700 hover:bg-slate-100" 
                        onClick={() => setShowUpdateAlertModal(false)}
                      >
                        Cancel
                      </Button>
                      <Button 
                        onClick={confirmProcedureSave} 
                        className="bg-amber-500 hover:bg-amber-600 text-white px-6" 
                      >
                        Confirm Changes
                      </Button>
                    </div>
                  </motion.div>
                </div>
              )}

              {/* Type Delete Confirmation Modal */}
              {typeToDelete && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4" onClick={() => setTypeToDelete(null)}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-2xl w-full max-w-sm shadow-xl p-6"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <p className="text-slate-800 mb-8 mt-2 text-[15px]">이 타입을 삭제하시겠습니까?</p>
                    <div className="flex justify-end gap-2">
                      <Button
                        className="bg-[#334155] hover:bg-[#1e293b] text-white px-6 rounded-full"
                        onClick={() => {
                          if (typeToDelete.id !== undefined) {
                            setAvailableTypes(availableTypes.filter(type => type.id !== typeToDelete.id));
                            if (selectedTypes.includes(typeToDelete.name)) {
                              setSelectedTypes(selectedTypes.filter(st => st !== typeToDelete.name));
                            }
                          } else {
                            toggleType(typeToDelete.name);
                          }
                          setTypeToDelete(null);
                        }}
                      >
                        확인
                      </Button>
                      <Button
                        variant="ghost"
                        className="bg-[#e2e8f0] text-[#334155] hover:bg-[#cbd5e1] hover:text-[#334155] px-6 rounded-full"
                        onClick={() => setTypeToDelete(null)}
                      >
                        취소
                      </Button>
                    </div>
                  </motion.div>
                </div>
              )}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
