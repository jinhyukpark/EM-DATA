import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Download,
  Clock,
  Activity,
  Lightbulb,
  UserCog,
  Target,
  DollarSign,
  Calendar,
  Users,
  Tag,
  ExternalLink,
  Menu,
} from "lucide-react";
import Sidebar from "@/components/Sidebar";
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

export default function RnDData() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState<"All" | "Entry" | "Exit">("All");
  const [itemsPerPage, setItemsPerPage] = useState(10);

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

        <main className="flex-1 p-4 md:p-6 bg-slate-50/50 overflow-x-hidden">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05, duration: 0.3 }} className="mb-6">
              <div className="flex items-center gap-8 py-4 px-6 bg-white rounded-xl border border-slate-100">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wide">Total</p>
                    <p className="text-xl font-bold text-slate-800">{employmentData.length}</p>
                  </div>
                </div>
                <div className="w-px h-10 bg-slate-200" />
                <div className="flex items-center gap-3">
                  <UserCog className="w-5 h-5 text-emerald-500" />
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wide">Entries</p>
                    <p className="text-xl font-bold text-emerald-600">{entryCount}</p>
                  </div>
                </div>
                <div className="w-px h-10 bg-slate-200" />
                <div className="flex items-center gap-3">
                  <UserCog className="w-5 h-5 text-red-500" />
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wide">Exits</p>
                    <p className="text-xl font-bold text-red-600">{exitCount}</p>
                  </div>
                </div>
                <div className="w-px h-10 bg-slate-200" />
                <div className="flex items-center gap-3">
                  <Activity className="w-5 h-5 text-purple-500" />
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wide">This Week</p>
                    <p className="text-xl font-bold text-purple-600">+4</p>
                  </div>
                </div>
                <div className="w-px h-10 bg-slate-200" />
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wide">Update Cycle</p>
                    <p className="text-xl font-bold text-slate-800">Daily</p>
                  </div>
                </div>
              </div>
            </motion.section>

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
              <div className="flex items-center gap-4">
                <p className="text-sm text-slate-500">
                  Showing {filteredData.length > 0 ? ((currentPage - 1) * itemsPerPage) + 1 : 0} to {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} records
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
