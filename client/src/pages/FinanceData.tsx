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

  // Mock data for different finance categories
  const financeData = {
    aws: [
      { id: 1, companyName: "TechCorp", bizNum: "123-45-67890", year: "2024", amount: "$150,000", status: "Paid" },
      { id: 2, companyName: "StartUp Inc", bizNum: "222-33-44444", year: "2024", amount: "$45,000", status: "Pending" },
      { id: 3, companyName: "CloudSolutions", bizNum: "987-65-43210", year: "2023", amount: "$210,000", status: "Paid" },
      { id: 4, companyName: "DataFlow Systems", bizNum: "456-78-90123", year: "2024", amount: "$89,000", status: "Paid" },
      { id: 5, companyName: "NetSecure", bizNum: "789-01-23456", year: "2024", amount: "$12,500", status: "Overdue" },
      { id: 6, companyName: "AppWorks", bizNum: "321-65-49870", year: "2023", amount: "$230,000", status: "Paid" },
      { id: 7, companyName: "MobileFirst", bizNum: "147-25-83690", year: "2024", amount: "$67,000", status: "Pending" },
      { id: 8, companyName: "WebScale", bizNum: "963-85-27410", year: "2023", amount: "$180,000", status: "Paid" },
      { id: 9, companyName: "ComputeNodes", bizNum: "159-35-72846", year: "2024", amount: "$42,000", status: "Pending" },
      { id: 10, companyName: "StorageBox", bizNum: "753-95-12468", year: "2024", amount: "$15,000", status: "Paid" },
      { id: 11, companyName: "AI Labs", bizNum: "852-45-63917", year: "2024", amount: "$320,000", status: "Pending" },
      { id: 12, companyName: "GameServer", bizNum: "951-75-32864", year: "2023", amount: "$56,000", status: "Paid" },
    ],
    dart: [
      { id: 1, companyName: "Samsung Electronics", year: "2024", revenue: "250T KRW", profit: "40T KRW" },
      { id: 2, companyName: "LG Electronics", year: "2024", revenue: "80T KRW", profit: "3T KRW" },
      { id: 3, companyName: "SK Hynix", year: "2023", revenue: "30T KRW", profit: "-2T KRW" },
      { id: 4, companyName: "Hyundai Motor", year: "2024", revenue: "142T KRW", profit: "11T KRW" },
      { id: 5, companyName: "KIA", year: "2024", revenue: "98T KRW", profit: "8T KRW" },
      { id: 6, companyName: "POSCO Holdings", year: "2023", revenue: "85T KRW", profit: "4T KRW" },
      { id: 7, companyName: "NAVER", year: "2024", revenue: "10T KRW", profit: "1.5T KRW" },
      { id: 8, companyName: "Kakao", year: "2024", revenue: "8T KRW", profit: "0.5T KRW" },
    ],
    venture: [
      { id: 1, companyName: "NextBigThing", bizNum: "555-55-55555", year: "2024", funding: "Series A", valuation: "$10M" },
      { id: 2, companyName: "GreenEnergy", bizNum: "777-88-99999", year: "2024", funding: "Seed", valuation: "$2M" },
      { id: 3, companyName: "AI Innovate", bizNum: "111-22-33333", year: "2023", funding: "Series B", valuation: "$50M" },
      { id: 4, companyName: "BlockChainX", bizNum: "444-55-66666", year: "2024", funding: "Series A", valuation: "$15M" },
      { id: 5, companyName: "BioHealth", bizNum: "888-99-00000", year: "2024", funding: "Series C", valuation: "$120M" },
      { id: 6, companyName: "FinTechPro", bizNum: "222-33-44444", year: "2023", funding: "Series B", valuation: "$80M" },
      { id: 7, companyName: "EdTechSolution", bizNum: "666-77-88888", year: "2024", funding: "Seed", valuation: "$3M" },
    ],
    audit: [
      { id: 1, companyName: "Global Trade", year: "2024", auditor: "PwC", opinion: "Unqualified" },
      { id: 2, companyName: "Construction Co", year: "2024", auditor: "KPMG", opinion: "Qualified" },
      { id: 3, companyName: "Retail Giant", year: "2023", auditor: "Deloitte", opinion: "Unqualified" },
      { id: 4, companyName: "Tech Services", year: "2024", auditor: "EY", opinion: "Unqualified" },
      { id: 5, companyName: "Food & Bev Inc", year: "2024", auditor: "PwC", opinion: "Adverse" },
      { id: 6, companyName: "AutoParts Ltd", year: "2023", auditor: "KPMG", opinion: "Unqualified" },
      { id: 7, companyName: "PharmaGroup", year: "2024", auditor: "Deloitte", opinion: "Disclaimer" },
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
    const matchesSearch = searchParams.companyName 
      ? item.companyName.toLowerCase().includes(searchParams.companyName.toLowerCase()) 
      : true;
    const matchesBizNum = searchParams.bizNum 
      ? (item.bizNum && item.bizNum.includes(searchParams.bizNum))
      : true;
    const matchesYear = searchParams.year 
      ? item.year === searchParams.year
      : true;
      
    return matchesSearch && matchesBizNum && matchesYear;
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
                <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center flex-shrink-0">
                  <DollarSign className="w-5 h-5 text-white" />
                </div>
                <div className="min-w-0">
                  <h1 className="text-lg md:text-xl font-semibold tracking-tight text-slate-800 truncate">Finance Data</h1>
                  <p className="text-xs md:text-sm text-slate-500 mt-0.5 hidden sm:block">Financial data management and tracking</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-2 hidden sm:flex">
                  <RefreshCw className="w-4 h-4" />
                  Refresh
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Export</span>
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6 bg-slate-50/50 overflow-y-auto overflow-x-hidden">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="w-full space-y-6">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => { setActiveTab("aws"); setCurrentPage(1); }}
                  className={`px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
                    activeTab === "aws"
                      ? "bg-slate-900 text-white"
                      : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                  }`}
                >
                  AWS Finance
                </button>
                <button
                  onClick={() => { setActiveTab("dart"); setCurrentPage(1); }}
                  className={`px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
                    activeTab === "dart"
                      ? "bg-slate-900 text-white"
                      : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                  }`}
                >
                  DART Finance
                </button>
                <button
                  onClick={() => { setActiveTab("venture"); setCurrentPage(1); }}
                  className={`px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
                    activeTab === "venture"
                      ? "bg-slate-900 text-white"
                      : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                  }`}
                >
                  Venture Finance
                </button>
                <button
                  onClick={() => { setActiveTab("audit"); setCurrentPage(1); }}
                  className={`px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
                    activeTab === "audit"
                      ? "bg-slate-900 text-white"
                      : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                  }`}
                >
                  Audit Finance
                </button>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col">
                <div className="p-4 border-b border-slate-200 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                  <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                    <div className="relative flex-1 min-w-[200px] md:w-64">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input
                        placeholder="Search company..."
                        className="pl-9 h-9 text-sm"
                        value={searchParams.companyName}
                        onChange={(e) => handleSearchChange("companyName", e.target.value)}
                      />
                    </div>
                    {(activeTab === "aws" || activeTab === "venture") && (
                      <Input
                         placeholder="Business No..."
                         className="h-9 w-36 text-sm"
                         value={searchParams.bizNum}
                         onChange={(e) => handleSearchChange("bizNum", e.target.value)}
                      />
                    )}
                    <Select value={searchParams.year} onValueChange={(val) => handleSearchChange("year", val === "all" ? "" : val)}>
                      <SelectTrigger className="w-[100px] h-9 text-sm">
                        <SelectValue placeholder="Year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Years</SelectItem>
                        <SelectItem value="2025">2025</SelectItem>
                        <SelectItem value="2024">2024</SelectItem>
                        <SelectItem value="2023">2023</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                    <div className="text-xs text-slate-500 font-mono px-2 py-1 bg-slate-100 rounded">
                      {getApiEndpoint(activeTab)}
                    </div>
                    <Button variant="outline" size="sm" className="h-9 w-9 p-0">
                      <Filter className="w-4 h-4 text-slate-500" />
                    </Button>
                    <Popover>
                      <PopoverTrigger asChild>
                         <Button variant="outline" size="sm" className="h-9 w-9 p-0">
                          <Columns className="w-4 h-4 text-slate-500" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-56" align="end">
                        <div className="space-y-2">
                          <h4 className="font-medium text-sm text-slate-900 mb-2">Column Settings</h4>
                          <div className="text-xs text-slate-500">
                            Configure columns visibility here.
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="w-12 px-4 py-3 text-center">
                          <input type="checkbox" className="rounded border-slate-300" />
                        </th>
                        {activeTab === "aws" && (
                          <>
                            <ResizableHeader id="companyName" label="Company Name">
                              {renderColumnConfig("companyName", "Company Name")}
                            </ResizableHeader>
                            <ResizableHeader id="bizNum" label="Business Number">
                              {renderColumnConfig("bizNum", "Business Number")}
                            </ResizableHeader>
                            <ResizableHeader id="year" label="Year">
                              {renderColumnConfig("year", "Year")}
                            </ResizableHeader>
                            <ResizableHeader id="amount" label="Amount">
                              {renderColumnConfig("amount", "Amount")}
                            </ResizableHeader>
                            <ResizableHeader id="status" label="Status">
                              {renderColumnConfig("status", "Status")}
                            </ResizableHeader>
                          </>
                        )}
                        {activeTab === "dart" && (
                          <>
                            <ResizableHeader id="companyName" label="Company Name">
                              {renderColumnConfig("companyName", "Company Name")}
                            </ResizableHeader>
                            <ResizableHeader id="year" label="Year">
                              {renderColumnConfig("year", "Year")}
                            </ResizableHeader>
                            <ResizableHeader id="revenue" label="Revenue">
                              {renderColumnConfig("revenue", "Revenue")}
                            </ResizableHeader>
                            <ResizableHeader id="profit" label="Profit">
                              {renderColumnConfig("profit", "Profit")}
                            </ResizableHeader>
                          </>
                        )}
                        {activeTab === "venture" && (
                          <>
                            <ResizableHeader id="companyName" label="Company Name">
                              {renderColumnConfig("companyName", "Company Name")}
                            </ResizableHeader>
                            <ResizableHeader id="bizNum" label="Business Number">
                              {renderColumnConfig("bizNum", "Business Number")}
                            </ResizableHeader>
                            <ResizableHeader id="year" label="Year">
                              {renderColumnConfig("year", "Year")}
                            </ResizableHeader>
                            <ResizableHeader id="funding" label="Funding Stage">
                              {renderColumnConfig("funding", "Funding Stage")}
                            </ResizableHeader>
                            <ResizableHeader id="valuation" label="Valuation">
                              {renderColumnConfig("valuation", "Valuation")}
                            </ResizableHeader>
                          </>
                        )}
                        {activeTab === "audit" && (
                          <>
                            <ResizableHeader id="companyName" label="Company Name">
                              {renderColumnConfig("companyName", "Company Name")}
                            </ResizableHeader>
                            <ResizableHeader id="year" label="Year">
                              {renderColumnConfig("year", "Year")}
                            </ResizableHeader>
                            <ResizableHeader id="auditor" label="Auditor">
                              {renderColumnConfig("auditor", "Auditor")}
                            </ResizableHeader>
                            <ResizableHeader id="opinion" label="Opinion">
                              {renderColumnConfig("opinion", "Opinion")}
                            </ResizableHeader>
                          </>
                        )}
                        <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider w-20">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {paginatedData.length > 0 ? (
                        paginatedData.map((row: any) => (
                          <tr key={row.id} className="hover:bg-slate-50/80 transition-colors group">
                            <td className="px-4 py-3 text-center">
                              <input type="checkbox" className="rounded border-slate-300" />
                            </td>
                            {Object.keys(row).filter(k => k !== 'id').map((key) => {
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
                            <td className="px-4 py-3 text-right">
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-amber-600 hover:bg-amber-50">
                                <ChevronRight className="w-4 h-4" />
                              </Button>
                            </td>
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

                <div className="p-4 border-t border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500 rounded-b-xl">
                  <div className="flex items-center gap-2">
                    <span>Rows per page:</span>
                    <Select
                      value={String(itemsPerPage)}
                      onValueChange={(val) => {
                        setItemsPerPage(Number(val));
                        setCurrentPage(1);
                      }}
                    >
                      <SelectTrigger className="w-[70px] h-8 bg-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="20">20</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                        <SelectItem value="100">100</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <span>
                      Page {currentPage} of {totalPages || 1}
                    </span>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 bg-white"
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 bg-white"
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages || totalPages === 0}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
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
