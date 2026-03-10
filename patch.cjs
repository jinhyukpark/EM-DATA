const fs = require('fs');

const pages = ['client/src/pages/AWSServers.tsx', 'client/src/pages/GCPServers.tsx'];

pages.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // 1. Imports
  content = content.replace(
    /import \{ useState \} from "react";\nimport \{ motion \} from "framer-motion";\nimport \{/,
    `import { useState, useMemo } from "react";\nimport { motion } from "framer-motion";\nimport {`
  );
  
  content = content.replace(
    /Globe,\n\} from "lucide-react";/,
    `Globe,\n  ChevronDown,\n} from "lucide-react";`
  );

  content = content.replace(
    /\} from "recharts";/,
    `} from "recharts";\nimport {\n  DropdownMenu,\n  DropdownMenuContent,\n  DropdownMenuGroup,\n  DropdownMenuItem,\n  DropdownMenuLabel,\n  DropdownMenuSeparator,\n  DropdownMenuTrigger,\n} from "@/components/ui/dropdown-menu";`
  );

  // 2. Component Setup
  content = content.replace(
    /const \[sidebarOpen, setSidebarOpen\] = useState\(false\);\n\n  return \(/,
    `const [sidebarOpen, setSidebarOpen] = useState(false);\n  const [timeRange, setTimeRange] = useState("1주");\n\n  const statusData = useMemo(() => {\n    let points = 7;\n    let labelGen = (i: number) => \`\${i}\`;\n    \n    if (timeRange.includes("시간")) {\n      points = 6;\n      const hours = parseInt(timeRange);\n      const step = (hours * 60) / 5;\n      labelGen = (i) => \`-\${Math.round((5 - i) * step)}분\`;\n    } else if (timeRange.includes("일")) {\n      const days = parseInt(timeRange);\n      points = 6;\n      labelGen = (i) => days === 1 ? \`-\${(5-i)*4}시간\` : \`-\${(5-i)*Math.ceil(days/5)}일\`;\n    } else if (timeRange.includes("주")) {\n      const weeks = parseInt(timeRange);\n      points = weeks >= 4 ? weeks : 7;\n      labelGen = (i) => weeks >= 4 ? \`-\${points-i-1}주\` : \`-\${points-i-1}일\`;\n    }\n\n    return Array.from({ length: points }).map((_, i) => {\n      const isLast = i === points - 1;\n      return {\n        date: isLast ? '현재' : labelGen(i),\n        success: Math.floor(Math.random() * 5) + 8,\n        warning: Math.floor(Math.random() * 2),\n        error: Math.floor(Math.random() * 2),\n      };\n    });\n  }, [timeRange]);\n\n  return (`
  );

  // 3. UI
  content = content.replace(
    /<h2 className="text-sm font-medium text-slate-800">Daily Status Overview<\/h2>/,
    `<div className="flex items-center gap-2">\n                  <h2 className="text-sm font-medium text-slate-800">Status Overview</h2>\n                  <DropdownMenu>\n                    <DropdownMenuTrigger asChild>\n                      <Button variant="outline" size="sm" className="h-7 text-xs gap-1 px-2 border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600">\n                        {timeRange}\n                        <ChevronDown className="w-3 h-3 text-slate-400" />\n                      </Button>\n                    </DropdownMenuTrigger>\n                    <DropdownMenuContent align="start" className="w-40">\n                      <DropdownMenuGroup>\n                        <DropdownMenuLabel className="text-xs text-slate-500 font-medium">시간</DropdownMenuLabel>\n                        {["1시간", "2시간", "3시간", "4시간"].map(t => (\n                          <DropdownMenuItem key={t} onClick={() => setTimeRange(t)} className={\`text-xs \${timeRange === t ? 'bg-slate-100 font-medium' : ''}\`}>\n                            {t}\n                          </DropdownMenuItem>\n                        ))}\n                      </DropdownMenuGroup>\n                      <DropdownMenuSeparator />\n                      <DropdownMenuGroup>\n                        <DropdownMenuLabel className="text-xs text-slate-500 font-medium">일</DropdownMenuLabel>\n                        {["1일", "3일", "6일"].map(t => (\n                          <DropdownMenuItem key={t} onClick={() => setTimeRange(t)} className={\`text-xs \${timeRange === t ? 'bg-slate-100 font-medium' : ''}\`}>\n                            {t}\n                          </DropdownMenuItem>\n                        ))}\n                      </DropdownMenuGroup>\n                      <DropdownMenuSeparator />\n                      <DropdownMenuGroup>\n                        <DropdownMenuLabel className="text-xs text-slate-500 font-medium">주</DropdownMenuLabel>\n                        {["1주", "2주", "4주", "6주", "8주"].map(t => (\n                          <DropdownMenuItem key={t} onClick={() => setTimeRange(t)} className={\`text-xs \${timeRange === t ? 'bg-slate-100 font-medium' : ''}\`}>\n                            {t}\n                          </DropdownMenuItem>\n                        ))}\n                      </DropdownMenuGroup>\n                    </DropdownMenuContent>\n                  </DropdownMenu>\n                </div>`
  );

  content = content.replace(
    /<LineChart data=\{dailyStatusData\}>/,
    `<LineChart data={statusData}>`
  );

  fs.writeFileSync(file, content);
});

console.log("Done patching AWS and GCP Servers");
