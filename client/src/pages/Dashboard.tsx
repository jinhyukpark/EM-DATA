import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import {
  FileText,
  BookOpen,
  Newspaper,
  TrendingUp,
  Building2,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  RefreshCw,
  LayoutDashboard,
  Database,
  ChevronDown,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

const dataTypes = [
  {
    id: "patent",
    name: "특허",
    icon: FileText,
    total: 2847562,
    todayUpdate: 1247,
    yesterdayUpdate: 1189,
    color: "hsl(217, 91%, 60%)",
    glowClass: "glow-blue",
    bgGradient: "from-blue-500/10 to-blue-600/5",
  },
  {
    id: "paper",
    name: "논문",
    icon: BookOpen,
    total: 1523847,
    todayUpdate: 892,
    yesterdayUpdate: 923,
    color: "hsl(160, 84%, 39%)",
    glowClass: "glow-green",
    bgGradient: "from-emerald-500/10 to-emerald-600/5",
  },
  {
    id: "news",
    name: "뉴스",
    icon: Newspaper,
    total: 5847123,
    todayUpdate: 4521,
    yesterdayUpdate: 4102,
    color: "hsl(43, 96%, 56%)",
    glowClass: "glow-yellow",
    bgGradient: "from-yellow-500/10 to-yellow-600/5",
  },
  {
    id: "stock",
    name: "주식 데이터",
    icon: TrendingUp,
    total: 892456,
    todayUpdate: 2847,
    yesterdayUpdate: 2901,
    color: "hsl(291, 64%, 42%)",
    glowClass: "glow-purple",
    bgGradient: "from-purple-500/10 to-purple-600/5",
  },
  {
    id: "company",
    name: "외감 기업",
    icon: Building2,
    total: 34521,
    todayUpdate: 127,
    yesterdayUpdate: 98,
    color: "hsl(12, 76%, 61%)",
    glowClass: "glow-orange",
    bgGradient: "from-orange-500/10 to-orange-600/5",
  },
];

const generateDailyData = () => {
  const data = [];
  const today = new Date();
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    data.push({
      date: `${date.getMonth() + 1}/${date.getDate()}`,
      특허: Math.floor(Math.random() * 500) + 1000,
      논문: Math.floor(Math.random() * 400) + 700,
      뉴스: Math.floor(Math.random() * 2000) + 3500,
      주식: Math.floor(Math.random() * 1000) + 2500,
      외감기업: Math.floor(Math.random() * 50) + 80,
    });
  }
  return data;
};

const generateWeeklyData = () => {
  const data = [];
  for (let i = 11; i >= 0; i--) {
    data.push({
      date: `${12 - i}주차`,
      특허: Math.floor(Math.random() * 3000) + 7000,
      논문: Math.floor(Math.random() * 2500) + 5000,
      뉴스: Math.floor(Math.random() * 15000) + 25000,
      주식: Math.floor(Math.random() * 8000) + 18000,
      외감기업: Math.floor(Math.random() * 300) + 500,
    });
  }
  return data;
};

const generateMonthlyData = () => {
  const months = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
  return months.map((month) => ({
    date: month,
    특허: Math.floor(Math.random() * 15000) + 30000,
    논문: Math.floor(Math.random() * 10000) + 20000,
    뉴스: Math.floor(Math.random() * 60000) + 100000,
    주식: Math.floor(Math.random() * 30000) + 70000,
    외감기업: Math.floor(Math.random() * 1500) + 2500,
  }));
};

const generateYearlyData = () => {
  const years = ["2020", "2021", "2022", "2023", "2024", "2025"];
  return years.map((year) => ({
    date: year,
    특허: Math.floor(Math.random() * 200000) + 400000,
    논문: Math.floor(Math.random() * 150000) + 250000,
    뉴스: Math.floor(Math.random() * 800000) + 1200000,
    주식: Math.floor(Math.random() * 400000) + 800000,
    외감기업: Math.floor(Math.random() * 5000) + 30000,
  }));
};

const dailyData = generateDailyData();
const weeklyData = generateWeeklyData();
const monthlyData = generateMonthlyData();
const yearlyData = generateYearlyData();

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(2) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}

