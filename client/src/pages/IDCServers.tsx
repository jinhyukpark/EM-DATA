import { useState, useMemo } from "react";
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
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/Sidebar";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const dailyStatusData = [
  { date: "01/06", success: 7, warning: 1, error: 1 },
  { date: "01/07", success: 8, warning: 0, error: 1 },
  { date: "01/08", success: 7, warning: 1, error: 1 },
  { date: "01/09", success: 8, warning: 1, error: 0 },
  { date: "01/10", success: 7, warning: 1, error: 1 },
  { date: "01/11", success: 6, warning: 2, error: 1 },
  { date: "01/12", success: 7, warning: 1, error: 1 },
  { date: "01/13", success: 7, warning: 1, error: 1 },
];

const idcServices = [
  { id: 1, name: "Main Web Server", type: "Server", instanceId: "idc-web-001", region: "KR-1", cpu: 52, memory: 68, status: "running", ip: "10.41.0.10", port: "80" },
  { id: 2, name: "API Gateway", type: "Server", instanceId: "idc-api-001", region: "KR-1", cpu: 34, memory: 45, status: "running", ip: "10.41.0.11", port: "8080" },
  { id: 3, name: "Database Primary", type: "Cloud DB", instanceId: "cdb-mysql-prod", region: "KR-1", cpu: 61, memory: 78, status: "running", ip: "10.41.1.5", port: "3306" },
  { id: 4, name: "Database Replica", type: "Cloud DB", instanceId: "cdb-mysql-replica", region: "KR-1", cpu: 28, memory: 52, status: "running", ip: "10.41.1.6", port: "3306" },
  { id: 5, name: "Object Storage", type: "Object Storage", instanceId: "obj-data-bucket", region: "KR-1", cpu: 0, memory: 0, status: "running", ip: "-", port: "-" },
  { id: 6, name: "CDN Distribution", type: "CDN+", instanceId: "cdn-static-assets", region: "KR-1", cpu: 0, memory: 0, status: "running", ip: "-", port: "-" },
  { id: 7, name: "Batch Processing", type: "Server", instanceId: "idc-batch-001", region: "KR-1", cpu: 85, memory: 79, status: "warning", ip: "10.41.0.20", port: "9000" },
  { id: 8, name: "Log Collector", type: "Server", instanceId: "idc-log-001", region: "KR-1", cpu: 0, memory: 0, status: "stopped", ip: "10.41.0.21", port: "5044" },
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

const CustomXAxisTick = ({ x, y, payload, onClick }: any) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <text 
        x={0} y={0} dy={16} 
        textAnchor="middle" 
        fill="#94a3b8" 
        fontSize={12} 
        className="cursor-pointer hover:fill-blue-600 hover:font-medium transition-all" 
        onClick={() => onClick(payload.value)}
      >
        {payload.value}
      </text>
    </g>
  );
};

