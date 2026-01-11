import { useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Search,
  Download,
  Clock,
  Activity,
  Columns,
  Check,
  BarChart3,
  Menu,
} from "lucide-react";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const stocks = [
  { id: 1, symbol: "005930", name: "Samsung Electronics", market: "KOSPI", price: 71500, change: 1.2, volume: 12450000, marketCap: "426.8T", per: 12.5, pbr: 1.2, lastUpdate: "2025-01-09 15:30" },
  { id: 2, symbol: "000660", name: "SK Hynix", market: "KOSPI", price: 178000, change: -0.8, volume: 3210000, marketCap: "129.5T", per: 8.2, pbr: 1.8, lastUpdate: "2025-01-09 15:30" },
  { id: 3, symbol: "005380", name: "Hyundai Motor", market: "KOSPI", price: 245500, change: 2.5, volume: 890000, marketCap: "51.2T", per: 5.8, pbr: 0.6, lastUpdate: "2025-01-09 15:30" },
  { id: 4, symbol: "035420", name: "NAVER", market: "KOSPI", price: 215000, change: -1.5, volume: 1520000, marketCap: "35.3T", per: 32.1, pbr: 1.4, lastUpdate: "2025-01-09 15:30" },
  { id: 5, symbol: "035720", name: "Kakao", market: "KOSPI", price: 48500, change: 0.8, volume: 4850000, marketCap: "21.6T", per: 45.2, pbr: 1.1, lastUpdate: "2025-01-09 15:30" },
  { id: 6, symbol: "066570", name: "LG Electronics", market: "KOSPI", price: 98500, change: 1.1, volume: 520000, marketCap: "16.1T", per: 9.8, pbr: 0.8, lastUpdate: "2025-01-09 15:30" },
  { id: 7, symbol: "051910", name: "LG Chem", market: "KOSPI", price: 412000, change: -2.1, volume: 280000, marketCap: "29.1T", per: 15.4, pbr: 1.3, lastUpdate: "2025-01-09 15:30" },
  { id: 8, symbol: "006400", name: "Samsung SDI", market: "KOSPI", price: 385000, change: 0.5, volume: 195000, marketCap: "26.5T", per: 18.2, pbr: 1.5, lastUpdate: "2025-01-09 15:30" },
];

