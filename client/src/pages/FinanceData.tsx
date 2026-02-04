import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import React from "react";
import {
  Search,
  Filter,
  Download,
  DollarSign,
  Menu,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Palette,
  Plus,
  Trash2,
  Check,
  Columns,
  RefreshCw,
  FileText,
  Activity,
  TrendingUp,
  Clock,
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";

// Types
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

export default function FinanceData() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("aws");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [columnStyles, setColumnStyles] = useState<Record<string, ColumnStyle>>({});
  const [showColumnSelector, setShowColumnSelector] = useState(false);

  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>({
    company_nm: true,
    biz_no: true,
    year: true,
    total_revenue: true,
    operating_income: true,
    net_income: true,
    total_assets: true,
    total_liabilities: true,
    total_equity: true,
    create_date: true,
    // Keep AWS fields for now as they might be used in other tabs or just in case
    amount: true,
    status: true,
    revenue: true,
    profit: true,
    funding: true,
    valuation: true,
    auditor: true,
    opinion: true,
  });

  const toggleColumn = (columnId: string) => {
    setVisibleColumns(prev => ({
      ...prev,
      [columnId]: !prev[columnId]
    }));
  };

  // Mock data for different finance categories
  const financeData = {
    aws: [
      { id: 1, companyName: "TechCorp", bizNum: "123-45-67890", year: "2024", amount: "$150,000", status: "Paid" },
      { id: 2, companyName: "StartUp Inc", bizNum: "222-33-44444", year: "2024", amount: "$45,000", status: "Pending" },
    ],
    dart: [
      { id: 1, companyName: "Samsung Electronics", year: "2024", revenue: "250T KRW", profit: "40T KRW" },
      { id: 2, companyName: "LG Electronics", year: "2024", revenue: "80T KRW", profit: "3T KRW" },
    ],
    venture: [
      { 
        id: 1, 
        company_nm: "NextBigThing", 
        biz_no: "555-55-55555", 
        year: "2024", 
        total_revenue: "10,000", 
        operating_income: "1,500", 
        net_income: "1,200", 
        total_assets: "50,000", 
        total_liabilities: "20,000", 
        total_equity: "30,000", 
        create_date: "2024-01-15" 
      },
      { 
        id: 2, 
        company_nm: "GreenEnergy", 
        biz_no: "777-88-99999", 
        year: "2024", 
        total_revenue: "5,000", 
        operating_income: "-500", 
        net_income: "-400", 
        total_assets: "15,000", 
        total_liabilities: "5,000", 
        total_equity: "10,000", 
        create_date: "2024-02-20" 
      },
      { 
        id: 3, 
        company_nm: "AI Innovate", 
        biz_no: "111-22-33333", 
        year: "2023", 
        total_revenue: "25,000", 
        operating_income: "5,000", 
        net_income: "4,200", 
        total_assets: "100,000", 
        total_liabilities: "40,000", 
        total_equity: "60,000", 
        create_date: "2023-11-10" 
      },
      { 
        id: 4, 
        company_nm: "BlockChainX", 
        biz_no: "444-55-66666", 
        year: "2024", 
        total_revenue: "8,000", 
        operating_income: "1,000", 
        net_income: "800", 
        total_assets: "30,000", 
        total_liabilities: "10,000", 
        total_equity: "20,000", 
        create_date: "2024-03-05" 
      },
      { 
        id: 5, 
        company_nm: "BioHealth", 
        biz_no: "888-99-00000", 
        year: "2024", 
        total_revenue: "45,000", 
        operating_income: "8,000", 
        net_income: "6,500", 
        total_assets: "200,000", 
        total_liabilities: "50,000", 
        total_equity: "150,000", 
        create_date: "2024-01-30" 
      },
      { 
        id: 6, 
        company_nm: "FinTechPro", 
        biz_no: "222-33-44444", 
        year: "2023", 
        total_revenue: "12,000", 
        operating_income: "2,500", 
        net_income: "2,000", 
        total_assets: "60,000", 
        total_liabilities: "25,000", 
        total_equity: "35,000", 
        create_date: "2023-12-15" 
      },
      { 
        id: 7, 
        company_nm: "EdTechSolution", 
        biz_no: "666-77-88888", 
        year: "2024", 
        total_revenue: "3,000", 
        operating_income: "-200", 
        net_income: "-150", 
        total_assets: "8,000", 
        total_liabilities: "2,000", 
        total_equity: "6,000", 
        create_date: "2024-04-01" 
      },
    ],
    audit: [
      { id: 1, companyName: "Global Trade", year: "2024", auditor: "PwC", opinion: "Unqualified" },
      { id: 2, companyName: "Construction Co", year: "2024", auditor: "KPMG", opinion: "Qualified" },
    ],
  };

  const [searchParams, setSearchParams] = useState({
    searchField: "all",
    searchValue: "",
  });

  const handleSearchChange = (field: string, value: string) => {
    setSearchParams(prev => ({ ...prev, [field]: value }));
  };

  const getSearchFields = (tab: string) => {
    switch (tab) {
      case "aws":
        return [
          { value: "all", label: "All Fields" },
          { value: "companyName", label: "Company Name" },
          { value: "bizNum", label: "Business Number" },
          { value: "year", label: "Year" },
        ];
      case "dart":
        return [
          { value: "all", label: "All Fields" },
          { value: "companyName", label: "Company Name" },
          { value: "year", label: "Year" },
        ];
      case "venture":
        return [
          { value: "all", label: "All Fields" },
          { value: "company_nm", label: "벤처기업 이름" },
          { value: "biz_no", label: "사업자 번호" },
          { value: "year", label: "년도" },
        ];
      case "audit":
        return [
          { value: "all", label: "All Fields" },
          { value: "companyName", label: "Company Name" },
          { value: "year", label: "Year" },
        ];
      default:
        return [{ value: "all", label: "All Fields" }];
    }
  };

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

  const [columnWidths, setColumnWidths] = useState<Record<string, number>>({
    companyName: 200,
    bizNum: 150,
    year: 100,
    amount: 150,
    status: 120,
    revenue: 150,
    profit: 150,
    funding: 150,
    valuation: 150,
    auditor: 150,
    opinion: 150,
    company_nm: 200,
    biz_no: 150,
    total_revenue: 150,
    operating_income: 150,
    net_income: 150,
    total_assets: 150,
    total_liabilities: 150,
    total_equity: 150,
    create_date: 120,
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

  const getApiEndpoint = (tab: string) => {
    switch (tab) {
      case "aws": return "/internal/data/finance/aws/list";
      case "dart": return "/internal/data/finance/dart/list";
      case "venture": return "/internal/data/finance/venture/list";
      case "audit": return "/internal/data/finance/audit/list";
      default: return "";
    }
  };

  const currentData = financeData[activeTab as keyof typeof financeData] || [];
  
  // Filtering
  const filteredData = currentData.filter((item: any) => {
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

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
                  <h1 className="text-lg md:text-xl font-semibold tracking-tight text-slate-800 truncate">Finance Data</h1>
                  <p className="text-xs md:text-sm text-slate-500 mt-0.5 hidden sm:block">Financial data management and tracking</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="gap-2 border-slate-200 hover:bg-slate-50 text-slate-700" data-testid="export-button">
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export</span>
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6 bg-slate-50/50 overflow-y-auto overflow-x-hidden">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <div className="mb-4">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => { setActiveTab("aws"); setCurrentPage(1); }}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === "aws"
                      ? "bg-blue-500 text-white"
                      : "text-slate-500 hover:text-slate-800 hover:bg-white border border-slate-200"
                  }`}
                >
                  AWS Finance
                </button>
                <button
                  onClick={() => { setActiveTab("dart"); setCurrentPage(1); }}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === "dart"
                      ? "bg-blue-500 text-white"
                      : "text-slate-500 hover:text-slate-800 hover:bg-white border border-slate-200"
                  }`}
                >
                  DART Finance
                </button>
                <button
                  onClick={() => { setActiveTab("venture"); setCurrentPage(1); }}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === "venture"
                      ? "bg-blue-500 text-white"
                      : "text-slate-500 hover:text-slate-800 hover:bg-white border border-slate-200"
                  }`}
                >
                  Venture Finance
                </button>
                <button
                  onClick={() => { setActiveTab("audit"); setCurrentPage(1); }}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === "audit"
                      ? "bg-blue-500 text-white"
                      : "text-slate-500 hover:text-slate-800 hover:bg-white border border-slate-200"
                  }`}
                >
                  Audit Finance
                </button>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-8 py-4 px-6 bg-white rounded-xl border border-slate-100">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-purple-500" />
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wide">Total Records</p>
                    <p className="text-xl font-bold text-slate-800">{filteredData.length * 12}</p>
                  </div>
                </div>
                <div className="w-px h-10 bg-slate-200" />
                <div className="flex items-center gap-3">
                  <Activity className="w-5 h-5 text-emerald-500" />
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wide">Verified</p>
                    <p className="text-xl font-bold text-emerald-600">{Math.floor(filteredData.length * 8.5)}</p>
                  </div>
                </div>
                <div className="w-px h-10 bg-slate-200" />
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wide">Monthly Growth</p>
                    <p className="text-xl font-bold text-blue-600">+12.5%</p>
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
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="flex items-center justify-between gap-3 p-4 border-b border-slate-100">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">Finance Records</h2>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center h-9 border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500">
                    <select
                      value={searchParams.searchField}
                      onChange={(e) => handleSearchChange("searchField", e.target.value)}
                      className="h-full pl-3 pr-8 text-xs bg-slate-50 border-r border-slate-200 text-slate-600 focus:outline-none cursor-pointer hover:bg-slate-100 transition-colors w-32 rounded-none appearance-none"
                      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748b' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.5rem center', backgroundSize: '1rem' }}
                    >
                      {getSearchFields(activeTab).map(field => (
                        <option key={field.value} value={field.value}>{field.label}</option>
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
                            <span className="text-xs text-slate-400">{getSearchFields(activeTab).filter(f => f.value !== 'all').length} fields</span>
                          </div>
                        </div>
                        <div className="p-1.5 space-y-0.5 max-h-[300px] overflow-y-auto custom-scrollbar">
                          {getSearchFields(activeTab).filter(f => f.value !== 'all').map((field) => (
                            <div 
                              key={field.value} 
                              className="flex items-center gap-2.5 px-2.5 py-2 hover:bg-slate-800/50 rounded-md cursor-pointer transition-colors group" 
                              onClick={() => toggleColumn(field.value)}
                            >
                              <div className={`w-4 h-4 rounded flex items-center justify-center transition-all ${visibleColumns[field.value] !== false ? 'bg-blue-600 shadow-sm shadow-blue-500/20' : 'border-2 border-slate-600 bg-transparent group-hover:border-slate-500'}`}>
                                {visibleColumns[field.value] !== false && <Check className="w-3 h-3 text-white stroke-[3]" />}
                              </div>
                              <span className={`text-sm ${visibleColumns[field.value] !== false ? 'text-slate-200 font-medium' : 'text-slate-400'}`}>{field.label}</span>
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
                        {activeTab === "aws" && (
                          <>
                            {(visibleColumns["companyName"] !== false) && (
                              <ResizableHeader id="companyName" label="Company Name">
                                {renderColumnConfig("companyName", "Company Name")}
                              </ResizableHeader>
                            )}
                            {(visibleColumns["bizNum"] !== false) && (
                              <ResizableHeader id="bizNum" label="Business Number">
                                {renderColumnConfig("bizNum", "Business Number")}
                              </ResizableHeader>
                            )}
                            {(visibleColumns["year"] !== false) && (
                              <ResizableHeader id="year" label="Year">
                                {renderColumnConfig("year", "Year")}
                              </ResizableHeader>
                            )}
                            {(visibleColumns["amount"] !== false) && (
                              <ResizableHeader id="amount" label="Amount">
                                {renderColumnConfig("amount", "Amount")}
                              </ResizableHeader>
                            )}
                            {(visibleColumns["status"] !== false) && (
                              <ResizableHeader id="status" label="Status">
                                {renderColumnConfig("status", "Status")}
                              </ResizableHeader>
                            )}
                          </>
                        )}
                        {activeTab === "dart" && (
                          <>
                            {(visibleColumns["companyName"] !== false) && (
                              <ResizableHeader id="companyName" label="Company Name">
                                {renderColumnConfig("companyName", "Company Name")}
                              </ResizableHeader>
                            )}
                            {(visibleColumns["year"] !== false) && (
                              <ResizableHeader id="year" label="Year">
                                {renderColumnConfig("year", "Year")}
                              </ResizableHeader>
                            )}
                            {(visibleColumns["revenue"] !== false) && (
                              <ResizableHeader id="revenue" label="Revenue">
                                {renderColumnConfig("revenue", "Revenue")}
                              </ResizableHeader>
                            )}
                            {(visibleColumns["profit"] !== false) && (
                              <ResizableHeader id="profit" label="Profit">
                                {renderColumnConfig("profit", "Profit")}
                              </ResizableHeader>
                            )}
                          </>
                        )}
                        {activeTab === "venture" && (
                          <>
                            {(visibleColumns["company_nm"] !== false) && (
                              <ResizableHeader id="company_nm" label="벤처기업 이름">
                                {renderColumnConfig("company_nm", "벤처기업 이름")}
                              </ResizableHeader>
                            )}
                            {(visibleColumns["biz_no"] !== false) && (
                              <ResizableHeader id="biz_no" label="사업자 번호">
                                {renderColumnConfig("biz_no", "사업자 번호")}
                              </ResizableHeader>
                            )}
                            {(visibleColumns["year"] !== false) && (
                              <ResizableHeader id="year" label="년도">
                                {renderColumnConfig("year", "년도")}
                              </ResizableHeader>
                            )}
                            {(visibleColumns["total_revenue"] !== false) && (
                              <ResizableHeader id="total_revenue" label="매출액">
                                {renderColumnConfig("total_revenue", "매출액")}
                              </ResizableHeader>
                            )}
                            {(visibleColumns["operating_income"] !== false) && (
                              <ResizableHeader id="operating_income" label="영업손익">
                                {renderColumnConfig("operating_income", "영업손익")}
                              </ResizableHeader>
                            )}
                            {(visibleColumns["net_income"] !== false) && (
                              <ResizableHeader id="net_income" label="당기순이익">
                                {renderColumnConfig("net_income", "당기순이익")}
                              </ResizableHeader>
                            )}
                            {(visibleColumns["total_assets"] !== false) && (
                              <ResizableHeader id="total_assets" label="자산총계">
                                {renderColumnConfig("total_assets", "자산총계")}
                              </ResizableHeader>
                            )}
                            {(visibleColumns["total_liabilities"] !== false) && (
                              <ResizableHeader id="total_liabilities" label="부채총계">
                                {renderColumnConfig("total_liabilities", "부채총계")}
                              </ResizableHeader>
                            )}
                            {(visibleColumns["total_equity"] !== false) && (
                              <ResizableHeader id="total_equity" label="자본총계">
                                {renderColumnConfig("total_equity", "자본총계")}
                              </ResizableHeader>
                            )}
                            {(visibleColumns["create_date"] !== false) && (
                              <ResizableHeader id="create_date" label="생성 날짜">
                                {renderColumnConfig("create_date", "생성 날짜")}
                              </ResizableHeader>
                            )}
                          </>
                        )}
                        {activeTab === "audit" && (
                          <>
                            {(visibleColumns["companyName"] !== false) && (
                              <ResizableHeader id="companyName" label="Company Name">
                                {renderColumnConfig("companyName", "Company Name")}
                              </ResizableHeader>
                            )}
                            {(visibleColumns["year"] !== false) && (
                              <ResizableHeader id="year" label="Year">
                                {renderColumnConfig("year", "Year")}
                              </ResizableHeader>
                            )}
                            {(visibleColumns["auditor"] !== false) && (
                              <ResizableHeader id="auditor" label="Auditor">
                                {renderColumnConfig("auditor", "Auditor")}
                              </ResizableHeader>
                            )}
                            {(visibleColumns["opinion"] !== false) && (
                              <ResizableHeader id="opinion" label="Opinion">
                                {renderColumnConfig("opinion", "Opinion")}
                              </ResizableHeader>
                            )}
                          </>
                        )}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {paginatedData.length > 0 ? (
                        paginatedData.map((row: any) => (
                          <tr key={row.id} className="hover:bg-slate-50/50 transition-colors group">
                            {Object.keys(row).filter(k => k !== 'id' && visibleColumns[k] !== false).map((key) => {
                               const style = getCellStyle(key, row[key]);
                               return (
                                <td 
                                  key={key} 
                                  className="px-4 py-3 text-sm text-slate-600 truncate relative"
                                  style={{ 
                                    maxWidth: columnWidths[key],
                                    color: style.color,
                                    backgroundColor: style.backgroundColor
                                  }}
                                >
                                  {style.isTextOnly && style.rawBgColor && (
                                     <div 
                                       className="absolute inset-0 opacity-100 pointer-events-none" 
                                       style={{ backgroundColor: style.rawBgColor }} 
                                     />
                                  )}
                                  <span className="relative z-10">{row[key]}</span>
                                </td>
                               );
                            })}
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={10} className="px-6 py-12 text-center text-slate-500">
                            <div className="flex flex-col items-center gap-2">
                              <Search className="w-8 h-8 text-slate-300" />
                              <p>No finance data found matching your criteria.</p>
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
