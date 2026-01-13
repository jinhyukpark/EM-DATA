import { useState } from "react";
import { motion } from "framer-motion";
import {
  Newspaper,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Search,
  Download,
  Clock,
  Activity,
  Columns,
  Check,
  ExternalLink,
  Menu,
  TrendingUp,
  TrendingDown,
  Palette,
} from "lucide-react";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const newsArticles = [
  { id: 1, title: "Samsung Electronics Reports Record Q4 Earnings", source: "Korea Economic Daily", category: "Earnings", company: "Samsung Electronics", publishDate: "2025-01-09 14:30", sentiment: "Positive" },
  { id: 2, title: "SK Hynix to Invest $75B in New AI Chip Factory", source: "Maeil Business", category: "Investment", company: "SK Hynix", publishDate: "2025-01-09 13:45", sentiment: "Positive" },
  { id: 3, title: "Hyundai Motor Faces Supply Chain Challenges", source: "Yonhap News", category: "Industry", company: "Hyundai Motor", publishDate: "2025-01-09 12:20", sentiment: "Negative" },
  { id: 4, title: "NAVER Launches New AI-Powered Search Engine", source: "Digital Times", category: "Technology", company: "NAVER", publishDate: "2025-01-09 11:15", sentiment: "Positive" },
  { id: 5, title: "Kakao Pay Expands to Southeast Asian Markets", source: "Money Today", category: "Expansion", company: "Kakao", publishDate: "2025-01-09 10:30", sentiment: "Positive" },
  { id: 6, title: "LG Electronics Recalls Defective Refrigerators", source: "KBS News", category: "Recall", company: "LG Electronics", publishDate: "2025-01-09 09:45", sentiment: "Negative" },
  { id: 7, title: "Korean Tech Stocks Rally on AI Optimism", source: "Bloomberg Korea", category: "Market", company: "Multiple", publishDate: "2025-01-09 08:30", sentiment: "Positive" },
  { id: 8, title: "Government Announces New Semiconductor Support Package", source: "Chosun Ilbo", category: "Policy", company: "Industry", publishDate: "2025-01-08 16:00", sentiment: "Neutral" },
];