export default function IDCServers() {
  const runningCount = idcServices.filter(s => s.status === "running").length;
  const warningCount = idcServices.filter(s => s.status === "warning").length;
  const stoppedCount = idcServices.filter(s => s.status === "stopped").length;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [timeRange, setTimeRange] = useState("1주");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const statusData = useMemo(() => {
    let points = 12;
    let intervalMs = 5 * 60 * 1000;
    let format = "time";
    
    if (timeRange.includes("시간")) {
      const hours = parseInt(timeRange);
      intervalMs = 5 * 60 * 1000; // 5 mins
      points = hours * 12 + 1; 
      format = "time";
    } else if (timeRange.includes("일")) {
      const days = parseInt(timeRange);
      if (days === 1) { points = 25; intervalMs = 60 * 60 * 1000; }
      else if (days === 3) { points = 25; intervalMs = 3 * 60 * 60 * 1000; }
      else if (days === 6) { points = 25; intervalMs = 6 * 60 * 60 * 1000; }
      format = "datetime";
    } else if (timeRange.includes("주")) {
      const weeks = parseInt(timeRange);
      if (weeks === 1) { points = 15; intervalMs = 12 * 60 * 60 * 1000; }
      else { points = weeks * 7 + 1; intervalMs = 24 * 60 * 60 * 1000; }
      format = "date";
    }

    const now = new Date();
    // Snap to nearest 5 minutes
    now.setMinutes(Math.floor(now.getMinutes() / 5) * 5);
    now.setSeconds(0);
    now.setMilliseconds(0);

    const data = [];
    for (let i = points - 1; i >= 0; i--) {
      const d = new Date(now.getTime() - i * intervalMs);
      const mo = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const h = String(d.getHours()).padStart(2, '0');
      const m = String(d.getMinutes()).padStart(2, '0');
      
      let dateLabel = "";
      if (format === "time") dateLabel = `${h}:${m}`;
      else if (format === "datetime") dateLabel = `${mo}/${day} ${h}:${m}`;
      else if (format === "date") dateLabel = `${mo}/${day}`;

      data.push({
        date: dateLabel,
        success: Math.floor(Math.random() * 5) + 8,
        warning: Math.floor(Math.random() * 2),
        error: Math.floor(Math.random() * 2),
      });
    }
    return data;
  }, [timeRange]);

  const selectedDateDetails = useMemo(() => {
    if (!selectedDate) return [];
    
    const types = ["warning", "error"];
    const numItems = Math.floor(Math.random() * 25) + 1; 
    
    return Array.from({ length: numItems }).map((_, i) => {
      const service = idcServices[Math.floor(Math.random() * idcServices.length)];
      return {
        id: i,
        date: selectedDate,
        type: types[Math.floor(Math.random() * types.length)],
        serviceName: service.name,
        instanceId: service.instanceId
      };
    });
  }, [selectedDate]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const paginatedDetails = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return selectedDateDetails.slice(startIndex, startIndex + itemsPerPage);
  }, [selectedDateDetails, currentPage]);

  const totalPages = Math.ceil(selectedDateDetails.length / itemsPerPage);

  // Reset page when date changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [selectedDate]);

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
                  <Server className="w-5 h-5 text-white" />
                </div>
                <div className="min-w-0">
                  <h1 className="text-lg md:text-xl font-semibold tracking-tight text-slate-800 truncate">IDC Services</h1>
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
                  <p className="text-xl font-bold text-slate-800">{idcServices.length}</p>
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

          <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.3 }} className="mb-6">
            <div className="bg-white rounded-xl border border-slate-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-medium text-slate-800">Status Overview</h2>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="h-7 text-xs gap-1 px-2 border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600">
                        {timeRange}
                        <ChevronDown className="w-3 h-3 text-slate-400" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-40">
                      <DropdownMenuGroup>
                        <DropdownMenuLabel className="text-xs text-slate-500 font-medium">시간</DropdownMenuLabel>
                        {["1시간", "2시간", "3시간", "4시간"].map(t => (
                          <DropdownMenuItem key={t} onClick={() => setTimeRange(t)} className={`text-xs ${timeRange === t ? 'bg-slate-100 font-medium' : ''}`}>
                            {t}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuLabel className="text-xs text-slate-500 font-medium">일</DropdownMenuLabel>
                        {["1일", "2일", "4일", "6일"].map(t => (
                          <DropdownMenuItem key={t} onClick={() => setTimeRange(t)} className={`text-xs ${timeRange === t ? 'bg-slate-100 font-medium' : ''}`}>
                            {t}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuLabel className="text-xs text-slate-500 font-medium">주</DropdownMenuLabel>
                        {["1주", "2주", "4주", "6주", "8주"].map(t => (
                          <DropdownMenuItem key={t} onClick={() => setTimeRange(t)} className={`text-xs ${timeRange === t ? 'bg-slate-100 font-medium' : ''}`}>
                            {t}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-sm bg-emerald-500" />
                    <span className="text-slate-500">Success</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-sm bg-amber-500" />
                    <span className="text-slate-500">Warning</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-sm bg-red-500" />
                    <span className="text-slate-500">Error</span>
                  </div>
                </div>
              </div>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={statusData} onClick={(state: any) => { if (state && state.activeLabel) setSelectedDate(state.activeLabel); }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} minTickGap={30} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      labelStyle={{ color: '#334155', fontWeight: 600, marginBottom: 4 }}
                    />
                    <Line type="monotone" dataKey="success" name="Success" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }} activeDot={{ r: 6, onClick: (e: any, payload: any) => setSelectedDate(payload?.payload?.date) }} />
                    <Line type="monotone" dataKey="warning" name="Warning" stroke="#f59e0b" strokeWidth={2} dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }} activeDot={{ r: 6, onClick: (e: any, payload: any) => setSelectedDate(payload?.payload?.date) }} />
                    <Line type="monotone" dataKey="error" name="Error" stroke="#ef4444" strokeWidth={2} dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }} activeDot={{ r: 6, onClick: (e: any, payload: any) => setSelectedDate(payload?.payload?.date) }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.section>

          <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.3 }}>
            <div className="bg-white rounded-xl border border-slate-100">
              <div className="px-6 py-4 border-b border-slate-100">
                <h2 className="text-sm font-medium text-slate-800">Managed Services</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full" data-testid="idc-services-table">
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
                    {idcServices.map((service) => (
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

          <Dialog open={!!selectedDate} onOpenChange={(open) => !open && setSelectedDate(null)}>
            <DialogContent className="max-w-3xl bg-white">
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <DialogTitle className="text-lg font-semibold text-slate-800">Status Overview</DialogTitle>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-sm font-medium">{selectedDate}</span>
                </div>
              </DialogHeader>
              <div className="mt-4 border rounded-lg overflow-hidden">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4 font-medium text-slate-600">Status</th>
                      <th className="py-3 px-4 font-medium text-slate-600">Service Name</th>
                      <th className="py-3 px-4 font-medium text-slate-600">Instance ID</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {paginatedDetails.length > 0 ? (
                      paginatedDetails.map((detail) => (
                        <tr key={detail.id} className="hover:bg-slate-50/50">
                          <td className="py-3 px-4">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              detail.type === 'error' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'
                            }`}>
                              {detail.type.toUpperCase()}
                            </span>
                          </td>
                          <td className="py-3 px-4 font-medium text-slate-800">{detail.serviceName}</td>
                          <td className="py-3 px-4 font-mono text-slate-500">{detail.instanceId}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={3} className="py-8 text-center text-slate-500">No records found for this date.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-slate-500">
                    Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, selectedDateDetails.length)} of {selectedDateDetails.length} entries
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-1 text-sm border border-slate-200 rounded-md text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Previous
                    </button>
                    <span className="text-sm font-medium text-slate-700">
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1 text-sm border border-slate-200 rounded-md text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </div>
  );
}
