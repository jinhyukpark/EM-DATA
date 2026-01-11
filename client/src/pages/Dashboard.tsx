import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "wouter";
import {
  FileText,
  BookOpen,
  Newspaper,
  TrendingUp,
  Building2,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  RefreshCw,
  LayoutDashboard,
  Database,
  ChevronDown,
  AlertTriangle,
  X,
  Bell,
  Server,
  Cloud,
  Settings,
  User,
  Users,
  Shield,
  ClipboardCheck,
  Lightbulb,
  UserCog,
  Maximize2,
  Menu,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

const dataTypes = [
  {
    id: "patent",
    name: "Patent",
    icon: FileText,
    total: 2847562,
    todayUpdate: 1247,
    yesterdayUpdate: 1189,
    color: "hsl(221, 83%, 53%)",
    glowClass: "glow-blue",
    bgGradient: "from-blue-500/15 to-blue-600/5",
  },
  {
    id: "paper",
    name: "Paper",
    icon: BookOpen,
    total: 1523847,
    todayUpdate: 892,
    yesterdayUpdate: 923,
    color: "hsl(152, 69%, 40%)",
    glowClass: "glow-green",
    bgGradient: "from-emerald-500/15 to-emerald-600/5",
  },
  {
    id: "news",
    name: "News",
    icon: Newspaper,
    total: 5847123,
    todayUpdate: 4521,
    yesterdayUpdate: 4102,
    color: "hsl(25, 95%, 53%)",
    glowClass: "glow-yellow",
    bgGradient: "from-orange-500/15 to-orange-600/5",
  },
  {
    id: "stock",
    name: "Stock Data",
    icon: TrendingUp,
    total: 892456,
    todayUpdate: 2847,
    yesterdayUpdate: 2901,
    color: "hsl(271, 76%, 53%)",
    glowClass: "glow-purple",
    bgGradient: "from-purple-500/15 to-purple-600/5",
  },
  {
    id: "company",
    name: "Audited Companies",
    icon: Building2,
    total: 34521,
    todayUpdate: 127,
    yesterdayUpdate: 98,
    color: "hsl(346, 77%, 50%)",
    glowClass: "glow-orange",
    bgGradient: "from-rose-500/15 to-rose-600/5",
  },
  {
    id: "rnd",
    name: "R&D Data",
    icon: Lightbulb,
    total: 156789,
    todayUpdate: 234,
    yesterdayUpdate: 198,
    color: "hsl(45, 93%, 47%)",
    glowClass: "glow-yellow",
    bgGradient: "from-amber-500/15 to-amber-600/5",
  },
  {
    id: "employment",
    name: "Employment",
    icon: UserCog,
    total: 87234,
    todayUpdate: 156,
    yesterdayUpdate: 142,
    color: "hsl(199, 89%, 48%)",
    glowClass: "glow-cyan",
    bgGradient: "from-cyan-500/15 to-cyan-600/5",
  },
];

const generateDailyData = () => {
  const data = [];
  const today = new Date();
  for (let i = 13; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    data.push({
      date: `${date.getMonth() + 1}/${date.getDate()}`,
      Patent: Math.floor(Math.random() * 500) + 1000,
      Paper: Math.floor(Math.random() * 400) + 700,
      News: Math.floor(Math.random() * 2000) + 3500,
      Stock: Math.floor(Math.random() * 1000) + 2500,
      Company: Math.floor(Math.random() * 50) + 80,
      RnD: Math.floor(Math.random() * 100) + 150,
      Employment: Math.floor(Math.random() * 80) + 100,
    });
  }
  return data;
};

const generateWeeklyData = () => {
  const data = [];
  for (let i = 11; i >= 0; i--) {
    data.push({
      date: `Week ${12 - i}`,
      Patent: Math.floor(Math.random() * 3000) + 7000,
      Paper: Math.floor(Math.random() * 2500) + 5000,
      News: Math.floor(Math.random() * 15000) + 25000,
      Stock: Math.floor(Math.random() * 8000) + 18000,
      Company: Math.floor(Math.random() * 300) + 500,
      RnD: Math.floor(Math.random() * 600) + 1000,
      Employment: Math.floor(Math.random() * 400) + 700,
    });
  }
  return data;
};

const generateMonthlyData = () => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return months.map((month) => ({
    date: month,
    Patent: Math.floor(Math.random() * 15000) + 30000,
    Paper: Math.floor(Math.random() * 10000) + 20000,
    News: Math.floor(Math.random() * 60000) + 100000,
    Stock: Math.floor(Math.random() * 30000) + 70000,
    Company: Math.floor(Math.random() * 1500) + 2500,
    RnD: Math.floor(Math.random() * 3000) + 5000,
    Employment: Math.floor(Math.random() * 2000) + 3000,
  }));
};

const generateYearlyData = () => {
  const years = ["2020", "2021", "2022", "2023", "2024", "2025"];
  return years.map((year) => ({
    date: year,
    Patent: Math.floor(Math.random() * 200000) + 400000,
    Paper: Math.floor(Math.random() * 150000) + 250000,
    News: Math.floor(Math.random() * 800000) + 1200000,
    Stock: Math.floor(Math.random() * 400000) + 800000,
    Company: Math.floor(Math.random() * 5000) + 30000,
    RnD: Math.floor(Math.random() * 30000) + 50000,
    Employment: Math.floor(Math.random() * 20000) + 30000,
  }));
};

