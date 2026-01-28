import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import React from "react";
import {
  Search,
  Download,
  Clock,
  Activity,
  UserPlus,
  UserMinus,
  Users,
  Building2,
  Menu,
  ChevronLeft,
  ChevronRight,
  Filter,
  Columns,
  Check,
  TrendingUp,
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function EmploymentData() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>({
    company_id: 120,
    monthly_employed_cnt: 180,
    monthly_retired_cnt: 180,
    subscriber_cnt: 150,
    data_create_month: 150,
  });

  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>({
    company_id: true,
    monthly_employed_cnt: true,
    monthly_retired_cnt: true,
    subscriber_cnt: true,
    data_create_month: true,
  });

  // Mock data to match the requested table structure
  // Using company IDs as requested in the screenshot
  const employmentData = [
    { id: 1, company_id: "3", monthly_employed_cnt: 45, monthly_retired_cnt: 30, subscriber_cnt: 12450, data_create_month: "202408" },
    { id: 2, company_id: "3", monthly_employed_cnt: 38, monthly_retired_cnt: 42, subscriber_cnt: 12446, data_create_month: "202409" },
    { id: 3, company_id: "3", monthly_employed_cnt: 52, monthly_retired_cnt: 28, subscriber_cnt: 12470, data_create_month: "202410" },
    { id: 4, company_id: "3", monthly_employed_cnt: 60, monthly_retired_cnt: 35, subscriber_cnt: 12495, data_create_month: "202411" },
    { id: 5, company_id: "3", monthly_employed_cnt: 40, monthly_retired_cnt: 45, subscriber_cnt: 12490, data_create_month: "202412" },
    { id: 6, company_id: "3", monthly_employed_cnt: 55, monthly_retired_cnt: 25, subscriber_cnt: 12520, data_create_month: "202501" },
    { id: 7, company_id: "5", monthly_employed_cnt: 20, monthly_retired_cnt: 15, subscriber_cnt: 4500, data_create_month: "202408" },
    { id: 8, company_id: "5", monthly_employed_cnt: 25, monthly_retired_cnt: 18, subscriber_cnt: 4507, data_create_month: "202409" },
    { id: 9, company_id: "5", monthly_employed_cnt: 18, monthly_retired_cnt: 22, subscriber_cnt: 4503, data_create_month: "202410" },
    { id: 10, company_id: "5", monthly_employed_cnt: 30, monthly_retired_cnt: 12, subscriber_cnt: 4521, data_create_month: "202411" },
    { id: 11, company_id: "5", monthly_employed_cnt: 22, monthly_retired_cnt: 20, subscriber_cnt: 4523, data_create_month: "202412" },
    { id: 12, company_id: "5", monthly_employed_cnt: 35, monthly_retired_cnt: 10, subscriber_cnt: 4548, data_create_month: "202501" },
    { id: 13, company_id: "8", monthly_employed_cnt: 15, monthly_retired_cnt: 20, subscriber_cnt: 3800, data_create_month: "202408" },
    { id: 14, company_id: "8", monthly_employed_cnt: 12, monthly_retired_cnt: 25, subscriber_cnt: 3787, data_create_month: "202409" },
    { id: 15, company_id: "8", monthly_employed_cnt: 20, monthly_retired_cnt: 18, subscriber_cnt: 3789, data_create_month: "202410" },
    { id: 16, company_id: "8", monthly_employed_cnt: 25, monthly_retired_cnt: 15, subscriber_cnt: 3799, data_create_month: "202411" },
    { id: 17, company_id: "8", monthly_employed_cnt: 18, monthly_retired_cnt: 22, subscriber_cnt: 3795, data_create_month: "202412" },
    { id: 18, company_id: "8", monthly_employed_cnt: 28, monthly_retired_cnt: 12, subscriber_cnt: 3811, data_create_month: "202501" },
  ];

  const columns = [
    { id: "company_id", label: "company_id" },
    { id: "monthly_employed_cnt", label: "monthly_employed_cnt" },
    { id: "monthly_retired_cnt", label: "monthly_retired_cnt" },
    { id: "subscriber_cnt", label: "subscriber_cnt" },
    { id: "data_create_month", label: "data_create_month" },
  ];

  const [searchParams, setSearchParams] = useState({
    searchField: "all",
    searchValue: "",
  });

  const handleSearchChange = (field: string, value: string) => {
    setSearchParams(prev => ({ ...prev, [field]: value }));
  };

  const filteredData = employmentData.filter((item: any) => {
    const term = searchParams.searchValue.toLowerCase();
    if (!term) return true;

    if (searchParams.searchField === "all") {
      return Object.values(item).some(val => 
        String(val).toLowerCase().includes(term)
      );
    }

    const value = item[searchParams.searchField];
    return String(value).toLowerCase().includes(term);
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleResize = (columnId: string, width: number) => {
    setColumnWidths(prev => ({
      ...prev,
      [columnId]: Math.max(width, 50)
    }));
  };

  const toggleColumn = (columnId: string) => {
    setVisibleColumns(prev => ({
      ...prev,
      [columnId]: !prev[columnId]
    }));
  };

  const ResizableHeader = ({ id, label }: { id: string, label: string }) => {
    return (
      <th 
        className={`relative py-3 px-4 text-xs font-medium text-slate-400 uppercase tracking-wide border-r border-slate-200 group last:border-r-0`}
        style={{ width: columnWidths[id] }}
      >
        <div className="flex items-center gap-1.5">
          <span>{label}</span>
        </div>
        <div
          className="absolute right-0 top-0 h-full w-1 cursor-col-resize hover:bg-blue-400/50 transition-colors"
          onMouseDown={(e) => {
            const startX = e.pageX;
            const startWidth = columnWidths[id];
            
            const onMouseMove = (moveEvent: MouseEvent) => {
              const newWidth = startWidth + (moveEvent.pageX - startX);
              handleResize(id, newWidth);
            };
            
            const onMouseUp = () => {
              document.removeEventListener('mousemove', onMouseMove);
              document.removeEventListener('mouseup', onMouseUp);
            };
            
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
          }}
        />
      </th>
    );
  };

  // Dashboard Summary Data (matched with Dashboard.tsx)
  const summaryStats = {
    total: 87234,
    todayUpdate: 156,
    yesterdayUpdate: 142,
  };
  
  const diff = summaryStats.todayUpdate - summaryStats.yesterdayUpdate;
  const isPositive = diff >= 0;

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
                  <h1 className="text-lg md:text-xl font-semibold tracking-tight text-slate-800 truncate">Employment Data</h1>
                  <p className="text-xs md:text-sm text-slate-500 mt-0.5 hidden sm:block">Employee entry and exit tracking</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="gap-2 border-slate-200 hover:bg-slate-50 text-slate-700">
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export</span>
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6 bg-slate-50/50 overflow-y-auto overflow-x-hidden">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            
            {/* Summary Cards */}
            <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wide font-medium mb-1">Total Employees</p>
                  <p className="text-2xl font-bold text-slate-800">{summaryStats.total.toLocaleString()}</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-500" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wide font-medium mb-1">Today's Change</p>
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-bold text-slate-800">+{summaryStats.todayUpdate}</p>
                    <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded flex items-center">
                      <ArrowUpRight className="w-3 h-3 mr-0.5" />
                      Daily
                    </span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                  <UserPlus className="w-5 h-5 text-emerald-500" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wide font-medium mb-1">Vs Yesterday</p>
                  <div className="flex items-center gap-2">
                    <p className={`text-2xl font-bold ${isPositive ? 'text-emerald-600' : 'text-red-500'}`}>
                      {isPositive ? '+' : ''}{diff}
                    </p>
                    <span className={`text-xs font-medium px-1.5 py-0.5 rounded flex items-center ${isPositive ? 'text-emerald-600 bg-emerald-50' : 'text-red-600 bg-red-50'}`}>
                      {isPositive ? <TrendingUp className="w-3 h-3 mr-0.5" /> : <ArrowDownRight className="w-3 h-3 mr-0.5" />}
                      {((diff / summaryStats.yesterdayUpdate) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-purple-500" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="flex items-center justify-between gap-3 p-4 border-b border-slate-100">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">Employment Records</h2>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center h-9 border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500">
                    <select
                      value={searchParams.searchField}
                      onChange={(e) => handleSearchChange("searchField", e.target.value)}
                      className="h-full pl-3 pr-8 text-xs bg-slate-50 border-r border-slate-200 text-slate-600 focus:outline-none cursor-pointer hover:bg-slate-100 transition-colors w-32 rounded-none appearance-none"
                      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748b' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.5rem center', backgroundSize: '1rem' }}
                    >
                      <option value="all">All Fields</option>
                      {columns.map(col => (
                        <option key={col.id} value={col.id}>{col.label}</option>
                      ))}
                    </select>
                    <div className="relative flex items-center flex-1 h-full min-w-[200px]">
                      <Search className="absolute left-3 w-3.5 h-3.5 text-slate-400" />
                      <Input 
                        placeholder="Search..." 
                        value={searchParams.searchValue} 
                        onChange={(e) => handleSearchChange("searchValue", e.target.value)} 
                        className="pl-9 w-full border-none focus-visible:ring-0 text-sm h-full rounded-none" 
                      />
                    </div>
                  </div>
                  <div className="relative">
                    <Popover>
                      <PopoverTrigger asChild>
                         <button
                          className="flex items-center gap-2 px-3 h-9 border border-slate-200 rounded-lg text-sm bg-white text-slate-600 hover:bg-slate-50 transition-colors shadow-sm"
                        >
                          <Columns className="w-4 h-4" />
                          Fields
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-56 p-0 bg-slate-950 border-slate-800" align="end">
                        <div className="p-3 border-b border-slate-800 bg-slate-900/50">
                           <div className="flex items-center justify-between">
                            <h4 className="font-medium text-sm text-slate-100">Columns</h4>
                            <span className="text-xs text-slate-400">{columns.length} fields</span>
                          </div>
                        </div>
                        <div className="p-1.5 space-y-0.5 max-h-[300px] overflow-y-auto custom-scrollbar">
                          {columns.map((field) => (
                            <div 
                              key={field.id} 
                              className="flex items-center gap-2.5 px-2.5 py-2 hover:bg-slate-800/50 rounded-md cursor-pointer transition-colors group" 
                              onClick={() => toggleColumn(field.id)}
                            >
                              <div className={`w-4 h-4 rounded flex items-center justify-center transition-all ${visibleColumns[field.id] !== false ? 'bg-blue-600 shadow-sm shadow-blue-500/20' : 'border-2 border-slate-600 bg-transparent group-hover:border-slate-500'}`}>
                                {visibleColumns[field.id] !== false && <Check className="w-3 h-3 text-white stroke-[3]" />}
                              </div>
                              <span className={`text-sm ${visibleColumns[field.id] !== false ? 'text-slate-200 font-medium' : 'text-slate-400'}`}>{field.label}</span>
                            </div>
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50/50 border-b border-slate-100">
                    <tr>
                      {columns.map((col) => (
                        visibleColumns[col.id] !== false && (
                          <ResizableHeader key={col.id} id={col.id} label={col.label} />
                        )
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {paginatedData.length > 0 ? (
                      paginatedData.map((row: any) => (
                        <tr key={row.id} className="hover:bg-slate-50/50 transition-colors group">
                          {columns.map((col) => (
                            visibleColumns[col.id] !== false && (
                              <td 
                                key={col.id} 
                                className="px-4 py-3 text-sm text-slate-600 truncate relative"
                                style={{ maxWidth: columnWidths[col.id] }}
                              >
                                {row[col.id]}
                              </td>
                            )
                          ))}
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={columns.length} className="px-6 py-12 text-center text-slate-500">
                          <div className="flex flex-col items-center gap-2">
                            <Search className="w-8 h-8 text-slate-300" />
                            <p>No employment data found matching your criteria.</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="p-4 border-t border-slate-200 bg-white flex items-center justify-between text-xs text-slate-500">
                <div>
                   Showing {((currentPage - 1) * itemsPerPage) + 1} of {filteredData.length} records
                </div>
                <div className="flex items-center gap-2">
                    <span>Show</span>
                    <Select
                      value={String(itemsPerPage)}
                      onValueChange={(val) => {
                        setItemsPerPage(Number(val));
                        setCurrentPage(1);
                      }}
                    >
                      <SelectTrigger className="w-[60px] h-7 text-xs bg-white border-slate-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="20">20</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                        <SelectItem value="100">100</SelectItem>
                      </SelectContent>
                    </Select>
                    <span>per page</span>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </Button>
                  <div className="w-7 h-7 flex items-center justify-center bg-slate-900 text-white rounded-lg text-xs font-medium">
                    {currentPage}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages || totalPages === 0}
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}