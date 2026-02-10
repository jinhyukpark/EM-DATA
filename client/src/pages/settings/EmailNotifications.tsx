import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  AlertCircle,
  Eye,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Categories Definition
const categories = [
  { value: "internal", label: "Internal Data", type: "group" },
  { value: "server", label: "Server Management", type: "group" },
];

const subCategories = {
  internal: [
    { value: "company_data", label: "Company Data" },
    { value: "patent_data", label: "Patent Data" },
    { value: "paper_data", label: "Paper Data" },
    { value: "disclosure_data", label: "Disclosure Data" },
    { value: "stock_data", label: "Stock Data" },
    { value: "news_data", label: "News Data" },
    { value: "finance_data", label: "Finance Data" },
    { value: "employment_data", label: "Employment Data" },
  ],
  server: [
    { value: "aws", label: "AWS" },
    { value: "gcp", label: "GCP" },
    { value: "idc", label: "IDC" },
  ],
};

const metrics = {
  internal: [
    { value: "today", label: "Today" },
    { value: "yesterday", label: "Yesterday" },
  ],
  server: [
    { value: "total", label: "Total" },
    { value: "running", label: "Running" },
    { value: "warning", label: "Warning" },
    { value: "stopped", label: "Stopped" },
  ],
};

const operators = [
  { value: "gt", label: "Greater than (>)" },
  { value: "lt", label: "Less than (<)" },
  { value: "eq", label: "Equals (=)" },
  { value: "neq", label: "Not Equals (!=)" },
  { value: "gte", label: "Greater/Equal (>=)" },
  { value: "lte", label: "Less/Equal (<=)" },
];

// Mock Users
const users = [
  { id: 1, name: "John Kim", email: "john.kim@company.com" },
  { id: 2, name: "Sarah Lee", email: "sarah.lee@company.com" },
  { id: 3, name: "Mike Park", email: "mike.park@company.com" },
  { id: 4, name: "Emily Choi", email: "emily.choi@company.com" },
];

type Condition = {
  id: string;
  categoryGroup: "internal" | "server";
  subCategory: string; // The specific page/service
  metric: string; // today/yesterday OR total/running/etc
  operator: string;
  value: string;
  logic: "AND" | "OR";
};

type NotificationConfig = {
  id: string;
  name: string;
  isActive: boolean;
  conditions: Condition[];
  recipients: number[]; // User IDs
  schedule: {
    isRealtime: boolean;
    startTime: string; // "09:00"
    endTime: string;   // "10:00"
  };
};

const initialNotifications: NotificationConfig[] = [
  {
    id: "1",
    name: "Server Warning Alert",
    isActive: true,
    conditions: [
      { 
        id: "c1", 
        categoryGroup: "server", 
        subCategory: "aws", 
        metric: "warning", 
        operator: "gt", 
        value: "0", 
        logic: "AND" 
      },
    ],
    recipients: [1, 3],
    schedule: { isRealtime: true, startTime: "09:00", endTime: "18:00" }
  },
  {
    id: "2",
    name: "Daily Stock Data Check",
    isActive: true,
    conditions: [
      { 
        id: "c2", 
        categoryGroup: "internal", 
        subCategory: "stock_data", 
        metric: "today", 
        operator: "eq", 
        value: "0", 
        logic: "AND" 
      },
    ],
    recipients: [1, 2],
    schedule: { isRealtime: false, startTime: "17:00", endTime: "18:00" }
  },
];

