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
  UserCog,
  UserPlus,
  UserMinus,
  Users,
  Briefcase,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Menu,
  Palette,
  Plus,
  Trash2,
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

const employmentRecords = [
  { id: 1, employeeName: "Kim Ji-Hoon", company: "Samsung Electronics", department: "Semiconductor R&D", position: "Senior Engineer", type: "Entry", date: "2025-01-08", previousCompany: "SK Hynix", reason: "Career Development" },
  { id: 2, employeeName: "Park Soo-Min", company: "NAVER", department: "AI Research", position: "ML Engineer", type: "Entry", date: "2025-01-07", previousCompany: "Kakao", reason: "Better Opportunity" },
  { id: 3, employeeName: "Lee Dong-Hyun", company: "Hyundai Motor", department: "EV Development", position: "Manager", type: "Exit", date: "2025-01-06", previousCompany: null, reason: "Retirement" },
  { id: 4, employeeName: "Choi Ye-Jin", company: "LG Energy Solution", department: "Battery Engineering", position: "Team Lead", type: "Entry", date: "2025-01-05", previousCompany: "POSCO", reason: "Career Change" },
  { id: 5, employeeName: "Jung Min-Woo", company: "Kakao", department: "Platform Development", position: "Staff Engineer", type: "Exit", date: "2025-01-05", previousCompany: null, reason: "Personal Reasons" },
  { id: 6, employeeName: "Han Seo-Yeon", company: "SK Telecom", department: "5G Infrastructure", position: "Engineer", type: "Entry", date: "2025-01-04", previousCompany: "KT", reason: "Better Benefits" },
  { id: 7, employeeName: "Yoon Tae-Hyung", company: "Coupang", department: "Logistics Tech", position: "Principal Engineer", type: "Exit", date: "2025-01-03", previousCompany: null, reason: "Starting Own Business" },
  { id: 8, employeeName: "Kwon Na-Ri", company: "Samsung SDI", department: "Materials Research", position: "Researcher", type: "Entry", date: "2025-01-03", previousCompany: "Fresh Graduate", reason: "New Hire" },
  { id: 9, employeeName: "Shin Jae-Won", company: "NAVER", department: "Cloud Platform", position: "DevOps Lead", type: "Entry", date: "2025-01-02", previousCompany: "Amazon Korea", reason: "Career Development" },
  { id: 10, employeeName: "Lim Hye-Soo", company: "KB Financial", department: "Digital Banking", position: "VP", type: "Exit", date: "2025-01-02", previousCompany: null, reason: "Competitor Offer" },
];

