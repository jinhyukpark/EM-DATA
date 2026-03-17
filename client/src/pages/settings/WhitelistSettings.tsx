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

  const [redirectUris, setRedirectUris] = useState([
    { id: 1, value: "http://localhost:3000/api/auth/google/callback" },
    { id: 2, value: "https://m.stocklink.ai/api/auth/google/callback" },
    { id: 3, value: "https://staging.d2fgdpjcjc0mo8.amplifyapp.com/api/auth/google/callback" },
    { id: 4, value: "https://stocklink.ai/auth/google/callback" },
    { id: 5, value: "http://localhost:3000/auth/google/callback" }
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

  const addRedirectUri = () => {
    const newId = redirectUris.length > 0 ? Math.max(...redirectUris.map(u => u.id)) + 1 : 1;
    setRedirectUris([...redirectUris, { id: newId, value: "" }]);
  };

  const removeRedirectUri = (id: number) => {
    setRedirectUris(redirectUris.filter(u => u.id !== id));
  };

  const updateRedirectUri = (id: number, value: string) => {
    setRedirectUris(redirectUris.map(u => u.id === id ? { ...u, value } : u));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        {/* 승인된 URI 섹션 */}
        <div className="space-y-4">
          <div className="space-y-1">
            <h4 className="text-base font-semibold text-slate-900">승인된 URI</h4>
            <p className="text-sm text-slate-500">웹 서버의 요청에 사용</p>
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
            URI 추가
          </Button>
        </div>

        <div className="h-px bg-slate-100 my-8" />

        {/* 승인된 리디렉션 URI 섹션 */}
        <div className="space-y-4">
          <div className="space-y-1">
            <h4 className="text-base font-semibold text-slate-900">승인된 리디렉션 URI</h4>
            <p className="text-sm text-slate-500">웹 서버의 요청에 사용</p>
          </div>
          
          <div className="space-y-3">
            {redirectUris.map((uri, index) => (
              <div key={uri.id} className="flex items-center gap-3">
                <div className="relative flex-1">
                  <Label className="absolute -top-2 left-3 px-1 bg-white text-xs font-medium text-slate-500">
                    URI {index + 1} <span className="text-red-500">*</span>
                  </Label>
                  <Input 
                    value={uri.value}
                    onChange={(e) => updateRedirectUri(uri.id, e.target.value)}
                    placeholder="https://"
                    className="h-11 pt-1.5 border-slate-300 focus-visible:ring-blue-500" 
                  />
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="shrink-0 text-slate-400 hover:text-red-600 hover:bg-red-50 h-11 w-11 rounded-lg"
                  onClick={() => removeRedirectUri(uri.id)}
                >
                  <Trash2 className="w-5 h-5" />
                </Button>
              </div>
            ))}
          </div>
          
          <Button 
            variant="outline" 
            className="mt-2 text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700 bg-white"
            onClick={addRedirectUri}
          >
            <Plus className="w-4 h-4 mr-2" />
            URI 추가
          </Button>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6">
          변경사항 저장
        </Button>
      </div>
    </div>
  );
}