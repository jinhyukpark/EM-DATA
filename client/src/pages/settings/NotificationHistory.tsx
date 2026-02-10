import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  Search,
  Filter,
  Download,
  Users
} from "lucide-react";
import { format } from "date-fns";

// Mock History Data
const mockHistory = Array.from({ length: 50 }).map((_, i) => {
  // Simulate multiple recipients for some entries
  const isMultiRecipient = i % 4 === 0;
  const recipientCount = isMultiRecipient ? Math.floor(Math.random() * 5) + 2 : 1;
  
  const allRecipients = [
    { name: "John Kim", email: "john.kim@company.com" },
    { name: "Sarah Lee", email: "sarah.lee@company.com" },
    { name: "Mike Park", email: "mike.park@company.com" },
    { name: "Emily Choi", email: "emily.choi@company.com" },
    { name: "David Wilson", email: "david.wilson@company.com" },
    { name: "Jessica Jung", email: "jessica.jung@company.com" }
  ];

  // Shuffle and pick recipients
  const recipients = isMultiRecipient 
    ? [...allRecipients].sort(() => 0.5 - Math.random()).slice(0, recipientCount)
    : [i % 2 === 0 ? allRecipients[0] : allRecipients[1]];

  return {
    id: `log-${i + 1}`,
    timestamp: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
    recipients: recipients,
    subject: i % 3 === 0 ? "Daily Stock Data Check Alert" : "Server Warning: AWS High Load",
    status: "Sent",
    trigger: i % 3 === 0 ? "[Stock Data > Today] EQUALS 0" : "[AWS > Warning] GREATER THAN 80"
  };
}).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

export default function NotificationHistory() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  
  const itemsPerPage = 10;
  
  // Filter logic
  const filteredHistory = mockHistory.filter(item => {
    // Search in any of the recipients or subject
    const matchesSearch = 
      item.recipients.some(r => r.name.toLowerCase().includes(searchTerm.toLowerCase()) || r.email.toLowerCase().includes(searchTerm.toLowerCase())) || 
      item.subject.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDate = date 
      ? new Date(item.timestamp).toDateString() === date.toDateString() 
      : true;
      
    return matchesSearch && matchesDate;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredHistory.length / itemsPerPage);
  const paginatedData = filteredHistory.slice(
    (currentPage - 1) * itemsPerPage, 
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-4">
      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              placeholder="Search recipient or subject..." 
              className="pl-9 bg-slate-50 border-slate-200"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={`w-[240px] justify-start text-left font-normal ${!date && "text-muted-foreground"}`}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Filter by date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(d) => {
                  setDate(d);
                  setCurrentPage(1);
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          {date && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => {
                setDate(undefined);
                setCurrentPage(1);
              }}
              className="text-slate-500 hover:text-red-600"
            >
              Clear Date
            </Button>
          )}
        </div>

        <Button variant="outline" className="gap-2 hidden sm:flex">
          <Download className="w-4 h-4" />
          Export CSV
        </Button>
      </div>

      {/* History Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="w-[180px]">Time Sent</TableHead>
              <TableHead className="w-[200px]">Recipient</TableHead>
              <TableHead>Subject & Trigger Condition</TableHead>
              <TableHead className="w-[100px] text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((log) => (
                <TableRow key={log.id} className="hover:bg-slate-50/50">
                  <TableCell className="font-medium text-slate-700">
                    <div className="flex flex-col">
                      <span className="text-sm">{format(new Date(log.timestamp), "MMM dd, yyyy")}</span>
                      <span className="text-xs text-slate-400">{format(new Date(log.timestamp), "HH:mm:ss")}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      {log.recipients.length === 1 ? (
                        <>
                          <span className="text-sm font-medium text-slate-800">{log.recipients[0].name}</span>
                          <span className="text-xs text-slate-500">{log.recipients[0].email}</span>
                        </>
                      ) : (
                        <div className="flex flex-col gap-1">
                          <span className="text-sm font-medium text-slate-800">{log.recipients[0].name}</span>
                          <TooltipProvider delayDuration={0}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="flex items-center gap-1.5 w-fit cursor-pointer hover:bg-slate-100 rounded px-1.5 py-0.5 -ml-1.5 transition-colors">
                                  <Users className="w-3 h-3 text-slate-400" />
                                  <span className="text-xs text-blue-600 font-medium">+ {log.recipients.length - 1} others</span>
                                </div>
                              </TooltipTrigger>
                              <TooltipContent className="p-3 bg-white border border-slate-200 shadow-lg">
                                <div className="flex flex-col gap-2">
                                  <span className="text-xs font-semibold text-slate-500 mb-1">Recipients ({log.recipients.length})</span>
                                  {log.recipients.map((r, idx) => (
                                    <div key={idx} className="flex flex-col">
                                      <span className="text-sm font-medium text-slate-800">{r.name}</span>
                                      <span className="text-xs text-slate-500">{r.email}</span>
                                    </div>
                                  ))}
                                </div>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-semibold text-slate-900">{log.subject}</span>
                      <span className="text-xs text-slate-500 font-mono bg-slate-100 px-1.5 py-0.5 rounded w-fit">
                        Trigger: {log.trigger}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
                      {log.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center text-slate-500">
                  No history found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-2">
          <p className="text-sm text-slate-500">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredHistory.length)} of {filteredHistory.length} entries
          </p>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <div className="text-sm font-medium text-slate-700">
              Page {currentPage} of {totalPages}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
