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
  Palette,
  Columns,
  Check,
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
  const [columnStyles, setColumnStyles] = useState<Record<string, any>>({});
  const [showColumnSelector, setShowColumnSelector] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState({
    authors: true,
    journal: true,
    field: true,
    year: true,
    citations: true,
    status: true,
    doi: true,
  });

  const columnLabels: Record<string, string> = {
    authors: "Authors",
    journal: "Journal",
    field: "Field",
    year: "Year",
    citations: "Citations",
    status: "Status",
    doi: "DOI",
  };

  const toggleColumn = (col: string) => {
    setVisibleColumns(prev => ({ ...prev, [col]: !prev[col as keyof typeof prev] }));
  };

  const [searchField, setSearchField] = useState("all");

  const colorOptions = [
    { name: 'Default', value: '' },
    { name: 'Red', value: '#ef4444' },
    { name: 'Orange', value: '#f97316' },
    { name: 'Amber', value: '#f59e0b' },
    { name: 'Green', value: '#84cc16' },
    { name: 'Emerald', value: '#10b981' },
    { name: 'Cyan', value: '#06b6d4' },
    { name: 'Blue', value: '#3b82f6' },
    { name: 'Indigo', value: '#6366f1' },
    { name: 'Purple', value: '#a855f7' },
    { name: 'Pink', value: '#ec4899' },
  ];
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

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-1">
                <button className="px-4 py-2 text-sm font-medium transition-colors rounded-lg bg-slate-900 text-white">
                  Total <span className="ml-1 text-xs opacity-60">{papers.length}</span>
                </button>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex items-center h-9 border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500">
                  <select 
                    value={searchField}
                    onChange={(e) => setSearchField(e.target.value)}
                    className="h-full pl-3 pr-8 text-xs bg-slate-50 border-r border-slate-200 text-slate-600 focus:outline-none cursor-pointer hover:bg-slate-100 transition-colors w-32 rounded-none appearance-none"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748b' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.5rem center', backgroundSize: '1rem' }}
                  >
                    <option value="all">All Fields</option>
                    <option value="title">Title</option>
                    <option value="authors">Authors</option>
                    <option value="journal">Journal</option>
                    <option value="field">Field</option>
                  </select>
                  <div className="relative flex items-center flex-1 h-full min-w-[200px]">
                    <Search className="absolute left-3 w-3.5 h-3.5 text-slate-400" />
                    <Input
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 w-full border-none focus-visible:ring-0 text-sm h-full rounded-none"
                      data-testid="search-paper"
                    />
                  </div>
                </div>

                <div className="relative">
                  <button
                    onClick={() => setShowColumnSelector(!showColumnSelector)}
                    className="flex items-center gap-2 px-3 h-9 border border-slate-200 rounded-lg text-sm bg-white text-slate-600 hover:bg-slate-50 transition-colors shadow-sm"
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

            <div className="bg-white rounded-xl border border-slate-100 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full" data-testid="paper-table">
                  <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-100">
                      <th className="text-left py-3 px-6 text-xs font-medium text-slate-400 uppercase tracking-wide">
                        <div className="flex items-center gap-1.5">
                          <span>Paper Title</span>
                        </div>
                      </th>
                      {visibleColumns.authors && (
                        <th className="text-left py-3 px-4 text-xs font-medium text-slate-400 uppercase tracking-wide">
                          Authors
                        </th>
                      )}
                      {visibleColumns.journal && (
                        <th className="text-left py-3 px-4 text-xs font-medium text-slate-400 uppercase tracking-wide">
                          Journal
                        </th>
                      )}
                      {visibleColumns.field && (
                        <th className="text-left py-3 px-4 text-xs font-medium text-slate-400 uppercase tracking-wide">
                          Field
                        </th>
                      )}
                      {visibleColumns.year && (
                        <th className="text-center py-3 px-4 text-xs font-medium text-slate-400 uppercase tracking-wide">
                          Year
                        </th>
                      )}
                      {visibleColumns.citations && (
                        <th className="text-center py-3 px-4 text-xs font-medium text-slate-400 uppercase tracking-wide">
                          Citations
                        </th>
                      )}
                      {visibleColumns.status && (
                        <th className="text-center py-3 px-4 text-xs font-medium text-slate-400 uppercase tracking-wide">
                          Status
                        </th>
                      )}
                      {visibleColumns.doi && (
                        <th className="text-center py-3 px-4 text-xs font-medium text-slate-400 uppercase tracking-wide">
                          DOI
                        </th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedPapers.map((paper) => (
                      <tr key={paper.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors cursor-pointer" data-testid={`paper-row-${paper.id}`}>
                        <td className="py-3 px-6">
                          <span className="font-medium text-slate-800 max-w-xs truncate block">{paper.title}</span>
                        </td>
                        {visibleColumns.authors && (
                          <td className="py-3 px-4 text-sm text-slate-600 truncate max-w-[150px]">
                            {paper.authors}
                          </td>
                        )}
                        {visibleColumns.journal && (
                          <td className="py-3 px-4 text-sm text-slate-600 truncate max-w-[150px]">
                            {paper.journal}
                          </td>
                        )}
                        {visibleColumns.field && (
                          <td className="py-3 px-4 text-sm text-slate-600">
                            {paper.field}
                          </td>
                        )}
                        {visibleColumns.year && (
                          <td className="py-3 px-4 text-center text-sm text-slate-600">
                            {paper.year}
                          </td>
                        )}
                        {visibleColumns.citations && (
                          <td className="py-3 px-4 text-center text-sm font-semibold text-slate-800">
                            {paper.citations}
                          </td>
                        )}
                        {visibleColumns.status && (
                          <td className="py-3 px-4 text-center text-sm text-emerald-600 font-medium">
                            {paper.status}
                          </td>
                        )}
                        {visibleColumns.doi && (
                          <td className="py-3 px-4 text-center">
                            <a href={`https://doi.org/${paper.doi}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm">
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          </td>
                        )}
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
              <div className="flex items-center gap-2">
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
                      <div className="flex items-center gap-1">
                        <Button variant="outline" size="sm" disabled={currentPage === 1} onClick={() => setCurrentPage(1)} className="h-8 px-2 border-slate-200 text-slate-500 hover:text-slate-700">
                          <ChevronLeft className="w-4 h-4" /><ChevronLeft className="w-4 h-4 -ml-3" />
                        </Button>
                        <Button variant="outline" size="sm" disabled={currentPage === 1} onClick={() => setCurrentPage(p => Math.max(1, p - 1))} className="h-8 px-2 border-slate-200 text-slate-500 hover:text-slate-700">
                          <ChevronLeft className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="flex items-center gap-1 mx-2">
                        {pages.map((page, idx) => (
                          typeof page === 'number' ? (
                            <button key={idx} onClick={() => setCurrentPage(page)} className={`h-8 min-w-[32px] px-2 text-sm rounded-lg transition-all ${currentPage === page ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}>{page}</button>
                          ) : (
                            <span key={idx} className="px-2 text-slate-300">•••</span>
                          )
                        ))}
                      </div>
                      <div className="flex items-center gap-1">
                        <Button variant="outline" size="sm" disabled={currentPage === totalPages || totalPages === 0} onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} className="h-8 px-2 border-slate-200 text-slate-500 hover:text-slate-700">
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" disabled={currentPage === totalPages || totalPages === 0} onClick={() => setCurrentPage(totalPages)} className="h-8 px-2 border-slate-200 text-slate-500 hover:text-slate-700">
                          <ChevronRight className="w-4 h-4" /><ChevronRight className="w-4 h-4 -ml-3" />
                        </Button>
                      </div>
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
