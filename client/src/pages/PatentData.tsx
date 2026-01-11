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
  ChevronLeft,
  ChevronRight,
  Server,
  Cloud,
  Settings,
  User,
  Users,
  Shield,
  ClipboardCheck,
  Search,
  Download,
  Clock,
  Activity,
  Columns,
  Check,
  BookOpen,
  Lightbulb,
  UserCog,
  X,
  Menu,
} from "lucide-react";

type Patent = {
  id: number;
  title: string;
  applicant: string;
  applicationNo: string;
  applicationDate: string;
  status: string;
  ipcCode: string;
  country: string;
};
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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

const patents = [
  { id: 1, title: "AI-based Data Quality Assessment System", applicant: "Samsung Electronics", applicationNo: "10-2024-0012345", applicationDate: "2024-03-15", status: "Registered", ipcCode: "G06F 18/21", country: "KR" },
  { id: 2, title: "Blockchain-based Document Verification Method", applicant: "NAVER", applicationNo: "10-2024-0023456", applicationDate: "2024-04-22", status: "Published", ipcCode: "H04L 9/32", country: "KR" },
  { id: 3, title: "Machine Learning Model for Stock Prediction", applicant: "Kakao", applicationNo: "10-2024-0034567", applicationDate: "2024-05-10", status: "Under Review", ipcCode: "G06Q 40/04", country: "KR" },
  { id: 4, title: "Natural Language Processing Engine", applicant: "SK Hynix", applicationNo: "10-2024-0045678", applicationDate: "2024-06-01", status: "Registered", ipcCode: "G06F 40/20", country: "KR" },
  { id: 5, title: "IoT Sensor Data Aggregation System", applicant: "LG Electronics", applicationNo: "10-2024-0056789", applicationDate: "2024-07-18", status: "Published", ipcCode: "H04W 4/38", country: "KR" },
  { id: 6, title: "Cloud-based Real-time Analytics Platform", applicant: "Hyundai Motor", applicationNo: "10-2024-0067890", applicationDate: "2024-08-05", status: "Under Review", ipcCode: "G06F 16/27", country: "KR" },
  { id: 7, title: "Quantum Computing Algorithm for Optimization", applicant: "Samsung Electronics", applicationNo: "10-2024-0078901", applicationDate: "2024-09-12", status: "Filed", ipcCode: "G06N 10/00", country: "KR" },
  { id: 8, title: "Autonomous Vehicle Navigation System", applicant: "Hyundai Motor", applicationNo: "10-2024-0089012", applicationDate: "2024-10-20", status: "Filed", ipcCode: "G05D 1/02", country: "KR" },
];

