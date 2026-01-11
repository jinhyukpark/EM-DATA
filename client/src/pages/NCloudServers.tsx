import { useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  RefreshCw,
  MoreHorizontal,
  Menu,
  Cloud,
  Server,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/Sidebar";

const ncloudServices = [
  { id: 1, name: "Main Web Server", type: "Server", instanceId: "ncloud-web-001", region: "KR-1", cpu: 52, memory: 68, status: "running", ip: "10.41.0.10", port: "80" },
  { id: 2, name: "API Gateway", type: "Server", instanceId: "ncloud-api-001", region: "KR-1", cpu: 34, memory: 45, status: "running", ip: "10.41.0.11", port: "8080" },
  { id: 3, name: "Database Primary", type: "Cloud DB", instanceId: "cdb-mysql-prod", region: "KR-1", cpu: 61, memory: 78, status: "running", ip: "10.41.1.5", port: "3306" },
  { id: 4, name: "Database Replica", type: "Cloud DB", instanceId: "cdb-mysql-replica", region: "KR-1", cpu: 28, memory: 52, status: "running", ip: "10.41.1.6", port: "3306" },
  { id: 5, name: "Object Storage", type: "Object Storage", instanceId: "obj-data-bucket", region: "KR-1", cpu: 0, memory: 0, status: "running", ip: "-", port: "-" },
  { id: 6, name: "CDN Distribution", type: "CDN+", instanceId: "cdn-static-assets", region: "KR-1", cpu: 0, memory: 0, status: "running", ip: "-", port: "-" },
  { id: 7, name: "Batch Processing", type: "Server", instanceId: "ncloud-batch-001", region: "KR-1", cpu: 85, memory: 79, status: "warning", ip: "10.41.0.20", port: "9000" },
  { id: 8, name: "Log Collector", type: "Server", instanceId: "ncloud-log-001", region: "KR-1", cpu: 0, memory: 0, status: "stopped", ip: "10.41.0.21", port: "5044" },
  { id: 9, name: "Redis Cache", type: "Cloud DB", instanceId: "cdb-redis-prod", region: "KR-1", cpu: 15, memory: 42, status: "running", ip: "10.41.1.10", port: "6379" },
];

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

export default function NCloudServers() {
  const runningCount = ncloudServices.filter(s => s.status === "running").length;
  const warningCount = ncloudServices.filter(s => s.status === "warning").length;
  const stoppedCount = ncloudServices.filter(s => s.status === "stopped").length;
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
                <div className="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center flex-shrink-0">
                  <Cloud className="w-5 h-5 text-white" />
                </div>
                <div className="min-w-0">
                  <h1 className="text-lg md:text-xl font-semibold tracking-tight text-slate-800 truncate">NCloud Services</h1>
                  <p className="text-xs md:text-sm text-slate-500 mt-0.5 hidden sm:block">KR-1 (Korea)</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="gap-2 border-slate-200" data-testid="refresh-button">
                <RefreshCw className="w-4 h-4" />
                <span className="hidden sm:inline">Refresh</span>
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6 bg-slate-50/50 overflow-x-hidden">
          <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="mb-6">
            <div className="flex items-center gap-8 py-4 px-6 bg-white rounded-xl border border-slate-100">
              <div className="flex items-center gap-3">
                <Server className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wide">Total Services</p>
                  <p className="text-xl font-bold text-slate-800">{ncloudServices.length}</p>
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
                  <p className="text-lg font-bold text-slate-800">Korea</p>
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
                <table className="w-full" data-testid="ncloud-services-table">
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
                    {ncloudServices.map((service) => (
                      <tr key={service.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors" data-testid={`service-row-${service.id}`}>
                        <td className="py-3 px-6">
                          <span className="font-medium text-slate-800">{service.name}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 rounded text-xs font-medium bg-green-50 text-green-600">{service.type}</span>
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
