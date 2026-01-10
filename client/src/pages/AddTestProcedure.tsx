import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
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
];

const dataMenuItems = [
  { id: "company-data", name: "Company Data", icon: Building2, path: "/data/company" },
  { id: "patent-data", name: "Patent Data", icon: FileText, path: "/data/patent" },
  { id: "paper-data", name: "Paper Data", icon: BookOpen, path: "/data/paper" },
  { id: "stock-data", name: "Stock Data", icon: TrendingUp, path: "/data/stock" },
  { id: "news-data", name: "News Data", icon: Newspaper, path: "/data/news" },
  { id: "rnd-data", name: "R&D Data", icon: Lightbulb, path: "/data/rnd" },
  { id: "employment-data", name: "Employment Data", icon: UserCog, path: "/data/employment" },
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
        <h1 className="text-xl font-bold text-white tracking-tight">Data Quality Center</h1>
        <p className="text-xs text-slate-400 mt-1">Internal Monitoring</p>
      </div>

      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.path;
            return (
              <li key={item.id}>
                <Link href={item.path} className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white"}`}>
                  <Icon className="w-5 h-5" strokeWidth={1.5} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              </li>
            );
          })}
          <li>
            <Link href="/qa-report" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${location.startsWith("/qa") ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white"}`}>
              <ClipboardCheck className="w-5 h-5" strokeWidth={1.5} />
              <span className="font-medium">QA Report</span>
            </Link>
          </li>
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
              return (
                <li key={item.id}>
                  <Link href={item.path} className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${isActive ? "bg-blue-600/20 text-blue-400" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}>
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

export default function AddTestProcedure() {
  const [, setLocation] = useLocation();
  const [serviceName, setServiceName] = useState("");
  const [procedureName, setProcedureName] = useState("");
  const [assignedInspector, setAssignedInspector] = useState("");
  const [testItems, setTestItems] = useState<TestItem[]>([]);
  const [nextId, setNextId] = useState(1);

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

  return (
    <div className="min-h-screen flex bg-slate-50">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
          <div className="px-8 py-4">
            <div className="flex items-center gap-4">
              <Link href="/qa-report" className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5 text-slate-600" />
              </Link>
              <div>
                <h1 className="text-xl font-semibold tracking-tight text-slate-800">Add Test Procedure</h1>
                <p className="text-sm text-slate-500 mt-0.5">Create a new test procedure with test items</p>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="space-y-6 mb-8">
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Service Name</label>
                    <select
                      value={serviceName}
                      onChange={(e) => setServiceName(e.target.value)}
                      className="w-full h-10 px-3 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Assigned Inspector</label>
                    <select
                      value={assignedInspector}
                      onChange={(e) => setAssignedInspector(e.target.value)}
                      className="w-full h-10 px-3 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      data-testid="select-inspector"
                    >
                      <option value="">Select an inspector...</option>
                      {inspectors.map((i) => (
                        <option key={i.id} value={i.name}>
                          {i.name} - {i.role}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-slate-800">Test Items</h2>
                  <Button onClick={addTestItem} className="gap-2 bg-blue-600 hover:bg-blue-700" data-testid="add-test-item">
                    <Plus className="w-4 h-4" />
                    Add Test Item
                  </Button>
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

              <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-slate-200">
                <Link href="/qa-report">
                  <Button variant="outline">Cancel</Button>
                </Link>
                <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 px-8" data-testid="save-procedure">
                  Save Procedure
                </Button>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
