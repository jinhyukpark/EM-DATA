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
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const industryData = [
  { name: "Manufacturing", value: 8542, color: "hsl(221, 83%, 53%)" },
  { name: "IT/Software", value: 6234, color: "hsl(152, 69%, 40%)" },
  { name: "Finance", value: 4521, color: "hsl(25, 95%, 53%)" },
  { name: "Retail", value: 3892, color: "hsl(271, 76%, 53%)" },
  { name: "Healthcare", value: 2847, color: "hsl(346, 77%, 50%)" },
  { name: "Construction", value: 2156, color: "hsl(199, 89%, 48%)" },
  { name: "Others", value: 6329, color: "hsl(220, 14%, 60%)" },
];

const regionData = [
  { name: "Seoul", count: 12450 },
  { name: "Gyeonggi", count: 8320 },
  { name: "Busan", count: 3240 },
  { name: "Incheon", count: 2180 },
  { name: "Daegu", count: 1890 },
  { name: "Daejeon", count: 1560 },
  { name: "Others", count: 4881 },
];

const companies = [
  { id: 1, name: "Samsung Electronics", industry: "Manufacturing", region: "Gyeonggi", employees: 267937, revenue: "302.2T", status: "Active", lastUpdate: "2025-01-09" },
  { id: 2, name: "SK Hynix", industry: "Manufacturing", region: "Gyeonggi", employees: 29000, revenue: "44.6T", status: "Active", lastUpdate: "2025-01-09" },
  { id: 3, name: "Hyundai Motor", industry: "Manufacturing", region: "Seoul", employees: 75000, revenue: "142.5T", status: "Active", lastUpdate: "2025-01-08" },
  { id: 4, name: "NAVER", industry: "IT/Software", region: "Gyeonggi", employees: 6200, revenue: "8.2T", status: "Active", lastUpdate: "2025-01-09" },
  { id: 5, name: "Kakao", industry: "IT/Software", region: "Gyeonggi", employees: 5800, revenue: "7.1T", status: "Active", lastUpdate: "2025-01-08" },
  { id: 6, name: "LG Electronics", industry: "Manufacturing", region: "Seoul", employees: 39000, revenue: "83.5T", status: "Active", lastUpdate: "2025-01-09" },
  { id: 7, name: "KB Financial", industry: "Finance", region: "Seoul", employees: 28000, revenue: "14.2T", status: "Active", lastUpdate: "2025-01-07" },
  { id: 8, name: "Shinhan Financial", industry: "Finance", region: "Seoul", employees: 23000, revenue: "12.8T", status: "Active", lastUpdate: "2025-01-09" },
  { id: 9, name: "CJ CheilJedang", industry: "Manufacturing", region: "Seoul", employees: 9800, revenue: "28.4T", status: "Active", lastUpdate: "2025-01-08" },
  { id: 10, name: "Coupang", industry: "Retail", region: "Seoul", employees: 68000, revenue: "26.5T", status: "Active", lastUpdate: "2025-01-09" },
  { id: 11, name: "Posco Holdings", industry: "Manufacturing", region: "Gyeonggi", employees: 19000, revenue: "84.8T", status: "Active", lastUpdate: "2025-01-08" },
  { id: 12, name: "Samsung SDI", industry: "Manufacturing", region: "Gyeonggi", employees: 11000, revenue: "20.1T", status: "Active", lastUpdate: "2025-01-09" },
];

const menuItems = [
  { id: "dashboard", name: "Dashboard", icon: LayoutDashboard, path: "/" },
];

const dataMenuItems = [
  { id: "company-data", name: "Company Data", icon: Building2, path: "/data/company" },
  { id: "patent-data", name: "Patent Data", icon: FileText, path: "/data/patent" },
  { id: "stock-data", name: "Stock Data", icon: TrendingUp, path: "/data/stock" },
  { id: "news-data", name: "News Data", icon: Newspaper, path: "/data/news" },
];

const serverMenuItems = [
  { id: "aws", name: "AWS", icon: Cloud, path: "/servers/aws", color: "text-orange-400" },
  { id: "gcp", name: "GCP", icon: Cloud, path: "/servers/gcp", color: "text-blue-400" },
  { id: "ncloud", name: "NCloud", icon: Cloud, path: "/servers/ncloud", color: "text-green-400" },
];

