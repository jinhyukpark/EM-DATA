import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Edit2, Plus, X, Save } from "lucide-react";
import { useTemplates, Template, TestItem } from "@/hooks/useTemplates";
import { motion, AnimatePresence } from "framer-motion";

interface TemplateManagerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TemplateManager({ isOpen, onClose }: TemplateManagerProps) {
  const { templates, addTemplate, updateTemplate, deleteTemplate } = useTemplates();
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newTemplateName, setNewTemplateName] = useState("");
  
  // State for the template being edited/created
  const [currentItems, setCurrentItems] = useState<TestItem[]>([]);

  const startCreate = () => {
    setIsCreating(true);
    setEditingTemplate(null);
    setNewTemplateName("");
    setCurrentItems([]);
  };

  const startEdit = (template: Template) => {
    setEditingTemplate(template);
    setIsCreating(false);
    setNewTemplateName(template.name);
    setCurrentItems(JSON.parse(JSON.stringify(template.items))); // Deep copy
  };

  const handleSave = () => {
    if (!newTemplateName.trim()) return;

    if (isCreating) {
      addTemplate(newTemplateName, currentItems);
    } else if (editingTemplate) {
      updateTemplate(editingTemplate.id, { name: newTemplateName, items: currentItems });
    }

    resetForm();
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this template?")) {
      deleteTemplate(id);
    }
  };

  const resetForm = () => {
    setIsCreating(false);
    setEditingTemplate(null);
    setNewTemplateName("");
    setCurrentItems([]);
  };

  // Helper to add a simple item for the template editor
  const addItem = () => {
    setCurrentItems([
      ...currentItems,
      {
        id: Date.now(),
        question: "",
        answerType: "text",
        options: [],
      }
    ]);
  };

  const updateItem = (id: number, text: string) => {
    setCurrentItems(currentItems.map(i => i.id === id ? { ...i, question: text } : i));
  };

  const deleteItem = (id: number) => {
    setCurrentItems(currentItems.filter(i => i.id !== id));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Manage Templates</DialogTitle>
          <DialogDescription>
            Create, edit, and remove test procedure templates.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {!isCreating && !editingTemplate ? (
            // List View
            <div className="space-y-4">
              <Button onClick={startCreate} className="w-full gap-2 border-dashed" variant="outline">
                <Plus className="w-4 h-4" /> Create New Template
              </Button>
              
              <div className="grid gap-3">
                {templates.map(template => (
                  <div key={template.id} className="flex items-center justify-between p-4 border rounded-xl bg-slate-50 hover:bg-white hover:shadow-sm transition-all group">
                    <div>
                      <h4 className="font-semibold text-slate-800">{template.name}</h4>
                      <p className="text-xs text-slate-500">{template.items.length} items</p>
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="icon" variant="ghost" onClick={() => startEdit(template)}>
                        <Edit2 className="w-4 h-4 text-slate-500" />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => handleDelete(template.id)} className="hover:text-red-600 hover:bg-red-50">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            // Editor View
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
               <div className="flex items-center gap-2 mb-4">
                  <Button variant="ghost" size="icon" onClick={resetForm}>
                      <X className="w-4 h-4" />
                  </Button>
                  <h3 className="font-semibold text-lg">{isCreating ? "New Template" : "Edit Template"}</h3>
               </div>

               <div className="space-y-4">
                 <div>
                   <label className="text-sm font-medium mb-1.5 block">Template Name</label>
                   <Input 
                      value={newTemplateName} 
                      onChange={e => setNewTemplateName(e.target.value)} 
                      placeholder="e.g., Security Audit v2"
                   />
                 </div>

                 <div>
                    <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium">Template Items</label>
                        <Button size="sm" variant="ghost" onClick={addItem} className="text-blue-600 gap-1">
                            <Plus className="w-3 h-3" /> Add Item
                        </Button>
                    </div>
                    <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 border rounded-lg p-2 bg-slate-50">
                        {currentItems.length === 0 && (
                            <p className="text-center text-sm text-slate-400 py-8 italic">No items yet</p>
                        )}
                        {currentItems.map((item, idx) => (
                            <div key={item.id} className="flex gap-2 items-center bg-white p-2 rounded border">
                                <span className="text-xs font-mono text-slate-400 w-6">{idx + 1}</span>
                                <Input 
                                    value={item.question} 
                                    onChange={e => updateItem(item.id, e.target.value)}
                                    placeholder="Question text..."
                                    className="h-8 text-sm"
                                />
                                <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-400 hover:text-red-500" onClick={() => deleteItem(item.id)}>
                                    <X className="w-3 h-3" />
                                </Button>
                            </div>
                        ))}
                    </div>
                 </div>
               </div>

               <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={resetForm}>Cancel</Button>
                  <Button onClick={handleSave} className="gap-2 bg-blue-600">
                      <Save className="w-4 h-4" /> Save Template
                  </Button>
               </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