export default function EmploymentData() {
  const [columnStyles, setColumnStyles] = useState<Record<string, ColumnStyle>>({});
  
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
      // Custom properties for cell rendering if needed, though we use them directly
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

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState<"all" | "entry" | "exit">("all");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchField, setSearchField] = useState("all");

  const filteredRecords = employmentRecords.filter(record => {
    const matchesSearch = record.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "all" || 
      (activeTab === "entry" && record.type === "Entry") ||
      (activeTab === "exit" && record.type === "Exit");
    return matchesSearch && matchesTab;
  });

  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);
  const paginatedRecords = filteredRecords.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const entryCount = employmentRecords.filter(r => r.type === "Entry").length;
  const exitCount = employmentRecords.filter(r => r.type === "Exit").length;

  const [columnWidths, setColumnWidths] = useState<Record<string, number>>({
    employeeName: 200,
    type: 100,
    company: 150,
    department: 150,
    position: 150,
    date: 120,
    reason: 200,
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

        <main className="flex-1 p-4 md:p-6 bg-slate-50/50 overflow-x-hidden">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05, duration: 0.3 }} className="mb-6">
              <div className="flex items-center gap-8 py-4 px-6 bg-white rounded-xl border border-slate-100">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wide">Total</p>
                    <p className="text-xl font-bold text-slate-800">{employmentRecords.length}</p>
                  </div>
                </div>
                <div className="w-px h-10 bg-slate-200" />
                <div className="flex items-center gap-3">
                  <UserPlus className="w-5 h-5 text-emerald-500" />
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wide">Entries</p>
                    <p className="text-xl font-bold text-emerald-600">{entryCount}</p>
                  </div>
                </div>
                <div className="w-px h-10 bg-slate-200" />
                <div className="flex items-center gap-3">
                  <UserMinus className="w-5 h-5 text-red-500" />
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
                    <p className="text-xl font-bold text-purple-600">+5</p>
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

            <div className="flex items-center justify-between gap-3 mb-6">
              <div className="flex-1" />
              <div className="flex items-center gap-3">
                <div className="flex items-center h-9 border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500">
                  <select 
                    value={searchField} 
                    onChange={(e) => setSearchField(e.target.value)}
                    className="h-full pl-3 pr-8 text-xs bg-slate-50 border-r border-slate-200 text-slate-600 focus:outline-none cursor-pointer hover:bg-slate-100 transition-colors w-32 rounded-none appearance-none"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748b' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.5rem center', backgroundSize: '1rem' }}
                  >
                    <option value="all">All Fields</option>
                    <option value="employeeName">Employee</option>
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
                      data-testid="search-employment" 
                    />
                  </div>
                </div>
                <Button variant="outline" className="gap-2 h-9">
                  <Filter className="w-4 h-4" />
                  Filters
                </Button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full" data-testid="employment-table">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                    <ResizableHeader id="employeeName" label="Employee">
                      {renderColumnConfig('employeeName', 'Employee')}
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
                    <ResizableHeader id="reason" label="Previous/Reason">
                      {renderColumnConfig('reason', 'Previous/Reason')}
                    </ResizableHeader>
                  </tr>
                </thead>
                <tbody>
                  {paginatedRecords.map((record) => {
                    // Pre-calculate cell styles
                    const styles = {
                      employeeName: getCellStyle('employeeName', record.employeeName),
                      type: getCellStyle('type', record.type),
                      company: getCellStyle('company', record.company),
                      department: getCellStyle('department', record.department),
                      position: getCellStyle('position', record.position),
                      date: getCellStyle('date', record.date),
                      reason: getCellStyle('reason', record.type === "Entry" ? record.previousCompany : record.reason),
                    };

                    return (
                      <tr key={record.id} className="border-b border-slate-100 hover:bg-slate-50 cursor-pointer" data-testid={`employment-row-${record.id}`}>
                        <td className="py-4 px-4 border-r border-slate-200 last:border-r-0" style={{ backgroundColor: styles.employeeName.backgroundColor }}>
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${record.type === "Entry" ? "bg-emerald-50" : "bg-red-50"}`}>
                              {record.type === "Entry" ? (
                                <UserPlus className="w-4 h-4 text-emerald-600" />
                              ) : (
                                <UserMinus className="w-4 h-4 text-red-600" />
                              )}
                            </div>
                            <span className="font-medium text-slate-800" style={{ color: styles.employeeName.color }}>
                              {styles.employeeName.isTextOnly && styles.employeeName.rawBgColor && (
                                <span className="px-1 rounded" style={{ backgroundColor: styles.employeeName.rawBgColor }}>{record.employeeName}</span>
                              ) || record.employeeName}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-center border-r border-slate-200 last:border-r-0" style={{ backgroundColor: styles.type.backgroundColor }}>
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                            record.type === "Entry" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                          }`} style={{ 
                            color: styles.type.color, 
                            backgroundColor: styles.type.isTextOnly ? undefined : (styles.type.backgroundColor || (record.type === "Entry" ? "#ecfdf5" : "#fef2f2")) 
                          }}>
                            {record.type}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-sm text-slate-600 border-r border-slate-200 last:border-r-0" style={{ backgroundColor: styles.company.backgroundColor }}>
                           <span style={{ color: styles.company.color }}>
                            {styles.company.isTextOnly && styles.company.rawBgColor ? (
                              <span className="px-1 rounded" style={{ backgroundColor: styles.company.rawBgColor }}>{record.company}</span>
                            ) : record.company}
                           </span>
                        </td>
                        <td className="py-4 px-4 text-sm text-slate-600 border-r border-slate-200 last:border-r-0" style={{ backgroundColor: styles.department.backgroundColor }}>
                           <span style={{ color: styles.department.color }}>
                            {styles.department.isTextOnly && styles.department.rawBgColor ? (
                              <span className="px-1 rounded" style={{ backgroundColor: styles.department.rawBgColor }}>{record.department}</span>
                            ) : record.department}
                           </span>
                        </td>
                        <td className="py-4 px-4 text-sm text-slate-600 border-r border-slate-200 last:border-r-0" style={{ backgroundColor: styles.position.backgroundColor }}>
                           <span style={{ color: styles.position.color }}>
                            {styles.position.isTextOnly && styles.position.rawBgColor ? (
                              <span className="px-1 rounded" style={{ backgroundColor: styles.position.rawBgColor }}>{record.position}</span>
                            ) : record.position}
                           </span>
                        </td>
                        <td className="py-4 px-4 text-sm text-slate-600 border-r border-slate-200 last:border-r-0" style={{ backgroundColor: styles.date.backgroundColor }}>
                           <span style={{ color: styles.date.color }}>
                            {styles.date.isTextOnly && styles.date.rawBgColor ? (
                              <span className="px-1 rounded" style={{ backgroundColor: styles.date.rawBgColor }}>{record.date}</span>
                            ) : record.date}
                           </span>
                        </td>
                        <td className="py-4 px-4 text-sm text-slate-500 border-r border-slate-200 last:border-r-0" style={{ backgroundColor: styles.reason.backgroundColor }}>
                          <span style={{ color: styles.reason.color }}>
                             {record.type === "Entry" ? (
                              <span className="flex items-center gap-1">
                                <span className="text-slate-400">From:</span> 
                                {styles.reason.isTextOnly && styles.reason.rawBgColor ? (
                                  <span className="px-1 rounded" style={{ backgroundColor: styles.reason.rawBgColor }}>{record.previousCompany}</span>
                                ) : record.previousCompany}
                              </span>
                            ) : (
                              styles.reason.isTextOnly && styles.reason.rawBgColor ? (
                                <span className="px-1 rounded" style={{ backgroundColor: styles.reason.rawBgColor }}>{record.reason}</span>
                              ) : record.reason
                            )}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-4">
                <p className="text-sm text-slate-500">
                  Showing {filteredRecords.length > 0 ? ((currentPage - 1) * itemsPerPage) + 1 : 0} to {Math.min(currentPage * itemsPerPage, filteredRecords.length)} of {filteredRecords.length} records
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-500">Rows per page:</span>
                  <select 
                    value={itemsPerPage} 
                    onChange={(e) => setItemsPerPage(Number(e.target.value))}
                    className="text-sm border-none bg-transparent font-medium text-slate-700 focus:ring-0 cursor-pointer"
                  >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="text-sm font-medium text-slate-700">
                  Page {currentPage} of {Math.max(1, totalPages)}
                </span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}