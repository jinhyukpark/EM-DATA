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
  Clock,
  Activity,
  PieChart as PieChartIcon,
  X,
  MapPin,
  User,
  DollarSign,
  Calendar,
  Briefcase,
  Globe,
  Users,
  Tag,
  ExternalLink,
  BarChart3,
  Columns,
  Check,
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

const listedCompanies = [
  { id: 1, name: "Samsung Electronics", ceo: "Jong-Hee Han", address: "129 Samsung-ro, Yeongtong-gu, Suwon", industry: "Manufacturing", revenue: "302.2T", operatingProfit: "43.4T", debt: "91.2T", netIncome: "38.2T", status: "Active", lastUpdate: "2025-01-09", foundedDate: "1969-01-13", employees: 267937, companyType: "Large Enterprise", country: "Korea", listingStatus: "KOSPI", website: "www.samsung.com", keywords: ["Electronics", "Semiconductor", "Display"] },
  { id: 2, name: "SK Hynix", ceo: "Kwak Noh-Jung", address: "2091 Gyeongchung-daero, Bubal-eup, Icheon", industry: "Manufacturing", revenue: "44.6T", operatingProfit: "6.8T", debt: "28.4T", netIncome: "5.2T", status: "Active", lastUpdate: "2025-01-09", foundedDate: "1983-02-01", employees: 29000, companyType: "Large Enterprise", country: "Korea", listingStatus: "KOSPI", website: "www.skhynix.com", keywords: ["Semiconductor", "Memory", "NAND"] },
  { id: 3, name: "Hyundai Motor", ceo: "Jae-Hoon Chang", address: "12 Heolleung-ro, Seocho-gu, Seoul", industry: "Manufacturing", revenue: "142.5T", operatingProfit: "11.6T", debt: "45.8T", netIncome: "8.9T", status: "Active", lastUpdate: "2025-01-08", foundedDate: "1967-12-29", employees: 75000, companyType: "Large Enterprise", country: "Korea", listingStatus: "KOSPI", website: "www.hyundai.com", keywords: ["Automotive", "EV", "Mobility"] },
  { id: 4, name: "NAVER", ceo: "Soo-Yeon Choi", address: "6 Buljeong-ro, Bundang-gu, Seongnam", industry: "IT/Software", revenue: "8.2T", operatingProfit: "1.4T", debt: "3.2T", netIncome: "1.1T", status: "Active", lastUpdate: "2025-01-09", foundedDate: "1999-06-02", employees: 6200, companyType: "Large Enterprise", country: "Korea", listingStatus: "KOSPI", website: "www.navercorp.com", keywords: ["Search", "Portal", "AI"] },
  { id: 5, name: "Kakao", ceo: "Sung-Soo Hong", address: "242 Cheomdan-ro, Jeju-si", industry: "IT/Software", revenue: "7.1T", operatingProfit: "0.8T", debt: "4.1T", netIncome: "0.5T", status: "Active", lastUpdate: "2025-01-08", foundedDate: "2010-03-18", employees: 5800, companyType: "Large Enterprise", country: "Korea", listingStatus: "KOSPI", website: "www.kakaocorp.com", keywords: ["Messenger", "Platform", "Fintech"] },
  { id: 6, name: "LG Electronics", ceo: "William Cho", address: "128 Yeoui-daero, Yeongdeungpo-gu, Seoul", industry: "Manufacturing", revenue: "83.5T", operatingProfit: "3.5T", debt: "22.1T", netIncome: "2.8T", status: "Active", lastUpdate: "2025-01-09", foundedDate: "1958-10-01", employees: 39000, companyType: "Large Enterprise", country: "Korea", listingStatus: "KOSPI", website: "www.lg.com", keywords: ["Electronics", "Home Appliance", "TV"] },
];

