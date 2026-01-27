import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import React from "react";
import {
  Building2,
  Search,
  Filter,
  Download,
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

export default function CompanyData() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("aws");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [columnStyles, setColumnStyles] = useState<Record<string, ColumnStyle>>({});
  const [showColumnSelector, setShowColumnSelector] = useState(false);

  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>({
    name: true,
    ceo: true,
    industry: true,
    address: true,
    bizNum: true,
    majorProduct: true,
    stockCode: true,
    corpCls: true,
    mainProd: true,
  });

  const toggleColumn = (columnId: string) => {
    setVisibleColumns(prev => ({
      ...prev,
      [columnId]: !prev[columnId]
    }));
  };
  
  // Mock data based on new categories
  const companyData = {
    aws: [
      { id: 1, name: "Samsung Electronics", ceo: "Jong-Hee Han", industry: "Manufacturing", address: "129 Samsung-ro, Suwon", bizNum: "124-81-00998", majorProduct: "Semiconductors, Phones" },
      { id: 2, name: "Hyundai Motor", ceo: "Jae-Hoon Chang", industry: "Automotive", address: "12 Heolleung-ro, Seoul", bizNum: "101-81-07316", majorProduct: "Vehicles" },
      { id: 3, name: "SK Hynix", ceo: "Kwak Noh-Jung", industry: "Manufacturing", address: "2091 Gyeongchung-daero, Icheon", bizNum: "126-81-00998", majorProduct: "DRAM, NAND Flash" },
      { id: 4, name: "LG Electronics", ceo: "William Cho", industry: "Electronics", address: "128 Yeoui-daero, Seoul", bizNum: "107-86-14075", majorProduct: "Home Appliances, TV" },
      { id: 5, name: "POSCO Holdings", ceo: "Jeong-Woo Choi", industry: "Steel", address: "622 Teheran-ro, Seoul", bizNum: "506-81-00017", majorProduct: "Steel Products" },
      { id: 6, name: "Kia", ceo: "Ho-Sung Song", industry: "Automotive", address: "12 Heolleung-ro, Seoul", bizNum: "119-81-02316", majorProduct: "Automobiles" },
      { id: 7, name: "Naver", ceo: "Soo-Yeon Choi", industry: "IT Services", address: "6 Buljeong-ro, Seongnam", bizNum: "220-81-62517", majorProduct: "Search Portal" },
      { id: 8, name: "Kakao", ceo: "Sung-Soo Hong", industry: "IT Services", address: "242 Cheomdan-ro, Jeju", bizNum: "120-81-47521", majorProduct: "Messaging, Platform" },
    ],
    dart: [
      { id: 1, name: "Samsung Electronics", ceo: "Jong-Hee Han", industry: "Manufacturing", address: "129 Samsung-ro, Suwon", bizNum: "124-81-00998", stockCode: "005930", corpCls: "Y" },
      { id: 2, name: "SK Hynix", ceo: "Kwak Noh-Jung", industry: "Manufacturing", address: "2091 Gyeongchung-daero, Icheon", bizNum: "126-81-00998", stockCode: "000660", corpCls: "Y" },
      { id: 3, name: "LG Energy Solution", ceo: "Young-Soo Kwon", industry: "Manufacturing", address: "108 Yeoui-daero, Seoul", bizNum: "416-81-36430", stockCode: "373220", corpCls: "Y" },
      { id: 4, name: "Samsung Biologics", ceo: "John Rim", industry: "Pharmaceuticals", address: "300 Songdo-bio-daero, Incheon", bizNum: "137-86-07969", stockCode: "207940", corpCls: "Y" },
      { id: 5, name: "Celltrion", ceo: "Tae-Jin Kim", industry: "Pharmaceuticals", address: "23 Academy-ro, Incheon", bizNum: "137-81-07316", stockCode: "068270", corpCls: "Y" },
      { id: 6, name: "Hyundai Mobis", ceo: "Sung-Hwan Cho", industry: "Automotive Parts", address: "203 Teheran-ro, Seoul", bizNum: "116-81-03736", stockCode: "012330", corpCls: "Y" },
    ],
    venture: [
      { id: 1, name: "Zigbang", ceo: "Sung-Woo Ahn", industry: "Real Estate Tech", address: "123 Teheran-ro, Seoul", bizNum: "220-88-12345", mainProd: "Real Estate App" },
      { id: 2, name: "Dunamu", ceo: "Seok-Woo Lee", industry: "Fintech", address: "456 Gangnam-daero, Seoul", bizNum: "119-86-54321", mainProd: "Upbit, Stockplus" },
      { id: 3, name: "Bucketplace", ceo: "Seung-Jae Lee", industry: "Interior Platform", address: "789 Seocho-daero, Seoul", bizNum: "211-88-67890", mainProd: "Ohou" },
      { id: 4, name: "Ridi", ceo: "Seung-Hoon Lee", industry: "Content Platform", address: "321 Yeoksam-ro, Seoul", bizNum: "120-87-98765", mainProd: "Ridi Books" },
      { id: 5, name: "Danggeun Market", ceo: "Yong-Hyun Kim", industry: "Community", address: "654 Nambusunhwan-ro, Seoul", bizNum: "113-86-24680", mainProd: "Karrot" },
      { id: 6, name: "Wanted Lab", ceo: "Bok-Ki Lee", industry: "HR Tech", address: "987 Olympic-ro, Seoul", bizNum: "261-81-13579", mainProd: "Wanted" },
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
          { value: "name", label: "Company Name" },
          { value: "ceo", label: "CEO" },
          { value: "industry", label: "Industry" },
          { value: "address", label: "Address" },
          { value: "bizNum", label: "Business Number" },
          { value: "majorProduct", label: "Major Product" },
        ];
      case "dart":
        return [
          { value: "all", label: "All Fields" },
          { value: "name", label: "Company Name" },
          { value: "ceo", label: "CEO" },
          { value: "industry", label: "Industry" },
          { value: "address", label: "Address" },
          { value: "bizNum", label: "Business Number" },
          { value: "stockCode", label: "Stock Code" },
          { value: "corpCls", label: "Corp Class" },
        ];
      case "venture":
        return [
          { value: "all", label: "All Fields" },
          { value: "name", label: "Company Name" },
          { value: "ceo", label: "CEO" },
          { value: "industry", label: "Industry" },
          { value: "address", label: "Address" },
          { value: "bizNum", label: "Business Number" },
          { value: "mainProd", label: "Main Product" },
        ];
      default:
        return [{ value: "all", label: "All Fields" }];
    }
  };

  const getApiEndpoint = (tab: string) => {
    switch (tab) {
      case "aws": return "/internal/data/companies/list";
      case "dart": return "/internal/data/dart/list";
      case "venture": return "/internal/data/ventures/list";
      default: return "";
    }
  };

  const currentData = companyData[activeTab as keyof typeof companyData] || [];
  
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
    name: 200,
    ceo: 120,
    industry: 150,
    address: 250,
    bizNum: 120,
    majorProduct: 200,
    stockCode: 100,
    corpCls: 80,
    mainProd: 200,
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
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <div className="min-w-0">
                  <h1 className="text-lg md:text-xl font-semibold tracking-tight text-slate-800 truncate">Company Data</h1>
                  <p className="text-xs md:text-sm text-slate-500 mt-0.5 hidden sm:block">Corporate information and analytics</p>
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
                  AWS Companies
                </button>
                <button
                  onClick={() => { setActiveTab("dart"); setCurrentPage(1); }}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === "dart"
                      ? "bg-blue-500 text-white"
                      : "text-slate-500 hover:text-slate-800 hover:bg-white border border-slate-200"
                  }`}
                >
                  DART Companies
                </button>
                <button
                  onClick={() => { setActiveTab("venture"); setCurrentPage(1); }}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === "venture"
                      ? "bg-blue-500 text-white"
                      : "text-slate-500 hover:text-slate-800 hover:bg-white border border-slate-200"
                  }`}
                >
                  Venture Companies
                </button>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-8 py-4 px-6 bg-white rounded-xl border border-slate-100">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-purple-500" />
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wide">Total Companies</p>
                    <p className="text-xl font-bold text-slate-800">{filteredData.length * 154}</p>
                  </div>
                </div>
                <div className="w-px h-10 bg-slate-200" />
                <div className="flex items-center gap-3">
                  <Activity className="w-5 h-5 text-emerald-500" />
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wide">Active</p>
                    <p className="text-xl font-bold text-emerald-600">{Math.floor(filteredData.length * 123)}</p>
                  </div>
                </div>
                <div className="w-px h-10 bg-slate-200" />
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wide">New This Month</p>
                    <p className="text-xl font-bold text-blue-600">+8.4%</p>
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
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-semibold text-slate-900">Company Records</h2>
                  <div className="text-xs text-slate-500 font-mono px-2 py-1 bg-slate-100 rounded border border-slate-200">
                    {getApiEndpoint(activeTab)}
                  </div>
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
                            {(visibleColumns["name"] !== false) && (
                              <ResizableHeader id="name" label="Company Name">
                                {renderColumnConfig("name", "Company Name")}
                              </ResizableHeader>
                            )}
                            {(visibleColumns["ceo"] !== false) && (
                              <ResizableHeader id="ceo" label="CEO">
                                {renderColumnConfig("ceo", "CEO")}
                              </ResizableHeader>
                            )}
                            {(visibleColumns["industry"] !== false) && (
                              <ResizableHeader id="industry" label="Industry">
                                {renderColumnConfig("industry", "Industry")}
                              </ResizableHeader>
                            )}
                            {(visibleColumns["address"] !== false) && (
                              <ResizableHeader id="address" label="Address">
                                {renderColumnConfig("address", "Address")}
                              </ResizableHeader>
                            )}
                            {(visibleColumns["bizNum"] !== false) && (
                              <ResizableHeader id="bizNum" label="Business Number">
                                {renderColumnConfig("bizNum", "Business Number")}
                              </ResizableHeader>
                            )}
                            {(visibleColumns["majorProduct"] !== false) && (
                              <ResizableHeader id="majorProduct" label="Major Product">
                                {renderColumnConfig("majorProduct", "Major Product")}
                              </ResizableHeader>
                            )}
                          </>
                        )}
                        {activeTab === "dart" && (
                          <>
                            {(visibleColumns["name"] !== false) && (
                              <ResizableHeader id="name" label="Company Name">
                                {renderColumnConfig("name", "Company Name")}
                              </ResizableHeader>
                            )}
                            {(visibleColumns["ceo"] !== false) && (
                              <ResizableHeader id="ceo" label="CEO">
                                {renderColumnConfig("ceo", "CEO")}
                              </ResizableHeader>
                            )}
                            {(visibleColumns["industry"] !== false) && (
                              <ResizableHeader id="industry" label="Industry">
                                {renderColumnConfig("industry", "Industry")}
                              </ResizableHeader>
                            )}
                            {(visibleColumns["address"] !== false) && (
                              <ResizableHeader id="address" label="Address">
                                {renderColumnConfig("address", "Address")}
                              </ResizableHeader>
                            )}
                            {(visibleColumns["bizNum"] !== false) && (
                              <ResizableHeader id="bizNum" label="Business Number">
                                {renderColumnConfig("bizNum", "Business Number")}
                              </ResizableHeader>
                            )}
                            {(visibleColumns["stockCode"] !== false) && (
                              <ResizableHeader id="stockCode" label="Stock Code">
                                {renderColumnConfig("stockCode", "Stock Code")}
                              </ResizableHeader>
                            )}
                            {(visibleColumns["corpCls"] !== false) && (
                              <ResizableHeader id="corpCls" label="Corp Class">
                                {renderColumnConfig("corpCls", "Corp Class")}
                              </ResizableHeader>
                            )}
                          </>
                        )}
                        {activeTab === "venture" && (
                          <>
                            {(visibleColumns["name"] !== false) && (
                              <ResizableHeader id="name" label="Company Name">
                                {renderColumnConfig("name", "Company Name")}
                              </ResizableHeader>
                            )}
                            {(visibleColumns["ceo"] !== false) && (
                              <ResizableHeader id="ceo" label="CEO">
                                {renderColumnConfig("ceo", "CEO")}
                              </ResizableHeader>
                            )}
                            {(visibleColumns["industry"] !== false) && (
                              <ResizableHeader id="industry" label="Industry">
                                {renderColumnConfig("industry", "Industry")}
                              </ResizableHeader>
                            )}
                            {(visibleColumns["address"] !== false) && (
                              <ResizableHeader id="address" label="Address">
                                {renderColumnConfig("address", "Address")}
                              </ResizableHeader>
                            )}
                            {(visibleColumns["bizNum"] !== false) && (
                              <ResizableHeader id="bizNum" label="Business Number">
                                {renderColumnConfig("bizNum", "Business Number")}
                              </ResizableHeader>
                            )}
                            {(visibleColumns["mainProd"] !== false) && (
                              <ResizableHeader id="mainProd" label="Main Product">
                                {renderColumnConfig("mainProd", "Main Product")}
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
                            {Object.keys(row).filter(k => k !== 'id').map((key) => {
                               if (visibleColumns[key] === false) return null;
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
                              <p>No company data found matching your criteria.</p>
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
