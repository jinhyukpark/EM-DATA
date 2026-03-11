import * as React from "react";
import { Clock } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
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
    <Popover open={isOpen} onOpenChange={setIsOpen}>
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
      <PopoverContent className="w-auto p-3" align="start">
        <div className="flex gap-2 h-[200px]">
          {/* AM/PM Column */}
          <div className="flex flex-col gap-1 w-[60px] overflow-hidden">
            <Button 
              variant="ghost" 
              className={cn("h-10", time.ampm === "AM" ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground" : "hover:bg-slate-100")}
              onClick={() => updateTime({ ampm: "AM" })}
            >
              오전
            </Button>
            <Button 
              variant="ghost" 
              className={cn("h-10", time.ampm === "PM" ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground" : "hover:bg-slate-100")}
              onClick={() => updateTime({ ampm: "PM" })}
            >
              오후
            </Button>
          </div>
          
          <div className="w-px bg-border" />
          
          {/* Hours Column */}
          <div className="flex flex-col w-[60px] overflow-y-auto no-scrollbar scroll-smooth snap-y pr-1">
            {hours.map((h) => (
              <Button
                key={h}
                variant="ghost"
                className={cn("min-h-10 h-10 w-full shrink-0", time.hour === h ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground" : "hover:bg-slate-100")}
                onClick={() => updateTime({ hour: h })}
              >
                {h}
              </Button>
            ))}
          </div>
          
          <div className="w-px bg-border" />
          
          {/* Minutes Column */}
          <div className="flex flex-col w-[60px] overflow-y-auto no-scrollbar scroll-smooth snap-y pr-1">
            {minutes.map((m) => (
              <Button
                key={m}
                variant="ghost"
                className={cn("min-h-10 h-10 w-full shrink-0", time.minute === m ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground" : "hover:bg-slate-100")}
                onClick={() => updateTime({ minute: m })}
              >
                {m}
              </Button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
