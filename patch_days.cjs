const fs = require('fs');

const pages = ['client/src/pages/AWSServers.tsx', 'client/src/pages/GCPServers.tsx', 'client/src/pages/IDCServers.tsx'];

pages.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // Replace ["1일", "3일", "6일"] with ["1일", "2일", "4일", "6일"]
  content = content.replace(
    /\{\["1일", "3일", "6일"\]\.map\(t => \(/g,
    `{["1일", "2일", "4일", "6일"].map(t => (`
  );
  
  // Update the useMemo logic for new days
  content = content.replace(
    /else if \(days === 1\) \{ points = 25; intervalMs = 60 \* 60 \* 1000; \}\s*else if \(days === 3\) \{ points = 25; intervalMs = 3 \* 60 \* 60 \* 1000; \}\s*else if \(days === 6\) \{ points = 25; intervalMs = 6 \* 60 \* 60 \* 1000; \}/g,
    `else if (days === 1) { points = 25; intervalMs = 60 * 60 * 1000; }
      else if (days === 2) { points = 25; intervalMs = 2 * 60 * 60 * 1000; }
      else if (days === 4) { points = 25; intervalMs = 4 * 60 * 60 * 1000; }
      else if (days === 6) { points = 25; intervalMs = 6 * 60 * 60 * 1000; }`
  );

  fs.writeFileSync(file, content);
});

console.log("Done patching days dropdown and logic");
