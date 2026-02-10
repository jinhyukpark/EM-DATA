import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings2, History } from "lucide-react";
import NotificationSettings from "./NotificationSettings";
import NotificationHistory from "./NotificationHistory";

export default function EmailNotifications() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <div>
            <h3 className="text-lg font-semibold text-slate-800">Email Notifications</h3>
            <p className="text-sm text-slate-500 mt-1">Manage alerts and view notification history</p>
        </div>
      </div>

      <Tabs defaultValue="settings" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-[400px] mb-6">
          <TabsTrigger value="settings" className="gap-2">
            <Settings2 className="w-4 h-4" />
            Configuration
          </TabsTrigger>
          <TabsTrigger value="history" className="gap-2">
            <History className="w-4 h-4" />
            Sent History
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="settings" className="animate-in fade-in-50 duration-300">
          <NotificationSettings />
        </TabsContent>
        
        <TabsContent value="history" className="animate-in fade-in-50 duration-300">
          <NotificationHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
}
