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
  Menu,
} from "lucide-react";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const employmentTrends = [
  // Samsung Electronics
  { month: "2024-08", company: "Samsung Electronics", entryCount: 45, exitCount: 30, totalEmployees: 12450 },
  { month: "2024-09", company: "Samsung Electronics", entryCount: 38, exitCount: 42, totalEmployees: 12446 },
  { month: "2024-10", company: "Samsung Electronics", entryCount: 52, exitCount: 28, totalEmployees: 12470 },
  { month: "2024-11", company: "Samsung Electronics", entryCount: 60, exitCount: 35, totalEmployees: 12495 },
  { month: "2024-12", company: "Samsung Electronics", entryCount: 40, exitCount: 45, totalEmployees: 12490 },
  { month: "2025-01", company: "Samsung Electronics", entryCount: 55, exitCount: 25, totalEmployees: 12520 },

  // NAVER
  { month: "2024-08", company: "NAVER", entryCount: 20, exitCount: 15, totalEmployees: 4500 },
  { month: "2024-09", company: "NAVER", entryCount: 25, exitCount: 18, totalEmployees: 4507 },
  { month: "2024-10", company: "NAVER", entryCount: 18, exitCount: 22, totalEmployees: 4503 },
  { month: "2024-11", company: "NAVER", entryCount: 30, exitCount: 12, totalEmployees: 4521 },
  { month: "2024-12", company: "NAVER", entryCount: 22, exitCount: 20, totalEmployees: 4523 },
  { month: "2025-01", company: "NAVER", entryCount: 35, exitCount: 10, totalEmployees: 4548 },

  // Kakao
  { month: "2024-08", company: "Kakao", entryCount: 15, exitCount: 20, totalEmployees: 3800 },
  { month: "2024-09", company: "Kakao", entryCount: 12, exitCount: 25, totalEmployees: 3787 },
  { month: "2024-10", company: "Kakao", entryCount: 20, exitCount: 18, totalEmployees: 3789 },
  { month: "2024-11", company: "Kakao", entryCount: 25, exitCount: 15, totalEmployees: 3799 },
  { month: "2024-12", company: "Kakao", entryCount: 18, exitCount: 22, totalEmployees: 3795 },
  { month: "2025-01", company: "Kakao", entryCount: 28, exitCount: 12, totalEmployees: 3811 },
];

const companies = Array.from(new Set(employmentTrends.map(d => d.company)));

export default function EmploymentData() {
  const [selectedCompany, setSelectedCompany] = useState<string>("Samsung Electronics");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filteredData = useMemo(() => {
    return employmentTrends.filter(d => d.company === selectedCompany);
  }, [selectedCompany]);

  const latestStats = useMemo(() => {
    if (filteredData.length === 0) return { total: 0, entry: 0, exit: 0 };
    const latest = filteredData[filteredData.length - 1];
    return {
      total: latest.totalEmployees,
      entry: latest.entryCount,
      exit: latest.exitCount,
    };
  }, [filteredData]);

  // Calculate trends for "This Week" (using last month difference as a proxy for mock data)
  const trendStats = useMemo(() => {
    if (filteredData.length < 2) return 0;
    const current = filteredData[filteredData.length - 1].totalEmployees;
    const previous = filteredData[filteredData.length - 2].totalEmployees;
    return current - previous;
  }, [filteredData]);

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

        <main className="flex-1 p-4 md:p-6 bg-slate-50/50 overflow-y-auto overflow-x-hidden">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05, duration: 0.3 }} className="mb-6">
              <div className="flex items-center gap-8 py-4 px-6 bg-white rounded-xl border border-slate-100 overflow-x-auto">
                <div className="flex items-center gap-3 min-w-max">
                  <Users className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wide">Total Employees</p>
                    <p className="text-xl font-bold text-slate-800">{latestStats.total.toLocaleString()}</p>
                  </div>
                </div>
                <div className="w-px h-10 bg-slate-200" />
                <div className="flex items-center gap-3 min-w-max">
                  <UserPlus className="w-5 h-5 text-emerald-500" />
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wide">Recent Entries</p>
                    <p className="text-xl font-bold text-emerald-600">{latestStats.entry}</p>
                  </div>
                </div>
                <div className="w-px h-10 bg-slate-200" />
                <div className="flex items-center gap-3 min-w-max">
                  <UserMinus className="w-5 h-5 text-red-500" />
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wide">Recent Exits</p>
                    <p className="text-xl font-bold text-red-600">{latestStats.exit}</p>
                  </div>
                </div>
                <div className="w-px h-10 bg-slate-200" />
                <div className="flex items-center gap-3 min-w-max">
                  <Activity className="w-5 h-5 text-purple-500" />
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wide">Net Change</p>
                    <p className={`text-xl font-bold ${trendStats >= 0 ? 'text-purple-600' : 'text-red-500'}`}>
                      {trendStats > 0 ? '+' : ''}{trendStats}
                    </p>
                  </div>
                </div>
                <div className="w-px h-10 bg-slate-200" />
                <div className="flex items-center gap-3 min-w-max">
                  <Clock className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wide">Last Updated</p>
                    <p className="text-xl font-bold text-slate-800">2025-01</p>
                  </div>
                </div>
              </div>
            </motion.section>

            <div className="grid gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">Employment Trends</h2>
                    <p className="text-sm text-slate-500 mt-1">Monthly entries, exits, and total employee count</p>
                  </div>
                  <div className="w-full sm:w-64">
                    <Select value={selectedCompany} onValueChange={setSelectedCompany}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select company" />
                      </SelectTrigger>
                      <SelectContent>
                        {companies.map(company => (
                          <SelectItem key={company} value={company}>{company}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={filteredData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                      <XAxis 
                        dataKey="month" 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#64748b', fontSize: 12 }}
                        dy={10}
                      />
                      <YAxis 
                        yAxisId="left"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#64748b', fontSize: 12 }}
                      />
                      <YAxis 
                        yAxisId="right" 
                        orientation="right"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#64748b', fontSize: 12 }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#fff', 
                          borderRadius: '8px', 
                          border: '1px solid #e2e8f0',
                          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                        }}
                      />
                      <Legend />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="totalEmployees"
                        name="Total Employees"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        dot={{ fill: '#3b82f6', strokeWidth: 2 }}
                        activeDot={{ r: 6 }}
                      />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="entryCount"
                        name="Entries"
                        stroke="#10b981"
                        strokeWidth={2}
                        dot={{ fill: '#10b981', strokeWidth: 2 }}
                      />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="exitCount"
                        name="Exits"
                        stroke="#ef4444"
                        strokeWidth={2}
                        dot={{ fill: '#ef4444', strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
