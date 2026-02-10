import { Switch, Route, Router } from "wouter";
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
import IDCServers from "@/pages/IDCServers";
import PatentData from "@/pages/PatentData";
import StockData from "@/pages/StockData";
import NewsData from "@/pages/NewsData";
import FinanceData from "@/pages/FinanceData";
import EmploymentData from "@/pages/EmploymentData";
import PaperData from "@/pages/PaperData";
import DisclosureData from "@/pages/DisclosureData";
import AddTestProcedure from "@/pages/AddTestProcedure";
import TestDetail from "@/pages/TestDetail";
import EmailTemplates from "@/pages/EmailTemplates";

const BASE_PATH = import.meta.env.BASE_URL.replace(/\/$/, '') || '';

function AppRouter() {
  return (
    <Router base={BASE_PATH}>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/" component={Login} />
        <Route path="/data/company" component={CompanyData} />
        <Route path="/data/patent" component={PatentData} />
        <Route path="/data/paper" component={PaperData} />
        <Route path="/data/disclosure" component={DisclosureData} />
        <Route path="/data/stock" component={StockData} />
        <Route path="/data/news" component={NewsData} />
        <Route path="/data/finance" component={FinanceData} />
        <Route path="/data/employment" component={EmploymentData} />
        <Route path="/settings" component={Settings} />
        <Route path="/settings/profile" component={Settings} />
        <Route path="/settings/users" component={Settings} />
        <Route path="/settings/permissions" component={Settings} />
        <Route path="/qa-report" component={QAReport} />
        <Route path="/qa-report/add" component={AddTestProcedure} />
        <Route path="/qa-report/edit/:id" component={AddTestProcedure} />
        <Route path="/qa-report/test/:id" component={TestDetail} />
        <Route path="/servers/aws" component={AWSServers} />
        <Route path="/servers/gcp" component={GCPServers} />
        <Route path="/servers/idc" component={IDCServers} />
        <Route path="/email-templates" component={EmailTemplates} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <AppRouter />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
