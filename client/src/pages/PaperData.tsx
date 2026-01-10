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
  BookOpen,
  Lightbulb,
  UserCog,
  Users,
  Award,
  Quote,
  Calendar,
  ExternalLink,
  ClipboardCheck,
  Settings,
  User,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const papers = [
  { id: 1, title: "Deep Learning for Autonomous Vehicle Navigation", authors: "Kim, J., Park, S., Lee, H.", journal: "Nature Machine Intelligence", year: 2024, citations: 245, institution: "KAIST", field: "AI/ML", doi: "10.1038/s42256-024-00123", status: "Published" },
  { id: 2, title: "Novel Battery Materials for Extended EV Range", authors: "Choi, M., Jung, Y., Han, K.", journal: "Science", year: 2024, citations: 189, institution: "Seoul National University", field: "Materials Science", doi: "10.1126/science.abcd1234", status: "Published" },
  { id: 3, title: "Quantum Computing Applications in Drug Discovery", authors: "Lee, S., Kim, D., Park, J.", journal: "Nature Chemistry", year: 2024, citations: 156, institution: "POSTECH", field: "Quantum Computing", doi: "10.1038/s41557-024-00456", status: "Published" },
  { id: 4, title: "5G Network Optimization Using Machine Learning", authors: "Park, H., Yoon, T., Shin, M.", journal: "IEEE Communications", year: 2024, citations: 98, institution: "Samsung Research", field: "Telecommunications", doi: "10.1109/TCOMM.2024.1234", status: "Published" },
  { id: 5, title: "Sustainable Bioplastics from Agricultural Waste", authors: "Han, S., Kwon, N., Lim, H.", journal: "Green Chemistry", year: 2025, citations: 12, institution: "Korea University", field: "Green Chemistry", doi: "10.1039/d5gc00123a", status: "Published" },
  { id: 6, title: "Large Language Models for Korean NLP", authors: "Jung, H., Kang, D., Yoon, J.", journal: "ACL Proceedings", year: 2024, citations: 78, institution: "NAVER AI Lab", field: "NLP", doi: "10.18653/v1/2024.acl-long.123", status: "Published" },
  { id: 7, title: "Advanced OLED Materials for Foldable Displays", authors: "Shin, J., Lee, M., Choi, Y.", journal: "Advanced Materials", year: 2024, citations: 134, institution: "LG Display R&D", field: "Display Technology", doi: "10.1002/adma.202400123", status: "Published" },
  { id: 8, title: "Hydrogen Fuel Cell Efficiency Improvements", authors: "Yoon, S., Kim, H., Park, D.", journal: "Energy & Environmental Science", year: 2025, citations: 8, institution: "Hyundai Motors R&D", field: "Energy", doi: "10.1039/d5ee00456b", status: "In Review" },
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

export default function PaperData() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredPapers = papers.filter(paper =>
    paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    paper.authors.toLowerCase().includes(searchQuery.toLowerCase()) ||
    paper.journal.toLowerCase().includes(searchQuery.toLowerCase()) ||
    paper.field.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPapers.length / itemsPerPage);
  const paginatedPapers = filteredPapers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalCitations = papers.reduce((sum, p) => sum + p.citations, 0);

  return (
    <div className="min-h-screen flex bg-slate-50">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
          <div className="px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-semibold tracking-tight text-slate-800">Paper Data</h1>
                <p className="text-sm text-slate-500 mt-0.5">Academic research papers and publications</p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" className="gap-2">
                  <Download className="w-4 h-4" />
                  Export
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-8 bg-white">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center gap-3 px-1 py-3 mb-6 border-b border-slate-100">
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-2 text-slate-600">
                  <BookOpen className="w-4 h-4 text-emerald-500" />
                  Total Papers: <strong className="text-slate-800">{papers.length}</strong>
                </span>
                <span className="w-px h-4 bg-slate-200" />
                <span className="flex items-center gap-2 text-slate-600">
                  <Quote className="w-4 h-4 text-blue-500" />
                  Total Citations: <strong className="text-slate-800">{totalCitations.toLocaleString()}</strong>
                </span>
                <span className="w-px h-4 bg-slate-200" />
                <span className="flex items-center gap-2 text-slate-600">
                  <Award className="w-4 h-4 text-purple-500" />
                  Published: <strong className="text-slate-800">{papers.filter(p => p.status === "Published").length}</strong>
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
                  placeholder="Search papers, authors, journals, or fields..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-slate-200"
                  data-testid="search-paper"
                />
              </div>
              <Button variant="outline" className="gap-2">
                <Filter className="w-4 h-4" />
                Filters
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full" data-testid="paper-table">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Title</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Authors</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Journal</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Field</th>
                    <th className="text-center py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Year</th>
                    <th className="text-center py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Citations</th>
                    <th className="text-center py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="text-center py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">DOI</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedPapers.map((paper) => (
                    <tr key={paper.id} className="border-b border-slate-100 hover:bg-slate-50 cursor-pointer" data-testid={`paper-row-${paper.id}`}>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                            <BookOpen className="w-4 h-4 text-emerald-600" />
                          </div>
                          <span className="font-medium text-slate-800 max-w-xs truncate">{paper.title}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-sm text-slate-600 max-w-[150px] truncate">{paper.authors}</td>
                      <td className="py-4 px-4 text-sm text-slate-600">{paper.journal}</td>
                      <td className="py-4 px-4">
                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600">
                          {paper.field}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center text-sm text-slate-600">{paper.year}</td>
                      <td className="py-4 px-4 text-center">
                        <span className="font-medium text-slate-800">{paper.citations}</span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          paper.status === "Published" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                        }`}>
                          {paper.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <a href={`https://doi.org/${paper.doi}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm">
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100">
              <p className="text-sm text-slate-500">
                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredPapers.length)} of {filteredPapers.length} papers
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
