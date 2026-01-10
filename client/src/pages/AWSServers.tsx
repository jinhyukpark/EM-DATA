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
  Activity,
  HardDrive,
  Cpu,
  MemoryStick,
  Globe,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  RefreshCw,
  MoreHorizontal,
  Lightbulb,
  UserCog,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const menuItems = [
  { id: "dashboard", name: "Dashboard", icon: LayoutDashboard, path: "/" },
  { id: "qa-report", name: "QA Report", icon: ClipboardCheck, path: "/qa-report" },
];

const dataMenuItems = [
  { id: "company-data", name: "Company Data", icon: Building2, path: "/data/company" },
  { id: "patent-data", name: "Patent Data", icon: FileText, path: "/data/patent" },
  { id: "stock-data", name: "Stock Data", icon: TrendingUp, path: "/data/stock" },
  { id: "news-data", name: "News Data", icon: Newspaper, path: "/data/news" },
  { id: "rnd-data", name: "R&D Data", icon: Lightbulb, path: "/data/rnd" },
  { id: "employment-data", name: "Employment Data", icon: UserCog, path: "/data/employment" },
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

const awsServices = [
  { id: 1, name: "Company Data API", type: "EC2", instanceId: "i-0a1b2c3d4e5f", region: "ap-northeast-2", cpu: 45, memory: 62, status: "running", ip: "10.0.1.101", port: "8080", service: "Company" },
  { id: 2, name: "Patent Crawler", type: "EC2", instanceId: "i-1b2c3d4e5f6a", region: "ap-northeast-2", cpu: 78, memory: 81, status: "running", ip: "10.0.1.102", port: "8081", service: "Patent" },
  { id: 3, name: "News Aggregator", type: "EC2", instanceId: "i-2c3d4e5f6a7b", region: "ap-northeast-2", cpu: 23, memory: 45, status: "running", ip: "10.0.1.103", port: "8082", service: "News" },
  { id: 4, name: "Stock Data Collector", type: "Lambda", instanceId: "stock-collector-fn", region: "ap-northeast-2", cpu: 0, memory: 0, status: "idle", ip: "-", port: "-", service: "Stock" },
  { id: 5, name: "ML Prediction Engine", type: "EC2", instanceId: "i-3d4e5f6a7b8c", region: "ap-northeast-2", cpu: 92, memory: 88, status: "warning", ip: "10.0.1.105", port: "5000", service: "ML" },
  { id: 6, name: "Data Warehouse", type: "RDS", instanceId: "db-main-prod", region: "ap-northeast-2", cpu: 35, memory: 72, status: "running", ip: "10.0.2.50", port: "5432", service: "All" },
  { id: 7, name: "Redis Cache", type: "ElastiCache", instanceId: "cache-prod-01", region: "ap-northeast-2", cpu: 12, memory: 45, status: "running", ip: "10.0.2.51", port: "6379", service: "All" },
  { id: 8, name: "File Storage", type: "S3", instanceId: "company-data-bucket", region: "ap-northeast-2", cpu: 0, memory: 0, status: "running", ip: "-", port: "-", service: "Company" },
  { id: 9, name: "Backup Service", type: "EC2", instanceId: "i-4e5f6a7b8c9d", region: "ap-northeast-2", cpu: 5, memory: 28, status: "stopped", ip: "10.0.1.110", port: "9000", service: "All" },
];

const serviceColors: Record<string, { bg: string; text: string }> = {
  Company: { bg: "bg-blue-50", text: "text-blue-600" },
  Patent: { bg: "bg-purple-50", text: "text-purple-600" },
  News: { bg: "bg-green-50", text: "text-green-600" },
  Stock: { bg: "bg-amber-50", text: "text-amber-600" },
  ML: { bg: "bg-pink-50", text: "text-pink-600" },
  All: { bg: "bg-slate-100", text: "text-slate-600" },
};

function Sidebar() {
  const [location] = useLocation();
  const [dataMenuOpen, setDataMenuOpen] = useState(false);
  const [serverMenuOpen, setServerMenuOpen] = useState(true);
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
              const isActive = location === item.path;
              return (
                <li key={item.id}>
                  <Link href={item.path} className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${isActive ? "bg-blue-600/20 text-blue-400" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}>
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

function StatusBadge({ status }: { status: string }) {
  const config = {
    running: { icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50", label: "Running" },
    warning: { icon: AlertTriangle, color: "text-amber-600", bg: "bg-amber-50", label: "Warning" },
    stopped: { icon: XCircle, color: "text-red-600", bg: "bg-red-50", label: "Stopped" },
    idle: { icon: Activity, color: "text-slate-500", bg: "bg-slate-100", label: "Idle" },
  }[status] || { icon: Activity, color: "text-slate-500", bg: "bg-slate-100", label: status };

  const Icon = config.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.bg} ${config.color}`}>
      <Icon className="w-3 h-3" />
      {config.label}
    </span>
  );
}

export default function AWSServers() {
  const runningCount = awsServices.filter(s => s.status === "running").length;
  const warningCount = awsServices.filter(s => s.status === "warning").length;
  const stoppedCount = awsServices.filter(s => s.status === "stopped").length;

  return (
    <div className="min-h-screen flex bg-slate-50">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
          <div className="px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center">
                  <Cloud className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold tracking-tight text-slate-800">AWS Services</h1>
                  <p className="text-sm text-slate-500 mt-0.5">ap-northeast-2 (Seoul)</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="gap-2 border-slate-200" data-testid="refresh-button">
                <RefreshCw className="w-4 h-4" />
                Refresh
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 bg-slate-50/50">
          <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="mb-6">
            <div className="flex items-center gap-8 py-4 px-6 bg-white rounded-xl border border-slate-100">
              <div className="flex items-center gap-3">
                <Server className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wide">Total Services</p>
                  <p className="text-xl font-bold text-slate-800">{awsServices.length}</p>
                </div>
              </div>
              <div className="w-px h-10 bg-slate-200" />
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wide">Running</p>
                  <p className="text-xl font-bold text-emerald-600">{runningCount}</p>
                </div>
              </div>
              <div className="w-px h-10 bg-slate-200" />
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wide">Warning</p>
                  <p className="text-xl font-bold text-amber-600">{warningCount}</p>
                </div>
              </div>
              <div className="w-px h-10 bg-slate-200" />
              <div className="flex items-center gap-3">
                <XCircle className="w-5 h-5 text-red-500" />
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wide">Stopped</p>
                  <p className="text-xl font-bold text-red-600">{stoppedCount}</p>
                </div>
              </div>
              <div className="w-px h-10 bg-slate-200" />
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-purple-500" />
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wide">Region</p>
                  <p className="text-lg font-bold text-slate-800">Seoul</p>
                </div>
              </div>
            </div>
          </motion.section>

          <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.3 }}>
            <div className="bg-white rounded-xl border border-slate-100">
              <div className="px-6 py-4 border-b border-slate-100">
                <h2 className="text-sm font-medium text-slate-800">Managed Services</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full" data-testid="aws-services-table">
                  <thead>
                    <tr className="bg-slate-50/50">
                      <th className="text-left py-3 px-6 text-xs font-medium text-slate-400 uppercase tracking-wide">Service Name</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-slate-400 uppercase tracking-wide">Type</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-slate-400 uppercase tracking-wide">Instance ID</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-slate-400 uppercase tracking-wide">IP / Port</th>
                      <th className="text-center py-3 px-4 text-xs font-medium text-slate-400 uppercase tracking-wide">CPU</th>
                      <th className="text-center py-3 px-4 text-xs font-medium text-slate-400 uppercase tracking-wide">Memory</th>
                      <th className="text-center py-3 px-4 text-xs font-medium text-slate-400 uppercase tracking-wide">Status</th>
                      <th className="text-right py-3 px-6 text-xs font-medium text-slate-400 uppercase tracking-wide">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {awsServices.map((service) => (
                      <tr key={service.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors" data-testid={`service-row-${service.id}`}>
                        <td className="py-3 px-6">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-slate-800">{service.name}</span>
                            <span className={`px-2 py-0.5 rounded text-xs font-medium ${serviceColors[service.service]?.bg} ${serviceColors[service.service]?.text}`}>
                              {service.service}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 rounded text-xs font-medium bg-orange-50 text-orange-600">{service.type}</span>
                        </td>
                        <td className="py-3 px-4 text-sm font-mono text-slate-500">{service.instanceId}</td>
                        <td className="py-3 px-4 text-sm font-mono text-slate-600">
                          {service.ip !== "-" ? `${service.ip}:${service.port}` : "-"}
                        </td>
                        <td className="py-3 px-4 text-center">
                          {service.cpu > 0 ? (
                            <div className="flex items-center justify-center gap-2">
                              <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div className={`h-full rounded-full ${service.cpu > 80 ? "bg-red-500" : service.cpu > 60 ? "bg-amber-500" : "bg-emerald-500"}`} style={{ width: `${service.cpu}%` }} />
                              </div>
                              <span className="text-xs text-slate-500 w-8">{service.cpu}%</span>
                            </div>
                          ) : (
                            <span className="text-xs text-slate-400">-</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-center">
                          {service.memory > 0 ? (
                            <div className="flex items-center justify-center gap-2">
                              <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div className={`h-full rounded-full ${service.memory > 80 ? "bg-red-500" : service.memory > 60 ? "bg-amber-500" : "bg-emerald-500"}`} style={{ width: `${service.memory}%` }} />
                              </div>
                              <span className="text-xs text-slate-500 w-8">{service.memory}%</span>
                            </div>
                          ) : (
                            <span className="text-xs text-slate-400">-</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <StatusBadge status={service.status} />
                        </td>
                        <td className="py-3 px-6 text-right">
                          <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                            <MoreHorizontal className="w-4 h-4 text-slate-400" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.section>
        </main>
      </div>
    </div>
  );
}
