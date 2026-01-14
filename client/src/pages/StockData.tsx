import { useState } from "react";
import { motion } from "framer-motion";
import React from "react";
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
  Palette,
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
  const [columnColors, setColumnColors] = useState<Record<string, string>>({});
  const [activeColorPicker, setActiveColorPicker] = useState<string | null>(null);

  const colorOptions = [
    { name: 'Default', value: '' },
    { name: 'Red', value: '#ef4444' },
    { name: 'Orange', value: '#f97316' },
    { name: 'Amber', value: '#f59e0b' },
    { name: 'Green', value: '#84cc16' },
    { name: 'Emerald', value: '#10b981' },
    { name: 'Cyan', value: '#06b6d4' },
    { name: 'Blue', value: '#3b82f6' },
    { name: 'Indigo', value: '#6366f1' },
    { name: 'Purple', value: '#a855f7' },
    { name: 'Pink', value: '#ec4899' },
  ];
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

  const [searchField, setSearchField] = useState("all");

  const [columnWidths, setColumnWidths] = useState<Record<string, number>>({
    name: 200,
    symbol: 100,
    market: 100,
    price: 120,
    change: 100,
    volume: 120,
    marketCap: 120,
    per: 80,
    pbr: 80,
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
                  <div className="flex items-center h-9 border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500">
                    <select 
                      value={searchField} 
                      onChange={(e) => setSearchField(e.target.value)}
                      className="h-full pl-3 pr-8 text-xs bg-slate-50 border-r border-slate-200 text-slate-600 focus:outline-none cursor-pointer hover:bg-slate-100 transition-colors w-32 rounded-none appearance-none"
                      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748b' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.5rem center', backgroundSize: '1rem' }}
                    >
                      <option value="all">All Fields</option>
                      <option value="name">Name</option>
                      <option value="symbol">Symbol</option>
                    </select>
                    <div className="relative flex items-center flex-1 h-full min-w-[200px]">
                      <Search className="absolute left-3 w-3.5 h-3.5 text-slate-400" />
                      <Input 
                        placeholder="Search..." 
                        value={searchTerm} 
                        onChange={(e) => setSearchTerm(e.target.value)} 
                        className="pl-9 w-full border-none focus-visible:ring-0 text-sm h-full rounded-none" 
                        data-testid="search-input" 
                      />
                    </div>
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
                    <tr className="bg-slate-50/50 border-b border-slate-100">
                      <ResizableHeader id="name" label="Stock Name">
                        <div className="relative">
                          <button onClick={(e) => { e.stopPropagation(); setActiveColorPicker(activeColorPicker === 'name' ? null : 'name'); }} className="p-1 hover:bg-slate-200 rounded transition-colors">
                            <Palette className="w-3 h-3 text-slate-400" />
                          </button>
                          {activeColorPicker === 'name' && (
                            <div className="absolute left-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-slate-200 p-2 z-20 flex flex-wrap gap-1 w-32">
                              {colorOptions.map((color) => (
                                <button key={color.name} onClick={() => { setColumnColors(prev => ({ ...prev, name: color.value })); setActiveColorPicker(null); }} className="w-5 h-5 rounded-full border border-slate-200 hover:scale-110 transition-transform" style={{ backgroundColor: color.value || '#f1f5f9' }} title={color.name} />
                              ))}
                            </div>
                          )}
                        </div>
                      </ResizableHeader>
                      {visibleColumns.symbol && <ResizableHeader id="symbol" label="Symbol">
                        <div className="relative">
                          <button onClick={(e) => { e.stopPropagation(); setActiveColorPicker(activeColorPicker === 'symbol' ? null : 'symbol'); }} className="p-1 hover:bg-slate-200 rounded transition-colors">
                            <Palette className="w-3 h-3 text-slate-400" />
                          </button>
                          {activeColorPicker === 'symbol' && (
                            <div className="absolute left-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-slate-200 p-2 z-20 flex flex-wrap gap-1 w-32">
                              {colorOptions.map((color) => (
                                <button key={color.name} onClick={() => { setColumnColors(prev => ({ ...prev, symbol: color.value })); setActiveColorPicker(null); }} className="w-5 h-5 rounded-full border border-slate-200 hover:scale-110 transition-transform" style={{ backgroundColor: color.value || '#f1f5f9' }} title={color.name} />
                              ))}
                            </div>
                          )}
                        </div>
                      </ResizableHeader>}
                      {visibleColumns.market && <ResizableHeader id="market" label="Market" align="center">
                        <div className="relative">
                          <button onClick={(e) => { e.stopPropagation(); setActiveColorPicker(activeColorPicker === 'market' ? null : 'market'); }} className="p-1 hover:bg-slate-200 rounded transition-colors">
                            <Palette className="w-3 h-3 text-slate-400" />
                          </button>
                          {activeColorPicker === 'market' && (
                            <div className="absolute left-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-slate-200 p-2 z-20 flex flex-wrap gap-1 w-32">
                              {colorOptions.map((color) => (
                                <button key={color.name} onClick={() => { setColumnColors(prev => ({ ...prev, market: color.value })); setActiveColorPicker(null); }} className="w-5 h-5 rounded-full border border-slate-200 hover:scale-110 transition-transform" style={{ backgroundColor: color.value || '#f1f5f9' }} title={color.name} />
                              ))}
                            </div>
                          )}
                        </div>
                      </ResizableHeader>}
                      {visibleColumns.price && <ResizableHeader id="price" label="Price" align="right">
                        <div className="relative">
                          <button onClick={(e) => { e.stopPropagation(); setActiveColorPicker(activeColorPicker === 'price' ? null : 'price'); }} className="p-1 hover:bg-slate-200 rounded transition-colors">
                            <Palette className="w-3 h-3 text-slate-400" />
                          </button>
                          {activeColorPicker === 'price' && (
                            <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-slate-200 p-2 z-20 flex flex-wrap gap-1 w-32">
                              {colorOptions.map((color) => (
                                <button key={color.name} onClick={() => { setColumnColors(prev => ({ ...prev, price: color.value })); setActiveColorPicker(null); }} className="w-5 h-5 rounded-full border border-slate-200 hover:scale-110 transition-transform" style={{ backgroundColor: color.value || '#f1f5f9' }} title={color.name} />
                              ))}
                            </div>
                          )}
                        </div>
                      </ResizableHeader>}
                      {visibleColumns.change && <ResizableHeader id="change" label="Change" align="right">
                        <div className="relative">
                          <button onClick={(e) => { e.stopPropagation(); setActiveColorPicker(activeColorPicker === 'change' ? null : 'change'); }} className="p-1 hover:bg-slate-200 rounded transition-colors">
                            <Palette className="w-3 h-3 text-slate-400" />
                          </button>
                          {activeColorPicker === 'change' && (
                            <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-slate-200 p-2 z-20 flex flex-wrap gap-1 w-32">
                              {colorOptions.map((color) => (
                                <button key={color.name} onClick={() => { setColumnColors(prev => ({ ...prev, change: color.value })); setActiveColorPicker(null); }} className="w-5 h-5 rounded-full border border-slate-200 hover:scale-110 transition-transform" style={{ backgroundColor: color.value || '#f1f5f9' }} title={color.name} />
                              ))}
                            </div>
                          )}
                        </div>
                      </ResizableHeader>}
                      {visibleColumns.volume && <ResizableHeader id="volume" label="Volume" align="right">
                        <div className="relative">
                          <button onClick={(e) => { e.stopPropagation(); setActiveColorPicker(activeColorPicker === 'volume' ? null : 'volume'); }} className="p-1 hover:bg-slate-200 rounded transition-colors">
                            <Palette className="w-3 h-3 text-slate-400" />
                          </button>
                          {activeColorPicker === 'volume' && (
                            <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-slate-200 p-2 z-20 flex flex-wrap gap-1 w-32">
                              {colorOptions.map((color) => (
                                <button key={color.name} onClick={() => { setColumnColors(prev => ({ ...prev, volume: color.value })); setActiveColorPicker(null); }} className="w-5 h-5 rounded-full border border-slate-200 hover:scale-110 transition-transform" style={{ backgroundColor: color.value || '#f1f5f9' }} title={color.name} />
                              ))}
                            </div>
                          )}
                        </div>
                      </ResizableHeader>}
                      {visibleColumns.marketCap && <ResizableHeader id="marketCap" label="Market Cap" align="right">
                        <div className="relative">
                          <button onClick={(e) => { e.stopPropagation(); setActiveColorPicker(activeColorPicker === 'marketCap' ? null : 'marketCap'); }} className="p-1 hover:bg-slate-200 rounded transition-colors">
                            <Palette className="w-3 h-3 text-slate-400" />
                          </button>
                          {activeColorPicker === 'marketCap' && (
                            <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-slate-200 p-2 z-20 flex flex-wrap gap-1 w-32">
                              {colorOptions.map((color) => (
                                <button key={color.name} onClick={() => { setColumnColors(prev => ({ ...prev, marketCap: color.value })); setActiveColorPicker(null); }} className="w-5 h-5 rounded-full border border-slate-200 hover:scale-110 transition-transform" style={{ backgroundColor: color.value || '#f1f5f9' }} title={color.name} />
                              ))}
                            </div>
                          )}
                        </div>
                      </ResizableHeader>}
                      {visibleColumns.per && <ResizableHeader id="per" label="PER" align="right">
                        <div className="relative">
                          <button onClick={(e) => { e.stopPropagation(); setActiveColorPicker(activeColorPicker === 'per' ? null : 'per'); }} className="p-1 hover:bg-slate-200 rounded transition-colors">
                            <Palette className="w-3 h-3 text-slate-400" />
                          </button>
                          {activeColorPicker === 'per' && (
                            <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-slate-200 p-2 z-20 flex flex-wrap gap-1 w-32">
                              {colorOptions.map((color) => (
                                <button key={color.name} onClick={() => { setColumnColors(prev => ({ ...prev, per: color.value })); setActiveColorPicker(null); }} className="w-5 h-5 rounded-full border border-slate-200 hover:scale-110 transition-transform" style={{ backgroundColor: color.value || '#f1f5f9' }} title={color.name} />
                              ))}
                            </div>
                          )}
                        </div>
                      </ResizableHeader>}
                      {visibleColumns.pbr && <ResizableHeader id="pbr" label="PBR" align="right">
                        <div className="relative">
                          <button onClick={(e) => { e.stopPropagation(); setActiveColorPicker(activeColorPicker === 'pbr' ? null : 'pbr'); }} className="p-1 hover:bg-slate-200 rounded transition-colors">
                            <Palette className="w-3 h-3 text-slate-400" />
                          </button>
                          {activeColorPicker === 'pbr' && (
                            <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-slate-200 p-2 z-20 flex flex-wrap gap-1 w-32">
                              {colorOptions.map((color) => (
                                <button key={color.name} onClick={() => { setColumnColors(prev => ({ ...prev, pbr: color.value })); setActiveColorPicker(null); }} className="w-5 h-5 rounded-full border border-slate-200 hover:scale-110 transition-transform" style={{ backgroundColor: color.value || '#f1f5f9' }} title={color.name} />
                              ))}
                            </div>
                          )}
                        </div>
                      </ResizableHeader>}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStocks.map((stock) => (
                      <tr key={stock.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors" data-testid={`stock-row-${stock.id}`}>
                        <td className="py-3 px-6">
                          <span className="font-medium text-slate-800" style={{ color: columnColors.name || undefined }}>{stock.name}</span>
                        </td>
                        {visibleColumns.symbol && <td className="py-3 px-4 text-sm font-mono text-slate-500" style={{ color: columnColors.symbol || undefined }}>{stock.symbol}</td>}
                        {visibleColumns.market && (
                          <td className="py-3 px-4 text-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-blue-50 text-blue-600" style={{ color: columnColors.market || undefined, backgroundColor: columnColors.market ? undefined : undefined }}>{stock.market}</span>
                          </td>
                        )}
                        {visibleColumns.price && <td className="py-3 px-4 text-right text-sm font-mono text-slate-700" style={{ color: columnColors.price || undefined }}>₩{stock.price.toLocaleString()}</td>}
                        {visibleColumns.change && (
                          <td className="py-3 px-4 text-right text-sm font-mono">
                            <span className={stock.change >= 0 ? "text-emerald-600" : "text-red-500"} style={{ color: columnColors.change || undefined }}>
                              {stock.change >= 0 ? "+" : ""}{stock.change}%
                            </span>
                          </td>
                        )}
                        {visibleColumns.volume && <td className="py-3 px-4 text-right text-sm font-mono text-slate-600" style={{ color: columnColors.volume || undefined }}>{stock.volume.toLocaleString()}</td>}
                        {visibleColumns.marketCap && <td className="py-3 px-4 text-right text-sm font-mono text-slate-600" style={{ color: columnColors.marketCap || undefined }}>{stock.marketCap}</td>}
                        {visibleColumns.per && <td className="py-3 px-4 text-right text-sm font-mono text-slate-500" style={{ color: columnColors.per || undefined }}>{stock.per}</td>}
                        {visibleColumns.pbr && <td className="py-3 px-4 text-right text-sm font-mono text-slate-500" style={{ color: columnColors.pbr || undefined }}>{stock.pbr}</td>}
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
                <div className="flex items-center gap-2">
                  {(() => {
                    const totalPages = Math.ceil(filteredStocks.length / itemsPerPage);
                    const pages: (number | string)[] = [];
                    if (totalPages <= 7) {
                      for (let i = 1; i <= totalPages; i++) pages.push(i);
                    } else {
                      if (currentPage <= 4) {
                        pages.push(1, 2, 3, 4, 5, '...', totalPages);
                      } else if (currentPage >= totalPages - 3) {
                        pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
                      } else {
                        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
                      }
                    }
                    return (
                      <>
                        <div className="flex items-center gap-1">
                          <Button variant="outline" size="sm" disabled={currentPage === 1} onClick={() => setCurrentPage(1)} className="h-8 px-2 border-slate-200 text-slate-500 hover:text-slate-700">
                            <ChevronLeft className="w-4 h-4" /><ChevronLeft className="w-4 h-4 -ml-3" />
                          </Button>
                          <Button variant="outline" size="sm" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} className="h-8 px-2 border-slate-200 text-slate-500 hover:text-slate-700">
                            <ChevronLeft className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="flex items-center gap-1 mx-2">
                          {pages.map((page, idx) => (
                            typeof page === 'number' ? (
                              <button key={idx} onClick={() => setCurrentPage(page)} className={`h-8 min-w-[32px] px-2 text-sm rounded-lg transition-all ${currentPage === page ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}>{page}</button>
                            ) : (
                              <span key={idx} className="px-2 text-slate-300">•••</span>
                            )
                          ))}
                        </div>
                        <div className="flex items-center gap-1">
                          <Button variant="outline" size="sm" disabled={currentPage >= totalPages} onClick={() => setCurrentPage(currentPage + 1)} className="h-8 px-2 border-slate-200 text-slate-500 hover:text-slate-700">
                            <ChevronRight className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" disabled={currentPage >= totalPages} onClick={() => setCurrentPage(totalPages)} className="h-8 px-2 border-slate-200 text-slate-500 hover:text-slate-700">
                            <ChevronRight className="w-4 h-4" /><ChevronRight className="w-4 h-4 -ml-3" />
                          </Button>
                        </div>
                      </>
                    );
                  })()}
                </div>
              </div>
            </div>
          </motion.section>
        </main>
      </div>
    </div>
  );
}
