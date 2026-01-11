import { useState, useRef } from "react";
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
  Menu,
  Search,
  MoreVertical,
  Trash2,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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

type TestItemResult = {
  id: number;
  question: string;
  answerType: string;
  options?: string[];
  answer?: string;
  isResolved?: boolean;
  actionNote?: string;
};

type ScheduleItem = {
  id: number;
  date: string;
  assignee: string;
  status: "completed" | "pending" | "in_progress" | "cancelled";
  startTime?: string;
  endTime?: string;
  duration?: string;
  notes?: string;
  testResults?: TestItemResult[];
  cancelReason?: string;
  cancelledAt?: string;
  cancelledBy?: string;
};

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
  startDate: string;
  endDate: string;
  inspectors: string[];
  normalCount: number;
  abnormalCount: number;
  schedule: ScheduleItem[];
  items: { id: number; question: string; answerType: string; options?: string[]; answer?: string; isResolved?: boolean; actionNote?: string }[];
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
    startDate: "2025-01-01",
    endDate: "2025-03-31",
    inspectors: ["John Kim", "Sarah Lee"],
    normalCount: 12,
    abnormalCount: 0,
    schedule: [
      { id: -11, date: "2025-04-03", assignee: "Sarah Lee", status: "cancelled", cancelReason: "Inspector on vacation during this period. Rescheduled to next week.", cancelledAt: "2025-03-25 14:30", cancelledBy: "Admin" },
      { id: -10, date: "2025-03-27", assignee: "John Kim", status: "pending" },
      { id: -9, date: "2025-03-20", assignee: "Sarah Lee", status: "pending" },
      { id: -8, date: "2025-03-13", assignee: "John Kim", status: "pending" },
      { id: -7, date: "2025-03-06", assignee: "Sarah Lee", status: "pending" },
      { id: -6, date: "2025-02-27", assignee: "John Kim", status: "pending" },
      { id: -5, date: "2025-02-20", assignee: "Sarah Lee", status: "pending" },
      { id: -4, date: "2025-02-13", assignee: "John Kim", status: "pending" },
      { id: 0, date: "2025-02-06", assignee: "Sarah Lee", status: "pending" },
      { id: -1, date: "2025-01-30", assignee: "John Kim", status: "pending" },
      { id: -2, date: "2025-01-23", assignee: "Sarah Lee", status: "pending" },
      { id: 1, date: "2025-01-16", assignee: "John Kim", status: "in_progress" },
      { id: 2, date: "2025-01-09", assignee: "Sarah Lee", status: "completed", startTime: "14:00", endTime: "14:32", duration: "32 min", notes: "All checks passed.", testResults: [
        { id: 1, question: "Are all required fields populated correctly?", answerType: "ox", answer: "O" },
        { id: 2, question: "Is the data format consistent?", answerType: "ox", answer: "O" },
        { id: 3, question: "Data quality score?", answerType: "multiple_choice", options: ["Excellent", "Good", "Fair", "Poor"], answer: "Excellent" },
        { id: 4, question: "Duplicate records?", answerType: "ox", answer: "X", isResolved: true, actionNote: "Duplicates removed." },
        { id: 5, question: "Additional notes:", answerType: "text", answer: "All checks passed." },
      ]},
      { id: 3, date: "2025-01-02", assignee: "John Kim", status: "completed", startTime: "09:45", endTime: "10:15", duration: "30 min", testResults: [
        { id: 1, question: "Are all required fields populated correctly?", answerType: "ox", answer: "O" },
        { id: 2, question: "Is the data format consistent?", answerType: "ox", answer: "X", isResolved: true, actionNote: "Fixed." },
        { id: 3, question: "Data quality score?", answerType: "multiple_choice", options: ["Excellent", "Good", "Fair", "Poor"], answer: "Good" },
      ]},
      { id: 4, date: "2024-12-26", assignee: "Sarah Lee", status: "completed", startTime: "16:20", endTime: "16:48", duration: "28 min", testResults: [
        { id: 1, question: "Are all required fields populated correctly?", answerType: "ox", answer: "O" },
        { id: 2, question: "Is the data format consistent?", answerType: "ox", answer: "O" },
        { id: 3, question: "Data quality score?", answerType: "multiple_choice", options: ["Excellent", "Good", "Fair", "Poor"], answer: "Excellent" },
      ]},
      { id: 5, date: "2024-12-19", assignee: "John Kim", status: "completed", startTime: "11:00", endTime: "11:22", duration: "22 min", testResults: [
        { id: 1, question: "Are all required fields populated correctly?", answerType: "ox", answer: "O" },
        { id: 2, question: "Is the data format consistent?", answerType: "ox", answer: "O" },
      ]},
      { id: 6, date: "2024-12-12", assignee: "Sarah Lee", status: "completed", startTime: "10:00", endTime: "10:25", duration: "25 min", testResults: [
        { id: 1, question: "Are all required fields populated correctly?", answerType: "ox", answer: "O" },
      ]},
      { id: 7, date: "2024-12-05", assignee: "John Kim", status: "completed", startTime: "14:30", endTime: "15:00", duration: "30 min", testResults: [
        { id: 1, question: "Are all required fields populated correctly?", answerType: "ox", answer: "O" },
      ]},
      { id: 8, date: "2024-11-28", assignee: "Sarah Lee", status: "completed", startTime: "09:00", endTime: "09:20", duration: "20 min", testResults: [
        { id: 1, question: "Are all required fields populated correctly?", answerType: "ox", answer: "O" },
      ]},
      { id: 9, date: "2024-11-21", assignee: "John Kim", status: "completed", startTime: "11:30", endTime: "11:55", duration: "25 min", testResults: [
        { id: 1, question: "Are all required fields populated correctly?", answerType: "ox", answer: "O" },
      ]},
      { id: 10, date: "2024-11-14", assignee: "Sarah Lee", status: "completed", startTime: "15:00", endTime: "15:30", duration: "30 min", testResults: [
        { id: 1, question: "Are all required fields populated correctly?", answerType: "ox", answer: "X", isResolved: true, actionNote: "Fixed missing fields." },
      ]},
      { id: 11, date: "2024-11-07", assignee: "John Kim", status: "completed", startTime: "10:15", endTime: "10:40", duration: "25 min", testResults: [
        { id: 1, question: "Are all required fields populated correctly?", answerType: "ox", answer: "O" },
      ]},
      { id: 12, date: "2024-10-31", assignee: "Sarah Lee", status: "completed", startTime: "13:00", endTime: "13:25", duration: "25 min", testResults: [
        { id: 1, question: "Are all required fields populated correctly?", answerType: "ox", answer: "O" },
      ]},
      { id: 13, date: "2024-10-24", assignee: "John Kim", status: "completed", startTime: "16:00", endTime: "16:20", duration: "20 min", testResults: [
        { id: 1, question: "Are all required fields populated correctly?", answerType: "ox", answer: "O" },
      ]},
      { id: 14, date: "2024-10-17", assignee: "Sarah Lee", status: "completed", startTime: "09:30", endTime: "09:55", duration: "25 min", testResults: [
        { id: 1, question: "Are all required fields populated correctly?", answerType: "ox", answer: "O" },
      ]},
      { id: 15, date: "2024-10-10", assignee: "John Kim", status: "completed", startTime: "14:00", endTime: "14:30", duration: "30 min", testResults: [
        { id: 1, question: "Are all required fields populated correctly?", answerType: "ox", answer: "O" },
      ]},
      { id: 16, date: "2024-10-03", assignee: "Sarah Lee", status: "completed", startTime: "11:00", endTime: "11:25", duration: "25 min", testResults: [
        { id: 1, question: "Are all required fields populated correctly?", answerType: "ox", answer: "O" },
      ]},
      { id: 17, date: "2024-09-26", assignee: "John Kim", status: "completed", startTime: "10:00", endTime: "10:20", duration: "20 min", testResults: [
        { id: 1, question: "Are all required fields populated correctly?", answerType: "ox", answer: "O" },
      ]},
      { id: 18, date: "2024-09-19", assignee: "Sarah Lee", status: "completed", startTime: "15:30", endTime: "16:00", duration: "30 min", testResults: [
        { id: 1, question: "Are all required fields populated correctly?", answerType: "ox", answer: "O" },
      ]},
      { id: 19, date: "2024-09-12", assignee: "John Kim", status: "completed", startTime: "09:00", endTime: "09:25", duration: "25 min", testResults: [
        { id: 1, question: "Are all required fields populated correctly?", answerType: "ox", answer: "O" },
      ]},
      { id: 20, date: "2024-09-05", assignee: "Sarah Lee", status: "completed", startTime: "13:30", endTime: "13:55", duration: "25 min", testResults: [
        { id: 1, question: "Are all required fields populated correctly?", answerType: "ox", answer: "O" },
      ]},
    ],
    items: [
      { id: 1, question: "Are all required fields populated correctly?", answerType: "ox", answer: "O" },
      { id: 2, question: "Is the data format consistent across all records?", answerType: "ox", answer: "O" },
      { id: 3, question: "What is the data quality score?", answerType: "multiple_choice", options: ["Excellent (95-100%)", "Good (80-94%)", "Fair (60-79%)", "Poor (<60%)"], answer: "Excellent (95-100%)" },
      { id: 4, question: "Are there any duplicate records?", answerType: "ox", answer: "X", isResolved: true, actionNote: "Duplicate records identified and removed on 2025-01-09. Data cleanup completed." },
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
    startDate: "2025-01-01",
    endDate: "2025-06-30",
    inspectors: ["Sarah Lee"],
    normalCount: 8,
    abnormalCount: 1,
    schedule: [
      { id: 1, date: "2025-01-15", assignee: "Sarah Lee", status: "pending" },
      { id: 2, date: "2025-01-08", assignee: "Sarah Lee", status: "completed", startTime: "09:20", endTime: "09:45", duration: "25 min", notes: "API validation complete." },
      { id: 3, date: "2025-01-01", assignee: "Sarah Lee", status: "completed", startTime: "13:00", endTime: "13:20", duration: "20 min", notes: "New year check." },
    ],
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
    startDate: "2024-12-01",
    endDate: "2025-02-28",
    inspectors: ["Mike Park", "Emily Choi", "David Jung"],
    normalCount: 5,
    abnormalCount: 3,
    schedule: [
      { id: 1, date: "2025-01-12", assignee: "Mike Park", status: "in_progress", startTime: "10:00" },
      { id: 2, date: "2025-01-05", assignee: "Emily Choi", status: "completed", startTime: "17:00", endTime: "17:30", duration: "30 min", notes: "Performance issues noted." },
      { id: 3, date: "2024-12-29", assignee: "David Jung", status: "completed", startTime: "14:45", endTime: "15:12", duration: "27 min", notes: "Year-end benchmark." },
      { id: 4, date: "2024-12-22", assignee: "Mike Park", status: "completed", startTime: "10:15", endTime: "10:45", duration: "30 min", notes: "Pre-holiday check." },
    ],
    items: [
      { id: 1, question: "Average response time:", answerType: "multiple_choice", options: ["<100ms", "100-300ms", "300-500ms", ">500ms"], answer: "300-500ms" },
      { id: 2, question: "Throughput meets requirements?", answerType: "ox", answer: "X", isResolved: false, actionNote: "Performance optimization scheduled for next sprint." },
      { id: 3, question: "Memory usage within limits?", answerType: "ox", answer: "O" },
      { id: 4, question: "CPU usage within limits?", answerType: "ox", answer: "X", isResolved: true, actionNote: "Optimized query processing to reduce CPU usage." },
      { id: 5, question: "Are there any memory leaks detected?", answerType: "ox", answer: "X", isResolved: false, actionNote: "Memory leak investigation in progress." },
      { id: 6, question: "Load test passed successfully?", answerType: "ox", answer: "X", isResolved: false, actionNote: "Need to increase server capacity before re-testing." },
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
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    inspectors: ["Emily Choi"],
    normalCount: 10,
    abnormalCount: 0,
    schedule: [
      { id: 1, date: "2025-01-16", assignee: "Emily Choi", status: "pending" },
      { id: 2, date: "2025-01-09", assignee: "Emily Choi", status: "completed", startTime: "10:30", endTime: "11:00", duration: "30 min", notes: "Security audit passed." },
      { id: 3, date: "2025-01-02", assignee: "Emily Choi", status: "completed", startTime: "14:00", endTime: "14:30", duration: "30 min", notes: "Full security review." },
    ],
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
    startDate: "2025-01-06",
    endDate: "2025-04-30",
    inspectors: ["David Jung", "John Kim"],
    normalCount: 3,
    abnormalCount: 2,
    schedule: [
      { id: 1, date: "2025-01-20", assignee: "David Jung", status: "pending" },
      { id: 2, date: "2024-12-20", assignee: "John Kim", status: "completed", startTime: "15:45", endTime: "16:15", duration: "30 min", notes: "Accuracy issues identified." },
      { id: 3, date: "2024-12-13", assignee: "David Jung", status: "completed", startTime: "09:00", endTime: "09:30", duration: "30 min", notes: "Initial accuracy test." },
    ],
    items: [
      { id: 1, question: "Model accuracy meets threshold (>90%)?", answerType: "ox", answer: "X", isResolved: false, actionNote: "Model retraining scheduled with updated dataset." },
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
  const [selectedSchedule, setSelectedSchedule] = useState(test?.schedule[0]?.id || 1);
  const [scheduleFilterFrom, setScheduleFilterFrom] = useState("");
  const [scheduleFilterTo, setScheduleFilterTo] = useState("");
  const [scheduleMenuOpen, setScheduleMenuOpen] = useState<number | null>(null);
  const [menuPosition, setMenuPosition] = useState<{ top: number; left: number } | null>(null);
  const [editScheduleModal, setEditScheduleModal] = useState<number | null>(null);
  const [editScheduleDate, setEditScheduleDate] = useState("");
  const [editScheduleAssignee, setEditScheduleAssignee] = useState("");
  const [cancelScheduleMode, setCancelScheduleMode] = useState(false);
  const [editScheduleType, setEditScheduleType] = useState<'date' | 'assignee' | 'cancel'>('date');
  const [cancelScheduleReason, setCancelScheduleReason] = useState("");
  const [historyModal, setHistoryModal] = useState<number | null>(null);
  const scheduleScrollRef = useRef<HTMLDivElement>(null);
  
  // Mock history data for schedule changes
  const scheduleHistory: Record<number, { id: number; type: 'date_change' | 'assignee_change' | 'cancelled'; date: string; by: string; from?: string; to?: string; reason?: string }[]> = {
    "-11": [
      { id: 1, type: 'cancelled', date: '2025-03-25 14:30', by: 'Admin', from: 'Scheduled', to: 'Cancelled', reason: 'Inspector on vacation during this period. Rescheduled to next week.' },
    ],
    1: [
      { id: 1, type: 'assignee_change', date: '2025-01-10 14:30', by: 'Admin', from: 'Sarah Lee', to: 'John Kim' },
      { id: 2, type: 'date_change', date: '2025-01-08 09:15', by: 'Admin', from: '2025-01-15', to: '2025-01-16' },
      { id: 3, type: 'date_change', date: '2025-01-05 11:00', by: 'John Kim', from: '2025-01-14', to: '2025-01-15' },
    ],
    2: [
      { id: 1, type: 'date_change', date: '2025-01-05 10:00', by: 'Admin', from: '2025-01-10', to: '2025-01-09' },
      { id: 2, type: 'assignee_change', date: '2025-01-03 15:20', by: 'Admin', from: 'John Kim', to: 'Sarah Lee' },
    ],
    3: [
      { id: 1, type: 'cancelled', date: '2024-12-28 09:00', by: 'Sarah Lee', from: 'Scheduled', to: 'Cancelled', reason: 'Holiday schedule conflict' },
      { id: 2, type: 'date_change', date: '2024-12-20 14:30', by: 'Admin', from: '2024-12-25', to: '2025-01-02' },
      { id: 3, type: 'assignee_change', date: '2024-12-18 10:15', by: 'Admin', from: 'Mike Park', to: 'John Kim' },
    ],
    4: [
      { id: 1, type: 'assignee_change', date: '2024-12-22 16:45', by: 'Admin', from: 'John Kim', to: 'Sarah Lee' },
    ],
    5: [
      { id: 1, type: 'date_change', date: '2024-12-15 11:30', by: 'Sarah Lee', from: '2024-12-18', to: '2024-12-19' },
      { id: 2, type: 'cancelled', date: '2024-12-14 09:00', by: 'Admin', from: 'Scheduled', to: 'Rescheduled', reason: 'Inspector unavailable' },
      { id: 3, type: 'assignee_change', date: '2024-12-10 14:00', by: 'Admin', from: 'Emily Choi', to: 'John Kim' },
    ],
    6: [],
  };

  const scrollSchedule = (direction: 'left' | 'right') => {
    if (scheduleScrollRef.current) {
      const scrollAmount = 300;
      scheduleScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };
  const [editedScheduleResults, setEditedScheduleResults] = useState<Record<number, typeof test.schedule[0]['testResults']>>({});

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
    const currentSchedule = test.schedule.find(s => s.id === selectedSchedule);
    if (!currentSchedule?.testResults) return;
    
    const currentResults = editedScheduleResults[selectedSchedule] || currentSchedule.testResults;
    const updatedResults = currentResults.map(item => 
      item.id === itemId ? { ...item, answer: newAnswer } : item
    );
    setEditedScheduleResults(prev => ({
      ...prev,
      [selectedSchedule]: updatedResults
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const startEditing = () => {
    const currentSchedule = test.schedule.find(s => s.id === selectedSchedule);
    if (currentSchedule?.testResults && !editedScheduleResults[selectedSchedule]) {
      setEditedScheduleResults(prev => ({
        ...prev,
        [selectedSchedule]: [...currentSchedule.testResults]
      }));
    }
    setIsEditing(true);
  };

  const getCurrentTestResults = () => {
    const currentSchedule = test.schedule.find(s => s.id === selectedSchedule);
    if (!currentSchedule?.testResults) return editedItems;
    return editedScheduleResults[selectedSchedule] || currentSchedule.testResults;
  };

  const getAnswerIcon = (answerType: string) => {
    if (answerType === "multiple_choice") return <List className="w-4 h-4" />;
    if (answerType === "text") return <MessageSquare className="w-4 h-4" />;
    return <CheckSquare className="w-4 h-4" />;
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden" data-testid="test-detail-page">
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
        <main className="flex-1 overflow-y-auto min-w-0">
        <div className="p-4 md:p-6 lg:p-8">
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 text-slate-600 hover:text-slate-900"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
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
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
              <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold text-slate-800">{test.testName}</h1>
                <Link href={`/qa-report/edit/${testId}`}>
                  <Button variant="outline" className="gap-2 border-blue-300 text-blue-600 hover:bg-blue-50">
                    <Edit3 className="w-4 h-4" />
                    Edit Test
                  </Button>
                </Link>
              </div>
            </div>

            <div className="px-6 py-4">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
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
                  <p className="text-xs text-slate-500 mb-1">Schedule Period</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    <p className="font-medium text-slate-800 text-sm">{test.startDate} ~ {test.endDate}</p>
                  </div>
                </div>
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-xs text-slate-500 mb-1">Last Inspection</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    <p className="font-medium text-slate-800">{test.lastInspection}</p>
                  </div>
                </div>
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-xs text-slate-500 mb-1">Next Inspection</p>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    <p className="font-medium text-slate-800">{test.nextInspection}</p>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <div className="flex items-center gap-4 mb-2">
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

                <div className="flex items-center gap-2">
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
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mt-6"
          >
            <div className="p-6">
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <h3 className="text-sm font-medium text-slate-700 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      Inspection Schedule / History
                    </h3>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => scrollSchedule('left')}
                        className="w-7 h-7 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-full flex items-center justify-center text-slate-600 hover:text-slate-800 transition-colors"
                        data-testid="schedule-scroll-left"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => scrollSchedule('right')}
                        className="w-7 h-7 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-full flex items-center justify-center text-slate-600 hover:text-slate-800 transition-colors"
                        data-testid="schedule-scroll-right"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">Filter:</span>
                    <input
                      type="date"
                      value={scheduleFilterFrom}
                      onChange={(e) => setScheduleFilterFrom(e.target.value)}
                      placeholder="YYYY-MM-DD"
                      lang="en"
                      className="px-2 py-1.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-700 bg-white"
                      data-testid="schedule-filter-from"
                    />
                    <span className="text-slate-400">~</span>
                    <input
                      type="date"
                      value={scheduleFilterTo}
                      onChange={(e) => setScheduleFilterTo(e.target.value)}
                      placeholder="YYYY-MM-DD"
                      lang="en"
                      className="px-2 py-1.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-700 bg-white"
                      data-testid="schedule-filter-to"
                    />
                    {(scheduleFilterFrom || scheduleFilterTo) && (
                      <button
                        onClick={() => { setScheduleFilterFrom(""); setScheduleFilterTo(""); }}
                        className="text-xs text-slate-500 hover:text-slate-700 px-2 py-1 rounded hover:bg-slate-100"
                      >
                        Reset
                      </button>
                    )}
                  </div>
                </div>
                
                <div ref={scheduleScrollRef} className="flex gap-2 overflow-x-auto pb-3 mb-4 scrollbar-hide relative z-20" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} data-testid="schedule-dates">
                  {test.schedule.filter(item => {
                    if (!scheduleFilterFrom && !scheduleFilterTo) return true;
                    const itemDate = new Date(item.date);
                    const fromDate = scheduleFilterFrom ? new Date(scheduleFilterFrom) : null;
                    const toDate = scheduleFilterTo ? new Date(scheduleFilterTo) : null;
                    if (fromDate && toDate) return itemDate >= fromDate && itemDate <= toDate;
                    if (fromDate) return itemDate >= fromDate;
                    if (toDate) return itemDate <= toDate;
                    return true;
                  }).map((item) => {
                    const normalCount = item.testResults?.filter(r => r.answer === "O").length || 0;
                    const abnormalCount = item.testResults?.filter(r => r.answer === "X").length || 0;
                    return (
                      <div key={item.id} className="relative flex-shrink-0">
                        <button
                          onClick={() => setSelectedSchedule(item.id)}
                          className={`px-5 py-3 rounded-lg border transition-all min-w-[140px] h-[90px] flex flex-col justify-center ${
                            selectedSchedule === item.id 
                              ? item.status === "cancelled" 
                                ? "bg-red-500 text-white border-red-500 shadow-lg"
                                : "bg-blue-600 text-white border-blue-600 shadow-lg" 
                              : item.status === "cancelled"
                                ? "bg-red-50 text-slate-700 border-red-200 hover:border-red-300 hover:bg-red-100"
                                : "bg-white text-slate-700 border-slate-200 hover:border-blue-300 hover:bg-blue-50"
                          }`}
                          data-testid={`schedule-date-${item.id}`}
                        >
                          <div className="text-center w-full">
                            <div className={`text-sm font-semibold ${selectedSchedule === item.id ? "text-white" : "text-slate-800"}`}>
                              {item.date}
                            </div>
                            <div className="flex items-center gap-1.5 mt-1 justify-center">
                              <span className={`w-1.5 h-1.5 rounded-full ${
                                item.status === "completed" ? "bg-emerald-400" :
                                item.status === "in_progress" ? "bg-blue-400 animate-pulse" :
                                item.status === "cancelled" ? "bg-red-400" :
                                "bg-slate-400"
                              }`} />
                              <span className={`text-xs ${selectedSchedule === item.id ? "text-blue-100" : "text-slate-500"}`}>
                                {item.assignee.split(" ")[0]}
                              </span>
                            </div>
                            {item.status === "completed" ? (
                              <div className={`flex items-center gap-2 mt-2 text-xs justify-center ${selectedSchedule === item.id ? "text-blue-100" : ""}`}>
                                <span className={`flex items-center gap-1 ${selectedSchedule === item.id ? "text-emerald-200" : "text-emerald-600"}`}>
                                  <CheckCircle className="w-3 h-3" />
                                  {normalCount}
                                </span>
                                <span className={`flex items-center gap-1 ${selectedSchedule === item.id ? "text-red-200" : "text-red-500"}`}>
                                  <XCircle className="w-3 h-3" />
                                  {abnormalCount}
                                </span>
                              </div>
                            ) : (
                              <div className={`mt-2 text-xs ${
                                item.status === "cancelled" 
                                  ? (selectedSchedule === item.id ? "text-red-200" : "text-red-400")
                                  : (selectedSchedule === item.id ? "text-blue-200" : "text-slate-400")
                              }`}>
                                {item.status === "in_progress" ? "In Progress" : item.status === "cancelled" ? "Cancelled" : "Pending"}
                              </div>
                            )}
                          </div>
                        </button>
                        <div className="absolute top-0 right-0">
                          <button
                            onClick={(e) => { 
                              e.stopPropagation(); 
                              if (scheduleMenuOpen === item.id) {
                                setScheduleMenuOpen(null);
                                setMenuPosition(null);
                              } else {
                                const rect = e.currentTarget.getBoundingClientRect();
                                setMenuPosition({ top: rect.bottom + 4, left: rect.right - 160 });
                                setScheduleMenuOpen(item.id);
                              }
                            }}
                            className={`p-2 rounded hover:bg-black/10 ${selectedSchedule === item.id ? "text-white/70 hover:text-white" : "text-slate-400 hover:text-slate-600"}`}
                          >
                            <MoreVertical className="w-5 h-5" />
                          </button>
                          {scheduleMenuOpen === item.id && menuPosition && (
                            <>
                              <div 
                                className="fixed inset-0"
                                style={{ zIndex: 9998 }}
                                onClick={(e) => { e.stopPropagation(); setScheduleMenuOpen(null); setMenuPosition(null); }}
                              />
                              <div 
                                className="fixed bg-white rounded-lg shadow-xl border border-slate-200 py-1 min-w-[160px]"
                                style={{ zIndex: 9999, top: menuPosition.top, left: menuPosition.left }}
                              >
                              {item.status !== "completed" && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setEditScheduleDate(item.date);
                                    setEditScheduleAssignee(item.assignee);
                                    setEditScheduleModal(item.id);
                                    setScheduleMenuOpen(null);
                                  }}
                                  className="w-full px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-100 flex items-center gap-2"
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                  Edit Schedule
                                </button>
                              )}
                              <button
                                onClick={(e) => { e.stopPropagation(); setHistoryModal(item.id); setScheduleMenuOpen(null); }}
                                className="w-full px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-100 flex items-center gap-2"
                              >
                                <Clock className="w-3.5 h-3.5" />
                                View History
                              </button>
                            </div>
                            </>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {(() => {
                  const selected = test.schedule.find(s => s.id === selectedSchedule);
                  if (!selected) return null;
                  return (
                    <motion.div
                      key={selectedSchedule}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-slate-50 rounded-xl p-5 border border-slate-200"
                      data-testid="schedule-detail"
                    >
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Assignee</p>
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xs font-medium text-white">
                              {selected.assignee.split(" ").map(n => n[0]).join("")}
                            </div>
                            <span className="font-medium text-slate-800">{selected.assignee}</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Status</p>
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                            selected.status === "completed" ? "bg-emerald-100 text-emerald-700" :
                            selected.status === "in_progress" ? "bg-blue-100 text-blue-700" :
                            selected.status === "cancelled" ? "bg-red-100 text-red-700" :
                            "bg-slate-200 text-slate-600"
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${
                              selected.status === "completed" ? "bg-emerald-500" :
                              selected.status === "in_progress" ? "bg-blue-500 animate-pulse" :
                              selected.status === "cancelled" ? "bg-red-500" :
                              "bg-slate-400"
                            }`} />
                            {selected.status === "completed" ? "Completed" : selected.status === "in_progress" ? "In Progress" : selected.status === "cancelled" ? "Cancelled" : "Pending"}
                          </span>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Start Time</p>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-slate-400" />
                            <span className="font-medium text-slate-800">{selected.startTime || "—"}</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 mb-1">End Time</p>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-slate-400" />
                            <span className="font-medium text-slate-800">{selected.endTime || "—"}</span>
                          </div>
                        </div>
                      </div>
                      {selected.status === "cancelled" && selected.cancelReason && (
                        <div className="mt-4 pt-4 border-t border-red-200 bg-red-50 -mx-5 px-5 -mb-5 pb-5 rounded-b-xl">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                              <XCircle className="w-4 h-4 text-red-600" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-red-800">Cancellation Reason</p>
                              <p className="text-sm text-red-700 mt-1">{selected.cancelReason}</p>
                              {selected.cancelledAt && (
                                <p className="text-xs text-red-500 mt-2">
                                  Cancelled by {selected.cancelledBy || "System"} on {selected.cancelledAt}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                      {(selected.duration || selected.notes) && (
                        <div className="mt-4 pt-4 border-t border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-4">
                          {selected.duration && (
                            <div>
                              <p className="text-xs text-slate-500 mb-1">Duration</p>
                              <span className="font-medium text-slate-800">{selected.duration}</span>
                            </div>
                          )}
                          {selected.notes && (
                            <div>
                              <p className="text-xs text-slate-500 mb-1">Notes</p>
                              <span className="text-slate-700">{selected.notes}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </motion.div>
                  );
                })()}
              </div>

              <div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                  <h3 className="text-sm font-medium text-slate-700">Test Items ({test.step} steps)</h3>
                  <div className="flex gap-2 flex-shrink-0">
                    {isEditing ? (
                      <Button size="sm" onClick={handleSave} className="bg-emerald-500 hover:bg-emerald-600 text-white" data-testid="save-test-results">
                        <Save className="w-4 h-4 mr-1" />
                        Save
                      </Button>
                    ) : (
                      <Button size="sm" variant="outline" onClick={startEditing} className="border-blue-300 text-blue-600 hover:bg-blue-50" data-testid="edit-test-results">
                        <Edit3 className="w-4 h-4 mr-1" />
                        Edit Results
                      </Button>
                    )}
                  </div>
                </div>
                <div className="space-y-4">
                  {getCurrentTestResults().map((item, index) => (
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
                                <div>
                                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium ${
                                    item.answer === "O" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                                  }`}>
                                    {item.answer === "O" ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                                    {item.answer}
                                  </span>
                                  {item.answer === "X" && (
                                    <div className="mt-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                                      <div className="flex items-center justify-between mb-3">
                                        <span className="text-sm font-medium text-amber-800">Error Action Status</span>
                                        <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${
                                          item.isResolved ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                                        }`}>
                                          {item.isResolved ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                                          {item.isResolved ? "Resolved" : "Pending"}
                                        </span>
                                      </div>
                                      <div>
                                        <p className="text-xs text-amber-600 mb-1">Action Note</p>
                                        <p className="text-sm text-amber-900">{item.actionNote || "No action note provided."}</p>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}
                              {item.answerType === "multiple_choice" && item.options && (
                                <div className="space-y-2">
                                  {item.options.map((option, optIdx) => (
                                    <div
                                      key={optIdx}
                                      className={`px-4 py-2 rounded-lg ${
                                        item.answer === option 
                                          ? "bg-blue-500 text-white font-medium" 
                                          : "bg-slate-100 text-slate-500"
                                      }`}
                                    >
                                      {option}
                                    </div>
                                  ))}
                                </div>
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

        {editScheduleModal !== null && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setEditScheduleModal(null)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6 border-b border-slate-200">
                <h3 className="text-lg font-semibold text-slate-800">Edit Schedule</h3>
                <p className="text-sm text-slate-500 mt-1">Select what you want to change</p>
              </div>
              
              <div className="p-6 space-y-4">
                {/* Radio options */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700 mb-3">Edit Type</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setEditScheduleType('date')}
                      className={`px-3 py-2.5 rounded-lg border text-sm font-medium transition-all flex flex-col items-center gap-1 ${
                        editScheduleType === 'date' 
                          ? 'bg-blue-50 border-blue-500 text-blue-700' 
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <Calendar className="w-4 h-4" />
                      Change Date
                    </button>
                    <button
                      onClick={() => setEditScheduleType('assignee')}
                      className={`px-3 py-2.5 rounded-lg border text-sm font-medium transition-all flex flex-col items-center gap-1 ${
                        editScheduleType === 'assignee' 
                          ? 'bg-blue-50 border-blue-500 text-blue-700' 
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <User className="w-4 h-4" />
                      Change Assignee
                    </button>
                    <button
                      onClick={() => setEditScheduleType('cancel')}
                      className={`px-3 py-2.5 rounded-lg border text-sm font-medium transition-all flex flex-col items-center gap-1 ${
                        editScheduleType === 'cancel' 
                          ? 'bg-red-50 border-red-500 text-red-700' 
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <Trash2 className="w-4 h-4" />
                      Cancel
                    </button>
                  </div>
                </div>

                {/* Date change section */}
                {editScheduleType === 'date' && (
                  <div className="pt-4 border-t border-slate-100">
                    <label className="block text-sm font-medium text-slate-700 mb-2">New Date</label>
                    <Input
                      type="date"
                      value={editScheduleDate}
                      onChange={(e) => setEditScheduleDate(e.target.value)}
                      data-testid="edit-schedule-date"
                    />
                  </div>
                )}

                {/* Assignee change section */}
                {editScheduleType === 'assignee' && (
                  <div className="pt-4 border-t border-slate-100">
                    <label className="block text-sm font-medium text-slate-700 mb-2">New Assignee</label>
                    <select
                      value={editScheduleAssignee}
                      onChange={(e) => setEditScheduleAssignee(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      data-testid="edit-schedule-assignee"
                    >
                      {test.inspectors.map((inspector) => (
                        <option key={inspector} value={inspector}>{inspector}</option>
                      ))}
                      <option value="John Kim">John Kim</option>
                      <option value="Sarah Lee">Sarah Lee</option>
                      <option value="Mike Park">Mike Park</option>
                      <option value="Emily Choi">Emily Choi</option>
                      <option value="David Jung">David Jung</option>
                    </select>
                  </div>
                )}

                {/* Cancel schedule section */}
                {editScheduleType === 'cancel' && (
                  <div className="pt-4 border-t border-slate-100 space-y-4">
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm font-medium text-red-700 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        Cancel Schedule
                      </p>
                      <p className="text-xs text-red-600 mt-1">This action will cancel the scheduled inspection.</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Reason for Cancellation <span className="text-red-500">*</span></label>
                      <Textarea
                        value={cancelScheduleReason}
                        onChange={(e) => setCancelScheduleReason(e.target.value)}
                        placeholder="Please provide a reason for cancelling this schedule..."
                        rows={3}
                        data-testid="cancel-schedule-reason"
                      />
                    </div>
                  </div>
                )}
              </div>
              
              <div className="p-4 border-t border-slate-200 flex justify-end gap-2 bg-slate-50 rounded-b-xl">
                <Button variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-100" onClick={() => { setEditScheduleModal(null); setEditScheduleType('date'); setCancelScheduleReason(""); }}>
                  Close
                </Button>
                {editScheduleType === 'cancel' ? (
                  <Button 
                    className="bg-red-600 hover:bg-red-700" 
                    onClick={() => { setEditScheduleModal(null); setEditScheduleType('date'); setCancelScheduleReason(""); }}
                    disabled={!cancelScheduleReason.trim()}
                  >
                    Confirm Cancel
                  </Button>
                ) : (
                  <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => { setEditScheduleModal(null); setEditScheduleType('date'); }}>
                    Save Changes
                  </Button>
                )}
              </div>
            </motion.div>
          </div>
        )}

        {historyModal !== null && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setHistoryModal(null)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6 border-b border-slate-200">
                <h3 className="text-lg font-semibold text-slate-800">Schedule History</h3>
                <p className="text-sm text-slate-500 mt-1">
                  {test.schedule.find(s => s.id === historyModal)?.date || ''} - View all changes made to this schedule
                </p>
              </div>
              
              <div className="p-6">
                {(scheduleHistory[historyModal] || []).length === 0 ? (
                  <div className="text-center py-8 text-slate-400">
                    <Clock className="w-10 h-10 mx-auto mb-3 opacity-50" />
                    <p className="text-sm font-medium">No changes recorded</p>
                    <p className="text-xs mt-1">This schedule has no modification history</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[300px] overflow-y-auto">
                    {(scheduleHistory[historyModal] || []).map((entry) => (
                      <div key={entry.id} className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            {entry.type === 'date_change' && (
                              <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center">
                                <Calendar className="w-4 h-4 text-blue-600" />
                              </div>
                            )}
                            {entry.type === 'assignee_change' && (
                              <div className="w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center">
                                <User className="w-4 h-4 text-purple-600" />
                              </div>
                            )}
                            {entry.type === 'cancelled' && (
                              <div className="w-7 h-7 rounded-full bg-red-100 flex items-center justify-center">
                                <Trash2 className="w-4 h-4 text-red-600" />
                              </div>
                            )}
                            <div>
                              <p className="text-sm font-medium text-slate-700">
                                {entry.type === 'date_change' && 'Date Changed'}
                                {entry.type === 'assignee_change' && 'Assignee Changed'}
                                {entry.type === 'cancelled' && 'Schedule Cancelled'}
                              </p>
                              <p className="text-xs text-slate-500">
                                {entry.from} → {entry.to}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-slate-400">{entry.date}</p>
                            <p className="text-xs text-slate-500">by {entry.by}</p>
                          </div>
                        </div>
                        {entry.reason && (
                          <p className="mt-2 text-xs text-slate-500 bg-white p-2 rounded border border-slate-100">
                            Reason: {entry.reason}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="p-4 border-t border-slate-200 flex justify-end bg-slate-50 rounded-b-xl">
                <Button variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-100" onClick={() => setHistoryModal(null)}>
                  Close
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
