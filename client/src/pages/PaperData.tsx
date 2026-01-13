import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Download,
  Clock,
  BookOpen,
  Users,
  Award,
  Quote,
  Calendar,
  ExternalLink,
  Menu,
  TrendingUp,
} from "lucide-react";
import Sidebar from "@/components/Sidebar";
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

export default function PaperData() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

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
                  <h1 className="text-lg md:text-xl font-semibold tracking-tight text-slate-800 truncate">Paper Data</h1>
                  <p className="text-xs md:text-sm text-slate-500 mt-0.5 hidden sm:block">Academic research papers and publications</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export</span>
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6 bg-slate-50/50 overflow-x-hidden">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05, duration: 0.3 }} className="mb-6">
              <div className="flex items-center gap-8 py-4 px-6 bg-white rounded-xl border border-slate-100">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-emerald-500" />
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wide">Total</p>
                    <p className="text-xl font-bold text-slate-800">{papers.length}</p>
                  </div>
                </div>
                <div className="w-px h-10 bg-slate-200" />
                <div className="flex items-center gap-3">
                  <Quote className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wide">Citations</p>
                    <p className="text-xl font-bold text-blue-600">{totalCitations.toLocaleString()}</p>
                  </div>
                </div>
                <div className="w-px h-10 bg-slate-200" />
                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-purple-500" />
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wide">Published</p>
                    <p className="text-xl font-bold text-purple-600">{papers.filter(p => p.status === "Published").length}</p>
                  </div>
                </div>
                <div className="w-px h-10 bg-slate-200" />
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-amber-500" />
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wide">This Month</p>
                    <p className="text-xl font-bold text-amber-600">+3</p>
                  </div>
                </div>
                <div className="w-px h-10 bg-slate-200" />
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wide">Update Cycle</p>
                    <p className="text-xl font-bold text-slate-800">Weekly</p>
                  </div>
                </div>
              </div>
            </motion.section>

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
              <div className="flex items-center gap-4">
                <p className="text-sm text-slate-500">
                  Showing {filteredPapers.length > 0 ? ((currentPage - 1) * itemsPerPage) + 1 : 0} to {Math.min(currentPage * itemsPerPage, filteredPapers.length)} of {filteredPapers.length} papers
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-500">Show</span>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                    className="border border-slate-200 rounded-md px-2 py-1 text-sm text-slate-700 bg-white"
                    data-testid="items-per-page"
                  >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>
                  <span className="text-sm text-slate-500">per page</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {(() => {
                  const pages: (number | string)[] = [];
                  if (totalPages <= 7) {
                    for (let i = 1; i <= totalPages; i++) pages.push(i);
                  } else {
                    if (currentPage <= 4) {
                      pages.push(1, 2, 3, 4, 5, '...', totalPages);
                    } else if (currentPage >= totalPages - 3) {
                      pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
                    } else {
                      pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
                    }
                  }
                  return (
                    <>
                      <Button variant="outline" size="sm" disabled={currentPage === 1} onClick={() => setCurrentPage(1)} className="h-8 w-8 p-0">
                        <ChevronLeft className="w-3 h-3" /><ChevronLeft className="w-3 h-3 -ml-2" />
                      </Button>
                      <Button variant="outline" size="sm" disabled={currentPage === 1} onClick={() => setCurrentPage(p => Math.max(1, p - 1))} className="h-8 w-8 p-0">
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      {pages.map((page, idx) => (
                        typeof page === 'number' ? (
                          <button key={idx} onClick={() => setCurrentPage(page)} className={`h-8 w-8 text-xs rounded-md transition-colors ${currentPage === page ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'}`}>{page}</button>
                        ) : (
                          <span key={idx} className="px-1 text-slate-400">...</span>
                        )
                      ))}
                      <Button variant="outline" size="sm" disabled={currentPage === totalPages || totalPages === 0} onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} className="h-8 w-8 p-0">
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" disabled={currentPage === totalPages || totalPages === 0} onClick={() => setCurrentPage(totalPages)} className="h-8 w-8 p-0">
                        <ChevronRight className="w-3 h-3" /><ChevronRight className="w-3 h-3 -ml-2" />
                      </Button>
                    </>
                  );
                })()}
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
