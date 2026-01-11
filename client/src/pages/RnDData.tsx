import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import {
  Building2,
  Search,
  Filter,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Database,
  FileText,
  TrendingUp,
  Newspaper,
  Server,
  Cloud,
  Download,
  Clock,
  Activity,
  BookOpen,
  Lightbulb,
  UserCog,
  Beaker,
  Target,
  DollarSign,
  Calendar,
  Users,
  Tag,
  ExternalLink,
  ClipboardCheck,
  Settings,
  User,
  Shield,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const employmentData = [
  { id: 1, employee: "Kim Ji-Hoon", type: "Entry", company: "Samsung Electronics", businessNo: "124-81-00998", department: "Semiconductor R&D", position: "Senior Engineer", date: "2025-01-08", previousReason: "From: SK Hynix" },
  { id: 2, employee: "Park Soo-Min", type: "Entry", company: "NAVER", businessNo: "220-81-62517", department: "AI Research", position: "ML Engineer", date: "2025-01-07", previousReason: "From: Kakao" },
  { id: 3, employee: "Lee Dong-Hyun", type: "Exit", company: "Hyundai Motor", businessNo: "101-81-10080", department: "EV Development", position: "Manager", date: "2025-01-06", previousReason: "Retirement" },
  { id: 4, employee: "Choi Ye-Jin", type: "Entry", company: "LG Energy Solution", businessNo: "110-81-79294", department: "Battery Engineering", position: "Team Lead", date: "2025-01-05", previousReason: "From: POSCO" },
  { id: 5, employee: "Jung Min-Woo", type: "Exit", company: "Kakao", businessNo: "120-88-00767", department: "Platform Development", position: "Staff Engineer", date: "2025-01-05", previousReason: "Personal Reasons" },
  { id: 6, employee: "Han Seo-Yeon", type: "Entry", company: "SK Telecom", businessNo: "104-81-24032", department: "5G Infrastructure", position: "Engineer", date: "2025-01-04", previousReason: "From: KT" },
  { id: 7, employee: "Yoon Tae-Hyung", type: "Exit", company: "Coupang", businessNo: "120-88-07573", department: "Logistics Tech", position: "Principal Engineer", date: "2025-01-03", previousReason: "Starting Own Business" },
  { id: 8, employee: "Kwon Na-Ri", type: "Entry", company: "Samsung SDI", businessNo: "201-81-58979", department: "Materials Research", position: "Researcher", date: "2025-01-03", previousReason: "From: Fresh Graduate" },
  { id: 9, employee: "Shin Jae-Won", type: "Entry", company: "NAVER", businessNo: "220-81-62517", department: "Cloud Platform", position: "DevOps Lead", date: "2025-01-02", previousReason: "From: Amazon Korea" },
  { id: 10, employee: "Lim Hye-Soo", type: "Exit", company: "KB Financial", businessNo: "201-81-46893", department: "Digital Banking", position: "VP", date: "2025-01-02", previousReason: "Competitor Offer" },
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

function Sidebar() {
  const [location] = useLocation();
  const [dataMenuOpen, setDataMenuOpen] = useState(location.startsWith("/data"));
  const [serverMenuOpen, setServerMenuOpen] = useState(location.startsWith("/servers"));

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
          <Link 
            href="/settings" 
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              location.startsWith("/settings") ? "bg-blue-600/20 text-blue-400" : "text-slate-400 hover:bg-slate-800 hover:text-white"
            }`}
          >
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

export default function RnDData() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState<"All" | "Entry" | "Exit">("All");
  const itemsPerPage = 10;

  const filteredData = employmentData.filter(record => {
    const matchesSearch = record.employee.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "All" || record.type === filterType;
    return matchesSearch && matchesType;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const entryCount = employmentData.filter(r => r.type === "Entry").length;
  const exitCount = employmentData.filter(r => r.type === "Exit").length;

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
                >
                  <Menu className="w-5 h-5" />
                </button>
                <div className="min-w-0">
                  <h1 className="text-lg md:text-xl font-semibold tracking-tight text-slate-800 truncate">R&D Data</h1>
                  <p className="text-xs md:text-sm text-slate-500 mt-0.5 hidden sm:block">Employment entry and exit tracking</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export</span>
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 p-8 bg-white">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center gap-3 px-1 py-3 mb-6 border-b border-slate-100">
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-2 text-slate-600">
                  <Users className="w-4 h-4 text-blue-500" />
                  Total Records: <strong className="text-slate-800">{employmentData.length}</strong>
                </span>
                <span className="w-px h-4 bg-slate-200" />
                <span className="flex items-center gap-2 text-slate-600">
                  <UserCog className="w-4 h-4 text-emerald-500" />
                  Entries: <strong className="text-emerald-600">{entryCount}</strong>
                </span>
                <span className="w-px h-4 bg-slate-200" />
                <span className="flex items-center gap-2 text-slate-600">
                  <UserCog className="w-4 h-4 text-red-500" />
                  Exits: <strong className="text-red-600">{exitCount}</strong>
                </span>
                <span className="w-px h-4 bg-slate-200" />
                <span className="flex items-center gap-2 text-slate-600">
                  <Clock className="w-4 h-4 text-slate-400" />
                  Update Cycle: <strong className="text-slate-800">Daily</strong>
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 mb-6">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Search employees, companies, or departments..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-slate-200"
                  data-testid="search-rnd"
                />
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center bg-slate-100 rounded-lg p-1">
                  {(["All", "Entry", "Exit"] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setFilterType(type)}
                      className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                        filterType === type
                          ? "bg-blue-600 text-white"
                          : "text-slate-600 hover:text-slate-800"
                      }`}
                      data-testid={`filter-${type.toLowerCase()}`}
                    >
                      {type === "Entry" && <span className="inline-flex items-center gap-1"><UserCog className="w-3 h-3" /> Entry</span>}
                      {type === "Exit" && <span className="inline-flex items-center gap-1"><UserCog className="w-3 h-3" /> Exit</span>}
                      {type === "All" && "All"}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full" data-testid="rnd-table">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Employee</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Type</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Company</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Department</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Position</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Previous/Reason</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((record) => (
                    <tr key={record.id} className="border-b border-slate-100 hover:bg-slate-50 cursor-pointer" data-testid={`rnd-row-${record.id}`}>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                            <UserCog className="w-4 h-4 text-slate-600" />
                          </div>
                          <span className="font-medium text-slate-800">{record.employee}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          record.type === "Entry" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                        }`}>
                          {record.type}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-sm text-slate-600">{record.company}</td>
                      <td className="py-4 px-4 text-sm text-slate-600">{record.department}</td>
                      <td className="py-4 px-4 text-sm text-slate-600">{record.position}</td>
                      <td className="py-4 px-4 text-sm text-slate-600">{record.date}</td>
                      <td className="py-4 px-4 text-sm text-slate-500">{record.previousReason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100">
              <p className="text-sm text-slate-500">
                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} records
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="text-sm text-slate-600 px-3">Page {currentPage} of {totalPages || 1}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages || totalPages === 0}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