function Sidebar() {
  const [location] = useLocation();
  const [dataMenuOpen, setDataMenuOpen] = useState(true);
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

export default function PatentData() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPatent, setSelectedPatent] = useState<Patent | null>(null);
  const [showColumnSelector, setShowColumnSelector] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState({
    applicant: true,
    applicationNo: true,
    applicationDate: true,
    ipcCode: true,
    country: true,
    status: true,
  });

  const columnLabels: Record<string, string> = {
    applicant: "Applicant",
    applicationNo: "Application No.",
    applicationDate: "App. Date",
    ipcCode: "IPC Code",
    country: "Country",
    status: "Status",
  };

  const toggleColumn = (col: string) => {
    setVisibleColumns(prev => ({ ...prev, [col]: !prev[col as keyof typeof prev] }));
  };

  const totalPatents = 125842;

  const filteredPatents = patents.filter((patent) => {
    const matchesSearch = patent.title.toLowerCase().includes(searchTerm.toLowerCase()) || patent.applicant.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "All" || patent.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

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
                  <h1 className="text-lg md:text-xl font-semibold tracking-tight text-slate-800 truncate">Patent Data</h1>
                  <p className="text-xs md:text-sm text-slate-500 mt-0.5 hidden sm:block">Intellectual property database</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="gap-2 border-slate-200 hover:bg-slate-50 text-slate-700" data-testid="export-button">
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export</span>
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6 bg-slate-50/50 overflow-x-hidden">
          <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="mb-6">
            <div className="flex items-center gap-8 py-4 px-6 bg-white rounded-xl border border-slate-100">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-purple-500" />
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wide">Total</p>
                  <p className="text-xl font-bold text-slate-800">{totalPatents.toLocaleString()}</p>
                </div>
              </div>
              <div className="w-px h-10 bg-slate-200" />
              <div className="flex items-center gap-3">
                <Activity className="w-5 h-5 text-emerald-500" />
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wide">Registered</p>
                  <p className="text-xl font-bold text-emerald-600">48,521</p>
                </div>
              </div>
              <div className="w-px h-10 bg-slate-200" />
              <div className="flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wide">This Month</p>
                  <p className="text-xl font-bold text-blue-600">+2,341</p>
                </div>
              </div>
              <div className="w-px h-10 bg-slate-200" />
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-cyan-500" />
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wide">Update Cycle</p>
                  <p className="text-xl font-bold text-slate-800">Weekly</p>
                </div>
              </div>
            </div>
          </motion.section>

          <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.3 }}>
            <div className="bg-white rounded-xl border border-slate-100">
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                <h2 className="text-sm font-medium text-slate-800">Patent Records</h2>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-9 w-48 h-9 border-slate-200 text-sm" data-testid="search-input" />
                  </div>
                  <div className="relative">
                    <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} className="pl-3 pr-8 py-2 h-9 border border-slate-200 rounded-lg text-sm bg-white text-slate-600 appearance-none cursor-pointer" data-testid="status-filter">
                      <option value="All">All Status</option>
                      <option value="Registered">Registered</option>
                      <option value="Published">Published</option>
                      <option value="Under Review">Under Review</option>
                      <option value="Filed">Filed</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                  <div className="relative">
                    <button
                      onClick={() => setShowColumnSelector(!showColumnSelector)}
                      className="flex items-center gap-2 px-3 h-9 border border-slate-200 rounded-lg text-sm bg-white text-slate-600 hover:bg-slate-50 transition-colors"
                      data-testid="column-selector-button"
                    >
                      <Columns className="w-4 h-4" />
                      Fields
                    </button>
                    {showColumnSelector && (
                      <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-10">
                        {Object.entries(columnLabels).map(([key, label]) => (
                          <button
                            key={key}
                            onClick={() => toggleColumn(key)}
                            className="flex items-center justify-between w-full px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
                          >
                            <span>{label}</span>
                            {visibleColumns[key as keyof typeof visibleColumns] && (
                              <Check className="w-4 h-4 text-blue-500" />
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full" data-testid="patent-table">
                  <thead>
                    <tr className="bg-slate-50/50">
                      <th className="text-left py-3 px-6 text-xs font-medium text-slate-400 uppercase tracking-wide">Patent Title</th>
                      {visibleColumns.applicant && <th className="text-left py-3 px-4 text-xs font-medium text-slate-400 uppercase tracking-wide">Applicant</th>}
                      {visibleColumns.applicationNo && <th className="text-left py-3 px-4 text-xs font-medium text-slate-400 uppercase tracking-wide">Application No.</th>}
                      {visibleColumns.applicationDate && <th className="text-left py-3 px-4 text-xs font-medium text-slate-400 uppercase tracking-wide">App. Date</th>}
                      {visibleColumns.ipcCode && <th className="text-left py-3 px-4 text-xs font-medium text-slate-400 uppercase tracking-wide">IPC Code</th>}
                      {visibleColumns.country && <th className="text-center py-3 px-4 text-xs font-medium text-slate-400 uppercase tracking-wide">Country</th>}
                      {visibleColumns.status && <th className="text-center py-3 px-4 text-xs font-medium text-slate-400 uppercase tracking-wide">Status</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPatents.map((patent) => (
                      <tr key={patent.id} onClick={() => setSelectedPatent(patent)} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors cursor-pointer" data-testid={`patent-row-${patent.id}`}>
                        <td className="py-3 px-6">
                          <span className="font-medium text-slate-800">{patent.title}</span>
                        </td>
                        {visibleColumns.applicant && <td className="py-3 px-4 text-sm text-slate-600">{patent.applicant}</td>}
                        {visibleColumns.applicationNo && <td className="py-3 px-4 text-sm font-mono text-slate-500">{patent.applicationNo}</td>}
                        {visibleColumns.applicationDate && <td className="py-3 px-4 text-sm text-slate-500">{patent.applicationDate}</td>}
                        {visibleColumns.ipcCode && <td className="py-3 px-4 text-sm font-mono text-slate-500">{patent.ipcCode}</td>}
                        {visibleColumns.country && (
                          <td className="py-3 px-4 text-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-blue-50 text-blue-600">{patent.country}</span>
                          </td>
                        )}
                        {visibleColumns.status && (
                          <td className="py-3 px-4 text-center">
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${
                              patent.status === "Registered" ? "text-emerald-600 bg-emerald-50" :
                              patent.status === "Published" ? "text-blue-600 bg-blue-50" :
                              patent.status === "Under Review" ? "text-amber-600 bg-amber-50" :
                              "text-slate-600 bg-slate-100"
                            }`}>
                              {patent.status}
                            </span>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100">
                <p className="text-xs text-slate-400">Showing {filteredPatents.length} of {totalPatents.toLocaleString()} patents</p>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} className="h-8 w-8 p-0">
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <span className="text-xs text-slate-500 px-2">Page {currentPage}</span>
                  <Button variant="ghost" size="sm" onClick={() => setCurrentPage(currentPage + 1)} className="h-8 w-8 p-0">
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.section>
        </main>
      </div>

      {selectedPatent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setSelectedPatent(null)}>
          <div className="flex items-center gap-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                const currentIndex = filteredPatents.findIndex(p => p.id === selectedPatent.id);
                if (currentIndex > 0) {
                  setSelectedPatent(filteredPatents[currentIndex - 1]);
                }
              }}
              disabled={filteredPatents.findIndex(p => p.id === selectedPatent.id) === 0}
              className="p-3 bg-white rounded-full shadow-lg hover:bg-slate-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              data-testid="prev-patent"
            >
              <ChevronLeft className="w-6 h-6 text-slate-600" />
            </button>
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden" onClick={(e) => e.stopPropagation()} style={{ width: '640px' }}>
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">{selectedPatent.title}</h3>
                  <p className="text-xs text-slate-400">{filteredPatents.findIndex(p => p.id === selectedPatent.id) + 1} / {filteredPatents.length}</p>
                </div>
                <button onClick={() => setSelectedPatent(null)} className="p-2 hover:bg-slate-200 rounded-lg transition-colors" data-testid="close-detail-modal">
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>
              <div className="overflow-y-auto max-h-[calc(80vh-60px)]">
                <table className="w-full text-sm">
                  <tbody>
                    <tr className="border-b border-slate-100">
                      <td className="py-2.5 px-6 text-slate-500 font-medium w-40 bg-slate-50">ID</td>
                      <td className="py-2.5 px-6 text-slate-800 font-mono">{selectedPatent.id}</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="py-2.5 px-6 text-slate-500 font-medium bg-slate-50">Title</td>
                      <td className="py-2.5 px-6 text-slate-800">{selectedPatent.title}</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="py-2.5 px-6 text-slate-500 font-medium bg-slate-50">Applicant</td>
                      <td className="py-2.5 px-6 text-slate-800">{selectedPatent.applicant}</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="py-2.5 px-6 text-slate-500 font-medium bg-slate-50">Application No.</td>
                      <td className="py-2.5 px-6 text-slate-800 font-mono">{selectedPatent.applicationNo}</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="py-2.5 px-6 text-slate-500 font-medium bg-slate-50">Application Date</td>
                      <td className="py-2.5 px-6 text-slate-800">{selectedPatent.applicationDate}</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="py-2.5 px-6 text-slate-500 font-medium bg-slate-50">IPC Code</td>
                      <td className="py-2.5 px-6 text-slate-800 font-mono">{selectedPatent.ipcCode}</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="py-2.5 px-6 text-slate-500 font-medium bg-slate-50">Country</td>
                      <td className="py-2.5 px-6 text-slate-800">{selectedPatent.country}</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-6 text-slate-500 font-medium bg-slate-50">Status</td>
                      <td className="py-2.5 px-6">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${
                          selectedPatent.status === "Registered" ? "text-emerald-600 bg-emerald-50" :
                          selectedPatent.status === "Published" ? "text-blue-600 bg-blue-50" :
                          selectedPatent.status === "Under Review" ? "text-amber-600 bg-amber-50" :
                          "text-slate-600 bg-slate-100"
                        }`}>
                          {selectedPatent.status}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                const currentIndex = filteredPatents.findIndex(p => p.id === selectedPatent.id);
                if (currentIndex < filteredPatents.length - 1) {
                  setSelectedPatent(filteredPatents[currentIndex + 1]);
                }
              }}
              disabled={filteredPatents.findIndex(p => p.id === selectedPatent.id) === filteredPatents.length - 1}
              className="p-3 bg-white rounded-full shadow-lg hover:bg-slate-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              data-testid="next-patent"
            >
              <ChevronRight className="w-6 h-6 text-slate-600" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