const unlistedCompanies = [
  { id: 7, name: "Woowa Brothers", ceo: "Bom-Jun Kim", address: "38 Songpa-daero, Songpa-gu, Seoul", industry: "IT/Software", revenue: "2.8T", operatingProfit: "0.3T", debt: "1.2T", netIncome: "0.2T", status: "Active", lastUpdate: "2025-01-09", foundedDate: "2011-03-21", employees: 4200, companyType: "SME", country: "Korea", listingStatus: "Unlisted", website: "www.woowahan.com", keywords: ["Delivery", "Food", "Platform"] },
  { id: 8, name: "Kurly", ceo: "Sophie Kim", address: "552 Teheran-ro, Gangnam-gu, Seoul", industry: "Retail", revenue: "2.1T", operatingProfit: "-0.4T", debt: "0.8T", netIncome: "-0.5T", status: "Active", lastUpdate: "2025-01-08", foundedDate: "2015-05-01", employees: 3800, companyType: "SME", country: "Korea", listingStatus: "Unlisted", website: "www.kurly.com", keywords: ["Grocery", "E-commerce", "Fresh"] },
  { id: 9, name: "Yanolja", ceo: "Jong-Yoon Kim", address: "311 Gangnam-daero, Seocho-gu, Seoul", industry: "IT/Software", revenue: "0.9T", operatingProfit: "0.1T", debt: "0.5T", netIncome: "0.08T", status: "Active", lastUpdate: "2025-01-07", foundedDate: "2005-07-12", employees: 1200, companyType: "SME", country: "Korea", listingStatus: "Unlisted", website: "www.yanolja.com", keywords: ["Travel", "Accommodation", "Leisure"] },
  { id: 10, name: "Viva Republica", ceo: "Seung-Gun Lee", address: "83 Uisadang-daero, Yeongdeungpo-gu, Seoul", industry: "Finance", revenue: "1.2T", operatingProfit: "-0.2T", debt: "0.6T", netIncome: "-0.3T", status: "Active", lastUpdate: "2025-01-09", foundedDate: "2013-04-01", employees: 2100, companyType: "SME", country: "Korea", listingStatus: "Unlisted", website: "www.toss.im", keywords: ["Fintech", "Banking", "Payment"] },
  { id: 11, name: "Musinsa", ceo: "Han-Seok Cho", address: "807 Seolleung-ro, Gangnam-gu, Seoul", industry: "Retail", revenue: "0.8T", operatingProfit: "0.08T", debt: "0.3T", netIncome: "0.05T", status: "Active", lastUpdate: "2025-01-08", foundedDate: "2001-08-01", employees: 1800, companyType: "SME", country: "Korea", listingStatus: "Unlisted", website: "www.musinsa.com", keywords: ["Fashion", "E-commerce", "Streetwear"] },
];

