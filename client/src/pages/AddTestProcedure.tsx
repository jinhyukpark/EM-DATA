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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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

const menuItems = [
  { id: "dashboard", name: "Dashboard", icon: LayoutDashboard, path: "/" },
  { id: "qa-report", name: "QA Report", icon: ClipboardCheck, path: "/qa-report" },
];

const dataMenuItems = [
  { id: "company-data", name: "Company Data", icon: Building2, path: "/data/company", status: "normal" },
  { id: "patent-data", name: "Patent Data", icon: FileText, path: "/data/patent", status: "normal" },
  { id: "paper-data", name: "Paper Data", icon: BookOpen, path: "/data/paper", status: "stopped" },
  { id: "stock-data", name: "Stock Data", icon: TrendingUp, path: "/data/stock", status: "normal" },
  { id: "news-data", name: "News Data", icon: Newspaper, path: "/data/news", status: "error" },
  { id: "rnd-data", name: "R&D Data", icon: Lightbulb, path: "/data/rnd", status: "normal" },
  { id: "employment-data", name: "Employment Data", icon: UserCog, path: "/data/employment", status: "stopped" },
];

const serverMenuItems = [
  { id: "aws", name: "AWS", icon: Cloud, path: "/servers/aws", color: "text-orange-400" },
  { id: "gcp", name: "GCP", icon: Cloud, path: "/servers/gcp", color: "text-blue-400" },
  { id: "ncloud", name: "NCloud", icon: Cloud, path: "/servers/ncloud", color: "text-green-400" },
];

const settingsMenuItems = [
  { id: "profile", name: "Profile", icon: User, path: "/settings/profile" },
  { id: "users", name: "User Management", icon: Users, path: "/settings/users" },
  { id: "permissions", name: "Permission Management", icon: Shield, path: "/settings/permissions" },
];

type AnswerType = "multiple_choice" | "text" | "ox";

interface TestItem {
  id: number;
  question: string;
  answerType: AnswerType;
  options: string[];
}