function Sidebar() {
  const [location] = useLocation();
  const [dataMenuOpen, setDataMenuOpen] = useState(true);
  const [serverMenuOpen, setServerMenuOpen] = useState(true);

  return (
    <aside className="w-64 bg-slate-900 min-h-screen flex flex-col" data-testid="sidebar">
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-xl font-bold text-white tracking-tight">Data Quality Center</h1>
        <p className="text-xs text-slate-400 mt-1">Internal Monitoring</p>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.path;
            return (
              <li key={item.id}>
                <Link href={item.path} className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white"}`} data-testid={`menu-${item.id}`}>
                  <Icon className="w-5 h-5" strokeWidth={1.5} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-6">
          <button onClick={() => setDataMenuOpen(!dataMenuOpen)} className="flex items-center justify-between w-full px-4 py-3 text-slate-400 hover:text-white transition-colors" data-testid="menu-data-toggle">
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
                  <Link href={item.path} className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${isActive ? "bg-blue-600/20 text-blue-400" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`} data-testid={`menu-${item.id}`}>
                    <Icon className="w-4 h-4" strokeWidth={1.5} />
                    <span className="text-sm">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </motion.ul>
        </div>

        <div className="mt-2">
          <button onClick={() => setServerMenuOpen(!serverMenuOpen)} className="flex items-center justify-between w-full px-4 py-3 text-slate-400 hover:text-white transition-colors" data-testid="menu-server-toggle">
            <div className="flex items-center gap-3">
              <Server className="w-5 h-5" strokeWidth={1.5} />
              <span className="font-medium text-sm">Server Management</span>
            </div>
            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${serverMenuOpen ? "rotate-180" : ""}`} />
          </button>
          <motion.ul initial={false} animate={{ height: serverMenuOpen ? "auto" : 0, opacity: serverMenuOpen ? 1 : 0 }} transition={{ duration: 0.2 }} className="overflow-hidden ml-4 space-y-1">
            {serverMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location === item.path;
              return (
                <li key={item.id}>
                  <Link href={item.path} className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${isActive ? "bg-blue-600/20 text-blue-400" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`} data-testid={`menu-${item.id}`}>
                    <Icon className={`w-4 h-4 ${item.color}`} strokeWidth={1.5} />
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

function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white rounded-lg p-3 shadow-lg border border-slate-100">
        <p className="text-sm font-medium text-slate-800 mb-1">{label}</p>
        <p className="text-sm text-slate-600">{payload[0].value.toLocaleString()} companies</p>
      </div>
    );
  }
  return null;
}

export default function CompanyData() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("All");
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const totalCompanies = 34521;
  const filteredCompanies = companies.filter((company) => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = selectedIndustry === "All" || company.industry === selectedIndustry;
    const matchesRegion = selectedRegion === "All" || company.region === selectedRegion;
    return matchesSearch && matchesIndustry && matchesRegion;
  });

  return (
    <div className="min-h-screen flex bg-slate-50">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
          <div className="px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-semibold tracking-tight text-slate-800">Company Data</h1>
                <p className="text-sm text-slate-500 mt-0.5">Audited company information database</p>
              </div>
              <Button variant="outline" size="sm" className="gap-2 border-slate-200 hover:bg-slate-50 text-slate-700" data-testid="export-button">
                <Download className="w-4 h-4" />
                Export
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 p-8 bg-white">
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="chart-container-light flex flex-col justify-center items-center p-6">
                <p className="text-sm text-slate-500 mb-2">Total Companies</p>
                <p className="text-4xl font-bold text-slate-800" data-testid="total-companies">{totalCompanies.toLocaleString()}</p>
                <p className="text-sm text-emerald-600 mt-2">+127 today</p>
              </div>

              <div className="chart-container-light lg:col-span-1">
                <h3 className="text-sm font-medium text-slate-500 mb-4">By Industry</h3>
                <div className="h-[180px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={industryData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={2} dataKey="value">
                        {industryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: number) => value.toLocaleString()} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="chart-container-light lg:col-span-2">
                <h3 className="text-sm font-medium text-slate-500 mb-4">By Region</h3>
                <div className="h-[180px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={regionData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                      <XAxis type="number" stroke="rgba(0,0,0,0.3)" fontSize={12} tickFormatter={(v) => v.toLocaleString()} />
                      <YAxis type="category" dataKey="name" stroke="rgba(0,0,0,0.3)" fontSize={12} width={70} />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="count" fill="hsl(221, 83%, 53%)" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </motion.section>

          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}>
            <div className="chart-container-light">
              <div className="flex flex-col lg:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input placeholder="Search company name..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 border-slate-200" data-testid="search-input" />
                </div>
                <div className="flex gap-3">
                  <div className="relative">
                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <select value={selectedIndustry} onChange={(e) => setSelectedIndustry(e.target.value)} className="pl-10 pr-8 py-2 border border-slate-200 rounded-lg text-sm bg-white text-slate-700 appearance-none cursor-pointer" data-testid="industry-filter">
                      <option value="All">All Industries</option>
                      <option value="Manufacturing">Manufacturing</option>
                      <option value="IT/Software">IT/Software</option>
                      <option value="Finance">Finance</option>
                      <option value="Retail">Retail</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Construction">Construction</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                  <div className="relative">
                    <select value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)} className="pl-4 pr-8 py-2 border border-slate-200 rounded-lg text-sm bg-white text-slate-700 appearance-none cursor-pointer" data-testid="region-filter">
                      <option value="All">All Regions</option>
                      <option value="Seoul">Seoul</option>
                      <option value="Gyeonggi">Gyeonggi</option>
                      <option value="Busan">Busan</option>
                      <option value="Incheon">Incheon</option>
                      <option value="Daegu">Daegu</option>
                      <option value="Daejeon">Daejeon</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full" data-testid="company-table">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Company Name</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Industry</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Region</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-slate-500">Employees</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-slate-500">Revenue</th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-slate-500">Status</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-slate-500">Last Update</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCompanies.map((company) => (
                      <tr key={company.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer" data-testid={`company-row-${company.id}`}>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                              <Building2 className="w-4 h-4 text-blue-600" />
                            </div>
                            <span className="font-medium text-slate-800">{company.name}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600">{company.industry}</span>
                        </td>
                        <td className="py-4 px-4 text-slate-600">{company.region}</td>
                        <td className="py-4 px-4 text-right font-mono text-slate-700">{company.employees.toLocaleString()}</td>
                        <td className="py-4 px-4 text-right font-mono text-slate-700">{company.revenue}</td>
                        <td className="py-4 px-4 text-center">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-600 border border-emerald-100">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            {company.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right text-sm text-slate-500">{company.lastUpdate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100">
                <p className="text-sm text-slate-500">Showing {filteredCompanies.length} of {totalCompanies.toLocaleString()} companies</p>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} className="border-slate-200" data-testid="prev-page">
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <span className="text-sm text-slate-600 px-3">Page {currentPage}</span>
                  <Button variant="outline" size="sm" onClick={() => setCurrentPage(currentPage + 1)} className="border-slate-200" data-testid="next-page">
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.section>
        </main>
      </div>
    </div>
  );
}