const dailyData = generateDailyData();
const weeklyData = generateWeeklyData();
const monthlyData = generateMonthlyData();
const yearlyData = generateYearlyData();

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(2) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}

function StatCard({
  data,
  index,
}: {
  data: (typeof dataTypes)[0];
  index: number;
}) {
  const Icon = data.icon;
  const diff = data.todayUpdate - data.yesterdayUpdate;
  const diffPercent = ((diff / data.yesterdayUpdate) * 100).toFixed(1);
  const isPositive = diff >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="stat-card-light group"
      data-testid={`stat-card-${data.id}`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${data.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl`}
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div
            className="p-3 rounded-lg"
            style={{ backgroundColor: `${data.color}15` }}
          >
            <Icon
              className="w-6 h-6"
              style={{ color: data.color }}
              strokeWidth={1.5}
            />
          </div>
          <div
            className={`flex items-center gap-1 text-sm font-medium ${isPositive ? "text-emerald-600" : "text-red-500"}`}
          >
            {isPositive ? (
              <ArrowUpRight className="w-4 h-4" />
            ) : (
              <ArrowDownRight className="w-4 h-4" />
            )}
            <span data-testid={`diff-percent-${data.id}`}>{isPositive ? "+" : ""}{diffPercent}%</span>
          </div>
        </div>

        <h3 className="text-slate-500 text-sm font-medium mb-1">
          {data.name}
        </h3>
        <p
          className="text-3xl font-semibold tracking-tight text-slate-800 mb-4"
          data-testid={`total-count-${data.id}`}
        >
          {formatNumber(data.total)}
        </p>

        <div 
          className="flex items-center justify-between pt-4 mt-4 -mx-6 -mb-6 px-6 py-4 rounded-b-xl"
          style={{ backgroundColor: `${data.color}08` }}
        >
          <div>
            <p className="text-xs text-slate-400 mb-0.5">Today's Updates</p>
            <p
              className="text-lg font-semibold"
              style={{ color: data.color }}
              data-testid={`today-update-${data.id}`}
            >
              +{formatNumber(data.todayUpdate)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-400 mb-0.5">vs Yesterday</p>
            <p
              className={`text-lg font-semibold ${isPositive ? "text-emerald-600" : "text-red-500"}`}
              data-testid={`diff-count-${data.id}`}
            >
              {isPositive ? "+" : ""}
              {diff}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function DataSummaryCarousel() {
  const [currentPage, setCurrentPage] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(5);

  useEffect(() => {
    const updateCardsPerPage = () => {
      if (window.innerWidth < 640) {
        setCardsPerPage(1);
      } else if (window.innerWidth < 768) {
        setCardsPerPage(2);
      } else if (window.innerWidth < 1024) {
        setCardsPerPage(3);
      } else if (window.innerWidth < 1280) {
        setCardsPerPage(4);
      } else {
        setCardsPerPage(5);
      }
    };
    updateCardsPerPage();
    window.addEventListener("resize", updateCardsPerPage);
    return () => window.removeEventListener("resize", updateCardsPerPage);
  }, []);

  const totalPages = Math.ceil(dataTypes.length / cardsPerPage);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, 4000);
    return () => clearInterval(interval);
  }, [totalPages]);

  const displayCards = dataTypes.slice(
    currentPage * cardsPerPage,
    currentPage * cardsPerPage + cardsPerPage
  );

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            className="flex gap-4"
          >
            {displayCards.map((data, index) => {
              const Icon = data.icon;
              const diff = data.todayUpdate - data.yesterdayUpdate;
              const diffPercent = ((diff / data.yesterdayUpdate) * 100).toFixed(1);
              const isPositive = diff >= 0;
              const cardWidth = `calc((100% - ${(cardsPerPage - 1) * 16}px) / ${cardsPerPage})`;

              return (
                <div
                  key={`${data.id}-${currentPage}-${index}`}
                  className="stat-card-light group min-w-0 flex-shrink-0"
                  style={{ width: cardWidth }}
                  data-testid={`stat-card-${data.id}`}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${data.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl`}
                  />
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-3">
                      <div className="p-2.5 rounded-lg" style={{ backgroundColor: `${data.color}15` }}>
                        <Icon className="w-5 h-5" style={{ color: data.color }} strokeWidth={1.5} />
                      </div>
                      <div className={`flex items-center gap-1 text-xs font-medium ${isPositive ? "text-emerald-600" : "text-red-500"}`}>
                        {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                        <span>{isPositive ? "+" : ""}{diffPercent}%</span>
                      </div>
                    </div>
                    <h3 className="text-slate-500 text-xs font-medium mb-1 truncate">{data.name}</h3>
                    <p className="text-2xl font-semibold tracking-tight text-slate-800 mb-3">
                      {formatNumber(data.total)}
                    </p>
                    <div className="flex items-center justify-between pt-3 mt-3 -mx-5 -mb-5 px-5 py-3 rounded-b-xl" style={{ backgroundColor: `${data.color}08` }}>
                      <div>
                        <p className="text-[10px] text-slate-400 mb-0.5">Today</p>
                        <p className="text-sm font-semibold" style={{ color: data.color }}>+{formatNumber(data.todayUpdate)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-slate-400 mb-0.5">vs Yesterday</p>
                        <p className={`text-sm font-semibold ${isPositive ? "text-emerald-600" : "text-red-500"}`}>
                          {isPositive ? "+" : ""}{diff}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex justify-center mt-4 gap-2">
        {Array.from({ length: totalPages }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentPage(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${currentPage === idx ? "bg-blue-500 w-8" : "bg-slate-300 hover:bg-slate-400 w-2"}`}
            data-testid={`carousel-dot-${idx}`}
          />
        ))}
      </div>
    </div>
  );
}

const chartColors = {
  Patent: "hsl(221, 83%, 53%)",
  Paper: "hsl(152, 69%, 40%)",
  News: "hsl(25, 95%, 53%)",
  Stock: "hsl(271, 76%, 53%)",
  Company: "hsl(346, 77%, 50%)",
  RnD: "hsl(45, 93%, 47%)",
  Employment: "hsl(199, 89%, 48%)",
};

const alertMessages = [
  {
    id: 1,
    type: "error",
    title: "Data Collection Error",
    message: "Patent data collection failed at 14:32. Retrying in progress...",
    time: "2 hours ago",
  },
  {
    id: 2,
    type: "warning",
    title: "Delayed Update",
    message: "News data update is delayed by 30 minutes due to source API issues.",
    time: "45 minutes ago",
  },
];

const cloudServers = [
  {
    provider: "AWS",
    logo: "🔶",
    color: "hsl(30, 100%, 50%)",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    servers: [
      { name: "EC2 - Data Collector", status: "running", cpu: 45, memory: 62, region: "ap-northeast-2" },
      { name: "EC2 - API Server", status: "running", cpu: 32, memory: 48, region: "ap-northeast-2" },
      { name: "RDS - PostgreSQL", status: "running", cpu: 28, memory: 71, region: "ap-northeast-2" },
      { name: "Lambda - Scheduler", status: "running", cpu: 12, memory: 24, region: "ap-northeast-2" },
    ],
  },
  {
    provider: "GCP",
    logo: "🔵",
    color: "hsl(217, 91%, 60%)",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    servers: [
      { name: "GCE - ML Pipeline", status: "running", cpu: 78, memory: 85, region: "asia-northeast3" },
      { name: "Cloud SQL", status: "running", cpu: 35, memory: 52, region: "asia-northeast3" },
      { name: "Cloud Run - API", status: "warning", cpu: 92, memory: 88, region: "asia-northeast3" },
    ],
  },
  {
    provider: "NCloud",
    logo: "🟢",
    color: "hsl(145, 63%, 42%)",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    servers: [
      { name: "Server - Backup", status: "running", cpu: 15, memory: 34, region: "KR-1" },
      { name: "Server - Archive", status: "stopped", cpu: 0, memory: 0, region: "KR-1" },
      { name: "Cloud DB", status: "running", cpu: 22, memory: 45, region: "KR-2" },
    ],
  },
];

function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white rounded-lg p-3 shadow-lg border border-slate-100">
        <p className="text-sm font-medium text-slate-800 mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-slate-500">{entry.name}:</span>
            <span className="font-medium text-slate-700">{formatNumber(entry.value)}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
}

const menuItems = [
  {
    id: "dashboard",
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/",
  },
  {
    id: "qa-report",
    name: "QA Report",
    icon: ClipboardCheck,
    path: "/qa-report",
  },
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
  {
    id: "aws",
    name: "AWS",
    icon: Cloud,
    path: "/servers/aws",
    color: "text-orange-400",
  },
  {
    id: "gcp",
    name: "GCP",
    icon: Cloud,
    path: "/servers/gcp",
    color: "text-blue-400",
  },
  {
    id: "ncloud",
    name: "NCloud",
    icon: Cloud,
    path: "/servers/ncloud",
    color: "text-green-400",
  },
];

const settingsMenuItems = [
  {
    id: "profile",
    name: "Profile",
    icon: User,
    path: "/settings/profile",
  },
  {
    id: "users",
    name: "User Management",
    icon: Users,
    path: "/settings/users",
  },
  {
    id: "permissions",
    name: "Permission Management",
    icon: Shield,
    path: "/settings/permissions",
  },
];

function Sidebar() {
  const [location] = useLocation();
  const [dataMenuOpen, setDataMenuOpen] = useState(true);
  const [serverMenuOpen, setServerMenuOpen] = useState(true);
  const [settingsMenuOpen, setSettingsMenuOpen] = useState(false);

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
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
                opacity="0.5"
              />
              <circle cx="8" cy="28" r="2" fill="#3B82F6" />
              <circle cx="32" cy="4" r="2" fill="#06B6D4" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">EM-Data</h1>
            <p className="text-xs text-slate-400">Internal Monitoring</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.path;
            return (
              <li key={item.id}>
                <Link
                  href={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                  data-testid={`menu-${item.id}`}
                >
                  <Icon className="w-5 h-5" strokeWidth={1.5} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-6">
          <button
            onClick={() => setDataMenuOpen(!dataMenuOpen)}
            className="flex items-center justify-between w-full px-4 py-3 text-slate-400 hover:text-white transition-colors"
            data-testid="menu-data-toggle"
          >
            <div className="flex items-center gap-3">
              <Database className="w-5 h-5" strokeWidth={1.5} />
              <span className="font-medium text-sm">Internal Data</span>
            </div>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${dataMenuOpen ? "rotate-180" : ""}`}
            />
          </button>

          <motion.ul
            initial={false}
            animate={{ height: dataMenuOpen ? "auto" : 0, opacity: dataMenuOpen ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden ml-4 space-y-1"
          >
            {dataMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location === item.path;
              const statusColor = item.status === "normal" ? "bg-blue-500" : item.status === "error" ? "bg-red-500" : "bg-slate-500";
              return (
                <li key={item.id}>
                  <Link
                    href={item.path}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-blue-600/20 text-blue-400"
                        : "text-slate-400 hover:bg-slate-800 hover:text-white"
                    }`}
                    data-testid={`menu-${item.id}`}
                  >
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
          <button
            onClick={() => setServerMenuOpen(!serverMenuOpen)}
            className="flex items-center justify-between w-full px-4 py-3 text-slate-400 hover:text-white transition-colors"
            data-testid="menu-server-toggle"
          >
            <div className="flex items-center gap-3">
              <Server className="w-5 h-5" strokeWidth={1.5} />
              <span className="font-medium text-sm">Server Management</span>
            </div>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${serverMenuOpen ? "rotate-180" : ""}`}
            />
          </button>

          <motion.ul
            initial={false}
            animate={{ height: serverMenuOpen ? "auto" : 0, opacity: serverMenuOpen ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden ml-4 space-y-1"
          >
            {serverMenuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <Link
                    href={item.path}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-all duration-200"
                    data-testid={`menu-${item.id}`}
                  >
                    <Icon className={`w-4 h-4 ${item.color}`} strokeWidth={1.5} />
                    <span className="text-sm">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </motion.ul>
        </div>

        <div className="mt-2">
          <button
            onClick={() => setSettingsMenuOpen(!settingsMenuOpen)}
            className="flex items-center justify-between w-full px-4 py-3 text-slate-400 hover:text-white transition-colors"
            data-testid="menu-settings-toggle"
          >
            <div className="flex items-center gap-3">
              <Settings className="w-5 h-5" strokeWidth={1.5} />
              <span className="font-medium text-sm">Settings</span>
            </div>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${settingsMenuOpen ? "rotate-180" : ""}`}
            />
          </button>

          <motion.ul
            initial={false}
            animate={{ height: settingsMenuOpen ? "auto" : 0, opacity: settingsMenuOpen ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden ml-4 space-y-1"
          >
            {settingsMenuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <Link
                    href={item.path}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-all duration-200"
                    data-testid={`menu-${item.id}`}
                  >
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
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-medium">
            A
          </div>
          <div>
            <p className="text-sm font-medium text-white">Admin</p>
            <p className="text-xs text-slate-400">Administrator</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

function ServerStatusSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      className="mt-10"
    >
      <h2 className="text-base font-semibold text-slate-700 mb-6">
        Cloud Infrastructure Status
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {cloudServers.map((provider) => (
          <div
            key={provider.provider}
            className={`chart-container-light ${provider.borderColor} border`}
            data-testid={`server-status-${provider.provider.toLowerCase()}`}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">{provider.logo}</span>
              <h3 className="text-lg font-semibold text-slate-800">
                {provider.provider}
              </h3>
              <div className="ml-auto flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs text-slate-500">
                  {provider.servers.filter(s => s.status === "running").length}/{provider.servers.length} Online
                </span>
              </div>
            </div>
            <div className="space-y-3">
              {provider.servers.map((server, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-slate-50 border border-slate-100"
                  data-testid={`server-${provider.provider.toLowerCase()}-${idx}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700">
                      {server.name}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                        server.status === "running"
                          ? "bg-emerald-100 text-emerald-700"
                          : server.status === "warning"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-slate-200 text-slate-500"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          server.status === "running"
                            ? "bg-emerald-500"
                            : server.status === "warning"
                            ? "bg-amber-500 animate-pulse"
                            : "bg-slate-400"
                        }`}
                      />
                      {server.status === "running" ? "Running" : server.status === "warning" ? "Warning" : "Stopped"}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 mb-2">{server.region}</div>
                  {server.status !== "stopped" && (
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-slate-500">CPU</span>
                          <span className={`font-medium ${server.cpu > 80 ? "text-red-500" : "text-slate-700"}`}>
                            {server.cpu}%
                          </span>
                        </div>
                        <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${
                              server.cpu > 80
                                ? "bg-red-500"
                                : server.cpu > 60
                                ? "bg-amber-500"
                                : "bg-emerald-500"
                            }`}
                            style={{ width: `${server.cpu}%` }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-slate-500">Memory</span>
                          <span className={`font-medium ${server.memory > 80 ? "text-red-500" : "text-slate-700"}`}>
                            {server.memory}%
                          </span>
                        </div>
                        <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${
                              server.memory > 80
                                ? "bg-red-500"
                                : server.memory > 60
                                ? "bg-amber-500"
                                : "bg-emerald-500"
                            }`}
                            style={{ width: `${server.memory}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

function AlertBanner({ 
  alerts, 
  onDismiss, 
  dismissedIds 
}: { 
  alerts: typeof alertMessages; 
  onDismiss: (id: number) => void;
  dismissedIds: Set<number>;
}) {
  const visibleAlerts = alerts.filter(a => !dismissedIds.has(a.id));
  
  if (visibleAlerts.length === 0) return null;

  return (
    <div className="space-y-2 mb-0">
      <AnimatePresence>
        {visibleAlerts.map((alert) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10, height: 0, marginBottom: 0 }}
            transition={{ duration: 0.2 }}
            className={`flex items-center justify-between px-4 py-3 rounded-lg border ${
              alert.type === "error"
                ? "bg-red-50 border-red-200"
                : "bg-amber-50 border-amber-200"
            }`}
            data-testid={`alert-${alert.id}`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`p-1.5 rounded-full ${
                  alert.type === "error" ? "bg-red-100" : "bg-amber-100"
                }`}
              >
                <AlertTriangle
                  className={`w-4 h-4 ${
                    alert.type === "error" ? "text-red-600" : "text-amber-600"
                  }`}
                  strokeWidth={2}
                />
              </div>
              <div>
                <p
                  className={`text-sm font-medium ${
                    alert.type === "error" ? "text-red-800" : "text-amber-800"
                  }`}
                >
                  {alert.title}
                </p>
                <p
                  className={`text-sm ${
                    alert.type === "error" ? "text-red-600" : "text-amber-600"
                  }`}
                >
                  {alert.message}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`text-xs ${
                  alert.type === "error" ? "text-red-400" : "text-amber-400"
                }`}
              >
                {alert.time}
              </span>
              <button
                onClick={() => onDismiss(alert.id)}
                className={`p-1 rounded hover:bg-black/5 transition-colors ${
                  alert.type === "error" ? "text-red-400 hover:text-red-600" : "text-amber-400 hover:text-amber-600"
                }`}
                data-testid={`dismiss-alert-${alert.id}`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState("daily");
  const [dismissedAlerts, setDismissedAlerts] = useState<Set<number>>(new Set());
  const [showAlerts, setShowAlerts] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [expandedChart, setExpandedChart] = useState<"area" | "bar" | null>(null);
  const [dashboardConfig, setDashboardConfig] = useState({
    dataTypes: {
      patent: true,
      paper: true,
      news: true,
      stock: true,
      company: true,
      rnd: true,
      employment: true,
    },
    awsServices: {
      ec2: true,
      rds: true,
      s3: true,
      lambda: true,
      cloudwatch: true,
    },
    showTrendCharts: true,
    showCloudStatus: true,
  });

  const toggleDataType = (key: string) => {
    setDashboardConfig(prev => ({
      ...prev,
      dataTypes: {
        ...prev.dataTypes,
        [key]: !prev.dataTypes[key as keyof typeof prev.dataTypes],
      },
    }));
  };

  const toggleAwsService = (key: string) => {
    setDashboardConfig(prev => ({
      ...prev,
      awsServices: {
        ...prev.awsServices,
        [key]: !prev.awsServices[key as keyof typeof prev.awsServices],
      },
    }));
  };
  
  const now = new Date();
  const formattedDate = now.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const getChartData = () => {
    switch (timeRange) {
      case "daily":
        return dailyData;
      case "weekly":
        return weeklyData;
      case "monthly":
        return monthlyData;
      case "yearly":
        return yearlyData;
      default:
        return dailyData;
    }
  };

  const handleDismissAlert = (id: number) => {
    setDismissedAlerts(prev => new Set([...prev, id]));
  };

  const handleShowAllAlerts = () => {
    setDismissedAlerts(new Set());
    setShowAlerts(true);
  };

  const hiddenAlertCount = dismissedAlerts.size;
  const hasActiveAlerts = alertMessages.length > 0;

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
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 -ml-2 text-slate-600 hover:text-slate-900"
                  data-testid="mobile-menu-button"
                >
                  <Menu className="w-5 h-5" />
                </button>
                <div className="min-w-0">
                  <h1 className="text-lg md:text-xl font-semibold tracking-tight text-slate-800 truncate">
                    Dashboard
                  </h1>
                  <p className="text-xs md:text-sm text-slate-500 mt-0.5 hidden sm:block">
                    Monitor your data collection status at a glance
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
                <div className="hidden md:flex items-center gap-2 text-sm text-slate-500">
                  <Calendar className="w-4 h-4" />
                  <span data-testid="current-date">{formattedDate}</span>
                </div>
                {hasActiveAlerts && hiddenAlertCount > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleShowAllAlerts}
                    className="gap-2 border-red-200 hover:bg-red-50 text-red-600 relative"
                    data-testid="show-alerts-button"
                  >
                    <Bell className="w-4 h-4" />
                    <span>Alerts</span>
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {hiddenAlertCount}
                    </span>
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 border-slate-200 hover:bg-slate-50 text-slate-700"
                  data-testid="refresh-button"
                >
                  <RefreshCw className="w-4 h-4" />
                  Refresh
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowSettings(true)}
                  className="gap-2 border-slate-200 hover:bg-slate-50 text-slate-700"
                  data-testid="dashboard-settings-button"
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6 lg:p-8 bg-white overflow-y-auto overflow-x-hidden">
          {showAlerts && (
            <div className="mb-6">
              <AlertBanner
                alerts={alertMessages}
                onDismiss={handleDismissAlert}
                dismissedIds={dismissedAlerts}
              />
            </div>
          )}

          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <h2 className="text-base font-semibold mb-6 text-slate-700">
              Data Summary
            </h2>
            <DataSummaryCarousel />
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-base font-semibold text-slate-700">
                Collection Trends
              </h2>
              <Tabs
                value={timeRange}
                onValueChange={setTimeRange}
                className="w-auto"
              >
                <TabsList className="bg-slate-100 border border-slate-200">
                  <TabsTrigger
                    value="daily"
                    className="data-[state=active]:bg-white data-[state=active]:text-slate-800 data-[state=active]:shadow-sm text-slate-600"
                    data-testid="tab-daily"
                  >
                    Daily
                  </TabsTrigger>
                  <TabsTrigger
                    value="weekly"
                    className="data-[state=active]:bg-white data-[state=active]:text-slate-800 data-[state=active]:shadow-sm text-slate-600"
                    data-testid="tab-weekly"
                  >
                    Weekly
                  </TabsTrigger>
                  <TabsTrigger
                    value="monthly"
                    className="data-[state=active]:bg-white data-[state=active]:text-slate-800 data-[state=active]:shadow-sm text-slate-600"
                    data-testid="tab-monthly"
                  >
                    Monthly
                  </TabsTrigger>
                  <TabsTrigger
                    value="yearly"
                    className="data-[state=active]:bg-white data-[state=active]:text-slate-800 data-[state=active]:shadow-sm text-slate-600"
                    data-testid="tab-yearly"
                  >
                    Yearly
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <div className="chart-container-light" data-testid="area-chart">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-sm font-medium text-slate-500">
                    Cumulative Data Trends (Excluding News)
                  </h3>
                  <button
                    onClick={() => setExpandedChart("area")}
                    className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                    data-testid="expand-area-chart"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={getChartData()}>
                      <defs>
                        <linearGradient id="colorPatent" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={chartColors.Patent} stopOpacity={0.2} />
                          <stop offset="95%" stopColor={chartColors.Patent} stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorPaper" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={chartColors.Paper} stopOpacity={0.2} />
                          <stop offset="95%" stopColor={chartColors.Paper} stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorStock" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={chartColors.Stock} stopOpacity={0.2} />
                          <stop offset="95%" stopColor={chartColors.Stock} stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorRnD" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={chartColors.RnD} stopOpacity={0.2} />
                          <stop offset="95%" stopColor={chartColors.RnD} stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorEmployment" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={chartColors.Employment} stopOpacity={0.2} />
                          <stop offset="95%" stopColor={chartColors.Employment} stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                      <XAxis
                        dataKey="date"
                        stroke="rgba(0,0,0,0.3)"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        stroke="rgba(0,0,0,0.3)"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => formatNumber(value)}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Area
                        type="monotone"
                        dataKey="Patent"
                        stroke={chartColors.Patent}
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorPatent)"
                      />
                      <Area
                        type="monotone"
                        dataKey="Paper"
                        stroke={chartColors.Paper}
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorPaper)"
                      />
                      <Area
                        type="monotone"
                        dataKey="Stock"
                        stroke={chartColors.Stock}
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorStock)"
                      />
                      <Area
                        type="monotone"
                        dataKey="RnD"
                        stroke={chartColors.RnD}
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorRnD)"
                      />
                      <Area
                        type="monotone"
                        dataKey="Employment"
                        stroke={chartColors.Employment}
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorEmployment)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="chart-container-light" data-testid="bar-chart">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-sm font-medium text-slate-500">
                    Collection Volume by Data Type
                  </h3>
                  <button
                    onClick={() => setExpandedChart("bar")}
                    className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                    data-testid="expand-bar-chart"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={getChartData()}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                      <XAxis
                        dataKey="date"
                        stroke="rgba(0,0,0,0.3)"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        stroke="rgba(0,0,0,0.3)"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => formatNumber(value)}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend
                        wrapperStyle={{ paddingTop: "20px" }}
                        formatter={(value) => (
                          <span className="text-slate-500 text-sm">{value}</span>
                        )}
                      />
                      <Bar dataKey="Patent" fill={chartColors.Patent} radius={[4, 4, 0, 0]} />
                      <Bar dataKey="Paper" fill={chartColors.Paper} radius={[4, 4, 0, 0]} />
                      <Bar dataKey="News" fill={chartColors.News} radius={[4, 4, 0, 0]} />
                      <Bar dataKey="Stock" fill={chartColors.Stock} radius={[4, 4, 0, 0]} />
                      <Bar dataKey="Company" fill={chartColors.Company} radius={[4, 4, 0, 0]} />
                      <Bar dataKey="RnD" fill={chartColors.RnD} radius={[4, 4, 0, 0]} />
                      <Bar dataKey="Employment" fill={chartColors.Employment} radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </motion.section>

          <ServerStatusSection />

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-10"
          >
            <h2 className="text-base font-semibold text-slate-700 mb-6">
              Detailed Data Status
            </h2>
            <div className="chart-container-light overflow-x-auto">
              <table className="w-full" data-testid="data-table">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-4 px-4 text-sm font-medium text-slate-500">
                      Data Type
                    </th>
                    <th className="text-right py-4 px-4 text-sm font-medium text-slate-500">
                      Total Records
                    </th>
                    <th className="text-right py-4 px-4 text-sm font-medium text-slate-500">
                      Today's Updates
                    </th>
                    <th className="text-right py-4 px-4 text-sm font-medium text-slate-500">
                      Yesterday's Updates
                    </th>
                    <th className="text-right py-4 px-4 text-sm font-medium text-slate-500">
                      Change
                    </th>
                    <th className="text-right py-4 px-4 text-sm font-medium text-slate-500">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dataTypes.map((data) => {
                    const Icon = data.icon;
                    const diff = data.todayUpdate - data.yesterdayUpdate;
                    const isPositive = diff >= 0;
                    return (
                      <tr
                        key={data.id}
                        className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                        data-testid={`table-row-${data.id}`}
                      >
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div
                              className="p-2 rounded-lg"
                              style={{ backgroundColor: `${data.color}15` }}
                            >
                              <Icon
                                className="w-5 h-5"
                                style={{ color: data.color }}
                                strokeWidth={1.5}
                              />
                            </div>
                            <span className="font-medium text-slate-700">{data.name}</span>
                          </div>
                        </td>
                        <td className="text-right py-4 px-4 font-mono text-lg text-slate-800">
                          {data.total.toLocaleString()}
                        </td>
                        <td
                          className="text-right py-4 px-4 font-mono"
                          style={{ color: data.color }}
                        >
                          +{data.todayUpdate.toLocaleString()}
                        </td>
                        <td className="text-right py-4 px-4 font-mono text-slate-400">
                          +{data.yesterdayUpdate.toLocaleString()}
                        </td>
                        <td
                          className={`text-right py-4 px-4 font-mono ${isPositive ? "text-emerald-600" : "text-red-500"}`}
                        >
                          <div className="flex items-center justify-end gap-1">
                            {isPositive ? (
                              <ArrowUpRight className="w-4 h-4" />
                            ) : (
                              <ArrowDownRight className="w-4 h-4" />
                            )}
                            {isPositive ? "+" : ""}
                            {diff}
                          </div>
                        </td>
                        <td className="text-right py-4 px-4">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-600 border border-emerald-100">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Active
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.section>
        </main>
      </div>

      {expandedChart && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={() => setExpandedChart(null)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-xl shadow-2xl w-[70vw] max-h-[85vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
              <h3 className="text-lg font-semibold text-slate-800">
                {expandedChart === "area" ? "Cumulative Data Trends (Excluding News)" : "Collection Volume by Data Type"}
              </h3>
              <button
                onClick={() => setExpandedChart(null)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                data-testid="close-expanded-chart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="h-[70vh]">
                <ResponsiveContainer width="100%" height="100%">
                  {expandedChart === "area" ? (
                    <AreaChart data={getChartData()}>
                      <defs>
                        <linearGradient id="colorPatentExpanded" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={chartColors.Patent} stopOpacity={0.3} />
                          <stop offset="95%" stopColor={chartColors.Patent} stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorPaperExpanded" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={chartColors.Paper} stopOpacity={0.3} />
                          <stop offset="95%" stopColor={chartColors.Paper} stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorStockExpanded" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={chartColors.Stock} stopOpacity={0.3} />
                          <stop offset="95%" stopColor={chartColors.Stock} stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorRnDExpanded" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={chartColors.RnD} stopOpacity={0.3} />
                          <stop offset="95%" stopColor={chartColors.RnD} stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorEmploymentExpanded" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={chartColors.Employment} stopOpacity={0.3} />
                          <stop offset="95%" stopColor={chartColors.Employment} stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.08)" />
                      <XAxis dataKey="date" stroke="rgba(0,0,0,0.4)" fontSize={13} tickLine={false} axisLine={false} />
                      <YAxis stroke="rgba(0,0,0,0.4)" fontSize={13} tickLine={false} axisLine={false} tickFormatter={(value) => formatNumber(value)} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend verticalAlign="top" height={36} />
                      <Area type="monotone" dataKey="Patent" stroke={chartColors.Patent} strokeWidth={2.5} fillOpacity={1} fill="url(#colorPatentExpanded)" />
                      <Area type="monotone" dataKey="Paper" stroke={chartColors.Paper} strokeWidth={2.5} fillOpacity={1} fill="url(#colorPaperExpanded)" />
                      <Area type="monotone" dataKey="Stock" stroke={chartColors.Stock} strokeWidth={2.5} fillOpacity={1} fill="url(#colorStockExpanded)" />
                      <Area type="monotone" dataKey="RnD" stroke={chartColors.RnD} strokeWidth={2.5} fillOpacity={1} fill="url(#colorRnDExpanded)" />
                      <Area type="monotone" dataKey="Employment" stroke={chartColors.Employment} strokeWidth={2.5} fillOpacity={1} fill="url(#colorEmploymentExpanded)" />
                    </AreaChart>
                  ) : (
                    <BarChart data={getChartData()}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.08)" />
                      <XAxis dataKey="date" stroke="rgba(0,0,0,0.4)" fontSize={13} tickLine={false} axisLine={false} />
                      <YAxis stroke="rgba(0,0,0,0.4)" fontSize={13} tickLine={false} axisLine={false} tickFormatter={(value) => formatNumber(value)} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend verticalAlign="top" height={36} />
                      <Bar dataKey="Patent" fill={chartColors.Patent} radius={[4, 4, 0, 0]} />
                      <Bar dataKey="Paper" fill={chartColors.Paper} radius={[4, 4, 0, 0]} />
                      <Bar dataKey="News" fill={chartColors.News} radius={[4, 4, 0, 0]} />
                      <Bar dataKey="Stock" fill={chartColors.Stock} radius={[4, 4, 0, 0]} />
                      <Bar dataKey="Company" fill={chartColors.Company} radius={[4, 4, 0, 0]} />
                      <Bar dataKey="RnD" fill={chartColors.RnD} radius={[4, 4, 0, 0]} />
                      <Bar dataKey="Employment" fill={chartColors.Employment} radius={[4, 4, 0, 0]} />
                    </BarChart>
                  )}
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {showSettings && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowSettings(false)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl max-w-xl w-full mx-4 max-h-[85vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
              <div>
                <h3 className="text-lg font-semibold text-slate-800">Dashboard Settings</h3>
                <p className="text-sm text-slate-500">Configure what data to display</p>
              </div>
              <button onClick={() => setShowSettings(false)} className="p-2 hover:bg-slate-200 rounded-lg transition-colors" data-testid="close-settings">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(85vh-140px)]">
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-slate-800 mb-4 flex items-center gap-2">
                    <Database className="w-4 h-4 text-blue-500" />
                    Data Types to Display
                  </h4>
                  <div className="space-y-3">
                    {[
                      { key: "patent", label: "Patent Data", icon: FileText },
                      { key: "paper", label: "Paper Data", icon: BookOpen },
                      { key: "news", label: "News Data", icon: Newspaper },
                      { key: "stock", label: "Stock Data", icon: TrendingUp },
                      { key: "company", label: "Audited Companies", icon: Building2 },
                      { key: "rnd", label: "R&D Data", icon: Lightbulb },
                      { key: "employment", label: "Employment Data", icon: UserCog },
                    ].map(item => {
                      const Icon = item.icon;
                      const isEnabled = dashboardConfig.dataTypes[item.key as keyof typeof dashboardConfig.dataTypes];
                      return (
                        <div key={item.key} className="flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors">
                          <div className="flex items-center gap-3">
                            <Icon className="w-4 h-4 text-slate-500" />
                            <span className="text-sm font-medium text-slate-700">{item.label}</span>
                          </div>
                          <button
                            onClick={() => toggleDataType(item.key)}
                            className={`w-10 h-6 rounded-full transition-colors relative ${isEnabled ? 'bg-blue-600' : 'bg-slate-200'}`}
                            data-testid={`toggle-${item.key}`}
                          >
                            <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${isEnabled ? 'left-5' : 'left-1'}`} />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="border-t border-slate-200 pt-6">
                  <h4 className="text-sm font-semibold text-slate-800 mb-4 flex items-center gap-2">
                    <Cloud className="w-4 h-4 text-orange-500" />
                    AWS Services Analytics
                  </h4>
                  <div className="space-y-3">
                    {[
                      { key: "ec2", label: "EC2 Instances", description: "Virtual server metrics" },
                      { key: "rds", label: "RDS Databases", description: "Database performance" },
                      { key: "s3", label: "S3 Storage", description: "Object storage usage" },
                      { key: "lambda", label: "Lambda Functions", description: "Serverless execution" },
                      { key: "cloudwatch", label: "CloudWatch", description: "Monitoring & logs" },
                    ].map(item => {
                      const isEnabled = dashboardConfig.awsServices[item.key as keyof typeof dashboardConfig.awsServices];
                      return (
                        <div key={item.key} className="flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors">
                          <div>
                            <span className="text-sm font-medium text-slate-700">{item.label}</span>
                            <p className="text-xs text-slate-400">{item.description}</p>
                          </div>
                          <button
                            onClick={() => toggleAwsService(item.key)}
                            className={`w-10 h-6 rounded-full transition-colors relative ${isEnabled ? 'bg-orange-500' : 'bg-slate-200'}`}
                            data-testid={`toggle-aws-${item.key}`}
                          >
                            <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${isEnabled ? 'left-5' : 'left-1'}`} />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="border-t border-slate-200 pt-6">
                  <h4 className="text-sm font-semibold text-slate-800 mb-4">Display Options</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg border border-slate-200">
                      <span className="text-sm font-medium text-slate-700">Show Trend Charts</span>
                      <button
                        onClick={() => setDashboardConfig(prev => ({ ...prev, showTrendCharts: !prev.showTrendCharts }))}
                        className={`w-10 h-6 rounded-full transition-colors relative ${dashboardConfig.showTrendCharts ? 'bg-emerald-500' : 'bg-slate-200'}`}
                        data-testid="toggle-trend-charts"
                      >
                        <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${dashboardConfig.showTrendCharts ? 'left-5' : 'left-1'}`} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg border border-slate-200">
                      <span className="text-sm font-medium text-slate-700">Show Cloud Status</span>
                      <button
                        onClick={() => setDashboardConfig(prev => ({ ...prev, showCloudStatus: !prev.showCloudStatus }))}
                        className={`w-10 h-6 rounded-full transition-colors relative ${dashboardConfig.showCloudStatus ? 'bg-emerald-500' : 'bg-slate-200'}`}
                        data-testid="toggle-cloud-status"
                      >
                        <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${dashboardConfig.showCloudStatus ? 'left-5' : 'left-1'}`} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-200 bg-slate-50">
              <Button variant="outline" onClick={() => setShowSettings(false)}>Cancel</Button>
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setShowSettings(false)} data-testid="save-settings">
                Save Settings
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
