import { useState } from "react";
import { motion } from "framer-motion";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
    bgGradient: "from-blue-500/20 to-blue-600/5",
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
    bgGradient: "from-emerald-500/20 to-emerald-600/5",
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
    bgGradient: "from-yellow-500/20 to-yellow-600/5",
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
    bgGradient: "from-purple-500/20 to-purple-600/5",
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
    bgGradient: "from-orange-500/20 to-orange-600/5",
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
      className={`stat-card ${data.glowClass} group`}
      data-testid={`stat-card-${data.id}`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${data.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl`}
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div
            className="p-3 rounded-lg"
            style={{ backgroundColor: `${data.color}20` }}
          >
            <Icon
              className="w-6 h-6"
              style={{ color: data.color }}
              strokeWidth={1.5}
            />
          </div>
          <div
            className={`flex items-center gap-1 text-sm font-medium ${isPositive ? "text-emerald-400" : "text-red-400"}`}
          >
            {isPositive ? (
              <ArrowUpRight className="w-4 h-4" />
            ) : (
              <ArrowDownRight className="w-4 h-4" />
            )}
            <span data-testid={`diff-percent-${data.id}`}>{isPositive ? "+" : ""}{diffPercent}%</span>
          </div>
        </div>

        <h3 className="text-muted-foreground text-sm font-medium mb-1">
          {data.name}
        </h3>
        <p
          className="text-3xl font-semibold tracking-tight mb-4"
          data-testid={`total-count-${data.id}`}
        >
          {formatNumber(data.total)}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <div>
            <p className="text-xs text-muted-foreground mb-0.5">오늘 업데이트</p>
            <p
              className="text-lg font-semibold"
              style={{ color: data.color }}
              data-testid={`today-update-${data.id}`}
            >
              +{formatNumber(data.todayUpdate)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground mb-0.5">전일 대비</p>
            <p
              className={`text-lg font-semibold ${isPositive ? "text-emerald-400" : "text-red-400"}`}
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
      <div className="glass-card rounded-lg p-3 shadow-xl">
        <p className="text-sm font-medium text-foreground mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-muted-foreground">{entry.name}:</span>
            <span className="font-medium">{formatNumber(entry.value)}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
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
    <div className="min-h-screen bg-background">
      <header className="border-b border-white/5 sticky top-0 z-50 backdrop-blur-xl bg-background/80">
        <div className="max-w-[1600px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">
                데이터 품질 대시보드
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                사내 데이터 및 서비스 품질 모니터링
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span data-testid="current-date">{formattedDate}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 border-white/10 hover:bg-white/5"
                data-testid="refresh-button"
              >
                <RefreshCw className="w-4 h-4" />
                새로고침
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-6 py-8">
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h2 className="text-lg font-medium mb-6 text-muted-foreground">
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
            <h2 className="text-lg font-medium text-muted-foreground">
              데이터 수집 추이
            </h2>
            <Tabs
              value={timeRange}
              onValueChange={setTimeRange}
              className="w-auto"
            >
              <TabsList className="bg-white/5 border border-white/10">
                <TabsTrigger
                  value="daily"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  data-testid="tab-daily"
                >
                  일별
                </TabsTrigger>
                <TabsTrigger
                  value="weekly"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  data-testid="tab-weekly"
                >
                  주별
                </TabsTrigger>
                <TabsTrigger
                  value="monthly"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  data-testid="tab-monthly"
                >
                  월별
                </TabsTrigger>
                <TabsTrigger
                  value="yearly"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  data-testid="tab-yearly"
                >
                  년별
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div className="chart-container" data-testid="area-chart">
              <h3 className="text-sm font-medium text-muted-foreground mb-6">
                누적 데이터 추이 (뉴스 제외)
              </h3>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={getChartData()}>
                    <defs>
                      <linearGradient id="colorPatent" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={chartColors.특허} stopOpacity={0.3} />
                        <stop offset="95%" stopColor={chartColors.특허} stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorPaper" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={chartColors.논문} stopOpacity={0.3} />
                        <stop offset="95%" stopColor={chartColors.논문} stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorStock" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={chartColors.주식} stopOpacity={0.3} />
                        <stop offset="95%" stopColor={chartColors.주식} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis
                      dataKey="date"
                      stroke="rgba(255,255,255,0.3)"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="rgba(255,255,255,0.3)"
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

            <div className="chart-container" data-testid="bar-chart">
              <h3 className="text-sm font-medium text-muted-foreground mb-6">
                데이터별 수집량 비교
              </h3>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={getChartData()}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis
                      dataKey="date"
                      stroke="rgba(255,255,255,0.3)"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="rgba(255,255,255,0.3)"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => formatNumber(value)}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                      wrapperStyle={{ paddingTop: "20px" }}
                      formatter={(value) => (
                        <span className="text-muted-foreground text-sm">{value}</span>
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
          <h2 className="text-lg font-medium text-muted-foreground mb-6">
            데이터 상세 현황
          </h2>
          <div className="chart-container overflow-x-auto">
            <table className="w-full" data-testid="data-table">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">
                    데이터 유형
                  </th>
                  <th className="text-right py-4 px-4 text-sm font-medium text-muted-foreground">
                    전체 데이터 수
                  </th>
                  <th className="text-right py-4 px-4 text-sm font-medium text-muted-foreground">
                    오늘 업데이트
                  </th>
                  <th className="text-right py-4 px-4 text-sm font-medium text-muted-foreground">
                    어제 업데이트
                  </th>
                  <th className="text-right py-4 px-4 text-sm font-medium text-muted-foreground">
                    전일 대비
                  </th>
                  <th className="text-right py-4 px-4 text-sm font-medium text-muted-foreground">
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
                      className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                      data-testid={`table-row-${data.id}`}
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="p-2 rounded-lg"
                            style={{ backgroundColor: `${data.color}20` }}
                          >
                            <Icon
                              className="w-5 h-5"
                              style={{ color: data.color }}
                              strokeWidth={1.5}
                            />
                          </div>
                          <span className="font-medium">{data.name}</span>
                        </div>
                      </td>
                      <td className="text-right py-4 px-4 font-mono text-lg">
                        {data.total.toLocaleString()}
                      </td>
                      <td
                        className="text-right py-4 px-4 font-mono"
                        style={{ color: data.color }}
                      >
                        +{data.todayUpdate.toLocaleString()}
                      </td>
                      <td className="text-right py-4 px-4 font-mono text-muted-foreground">
                        +{data.yesterdayUpdate.toLocaleString()}
                      </td>
                      <td
                        className={`text-right py-4 px-4 font-mono ${isPositive ? "text-emerald-400" : "text-red-400"}`}
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
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
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
  );
}
