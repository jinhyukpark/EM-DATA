const fs = require('fs');

const pages = ['client/src/pages/AWSServers.tsx', 'client/src/pages/GCPServers.tsx', 'client/src/pages/IDCServers.tsx'];

const newUseMemo = `const statusData = useMemo(() => {
    let points = 12;
    let intervalMs = 5 * 60 * 1000;
    let format = "time";
    
    if (timeRange.includes("시간")) {
      const hours = parseInt(timeRange);
      intervalMs = 5 * 60 * 1000; // 5 mins
      points = hours * 12 + 1; 
      format = "time";
    } else if (timeRange.includes("일")) {
      const days = parseInt(timeRange);
      if (days === 1) { points = 25; intervalMs = 60 * 60 * 1000; }
      else if (days === 3) { points = 25; intervalMs = 3 * 60 * 60 * 1000; }
      else if (days === 6) { points = 25; intervalMs = 6 * 60 * 60 * 1000; }
      format = "datetime";
    } else if (timeRange.includes("주")) {
      const weeks = parseInt(timeRange);
      if (weeks === 1) { points = 15; intervalMs = 12 * 60 * 60 * 1000; }
      else { points = weeks * 7 + 1; intervalMs = 24 * 60 * 60 * 1000; }
      format = "date";
    }

    const now = new Date();
    // Snap to nearest 5 minutes
    now.setMinutes(Math.floor(now.getMinutes() / 5) * 5);
    now.setSeconds(0);
    now.setMilliseconds(0);

    const data = [];
    for (let i = points - 1; i >= 0; i--) {
      const d = new Date(now.getTime() - i * intervalMs);
      const mo = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const h = String(d.getHours()).padStart(2, '0');
      const m = String(d.getMinutes()).padStart(2, '0');
      
      let dateLabel = "";
      if (format === "time") dateLabel = \`\${h}:\${m}\`;
      else if (format === "datetime") dateLabel = \`\${mo}/\${day} \${h}:\${m}\`;
      else if (format === "date") dateLabel = \`\${mo}/\${day}\`;

      data.push({
        date: dateLabel,
        success: Math.floor(Math.random() * 5) + 8,
        warning: Math.floor(Math.random() * 2),
        error: Math.floor(Math.random() * 2),
      });
    }
    return data;
  }, [timeRange]);`;

pages.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // Regex to match the old statusData useMemo block
  content = content.replace(
    /const statusData = useMemo\(\(\) => \{[\s\S]*?\}, \[timeRange\]\);/,
    newUseMemo
  );
  
  // Add minTickGap to XAxis
  content = content.replace(
    /<XAxis dataKey="date" axisLine=\{false\} tickLine=\{false\} tick=\{\{ fill: '#94a3b8', fontSize: 12 \}\} \/>/,
    `<XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} minTickGap={30} />`
  );

  fs.writeFileSync(file, content);
});

console.log("Done patching useMemo and XAxis");
