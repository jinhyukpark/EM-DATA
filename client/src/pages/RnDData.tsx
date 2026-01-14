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
  Lightbulb,
  UserCog,
  Target,
  DollarSign,
  Calendar,
  Users,
  Tag,
  ExternalLink,
  Menu,
  Palette,
  Plus,
  Trash2,
  Columns,
  Check,
} from "lucide-react";
import Sidebar from "@/components/Sidebar";
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

const employmentData = [
  { id: 1, employee: "Kim Ji-Hoon", type: "Entry", company: "Samsung Electronics", businessNo: "124-81-00998", department: "Semiconductor R&D", position: "Senior Engineer", date: "2025-01-08", previousReason: "From: SK Hynix" },
  { id: 2, employee: "Park Soo-Min", type: "Entry", company: "NAVER", businessNo: "220-81-62517", department: "AI Research", position: "ML Engineer", date: "2025-01-07", previousReason: "From: Kakao" },
  { id: 3, employee: "Lee Dong-Hyun", type: "Exit", company: "Hyundai Motor", businessNo: "101-81-10080", department: "EV Development", position: "Manager", date: "2025-01-06", previousReason: "Retirement" },
  { id: 4, employee: "Choi Ye-Jin", type: "Entry", company: "LG Energy Solution", businessNo: "110-81-79294", department: "Battery Engineering", position: "Team Lead", date: "2025-01-05", previousReason: "From: POSCO" },
  { id: 5, employee: "Jung Min-Woo", type: "Exit", company: "Kakao", businessNo: "120-88-00767", department: "Platform Development", position: "Staff Engineer", date: "2025-01-05", previousReason: "Personal Reasons" },
  { id: 6, employee: "Han Seo-Yeon", type: "Entry", company: "SK Telecom", businessNo: "104-81-24032", department: "5G Infrastructure", position: "Engineer", date: "2025-01-04", previousReason: "From: KT" },
  { id: 7, employee: "Yoon Tae-Hyung", type: "Exit", company: "Coupang", businessNo: "120-88-07573", department: "Logistics Tech", position: "Principal Engineer", date: "2025-01-03", previousReason: "Starting Own Business" },
  { id: 8, employee: "Kwon Na-Ri", type: "Entry", company: "Samsung SDI", businessNo: "201-81-58979", department: "Materials Research", position: "Researcher", date: "2025-01-03", previousReason: "From: Fresh Graduate" },
  { id: 9, employee: "Shin Jae-Won", type: "Entry", company: "NAVER", businessNo: "220-81-62517", department: "Cloud Platform", position: "DevOps Lead", date: "2025-01-02", previousReason: "From: Amazon Korea" },
  { id: 10, employee: "Lim Hye-Soo", type: "Exit", company: "KB Financial", businessNo: "201-81-46893", department: "Digital Banking", position: "VP", date: "2025-01-02", previousReason: "Competitor Offer" },
];