const auditedCompanies = [
  { id: 12, name: "KB Financial", ceo: "Jong-Kyoo Yoon", address: "84 Namdaemun-ro, Jung-gu, Seoul", industry: "Finance", revenue: "14.2T", operatingProfit: "5.2T", debt: "412.5T", netIncome: "4.1T", status: "Active", lastUpdate: "2025-01-07", foundedDate: "2008-09-29", employees: 28000, companyType: "Large Enterprise", country: "Korea", listingStatus: "Audited", website: "www.kbfg.com", keywords: ["Banking", "Insurance", "Securities"] },
  { id: 13, name: "Shinhan Financial", ceo: "Jin-Won Jin", address: "20 Sejong-daero 9-gil, Jung-gu, Seoul", industry: "Finance", revenue: "12.8T", operatingProfit: "4.8T", debt: "398.2T", netIncome: "3.8T", status: "Active", lastUpdate: "2025-01-09", foundedDate: "2001-09-01", employees: 23000, companyType: "Large Enterprise", country: "Korea", listingStatus: "Audited", website: "www.shinhangroup.com", keywords: ["Banking", "Card", "Asset Management"] },
  { id: 14, name: "CJ CheilJedang", ceo: "Eun-Seok Choi", address: "330 Dongho-ro, Jung-gu, Seoul", industry: "Manufacturing", revenue: "28.4T", operatingProfit: "1.2T", debt: "9.8T", netIncome: "0.8T", status: "Active", lastUpdate: "2025-01-08", foundedDate: "1953-08-01", employees: 9800, companyType: "Large Enterprise", country: "Korea", listingStatus: "Audited", website: "www.cj.co.kr", keywords: ["Food", "Bio", "Feed"] },
  { id: 15, name: "Posco Holdings", ceo: "Jeong-Woo Choi", address: "100 Songdo-dong, Yeonsu-gu, Incheon", industry: "Manufacturing", revenue: "84.8T", operatingProfit: "2.9T", debt: "31.2T", netIncome: "2.1T", status: "Active", lastUpdate: "2025-01-08", foundedDate: "1968-04-01", employees: 19000, companyType: "Large Enterprise", country: "Korea", listingStatus: "Audited", website: "www.posco.co.kr", keywords: ["Steel", "Battery", "Hydrogen"] },
  { id: 16, name: "Samsung SDI", ceo: "Young-Hyun Choi", address: "150-20 Gongse-ro, Giheung-gu, Yongin", industry: "Manufacturing", revenue: "20.1T", operatingProfit: "1.8T", debt: "7.6T", netIncome: "1.4T", status: "Active", lastUpdate: "2025-01-09", foundedDate: "1970-01-01", employees: 11000, companyType: "Large Enterprise", country: "Korea", listingStatus: "Audited", website: "www.samsungsdi.com", keywords: ["Battery", "Energy", "Materials"] },
  { id: 17, name: "Coupang", ceo: "Bom Kim", address: "570 Songpa-daero, Songpa-gu, Seoul", industry: "Retail", revenue: "26.5T", operatingProfit: "-0.2T", debt: "8.4T", netIncome: "-0.3T", status: "Active", lastUpdate: "2025-01-09", foundedDate: "2010-08-10", employees: 68000, companyType: "Large Enterprise", country: "Korea", listingStatus: "NYSE", website: "www.coupang.com", keywords: ["E-commerce", "Logistics", "Delivery"] },
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

type Company = {
  id: number;
  name: string;
  ceo: string;
  address: string;
  industry: string;
  revenue: string;
  operatingProfit: string;
  debt: string;
  status: string;
  lastUpdate: string;
  foundedDate?: string;
  employees?: number;
  companyType?: string;
  country?: string;
  listingStatus?: string;
  website?: string;
  netIncome?: string;
  keywords?: string[];
};

export default function CompanyData() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState<"all" | "unlisted" | "listed" | "audited">("listed");
  const [showColumnSelector, setShowColumnSelector] = useState(false);
  const [dataViewTab, setDataViewTab] = useState<"company" | "financial">("company");
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  
  const companyInfoColumns = {
    ceo: true,
    address: true,
    industry: true,
    foundedDate: true,
    employees: true,
    status: true,
    lastUpdate: true,
  };
  
  const financialInfoColumns = {
    revenue: true,
    operatingProfit: true,
    debt: true,
    netIncome: true,
    status: true,
    lastUpdate: true,
  };

  const [visibleColumns, setVisibleColumns] = useState(companyInfoColumns);

  const columnLabels: Record<string, string> = {
    ceo: "CEO",
    address: "Address",
    revenue: "Revenue",
    operatingProfit: "Op. Profit",
    debt: "Debt",
    status: "Status",
    lastUpdate: "Updated",
    industry: "Industry",
    foundedDate: "Founded",
    employees: "Employees",
    netIncome: "Net Income",
  };

  const toggleColumn = (col: string) => {
    setVisibleColumns(prev => ({ ...prev, [col]: !prev[col as keyof typeof prev] }));
  };
  
  const switchDataView = (tab: "company" | "financial") => {
    setDataViewTab(tab);
    if (tab === "company") {
      setVisibleColumns(companyInfoColumns);
    } else {
      setVisibleColumns(financialInfoColumns);
    }
  };

  const totalCompanies = 34521;
  
  const allCompanies = [...listedCompanies, ...unlistedCompanies, ...auditedCompanies];
  
  const getCompaniesForTab = () => {
    switch (activeTab) {
      case "all": return allCompanies;
      case "unlisted": return unlistedCompanies;
      case "listed": return listedCompanies;
      case "audited": return auditedCompanies;
      default: return listedCompanies;
    }
  };

  const companies = getCompaniesForTab();
  const filteredCompanies = companies.filter((company) => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = selectedIndustry === "All" || company.industry === selectedIndustry;
    return matchesSearch && matchesIndustry;
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

        <main className="flex-1 p-6 bg-slate-50/50">
          <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="mb-4">
            <div className="flex items-center gap-1">
              <button
                onClick={() => switchDataView("company")}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${dataViewTab === "company" ? "bg-blue-500 text-white" : "text-slate-500 hover:text-slate-800 hover:bg-white border border-slate-200"}`}
                data-testid="tab-company-info"
              >
                Company Info
              </button>
              <button
                onClick={() => switchDataView("financial")}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${dataViewTab === "financial" ? "bg-blue-500 text-white" : "text-slate-500 hover:text-slate-800 hover:bg-white border border-slate-200"}`}
                data-testid="tab-financial-info"
              >
                Financial Info
              </button>
            </div>
          </motion.section>

          <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05, duration: 0.3 }} className="mb-6">
            <div className="flex items-center gap-8 py-4 px-6 bg-white rounded-xl border border-slate-100">
              <div className="flex items-center gap-3">
                <Building2 className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wide">Total</p>
                  <p className="text-xl font-bold text-slate-800" data-testid="total-companies">{totalCompanies.toLocaleString()}</p>
                </div>
              </div>
              <div className="w-px h-10 bg-slate-200" />
              <div className="flex items-center gap-3">
                <Activity className="w-5 h-5 text-emerald-500" />
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wide">Active</p>
                  <p className="text-xl font-bold text-emerald-600" data-testid="active-companies">32,104</p>
                </div>
              </div>
              <div className="w-px h-10 bg-slate-200" />
              <div className="flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-purple-500" />
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wide">Today</p>
                  <p className="text-xl font-bold text-purple-600" data-testid="today-updates">+127</p>
                </div>
              </div>
              <div className="w-px h-10 bg-slate-200" />
              <div className="flex items-center gap-3">
                <PieChartIcon className="w-5 h-5 text-amber-500" />
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wide">Coverage</p>
                  <p className="text-xl font-bold text-slate-800">85%</p>
                </div>
              </div>
              <div className="w-px h-10 bg-slate-200" />
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-cyan-500" />
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wide">Update Cycle</p>
                  <p className="text-xl font-bold text-slate-800">Daily</p>
                </div>
              </div>
            </div>
          </motion.section>

          <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.3 }}>
            <div className="bg-white rounded-xl border border-slate-100">
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setActiveTab("all")}
                    className={`px-4 py-2 text-sm font-medium transition-colors rounded-lg ${activeTab === "all" ? "bg-slate-900 text-white" : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"}`}
                    data-testid="tab-all"
                  >
                    Total <span className="ml-1 text-xs opacity-60">{allCompanies.length}</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("unlisted")}
                    className={`px-4 py-2 text-sm font-medium transition-colors rounded-lg ${activeTab === "unlisted" ? "bg-slate-900 text-white" : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"}`}
                    data-testid="tab-unlisted"
                  >
                    Unlisted <span className="ml-1 text-xs opacity-60">{unlistedCompanies.length}</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("listed")}
                    className={`px-4 py-2 text-sm font-medium transition-colors rounded-lg ${activeTab === "listed" ? "bg-slate-900 text-white" : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"}`}
                    data-testid="tab-listed"
                  >
                    Listed <span className="ml-1 text-xs opacity-60">{listedCompanies.length}</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("audited")}
                    className={`px-4 py-2 text-sm font-medium transition-colors rounded-lg ${activeTab === "audited" ? "bg-slate-900 text-white" : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"}`}
                    data-testid="tab-audited"
                  >
                    Audited <span className="ml-1 text-xs opacity-60">{auditedCompanies.length}</span>
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-9 w-48 h-9 border-slate-200 text-sm" data-testid="search-input" />
                  </div>
                  <div className="relative">
                    <select value={selectedIndustry} onChange={(e) => setSelectedIndustry(e.target.value)} className="pl-3 pr-8 py-2 h-9 border border-slate-200 rounded-lg text-sm bg-white text-slate-600 appearance-none cursor-pointer" data-testid="industry-filter">
                      <option value="All">All Industries</option>
                      <option value="Manufacturing">Manufacturing</option>
                      <option value="IT/Software">IT/Software</option>
                      <option value="Finance">Finance</option>
                      <option value="Retail">Retail</option>
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
                      <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-10" data-testid="column-selector-dropdown">
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
                <table className="w-full" data-testid="company-table">
                  <thead>
                    <tr className="bg-slate-50/50">
                      <th className="text-left py-3 px-6 text-xs font-medium text-slate-400 uppercase tracking-wide">Company Name</th>
                      {visibleColumns.ceo && <th className="text-left py-3 px-4 text-xs font-medium text-slate-400 uppercase tracking-wide">CEO</th>}
                      {visibleColumns.address && <th className="text-left py-3 px-4 text-xs font-medium text-slate-400 uppercase tracking-wide">Address</th>}
                      {visibleColumns.industry && <th className="text-left py-3 px-4 text-xs font-medium text-slate-400 uppercase tracking-wide">Industry</th>}
                      {visibleColumns.foundedDate && <th className="text-left py-3 px-4 text-xs font-medium text-slate-400 uppercase tracking-wide">Founded</th>}
                      {visibleColumns.employees && <th className="text-right py-3 px-4 text-xs font-medium text-slate-400 uppercase tracking-wide">Employees</th>}
                      {visibleColumns.revenue && <th className="text-right py-3 px-4 text-xs font-medium text-slate-400 uppercase tracking-wide">Revenue</th>}
                      {visibleColumns.operatingProfit && <th className="text-right py-3 px-4 text-xs font-medium text-slate-400 uppercase tracking-wide">Op. Profit</th>}
                      {visibleColumns.debt && <th className="text-right py-3 px-4 text-xs font-medium text-slate-400 uppercase tracking-wide">Debt</th>}
                      {visibleColumns.netIncome && <th className="text-right py-3 px-4 text-xs font-medium text-slate-400 uppercase tracking-wide">Net Income</th>}
                      {visibleColumns.status && <th className="text-center py-3 px-4 text-xs font-medium text-slate-400 uppercase tracking-wide">Status</th>}
                      {visibleColumns.lastUpdate && <th className="text-right py-3 px-6 text-xs font-medium text-slate-400 uppercase tracking-wide">Updated</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCompanies.map((company) => (
                      <tr key={company.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors" data-testid={`company-row-${company.id}`}>
                        <td className="py-3 px-6">
                          <button
                            onClick={() => setSelectedCompany(company)}
                            className="font-medium text-slate-800 hover:text-blue-600 hover:underline text-left"
                            data-testid={`company-name-${company.id}`}
                          >
                            {company.name}
                          </button>
                        </td>
                        {visibleColumns.ceo && <td className="py-3 px-4 text-sm text-slate-600">{company.ceo}</td>}
                        {visibleColumns.address && <td className="py-3 px-4 text-sm text-slate-500 max-w-[180px] truncate" title={company.address}>{company.address}</td>}
                        {visibleColumns.industry && <td className="py-3 px-4 text-sm text-slate-600">{company.industry}</td>}
                        {visibleColumns.foundedDate && <td className="py-3 px-4 text-sm text-slate-500">{company.foundedDate || "-"}</td>}
                        {visibleColumns.employees && <td className="py-3 px-4 text-right text-sm text-slate-600">{company.employees?.toLocaleString() || "-"}</td>}
                        {visibleColumns.revenue && <td className="py-3 px-4 text-right text-sm font-mono text-slate-700">{company.revenue}</td>}
                        {visibleColumns.operatingProfit && (
                          <td className="py-3 px-4 text-right text-sm font-mono">
                            <span className={company.operatingProfit.startsWith("-") ? "text-red-500" : "text-emerald-600"}>
                              {company.operatingProfit}
                            </span>
                          </td>
                        )}
                        {visibleColumns.debt && <td className="py-3 px-4 text-right text-sm font-mono text-slate-600">{company.debt}</td>}
                        {visibleColumns.netIncome && (
                          <td className="py-3 px-4 text-right text-sm font-mono">
                            <span className={company.netIncome?.startsWith("-") ? "text-red-500" : "text-slate-700"}>
                              {company.netIncome || "-"}
                            </span>
                          </td>
                        )}
                        {visibleColumns.status && (
                          <td className="py-3 px-4 text-center">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium text-emerald-600">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              {company.status}
                            </span>
                          </td>
                        )}
                        {visibleColumns.lastUpdate && <td className="py-3 px-6 text-right text-xs text-slate-400">{company.lastUpdate}</td>}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100">
                <p className="text-xs text-slate-400">Showing {filteredCompanies.length} of {totalCompanies.toLocaleString()} companies</p>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} className="h-8 w-8 p-0" data-testid="prev-page">
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <span className="text-xs text-slate-500 px-2">Page {currentPage}</span>
                  <Button variant="ghost" size="sm" onClick={() => setCurrentPage(currentPage + 1)} className="h-8 w-8 p-0" data-testid="next-page">
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.section>
        </main>
      </div>

      {selectedCompany && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setSelectedCompany(null)}>
          <div className="flex items-center gap-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                const currentIndex = filteredCompanies.findIndex(c => c.id === selectedCompany.id);
                if (currentIndex > 0) {
                  setSelectedCompany(filteredCompanies[currentIndex - 1]);
                }
              }}
              disabled={filteredCompanies.findIndex(c => c.id === selectedCompany.id) === 0}
              className="p-3 bg-white rounded-full shadow-lg hover:bg-slate-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              data-testid="prev-company"
            >
              <ChevronLeft className="w-6 h-6 text-slate-600" />
            </button>
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden" onClick={(e) => e.stopPropagation()} style={{ width: '640px' }}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
              <div>
                <h3 className="text-lg font-semibold text-slate-800">{selectedCompany.name}</h3>
                <p className="text-xs text-slate-400">{filteredCompanies.findIndex(c => c.id === selectedCompany.id) + 1} / {filteredCompanies.length}</p>
              </div>
              <button onClick={() => setSelectedCompany(null)} className="p-2 hover:bg-slate-200 rounded-lg transition-colors" data-testid="close-detail-modal">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            <div className="overflow-y-auto max-h-[calc(80vh-60px)]">
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b border-slate-100">
                    <td className="py-2.5 px-6 text-slate-500 font-medium w-40 bg-slate-50">ID</td>
                    <td className="py-2.5 px-6 text-slate-800 font-mono">{selectedCompany.id}</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-2.5 px-6 text-slate-500 font-medium bg-slate-50">Name</td>
                    <td className="py-2.5 px-6 text-slate-800">{selectedCompany.name}</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-2.5 px-6 text-slate-500 font-medium bg-slate-50">CEO</td>
                    <td className="py-2.5 px-6 text-slate-800">{selectedCompany.ceo}</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-2.5 px-6 text-slate-500 font-medium bg-slate-50">Address</td>
                    <td className="py-2.5 px-6 text-slate-800">{selectedCompany.address}</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-2.5 px-6 text-slate-500 font-medium bg-slate-50">Industry</td>
                    <td className="py-2.5 px-6 text-slate-800">{selectedCompany.industry}</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-2.5 px-6 text-slate-500 font-medium bg-slate-50">Founded</td>
                    <td className="py-2.5 px-6 text-slate-800">{selectedCompany.foundedDate || "-"}</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-2.5 px-6 text-slate-500 font-medium bg-slate-50">Employees</td>
                    <td className="py-2.5 px-6 text-slate-800 font-mono">{selectedCompany.employees?.toLocaleString() || "-"}</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-2.5 px-6 text-slate-500 font-medium bg-slate-50">Company Type</td>
                    <td className="py-2.5 px-6 text-slate-800">{selectedCompany.companyType || "-"}</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-2.5 px-6 text-slate-500 font-medium bg-slate-50">Country</td>
                    <td className="py-2.5 px-6 text-slate-800">{selectedCompany.country || "-"}</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-2.5 px-6 text-slate-500 font-medium bg-slate-50">Listing Status</td>
                    <td className="py-2.5 px-6 text-slate-800">{selectedCompany.listingStatus || "-"}</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-2.5 px-6 text-slate-500 font-medium bg-slate-50">Website</td>
                    <td className="py-2.5 px-6 text-slate-800">{selectedCompany.website || "-"}</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-2.5 px-6 text-slate-500 font-medium bg-slate-50">Revenue</td>
                    <td className="py-2.5 px-6 text-slate-800 font-mono">{selectedCompany.revenue}</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-2.5 px-6 text-slate-500 font-medium bg-slate-50">Operating Profit</td>
                    <td className={`py-2.5 px-6 font-mono ${selectedCompany.operatingProfit.startsWith("-") ? "text-red-500" : "text-slate-800"}`}>{selectedCompany.operatingProfit}</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-2.5 px-6 text-slate-500 font-medium bg-slate-50">Debt</td>
                    <td className="py-2.5 px-6 text-slate-800 font-mono">{selectedCompany.debt}</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-2.5 px-6 text-slate-500 font-medium bg-slate-50">Net Income</td>
                    <td className={`py-2.5 px-6 font-mono ${selectedCompany.netIncome?.startsWith("-") ? "text-red-500" : "text-slate-800"}`}>{selectedCompany.netIncome || "-"}</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-2.5 px-6 text-slate-500 font-medium bg-slate-50">Status</td>
                    <td className="py-2.5 px-6 text-slate-800">{selectedCompany.status}</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-2.5 px-6 text-slate-500 font-medium bg-slate-50">Last Update</td>
                    <td className="py-2.5 px-6 text-slate-800">{selectedCompany.lastUpdate}</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-6 text-slate-500 font-medium bg-slate-50">Keywords</td>
                    <td className="py-2.5 px-6 text-slate-800">{selectedCompany.keywords?.join(", ") || "-"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                const currentIndex = filteredCompanies.findIndex(c => c.id === selectedCompany.id);
                if (currentIndex < filteredCompanies.length - 1) {
                  setSelectedCompany(filteredCompanies[currentIndex + 1]);
                }
              }}
              disabled={filteredCompanies.findIndex(c => c.id === selectedCompany.id) === filteredCompanies.length - 1}
              className="p-3 bg-white rounded-full shadow-lg hover:bg-slate-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              data-testid="next-company"
            >
              <ChevronRight className="w-6 h-6 text-slate-600" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