function Sidebar() {
  const [location] = useLocation();
  const [dataMenuOpen, setDataMenuOpen] = useState(false);
  const [serverMenuOpen, setServerMenuOpen] = useState(false);
  const [settingsMenuOpen, setSettingsMenuOpen] = useState(false);

  return (
    <aside className="w-64 bg-slate-900 min-h-screen flex flex-col" data-testid="sidebar">
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-xl font-bold text-white tracking-tight">EM-Data</h1>
        <p className="text-xs text-slate-400 mt-1">Internal Monitoring</p>
      </div>

      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.path || (item.path === "/qa-report" && location.startsWith("/qa"));
            return (
              <li key={item.id}>
                <Link href={item.path} className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white"}`}>
                  <Icon className="w-5 h-5" strokeWidth={1.5} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-6">
          <button onClick={() => setDataMenuOpen(!dataMenuOpen)} className="flex items-center justify-between w-full px-4 py-3 text-slate-400 hover:text-white transition-colors">
            <div className="flex items-center gap-3">
              <Database className="w-5 h-5" strokeWidth={1.5} />
              <span className="font-medium text-sm">Internal Data</span>
            </div>
            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${dataMenuOpen ? "rotate-180" : ""}`} />
          </button>
          <motion.ul initial={false} animate={{ height: dataMenuOpen ? "auto" : 0, opacity: dataMenuOpen ? 1 : 0 }} transition={{ duration: 0.2 }} className="overflow-hidden ml-4 space-y-1">
            {dataMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location === item.path;
              const statusColor = item.status === "normal" ? "bg-blue-500" : item.status === "error" ? "bg-red-500" : "bg-slate-500";
              return (
                <li key={item.id}>
                  <Link href={item.path} className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-all duration-200">
                    <span className={`w-2 h-2 rounded-full ${statusColor} ${item.status === "error" ? "animate-pulse" : ""}`} />
                    <Icon className="w-4 h-4" strokeWidth={1.5} />
                    <span className="text-sm">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </motion.ul>
        </div>

        <div className="mt-2">
          <button onClick={() => setServerMenuOpen(!serverMenuOpen)} className="flex items-center justify-between w-full px-4 py-3 text-slate-400 hover:text-white transition-colors">
            <div className="flex items-center gap-3">
              <Server className="w-5 h-5" strokeWidth={1.5} />
              <span className="font-medium text-sm">Server Management</span>
            </div>
            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${serverMenuOpen ? "rotate-180" : ""}`} />
          </button>
          <motion.ul initial={false} animate={{ height: serverMenuOpen ? "auto" : 0, opacity: serverMenuOpen ? 1 : 0 }} transition={{ duration: 0.2 }} className="overflow-hidden ml-4 space-y-1">
            {serverMenuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <Link href={item.path} className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-all duration-200">
                    <Icon className={`w-4 h-4 ${item.color}`} strokeWidth={1.5} />
                    <span className="text-sm">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </motion.ul>
        </div>

        <div className="mt-2">
          <button onClick={() => setSettingsMenuOpen(!settingsMenuOpen)} className="flex items-center justify-between w-full px-4 py-3 text-slate-400 hover:text-white transition-colors">
            <div className="flex items-center gap-3">
              <Settings className="w-5 h-5" strokeWidth={1.5} />
              <span className="font-medium text-sm">Settings</span>
            </div>
            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${settingsMenuOpen ? "rotate-180" : ""}`} />
          </button>
          <motion.ul initial={false} animate={{ height: settingsMenuOpen ? "auto" : 0, opacity: settingsMenuOpen ? 1 : 0 }} transition={{ duration: 0.2 }} className="overflow-hidden ml-4 space-y-1">
            {settingsMenuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <Link href={item.path} className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-all duration-200">
                    <Icon className="w-4 h-4" strokeWidth={1.5} />
                    <span className="text-sm">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </motion.ul>
        </div>
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-medium">A</div>
          <div>
            <p className="text-sm font-medium text-white">Admin</p>
            <p className="text-xs text-slate-400">Administrator</p>
          </div>
        </div>
      </div>
    </aside>
  );
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
      { id: 3, question: "What is the data quality score?", answerType: "multiple_choice", options: ["Excellent (95-100%)", "Good (80-94%)", "Fair (60-79%)", "Poor (<60%)"] },
      { id: 4, question: "Are there any duplicate records?", answerType: "ox", options: [] },
      { id: 5, question: "Additional notes on data quality:", answerType: "text", options: [] },
    ]
  },
  "2": {
    serviceName: "Patent Crawler Service",
    procedureName: "API Response Validation",
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
      { id: 3, question: "Error handling status:", answerType: "multiple_choice", options: ["All errors handled", "Some errors unhandled", "Major issues found"] },
    ]
  },
  "3": {
    serviceName: "News API Integration",
    procedureName: "Performance Benchmark",
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
      { id: 2, question: "Peak load performance:", answerType: "multiple_choice", options: ["Excellent", "Good", "Needs Improvement", "Critical"] },
    ]
  }
};

export default function AddTestProcedure() {
  const params = useParams();
  const editId = params.id;
  const isEditMode = !!editId;
  const existingData = editId ? existingTests[editId] : null;
  
  const [, setLocation] = useLocation();
  const [serviceName, setServiceName] = useState(existingData?.serviceName || "");
  const [procedureName, setProcedureName] = useState(existingData?.procedureName || "");
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
  const [activeTab, setActiveTab] = useState<"basic" | "items">("basic");
  
  // Template state
  const [templates, setTemplates] = useState([
    { id: 1, name: "Basic QA Check", isDefault: true, items: [
      { id: 1, question: "Is the service responding correctly?", answerType: "ox" as const, options: [] },
      { id: 2, question: "Are all endpoints accessible?", answerType: "ox" as const, options: [] },
    ]},
    { id: 2, name: "Performance Review", isDefault: false, items: [
      { id: 1, question: "Response time within SLA?", answerType: "ox" as const, options: [] },
      { id: 2, question: "Performance rating:", answerType: "multiple_choice" as const, options: ["Excellent", "Good", "Fair", "Poor"] },
      { id: 3, question: "Additional notes:", answerType: "text" as const, options: [] },
    ]},
    { id: 3, name: "Data Validation", isDefault: false, items: [
      { id: 1, question: "Data format is correct?", answerType: "ox" as const, options: [] },
      { id: 2, question: "All required fields present?", answerType: "ox" as const, options: [] },
      { id: 3, question: "Data quality score:", answerType: "multiple_choice" as const, options: ["100%", "90-99%", "80-89%", "Below 80%"] },
    ]},
  ]);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [newTemplateName, setNewTemplateName] = useState("");
  const [showTemplateDropdown, setShowTemplateDropdown] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState<number | null>(null);
  const [templateItems, setTemplateItems] = useState<TestItem[]>([]);
  const [templateNextId, setTemplateNextId] = useState(1);

  const addTemplateItem = () => {
    setTemplateItems([...templateItems, { id: templateNextId, question: "", answerType: "text", options: ["", "", "", ""] }]);
    setTemplateNextId(templateNextId + 1);
  };

  const updateTemplateItem = (id: number, field: string, value: string) => {
    setTemplateItems(templateItems.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const removeTemplateItem = (id: number) => {
    setTemplateItems(templateItems.filter(item => item.id !== id));
  };

  const saveNewTemplate = () => {
    if (newTemplateName.trim() && templateItems.length > 0) {
      const newTemplate = {
        id: templates.length + 1,
        name: newTemplateName.trim(),
        isDefault: false,
        items: templateItems.map(item => ({ ...item })),
      };
      setTemplates([...templates, newTemplate]);
      setNewTemplateName("");
      setTemplateItems([]);
      setTemplateNextId(1);
      setShowTemplateModal(false);
    }
  };

  const saveAsTemplate = () => {
    if (newTemplateName.trim() && testItems.length > 0) {
      const newTemplate = {
        id: templates.length + 1,
        name: newTemplateName.trim(),
        isDefault: false,
        items: testItems.map(item => ({ ...item })),
      };
      setTemplates([...templates, newTemplate]);
      setNewTemplateName("");
      setShowTemplateModal(false);
    }
  };

  const loadTemplate = (templateId: number) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setTestItems(template.items.map((item, idx) => ({ ...item, id: idx + 1 })));
      setNextId(template.items.length + 1);
      setSelectedTemplateId(templateId);
    }
    setShowTemplateDropdown(false);
  };

  const setDefaultTemplate = (templateId: number) => {
    setTemplates(templates.map(t => ({ ...t, isDefault: t.id === templateId })));
  };

  const deleteTemplate = (templateId: number) => {
    setTemplates(templates.filter(t => t.id !== templateId));
    if (selectedTemplateId === templateId) {
      setSelectedTemplateId(null);
    }
  };

  const saveToSelectedTemplate = () => {
    if (selectedTemplateId && testItems.length > 0) {
      setTemplates(templates.map(t => 
        t.id === selectedTemplateId 
          ? { ...t, items: testItems.map(item => ({ ...item })) }
          : t
      ));
    }
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
        options: ["", "", "", ""],
      },
    ]);
    setNextId(nextId + 1);
  };

  const updateTestItem = (id: number, field: keyof TestItem, value: string | AnswerType | string[]) => {
    setTestItems(
      testItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const updateOption = (itemId: number, optionIndex: number, value: string) => {
    setTestItems(
      testItems.map((item) => {
        if (item.id === itemId) {
          const newOptions = [...item.options];
          newOptions[optionIndex] = value;
          return { ...item, options: newOptions };
        }
        return item;
      })
    );
  };

  const removeTestItem = (id: number) => {
    setTestItems(testItems.filter((item) => item.id !== id));
  };

  const addOption = (itemId: number) => {
    setTestItems(
      testItems.map((item) => {
        if (item.id === itemId) {
          return { ...item, options: [...item.options, ""] };
        }
        return item;
      })
    );
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
  };

  const handleSave = () => {
    console.log({ serviceName, procedureName, testItems });
    setLocation("/qa-report");
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
              {/* Tabs */}
              <div className="flex gap-1 mb-6 p-1 bg-slate-100 rounded-lg w-fit">
                <button
                  onClick={() => setActiveTab("basic")}
                  className={`px-5 py-2 rounded-md text-sm font-medium transition-all ${
                    activeTab === "basic"
                      ? "bg-white text-slate-800 shadow-sm"
                      : "text-slate-600 hover:text-slate-800"
                  }`}
                  data-testid="tab-basic"
                >
                  Basic Info
                </button>
                <button
                  onClick={() => setActiveTab("items")}
                  className={`px-5 py-2 rounded-md text-sm font-medium transition-all ${
                    activeTab === "items"
                      ? "bg-white text-slate-800 shadow-sm"
                      : "text-slate-600 hover:text-slate-800"
                  }`}
                  data-testid="tab-items"
                >
                  Item Settings
                </button>
              </div>

              {activeTab === "basic" && (
              <div className="space-y-6 mb-8">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Service Name</label>
                    <select
                      value={serviceName}
                      onChange={(e) => setServiceName(e.target.value)}
                      className="w-full h-10 px-3 border border-slate-200 rounded-lg text-sm bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      data-testid="select-service"
                    >
                      <option value="">Select a service...</option>
                      {services.map((s) => (
                        <option key={s.id} value={s.name}>
                          {s.name}
                        </option>
                      ))}
                    </select>
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
                  <div className="relative">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Assigned Inspector(s)</label>
                    <button
                      onClick={() => setShowInspectorDropdown(!showInspectorDropdown)}
                      className="w-full h-10 px-3 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-left flex items-center justify-between"
                      data-testid="select-inspector"
                    >
                      <span className={assignedInspectors.length > 0 ? "text-slate-800" : "text-slate-400"}>
                        {assignedInspectors.length > 0 
                          ? assignedInspectors.length === 1 
                            ? assignedInspectors[0]
                            : `${assignedInspectors.length} inspectors selected`
                          : "Select inspectors..."
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
                      <div className="flex items-center gap-3 mt-3 p-3 bg-slate-50 rounded-lg">
                        <div className="flex -space-x-2">
                          {assignedInspectors.map((name) => {
                            const inspector = inspectors.find(i => i.name === name);
                            return (
                              <div
                                key={name}
                                className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xs font-medium text-white border-2 border-white"
                                title={name}
                              >
                                {inspector?.avatar || name.split(" ").map(n => n[0]).join("")}
                              </div>
                            );
                          })}
                        </div>
                        <div className="flex flex-wrap gap-1 flex-1">
                          {assignedInspectors.map((name) => (
                            <span key={name} className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                              {name}
                              <button onClick={() => toggleInspector(name)} className="hover:text-blue-900">
                                <X className="w-3 h-3" />
                              </button>
                            </span>
                          ))}
                        </div>
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

                  <div className="flex items-center gap-3 mb-4">
                    <button
                      onClick={() => setIsRepeating(!isRepeating)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                        isRepeating
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                      }`}
                      data-testid="toggle-repeat"
                    >
                      <Repeat className="w-4 h-4" />
                      <span className="text-sm font-medium">Repeating Task</span>
                    </button>
                  </div>

                  {isRepeating && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="space-y-4"
                    >
                      <div>
                        <label className="block text-xs font-medium text-slate-500 mb-2">Repeat on Days</label>
                        <div className="flex gap-2 mb-3">
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
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => setAssignPerDay(!assignPerDay)}
                                className={`relative w-11 h-6 rounded-full transition-colors ${
                                  assignPerDay ? "bg-blue-600" : "bg-slate-200"
                                }`}
                                data-testid="toggle-assign-per-day"
                              >
                                <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                                  assignPerDay ? "translate-x-5" : ""
                                }`} />
                              </button>
                              <span className="text-sm font-medium text-slate-600">Assign Inspectors per Day</span>
                            </div>
                            
                            {assignPerDay && (
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
                                        className="w-full h-9 px-3 border border-slate-200 rounded-lg text-sm bg-white text-left flex items-center justify-between hover:border-blue-300"
                                      >
                                        <span className={assignedForDay.length > 0 ? "text-slate-800" : "text-slate-400"}>
                                          {assignedForDay.length > 0 
                                            ? `${assignedForDay.length} inspector(s)` 
                                            : "Select inspectors..."
                                          }
                                        </span>
                                        <ChevronDown className="w-4 h-4 text-slate-400" />
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
                                    {assignedForDay.length > 0 && (
                                      <div className="flex -space-x-1">
                                        {assignedForDay.slice(0, 3).map((name) => {
                                          const inspector = inspectors.find(i => i.name === name);
                                          return (
                                            <div
                                              key={name}
                                              className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xs font-medium text-white border-2 border-white"
                                              title={name}
                                            >
                                              {inspector?.avatar}
                                            </div>
                                          );
                                        })}
                                        {assignedForDay.length > 3 && (
                                          <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-xs font-medium text-slate-600 border-2 border-white">
                                            +{assignedForDay.length - 3}
                                          </div>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                            )}
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
                          <input
                            type="time"
                            value={specificTime}
                            onChange={(e) => setSpecificTime(e.target.value)}
                            className="h-9 px-3 border border-slate-200 rounded-lg text-sm bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            data-testid="input-specific-time"
                          />
                        )}
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
              )}

              {activeTab === "items" && (
              <div className="pt-6">
                {/* Template Section */}
                <div className="mb-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-2 mb-4">
                    <FileStack className="w-5 h-5 text-blue-600" />
                    <h3 className="font-medium text-slate-800">Templates</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {templates.map((template) => (
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
                            onClick={(e) => { e.stopPropagation(); setDefaultTemplate(template.id); }}
                            className={`p-1.5 rounded hover:bg-slate-100 ${template.isDefault ? 'text-amber-500' : 'text-slate-400'}`}
                            title="Set as default"
                          >
                            <Star className={`w-4 h-4 ${template.isDefault ? 'fill-amber-500' : ''}`} />
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
                    
                    {/* Add New Template Button */}
                    <button
                      onClick={() => setShowTemplateModal(true)}
                      className="p-4 bg-white rounded-lg border-2 border-dashed border-slate-300 hover:border-blue-400 hover:bg-blue-50 transition-all flex flex-col items-center justify-center gap-2 min-h-[100px]"
                      data-testid="add-template-btn"
                    >
                      <Plus className="w-6 h-6 text-blue-500" />
                      <span className="text-xs font-medium text-slate-600">New Template</span>
                    </button>
                  </div>
                </div>

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
                        <Button variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-100" onClick={() => { setShowTemplateModal(false); setNewTemplateName(""); }}>
                          Cancel
                        </Button>
                        <Button 
                          onClick={saveAsTemplate} 
                          className="bg-blue-600 hover:bg-blue-700" 
                          disabled={!newTemplateName.trim() || testItems.length === 0}
                        >
                          Save Template
                        </Button>
                      </div>
                    </motion.div>
                  </div>
                )}

                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-slate-800">Test Items</h2>
                  <div className="flex gap-2">
                    {selectedTemplateId && testItems.length > 0 && (
                      <Button 
                        onClick={saveToSelectedTemplate} 
                        variant="outline" 
                        className="gap-2 border-blue-300 text-blue-600 hover:bg-blue-50"
                        data-testid="save-to-template"
                      >
                        <Save className="w-4 h-4" />
                        Save to Template
                      </Button>
                    )}
                    <Button onClick={addTestItem} className="gap-2 bg-blue-600 hover:bg-blue-700" data-testid="add-test-item">
                      <Plus className="w-4 h-4" />
                      Add Test Item
                    </Button>
                  </div>
                </div>

                {testItems.length === 0 ? (
                  <div className="text-center py-16 border-2 border-dashed border-slate-200 rounded-xl">
                    <ClipboardCheck className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-500 mb-4">No test items added yet</p>
                    <Button onClick={addTestItem} variant="outline" className="gap-2" data-testid="add-first-item">
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
                                <div className="grid grid-cols-2 gap-3">
                                  {item.options.map((opt, optIndex) => (
                                    <div key={optIndex} className="flex items-center gap-2">
                                      <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-xs font-medium">
                                        {optIndex + 1}
                                      </span>
                                      <Input
                                        value={opt}
                                        onChange={(e) => updateOption(item.id, optIndex, e.target.value)}
                                        placeholder={`Option ${optIndex + 1}`}
                                        className="border-slate-200 bg-white text-sm flex-1"
                                        data-testid={`option-${item.id}-${optIndex}`}
                                      />
                                      {item.options.length > 2 && (
                                        <button
                                          onClick={() => removeOption(item.id, optIndex)}
                                          className="p-1 hover:bg-red-50 rounded transition-colors"
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
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
