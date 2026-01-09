import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/Dashboard";
import CompanyData from "@/pages/CompanyData";
import Login from "@/pages/Login";
import Settings from "@/pages/Settings";
import QAReport from "@/pages/QAReport";
import AWSServers from "@/pages/AWSServers";

function Router() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/" component={Dashboard} />
      <Route path="/data/company" component={CompanyData} />
      <Route path="/settings/profile" component={Settings} />
      <Route path="/settings/users" component={Settings} />
      <Route path="/settings/permissions" component={Settings} />
      <Route path="/qa-report" component={QAReport} />
      <Route path="/servers/aws" component={AWSServers} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
