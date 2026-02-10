import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ExternalLink, Mail } from "lucide-react";

export default function EmailTemplates() {
  const [activeTemplate, setActiveTemplate] = useState("server-alert");

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <Sidebar />
      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <Mail className="w-6 h-6 text-blue-600" />
                Email Template Preview
              </h1>
              <p className="text-slate-500 mt-1">Preview responsive HTML email templates</p>
            </div>
            <div className="flex gap-3">
                <Button variant="outline" className="gap-2" onClick={() => window.open(`/templates/${activeTemplate}.html`, '_blank')}>
                    <ExternalLink className="w-4 h-4" />
                    Open Raw HTML
                </Button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <Tabs defaultValue="server-alert" className="w-full" onValueChange={setActiveTemplate}>
              <div className="border-b border-slate-200 px-6 py-3 bg-slate-50/50">
                <TabsList>
                  <TabsTrigger value="server-alert">Server Alert</TabsTrigger>
                  <TabsTrigger value="data-check">Daily Data Report</TabsTrigger>
                </TabsList>
              </div>

              <div className="p-6 bg-slate-100/50 min-h-[800px] flex justify-center">
                <TabsContent value="server-alert" className="w-full max-w-[800px] mt-0">
                  <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden h-[800px]">
                    <iframe 
                        src="/templates/server-alert.html" 
                        className="w-full h-full border-0"
                        title="Server Alert Template"
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="data-check" className="w-full max-w-[800px] mt-0">
                  <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden h-[800px]">
                    <iframe 
                        src="/templates/data-check.html" 
                        className="w-full h-full border-0"
                        title="Data Check Template"
                    />
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}
