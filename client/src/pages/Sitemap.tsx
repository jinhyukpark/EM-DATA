import React from "react";
import { Link } from "wouter";
import {
  LayoutDashboard,
  ClipboardCheck,
  Building2,
  FileText,
  TrendingUp,
  Newspaper,
  Lightbulb,
  UserCog,
  Cloud,
  Settings,
  Map,
  ArrowRight
} from "lucide-react";
import Sidebar from "@/components/Sidebar";

export default function Sitemap() {
  const sections = [
    {
      title: "Main",
      items: [
        { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard, description: "Overview of system status and key metrics" },
        { name: "QA Report", path: "/qa-report", icon: ClipboardCheck, description: "Quality assurance reports and test procedures" },
      ]
    },
    {
      title: "Internal Data",
      items: [
        { name: "Company Data", path: "/data/company", icon: Building2, description: "Corporate information and registry" },
        { name: "Patent Data", path: "/data/patent", icon: FileText, description: "Patent filings and intellectual property" },
        { name: "Paper Data", path: "/data/paper", icon: FileText, description: "Research papers and publications" },
        { name: "Stock Data", path: "/data/stock", icon: TrendingUp, description: "Market data and stock performance" },
        { name: "News Data", path: "/data/news", icon: Newspaper, description: "News articles and media monitoring" },
        { name: "R&D Data", path: "/data/rnd", icon: Lightbulb, description: "Research and development projects" },
        { name: "Employment Data", path: "/data/employment", icon: UserCog, description: "HR and employment statistics" },
      ]
    },
    {
      title: "Server Management",
      items: [
        { name: "AWS Servers", path: "/servers/aws", icon: Cloud, description: "Amazon Web Services infrastructure" },
        { name: "GCP Servers", path: "/servers/gcp", icon: Cloud, description: "Google Cloud Platform resources" },
        { name: "NCloud Servers", path: "/servers/ncloud", icon: Cloud, description: "Naver Cloud Platform services" },
      ]
    },
    {
      title: "System",
      items: [
        { name: "Settings", path: "/settings", icon: Settings, description: "System configuration and preferences" },
        { name: "Login", path: "/login", icon: UserCog, description: "Authentication page" },
      ]
    }
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <div className="hidden lg:block flex-shrink-0">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <header className="bg-white border-b border-slate-200 flex-shrink-0 z-40">
          <div className="px-4 md:px-8 py-4 flex items-center gap-3">
            <Map className="w-6 h-6 text-blue-600" />
            <div>
              <h1 className="text-xl font-bold text-slate-900">Sitemap</h1>
              <p className="text-sm text-slate-500">Overview of application structure and pages</p>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto space-y-10">
            {sections.map((section, index) => (
              <div key={index}>
                <h2 className="text-lg font-semibold text-slate-800 mb-4 pl-1 border-l-4 border-blue-500">{section.title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {section.items.map((item, itemIndex) => (
                    <Link key={itemIndex} href={item.path}>
                      <div className="group bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all cursor-pointer h-full flex flex-col">
                        <div className="flex items-start justify-between mb-3">
                          <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                            <item.icon className="w-5 h-5 text-blue-600" />
                          </div>
                          <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 transform group-hover:translate-x-1 transition-all" />
                        </div>
                        <h3 className="font-semibold text-slate-900 mb-1 group-hover:text-blue-700 transition-colors">{item.name}</h3>
                        <p className="text-sm text-slate-500 line-clamp-2">{item.description}</p>
                        <div className="mt-auto pt-3 flex items-center text-xs font-mono text-slate-400">
                          {item.path}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
