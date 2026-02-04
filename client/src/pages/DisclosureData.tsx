import { useState } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Search,
  Filter,
  Download,
  Menu,
  ChevronLeft,
  ChevronRight,
  Columns,
  RefreshCw,
  LayoutGrid,
  List,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Check,
  Palette
} from "lucide-react";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function DisclosureData() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchField, setSearchField] = useState("all");
  const [showColumnSelector, setShowColumnSelector] = useState(false);
  
  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>({
    corpCode: true,
    corpName: true,
    reportNm: true,
    rceptNo: true,
    flrNm: true,
    rceptDt: true,
  });

  const columnLabels: Record<string, string> = {
    corpCode: "CORP CODE",
    corpName: "CORP NAME",
    reportNm: "REPORT NAME",
    rceptNo: "RECEIPT NO",
    flrNm: "FILER NAME",
    rceptDt: "RECEIPT DATE",
  };

  const toggleColumn = (col: string) => {
    setVisibleColumns(prev => ({ ...prev, [col]: !prev[col] }));
  };

  // Mock data matching the user's request
  const disclosureData = [
    { id: 1, corpCode: "00126380", corpName: "Samsung Electronics", reportNm: "Quarterly Report (2024.09)", rceptNo: "20241114000123", flrNm: "Samsung Electronics", rceptDt: "2024-11-14" },
    { id: 2, corpCode: "00164779", corpName: "SK Hynix", reportNm: "Quarterly Report (2024.09)", rceptNo: "20241114000456", flrNm: "SK Hynix", rceptDt: "2024-11-14" },
    { id: 3, corpCode: "00126380", corpName: "Samsung Electronics", reportNm: "Material Fact Report", rceptNo: "20241110000789", flrNm: "Samsung Electronics", rceptDt: "2024-11-10" },
    { id: 4, corpCode: "00164742", corpName: "Hyundai Motor", reportNm: "Quarterly Report (2024.09)", rceptNo: "20241114000234", flrNm: "Hyundai Motor", rceptDt: "2024-11-14" },
    { id: 5, corpCode: "00356361", corpName: "Naver", reportNm: "Quarterly Report (2024.09)", rceptNo: "20241114000567", flrNm: "Naver", rceptDt: "2024-11-14" },
    { id: 6, corpCode: "00258801", corpName: "Kakao", reportNm: "Quarterly Report (2024.09)", rceptNo: "20241114000890", flrNm: "Kakao", rceptDt: "2024-11-14" },
    { id: 7, corpCode: "00126380", corpName: "Samsung Electronics", reportNm: "Correction to Quarterly Report", rceptNo: "20241028000111", flrNm: "Samsung Electronics", rceptDt: "2024-10-28" },
    { id: 8, corpCode: "00106641", corpName: "LG Electronics", reportNm: "Quarterly Report (2024.09)", rceptNo: "20241114000333", flrNm: "LG Electronics", rceptDt: "2024-11-14" },
    { id: 9, corpCode: "00149950", corpName: "POSCO Holdings", reportNm: "Quarterly Report (2024.09)", rceptNo: "20241114000666", flrNm: "POSCO Holdings", rceptDt: "2024-11-14" },
    { id: 10, corpCode: "00298315", corpName: "Kia", reportNm: "Quarterly Report (2024.09)", rceptNo: "20241114000999", flrNm: "Kia", rceptDt: "2024-11-14" },
    { id: 11, corpCode: "000660", corpName: "SK Hynix", reportNm: "Material Fact Report", rceptNo: "20241105000123", flrNm: "SK Hynix", rceptDt: "2024-11-05" },
    { id: 12, corpCode: "005380", corpName: "Hyundai Motor", reportNm: "Investment Prospectus", rceptNo: "20241030000456", flrNm: "Hyundai Motor", rceptDt: "2024-10-30" },
  ];

  // Filtering
  const filteredData = disclosureData.filter((item) => {
    if (!searchQuery) return true;
    const term = searchQuery.toLowerCase();
    
    if (searchField === "all") {
      return Object.values(item).some(val => 
        String(val).toLowerCase().includes(term)
      );
    }
    
    // @ts-ignore
    const value = item[searchField];
    return String(value).toLowerCase().includes(term);
  });

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const searchOptions = [
    { value: "all", label: "All Fields" },
    { value: "corpCode", label: "DART Code" },
    { value: "corpName", label: "Corp Name" },
    { value: "reportNm", label: "Report Name" },
    { value: "flrNm", label: "Filer Name" },
  ];

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
                  <h1 className="text-lg md:text-xl font-semibold tracking-tight text-slate-800 truncate">Disclosure Data</h1>
                  <p className="text-xs md:text-sm text-slate-500 mt-0.5 hidden sm:block">DART corporate filings and reports</p>
                </div>
              </div>
              <Button variant="outline" className="gap-2 hidden sm:flex">
                <Download className="w-4 h-4" />
                Export
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto bg-slate-50/50">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-6">
            
            {/* Stats Cards */}
            <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.05 }} className="mb-6">
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 py-4 px-6 bg-white rounded-xl border border-slate-100">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <FileText className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wide">TOTAL COMPANIES</p>
                    <p className="text-xl font-bold text-slate-800">1.52M</p>
                  </div>
                </div>
                <div className="hidden sm:block w-px h-10 bg-slate-200" />
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <RefreshCw className="w-5 h-5 text-emerald-500" />
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wide">TODAY</p>
                    <p className="text-xl font-bold text-emerald-600">0</p>
                  </div>
                </div>
                <div className="hidden sm:block w-px h-10 bg-slate-200" />
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <LayoutGrid className="w-5 h-5 text-indigo-500" />
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wide">YESTERDAY</p>
                    <p className="text-xl font-bold text-indigo-600">0</p>
                  </div>
                </div>
                <div className="hidden sm:block w-px h-10 bg-slate-200" />
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <Clock className="w-5 h-5 text-amber-500" />
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wide">UPDATE CYCLE</p>
                    <p className="text-xl font-bold text-slate-800">Daily</p>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Main Content */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h2 className="text-lg font-semibold text-slate-800">Disclosure Records</h2>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex items-center h-9 border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500">
                    <select 
                      value={searchField} 
                      onChange={(e) => setSearchField(e.target.value)}
                      className="h-full pl-3 pr-8 text-xs bg-slate-50 border-r border-slate-200 text-slate-600 focus:outline-none cursor-pointer hover:bg-slate-100 transition-colors w-32 rounded-none appearance-none"
                      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748b' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.5rem center', backgroundSize: '1rem' }}
                    >
                      {searchOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    <div className="relative flex items-center flex-1 h-full min-w-[200px]">
                      <Search className="absolute left-3 w-3.5 h-3.5 text-slate-400" />
                      <Input 
                        placeholder="Search..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 w-full border-none focus-visible:ring-0 text-sm h-full rounded-none"
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
                            {visibleColumns[key] && (
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
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      {visibleColumns.corpCode && <th className="px-6 py-3 font-medium text-slate-500 uppercase tracking-wider text-xs">CORP CODE</th>}
                      {visibleColumns.corpName && <th className="px-6 py-3 font-medium text-slate-500 uppercase tracking-wider text-xs">CORP NAME</th>}
                      {visibleColumns.reportNm && <th className="px-6 py-3 font-medium text-slate-500 uppercase tracking-wider text-xs">REPORT NAME</th>}
                      {visibleColumns.rceptNo && <th className="px-6 py-3 font-medium text-slate-500 uppercase tracking-wider text-xs">RECEIPT NO</th>}
                      {visibleColumns.flrNm && <th className="px-6 py-3 font-medium text-slate-500 uppercase tracking-wider text-xs">FILER NAME</th>}
                      {visibleColumns.rceptDt && <th className="px-6 py-3 font-medium text-slate-500 uppercase tracking-wider text-xs">RECEIPT DATE</th>}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {paginatedData.length > 0 ? (
                      paginatedData.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                          {visibleColumns.corpCode && <td className="px-6 py-4 text-slate-600 font-mono">{item.corpCode}</td>}
                          {visibleColumns.corpName && <td className="px-6 py-4 text-slate-900 font-medium">{item.corpName}</td>}
                          {visibleColumns.reportNm && <td className="px-6 py-4 text-slate-600">{item.reportNm}</td>}
                          {visibleColumns.rceptNo && <td className="px-6 py-4 text-slate-500 font-mono">{item.rceptNo}</td>}
                          {visibleColumns.flrNm && <td className="px-6 py-4 text-slate-600">{item.flrNm}</td>}
                          {visibleColumns.rceptDt && <td className="px-6 py-4 text-slate-500">{item.rceptDt}</td>}
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                          No disclosure records found matching your criteria.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="p-4 border-t border-slate-200 flex items-center justify-between bg-slate-50">
                <div className="text-xs text-slate-500">
                  Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredData.length)} of {filteredData.length} records
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 mr-4">
                    <span className="text-xs text-slate-500">Show</span>
                    <Select 
                      value={String(itemsPerPage)} 
                      onValueChange={(val) => {
                        setItemsPerPage(Number(val));
                        setCurrentPage(1);
                      }}
                    >
                      <SelectTrigger className="h-8 w-[70px] text-xs text-slate-700 bg-white border-slate-200">
                        <SelectValue placeholder={String(itemsPerPage)} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10" className="text-slate-700">10</SelectItem>
                        <SelectItem value="20" className="text-slate-700">20</SelectItem>
                        <SelectItem value="50" className="text-slate-700">50</SelectItem>
                      </SelectContent>
                    </Select>
                    <span className="text-xs text-slate-500">per page</span>
                  </div>
                  
                  <div className="flex gap-1">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <div className="flex items-center px-2">
                      <span className="text-xs font-medium text-slate-700">
                        {currentPage}
                      </span>
                      <span className="text-xs text-slate-400 mx-1">/</span>
                      <span className="text-xs text-slate-500">
                        {totalPages || 1}
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages || totalPages === 0}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
