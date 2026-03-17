import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, Plus } from "lucide-react";

export default function WhitelistSettings() {
  const [uris, setUris] = useState([
    { id: 1, value: "http://localhost:3000" },
    { id: 2, value: "https://m.stocklink.ai" },
    { id: 3, value: "https://staging.d2fgdpjcjc0mo8.amplifyapp.com" },
    { id: 4, value: "https://stocklink.ai" }
  ]);

  const addUri = () => {
    const newId = uris.length > 0 ? Math.max(...uris.map(u => u.id)) + 1 : 1;
    setUris([...uris, { id: newId, value: "" }]);
  };

  const removeUri = (id: number) => {
    setUris(uris.filter(u => u.id !== id));
  };

  const updateUri = (id: number, value: string) => {
    setUris(uris.map(u => u.id === id ? { ...u, value } : u));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <div className="space-y-4">
          <div className="space-y-1">
            <h4 className="text-base font-semibold text-slate-900">Authorized URIs</h4>
            <p className="text-sm text-slate-500">For use with requests from a web server</p>
          </div>
          
          <div className="space-y-3">
            {uris.map((uri, index) => (
              <div key={uri.id} className="flex items-center gap-3">
                <div className="relative flex-1">
                  <Label className="absolute -top-2 left-3 px-1 bg-white text-xs font-medium text-slate-500">
                    URI {index + 1} <span className="text-red-500">*</span>
                  </Label>
                  <Input 
                    value={uri.value}
                    onChange={(e) => updateUri(uri.id, e.target.value)}
                    placeholder="https://"
                    className="h-11 pt-1.5 border-slate-300 focus-visible:ring-blue-500" 
                  />
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="shrink-0 text-slate-400 hover:text-red-600 hover:bg-red-50 h-11 w-11 rounded-lg"
                  onClick={() => removeUri(uri.id)}
                >
                  <Trash2 className="w-5 h-5" />
                </Button>
              </div>
            ))}
          </div>
          
          <Button 
            variant="outline" 
            className="mt-2 text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700 bg-white"
            onClick={addUri}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add URI
          </Button>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6">
          Save Changes
        </Button>
      </div>
    </div>
  );
}