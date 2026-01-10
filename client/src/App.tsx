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
import GCPServers from "@/pages/GCPServers";
import NCloudServers from "@/pages/NCloudServers";
import PatentData from "@/pages/PatentData";
import StockData from "@/pages/StockData";
import NewsData from "@/pages/NewsData";
import RnDData from "@/pages/RnDData";
import EmploymentData from "@/pages/EmploymentData";
import PaperData from "@/pages/PaperData";
import AddTestProcedure from "@/pages/AddTestProcedure";

function Router() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/" component={Dashboard} />
      <Route path="/data/company" component={CompanyData} />
      <Route path="/data/patent" component={PatentData} />
      <Route path="/data/paper" component={PaperData} />
      <Route path="/data/stock" component={StockData} />
      <Route path="/data/news" component={NewsData} />
      <Route path="/data/rnd" component={RnDData} />
      <Route path="/data/employment" component={EmploymentData} />
      <Route path="/settings/profile" component={Settings} />
      <Route path="/settings/users" component={Settings} />
      <Route path="/settings/permissions" component={Settings} />
      <Route path="/qa-report" component={QAReport} />
      <Route path="/qa-report/add" component={AddTestProcedure} />
      <Route path="/servers/aws" component={AWSServers} />
      <Route path="/servers/gcp" component={GCPServers} />
      <Route path="/servers/ncloud" component={NCloudServers} />
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
