import { useState } from "react";
import { motion } from "framer-motion";
import React from "react";
import {
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Download,
  Clock,
  Activity,
  UserCog,
  UserPlus,
  UserMinus,
  Users,
  Briefcase,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Menu,
  Palette,
} from "lucide-react";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const employmentRecords = [
  { id: 1, employeeName: "Kim Ji-Hoon", company: "Samsung Electronics", department: "Semiconductor R&D", position: "Senior Engineer", type: "Entry", date: "2025-01-08", previousCompany: "SK Hynix", reason: "Career Development" },
  { id: 2, employeeName: "Park Soo-Min", company: "NAVER", department: "AI Research", position: "ML Engineer", type: "Entry", date: "2025-01-07", previousCompany: "Kakao", reason: "Better Opportunity" },
  { id: 3, employeeName: "Lee Dong-Hyun", company: "Hyundai Motor", department: "EV Development", position: "Manager", type: "Exit", date: "2025-01-06", previousCompany: null, reason: "Retirement" },
  { id: 4, employeeName: "Choi Ye-Jin", company: "LG Energy Solution", department: "Battery Engineering", position: "Team Lead", type: "Entry", date: "2025-01-05", previousCompany: "POSCO", reason: "Career Change" },
  { id: 5, employeeName: "Jung Min-Woo", company: "Kakao", department: "Platform Development", position: "Staff Engineer", type: "Exit", date: "2025-01-05", previousCompany: null, reason: "Personal Reasons" },
  { id: 6, employeeName: "Han Seo-Yeon", company: "SK Telecom", department: "5G Infrastructure", position: "Engineer", type: "Entry", date: "2025-01-04", previousCompany: "KT", reason: "Better Benefits" },
  { id: 7, employeeName: "Yoon Tae-Hyung", company: "Coupang", department: "Logistics Tech", position: "Principal Engineer", type: "Exit", date: "2025-01-03", previousCompany: null, reason: "Starting Own Business" },
  { id: 8, employeeName: "Kwon Na-Ri", company: "Samsung SDI", department: "Materials Research", position: "Researcher", type: "Entry", date: "2025-01-03", previousCompany: "Fresh Graduate", reason: "New Hire" },
  { id: 9, employeeName: "Shin Jae-Won", company: "NAVER", department: "Cloud Platform", position: "DevOps Lead", type: "Entry", date: "2025-01-02", previousCompany: "Amazon Korea", reason: "Career Development" },
  { id: 10, employeeName: "Lim Hye-Soo", company: "KB Financial", department: "Digital Banking", position: "VP", type: "Exit", date: "2025-01-02", previousCompany: null, reason: "Competitor Offer" },
];

