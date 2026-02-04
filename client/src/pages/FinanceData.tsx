import { useState } from "react";
import { motion } from "framer-motion";
import React from "react";
import {
  Search,
  Download,
  Menu,
  Palette,
  Plus,
  Trash2,
  Check,
  Columns,
  RefreshCw,
  FileText,
  TrendingUp,
  Clock,
  DollarSign,
  Activity,
  Building2,
  ChevronLeft,
  ChevronRight
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
  const [activeTab, setActiveTab] = useState("all");
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
  });

  const columnLabels: Record<string, string> = {
    company_nm: "Company Name",
    biz_no: "Business Number",
    year: "Year",
    total_revenue: "Total Revenue",
    operating_income: "Operating Income",
    net_income: "Net Income",
    total_assets: "Total Assets",
    total_liabilities: "Total Liabilities",
    total_equity: "Total Equity",
    create_date: "Created Date",
  };

  const toggleColumn = (columnId: string) => {
    setVisibleColumns(prev => ({
      ...prev,
      [columnId]: !prev[columnId]
    }));
  };

  // Mock data for finance records
  const financeData = [
    { id: 1, company_nm: "TechCorp", biz_no: "123-45-67890", year: "2024", total_revenue: "15,000,000", operating_income: "2,500,000", net_income: "1,800,000", total_assets: "50,000,000", total_liabilities: "20,000,000", total_equity: "30,000,000", create_date: "2024-01-15" },
    { id: 2, company_nm: "StartUp Inc", biz_no: "222-33-44444", year: "2024", total_revenue: "5,000,000", operating_income: "-500,000", net_income: "-450,000", total_assets: "8,000,000", total_liabilities: "3,000,000", total_equity: "5,000,000", create_date: "2024-02-10" },
    { id: 3, company_nm: "CloudSolutions", biz_no: "987-65-43210", year: "2023", total_revenue: "28,000,000", operating_income: "4,200,000", net_income: "3,100,000", total_assets: "80,000,000", total_liabilities: "35,000,000", total_equity: "45,000,000", create_date: "2023-12-20" },
    { id: 4, company_nm: "DataFlow Systems", biz_no: "456-78-90123", year: "2024", total_revenue: "9,500,000", operating_income: "1,200,000", net_income: "950,000", total_assets: "25,000,000", total_liabilities: "10,000,000", total_equity: "15,000,000", create_date: "2024-03-05" },
    { id: 5, company_nm: "NetSecure", biz_no: "789-01-23456", year: "2024", total_revenue: "12,500,000", operating_income: "1,800,000", net_income: "1,400,000", total_assets: "40,000,000", total_liabilities: "15,000,000", total_equity: "25,000,000", create_date: "2024-01-25" },
    { id: 6, company_nm: "AppWorks", biz_no: "321-65-49870", year: "2023", total_revenue: "35,000,000", operating_income: "6,500,000", net_income: "5,200,000", total_assets: "120,000,000", total_liabilities: "40,000,000", total_equity: "80,000,000", create_date: "2023-11-15" },
    { id: 7, company_nm: "MobileFirst", biz_no: "147-25-83690", year: "2024", total_revenue: "7,800,000", operating_income: "900,000", net_income: "750,000", total_assets: "18,000,000", total_liabilities: "6,000,000", total_equity: "12,000,000", create_date: "2024-04-01" },
    { id: 8, company_nm: "WebScale", biz_no: "963-85-27410", year: "2023", total_revenue: "22,000,000", operating_income: "3,500,000", net_income: "2,800,000", total_assets: "65,000,000", total_liabilities: "25,000,000", total_equity: "40,000,000", create_date: "2023-10-30" },
    { id: 9, company_nm: "ComputeNodes", biz_no: "159-35-72846", year: "2024", total_revenue: "4,500,000", operating_income: "-200,000", net_income: "-150,000", total_assets: "12,000,000", total_liabilities: "5,000,000", total_equity: "7,000,000", create_date: "2024-02-28" },
    { id: 10, company_nm: "StorageBox", biz_no: "753-95-12468", year: "2024", total_revenue: "18,000,000", operating_income: "2,900,000", net_income: "2,200,000", total_assets: "55,000,000", total_liabilities: "22,000,000", total_equity: "33,000,000", create_date: "2024-01-10" },
  ];

  const [searchParams, setSearchParams] = useState({
    searchField: "all",
    searchValue: "",
  });

  const handleSearchChange = (field: string, value: string) => {
    setSearchParams(prev => ({ ...prev, [field]: value }));
  };

  const searchFields = [
    { value: "all", label: "All Fields" },
    { value: "company_nm", label: "Company Name" },
    { value: "biz_no", label: "Business Number" },
    { value: "year", label: "Year" },
  ];

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
    company_nm: 200,
    biz_no: 150,
    year: 100,
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

  // Filtering
  const filteredData = financeData.filter((item: any) => {
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

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

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
                  <h1 className="text-lg md:text-xl font-semibold tracking-tight text-slate-800 truncate">Finance Records</h1>
                  <p className="text-xs md:text-sm text-slate-500 mt-0.5 hidden sm:block">Financial statements and performance records</p>
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
            <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.05 }} className="mb-6">
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 py-4 px-6 bg-white rounded-xl border border-slate-100">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <FileText className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wide">TOTAL RECORDS</p>
                    <p className="text-xl font-bold text-slate-800">1,250</p>
                  </div>
                </div>
                <div className="hidden sm:block w-px h-10 bg-slate-200" />
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <DollarSign className="w-5 h-5 text-emerald-500" />
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wide">TOTAL REVENUE</p>
                    <p className="text-xl font-bold text-emerald-600">$125M</p>
                  </div>
                </div>
                <div className="hidden sm:block w-px h-10 bg-slate-200" />
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <TrendingUp className="w-5 h-5 text-indigo-500" />
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wide">GROWTH (YoY)</p>
                    <p className="text-xl font-bold text-indigo-600">+15.4%</p>
                  </div>
                </div>
                <div className="hidden sm:block w-px h-10 bg-slate-200" />
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <Clock className="w-5 h-5 text-amber-500" />
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wide">UPDATE CYCLE</p>
                    <p className="text-xl font-bold text-slate-800">Quarterly</p>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Main Content */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h2 className="text-lg font-semibold text-slate-800">Financial Statements</h2>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex items-center h-9 border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500">
                    <select 
                      value={searchParams.searchField} 
                      onChange={(e) => handleSearchChange("searchField", e.target.value)}
                      className="h-full pl-3 pr-8 text-xs bg-slate-50 border-r border-slate-200 text-slate-600 focus:outline-none cursor-pointer hover:bg-slate-100 transition-colors w-32 rounded-none appearance-none"
                      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748b' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.5rem center', backgroundSize: '1rem' }}
                    >
                      {searchFields.map(opt => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
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
                    <button
                      onClick={() => setShowColumnSelector(!showColumnSelector)}
                      className="flex items-center gap-2 px-3 h-9 border border-slate-200 rounded-lg text-sm bg-white text-slate-600 hover:bg-slate-50 transition-colors shadow-sm"
                    >
                      <Columns className="w-4 h-4" />
                      Fields
                    </button>
                    {showColumnSelector && (
                      <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-10 max-h-80 overflow-y-auto">
                        {Object.entries(columnLabels).map(([key, label]) => (
                          <button
                            key={key}
                            onClick={() => toggleColumn(key)}
                            className="flex items-center justify-between w-full px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
                          >
                            <span>{label}</span>
                            {visibleColumns[key] && (
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
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      {visibleColumns.company_nm && <ResizableHeader id="company_nm" label="Company Name" align="left">{renderColumnConfig('company_nm', 'Company Name')}</ResizableHeader>}
                      {visibleColumns.biz_no && <ResizableHeader id="biz_no" label="Business Number" align="left">{renderColumnConfig('biz_no', 'Business Number')}</ResizableHeader>}
                      {visibleColumns.year && <ResizableHeader id="year" label="Year" align="center">{renderColumnConfig('year', 'Year')}</ResizableHeader>}
                      {visibleColumns.total_revenue && <ResizableHeader id="total_revenue" label="Total Revenue" align="right">{renderColumnConfig('total_revenue', 'Total Revenue')}</ResizableHeader>}
                      {visibleColumns.operating_income && <ResizableHeader id="operating_income" label="Operating Income" align="right">{renderColumnConfig('operating_income', 'Operating Income')}</ResizableHeader>}
                      {visibleColumns.net_income && <ResizableHeader id="net_income" label="Net Income" align="right">{renderColumnConfig('net_income', 'Net Income')}</ResizableHeader>}
                      {visibleColumns.total_assets && <ResizableHeader id="total_assets" label="Total Assets" align="right">{renderColumnConfig('total_assets', 'Total Assets')}</ResizableHeader>}
                      {visibleColumns.total_liabilities && <ResizableHeader id="total_liabilities" label="Total Liabilities" align="right">{renderColumnConfig('total_liabilities', 'Total Liabilities')}</ResizableHeader>}
                      {visibleColumns.total_equity && <ResizableHeader id="total_equity" label="Total Equity" align="right">{renderColumnConfig('total_equity', 'Total Equity')}</ResizableHeader>}
                      {visibleColumns.create_date && <ResizableHeader id="create_date" label="Created Date" align="center">{renderColumnConfig('create_date', 'Created Date')}</ResizableHeader>}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {paginatedData.length > 0 ? (
                      paginatedData.map((item: any) => (
                        <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                          {visibleColumns.company_nm && (
                            <td className="px-4 py-3 text-slate-900 font-medium" style={getCellStyle('company_nm', item.company_nm)}>
                              {item.company_nm}
                            </td>
                          )}
                          {visibleColumns.biz_no && (
                            <td className="px-4 py-3 text-slate-600 font-mono text-xs" style={getCellStyle('biz_no', item.biz_no)}>
                              {item.biz_no}
                            </td>
                          )}
                          {visibleColumns.year && (
                            <td className="px-4 py-3 text-center text-slate-600" style={getCellStyle('year', item.year)}>
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-800">
                                {item.year}
                              </span>
                            </td>
                          )}
                          {visibleColumns.total_revenue && (
                            <td className="px-4 py-3 text-right text-slate-700 font-mono" style={getCellStyle('total_revenue', item.total_revenue)}>
                              {item.total_revenue}
                            </td>
                          )}
                          {visibleColumns.operating_income && (
                            <td className="px-4 py-3 text-right font-mono" style={getCellStyle('operating_income', item.operating_income)}>
                              <span className={`${String(item.operating_income).startsWith('-') ? 'text-red-600' : 'text-blue-600'}`}>
                                {item.operating_income}
                              </span>
                            </td>
                          )}
                          {visibleColumns.net_income && (
                            <td className="px-4 py-3 text-right font-mono" style={getCellStyle('net_income', item.net_income)}>
                              <span className={`${String(item.net_income).startsWith('-') ? 'text-red-600' : 'text-emerald-600'}`}>
                                {item.net_income}
                              </span>
                            </td>
                          )}
                          {visibleColumns.total_assets && (
                            <td className="px-4 py-3 text-right text-slate-600 font-mono" style={getCellStyle('total_assets', item.total_assets)}>
                              {item.total_assets}
                            </td>
                          )}
                          {visibleColumns.total_liabilities && (
                            <td className="px-4 py-3 text-right text-slate-600 font-mono" style={getCellStyle('total_liabilities', item.total_liabilities)}>
                              {item.total_liabilities}
                            </td>
                          )}
                          {visibleColumns.total_equity && (
                            <td className="px-4 py-3 text-right text-slate-600 font-mono" style={getCellStyle('total_equity', item.total_equity)}>
                              {item.total_equity}
                            </td>
                          )}
                          {visibleColumns.create_date && (
                            <td className="px-4 py-3 text-center text-slate-500 text-xs" style={getCellStyle('create_date', item.create_date)}>
                              {item.create_date}
                            </td>
                          )}
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={10} className="px-6 py-8 text-center text-slate-500">
                          No financial records found matching your criteria.
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
