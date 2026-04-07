const fs = require('fs');
const content = fs.readFileSync('client/src/pages/Settings.tsx', 'utf8');
if (content.includes('border-t border-slate-50')) {
  console.log('Contains border-t');
}