export default function RnDData() {
  const [columnStyles, setColumnStyles] = useState<Record<string, ColumnStyle>>({});
  const [activeConfigColumn, setActiveConfigColumn] = useState<string | null>(null);

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

  const [searchField, setSearchField] = useState("all");

  const [columnWidths, setColumnWidths] = useState<Record<string, number>>({
    employee: 200,
    type: 100,
    company: 150,
    department: 150,
    position: 150,
    date: 120,
    previousReason: 200,
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

  const renderColumnConfig = (columnId: string, title: string) => {
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
        <PopoverContent className="w-80 p-0 bg-white border border-slate-200 shadow-xl z-50">
          <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50">
            <h4 className="font-semibold text-sm text-slate-800">{title} Styling</h4>
          </div>
          <Tabs defaultValue="text" className="w-full">
            <TabsList className="w-full justify-start rounded-none border-b border-slate-100 bg-transparent p-0">
              <TabsTrigger 
                value="text" 
                className="flex-1 rounded-none border-b-2 border-transparent px-4 py-2 text-xs font-medium text-slate-500 hover:text-slate-700 data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 data-[state=active]:bg-transparent shadow-none"
              >
                Text Color
              </TabsTrigger>
              <TabsTrigger 
                value="bg" 
                className="flex-1 rounded-none border-b-2 border-transparent px-4 py-2 text-xs font-medium text-slate-500 hover:text-slate-700 data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 data-[state=active]:bg-transparent shadow-none"
              >
                Background
              </TabsTrigger>
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
                       style={{ backgroundColor: color.value || '#000000' }}
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

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState<"All" | "Entry" | "Exit">("All");
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const filteredData = employmentData.filter(record => {
    const matchesSearch = record.employee.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "All" || record.type === filterType;
    return matchesSearch && matchesType;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const entryCount = employmentData.filter(r => r.type === "Entry").length;
  const exitCount = employmentData.filter(r => r.type === "Exit").length;

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
                  <h1 className="text-lg md:text-xl font-semibold tracking-tight text-slate-800 truncate">R&D Data</h1>
                  <p className="text-xs md:text-sm text-slate-500 mt-0.5 hidden sm:block">Employment entry and exit tracking</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="gap-2 border-slate-200 hover:bg-slate-50 text-slate-700">
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
                    <p className="text-xl font-bold text-slate-800">{employmentData.length}</p>
                  </div>
                </div>
                <div className="w-px h-10 bg-slate-200" />
                <div className="flex items-center gap-3">
                  <UserCog className="w-5 h-5 text-emerald-500" />
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wide">Entries</p>
                    <p className="text-xl font-bold text-emerald-600">{entryCount}</p>
                  </div>
                </div>
                <div className="w-px h-10 bg-slate-200" />
                <div className="flex items-center gap-3">
                  <UserCog className="w-5 h-5 text-red-500" />
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
                    <p className="text-xl font-bold text-purple-600">+4</p>
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

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="flex items-center justify-between gap-3 p-4 border-b border-slate-100">
                <div>
                   <h2 className="text-lg font-semibold text-slate-800">R&D Basic</h2>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center h-9 border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500">
                    <select 
                      value={searchField} 
                      onChange={(e) => setSearchField(e.target.value)}
                      className="h-full pl-3 pr-8 text-xs bg-slate-50 border-r border-slate-200 text-slate-600 focus:outline-none cursor-pointer hover:bg-slate-100 transition-colors w-32 rounded-none appearance-none"
                      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748b' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.5rem center', backgroundSize: '1rem' }}
                    >
                      <option value="all">All Fields</option>
                      <option value="employee">Employee</option>
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
                        data-testid="search-rnd" 
                      />
                    </div>
                  </div>
                  <Button variant="outline" className="gap-2 h-9">
                    <Columns className="w-4 h-4" />
                    Fields
                  </Button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full" data-testid="rnd-table">
                  <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-100">
                      <ResizableHeader id="employee" label="Employee">
                        {renderColumnConfig('employee', 'Employee')}
                      </ResizableHeader>
                      <ResizableHeader id="type" label="Type" align="center">
                        {renderColumnConfig('type', 'Type')}
                      </ResizableHeader>
                      <ResizableHeader id="company" label="Company">
                        {renderColumnConfig('company', 'Company')}
                      </ResizableHeader>
                      <ResizableHeader id="department" label="Department">
                        {renderColumnConfig('department', 'Department')}
                      </ResizableHeader>
                      <ResizableHeader id="position" label="Position">
                        {renderColumnConfig('position', 'Position')}
                      </ResizableHeader>
                      <ResizableHeader id="date" label="Date">
                        {renderColumnConfig('date', 'Date')}
                      </ResizableHeader>
                      <ResizableHeader id="previousReason" label="Previous/Reason">
                        {renderColumnConfig('previousReason', 'Previous/Reason')}
                      </ResizableHeader>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.map((record) => {
                      const getStyle = (col: string, val: any) => getCellStyle(col, val) as any;
                      return (
                      <tr key={record.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors" data-testid={`rnd-row-${record.id}`}>
                        <td className="py-3 px-6 border-r border-slate-200 last:border-r-0" style={{ backgroundColor: getStyle('employee', record.employee).backgroundColor }}>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                              <UserCog className="w-4 h-4 text-slate-600" />
                            </div>
                            <span 
                              className="font-medium text-slate-800" 
                              style={{ 
                                color: getStyle('employee', record.employee).color,
                                backgroundColor: getStyle('employee', record.employee).isTextOnly ? getStyle('employee', record.employee).rawBgColor : undefined, 
                                padding: getStyle('employee', record.employee).isTextOnly ? '2px 8px' : undefined, 
                                borderRadius: getStyle('employee', record.employee).isTextOnly ? '4px' : undefined, 
                                display: getStyle('employee', record.employee).isTextOnly ? 'inline-block' : undefined 
                              }}
                            >
                              {record.employee}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4 border-r border-slate-200 last:border-r-0" style={{ backgroundColor: getStyle('type', record.type).backgroundColor }}>
                          <span 
                            className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                              record.type === "Entry" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                            }`} 
                            style={{ 
                              color: getStyle('type', record.type).color, 
                              backgroundColor: getStyle('type', record.type).backgroundColor || (getStyle('type', record.type).isTextOnly ? getStyle('type', record.type).rawBgColor : undefined),
                              // If user sets a style, override default colors
                              ...(getStyle('type', record.type).color ? { color: getStyle('type', record.type).color } : {}),
                              ...(getStyle('type', record.type).backgroundColor ? { backgroundColor: getStyle('type', record.type).backgroundColor } : {})
                            }}
                          >
                            {record.type}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-slate-600 border-r border-slate-200 last:border-r-0" style={{ backgroundColor: getStyle('company', record.company).backgroundColor }}>
                          <span style={{ 
                              color: getStyle('company', record.company).color,
                              backgroundColor: getStyle('company', record.company).isTextOnly ? getStyle('company', record.company).rawBgColor : undefined, 
                              padding: getStyle('company', record.company).isTextOnly ? '2px 8px' : undefined, 
                              borderRadius: getStyle('company', record.company).isTextOnly ? '4px' : undefined, 
                              display: getStyle('company', record.company).isTextOnly ? 'inline-block' : undefined 
                          }}>
                            {record.company}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-slate-600 border-r border-slate-200 last:border-r-0" style={{ backgroundColor: getStyle('department', record.department).backgroundColor }}>
                          <span style={{ 
                              color: getStyle('department', record.department).color,
                              backgroundColor: getStyle('department', record.department).isTextOnly ? getStyle('department', record.department).rawBgColor : undefined, 
                              padding: getStyle('department', record.department).isTextOnly ? '2px 8px' : undefined, 
                              borderRadius: getStyle('department', record.department).isTextOnly ? '4px' : undefined, 
                              display: getStyle('department', record.department).isTextOnly ? 'inline-block' : undefined 
                          }}>
                            {record.department}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-slate-600 border-r border-slate-200 last:border-r-0" style={{ backgroundColor: getStyle('position', record.position).backgroundColor }}>
                          <span style={{ 
                              color: getStyle('position', record.position).color,
                              backgroundColor: getStyle('position', record.position).isTextOnly ? getStyle('position', record.position).rawBgColor : undefined, 
                              padding: getStyle('position', record.position).isTextOnly ? '2px 8px' : undefined, 
                              borderRadius: getStyle('position', record.position).isTextOnly ? '4px' : undefined, 
                              display: getStyle('position', record.position).isTextOnly ? 'inline-block' : undefined 
                          }}>
                            {record.position}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-slate-600 border-r border-slate-200 last:border-r-0" style={{ backgroundColor: getStyle('date', record.date).backgroundColor }}>
                          <span style={{ 
                              color: getStyle('date', record.date).color,
                              backgroundColor: getStyle('date', record.date).isTextOnly ? getStyle('date', record.date).rawBgColor : undefined, 
                              padding: getStyle('date', record.date).isTextOnly ? '2px 8px' : undefined, 
                              borderRadius: getStyle('date', record.date).isTextOnly ? '4px' : undefined, 
                              display: getStyle('date', record.date).isTextOnly ? 'inline-block' : undefined 
                          }}>
                            {record.date}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-slate-500 border-r border-slate-200 last:border-r-0" style={{ backgroundColor: getStyle('previousReason', record.previousReason).backgroundColor }}>
                          <span style={{ 
                              color: getStyle('previousReason', record.previousReason).color,
                              backgroundColor: getStyle('previousReason', record.previousReason).isTextOnly ? getStyle('previousReason', record.previousReason).rawBgColor : undefined, 
                              padding: getStyle('previousReason', record.previousReason).isTextOnly ? '2px 8px' : undefined, 
                              borderRadius: getStyle('previousReason', record.previousReason).isTextOnly ? '4px' : undefined, 
                              display: getStyle('previousReason', record.previousReason).isTextOnly ? 'inline-block' : undefined 
                          }}>
                            {record.previousReason}
                          </span>
                        </td>
                      </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50/50">
                <div className="flex items-center gap-4">
                  <p className="text-sm text-slate-500">
                    Showing {filteredData.length > 0 ? ((currentPage - 1) * itemsPerPage) + 1 : 0} to {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} records
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-500">Show</span>
                    <select
                      value={itemsPerPage}
                      onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                      className="border border-slate-200 rounded-md px-2 py-1 text-sm text-slate-700 bg-white cursor-pointer"
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
                  <Button variant="outline" size="sm" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} className="border-slate-200 text-slate-600">
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm transition-colors ${
                        currentPage === page
                          ? "bg-slate-900 text-white"
                          : "text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <Button variant="outline" size="sm" disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)} className="border-slate-200 text-slate-600">
                    <ChevronRight className="w-4 h-4" />
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