export default function NewsData() {
  const [columnColors, setColumnColors] = useState<Record<string, string>>({});
  const [activeColorPicker, setActiveColorPicker] = useState<string | null>(null);

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
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showColumnSelector, setShowColumnSelector] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState({
    source: true,
    category: true,
    company: true,
    publishDate: true,
    sentiment: true,
  });

  const columnLabels: Record<string, string> = {
    source: "Source",
    category: "Category",
    company: "Company",
    publishDate: "Published",
    sentiment: "Sentiment",
  };

  const toggleColumn = (col: string) => {
    setVisibleColumns(prev => ({ ...prev, [col]: !prev[col as keyof typeof prev] }));
  };

  const totalArticles = 842156;

  const filteredNews = newsArticles.filter((article) => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) || article.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
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
                  <h1 className="text-lg md:text-xl font-semibold tracking-tight text-slate-800 truncate">News Data</h1>
                  <p className="text-xs md:text-sm text-slate-500 mt-0.5 hidden sm:block">Financial news aggregation</p>
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
                <Newspaper className="w-5 h-5 text-orange-500" />
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wide">Total Articles</p>
                  <p className="text-xl font-bold text-slate-800">{totalArticles.toLocaleString()}</p>
                </div>
              </div>
              <div className="w-px h-10 bg-slate-200" />
              <div className="flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-emerald-500" />
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wide">Positive</p>
                  <p className="text-xl font-bold text-emerald-600">412,458</p>
                </div>
              </div>
              <div className="w-px h-10 bg-slate-200" />
              <div className="flex items-center gap-3">
                <Activity className="w-5 h-5 text-slate-500" />
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wide">Neutral</p>
                  <p className="text-xl font-bold text-slate-600">298,521</p>
                </div>
              </div>
              <div className="w-px h-10 bg-slate-200" />
              <div className="flex items-center gap-3">
                <Activity className="w-5 h-5 text-red-500" />
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wide">Negative</p>
                  <p className="text-xl font-bold text-red-600">131,177</p>
                </div>
              </div>
              <div className="w-px h-10 bg-slate-200" />
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-cyan-500" />
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wide">Update Cycle</p>
                  <p className="text-xl font-bold text-slate-800">Hourly</p>
                </div>
              </div>
            </div>
          </motion.section>

          <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.3 }}>
            <div className="bg-white rounded-xl border border-slate-100">
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                <h2 className="text-sm font-medium text-slate-800">News Articles</h2>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-9 w-48 h-9 border-slate-200 text-sm" data-testid="search-input" />
                  </div>
                  <div className="relative">
                    <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="pl-3 pr-8 py-2 h-9 border border-slate-200 rounded-lg text-sm bg-white text-slate-600 appearance-none cursor-pointer" data-testid="category-filter">
                      <option value="All">All Categories</option>
                      <option value="Earnings">Earnings</option>
                      <option value="Investment">Investment</option>
                      <option value="Industry">Industry</option>
                      <option value="Technology">Technology</option>
                      <option value="Market">Market</option>
                      <option value="Policy">Policy</option>
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
                <table className="w-full" data-testid="news-table">
                  <thead>
                    <tr className="bg-slate-50/50">
                      <th className="text-left py-3 px-6 text-xs font-medium text-slate-400 uppercase tracking-wide">
                        <div className="flex items-center gap-1.5">
                          {columnColors.title && <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: columnColors.title }} />}
                          <span>Article Title</span>
                          <div className="relative">
                            <button onClick={(e) => { e.stopPropagation(); setActiveColorPicker(activeColorPicker === 'title' ? null : 'title'); }} className="p-1 hover:bg-slate-200 rounded transition-colors">
                              <Palette className="w-3 h-3 text-slate-400" />
                            </button>
                            {activeColorPicker === 'title' && (
                              <div className="absolute left-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-slate-200 p-2 z-20 flex flex-wrap gap-1 w-32">
                                {colorOptions.map((color) => (
                                  <button key={color.name} onClick={() => { setColumnColors(prev => ({ ...prev, title: color.value })); setActiveColorPicker(null); }} className="w-5 h-5 rounded-full border border-slate-200 hover:scale-110 transition-transform" style={{ backgroundColor: color.value || '#f1f5f9' }} title={color.name} />
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </th>
                      {visibleColumns.source && <th className="text-left py-3 px-4 text-xs font-medium text-slate-400 uppercase tracking-wide">
                        <div className="flex items-center gap-1.5">
                          {columnColors.source && <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: columnColors.source }} />}
                          <span>Source</span>
                          <div className="relative">
                            <button onClick={(e) => { e.stopPropagation(); setActiveColorPicker(activeColorPicker === 'source' ? null : 'source'); }} className="p-1 hover:bg-slate-200 rounded transition-colors">
                              <Palette className="w-3 h-3 text-slate-400" />
                            </button>
                            {activeColorPicker === 'source' && (
                              <div className="absolute left-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-slate-200 p-2 z-20 flex flex-wrap gap-1 w-32">
                                {colorOptions.map((color) => (
                                  <button key={color.name} onClick={() => { setColumnColors(prev => ({ ...prev, source: color.value })); setActiveColorPicker(null); }} className="w-5 h-5 rounded-full border border-slate-200 hover:scale-110 transition-transform" style={{ backgroundColor: color.value || '#f1f5f9' }} title={color.name} />
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </th>}
                      {visibleColumns.category && <th className="text-center py-3 px-4 text-xs font-medium text-slate-400 uppercase tracking-wide">
                        <div className="flex items-center justify-center gap-1.5">
                          {columnColors.category && <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: columnColors.category }} />}
                          <span>Category</span>
                          <div className="relative">
                            <button onClick={(e) => { e.stopPropagation(); setActiveColorPicker(activeColorPicker === 'category' ? null : 'category'); }} className="p-1 hover:bg-slate-200 rounded transition-colors">
                              <Palette className="w-3 h-3 text-slate-400" />
                            </button>
                            {activeColorPicker === 'category' && (
                              <div className="absolute left-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-slate-200 p-2 z-20 flex flex-wrap gap-1 w-32">
                                {colorOptions.map((color) => (
                                  <button key={color.name} onClick={() => { setColumnColors(prev => ({ ...prev, category: color.value })); setActiveColorPicker(null); }} className="w-5 h-5 rounded-full border border-slate-200 hover:scale-110 transition-transform" style={{ backgroundColor: color.value || '#f1f5f9' }} title={color.name} />
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </th>}
                      {visibleColumns.company && <th className="text-left py-3 px-4 text-xs font-medium text-slate-400 uppercase tracking-wide">
                        <div className="flex items-center gap-1.5">
                          {columnColors.company && <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: columnColors.company }} />}
                          <span>Company</span>
                          <div className="relative">
                            <button onClick={(e) => { e.stopPropagation(); setActiveColorPicker(activeColorPicker === 'company' ? null : 'company'); }} className="p-1 hover:bg-slate-200 rounded transition-colors">
                              <Palette className="w-3 h-3 text-slate-400" />
                            </button>
                            {activeColorPicker === 'company' && (
                              <div className="absolute left-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-slate-200 p-2 z-20 flex flex-wrap gap-1 w-32">
                                {colorOptions.map((color) => (
                                  <button key={color.name} onClick={() => { setColumnColors(prev => ({ ...prev, company: color.value })); setActiveColorPicker(null); }} className="w-5 h-5 rounded-full border border-slate-200 hover:scale-110 transition-transform" style={{ backgroundColor: color.value || '#f1f5f9' }} title={color.name} />
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </th>}
                      {visibleColumns.publishDate && <th className="text-left py-3 px-4 text-xs font-medium text-slate-400 uppercase tracking-wide">
                        <div className="flex items-center gap-1.5">
                          {columnColors.publishDate && <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: columnColors.publishDate }} />}
                          <span>Published</span>
                          <div className="relative">
                            <button onClick={(e) => { e.stopPropagation(); setActiveColorPicker(activeColorPicker === 'publishDate' ? null : 'publishDate'); }} className="p-1 hover:bg-slate-200 rounded transition-colors">
                              <Palette className="w-3 h-3 text-slate-400" />
                            </button>
                            {activeColorPicker === 'publishDate' && (
                              <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-slate-200 p-2 z-20 flex flex-wrap gap-1 w-32">
                                {colorOptions.map((color) => (
                                  <button key={color.name} onClick={() => { setColumnColors(prev => ({ ...prev, publishDate: color.value })); setActiveColorPicker(null); }} className="w-5 h-5 rounded-full border border-slate-200 hover:scale-110 transition-transform" style={{ backgroundColor: color.value || '#f1f5f9' }} title={color.name} />
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </th>}
                      {visibleColumns.sentiment && <th className="text-center py-3 px-4 text-xs font-medium text-slate-400 uppercase tracking-wide">
                        <div className="flex items-center justify-center gap-1.5">
                          {columnColors.sentiment && <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: columnColors.sentiment }} />}
                          <span>Sentiment</span>
                          <div className="relative">
                            <button onClick={(e) => { e.stopPropagation(); setActiveColorPicker(activeColorPicker === 'sentiment' ? null : 'sentiment'); }} className="p-1 hover:bg-slate-200 rounded transition-colors">
                              <Palette className="w-3 h-3 text-slate-400" />
                            </button>
                            {activeColorPicker === 'sentiment' && (
                              <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-slate-200 p-2 z-20 flex flex-wrap gap-1 w-32">
                                {colorOptions.map((color) => (
                                  <button key={color.name} onClick={() => { setColumnColors(prev => ({ ...prev, sentiment: color.value })); setActiveColorPicker(null); }} className="w-5 h-5 rounded-full border border-slate-200 hover:scale-110 transition-transform" style={{ backgroundColor: color.value || '#f1f5f9' }} title={color.name} />
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </th>}
                      <th className="text-center py-3 px-4 text-xs font-medium text-slate-400 uppercase tracking-wide">
                        <div className="flex items-center justify-center gap-1.5">
                          {columnColors.link && <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: columnColors.link }} />}
                          <span>Link</span>
                          <div className="relative">
                            <button onClick={(e) => { e.stopPropagation(); setActiveColorPicker(activeColorPicker === 'link' ? null : 'link'); }} className="p-1 hover:bg-slate-200 rounded transition-colors">
                              <Palette className="w-3 h-3 text-slate-400" />
                            </button>
                            {activeColorPicker === 'link' && (
                              <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-slate-200 p-2 z-20 flex flex-wrap gap-1 w-32">
                                {colorOptions.map((color) => (
                                  <button key={color.name} onClick={() => { setColumnColors(prev => ({ ...prev, link: color.value })); setActiveColorPicker(null); }} className="w-5 h-5 rounded-full border border-slate-200 hover:scale-110 transition-transform" style={{ backgroundColor: color.value || '#f1f5f9' }} title={color.name} />
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredNews.map((article) => (
                      <tr key={article.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors" data-testid={`article-row-${article.id}`}>
                        <td className="py-3 px-6">
                          <span className="font-medium text-slate-800" style={{ color: columnColors.title || undefined }}>{article.title}</span>
                        </td>
                        {visibleColumns.source && <td className="py-3 px-4 text-sm text-slate-600" style={{ color: columnColors.source || undefined }}>{article.source}</td>}
                        {visibleColumns.category && (
                          <td className="py-3 px-4 text-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-purple-50 text-purple-600" style={{ color: columnColors.category || undefined, backgroundColor: columnColors.category ? undefined : undefined }}>{article.category}</span>
                          </td>
                        )}
                        {visibleColumns.company && <td className="py-3 px-4 text-sm text-slate-600" style={{ color: columnColors.company || undefined }}>{article.company}</td>}
                        {visibleColumns.publishDate && <td className="py-3 px-4 text-sm text-slate-500" style={{ color: columnColors.publishDate || undefined }}>{article.publishDate}</td>}
                        {visibleColumns.sentiment && (
                          <td className="py-3 px-4 text-center">
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${
                              article.sentiment === "Positive" ? "text-emerald-600 bg-emerald-50" :
                              article.sentiment === "Negative" ? "text-red-600 bg-red-50" :
                              "text-slate-600 bg-slate-100"
                            }`} style={{ color: columnColors.sentiment || undefined, backgroundColor: columnColors.sentiment ? undefined : undefined }}>
                              {article.sentiment}
                            </span>
                          </td>
                        )}
                        <td className="py-3 px-4 text-center">
                          <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors" style={{ color: columnColors.link || undefined }}>
                            <ExternalLink className="w-4 h-4 text-slate-400" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100">
                <div className="flex items-center gap-4">
                  <p className="text-xs text-slate-400">Showing {filteredNews.length} of {totalArticles.toLocaleString()} articles</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">Show</span>
                    <select
                      value={itemsPerPage}
                      onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                      className="border border-slate-200 rounded-md px-2 py-1 text-xs text-slate-700 bg-white"
                      data-testid="items-per-page"
                    >
                      <option value={10}>10</option>
                      <option value={25}>25</option>
                      <option value={50}>50</option>
                      <option value={100}>100</option>
                    </select>
                    <span className="text-xs text-slate-500">per page</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {(() => {
                    const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
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
                          <Button variant="outline" size="sm" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} className="h-8 px-2 border-slate-200 text-slate-500 hover:text-slate-700">
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
                          <Button variant="outline" size="sm" disabled={currentPage >= totalPages} onClick={() => setCurrentPage(currentPage + 1)} className="h-8 px-2 border-slate-200 text-slate-500 hover:text-slate-700">
                            <ChevronRight className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" disabled={currentPage >= totalPages} onClick={() => setCurrentPage(totalPages)} className="h-8 px-2 border-slate-200 text-slate-500 hover:text-slate-700">
                            <ChevronRight className="w-4 h-4" /><ChevronRight className="w-4 h-4 -ml-3" />
                          </Button>
                        </div>
                      </>
                    );
                  })()}
                </div>
              </div>
            </div>
          </motion.section>
        </main>
      </div>
    </div>
  );
}
