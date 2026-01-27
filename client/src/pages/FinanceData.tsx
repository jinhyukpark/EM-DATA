import { useState } from "react";
import { motion } from "framer-motion";
import React from "react";
import {
  Search,
  Filter,
  Download,
  DollarSign,
  Menu,
  ChevronDown,
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

export default function FinanceData() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("aws");

  // Mock data for different finance categories
  const financeData = {
    aws: [
      { id: 1, companyName: "TechCorp", bizNum: "123-45-67890", year: "2024", amount: "$150,000", status: "Paid" },
      { id: 2, companyName: "StartUp Inc", bizNum: "222-33-44444", year: "2024", amount: "$45,000", status: "Pending" },
      { id: 3, companyName: "CloudSolutions", bizNum: "987-65-43210", year: "2023", amount: "$210,000", status: "Paid" },
    ],
    dart: [
      { id: 1, companyName: "Samsung Electronics", year: "2024", revenue: "250T KRW", profit: "40T KRW" },
      { id: 2, companyName: "LG Electronics", year: "2024", revenue: "80T KRW", profit: "3T KRW" },
      { id: 3, companyName: "SK Hynix", year: "2023", revenue: "30T KRW", profit: "-2T KRW" },
    ],
    venture: [
      { id: 1, companyName: "NextBigThing", bizNum: "555-55-55555", year: "2024", funding: "Series A", valuation: "$10M" },
      { id: 2, companyName: "GreenEnergy", bizNum: "777-88-99999", year: "2024", funding: "Seed", valuation: "$2M" },
      { id: 3, companyName: "AI Innovate", bizNum: "111-22-33333", year: "2023", funding: "Series B", valuation: "$50M" },
    ],
    audit: [
      { id: 1, companyName: "Global Trade", year: "2024", auditor: "PwC", opinion: "Unqualified" },
      { id: 2, companyName: "Construction Co", year: "2024", auditor: "KPMG", opinion: "Qualified" },
      { id: 3, companyName: "Retail Giant", year: "2023", auditor: "Deloitte", opinion: "Unqualified" },
    ],
  };

  const [searchParams, setSearchParams] = useState({
    companyName: "",
    bizNum: "",
    year: "",
  });

  const handleSearchChange = (field: string, value: string) => {
    setSearchParams(prev => ({ ...prev, [field]: value }));
  };

  const renderSearchFields = (tab: string) => {
    switch (tab) {
      case "aws":
        return (
          <>
            <div className="flex-1 min-w-[200px]">
              <label className="text-xs font-medium text-slate-500 mb-1.5 block">Company Name</label>
              <Input 
                placeholder="Search by company name..." 
                className="bg-white"
                value={searchParams.companyName}
                onChange={(e) => handleSearchChange("companyName", e.target.value)}
              />
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="text-xs font-medium text-slate-500 mb-1.5 block">Business Number</label>
              <Input 
                placeholder="Search by business number..." 
                className="bg-white"
                value={searchParams.bizNum}
                onChange={(e) => handleSearchChange("bizNum", e.target.value)}
              />
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="text-xs font-medium text-slate-500 mb-1.5 block">Year</label>
              <Select value={searchParams.year} onValueChange={(val) => handleSearchChange("year", val)}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2025">2025</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        );
      case "dart":
        return (
          <>
            <div className="flex-1 min-w-[200px]">
              <label className="text-xs font-medium text-slate-500 mb-1.5 block">Company Name</label>
              <Input 
                placeholder="Search by company name..." 
                className="bg-white"
                value={searchParams.companyName}
                onChange={(e) => handleSearchChange("companyName", e.target.value)}
              />
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="text-xs font-medium text-slate-500 mb-1.5 block">Year</label>
              <Select value={searchParams.year} onValueChange={(val) => handleSearchChange("year", val)}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2025">2025</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        );
      case "venture":
        return (
          <>
            <div className="flex-1 min-w-[200px]">
              <label className="text-xs font-medium text-slate-500 mb-1.5 block">Company Name</label>
              <Input 
                placeholder="Search by company name..." 
                className="bg-white"
                value={searchParams.companyName}
                onChange={(e) => handleSearchChange("companyName", e.target.value)}
              />
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="text-xs font-medium text-slate-500 mb-1.5 block">Business Number</label>
              <Input 
                placeholder="Search by business number..." 
                className="bg-white"
                value={searchParams.bizNum}
                onChange={(e) => handleSearchChange("bizNum", e.target.value)}
              />
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="text-xs font-medium text-slate-500 mb-1.5 block">Year</label>
              <Select value={searchParams.year} onValueChange={(val) => handleSearchChange("year", val)}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2025">2025</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        );
      case "audit":
        return (
          <>
            <div className="flex-1 min-w-[200px]">
              <label className="text-xs font-medium text-slate-500 mb-1.5 block">Company Name</label>
              <Input 
                placeholder="Search by company name..." 
                className="bg-white"
                value={searchParams.companyName}
                onChange={(e) => handleSearchChange("companyName", e.target.value)}
              />
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="text-xs font-medium text-slate-500 mb-1.5 block">Year</label>
              <Select value={searchParams.year} onValueChange={(val) => handleSearchChange("year", val)}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2025">2025</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  const getApiEndpoint = (tab: string) => {
    switch (tab) {
      case "aws": return "/internal/data/finance/aws/list";
      case "dart": return "/internal/data/finance/dart/list";
      case "venture": return "/internal/data/finance/venture/list";
      case "audit": return "/internal/data/finance/audit/list";
      default: return "";
    }
  };

  const getTableHeaders = (tab: string) => {
    switch (tab) {
      case "aws":
        return ["Company Name", "Business Number", "Year", "Amount", "Status"];
      case "dart":
        return ["Company Name", "Year", "Revenue", "Profit"];
      case "venture":
        return ["Company Name", "Business Number", "Year", "Funding Stage", "Valuation"];
      case "audit":
        return ["Company Name", "Year", "Auditor", "Opinion"];
      default:
        return [];
    }
  };

  const getTableData = (tab: string) => {
    return financeData[tab as keyof typeof financeData] || [];
  };

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
                <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center flex-shrink-0">
                  <DollarSign className="w-5 h-5 text-white" />
                </div>
                <div className="min-w-0">
                  <h1 className="text-lg md:text-xl font-semibold tracking-tight text-slate-800 truncate">Finance Data</h1>
                  <p className="text-xs md:text-sm text-slate-500 mt-0.5 hidden sm:block">Financial data management and tracking</p>
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
            <div className="w-full space-y-6">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveTab("aws")}
                  className={`px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
                    activeTab === "aws"
                      ? "bg-slate-900 text-white"
                      : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                  }`}
                >
                  AWS Finance
                </button>
                <button
                  onClick={() => setActiveTab("dart")}
                  className={`px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
                    activeTab === "dart"
                      ? "bg-slate-900 text-white"
                      : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                  }`}
                >
                  DART Finance
                </button>
                <button
                  onClick={() => setActiveTab("venture")}
                  className={`px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
                    activeTab === "venture"
                      ? "bg-slate-900 text-white"
                      : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                  }`}
                >
                  Venture Finance
                </button>
                <button
                  onClick={() => setActiveTab("audit")}
                  className={`px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
                    activeTab === "audit"
                      ? "bg-slate-900 text-white"
                      : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                  }`}
                >
                  Audit Finance
                </button>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="flex-1 flex flex-wrap gap-4 items-end">
                    {renderSearchFields(activeTab)}
                    <Button className="bg-amber-500 hover:bg-amber-600 text-white gap-2 h-10">
                      <Search className="w-4 h-4" />
                      Search
                    </Button>
                  </div>
                </div>

                <div className="mb-4 p-3 bg-slate-50 rounded-lg border border-slate-200 font-mono text-xs text-slate-500 flex items-center gap-2">
                  <span className="font-semibold text-slate-700">API Endpoint:</span>
                  {getApiEndpoint(activeTab)}
                </div>

                <div className="overflow-x-auto rounded-lg border border-slate-200">
                  <table className="w-full">
                    <thead className="bg-slate-50">
                      <tr>
                        {getTableHeaders(activeTab).map((header, idx) => (
                          <th key={idx} className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            {header}
                          </th>
                        ))}
                        <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                      {getTableData(activeTab).map((row: any) => (
                        <tr key={row.id} className="hover:bg-slate-50/50">
                          {Object.keys(row).filter(k => k !== 'id').map((key, idx) => (
                            <td key={idx} className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
                              {row[key]}
                            </td>
                          ))}
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Button variant="ghost" size="sm" className="text-amber-600 hover:text-amber-700 hover:bg-amber-50">
                              Details
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
