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
  ArrowLeft,
  BookOpen,
  Lightbulb,
  UserCog,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Edit3,
  Save,
  List,
  MessageSquare,
  CheckSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const menuItems = [
  { id: "dashboard", name: "Dashboard", icon: LayoutDashboard, path: "/" },
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

const testData: Record<string, {
  id: number;
  testName: string;
  serviceName: string;
  type: string;
  status: string;
  workStatus: string;
  step: number;
  lastInspection: string;
  nextInspection: string;
  inspectors: string[];
  normalCount: number;
  abnormalCount: number;
  items: { id: number; question: string; answerType: string; options?: string[]; answer?: string }[];
}> = {
  "1": {
    id: 1,
    testName: "Data Integrity Check",
    serviceName: "Company Data Pipeline",
    type: "Internal",
    status: "Active",
    workStatus: "Normal",
    step: 5,
    lastInspection: "2025-01-09",
    nextInspection: "2025-01-16",
    inspectors: ["John Kim", "Sarah Lee"],
    normalCount: 12,
    abnormalCount: 0,
    items: [
      { id: 1, question: "Are all required fields populated correctly?", answerType: "ox", answer: "O" },
      { id: 2, question: "Is the data format consistent across all records?", answerType: "ox", answer: "O" },
      { id: 3, question: "What is the data quality score?", answerType: "multiple_choice", options: ["Excellent (95-100%)", "Good (80-94%)", "Fair (60-79%)", "Poor (<60%)"], answer: "Excellent (95-100%)" },
      { id: 4, question: "Are there any duplicate records?", answerType: "ox", answer: "X" },
      { id: 5, question: "Additional notes on data quality:", answerType: "text", answer: "All data passed integrity checks. No issues found." },
    ]
  },
  "2": {
    id: 2,
    testName: "API Response Validation",
    serviceName: "Patent Crawler Service",
    type: "Internal",
    status: "Active",
    workStatus: "Normal",
    step: 3,
    lastInspection: "2025-01-08",
    nextInspection: "2025-01-15",
    inspectors: ["Sarah Lee"],
    normalCount: 8,
    abnormalCount: 1,
    items: [
      { id: 1, question: "Is the API response time within acceptable limits (<500ms)?", answerType: "ox", answer: "O" },
      { id: 2, question: "Are all required fields present in the response?", answerType: "ox", answer: "O" },
      { id: 3, question: "Error handling status:", answerType: "multiple_choice", options: ["All errors handled", "Some errors unhandled", "Major issues found"], answer: "Some errors unhandled" },
    ]
  },
  "3": {
    id: 3,
    testName: "Performance Benchmark",
    serviceName: "News API Integration",
    type: "External",
    status: "Warning",
    workStatus: "Delayed",
    step: 8,
    lastInspection: "2025-01-05",
    nextInspection: "2025-01-12",
    inspectors: ["Mike Park", "Emily Choi", "David Jung"],
    normalCount: 5,
    abnormalCount: 3,
    items: [
      { id: 1, question: "Average response time:", answerType: "multiple_choice", options: ["<100ms", "100-300ms", "300-500ms", ">500ms"], answer: "300-500ms" },
      { id: 2, question: "Throughput meets requirements?", answerType: "ox", answer: "X" },
      { id: 3, question: "Memory usage within limits?", answerType: "ox", answer: "O" },
      { id: 4, question: "CPU usage within limits?", answerType: "ox", answer: "X" },
      { id: 5, question: "Are there any memory leaks detected?", answerType: "ox", answer: "X" },
      { id: 6, question: "Load test passed successfully?", answerType: "ox", answer: "X" },
      { id: 7, question: "Stress test results:", answerType: "text", answer: "System shows degradation under heavy load. Needs optimization." },
      { id: 8, question: "Overall performance rating:", answerType: "multiple_choice", options: ["Excellent", "Good", "Needs Improvement", "Critical"], answer: "Needs Improvement" },
    ]
  },
  "4": {
    id: 4,
    testName: "Security Audit",
    serviceName: "Stock Data Collector",
    type: "External",
    status: "Active",
    workStatus: "Normal",
    step: 4,
    lastInspection: "2025-01-09",
    nextInspection: "2025-01-16",
    inspectors: ["Emily Choi"],
    normalCount: 10,
    abnormalCount: 0,
    items: [
      { id: 1, question: "All API endpoints secured?", answerType: "ox", answer: "O" },
      { id: 2, question: "Authentication mechanism working correctly?", answerType: "ox", answer: "O" },
      { id: 3, question: "Data encryption status:", answerType: "multiple_choice", options: ["Full encryption", "Partial encryption", "No encryption"], answer: "Full encryption" },
      { id: 4, question: "Security vulnerabilities found:", answerType: "text", answer: "No vulnerabilities detected in this audit cycle." },
    ]
  },
  "5": {
    id: 5,
    testName: "Data Accuracy Test",
    serviceName: "ML Prediction Service",
    type: "Internal",
    status: "Inactive",
    workStatus: "Stopped",
    step: 6,
    lastInspection: "2024-12-20",
    nextInspection: "2025-01-20",
    inspectors: ["David Jung", "John Kim"],
    normalCount: 3,
    abnormalCount: 2,
    items: [
      { id: 1, question: "Model accuracy meets threshold (>90%)?", answerType: "ox", answer: "X" },
      { id: 2, question: "Current accuracy percentage:", answerType: "multiple_choice", options: [">95%", "90-95%", "85-90%", "<85%"], answer: "85-90%" },
      { id: 3, question: "Prediction confidence levels acceptable?", answerType: "ox", answer: "O" },
      { id: 4, question: "False positive rate:", answerType: "multiple_choice", options: ["<1%", "1-5%", "5-10%", ">10%"], answer: "5-10%" },
      { id: 5, question: "False negative rate:", answerType: "multiple_choice", options: ["<1%", "1-5%", "5-10%", ">10%"], answer: "1-5%" },
      { id: 6, question: "Recommendations for improvement:", answerType: "text", answer: "Consider retraining model with more recent data. Current dataset may be outdated." },
    ]
  },
};

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
              const statusColor = item.status === "normal" ? "bg-blue-500" : item.status === "error" ? "bg-red-500" : "bg-slate-500";
              return (
                <li key={item.id}>
                  <Link href={item.path} className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${isActive ? "bg-blue-600/20 text-blue-400" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}>
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
              <span className="font-medium text-sm">Server Monitoring</span>
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
          <Link href="/settings/users" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white transition-colors">
            <Settings className="w-5 h-5" strokeWidth={1.5} />
            <span className="font-medium text-sm">Settings</span>
          </Link>
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

export default function TestDetail() {
  const params = useParams();
  const testId = params.id || "1";
  const test = testData[testId];
  const [isEditing, setIsEditing] = useState(false);
  const [editedItems, setEditedItems] = useState(test?.items || []);

  if (!test) {
    return (
      <div className="flex min-h-screen bg-slate-50">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="text-center py-20">
            <p className="text-slate-500">Test not found</p>
            <Link href="/qa-report">
              <Button className="mt-4">Back to QA Report</Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const handleAnswerChange = (itemId: number, newAnswer: string) => {
    setEditedItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, answer: newAnswer } : item
    ));
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const getAnswerIcon = (answerType: string) => {
    if (answerType === "multiple_choice") return <List className="w-4 h-4" />;
    if (answerType === "text") return <MessageSquare className="w-4 h-4" />;
    return <CheckSquare className="w-4 h-4" />;
  };

  return (
    <div className="flex min-h-screen bg-slate-50" data-testid="test-detail-page">
      <Sidebar />

      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-6">
            <Link href="/qa-report" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-700 transition-colors mb-4">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to QA Report</span>
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden"
          >
            <div className="px-6 py-5 border-b border-slate-200 bg-slate-50">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-semibold text-slate-800">{test.testName}</h1>
                  <p className="text-sm text-slate-500 mt-1">{test.serviceName}</p>
                </div>
                <div className="flex items-center gap-3">
                  {isEditing ? (
                    <Button onClick={handleSave} className="gap-2">
                      <Save className="w-4 h-4" />
                      Save Changes
                    </Button>
                  ) : (
                    <Button variant="outline" onClick={() => setIsEditing(true)} className="gap-2">
                      <Edit3 className="w-4 h-4" />
                      Edit Test
                    </Button>
                  )}
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-xs text-slate-500 mb-1">Type</p>
                  <p className="font-medium text-slate-800">{test.type}</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-xs text-slate-500 mb-1">Work Status</p>
                  <span className={`inline-flex items-center gap-1.5 text-sm font-medium ${
                    test.workStatus === "Normal" ? "text-emerald-600" : 
                    test.workStatus === "Delayed" ? "text-amber-600" : "text-red-600"
                  }`}>
                    <span className={`w-2 h-2 rounded-full ${
                      test.workStatus === "Normal" ? "bg-emerald-500" : 
                      test.workStatus === "Delayed" ? "bg-amber-500" : "bg-red-500"
                    }`} />
                    {test.workStatus}
                  </span>
                </div>
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-xs text-slate-500 mb-1">Last Inspection</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <p className="font-medium text-slate-800">{test.lastInspection}</p>
                  </div>
                </div>
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-xs text-slate-500 mb-1">Next Inspection</p>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <p className="font-medium text-slate-800">{test.nextInspection}</p>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <h3 className="text-sm font-medium text-slate-700">Review Results</h3>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1.5 text-sm">
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                      <span className="text-emerald-600 font-medium">{test.normalCount} Normal</span>
                    </span>
                    <span className="flex items-center gap-1.5 text-sm">
                      <XCircle className="w-4 h-4 text-red-500" />
                      <span className="text-red-600 font-medium">{test.abnormalCount} Abnormal</span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <p className="text-sm text-slate-500">Inspectors:</p>
                  <div className="flex -space-x-2">
                    {test.inspectors.map((inspector, idx) => (
                      <div
                        key={idx}
                        className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xs font-medium text-white border-2 border-white"
                        title={inspector}
                      >
                        {inspector.split(" ").map(n => n[0]).join("")}
                      </div>
                    ))}
                  </div>
                  <span className="text-sm text-slate-600">{test.inspectors.join(", ")}</span>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-slate-700 mb-4">Test Items ({test.step} steps)</h3>
                <div className="space-y-4">
                  {editedItems.map((item, index) => (
                    <div key={item.id} className="border border-slate-200 rounded-lg p-4 hover:border-blue-200 transition-colors">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium text-sm flex-shrink-0">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-slate-400">{getAnswerIcon(item.answerType)}</span>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                              {item.answerType === "ox" ? "O/X" : item.answerType === "multiple_choice" ? "Multiple Choice" : "Text"}
                            </span>
                          </div>
                          <p className="text-slate-800 font-medium mb-3">{item.question}</p>
                          
                          {isEditing ? (
                            <div className="mt-2">
                              {item.answerType === "ox" && (
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => handleAnswerChange(item.id, "O")}
                                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                      item.answer === "O" ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                    }`}
                                  >
                                    O
                                  </button>
                                  <button
                                    onClick={() => handleAnswerChange(item.id, "X")}
                                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                      item.answer === "X" ? "bg-red-500 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                    }`}
                                  >
                                    X
                                  </button>
                                </div>
                              )}
                              {item.answerType === "multiple_choice" && item.options && (
                                <div className="space-y-2">
                                  {item.options.map((option, optIdx) => (
                                    <button
                                      key={optIdx}
                                      onClick={() => handleAnswerChange(item.id, option)}
                                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                                        item.answer === option ? "bg-blue-500 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                      }`}
                                    >
                                      {option}
                                    </button>
                                  ))}
                                </div>
                              )}
                              {item.answerType === "text" && (
                                <textarea
                                  value={item.answer || ""}
                                  onChange={(e) => handleAnswerChange(item.id, e.target.value)}
                                  className="w-full border border-slate-200 rounded-lg p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  rows={3}
                                />
                              )}
                            </div>
                          ) : (
                            <div className="mt-2">
                              {item.answerType === "ox" && (
                                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium ${
                                  item.answer === "O" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                                }`}>
                                  {item.answer === "O" ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                                  {item.answer}
                                </span>
                              )}
                              {item.answerType === "multiple_choice" && (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-100 text-blue-700 font-medium">
                                  {item.answer}
                                </span>
                              )}
                              {item.answerType === "text" && (
                                <p className="text-slate-600 bg-slate-50 rounded-lg p-3">{item.answer}</p>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