export default function EmailNotifications() {
  const [notifications, setNotifications] = useState<NotificationConfig[]>(initialNotifications);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [formName, setFormName] = useState("");
  const [formConditions, setFormConditions] = useState<Condition[]>([]);
  const [formRecipients, setFormRecipients] = useState<number[]>([]);
  const [formSchedule, setFormSchedule] = useState({ isRealtime: false, startTime: "09:00", endTime: "18:00" });

  // Preview State
  const [previewText, setPreviewText] = useState("");

  useEffect(() => {
    updatePreview();
  }, [formConditions, formName, formSchedule]);

  const updatePreview = () => {
    if (formConditions.length === 0) {
      setPreviewText("Please add at least one condition.");
      return;
    }

    const conditionsText = formConditions.map((cond, index) => {
      const subCatLabel = subCategories[cond.categoryGroup].find(s => s.value === cond.subCategory)?.label || cond.subCategory;
      const metricLabel = metrics[cond.categoryGroup].find(m => m.value === cond.metric)?.label || cond.metric;
      const op = operators.find(o => o.value === cond.operator)?.label.split('(')[0].trim() || cond.operator;
      const logic = index > 0 ? ` ${cond.logic} ` : "";
      return `${logic}[${subCatLabel} > ${metricLabel}] is ${op} "${cond.value}"`;
    }).join("");

    const scheduleText = formSchedule.isRealtime 
      ? "immediately whenever conditions are met" 
      : `daily between ${formSchedule.startTime} and ${formSchedule.endTime}`;

    setPreviewText(`Send alert ${scheduleText} if ${conditionsText}.`);
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormName("");
    setFormConditions([
      { 
        id: Math.random().toString(36).substr(2, 9), 
        categoryGroup: "internal", 
        subCategory: "company_data", 
        metric: "today", 
        operator: "gt", 
        value: "", 
        logic: "AND" 
      }
    ]);
    setFormRecipients([]);
    setFormSchedule({ isRealtime: false, startTime: "09:00", endTime: "18:00" });
    setShowModal(true);
  };

  const openEditModal = (notification: NotificationConfig) => {
    setEditingId(notification.id);
    setFormName(notification.name);
    setFormConditions([...notification.conditions]);
    setFormRecipients([...notification.recipients]);
    setFormSchedule({ ...notification.schedule });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!formName || formConditions.length === 0) return;

    if (editingId) {
      setNotifications(prev => prev.map(n => n.id === editingId ? {
        ...n,
        name: formName,
        conditions: formConditions,
        recipients: formRecipients,
        schedule: formSchedule
      } : n));
    } else {
      const newNotification: NotificationConfig = {
        id: Math.random().toString(36).substr(2, 9),
        name: formName,
        isActive: true,
        conditions: formConditions,
        recipients: formRecipients,
        schedule: formSchedule
      };
      setNotifications([...notifications, newNotification]);
    }
    setShowModal(false);
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const toggleNotification = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isActive: !n.isActive } : n));
  };

  const addCondition = () => {
    setFormConditions([
      ...formConditions,
      { 
        id: Math.random().toString(36).substr(2, 9), 
        categoryGroup: "internal", 
        subCategory: "company_data", 
        metric: "today", 
        operator: "gt", 
        value: "", 
        logic: "AND" 
      }
    ]);
  };

  const removeCondition = (id: string) => {
    if (formConditions.length > 1) {
      setFormConditions(formConditions.filter(c => c.id !== id));
    }
  };

  const updateCondition = (id: string, field: keyof Condition, value: any) => {
    setFormConditions(prev => prev.map(c => {
      if (c.id !== id) return c;
      
      const updated = { ...c, [field]: value };
      
      // Reset dependent fields when category group changes
      if (field === "categoryGroup") {
        updated.subCategory = subCategories[value as "internal" | "server"][0].value;
        updated.metric = metrics[value as "internal" | "server"][0].value;
        updated.value = "";
      }
      
      return updated;
    }));
  };

  const toggleRecipient = (userId: number) => {
    setFormRecipients(prev => 
      prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-800">Email Notifications</h3>
          <p className="text-sm text-slate-500 mt-1">Manage custom alert conditions and recipients</p>
        </div>
        <Button onClick={openAddModal} className="gap-2 bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4" />
          Add Notification
        </Button>
      </div>

      <div className="grid gap-4">
        {notifications.map(notification => (
          <div key={notification.id} className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-sm transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="font-medium text-slate-900 text-lg">{notification.name}</h4>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${notification.isActive ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-500"}`}>
                    {notification.isActive ? "Active" : "Inactive"}
                  </span>
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-50 border border-slate-100 text-xs text-slate-600">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {notification.schedule.isRealtime 
                      ? "Real-time" 
                      : `${notification.schedule.startTime} - ${notification.schedule.endTime}`}
                  </div>
                </div>
                <div className="flex flex-col gap-2 text-sm text-slate-600 mb-3 bg-slate-50 p-3 rounded-lg border border-slate-100">
                  {notification.conditions.map((cond, idx) => {
                    const subCatLabel = subCategories[cond.categoryGroup].find(s => s.value === cond.subCategory)?.label;
                    const metricLabel = metrics[cond.categoryGroup].find(m => m.value === cond.metric)?.label;
                    const op = operators.find(o => o.value === cond.operator)?.label.split('(')[0].trim();
                    
                    return (
                      <div key={cond.id} className="flex flex-col">
                        {idx > 0 && (
                          <div className="flex items-center gap-2 py-1.5">
                            <div className="h-px bg-slate-200 flex-1" />
                            <span className="text-xs font-bold text-slate-400 uppercase bg-white px-2 py-0.5 rounded-full border border-slate-200">
                              {cond.logic}
                            </span>
                            <div className="h-px bg-slate-200 flex-1" />
                          </div>
                        )}
                        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-md border border-slate-200 shadow-sm">
                          <span className="font-semibold text-slate-700">
                            [{subCatLabel} &gt; {metricLabel}]
                          </span>
                          <span className="text-slate-500 text-xs uppercase font-medium">{op}</span>
                          <span className="font-mono text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded text-xs">
                            {cond.value}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-medium uppercase tracking-wide">Recipients:</span>
                  <div className="flex -space-x-2">
                    {notification.recipients.map(userId => {
                      const user = users.find(u => u.id === userId);
                      return user ? (
                        <div key={userId} className="w-6 h-6 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-xs font-bold text-blue-600" title={user.name}>
                          {user.name.charAt(0)}
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Switch 
                  checked={notification.isActive}
                  onCheckedChange={() => toggleNotification(notification.id)}
                  className="data-[state=checked]:bg-emerald-500"
                />
                <div className="h-6 w-px bg-slate-200 mx-2" />
                <Button variant="ghost" size="icon" onClick={() => openEditModal(notification)}>
                  <Edit2 className="w-4 h-4 text-slate-500" />
                </Button>
                <Button variant="ghost" size="icon" className="hover:text-red-600 hover:bg-red-50" onClick={() => deleteNotification(notification.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
        
        {notifications.length === 0 && (
            <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                <Bell className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <h3 className="text-sm font-medium text-slate-900">No notifications configured</h3>
                <p className="text-xs text-slate-500 mt-1">Create your first alert condition to get started</p>
            </div>
        )}
      </div>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-4xl bg-white text-slate-900">
          <DialogHeader>
            <DialogTitle className="text-xl">{editingId ? "Edit Notification" : "New Notification"}</DialogTitle>
            <DialogDescription>
              Configure the conditions that trigger this email alert.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Name Input */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-1.5">Notification Name</label>
              <Input 
                value={formName} 
                onChange={(e) => setFormName(e.target.value)} 
                placeholder="e.g., Daily Data Check"
                className="font-medium border-slate-300 focus:border-blue-500"
              />
            </div>

            {/* Conditions Builder */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">Conditions</label>
              <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                {formConditions.map((condition, index) => (
                  <div key={condition.id} className="flex items-start gap-2 animate-in slide-in-from-left-2 duration-200">
                    {index > 0 && (
                      <div className="w-20 pt-1">
                         <Select 
                            value={condition.logic} 
                            onValueChange={(val: "AND" | "OR") => updateCondition(condition.id, "logic", val)}
                         >
                            <SelectTrigger className="h-9 bg-white border-slate-300 text-xs font-bold text-slate-700">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="AND">AND</SelectItem>
                                <SelectItem value="OR">OR</SelectItem>
                            </SelectContent>
                         </Select>
                      </div>
                    )}
                    <div className="flex-1 grid grid-cols-12 gap-2">
                        {/* 1. Sub Category Selection (Page) */}
                        <div className="col-span-3">
                            <Select 
                                value={condition.subCategory} 
                                onValueChange={(val) => {
                                  // Find which group this value belongs to
                                  const group = subCategories.internal.some(s => s.value === val) ? "internal" : "server";
                                  updateCondition(condition.id, "categoryGroup", group);
                                  updateCondition(condition.id, "subCategory", val);
                                }}
                            >
                                <SelectTrigger className="h-9 bg-white border-slate-300 text-sm text-slate-700 font-medium">
                                    <SelectValue placeholder="Page" />
                                </SelectTrigger>
                                <SelectContent>
                                    <div className="mb-1 px-2 text-xs font-semibold text-slate-500">Internal Data</div>
                                    {subCategories.internal.map(s => (
                                        <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                                    ))}
                                    <div className="mt-2 mb-1 px-2 text-xs font-semibold text-slate-500">Server Management</div>
                                    {subCategories.server.map(s => (
                                        <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* 2. Metric Selection (Today/Total/etc) */}
                        <div className="col-span-3">
                            <Select 
                                value={condition.metric} 
                                onValueChange={(val) => updateCondition(condition.id, "metric", val)}
                            >
                                <SelectTrigger className="h-9 bg-white border-slate-300 text-sm text-slate-700">
                                    <SelectValue placeholder="Metric" />
                                </SelectTrigger>
                                <SelectContent>
                                    {metrics[condition.categoryGroup].map(m => (
                                        <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* 3. Operator */}
                        <div className="col-span-3">
                            <Select 
                                value={condition.operator} 
                                onValueChange={(val) => updateCondition(condition.id, "operator", val)}
                            >
                                <SelectTrigger className="h-9 bg-white border-slate-300 text-sm text-slate-700">
                                    <SelectValue placeholder="Operator" />
                                </SelectTrigger>
                                <SelectContent>
                                    {operators.map(op => (
                                        <SelectItem key={op.value} value={op.value}>{op.label}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* 4. Value */}
                        <div className="col-span-3 relative">
                            <Input 
                                value={condition.value}
                                onChange={(e) => updateCondition(condition.id, "value", e.target.value)}
                                placeholder="Value"
                                className="h-9 bg-white border-slate-300 text-sm text-slate-900 placeholder:text-slate-400"
                            />
                        </div>
                    </div>
                    {formConditions.length > 1 && (
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-9 w-9 text-slate-400 hover:text-red-600 hover:bg-red-50 flex-shrink-0"
                            onClick={() => removeCondition(condition.id)}
                        >
                            <X className="w-5 h-5" />
                        </Button>
                    )}
                  </div>
                ))}
                
                <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={addCondition} 
                    className="mt-2 text-sm gap-2 border-slate-300 text-slate-700 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 w-full justify-center bg-white shadow-sm"
                >
                    <Plus className="w-4 h-4" /> Add Another Condition
                </Button>
              </div>
            </div>

            {/* Reference Time Setting */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">Check Schedule</label>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Switch 
                    checked={formSchedule.isRealtime}
                    onCheckedChange={(checked) => setFormSchedule({ ...formSchedule, isRealtime: checked })}
                    className="data-[state=checked]:bg-blue-600"
                  />
                  <span className="text-sm font-medium text-slate-700">Real-time / Always On</span>
                </div>
                
                {!formSchedule.isRealtime && (
                  <div className="flex items-center gap-3 animate-in fade-in slide-in-from-left-2">
                    <span className="text-sm text-slate-600 font-medium">Check between:</span>
                    <div className="flex items-center gap-2">
                        <Input 
                          type="time" 
                          value={formSchedule.startTime}
                          onChange={(e) => setFormSchedule({ ...formSchedule, startTime: e.target.value })}
                          className="w-32 h-9 bg-white border-slate-300 text-slate-900"
                        />
                        <span className="text-slate-400">-</span>
                        <Input 
                          type="time" 
                          value={formSchedule.endTime}
                          onChange={(e) => setFormSchedule({ ...formSchedule, endTime: e.target.value })}
                          className="w-32 h-9 bg-white border-slate-300 text-slate-900"
                        />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Preview Section */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3 shadow-sm">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                    <h5 className="text-xs font-bold text-blue-700 uppercase tracking-wide mb-1">Preview Logic</h5>
                    <p className="text-sm text-slate-900 font-medium leading-relaxed">"{previewText}"</p>
                </div>
            </div>

            {/* Recipients */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">Recipients</label>
              <div className="flex flex-wrap gap-2">
                {users.map(user => (
                    <button
                        key={user.id}
                        onClick={() => toggleRecipient(user.id)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-medium transition-all ${
                            formRecipients.includes(user.id) 
                                ? "bg-slate-800 border-slate-800 text-white shadow-md ring-2 ring-slate-200" 
                                : "bg-white border-slate-300 text-slate-600 hover:border-slate-400 hover:bg-slate-50"
                        }`}
                    >
                        {formRecipients.includes(user.id) && <Check className="w-3.5 h-3.5" />}
                        {user.name}
                    </button>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">Save Notification</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
