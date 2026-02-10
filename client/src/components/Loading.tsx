import React from "react";
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-slate-50/80 backdrop-blur-sm absolute inset-0 z-50">
      <Loader2 className="h-10 w-10 text-blue-500 animate-spin mb-4" />
      <p className="text-slate-500 font-medium">Loading data...</p>
    </div>
  );
}