function StatCard({
  data,
  index,
}: {
  data: (typeof dataTypes)[0];
  index: number;
}) {
  const Icon = data.icon;
  const diff = data.todayUpdate - data.yesterdayUpdate;
  const diffPercent = ((diff / data.yesterdayUpdate) * 100).toFixed(1);
  const isPositive = diff >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="stat-card-light group"
      data-testid={`stat-card-${data.id}`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${data.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl`}
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div
            className="p-3 rounded-lg"
            style={{ backgroundColor: `${data.color}15` }}
          >
            <Icon
              className="w-6 h-6"
              style={{ color: data.color }}
              strokeWidth={1.5}
            />
          </div>
          <div
            className={`flex items-center gap-1 text-sm font-medium ${isPositive ? "text-emerald-600" : "text-red-500"}`}
          >
            {isPositive ? (
              <ArrowUpRight className="w-4 h-4" />
            ) : (
              <ArrowDownRight className="w-4 h-4" />
            )}
            <span data-testid={`diff-percent-${data.id}`}>{isPositive ? "+" : ""}{diffPercent}%</span>
          </div>
        </div>

        <h3 className="text-slate-500 text-sm font-medium mb-1">
          {data.name}
        </h3>
        <p
          className="text-3xl font-semibold tracking-tight text-slate-800 mb-4"
          data-testid={`total-count-${data.id}`}
        >
          {formatNumber(data.total)}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div>
            <p className="text-xs text-slate-400 mb-0.5">오늘 업데이트</p>
            <p
              className="text-lg font-semibold"
              style={{ color: data.color }}
              data-testid={`today-update-${data.id}`}
            >
              +{formatNumber(data.todayUpdate)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-400 mb-0.5">전일 대비</p>
            <p
              className={`text-lg font-semibold ${isPositive ? "text-emerald-600" : "text-red-500"}`}
              data-testid={`diff-count-${data.id}`}
            >
              {isPositive ? "+" : ""}
              {diff}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const chartColors = {
  특허: "hsl(217, 91%, 60%)",
  논문: "hsl(160, 84%, 39%)",
  뉴스: "hsl(43, 96%, 56%)",
  주식: "hsl(291, 64%, 42%)",
  외감기업: "hsl(12, 76%, 61%)",
};

function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white rounded-lg p-3 shadow-lg border border-slate-100">
        <p className="text-sm font-medium text-slate-800 mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-slate-500">{entry.name}:</span>
            <span className="font-medium text-slate-700">{formatNumber(entry.value)}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
}

const menuItems = [
  {
    id: "dashboard",
    name: "대시보드",
    icon: LayoutDashboard,
    path: "/",
  },
];

const dataMenuItems = [
  {
    id: "company-data",
    name: "기업데이터",
    icon: Building2,
    path: "/data/company",
  },
  {
    id: "patent-data",
    name: "특허데이터",
    icon: FileText,
    path: "/data/patent",
  },
  {
    id: "stock-data",
    name: "주식데이터",
    icon: TrendingUp,
    path: "/data/stock",
  },
  {
    id: "news-data",
    name: "뉴스데이터",
    icon: Newspaper,
    path: "/data/news",
  },
];

function Sidebar() {
  const [location] = useLocation();
  const [dataMenuOpen, setDataMenuOpen] = useState(true);

  return (
    <aside className="w-64 bg-slate-900 min-h-screen flex flex-col" data-testid="sidebar">
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-xl font-bold text-white tracking-tight">
          데이터 품질 센터
        </h1>
        <p className="text-xs text-slate-400 mt-1">Data Quality Center</p>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.path;
            return (
              <li key={item.id}>
                <Link
                  href={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                  data-testid={`menu-${item.id}`}
                >
                  <Icon className="w-5 h-5" strokeWidth={1.5} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-6">
          <button
            onClick={() => setDataMenuOpen(!dataMenuOpen)}
            className="flex items-center justify-between w-full px-4 py-3 text-slate-400 hover:text-white transition-colors"
            data-testid="menu-data-toggle"
          >
            <div className="flex items-center gap-3">
              <Database className="w-5 h-5" strokeWidth={1.5} />
              <span className="font-medium text-sm">내부 Data</span>
            </div>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${dataMenuOpen ? "rotate-180" : ""}`}
            />
          </button>

          <motion.ul
            initial={false}
            animate={{ height: dataMenuOpen ? "auto" : 0, opacity: dataMenuOpen ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden ml-4 space-y-1"
          >
            {dataMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location === item.path;
              return (
                <li key={item.id}>
                  <Link
                    href={item.path}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-blue-600/20 text-blue-400"
                        : "text-slate-400 hover:bg-slate-800 hover:text-white"
                    }`}
                    data-testid={`menu-${item.id}`}
                  >
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
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-medium">
            A
          </div>
          <div>
            <p className="text-sm font-medium text-white">Admin</p>
            <p className="text-xs text-slate-400">관리자</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState("daily");
  const now = new Date();
  const formattedDate = `${now.getFullYear()}년 ${now.getMonth() + 1}월 ${now.getDate()}일`;

  const getChartData = () => {
    switch (timeRange) {
      case "daily":
        return dailyData;
      case "weekly":
        return weeklyData;
      case "monthly":
        return monthlyData;
      case "yearly":
        return yearlyData;
      default:
        return dailyData;
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
          <div className="px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-semibold tracking-tight text-slate-800">
                  대시보드
                </h1>
                <p className="text-sm text-slate-500 mt-0.5">
                  데이터 수집 현황을 한눈에 확인하세요
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Calendar className="w-4 h-4" />
                  <span data-testid="current-date">{formattedDate}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 border-slate-200 hover:bg-slate-50 text-slate-700"
                  data-testid="refresh-button"
                >
                  <RefreshCw className="w-4 h-4" />
                  새로고침
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-8 bg-white">
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <h2 className="text-base font-semibold mb-6 text-slate-700">
              데이터 현황 요약
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
              {dataTypes.map((data, index) => (
                <StatCard key={data.id} data={data} index={index} />
              ))}
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-base font-semibold text-slate-700">
                데이터 수집 추이
              </h2>
              <Tabs
                value={timeRange}
                onValueChange={setTimeRange}
                className="w-auto"
              >
                <TabsList className="bg-slate-100 border border-slate-200">
                  <TabsTrigger
                    value="daily"
                    className="data-[state=active]:bg-white data-[state=active]:text-slate-800 data-[state=active]:shadow-sm text-slate-600"
                    data-testid="tab-daily"
                  >
                    일별
                  </TabsTrigger>
                  <TabsTrigger
                    value="weekly"
                    className="data-[state=active]:bg-white data-[state=active]:text-slate-800 data-[state=active]:shadow-sm text-slate-600"
                    data-testid="tab-weekly"
                  >
                    주별
                  </TabsTrigger>
                  <TabsTrigger
                    value="monthly"
                    className="data-[state=active]:bg-white data-[state=active]:text-slate-800 data-[state=active]:shadow-sm text-slate-600"
                    data-testid="tab-monthly"
                  >
                    월별
                  </TabsTrigger>
                  <TabsTrigger
                    value="yearly"
                    className="data-[state=active]:bg-white data-[state=active]:text-slate-800 data-[state=active]:shadow-sm text-slate-600"
                    data-testid="tab-yearly"
                  >
                    년별
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <div className="chart-container-light" data-testid="area-chart">
                <h3 className="text-sm font-medium text-slate-500 mb-6">
                  누적 데이터 추이 (뉴스 제외)
                </h3>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={getChartData()}>
                      <defs>
                        <linearGradient id="colorPatent" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={chartColors.특허} stopOpacity={0.2} />
                          <stop offset="95%" stopColor={chartColors.특허} stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorPaper" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={chartColors.논문} stopOpacity={0.2} />
                          <stop offset="95%" stopColor={chartColors.논문} stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorStock" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={chartColors.주식} stopOpacity={0.2} />
                          <stop offset="95%" stopColor={chartColors.주식} stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                      <XAxis
                        dataKey="date"
                        stroke="rgba(0,0,0,0.3)"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        stroke="rgba(0,0,0,0.3)"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => formatNumber(value)}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Area
                        type="monotone"
                        dataKey="특허"
                        stroke={chartColors.특허}
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorPatent)"
                      />
                      <Area
                        type="monotone"
                        dataKey="논문"
                        stroke={chartColors.논문}
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorPaper)"
                      />
                      <Area
                        type="monotone"
                        dataKey="주식"
                        stroke={chartColors.주식}
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorStock)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="chart-container-light" data-testid="bar-chart">
                <h3 className="text-sm font-medium text-slate-500 mb-6">
                  데이터별 수집량 비교
                </h3>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={getChartData()}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                      <XAxis
                        dataKey="date"
                        stroke="rgba(0,0,0,0.3)"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        stroke="rgba(0,0,0,0.3)"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => formatNumber(value)}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend
                        wrapperStyle={{ paddingTop: "20px" }}
                        formatter={(value) => (
                          <span className="text-slate-500 text-sm">{value}</span>
                        )}
                      />
                      <Bar dataKey="특허" fill={chartColors.특허} radius={[4, 4, 0, 0]} />
                      <Bar dataKey="논문" fill={chartColors.논문} radius={[4, 4, 0, 0]} />
                      <Bar dataKey="뉴스" fill={chartColors.뉴스} radius={[4, 4, 0, 0]} />
                      <Bar dataKey="주식" fill={chartColors.주식} radius={[4, 4, 0, 0]} />
                      <Bar dataKey="외감기업" fill={chartColors.외감기업} radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="mt-10"
          >
            <h2 className="text-base font-semibold text-slate-700 mb-6">
              데이터 상세 현황
            </h2>
            <div className="chart-container-light overflow-x-auto">
              <table className="w-full" data-testid="data-table">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-4 px-4 text-sm font-medium text-slate-500">
                      데이터 유형
                    </th>
                    <th className="text-right py-4 px-4 text-sm font-medium text-slate-500">
                      전체 데이터 수
                    </th>
                    <th className="text-right py-4 px-4 text-sm font-medium text-slate-500">
                      오늘 업데이트
                    </th>
                    <th className="text-right py-4 px-4 text-sm font-medium text-slate-500">
                      어제 업데이트
                    </th>
                    <th className="text-right py-4 px-4 text-sm font-medium text-slate-500">
                      전일 대비
                    </th>
                    <th className="text-right py-4 px-4 text-sm font-medium text-slate-500">
                      상태
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dataTypes.map((data) => {
                    const Icon = data.icon;
                    const diff = data.todayUpdate - data.yesterdayUpdate;
                    const isPositive = diff >= 0;
                    return (
                      <tr
                        key={data.id}
                        className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                        data-testid={`table-row-${data.id}`}
                      >
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div
                              className="p-2 rounded-lg"
                              style={{ backgroundColor: `${data.color}15` }}
                            >
                              <Icon
                                className="w-5 h-5"
                                style={{ color: data.color }}
                                strokeWidth={1.5}
                              />
                            </div>
                            <span className="font-medium text-slate-700">{data.name}</span>
                          </div>
                        </td>
                        <td className="text-right py-4 px-4 font-mono text-lg text-slate-800">
                          {data.total.toLocaleString()}
                        </td>
                        <td
                          className="text-right py-4 px-4 font-mono"
                          style={{ color: data.color }}
                        >
                          +{data.todayUpdate.toLocaleString()}
                        </td>
                        <td className="text-right py-4 px-4 font-mono text-slate-400">
                          +{data.yesterdayUpdate.toLocaleString()}
                        </td>
                        <td
                          className={`text-right py-4 px-4 font-mono ${isPositive ? "text-emerald-600" : "text-red-500"}`}
                        >
                          <div className="flex items-center justify-end gap-1">
                            {isPositive ? (
                              <ArrowUpRight className="w-4 h-4" />
                            ) : (
                              <ArrowDownRight className="w-4 h-4" />
                            )}
                            {isPositive ? "+" : ""}
                            {diff}
                          </div>
                        </td>
                        <td className="text-right py-4 px-4">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-600 border border-emerald-100">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            정상
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.section>
        </main>
      </div>
    </div>
  );
}
