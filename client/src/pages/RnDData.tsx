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

const rndProjects = [
  { id: 1, projectName: "AI-Powered Drug Discovery", company: "Samsung Biologics", department: "R&D Center", leadResearcher: "Dr. Kim Min-Soo", budget: "45.2B", startDate: "2023-03-15", endDate: "2026-03-14", status: "Active", progress: 65, fieldArea: "Biotechnology", patentsFilef: 12, fundingSource: "Government Grant" },
  { id: 2, projectName: "Next-Gen Battery Technology", company: "LG Energy Solution", department: "Advanced Materials Lab", leadResearcher: "Dr. Park Jae-Hyun", budget: "120.5B", startDate: "2022-01-01", endDate: "2025-12-31", status: "Active", progress: 78, fieldArea: "Energy Storage", patentsFilef: 28, fundingSource: "Private Investment" },
  { id: 3, projectName: "Autonomous Vehicle Sensors", company: "Hyundai Mobis", department: "Future Tech Division", leadResearcher: "Dr. Lee Soo-Jung", budget: "85.3B", startDate: "2023-06-01", endDate: "2027-05-31", status: "Active", progress: 42, fieldArea: "Automotive", patentsFilef: 8, fundingSource: "Corporate R&D" },
  { id: 4, projectName: "5G Network Optimization", company: "Samsung Electronics", department: "Network Solutions", leadResearcher: "Dr. Choi Young-Ho", budget: "62.8B", startDate: "2021-09-01", endDate: "2024-08-31", status: "Completed", progress: 100, fieldArea: "Telecommunications", patentsFilef: 35, fundingSource: "Government Grant" },
  { id: 5, projectName: "Quantum Computing Research", company: "SK Telecom", department: "Quantum Lab", leadResearcher: "Dr. Jung Hye-Won", budget: "98.7B", startDate: "2024-01-01", endDate: "2029-12-31", status: "Active", progress: 15, fieldArea: "Computing", patentsFilef: 3, fundingSource: "Joint Venture" },
  { id: 6, projectName: "Sustainable Packaging Materials", company: "CJ CheilJedang", department: "Green Tech", leadResearcher: "Dr. Han Seung-Min", budget: "28.4B", startDate: "2023-04-01", endDate: "2025-03-31", status: "Active", progress: 55, fieldArea: "Materials Science", patentsFilef: 6, fundingSource: "Corporate R&D" },
  { id: 7, projectName: "AR/VR Platform Development", company: "NAVER", department: "XR Division", leadResearcher: "Dr. Yoon Ji-Hye", budget: "55.2B", startDate: "2022-07-01", endDate: "2025-06-30", status: "Active", progress: 72, fieldArea: "Extended Reality", patentsFilef: 18, fundingSource: "Private Investment" },
  { id: 8, projectName: "Smart Factory IoT Systems", company: "POSCO Holdings", department: "Digital Innovation", leadResearcher: "Dr. Kang Dong-Wook", budget: "42.1B", startDate: "2023-02-01", endDate: "2025-01-31", status: "Active", progress: 68, fieldArea: "Industrial IoT", patentsFilef: 14, fundingSource: "Government Grant" },
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
          <li>
            <Link href="/qa-report" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${location === "/qa-report" ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white"}`}>
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

export default function RnDData() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredProjects = rndProjects.filter(project =>
    project.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.fieldArea.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-slate-50">
      <div className="hidden lg:block">
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

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
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
                  <p className="text-xs md:text-sm text-slate-500 mt-0.5 hidden sm:block">Research and Development project tracking</p>
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
                  <Beaker className="w-4 h-4 text-blue-500" />
                  Total Projects: <strong className="text-slate-800">{rndProjects.length}</strong>
                </span>
                <span className="w-px h-4 bg-slate-200" />
                <span className="flex items-center gap-2 text-slate-600">
                  <Target className="w-4 h-4 text-emerald-500" />
                  Active: <strong className="text-emerald-600">{rndProjects.filter(p => p.status === "Active").length}</strong>
                </span>
                <span className="w-px h-4 bg-slate-200" />
                <span className="flex items-center gap-2 text-slate-600">
                  <DollarSign className="w-4 h-4 text-purple-500" />
                  Total Budget: <strong className="text-slate-800">538.2B KRW</strong>
                </span>
                <span className="w-px h-4 bg-slate-200" />
                <span className="flex items-center gap-2 text-slate-600">
                  <Clock className="w-4 h-4 text-slate-400" />
                  Update Cycle: <strong className="text-slate-800">Weekly</strong>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Search projects, companies, or field areas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-slate-200"
                  data-testid="search-rnd"
                />
              </div>
              <Button variant="outline" className="gap-2">
                <Filter className="w-4 h-4" />
                Filters
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full" data-testid="rnd-table">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Project Name</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Company</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Field Area</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Lead Researcher</th>
                    <th className="text-right py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Budget</th>
                    <th className="text-center py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Progress</th>
                    <th className="text-center py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="text-center py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Patents</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedProjects.map((project) => (
                    <tr key={project.id} className="border-b border-slate-100 hover:bg-slate-50 cursor-pointer" data-testid={`rnd-row-${project.id}`}>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
                            <Lightbulb className="w-4 h-4 text-amber-600" />
                          </div>
                          <span className="font-medium text-slate-800">{project.projectName}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-sm text-slate-600">{project.company}</td>
                      <td className="py-4 px-4">
                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600">
                          {project.fieldArea}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-sm text-slate-600">{project.leadResearcher}</td>
                      <td className="py-4 px-4 text-right font-medium text-slate-800">{project.budget}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${project.progress === 100 ? 'bg-emerald-500' : 'bg-blue-500'}`}
                              style={{ width: `${project.progress}%` }}
                            />
                          </div>
                          <span className="text-xs text-slate-500 w-8">{project.progress}%</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          project.status === "Active" ? "bg-emerald-50 text-emerald-600" :
                          project.status === "Completed" ? "bg-blue-50 text-blue-600" :
                          "bg-slate-100 text-slate-500"
                        }`}>
                          {project.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center text-sm font-medium text-slate-800">{project.patentsFilef}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100">
              <p className="text-sm text-slate-500">
                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredProjects.length)} of {filteredProjects.length} projects
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