export default function EmploymentData() {
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
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState<"all" | "entry" | "exit">("all");
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const filteredRecords = employmentRecords.filter(record => {
    const matchesSearch = record.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "all" || 
      (activeTab === "entry" && record.type === "Entry") ||
      (activeTab === "exit" && record.type === "Exit");
    return matchesSearch && matchesTab;
  });

  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);
  const paginatedRecords = filteredRecords.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const entryCount = employmentRecords.filter(r => r.type === "Entry").length;
  const exitCount = employmentRecords.filter(r => r.type === "Exit").length;

  const [searchField, setSearchField] = useState("all");

  const [columnWidths, setColumnWidths] = useState<Record<string, number>>({
    employeeName: 200,
    type: 100,
    company: 150,
    department: 150,
    position: 150,
    date: 120,
    reason: 200,
  });

  const handleResize = (columnId: string, width: number) => {
    setColumnWidths(prev => ({
      ...prev,
      [columnId]: Math.max(width, 50)
    }));
  };

  const ResizableHeader = ({ id, label, align = "left", children }: { id: string, label: string, align?: "left" | "center" | "right", children?: React.ReactNode }) => {
    return (
      <th 
        className={`relative py-3 px-4 text-xs font-medium text-slate-400 uppercase tracking-wide border-r border-slate-200 group last:border-r-0`}
        style={{ width: columnWidths[id] }}
      >
        <div className={`flex items-center gap-1.5 ${align === 'center' ? 'justify-center' : align === 'right' ? 'justify-end' : 'justify-start'}`}>
          <span>{label}</span>
          {children}
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
                  <h1 className="text-lg md:text-xl font-semibold tracking-tight text-slate-800 truncate">Employment Data</h1>
                  <p className="text-xs md:text-sm text-slate-500 mt-0.5 hidden sm:block">Employee entry and exit tracking</p>
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
                    <p className="text-xl font-bold text-slate-800">{employmentRecords.length}</p>
                  </div>
                </div>
                <div className="w-px h-10 bg-slate-200" />
                <div className="flex items-center gap-3">
                  <UserPlus className="w-5 h-5 text-emerald-500" />
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wide">Entries</p>
                    <p className="text-xl font-bold text-emerald-600">{entryCount}</p>
                  </div>
                </div>
                <div className="w-px h-10 bg-slate-200" />
                <div className="flex items-center gap-3">
                  <UserMinus className="w-5 h-5 text-red-500" />
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
                    <p className="text-xl font-bold text-purple-600">+5</p>
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
              <div className="flex items-center gap-3">
                <div className="flex items-center h-9 border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500">
                  <select 
                    value={searchField} 
                    onChange={(e) => setSearchField(e.target.value)}
                    className="h-full pl-3 pr-8 text-xs bg-slate-50 border-r border-slate-200 text-slate-600 focus:outline-none cursor-pointer hover:bg-slate-100 transition-colors w-32 rounded-none appearance-none"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748b' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.5rem center', backgroundSize: '1rem' }}
                  >
                    <option value="all">All Fields</option>
                    <option value="employeeName">Employee</option>
                    <option value="company">Company</option>
                    <option value="department">Department</option>
                  </select>
                  <div className="relative flex items-center flex-1 h-full min-w-[200px]">
                    <Search className="absolute left-3 w-3.5 h-3.5 text-slate-400" />
                    <Input 
                      placeholder="Search employees, companies..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 w-full border-none focus-visible:ring-0 text-sm h-full rounded-none" 
                      data-testid="search-employment" 
                    />
                  </div>
                </div>
                <Button variant="outline" className="gap-2 h-9">
                  <Filter className="w-4 h-4" />
                  Filters
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab("all")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === "all" ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-slate-100"}`}
                  data-testid="tab-all"
                >
                  All
                </button>
                <button
                  onClick={() => setActiveTab("entry")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${activeTab === "entry" ? "bg-emerald-600 text-white" : "text-slate-600 hover:bg-slate-100"}`}
                  data-testid="tab-entry"
                >
                  <ArrowUpRight className="w-4 h-4" />
                  Entry
                </button>
                <button
                  onClick={() => setActiveTab("exit")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${activeTab === "exit" ? "bg-red-600 text-white" : "text-slate-600 hover:bg-slate-100"}`}
                  data-testid="tab-exit"
                >
                  <ArrowDownRight className="w-4 h-4" />
                  Exit
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full" data-testid="employment-table">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                    <ResizableHeader id="employeeName" label="Employee">
                      <div className="relative">
                        <button onClick={(e) => { e.stopPropagation(); setActiveColorPicker(activeColorPicker === 'employeeName' ? null : 'employeeName'); }} className="p-1 hover:bg-slate-200 rounded transition-colors">
                          <Palette className="w-3 h-3 text-slate-400" />
                        </button>
                        {activeColorPicker === 'employeeName' && (
                          <div className="absolute left-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-slate-200 p-2 z-20 flex flex-wrap gap-1 w-32">
                            {colorOptions.map((color) => (
                              <button key={color.name} onClick={() => { setColumnColors(prev => ({ ...prev, employeeName: color.value })); setActiveColorPicker(null); }} className="w-5 h-5 rounded-full border border-slate-200 hover:scale-110 transition-transform" style={{ backgroundColor: color.value || '#f1f5f9' }} title={color.name} />
                            ))}
                          </div>
                        )}
                      </div>
                    </ResizableHeader>
                    <ResizableHeader id="type" label="Type" align="center">
                      <div className="relative">
                        <button onClick={(e) => { e.stopPropagation(); setActiveColorPicker(activeColorPicker === 'type' ? null : 'type'); }} className="p-1 hover:bg-slate-200 rounded transition-colors">
                          <Palette className="w-3 h-3 text-slate-400" />
                        </button>
                        {activeColorPicker === 'type' && (
                          <div className="absolute left-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-slate-200 p-2 z-20 flex flex-wrap gap-1 w-32">
                            {colorOptions.map((color) => (
                              <button key={color.name} onClick={() => { setColumnColors(prev => ({ ...prev, type: color.value })); setActiveColorPicker(null); }} className="w-5 h-5 rounded-full border border-slate-200 hover:scale-110 transition-transform" style={{ backgroundColor: color.value || '#f1f5f9' }} title={color.name} />
                            ))}
                          </div>
                        )}
                      </div>
                    </ResizableHeader>
                    <ResizableHeader id="company" label="Company">
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
                    </ResizableHeader>
                    <ResizableHeader id="department" label="Department">
                      <div className="relative">
                        <button onClick={(e) => { e.stopPropagation(); setActiveColorPicker(activeColorPicker === 'department' ? null : 'department'); }} className="p-1 hover:bg-slate-200 rounded transition-colors">
                          <Palette className="w-3 h-3 text-slate-400" />
                        </button>
                        {activeColorPicker === 'department' && (
                          <div className="absolute left-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-slate-200 p-2 z-20 flex flex-wrap gap-1 w-32">
                            {colorOptions.map((color) => (
                              <button key={color.name} onClick={() => { setColumnColors(prev => ({ ...prev, department: color.value })); setActiveColorPicker(null); }} className="w-5 h-5 rounded-full border border-slate-200 hover:scale-110 transition-transform" style={{ backgroundColor: color.value || '#f1f5f9' }} title={color.name} />
                            ))}
                          </div>
                        )}
                      </div>
                    </ResizableHeader>
                    <ResizableHeader id="position" label="Position">
                      <div className="relative">
                        <button onClick={(e) => { e.stopPropagation(); setActiveColorPicker(activeColorPicker === 'position' ? null : 'position'); }} className="p-1 hover:bg-slate-200 rounded transition-colors">
                          <Palette className="w-3 h-3 text-slate-400" />
                        </button>
                        {activeColorPicker === 'position' && (
                          <div className="absolute left-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-slate-200 p-2 z-20 flex flex-wrap gap-1 w-32">
                            {colorOptions.map((color) => (
                              <button key={color.name} onClick={() => { setColumnColors(prev => ({ ...prev, position: color.value })); setActiveColorPicker(null); }} className="w-5 h-5 rounded-full border border-slate-200 hover:scale-110 transition-transform" style={{ backgroundColor: color.value || '#f1f5f9' }} title={color.name} />
                            ))}
                          </div>
                        )}
                      </div>
                    </ResizableHeader>
                    <ResizableHeader id="date" label="Date">
                      <div className="relative">
                        <button onClick={(e) => { e.stopPropagation(); setActiveColorPicker(activeColorPicker === 'date' ? null : 'date'); }} className="p-1 hover:bg-slate-200 rounded transition-colors">
                          <Palette className="w-3 h-3 text-slate-400" />
                        </button>
                        {activeColorPicker === 'date' && (
                          <div className="absolute left-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-slate-200 p-2 z-20 flex flex-wrap gap-1 w-32">
                            {colorOptions.map((color) => (
                              <button key={color.name} onClick={() => { setColumnColors(prev => ({ ...prev, date: color.value })); setActiveColorPicker(null); }} className="w-5 h-5 rounded-full border border-slate-200 hover:scale-110 transition-transform" style={{ backgroundColor: color.value || '#f1f5f9' }} title={color.name} />
                            ))}
                          </div>
                        )}
                      </div>
                    </ResizableHeader>
                    <ResizableHeader id="reason" label="Previous/Reason">
                      <div className="relative">
                        <button onClick={(e) => { e.stopPropagation(); setActiveColorPicker(activeColorPicker === 'reason' ? null : 'reason'); }} className="p-1 hover:bg-slate-200 rounded transition-colors">
                          <Palette className="w-3 h-3 text-slate-400" />
                        </button>
                        {activeColorPicker === 'reason' && (
                          <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-slate-200 p-2 z-20 flex flex-wrap gap-1 w-32">
                            {colorOptions.map((color) => (
                              <button key={color.name} onClick={() => { setColumnColors(prev => ({ ...prev, reason: color.value })); setActiveColorPicker(null); }} className="w-5 h-5 rounded-full border border-slate-200 hover:scale-110 transition-transform" style={{ backgroundColor: color.value || '#f1f5f9' }} title={color.name} />
                            ))}
                          </div>
                        )}
                      </div>
                    </ResizableHeader>
                  </tr>
                </thead>
                <tbody>
                  {paginatedRecords.map((record) => (
                    <tr key={record.id} className="border-b border-slate-100 hover:bg-slate-50 cursor-pointer" data-testid={`employment-row-${record.id}`}>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${record.type === "Entry" ? "bg-emerald-50" : "bg-red-50"}`}>
                            {record.type === "Entry" ? (
                              <UserPlus className="w-4 h-4 text-emerald-600" />
                            ) : (
                              <UserMinus className="w-4 h-4 text-red-600" />
                            )}
                          </div>
                          <span className="font-medium text-slate-800" style={{ color: columnColors.employeeName || undefined }}>{record.employeeName}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          record.type === "Entry" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                        }`} style={{ color: columnColors.type || undefined, backgroundColor: columnColors.type ? undefined : undefined }}>
                          {record.type}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-sm text-slate-600" style={{ color: columnColors.company || undefined }}>{record.company}</td>
                      <td className="py-4 px-4 text-sm text-slate-600" style={{ color: columnColors.department || undefined }}>{record.department}</td>
                      <td className="py-4 px-4 text-sm text-slate-600" style={{ color: columnColors.position || undefined }}>{record.position}</td>
                      <td className="py-4 px-4 text-sm text-slate-600" style={{ color: columnColors.date || undefined }}>{record.date}</td>
                      <td className="py-4 px-4 text-sm text-slate-500" style={{ color: columnColors.reason || undefined }}>
                        {record.type === "Entry" ? (
                          <span className="flex items-center gap-1">
                            <span className="text-slate-400">From:</span> {record.previousCompany}
                          </span>
                        ) : (
                          <span>{record.reason}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-4">
                <p className="text-sm text-slate-500">
                  Showing {filteredRecords.length > 0 ? ((currentPage - 1) * itemsPerPage) + 1 : 0} to {Math.min(currentPage * itemsPerPage, filteredRecords.length)} of {filteredRecords.length} records
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
