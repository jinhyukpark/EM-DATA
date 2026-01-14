import { useState } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  Search,
  Filter,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
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
  Menu,
  TrendingUp,
  Palette,
  Plus,
  Trash2,
  MoreHorizontal,
} from "lucide-react";
import Sidebar from "@/components/Sidebar";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

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

type ColorRule = {
  id: string;
  condition: 'equals' | 'contains' | 'starts_with' | 'greater_than' | 'less_than';
  value: string;
  color: string;
};

type ColumnStyle = {
  textColor?: string;
  bgColor?: string;
  bgTextOnly?: boolean;
  textRules: ColorRule[];
  bgRules: ColorRule[];
};

export default function CompanyData() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchField, setSearchField] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
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
  
  const colorOptions = [
    { name: "Default", value: "" },
    { name: "Red", value: "#ef4444" },
    { name: "Orange", value: "#f97316" },
    { name: "Amber", value: "#f59e0b" },
    { name: "Green", value: "#22c55e" },
    { name: "Emerald", value: "#10b981" },
    { name: "Cyan", value: "#06b6d4" },
    { name: "Blue", value: "#3b82f6" },
    { name: "Indigo", value: "#6366f1" },
    { name: "Purple", value: "#a855f7" },
    { name: "Pink", value: "#ec4899" },
    { name: "Slate", value: "#64748b" },
  ];
  
  const [columnStyles, setColumnStyles] = useState<Record<string, ColumnStyle>>({});
  const [activeConfigColumn, setActiveConfigColumn] = useState<string | null>(null);

  const getCellStyle = (columnId: string, value: any) => {
    const style = columnStyles[columnId];
    if (!style) return {};

    let finalColor = style.textColor;
    let finalBg = style.bgColor;

    // Apply text rules
    if (style.textRules?.length > 0) {
      const stringValue = String(value).toLowerCase();
      for (const rule of style.textRules) {
        const ruleValue = rule.value.toLowerCase();
        let match = false;
        
        if (rule.condition === 'equals' && stringValue === ruleValue) match = true;
        else if (rule.condition === 'contains' && stringValue.includes(ruleValue)) match = true;
        else if (rule.condition === 'starts_with' && stringValue.startsWith(ruleValue)) match = true;
        else if (rule.condition === 'greater_than' && parseFloat(stringValue) > parseFloat(ruleValue)) match = true;
        else if (rule.condition === 'less_than' && parseFloat(stringValue) < parseFloat(ruleValue)) match = true;

        if (match) {
          finalColor = rule.color;
          break; // First match wins
        }
      }
    }

    // Apply background rules
    if (style.bgRules?.length > 0) {
      const stringValue = String(value).toLowerCase();
      for (const rule of style.bgRules) {
        const ruleValue = rule.value.toLowerCase();
        let match = false;
        
        if (rule.condition === 'equals' && stringValue === ruleValue) match = true;
        else if (rule.condition === 'contains' && stringValue.includes(ruleValue)) match = true;
        else if (rule.condition === 'starts_with' && stringValue.startsWith(ruleValue)) match = true;
        else if (rule.condition === 'greater_than' && parseFloat(stringValue) > parseFloat(ruleValue)) match = true;
        else if (rule.condition === 'less_than' && parseFloat(stringValue) < parseFloat(ruleValue)) match = true;

        if (match) {
          finalBg = rule.color;
          break; 
        }
      }
    }

    const isTextOnly = !!style.bgTextOnly;
    const bgWithOpacity = finalBg ? `${finalBg}20` : undefined;

    return {
      color: finalColor,
      backgroundColor: (!isTextOnly && finalBg) ? bgWithOpacity : undefined,
      // Custom properties for cell rendering
      isTextOnly: isTextOnly && !!finalBg,
      rawBgColor: bgWithOpacity,
    };
  };

  const addRule = (columnId: string, type: 'text' | 'bg') => {
    setColumnStyles(prev => {
      const current = prev[columnId] || { textRules: [], bgRules: [] };
      const newRule: ColorRule = {
        id: Math.random().toString(36).substr(2, 9),
        condition: 'contains',
        value: '',
        color: '#3b82f6'
      };
      
      return {
        ...prev,
        [columnId]: {
          ...current,
          [type === 'text' ? 'textRules' : 'bgRules']: [
            ...(current[type === 'text' ? 'textRules' : 'bgRules'] || []),
            newRule
          ]
        }
      };
    });
  };

  const updateRule = (columnId: string, type: 'text' | 'bg', ruleId: string, updates: Partial<ColorRule>) => {
    setColumnStyles(prev => {
      const current = prev[columnId];
      const rulesKey = type === 'text' ? 'textRules' : 'bgRules';
      return {
        ...prev,
        [columnId]: {
          ...current,
          [rulesKey]: current[rulesKey].map(r => r.id === ruleId ? { ...r, ...updates } : r)
        }
      };
    });
  };

  const removeRule = (columnId: string, type: 'text' | 'bg', ruleId: string) => {
    setColumnStyles(prev => {
      const current = prev[columnId];
      const rulesKey = type === 'text' ? 'textRules' : 'bgRules';
      return {
        ...prev,
        [columnId]: {
          ...current,
          [rulesKey]: current[rulesKey].filter(r => r.id !== ruleId)
        }
      };
    });
  };

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

  const renderColumnConfig = (columnId: string, label: string) => {
    const style = columnStyles[columnId] || { textRules: [], bgRules: [] };
    
    return (
      <Popover>
        <PopoverTrigger asChild>
          <button className="p-1 hover:bg-slate-200 rounded transition-colors flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
            <Palette className="w-3 h-3 text-slate-400" />
            {(style.textColor || style.textRules?.length > 0) && (
              <div 
                className="w-2 h-2 rounded-full border border-slate-200" 
                style={{ backgroundColor: style.textColor || '#3b82f6' }}
                title="Text Color Active"
              />
            )}
            {(style.bgColor || style.bgRules?.length > 0) && (
              <div 
                className="w-2 h-2 rounded-full border border-slate-200" 
                style={{ backgroundColor: style.bgColor || '#3b82f6' }}
                title="Background Color Active"
              />
            )}
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0 bg-white border border-slate-200 shadow-xl" align="start" sideOffset={8}>
          <div className="p-3 border-b border-slate-100 bg-slate-50/50">
            <h4 className="font-medium text-sm text-slate-900">{label} Styling</h4>
          </div>
          <Tabs defaultValue="text" className="w-full">
            <TabsList className="w-full justify-start rounded-none border-b border-slate-100 bg-transparent p-0">
              <TabsTrigger value="text" className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-white px-4 py-2 text-xs text-slate-600 data-[state=active]:text-slate-900">Text Color</TabsTrigger>
              <TabsTrigger value="bg" className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-white px-4 py-2 text-xs text-slate-600 data-[state=active]:text-slate-900">Background</TabsTrigger>
            </TabsList>
            
            <TabsContent value="text" className="p-4 space-y-4 mt-0">
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-500">Default Color</label>
                <div className="flex flex-wrap gap-2">
                   {colorOptions.map(color => (
                     <button
                       key={color.name}
                       onClick={() => setColumnStyles(prev => ({...prev, [columnId]: {...(prev[columnId] || {textRules:[], bgRules:[]}), textColor: color.value}}))}
                       className={`w-6 h-6 rounded-full border transition-transform hover:scale-110 ${style.textColor === color.value ? 'ring-2 ring-offset-1 ring-slate-400' : 'border-slate-200'}`}
                       style={{ backgroundColor: color.value || '#f1f5f9' }}
                       title={color.name}
                     />
                   ))}
                </div>
              </div>
              
              <div className="space-y-3 pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-slate-500">Conditional Rules</label>
                  <Button variant="ghost" size="sm" className="h-6 text-xs gap-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50" onClick={() => addRule(columnId, 'text')}>
                    <Plus className="w-3 h-3" /> Add Rule
                  </Button>
                </div>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {style.textRules?.map(rule => (
                    <div key={rule.id} className="p-2 bg-slate-50 rounded-lg border border-slate-100 space-y-2">
                      <div className="flex gap-2">
                         <Select value={rule.condition} onValueChange={(val) => updateRule(columnId, 'text', rule.id, { condition: val as any })}>
                           <SelectTrigger className="h-7 text-xs w-[110px] bg-white border-slate-200 text-slate-700">
                             <SelectValue />
                           </SelectTrigger>
                           <SelectContent className="bg-white border-slate-200 text-slate-700">
                             <SelectItem value="equals">Equals</SelectItem>
                             <SelectItem value="contains">Contains</SelectItem>
                             <SelectItem value="starts_with">Starts with</SelectItem>
                             <SelectItem value="greater_than">Greater than</SelectItem>
                             <SelectItem value="less_than">Less than</SelectItem>
                           </SelectContent>
                         </Select>
                         <Input 
                           value={rule.value} 
                           onChange={(e) => updateRule(columnId, 'text', rule.id, { value: e.target.value })}
                           className="h-7 text-xs flex-1 bg-white border-slate-200 text-slate-700" 
                           placeholder="Value..." 
                         />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-400">Color:</span>
                          <div className="flex gap-1">
                            {colorOptions.filter(c => c.value).map(color => (
                              <button
                                key={color.name}
                                onClick={() => updateRule(columnId, 'text', rule.id, { color: color.value })}
                                className={`w-4 h-4 rounded-full border ${rule.color === color.value ? 'ring-1 ring-offset-1 ring-slate-400' : 'border-slate-200'}`}
                                style={{ backgroundColor: color.value }}
                                title={color.name}
                              />
                            ))}
                          </div>
                        </div>
                        <button onClick={() => removeRule(columnId, 'text', rule.id)} className="text-slate-400 hover:text-red-500 p-1">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                  {style.textRules?.length === 0 && (
                    <p className="text-xs text-slate-400 italic text-center py-2 bg-slate-50/50 rounded-lg">No rules configured</p>
                  )}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="bg" className="p-4 space-y-4 mt-0">
               <div className="space-y-3">
                <label className="text-xs font-medium text-slate-500 block mb-3">Default Background</label>
                <div className="flex flex-wrap gap-2">
                   {colorOptions.map(color => (
                     <button
                       key={color.name}
                       onClick={() => setColumnStyles(prev => ({...prev, [columnId]: {...(prev[columnId] || {textRules:[], bgRules:[]}), bgColor: color.value}}))}
                       className={`w-6 h-6 rounded-full border transition-transform hover:scale-110 ${style.bgColor === color.value ? 'ring-2 ring-offset-1 ring-slate-400' : 'border-slate-200'}`}
                       style={{ backgroundColor: color.value || '#f1f5f9' }}
                       title={color.name}
                     />
                   ))}
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <label className="text-xs font-medium text-slate-500">Apply to Text Only</label>
                  <Switch 
                    checked={!!style.bgTextOnly}
                    onCheckedChange={(checked) => setColumnStyles(prev => ({...prev, [columnId]: {...(prev[columnId] || {textRules:[], bgRules:[]}), bgTextOnly: checked}}))}
                    className="scale-75 origin-right data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-slate-200"
                  />
                </div>
              </div>
              
              <div className="space-y-3 pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-slate-500">Conditional Rules</label>
                  <Button variant="ghost" size="sm" className="h-6 text-xs gap-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50" onClick={() => addRule(columnId, 'bg')}>
                    <Plus className="w-3 h-3" /> Add Rule
                  </Button>
                </div>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {style.bgRules?.map(rule => (
                    <div key={rule.id} className="p-2 bg-slate-50 rounded-lg border border-slate-100 space-y-2">
                      <div className="flex gap-2">
                         <Select value={rule.condition} onValueChange={(val) => updateRule(columnId, 'bg', rule.id, { condition: val as any })}>
                           <SelectTrigger className="h-7 text-xs w-[110px] bg-white border-slate-200 text-slate-700">
                             <SelectValue />
                           </SelectTrigger>
                           <SelectContent className="bg-white border-slate-200 text-slate-700">
                             <SelectItem value="equals">Equals</SelectItem>
                             <SelectItem value="contains">Contains</SelectItem>
                             <SelectItem value="starts_with">Starts with</SelectItem>
                             <SelectItem value="greater_than">Greater than</SelectItem>
                             <SelectItem value="less_than">Less than</SelectItem>
                           </SelectContent>
                         </Select>
                         <Input 
                           value={rule.value} 
                           onChange={(e) => updateRule(columnId, 'bg', rule.id, { value: e.target.value })}
                           className="h-7 text-xs flex-1 bg-white border-slate-200 text-slate-700" 
                           placeholder="Value..." 
                         />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-400">Color:</span>
                          <div className="flex gap-1">
                            {colorOptions.filter(c => c.value).map(color => (
                              <button
                                key={color.name}
                                onClick={() => updateRule(columnId, 'bg', rule.id, { color: color.value })}
                                className={`w-4 h-4 rounded-full border ${rule.color === color.value ? 'ring-1 ring-offset-1 ring-slate-400' : 'border-slate-200'}`}
                                style={{ backgroundColor: color.value }}
                                title={color.name}
                              />
                            ))}
                          </div>
                        </div>
                        <button onClick={() => removeRule(columnId, 'bg', rule.id)} className="text-slate-400 hover:text-red-500 p-1">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                  {style.bgRules?.length === 0 && (
                    <p className="text-xs text-slate-400 italic text-center py-2 bg-slate-50/50 rounded-lg">No rules configured</p>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </PopoverContent>
      </Popover>
    );
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
    const term = searchTerm.toLowerCase();
    if (!term) return true;
    
    if (searchField === "all") {
      return (
        company.name.toLowerCase().includes(term) ||
        company.ceo.toLowerCase().includes(term) ||
        company.industry.toLowerCase().includes(term) ||
        company.address.toLowerCase().includes(term)
      );
    }
    
    const value = company[searchField as keyof Company];
    return String(value).toLowerCase().includes(term);
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
                  <h1 className="text-lg md:text-xl font-semibold tracking-tight text-slate-800 truncate">Company Data</h1>
                  <p className="text-xs md:text-sm text-slate-500 mt-0.5 hidden sm:block">Audited company information database</p>
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
          <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="mb-4">
            <div className="flex items-center justify-between">
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
              <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-lg border border-emerald-100">
                <Activity className="w-4 h-4 text-emerald-600 animate-pulse" />
                <span className="text-sm font-medium text-emerald-700">Collection Status: Running</span>
              </div>
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
                  <div className="flex items-center h-9 border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500">
                    <select 
                      value={searchField} 
                      onChange={(e) => setSearchField(e.target.value)}
                      className="h-full pl-3 pr-2 text-xs bg-slate-50 border-r border-slate-200 text-slate-600 focus:outline-none cursor-pointer hover:bg-slate-100 transition-colors"
                    >
                      <option value="all">All Fields</option>
                      <option value="name">Company Name</option>
                      <option value="ceo">CEO</option>
                      <option value="industry">Industry</option>
                      <option value="address">Address</option>
                    </select>
                    <div className="relative flex items-center">
                      <Search className="absolute left-3 w-3.5 h-3.5 text-slate-400" />
                      <Input 
                        placeholder="Search..." 
                        value={searchTerm} 
                        onChange={(e) => setSearchTerm(e.target.value)} 
                        className="pl-9 w-48 border-none focus-visible:ring-0 text-sm h-full" 
                        data-testid="search-input" 
                      />
                    </div>
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
                      <th className="text-left py-3 px-6 text-xs font-medium text-slate-400 uppercase tracking-wide">
                        <div className="flex items-center gap-1.5">
                          <span>Company Name</span>
                          <div className="relative">
                            {renderColumnConfig('name', 'Company Name')}
                          </div>
                        </div>
                      </th>
                      {visibleColumns.ceo && <th className="text-left py-3 px-4 text-xs font-medium text-slate-400 uppercase tracking-wide">
                        <div className="flex items-center gap-1.5">
                          <span>CEO</span>
                          <div className="relative">
                            {renderColumnConfig('ceo', 'CEO')}
                          </div>
                        </div>
                      </th>}
                      {visibleColumns.address && <th className="text-left py-3 px-4 text-xs font-medium text-slate-400 uppercase tracking-wide">
                        <div className="flex items-center gap-1.5">
                          <span>Address</span>
                          <div className="relative">
                            {renderColumnConfig('address', 'Address')}
                          </div>
                        </div>
                      </th>}
                      {visibleColumns.industry && <th className="text-left py-3 px-4 text-xs font-medium text-slate-400 uppercase tracking-wide">
                        <div className="flex items-center gap-1.5">
                          <span>Industry</span>
                          <div className="relative">
                            {renderColumnConfig('industry', 'Industry')}
                          </div>
                        </div>
                      </th>}
                      {visibleColumns.foundedDate && <th className="text-left py-3 px-4 text-xs font-medium text-slate-400 uppercase tracking-wide">
                        <div className="flex items-center gap-1.5">
                          <span>Founded</span>
                          <div className="relative">
                            {renderColumnConfig('foundedDate', 'Founded Date')}
                          </div>
                        </div>
                      </th>}
                      {visibleColumns.employees && <th className="text-right py-3 px-4 text-xs font-medium text-slate-400 uppercase tracking-wide">
                        <div className="flex items-center justify-end gap-1.5">
                          <span>Employees</span>
                          <div className="relative">
                            {renderColumnConfig('employees', 'Employees')}
                          </div>
                        </div>
                      </th>}
                      {visibleColumns.revenue && <th className="text-right py-3 px-4 text-xs font-medium text-slate-400 uppercase tracking-wide">
                        <div className="flex items-center justify-end gap-1.5">
                          <span>Revenue</span>
                          <div className="relative">
                            {renderColumnConfig('revenue', 'Revenue')}
                          </div>
                        </div>
                      </th>}
                      {visibleColumns.operatingProfit && <th className="text-right py-3 px-4 text-xs font-medium text-slate-400 uppercase tracking-wide">
                        <div className="flex items-center justify-end gap-1.5">
                          <span>Op. Profit</span>
                          <div className="relative">
                            {renderColumnConfig('operatingProfit', 'Operating Profit')}
                          </div>
                        </div>
                      </th>}
                      {visibleColumns.debt && <th className="text-right py-3 px-4 text-xs font-medium text-slate-400 uppercase tracking-wide">
                        <div className="flex items-center justify-end gap-1.5">
                          <span>Debt</span>
                          <div className="relative">
                            {renderColumnConfig('debt', 'Debt')}
                          </div>
                        </div>
                      </th>}
                      {visibleColumns.netIncome && <th className="text-right py-3 px-4 text-xs font-medium text-slate-400 uppercase tracking-wide">
                        <div className="flex items-center justify-end gap-1.5">
                          <span>Net Income</span>
                          <div className="relative">
                            {renderColumnConfig('netIncome', 'Net Income')}
                          </div>
                        </div>
                      </th>}
                      {visibleColumns.status && <th className="text-center py-3 px-4 text-xs font-medium text-slate-400 uppercase tracking-wide">
                        <div className="flex items-center justify-center gap-1.5">
                          <span>Status</span>
                          <div className="relative">
                            {renderColumnConfig('status', 'Status')}
                          </div>
                        </div>
                      </th>}
                      {visibleColumns.lastUpdate && <th className="text-right py-3 px-6 text-xs font-medium text-slate-400 uppercase tracking-wide">
                        <div className="flex items-center justify-end gap-1.5">
                          <span>Updated</span>
                          <div className="relative">
                            {renderColumnConfig('lastUpdate', 'Last Updated')}
                          </div>
                        </div>
                      </th>}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCompanies.map((company) => {
                      const getStyle = (col: string, val: any) => getCellStyle(col, val) as any;
                      const renderSimpleCell = (col: string, val: any, className: string = "text-slate-600", align: "left" | "center" | "right" = "left") => {
                        const s = getStyle(col, val);
                        return (
                          <td className={`py-3 px-4 text-sm ${className} ${align === 'right' ? 'text-right' : align === 'center' ? 'text-center' : 'text-left'}`} style={{ color: s.color, backgroundColor: s.backgroundColor }}>
                            <span style={{ backgroundColor: s.isTextOnly ? s.rawBgColor : undefined, padding: s.isTextOnly ? '2px 8px' : undefined, borderRadius: s.isTextOnly ? '4px' : undefined, display: s.isTextOnly ? 'inline-block' : undefined }}>
                              {val || "-"}
                            </span>
                          </td>
                        );
                      };

                      return (
                      <tr key={company.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors" data-testid={`company-row-${company.id}`}>
                        <td className="py-3 px-6" style={{ backgroundColor: getStyle('name', company.name).backgroundColor }}>
                          <span style={{ backgroundColor: getStyle('name', company.name).isTextOnly ? getStyle('name', company.name).rawBgColor : undefined, padding: getStyle('name', company.name).isTextOnly ? '2px 8px' : undefined, borderRadius: getStyle('name', company.name).isTextOnly ? '4px' : undefined, display: getStyle('name', company.name).isTextOnly ? 'inline-block' : undefined }}>
                            <button
                              onClick={() => setSelectedCompany(company)}
                              className="font-medium hover:text-blue-600 hover:underline text-left text-slate-800"
                              style={{ color: getStyle('name', company.name).color }}
                              data-testid={`company-name-${company.id}`}
                            >
                              {company.name}
                            </button>
                          </span>
                        </td>
                        {visibleColumns.ceo && renderSimpleCell('ceo', company.ceo)}
                        {visibleColumns.address && (() => { const s = getStyle('address', company.address); return (
                            <td className="py-3 px-4 text-sm max-w-[180px] truncate text-slate-500" style={{ color: s.color, backgroundColor: s.backgroundColor }} title={company.address}>
                              <span style={{ backgroundColor: s.isTextOnly ? s.rawBgColor : undefined, padding: s.isTextOnly ? '2px 8px' : undefined, borderRadius: s.isTextOnly ? '4px' : undefined, display: s.isTextOnly ? 'inline-block' : undefined }}>
                                {company.address}
                              </span>
                            </td>
                        )})()}
                        {visibleColumns.industry && renderSimpleCell('industry', company.industry)}
                        {visibleColumns.foundedDate && renderSimpleCell('foundedDate', company.foundedDate, "text-slate-500")}
                        {visibleColumns.employees && (() => { const s = getStyle('employees', company.employees); return (
                            <td className="py-3 px-4 text-right text-sm text-slate-600" style={{ color: s.color, backgroundColor: s.backgroundColor }}>
                               <span style={{ backgroundColor: s.isTextOnly ? s.rawBgColor : undefined, padding: s.isTextOnly ? '2px 8px' : undefined, borderRadius: s.isTextOnly ? '4px' : undefined, display: s.isTextOnly ? 'inline-block' : undefined }}>
                                 {company.employees?.toLocaleString() || "-"}
                               </span>
                            </td>
                        )})()}
                        {visibleColumns.revenue && renderSimpleCell('revenue', company.revenue, "font-mono text-slate-700", "right")}
                        {visibleColumns.operatingProfit && (() => { const s = getStyle('operatingProfit', company.operatingProfit); return (
                          <td className="py-3 px-4 text-right text-sm font-mono" style={{ backgroundColor: s.backgroundColor }}>
                            <span className={company.operatingProfit.startsWith("-") ? 'text-red-500' : 'text-emerald-500'} style={{ 
                                color: s.color,
                                backgroundColor: s.isTextOnly ? s.rawBgColor : undefined, 
                                padding: s.isTextOnly ? '2px 8px' : undefined, 
                                borderRadius: s.isTextOnly ? '4px' : undefined, 
                                display: s.isTextOnly ? 'inline-block' : undefined 
                            }}>
                              {company.operatingProfit}
                            </span>
                          </td>
                        )})()}
                        {visibleColumns.debt && renderSimpleCell('debt', company.debt, "font-mono text-slate-600", "right")}
                        {visibleColumns.netIncome && (() => { const s = getStyle('netIncome', company.netIncome); return (
                          <td className="py-3 px-4 text-right text-sm font-mono" style={{ backgroundColor: s.backgroundColor }}>
                            <span className={company.netIncome?.startsWith("-") ? 'text-red-500' : 'text-slate-700'} style={{ 
                                color: s.color,
                                backgroundColor: s.isTextOnly ? s.rawBgColor : undefined, 
                                padding: s.isTextOnly ? '2px 8px' : undefined, 
                                borderRadius: s.isTextOnly ? '4px' : undefined, 
                                display: s.isTextOnly ? 'inline-block' : undefined 
                            }}>
                              {company.netIncome || "-"}
                            </span>
                          </td>
                        )})()}
                        {visibleColumns.status && (() => { const s = getStyle('status', company.status); return (
                          <td className="py-3 px-4 text-center" style={{ backgroundColor: s.backgroundColor }}>
                            <span className="text-xs font-medium text-emerald-500" style={{ 
                                color: s.color,
                                backgroundColor: s.isTextOnly ? s.rawBgColor : undefined, 
                                padding: s.isTextOnly ? '2px 8px' : undefined, 
                                borderRadius: s.isTextOnly ? '4px' : undefined, 
                                display: s.isTextOnly ? 'inline-block' : undefined 
                            }}>
                              {company.status}
                            </span>
                          </td>
                        )})()}
                        {visibleColumns.lastUpdate && renderSimpleCell('lastUpdate', company.lastUpdate, "text-xs text-slate-400", "right")}
                      </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100">
                <div className="flex items-center gap-4">
                  <p className="text-xs text-slate-400">Showing {filteredCompanies.length} of {totalCompanies.toLocaleString()} companies</p>
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
                    const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);
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
                          <Button variant="outline" size="sm" disabled={currentPage === 1} onClick={() => setCurrentPage(1)} className="h-8 px-2 border-slate-200 text-slate-500 hover:text-slate-700" data-testid="first-page">
                            <ChevronLeft className="w-4 h-4" /><ChevronLeft className="w-4 h-4 -ml-3" />
                          </Button>
                          <Button variant="outline" size="sm" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} className="h-8 px-2 border-slate-200 text-slate-500 hover:text-slate-700" data-testid="prev-page">
                            <ChevronLeft className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="flex items-center gap-1 mx-2">
                          {pages.map((page, idx) => (
                            typeof page === 'number' ? (
                              <button
                                key={idx}
                                onClick={() => setCurrentPage(page)}
                                className={`h-8 min-w-[32px] px-2 text-sm rounded-lg transition-all ${currentPage === page ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}
                                data-testid={`page-${page}`}
                              >
                                {page}
                              </button>
                            ) : (
                              <span key={idx} className="px-2 text-slate-300">•••</span>
                            )
                          ))}
                        </div>
                        <div className="flex items-center gap-1">
                          <Button variant="outline" size="sm" disabled={currentPage >= totalPages} onClick={() => setCurrentPage(currentPage + 1)} className="h-8 px-2 border-slate-200 text-slate-500 hover:text-slate-700" data-testid="next-page">
                            <ChevronRight className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" disabled={currentPage >= totalPages} onClick={() => setCurrentPage(totalPages)} className="h-8 px-2 border-slate-200 text-slate-500 hover:text-slate-700" data-testid="last-page">
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
