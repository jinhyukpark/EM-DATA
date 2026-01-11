import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  Plus,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  MoreHorizontal,
  Edit2,
  Trash2,
  UserCheck,
  FileCheck,
  X,
  List,
  MessageSquare,
  CheckSquare,
  StickyNote,
  Menu,
  Server,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Sidebar from "@/components/Sidebar";


const services = [
  { id: 1, testName: "Data Integrity Check", name: "Company Data Pipeline", type: "Internal", status: "Active", workStatus: "Normal", step: 5, lastInspection: "2025-01-09", inspectors: ["John Kim", "Sarah Lee"], nextInspection: "2025-01-16", normalCount: 12, abnormalCount: 0 },
  { id: 2, testName: "API Response Validation", name: "Patent Crawler Service", type: "Internal", status: "Active", workStatus: "Normal", step: 3, lastInspection: "2025-01-08", inspectors: ["Sarah Lee"], nextInspection: "2025-01-15", normalCount: 8, abnormalCount: 1 },
  { id: 3, testName: "Performance Benchmark", name: "News API Integration", type: "External", status: "Warning", workStatus: "Delayed", step: 8, lastInspection: "2025-01-05", inspectors: ["Mike Park", "Emily Choi", "David Jung"], nextInspection: "2025-01-12", normalCount: 5, abnormalCount: 3 },
  { id: 4, testName: "Security Audit", name: "Stock Data Collector", type: "External", status: "Active", workStatus: "Normal", step: 4, lastInspection: "2025-01-09", inspectors: ["Emily Choi"], nextInspection: "2025-01-16", normalCount: 10, abnormalCount: 0 },
  { id: 5, testName: "Data Accuracy Test", name: "ML Prediction Service", type: "Internal", status: "Inactive", workStatus: "Stopped", step: 6, lastInspection: "2024-12-20", inspectors: ["David Jung", "John Kim"], nextInspection: "2025-01-20", normalCount: 3, abnormalCount: 2 },
];

const testProcedures = [
  { id: 1, name: "Data Integrity Check", service: "Company Data Pipeline", steps: 5, status: "Completed", completedBy: "John Kim", completedAt: "2025-01-09 14:32" },
  { id: 2, name: "API Response Validation", service: "News API Integration", steps: 3, status: "In Progress", completedBy: null, completedAt: null },
  { id: 3, name: "Performance Benchmark", service: "Patent Crawler Service", steps: 8, status: "Pending", completedBy: null, completedAt: null },
  { id: 4, name: "Security Audit", service: "Stock Data Collector", steps: 12, status: "Completed", completedBy: "Sarah Lee", completedAt: "2025-01-08 16:45" },
  { id: 5, name: "Data Accuracy Test", service: "ML Prediction Service", steps: 6, status: "Failed", completedBy: "Mike Park", completedAt: "2025-01-07 11:20" },
];

const inspectors = [
  { id: 1, name: "John Kim", role: "Senior Engineer", avatar: "JK", assignedTests: ["Data Integrity Check", "Data Accuracy Test"], schedule: "Mon, Wed, Fri 09:00-12:00" },
  { id: 2, name: "Sarah Lee", role: "QA Lead", avatar: "SL", assignedTests: ["API Response Validation", "Data Integrity Check"], schedule: "Tue, Thu 10:00-15:00" },
  { id: 3, name: "Mike Park", role: "DevOps Engineer", avatar: "MP", assignedTests: ["Performance Benchmark"], schedule: "Mon-Fri 14:00-18:00" },
  { id: 4, name: "Emily Choi", role: "Data Engineer", avatar: "EC", assignedTests: ["Security Audit", "Performance Benchmark"], schedule: "Wed, Fri 09:00-17:00" },
  { id: 5, name: "David Jung", role: "Backend Developer", avatar: "DJ", assignedTests: ["Data Accuracy Test", "Performance Benchmark"], schedule: "Mon, Tue 10:00-14:00" },
];

type TestItemType = "multiple_choice" | "short_answer" | "ox" | "remarks";

interface TestItem {
  id: number;
  type: TestItemType;
  question: string;
  options?: string[];
}

