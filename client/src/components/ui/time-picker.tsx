import * as React from "react";
import { Clock } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { ScrollArea } from "./scroll-area";
import { cn } from "@/lib/utils";

export interface TimePickerProps {
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export function TimePicker({ value, onChange, className }: TimePickerProps) {
  // Parse value to internal state
  const parseTime = (timeStr?: string) => {
    if (!timeStr) return { hour: "12", minute: "00", ampm: "AM" };
    
    try {
      const [h, m] = timeStr.split(":");
      let hourNum = parseInt(h, 10);
      const ampm = hourNum >= 12 ? "PM" : "AM";
      
      if (hourNum === 0) hourNum = 12;
      else if (hourNum > 12) hourNum -= 12;
      
      return { 
        hour: hourNum.toString().padStart(2, "0"), 
        minute: m || "00", 
        ampm 
      };
    } catch {
      return { hour: "12", minute: "00", ampm: "AM" };
    }
  };

  const [time, setTime] = React.useState(parseTime(value));
  const [isOpen, setIsOpen] = React.useState(false);

  // Update internal state when value prop changes
  React.useEffect(() => {
    if (value) {
      setTime(parseTime(value));
    }
  }, [value]);

  const updateTime = (updates: Partial<typeof time>) => {
    const newTime = { ...time, ...updates };
    setTime(newTime);
    
    // Format to 24h format for onChange (HH:MM)
    if (onChange) {
      let hourNum = parseInt(newTime.hour, 10);
      if (newTime.ampm === "PM" && hourNum < 12) hourNum += 12;
      if (newTime.ampm === "AM" && hourNum === 12) hourNum = 0;
      
      const formattedValue = `${hourNum.toString().padStart(2, "0")}:${newTime.minute}`;
      onChange(formattedValue);
    }
  };

  const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, "0"));
  const minutes = Array.from({ length: 12 }, (_, i) => (i * 5).toString().padStart(2, "0"));

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen} modal={false}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[140px] justify-start text-left font-normal bg-white h-9 px-3",
            !value && "text-muted-foreground",
            className
          )}
        >
          <Clock className="mr-2 h-4 w-4 text-slate-500" />
          {value ? (
            <span className="text-slate-700">
              {time.ampm === "AM" ? "오전" : "오후"} {time.hour}:{time.minute}
            </span>
          ) : (
            <span>시간 선택</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-1 bg-white border border-slate-200 shadow-none rounded-xl" align="start">
        <div className="flex h-[200px]">
          {/* AM/PM Column */}
          <div className="flex flex-col gap-1 w-[60px] p-1">
            <button 
              className={cn("flex-1 flex items-center justify-center rounded-lg text-sm transition-all", time.ampm === "AM" ? "bg-slate-100 text-slate-900 font-semibold" : "text-slate-500 hover:bg-slate-50 hover:text-slate-700")}
              onClick={(e) => { e.preventDefault(); updateTime({ ampm: "AM" }); }}
            >
              오전
            </button>
            <button 
              className={cn("flex-1 flex items-center justify-center rounded-lg text-sm transition-all", time.ampm === "PM" ? "bg-slate-100 text-slate-900 font-semibold" : "text-slate-500 hover:bg-slate-50 hover:text-slate-700")}
              onClick={(e) => { e.preventDefault(); updateTime({ ampm: "PM" }); }}
            >
              오후
            </button>
          </div>
          
          <div className="w-px bg-slate-100 my-2" />
          
          {/* Hours Column */}
          <div 
            className="w-[60px] h-full overflow-y-auto scrollbar-hide" 
            style={{ WebkitOverflowScrolling: 'touch' }}
            onWheel={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-1 p-1 pb-[160px]">
              {hours.map((h) => (
                <button
                  key={h}
                  type="button"
                  className={cn("min-h-10 h-10 flex items-center justify-center w-full shrink-0 text-sm rounded-lg transition-all", time.hour === h ? "bg-blue-50 text-blue-600 font-semibold" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900")}
                  onClick={(e) => { e.preventDefault(); updateTime({ hour: h }); }}
                >
                  {h}
                </button>
              ))}
            </div>
          </div>
          
          <div className="w-px bg-slate-100 my-2" />
          
          {/* Minutes Column */}
          <div 
            className="w-[60px] h-full overflow-y-auto scrollbar-hide" 
            style={{ WebkitOverflowScrolling: 'touch' }}
            onWheel={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-1 p-1 pb-[160px]">
              {minutes.map((m) => (
                <button
                  key={m}
                  type="button"
                  className={cn("min-h-10 h-10 flex items-center justify-center w-full shrink-0 text-sm rounded-lg transition-all", time.minute === m ? "bg-blue-50 text-blue-600 font-semibold" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900")}
                  onClick={(e) => { e.preventDefault(); updateTime({ minute: m }); }}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
