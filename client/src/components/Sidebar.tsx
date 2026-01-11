import { useState, useEffect } from "react";
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
  ClipboardCheck,
  Lightbulb,
  UserCog,
} from "lucide-react";

const menuItems = [
  { id: "dashboard", name: "Dashboard", icon: LayoutDashboard, path: "/" },
  { id: "qa-report", name: "QA Report", icon: ClipboardCheck, path: "/qa-report" },
];

const dataMenuItems = [
  { id: "company-data", name: "Company Data", icon: Building2, path: "/data/company", status: "normal" },
  { id: "patent-data", name: "Patent Data", icon: FileText, path: "/data/patent", status: "normal" },
  { id: "paper-data", name: "Paper Data", icon: FileText, path: "/data/paper", status: "stopped" },
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

function getStoredMenuState(key: string, defaultValue: boolean): boolean {
  try {
    const stored = localStorage.getItem(`sidebar_${key}`);
    return stored !== null ? JSON.parse(stored) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function setStoredMenuState(key: string, value: boolean): void {
  try {
    localStorage.setItem(`sidebar_${key}`, JSON.stringify(value));
  } catch {}
}

export default function Sidebar() {
  const [location] = useLocation();
  const [dataMenuOpen, setDataMenuOpen] = useState(() => getStoredMenuState("dataMenu", false));
  const [serverMenuOpen, setServerMenuOpen] = useState(() => getStoredMenuState("serverMenu", false));

  useEffect(() => {
    setStoredMenuState("dataMenu", dataMenuOpen);
  }, [dataMenuOpen]);

  useEffect(() => {
    setStoredMenuState("serverMenu", serverMenuOpen);
  }, [serverMenuOpen]);

  return (
    <aside className="w-64 bg-slate-900 min-h-screen flex flex-col" data-testid="sidebar">
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10">
            <svg viewBox="0 0 40 40" className="w-full h-full">
              <defs>
                <linearGradient id="logoGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="50%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#06B6D4" />
                </linearGradient>
                <linearGradient id="logoGradient2" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#06B6D4" />
                  <stop offset="100%" stopColor="#3B82F6" />
                </linearGradient>
              </defs>
              <path
                d="M8 28 Q14 20 20 24 Q26 28 32 20"
                stroke="url(#logoGradient1)"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
                opacity="0.9"
              />
              <path
                d="M8 20 Q14 12 20 16 Q26 20 32 12"
                stroke="url(#logoGradient2)"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
                opacity="0.7"
              />
              <path
                d="M8 12 Q14 4 20 8 Q26 12 32 4"
                stroke="url(#logoGradient1)"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
                opacity="0.5"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">EM-Data</h1>
            <p className="text-xs text-slate-400 mt-0.5">Internal Monitoring</p>
          </div>
        </div>
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
              <span className="font-medium text-sm">Server Management</span>
            </div>
            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${serverMenuOpen ? "rotate-180" : ""}`} />
          </button>
          <motion.ul initial={false} animate={{ height: serverMenuOpen ? "auto" : 0, opacity: serverMenuOpen ? 1 : 0 }} transition={{ duration: 0.2 }} className="overflow-hidden ml-4 space-y-1">
            {serverMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location === item.path;
              return (
                <li key={item.id}>
                  <Link href={item.path} className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${isActive ? "bg-blue-600/20 text-blue-400" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}>
                    <Icon className={`w-4 h-4 ${item.color}`} strokeWidth={1.5} />
                    <span className="text-sm">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </motion.ul>
        </div>

        <div className="mt-2">
          <Link href="/settings" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${location.startsWith("/settings") ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}>
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