export default function QAReport() {
  const [activeTab, setActiveTab] = useState<"services" | "tests" | "inspectors">("services");
  const [filterTestName, setFilterTestName] = useState("");
  const [filterDateFrom, setFilterDateFrom] = useState("");
  const [filterDateTo, setFilterDateTo] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProcedure, setNewProcedure] = useState({
    serviceName: "",
    procedureName: "",
  });
  const [testItems, setTestItems] = useState<TestItem[]>([]);
  const [nextItemId, setNextItemId] = useState(1);

  const addTestItem = (type: TestItemType) => {
    setTestItems([...testItems, { id: nextItemId, type, question: "", options: type === "multiple_choice" ? ["", "", "", ""] : undefined }]);
    setNextItemId(nextItemId + 1);
  };

  const updateTestItem = (id: number, field: string, value: string) => {
    setTestItems(testItems.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const updateOption = (itemId: number, optionIndex: number, value: string) => {
    setTestItems(testItems.map(item => {
      if (item.id === itemId && item.options) {
        const newOptions = [...item.options];
        newOptions[optionIndex] = value;
        return { ...item, options: newOptions };
      }
      return item;
    }));
  };

  const removeTestItem = (id: number) => {
    setTestItems(testItems.filter(item => item.id !== id));
  };

  const resetModal = () => {
    setShowAddModal(false);
    setNewProcedure({ serviceName: "", procedureName: "" });
    setTestItems([]);
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
                  <h1 className="text-lg md:text-xl font-semibold tracking-tight text-slate-800 truncate">QA Report & Inspection</h1>
                  <p className="text-xs md:text-sm text-slate-500 mt-0.5 hidden sm:block">Service operation status and quality assurance management</p>
                </div>
              </div>
              <Link href="/qa-report/add">
                <Button variant="outline" className="gap-2 border-blue-600 text-blue-600 hover:bg-blue-50" data-testid="add-test-button">
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline">Add Test Procedure</span>
                  <span className="sm:hidden">Add</span>
                </Button>
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6 lg:p-8 bg-white overflow-y-auto overflow-x-hidden">
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="chart-container-light">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                    <Server className="w-5 h-5 text-blue-600" />
                  </div>
                  <p className="text-sm font-medium text-slate-500">Total Services</p>
                </div>
                <p className="text-3xl font-bold text-slate-800">12</p>
                <p className="text-sm text-slate-400 mt-1">internal & external</p>
              </div>

              <div className="chart-container-light">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  </div>
                  <p className="text-sm font-medium text-slate-500">Completed Tests</p>
                </div>
                <p className="text-3xl font-bold text-emerald-600">48</p>
                <p className="text-sm text-slate-400 mt-1">this month</p>
              </div>

              <div className="chart-container-light">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-amber-600" />
                  </div>
                  <p className="text-sm font-medium text-slate-500">Pending Reviews</p>
                </div>
                <p className="text-3xl font-bold text-amber-600">5</p>
                <p className="text-sm text-slate-400 mt-1">awaiting inspection</p>
              </div>

              <div className="chart-container-light">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                  </div>
                  <p className="text-sm font-medium text-slate-500">Failed Tests</p>
                </div>
                <p className="text-3xl font-bold text-red-600">2</p>
                <p className="text-sm text-slate-400 mt-1">requires attention</p>
              </div>
            </div>
          </motion.section>

          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}>
            <div className="chart-container-light">
              <div className="flex items-center gap-4 mb-6 border-b border-slate-100 pb-4">
                <button onClick={() => setActiveTab("services")} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === "services" ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-slate-100"}`} data-testid="tab-services">
                  Services
                </button>
                <button onClick={() => setActiveTab("inspectors")} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === "inspectors" ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-slate-100"}`} data-testid="tab-inspectors">
                  Inspectors
                </button>
              </div>

              {activeTab === "services" && (
                <>
                  <div className="flex items-center gap-4 mb-4 pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500">Test Name:</span>
                      <select
                        value={filterTestName}
                        onChange={(e) => setFilterTestName(e.target.value)}
                        className="px-3 py-1.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700 bg-white min-w-[180px]"
                        data-testid="filter-test-name"
                      >
                        <option value="">All Tests</option>
                        {services.map(s => (
                          <option key={s.id} value={s.testName}>{s.testName}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500">Date Range:</span>
                      <input
                        type="date"
                        value={filterDateFrom}
                        onChange={(e) => setFilterDateFrom(e.target.value)}
                        className="px-2 py-1.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700 bg-white"
                        data-testid="filter-date-from"
                      />
                      <span className="text-slate-400">~</span>
                      <input
                        type="date"
                        value={filterDateTo}
                        onChange={(e) => setFilterDateTo(e.target.value)}
                        className="px-2 py-1.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700 bg-white"
                        data-testid="filter-date-to"
                      />
                    </div>
                    {(filterTestName || filterDateFrom || filterDateTo) && (
                      <button
                        onClick={() => { setFilterTestName(""); setFilterDateFrom(""); setFilterDateTo(""); }}
                        className="text-xs text-slate-500 hover:text-slate-700 px-2 py-1 rounded hover:bg-slate-100"
                      >
                        Reset Filters
                      </button>
                    )}
                  </div>
                  <div className="overflow-x-auto">
                  <table className="w-full" data-testid="services-table">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Test Name</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Service Name</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Type</th>
                        <th className="text-center py-3 px-4 text-sm font-medium text-slate-500">Step</th>
                        <th className="text-center py-3 px-4 text-sm font-medium text-slate-500">Work Status</th>
                        <th className="text-center py-3 px-4 text-sm font-medium text-slate-500">Review Results</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Last Inspection</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Inspector</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Next Inspection</th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-slate-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {services.filter(service => {
                          if (filterTestName && service.testName !== filterTestName) return false;
                          if (filterDateFrom || filterDateTo) {
                            const lastDate = new Date(service.lastInspection);
                            if (filterDateFrom && lastDate < new Date(filterDateFrom)) return false;
                            if (filterDateTo && lastDate > new Date(filterDateTo)) return false;
                          }
                          return true;
                        }).map((service) => (
                        <tr key={service.id} className="border-b border-slate-100 hover:bg-slate-50" data-testid={`service-row-${service.id}`}>
                          <td className="py-4 px-4">
                            <Link href={`/qa-report/test/${service.id}`} className="font-medium text-slate-800 hover:text-blue-600 cursor-pointer">
                              {service.testName}
                            </Link>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                                <Server className="w-4 h-4 text-blue-600" />
                              </div>
                              <span className="font-medium text-slate-800">{service.name}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${service.type === "Internal" ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"}`}>
                              {service.type}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <span className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 text-xs font-mono font-medium">
                              {service.step}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                              service.workStatus === "Normal" ? "bg-emerald-50 text-emerald-600" :
                              service.workStatus === "Delayed" ? "bg-amber-50 text-amber-600" :
                              "bg-red-50 text-red-600"
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${
                                service.workStatus === "Normal" ? "bg-emerald-500" :
                                service.workStatus === "Delayed" ? "bg-amber-500 animate-pulse" :
                                "bg-red-500"
                              }`} />
                              {service.workStatus}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-600 text-xs font-medium">
                                <CheckCircle2 className="w-3 h-3" />
                                {service.normalCount}
                              </span>
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-red-50 text-red-600 text-xs font-medium">
                                <AlertCircle className="w-3 h-3" />
                                {service.abnormalCount}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-sm text-slate-600">{service.lastInspection}</td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-1">
                              <div className="flex -space-x-2">
                                {service.inspectors.slice(0, 3).map((inspector, idx) => (
                                  <div
                                    key={idx}
                                    className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-xs font-medium text-slate-600 border-2 border-white"
                                    title={inspector}
                                  >
                                    {inspector.split(" ").map(n => n[0]).join("")}
                                  </div>
                                ))}
                                {service.inspectors.length > 3 && (
                                  <div className="w-6 h-6 rounded-full bg-slate-300 flex items-center justify-center text-xs font-medium text-slate-600 border-2 border-white">
                                    +{service.inspectors.length - 3}
                                  </div>
                                )}
                              </div>
                              <span className="text-sm text-slate-600 ml-2">
                                {service.inspectors.length === 1 
                                  ? service.inspectors[0] 
                                  : `${service.inspectors[0]} +${service.inspectors.length - 1}`}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-sm text-slate-600">{service.nextInspection}</td>
                          <td className="py-4 px-4 text-right">
                            <Link href={`/qa-report/test/${service.id}`}>
                              <button className="p-2 hover:bg-slate-100 rounded-lg">
                                <MoreHorizontal className="w-4 h-4 text-slate-400" />
                              </button>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                </>
              )}

              {activeTab === "inspectors" && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {inspectors.map((inspector) => (
                    <div key={inspector.id} className="border border-slate-200 rounded-xl p-4 hover:border-blue-200 hover:bg-blue-50/30 transition-colors cursor-pointer" data-testid={`inspector-${inspector.id}`}>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium">
                          {inspector.avatar}
                        </div>
                        <div>
                          <p className="font-medium text-slate-800">{inspector.name}</p>
                          <p className="text-sm text-slate-500">{inspector.role}</p>
                        </div>
                      </div>
                      <div className="mt-4 pt-3 border-t border-slate-100">
                        <div className="flex items-start gap-2 mb-2">
                          <ClipboardCheck className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-xs font-medium text-slate-600 mb-1">Assigned Tests</p>
                            <div className="flex flex-wrap gap-1">
                              {inspector.assignedTests.map((test, idx) => (
                                <span key={idx} className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{test}</span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-3">
                          <Clock className="w-4 h-4 text-amber-500 flex-shrink-0" />
                          <div>
                            <p className="text-xs font-medium text-slate-600">Schedule</p>
                            <p className="text-xs text-slate-500">{inspector.schedule}</p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <UserCheck className="w-4 h-4 text-emerald-500" />
                          <span className="text-sm text-slate-600">Available</span>
                        </div>
                        <Button variant="outline" size="sm" className="text-xs">Assign</Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.section>
        </main>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={resetModal}>
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full mx-4 max-h-[85vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
              <h3 className="text-lg font-semibold text-slate-800">Add Test Procedure</h3>
              <button onClick={resetModal} className="p-2 hover:bg-slate-200 rounded-lg transition-colors" data-testid="close-add-modal">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            <div className="overflow-y-auto max-h-[calc(85vh-130px)] p-6">
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Service Name</label>
                  <select
                    value={newProcedure.serviceName}
                    onChange={(e) => setNewProcedure({ ...newProcedure, serviceName: e.target.value })}
                    className="w-full h-10 px-3 border border-slate-200 rounded-lg text-sm"
                    data-testid="select-service"
                  >
                    <option value="">Select a service...</option>
                    {services.map(s => (
                      <option key={s.id} value={s.name}>{s.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Procedure Name</label>
                  <Input
                    value={newProcedure.procedureName}
                    onChange={(e) => setNewProcedure({ ...newProcedure, procedureName: e.target.value })}
                    placeholder="e.g., Data Integrity Check"
                    className="border-slate-200"
                    data-testid="input-procedure-name"
                  />
                </div>
              </div>

              <div className="border-t border-slate-200 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-semibold text-slate-800">Test Items</h4>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-1.5 text-xs" onClick={() => addTestItem("multiple_choice")} data-testid="add-multiple-choice">
                      <List className="w-3.5 h-3.5" />
                      Multiple Choice
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1.5 text-xs" onClick={() => addTestItem("short_answer")} data-testid="add-short-answer">
                      <MessageSquare className="w-3.5 h-3.5" />
                      Short Answer
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1.5 text-xs" onClick={() => addTestItem("ox")} data-testid="add-ox">
                      <CheckSquare className="w-3.5 h-3.5" />
                      O/X
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1.5 text-xs" onClick={() => addTestItem("remarks")} data-testid="add-remarks">
                      <StickyNote className="w-3.5 h-3.5" />
                      Remarks
                    </Button>
                  </div>
                </div>

                {testItems.length === 0 ? (
                  <div className="text-center py-8 border border-dashed border-slate-200 rounded-lg">
                    <p className="text-sm text-slate-400">No test items added yet. Click buttons above to add.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {testItems.map((item, index) => (
                      <div key={item.id} className="border border-slate-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-medium text-slate-400">#{index + 1}</span>
                            <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                              item.type === "multiple_choice" ? "bg-blue-50 text-blue-600" :
                              item.type === "short_answer" ? "bg-green-50 text-green-600" :
                              item.type === "ox" ? "bg-purple-50 text-purple-600" :
                              "bg-amber-50 text-amber-600"
                            }`}>
                              {item.type === "multiple_choice" ? "Multiple Choice" :
                               item.type === "short_answer" ? "Short Answer" :
                               item.type === "ox" ? "O/X" : "Remarks"}
                            </span>
                          </div>
                          <button onClick={() => removeTestItem(item.id)} className="p-1 hover:bg-red-50 rounded transition-colors">
                            <Trash2 className="w-4 h-4 text-red-400" />
                          </button>
                        </div>

                        <Input
                          value={item.question}
                          onChange={(e) => updateTestItem(item.id, "question", e.target.value)}
                          placeholder={item.type === "remarks" ? "Enter remarks field label..." : "Enter question..."}
                          className="border-slate-200 mb-3"
                        />

                        {item.type === "multiple_choice" && item.options && (
                          <div className="grid grid-cols-2 gap-2">
                            {item.options.map((opt, optIndex) => (
                              <div key={optIndex} className="flex items-center gap-2">
                                <span className="text-xs text-slate-400 w-4">{optIndex + 1}.</span>
                                <Input
                                  value={opt}
                                  onChange={(e) => updateOption(item.id, optIndex, e.target.value)}
                                  placeholder={`Option ${optIndex + 1}`}
                                  className="border-slate-200 text-sm h-9"
                                />
                              </div>
                            ))}
                          </div>
                        )}

                        {item.type === "ox" && (
                          <div className="flex items-center gap-4 text-sm text-slate-500">
                            <span className="flex items-center gap-1"><span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-bold">O</span> Pass</span>
                            <span className="flex items-center gap-1"><span className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs font-bold">X</span> Fail</span>
                          </div>
                        )}

                        {item.type === "short_answer" && (
                          <p className="text-xs text-slate-400">Inspector will provide a text response</p>
                        )}

                        {item.type === "remarks" && (
                          <p className="text-xs text-slate-400">Inspector can add notes and comments here</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-200 bg-slate-50">
              <Button variant="outline" onClick={resetModal}>Cancel</Button>
              <Button className="bg-blue-600 hover:bg-blue-700" data-testid="save-procedure">
                Save Procedure
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