export default function StockData() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMarket, setSelectedMarket] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showColumnSelector, setShowColumnSelector] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState({
    symbol: true,
    market: true,
    price: true,
    change: true,
    volume: true,
    marketCap: true,
    per: true,
    pbr: true,
  });

  const columnLabels: Record<string, string> = {
    symbol: "Symbol",
    market: "Market",
    price: "Price",
    change: "Change",
    volume: "Volume",
    marketCap: "Market Cap",
    per: "PER",
    pbr: "PBR",
  };

  const toggleColumn = (col: string) => {
    setVisibleColumns(prev => ({ ...prev, [col]: !prev[col as keyof typeof prev] }));
  };

  const totalStocks = 2847;

  const filteredStocks = stocks.filter((stock) => {
    const matchesSearch = stock.name.toLowerCase().includes(searchTerm.toLowerCase()) || stock.symbol.includes(searchTerm);
    const matchesMarket = selectedMarket === "All" || stock.market === selectedMarket;
    return matchesSearch && matchesMarket;
  });

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
                  <h1 className="text-lg md:text-xl font-semibold tracking-tight text-slate-800 truncate">Stock Data</h1>
                  <p className="text-xs md:text-sm text-slate-500 mt-0.5 hidden sm:block">Real-time market data</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="gap-2 border-slate-200 hover:bg-slate-50 text-slate-700" data-testid="export-button">
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export</span>
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6 bg-slate-50/50 overflow-x-hidden">
          <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="mb-6">
            <div className="flex items-center gap-8 py-4 px-6 bg-white rounded-xl border border-slate-100">
              <div className="flex items-center gap-3">
                <BarChart3 className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wide">Total Stocks</p>
                  <p className="text-xl font-bold text-slate-800">{totalStocks.toLocaleString()}</p>
                </div>
              </div>
              <div className="w-px h-10 bg-slate-200" />
              <div className="flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-emerald-500" />
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wide">Gainers</p>
                  <p className="text-xl font-bold text-emerald-600">1,521</p>
                </div>
              </div>
              <div className="w-px h-10 bg-slate-200" />
              <div className="flex items-center gap-3">
                <TrendingDown className="w-5 h-5 text-red-500" />
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wide">Losers</p>
                  <p className="text-xl font-bold text-red-600">982</p>
                </div>
              </div>
              <div className="w-px h-10 bg-slate-200" />
              <div className="flex items-center gap-3">
                <Activity className="w-5 h-5 text-amber-500" />
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wide">Unchanged</p>
                  <p className="text-xl font-bold text-slate-800">344</p>
                </div>
              </div>
              <div className="w-px h-10 bg-slate-200" />
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-cyan-500" />
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wide">Update Cycle</p>
                  <p className="text-xl font-bold text-slate-800">Real-time</p>
                </div>
              </div>
            </div>
          </motion.section>

          <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.3 }}>
            <div className="bg-white rounded-xl border border-slate-100">
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                <h2 className="text-sm font-medium text-slate-800">Stock Records</h2>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-9 w-48 h-9 border-slate-200 text-sm" data-testid="search-input" />
                  </div>
                  <div className="relative">
                    <select value={selectedMarket} onChange={(e) => setSelectedMarket(e.target.value)} className="pl-3 pr-8 py-2 h-9 border border-slate-200 rounded-lg text-sm bg-white text-slate-600 appearance-none cursor-pointer" data-testid="market-filter">
                      <option value="All">All Markets</option>
                      <option value="KOSPI">KOSPI</option>
                      <option value="KOSDAQ">KOSDAQ</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                  <div className="relative">
                    <button
                      onClick={() => setShowColumnSelector(!showColumnSelector)}
                      className="flex items-center gap-2 px-3 h-9 border border-slate-200 rounded-lg text-sm bg-white text-slate-600 hover:bg-slate-50 transition-colors"
                      data-testid="column-selector-button"
                    >
                      <Columns className="w-4 h-4" />
                      Fields
                    </button>
                    {showColumnSelector && (
                      <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-10">
                        {Object.entries(columnLabels).map(([key, label]) => (
                          <button
                            key={key}
                            onClick={() => toggleColumn(key)}
                            className="flex items-center justify-between w-full px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
                          >
                            <span>{label}</span>
                            {visibleColumns[key as keyof typeof visibleColumns] && (
                              <Check className="w-4 h-4 text-blue-500" />
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full" data-testid="stock-table">
                  <thead>
                    <tr className="bg-slate-50/50">
                      <th className="text-left py-3 px-6 text-xs font-medium text-slate-400 uppercase tracking-wide">Stock Name</th>
                      {visibleColumns.symbol && <th className="text-left py-3 px-4 text-xs font-medium text-slate-400 uppercase tracking-wide">Symbol</th>}
                      {visibleColumns.market && <th className="text-center py-3 px-4 text-xs font-medium text-slate-400 uppercase tracking-wide">Market</th>}
                      {visibleColumns.price && <th className="text-right py-3 px-4 text-xs font-medium text-slate-400 uppercase tracking-wide">Price</th>}
                      {visibleColumns.change && <th className="text-right py-3 px-4 text-xs font-medium text-slate-400 uppercase tracking-wide">Change</th>}
                      {visibleColumns.volume && <th className="text-right py-3 px-4 text-xs font-medium text-slate-400 uppercase tracking-wide">Volume</th>}
                      {visibleColumns.marketCap && <th className="text-right py-3 px-4 text-xs font-medium text-slate-400 uppercase tracking-wide">Market Cap</th>}
                      {visibleColumns.per && <th className="text-right py-3 px-4 text-xs font-medium text-slate-400 uppercase tracking-wide">PER</th>}
                      {visibleColumns.pbr && <th className="text-right py-3 px-4 text-xs font-medium text-slate-400 uppercase tracking-wide">PBR</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStocks.map((stock) => (
                      <tr key={stock.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors" data-testid={`stock-row-${stock.id}`}>
                        <td className="py-3 px-6">
                          <span className="font-medium text-slate-800">{stock.name}</span>
                        </td>
                        {visibleColumns.symbol && <td className="py-3 px-4 text-sm font-mono text-slate-500">{stock.symbol}</td>}
                        {visibleColumns.market && (
                          <td className="py-3 px-4 text-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-blue-50 text-blue-600">{stock.market}</span>
                          </td>
                        )}
                        {visibleColumns.price && <td className="py-3 px-4 text-right text-sm font-mono text-slate-700">₩{stock.price.toLocaleString()}</td>}
                        {visibleColumns.change && (
                          <td className="py-3 px-4 text-right text-sm font-mono">
                            <span className={stock.change >= 0 ? "text-emerald-600" : "text-red-500"}>
                              {stock.change >= 0 ? "+" : ""}{stock.change}%
                            </span>
                          </td>
                        )}
                        {visibleColumns.volume && <td className="py-3 px-4 text-right text-sm font-mono text-slate-600">{stock.volume.toLocaleString()}</td>}
                        {visibleColumns.marketCap && <td className="py-3 px-4 text-right text-sm font-mono text-slate-600">{stock.marketCap}</td>}
                        {visibleColumns.per && <td className="py-3 px-4 text-right text-sm font-mono text-slate-500">{stock.per}</td>}
                        {visibleColumns.pbr && <td className="py-3 px-4 text-right text-sm font-mono text-slate-500">{stock.pbr}</td>}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100">
                <div className="flex items-center gap-4">
                  <p className="text-xs text-slate-400">Showing {filteredStocks.length} of {totalStocks.toLocaleString()} stocks</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">Show</span>
                    <select
                      value={itemsPerPage}
                      onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                      className="border border-slate-200 rounded-md px-2 py-1 text-xs text-slate-700 bg-white"
                      data-testid="items-per-page"
                    >
                      <option value={10}>10</option>
                      <option value={25}>25</option>
                      <option value={50}>50</option>
                      <option value={100}>100</option>
                    </select>
                    <span className="text-xs text-slate-500">per page</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} className="h-8 w-8 p-0">
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <span className="text-xs text-slate-500 px-2">Page {currentPage}</span>
                  <Button variant="ghost" size="sm" onClick={() => setCurrentPage(currentPage + 1)} className="h-8 w-8 p-0">
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.section>
        </main>
      </div>
    </div>
  );
}
