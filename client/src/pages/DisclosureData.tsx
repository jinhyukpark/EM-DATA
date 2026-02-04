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
  ArrowDownRight
} from "lucide-react";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function StatCard({ item, index }: { item: any, index: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${item.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 rounded-lg" style={{ backgroundColor: `${item.color}15` }}>
            <item.icon className="w-6 h-6" style={{ color: item.color }} strokeWidth={1.5} />
          </div>
          {item.change && (
            <div className={`flex items-center gap-1 text-sm font-medium ${item.isPositive ? "text-emerald-600" : "text-red-500"}`}>
              {item.isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
              <span>{item.change}</span>
            </div>
          )}
        </div>
        
        <h3 className="text-slate-500 text-sm font-medium mb-1">{item.label}</h3>
        <p className="text-3xl font-semibold tracking-tight text-slate-800 mb-1">{item.value}</p>
        
        {item.subValue && (
           <p className="text-sm text-slate-400 mt-1">{item.subValue}</p>
        )}
      </div>
    </motion.div>
  );
}

export default function DisclosureData() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchField, setSearchField] = useState("all");

  const stats = [
    { 
      label: "TOTAL COMPANIES", 
      value: "1.52M", 
      icon: FileText, 
      color: "#3b82f6", 
      bgGradient: "from-blue-500/15 to-blue-600/5",
      change: "+12.5%",
      isPositive: true
    },
    { 
      label: "TODAY", 
      value: "0", 
      icon: RefreshCw, 
      color: "#10b981", 
      bgGradient: "from-emerald-500/15 to-emerald-600/5",
      subValue: "Updates received"
    },
    { 
      label: "YESTERDAY", 
      value: "0", 
      icon: LayoutGrid, 
      color: "#6366f1", 
      bgGradient: "from-indigo-500/15 to-indigo-600/5",
      subValue: "Updates processed"
    },
    { 
      label: "UPDATE CYCLE", 
      value: "Daily", 
      icon: Clock, 
      color: "#f59e0b", 
      bgGradient: "from-amber-500/15 to-amber-600/5",
      subValue: "Next update: 18:00" 
    }
  ];

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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <StatCard key={index} item={stat} index={index} />
              ))}
            </div>

            {/* Main Content */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h2 className="text-lg font-semibold text-slate-800">Disclosure Records</h2>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex items-center gap-2">
                    <Select value={searchField} onValueChange={setSearchField}>
                      <SelectTrigger className="w-[140px] h-9 text-xs text-slate-700 bg-white border-slate-200">
                        <SelectValue placeholder="Select field" />
                      </SelectTrigger>
                      <SelectContent>
                        {searchOptions.map(opt => (
                          <SelectItem key={opt.value} value={opt.value} className="text-slate-700">
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input 
                        placeholder="Search..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 h-9 text-xs w-[200px] text-slate-700 bg-white border-slate-200"
                      />
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="gap-2 h-9 text-slate-700 bg-white border-slate-200 hover:bg-slate-50">
                    <Columns className="w-4 h-4" />
                    Fields
                  </Button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-3 font-medium text-slate-500 uppercase tracking-wider text-xs">CORP CODE</th>
                      <th className="px-6 py-3 font-medium text-slate-500 uppercase tracking-wider text-xs">CORP NAME</th>
                      <th className="px-6 py-3 font-medium text-slate-500 uppercase tracking-wider text-xs">REPORT NAME</th>
                      <th className="px-6 py-3 font-medium text-slate-500 uppercase tracking-wider text-xs">RECEIPT NO</th>
                      <th className="px-6 py-3 font-medium text-slate-500 uppercase tracking-wider text-xs">FILER NAME</th>
                      <th className="px-6 py-3 font-medium text-slate-500 uppercase tracking-wider text-xs">RECEIPT DATE</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {paginatedData.length > 0 ? (
                      paginatedData.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4 text-slate-600 font-mono">{item.corpCode}</td>
                          <td className="px-6 py-4 text-slate-900 font-medium">{item.corpName}</td>
                          <td className="px-6 py-4 text-slate-600">{item.reportNm}</td>
                          <td className="px-6 py-4 text-slate-500 font-mono">{item.rceptNo}</td>
                          <td className="px-6 py-4 text-slate-600">{item.flrNm}</td>
                          <td className="px-6 py-4 text-slate-500">{item.rceptDt}</td>
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
