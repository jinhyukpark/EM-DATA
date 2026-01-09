import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import {
  Building2,
  FileText,
  TrendingUp,
  Newspaper,
  LayoutDashboard,
  Database,
  ChevronDown,
  Server,
  Cloud,
  Settings,
  User,
  Users,
  Shield,
  ClipboardCheck,
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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

const settingsMenuItems = [
  { id: "profile", name: "Profile", icon: User, path: "/settings/profile" },
  { id: "users", name: "User Management", icon: Users, path: "/settings/users" },
  { id: "permissions", name: "Permission Management", icon: Shield, path: "/settings/permissions" },
];

const services = [
  { id: 1, name: "Company Data Pipeline", type: "Internal", status: "Active", lastInspection: "2025-01-09", inspector: "John Kim", nextInspection: "2025-01-16" },
  { id: 2, name: "Patent Crawler Service", type: "Internal", status: "Active", lastInspection: "2025-01-08", inspector: "Sarah Lee", nextInspection: "2025-01-15" },
  { id: 3, name: "News API Integration", type: "External", status: "Warning", lastInspection: "2025-01-05", inspector: "Mike Park", nextInspection: "2025-01-12" },
  { id: 4, name: "Stock Data Collector", type: "External", status: "Active", lastInspection: "2025-01-09", inspector: "Emily Choi", nextInspection: "2025-01-16" },
  { id: 5, name: "ML Prediction Service", type: "Internal", status: "Inactive", lastInspection: "2024-12-20", inspector: "David Jung", nextInspection: "2025-01-20" },
];

const testProcedures = [
  { id: 1, name: "Data Integrity Check", service: "Company Data Pipeline", steps: 5, status: "Completed", completedBy: "John Kim", completedAt: "2025-01-09 14:32" },
  { id: 2, name: "API Response Validation", service: "News API Integration", steps: 3, status: "In Progress", completedBy: null, completedAt: null },
  { id: 3, name: "Performance Benchmark", service: "Patent Crawler Service", steps: 8, status: "Pending", completedBy: null, completedAt: null },
  { id: 4, name: "Security Audit", service: "Stock Data Collector", steps: 12, status: "Completed", completedBy: "Sarah Lee", completedAt: "2025-01-08 16:45" },
  { id: 5, name: "Data Accuracy Test", service: "ML Prediction Service", steps: 6, status: "Failed", completedBy: "Mike Park", completedAt: "2025-01-07 11:20" },
];

const inspectors = [
  { id: 1, name: "John Kim", role: "Senior Engineer", avatar: "JK" },
  { id: 2, name: "Sarah Lee", role: "QA Lead", avatar: "SL" },
  { id: 3, name: "Mike Park", role: "DevOps Engineer", avatar: "MP" },
  { id: 4, name: "Emily Choi", role: "Data Engineer", avatar: "EC" },
  { id: 5, name: "David Jung", role: "Backend Developer", avatar: "DJ" },
];

function Sidebar() {
  const [location] = useLocation();
  const [dataMenuOpen, setDataMenuOpen] = useState(false);
  const [serverMenuOpen, setServerMenuOpen] = useState(false);
  const [settingsMenuOpen, setSettingsMenuOpen] = useState(false);

  return (
    <aside className="w-64 bg-slate-900 min-h-screen flex flex-col" data-testid="sidebar">
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-xl font-bold text-white tracking-tight">Data Quality Center</h1>
        <p className="text-xs text-slate-400 mt-1">Internal Monitoring</p>
      </div>

      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.path;
            return (
              <li key={item.id}>
                <Link href={item.path} className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white"}`}>
                  <Icon className="w-5 h-5" strokeWidth={1.5} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              </li>
            );
          })}
          <li>
            <Link href="/qa-report" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${location === "/qa-report" ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white"}`}>
              <ClipboardCheck className="w-5 h-5" strokeWidth={1.5} />
              <span className="font-medium">QA Report</span>
            </Link>
          </li>
        </ul>

        <div className="mt-6">
          <button onClick={() => setDataMenuOpen(!dataMenuOpen)} className="flex items-center justify-between w-full px-4 py-3 text-slate-400 hover:text-white transition-colors">
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
                  <Link href={item.path} className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${isActive ? "bg-blue-600/20 text-blue-400" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}>
                    <Icon className="w-4 h-4" strokeWidth={1.5} />
                    <span className="text-sm">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </motion.ul>
        </div>

        <div className="mt-2">
          <button onClick={() => setServerMenuOpen(!serverMenuOpen)} className="flex items-center justify-between w-full px-4 py-3 text-slate-400 hover:text-white transition-colors">
            <div className="flex items-center gap-3">
              <Server className="w-5 h-5" strokeWidth={1.5} />
              <span className="font-medium text-sm">Server Management</span>
            </div>
            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${serverMenuOpen ? "rotate-180" : ""}`} />
          </button>
          <motion.ul initial={false} animate={{ height: serverMenuOpen ? "auto" : 0, opacity: serverMenuOpen ? 1 : 0 }} transition={{ duration: 0.2 }} className="overflow-hidden ml-4 space-y-1">
            {serverMenuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <Link href={item.path} className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-all duration-200">
                    <Icon className={`w-4 h-4 ${item.color}`} strokeWidth={1.5} />
                    <span className="text-sm">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </motion.ul>
        </div>

        <div className="mt-2">
          <button onClick={() => setSettingsMenuOpen(!settingsMenuOpen)} className="flex items-center justify-between w-full px-4 py-3 text-slate-400 hover:text-white transition-colors">
            <div className="flex items-center gap-3">
              <Settings className="w-5 h-5" strokeWidth={1.5} />
              <span className="font-medium text-sm">Settings</span>
            </div>
            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${settingsMenuOpen ? "rotate-180" : ""}`} />
          </button>
          <motion.ul initial={false} animate={{ height: settingsMenuOpen ? "auto" : 0, opacity: settingsMenuOpen ? 1 : 0 }} transition={{ duration: 0.2 }} className="overflow-hidden ml-4 space-y-1">
            {settingsMenuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <Link href={item.path} className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-all duration-200">
                    <Icon className="w-4 h-4" strokeWidth={1.5} />
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

export default function QAReport() {
  const [activeTab, setActiveTab] = useState<"services" | "tests" | "inspectors">("services");
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="min-h-screen flex bg-slate-50">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
          <div className="px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-semibold tracking-tight text-slate-800">QA Report & Inspection</h1>
                <p className="text-sm text-slate-500 mt-0.5">Service operation status and quality assurance management</p>
              </div>
              <Button className="gap-2 bg-blue-600 hover:bg-blue-700" data-testid="add-test-button" onClick={() => setShowAddModal(true)}>
                <Plus className="w-4 h-4" />
                Add Test Procedure
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 p-8 bg-white">
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
                <button onClick={() => setActiveTab("tests")} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === "tests" ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-slate-100"}`} data-testid="tab-tests">
                  Test Procedures
                </button>
                <button onClick={() => setActiveTab("inspectors")} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === "inspectors" ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-slate-100"}`} data-testid="tab-inspectors">
                  Inspectors
                </button>
              </div>

              {activeTab === "services" && (
                <div className="overflow-x-auto">
                  <table className="w-full" data-testid="services-table">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Service Name</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Type</th>
                        <th className="text-center py-3 px-4 text-sm font-medium text-slate-500">Status</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Last Inspection</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Inspector</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Next Inspection</th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-slate-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {services.map((service) => (
                        <tr key={service.id} className="border-b border-slate-100 hover:bg-slate-50" data-testid={`service-row-${service.id}`}>
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
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                              service.status === "Active" ? "bg-emerald-50 text-emerald-600" :
                              service.status === "Warning" ? "bg-amber-50 text-amber-600" :
                              "bg-slate-100 text-slate-500"
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${
                                service.status === "Active" ? "bg-emerald-500" :
                                service.status === "Warning" ? "bg-amber-500 animate-pulse" :
                                "bg-slate-400"
                              }`} />
                              {service.status}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-sm text-slate-600">{service.lastInspection}</td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-xs font-medium text-slate-600">
                                {service.inspector.split(" ").map(n => n[0]).join("")}
                              </div>
                              <span className="text-sm text-slate-600">{service.inspector}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-sm text-slate-600">{service.nextInspection}</td>
                          <td className="py-4 px-4 text-right">
                            <button className="p-2 hover:bg-slate-100 rounded-lg">
                              <MoreHorizontal className="w-4 h-4 text-slate-400" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === "tests" && (
                <div className="overflow-x-auto">
                  <table className="w-full" data-testid="tests-table">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Test Name</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Service</th>
                        <th className="text-center py-3 px-4 text-sm font-medium text-slate-500">Steps</th>
                        <th className="text-center py-3 px-4 text-sm font-medium text-slate-500">Status</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Completed By</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Completed At</th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-slate-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {testProcedures.map((test) => (
                        <tr key={test.id} className="border-b border-slate-100 hover:bg-slate-50" data-testid={`test-row-${test.id}`}>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center">
                                <FileCheck className="w-4 h-4 text-purple-600" />
                              </div>
                              <span className="font-medium text-slate-800">{test.name}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-sm text-slate-600">{test.service}</td>
                          <td className="py-4 px-4 text-center">
                            <span className="px-2 py-0.5 rounded bg-slate-100 text-sm font-mono text-slate-600">{test.steps}</span>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                              test.status === "Completed" ? "bg-emerald-50 text-emerald-600" :
                              test.status === "In Progress" ? "bg-blue-50 text-blue-600" :
                              test.status === "Failed" ? "bg-red-50 text-red-600" :
                              "bg-slate-100 text-slate-500"
                            }`}>
                              {test.status}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            {test.completedBy ? (
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-xs font-medium text-slate-600">
                                  {test.completedBy.split(" ").map(n => n[0]).join("")}
                                </div>
                                <span className="text-sm text-slate-600">{test.completedBy}</span>
                              </div>
                            ) : (
                              <span className="text-sm text-slate-400">-</span>
                            )}
                          </td>
                          <td className="py-4 px-4 text-sm text-slate-500">{test.completedAt || "-"}</td>
                          <td className="py-4 px-4 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <button className="p-2 hover:bg-slate-100 rounded-lg">
                                <Edit2 className="w-4 h-4 text-slate-400" />
                              </button>
                              <button className="p-2 hover:bg-red-50 rounded-lg">
                                <Trash2 className="w-4 h-4 text-red-400" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
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
                      <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
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
    </div>
  );
}
