import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Edit2, Plus, X, Save, FileStack, Star, ClipboardCheck, GripVertical, List, MessageSquare, CheckSquare } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { useTemplates, Template, TestItem } from "@/hooks/useTemplates";
import { motion } from "framer-motion";

interface TemplateManagerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TemplateManager({ isOpen, onClose }: TemplateManagerProps) {
  const { templates, addTemplate, updateTemplate, deleteTemplate } = useTemplates();
  const [selectedTemplateId, setSelectedTemplateId] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [templateName, setTemplateName] = useState("");
  const [templateItems, setTemplateItems] = useState<TestItem[]>([]);
  const [nextItemId, setNextItemId] = useState(1);
  
  // State for change detection
  const [originalItemsJSON, setOriginalItemsJSON] = useState("[]");
  
  // Confirmation Dialog State
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  // Initialize/Reset when switching templates or creating new
  useEffect(() => {
    if (isCreating) {
      setTemplateName("");
      setTemplateItems([]);
      setOriginalItemsJSON("[]");
      setNextItemId(1);
    } else if (selectedTemplateId) {
      const template = templates.find(t => t.id === selectedTemplateId);
      if (template) {
        setTemplateName(template.name);
        const itemsCopy = JSON.parse(JSON.stringify(template.items));
        setTemplateItems(itemsCopy);
        setOriginalItemsJSON(JSON.stringify(template.items));
        setNextItemId(template.items.length > 0 ? Math.max(...template.items.map(i => i.id)) + 1 : 1);
      }
    } else {
      // Nothing selected
      setTemplateName("");
      setTemplateItems([]);
      setOriginalItemsJSON("[]");
    }
  }, [selectedTemplateId, isCreating, templates]);

  const hasUnsavedChanges = () => {
    if (!selectedTemplateId && !isCreating) return false;
    return JSON.stringify(templateItems) !== originalItemsJSON;
  };

  const handleActionWithConfirm = (action: () => void) => {
    if (hasUnsavedChanges()) {
      setPendingAction(() => action);
      setShowConfirmDialog(true);
    } else {
      action();
    }
  };

  const confirmAction = () => {
    if (pendingAction) {
      pendingAction();
      setPendingAction(null);
    }
    setShowConfirmDialog(false);
  };

  const handleStartCreate = () => {
    handleActionWithConfirm(() => {
      setIsCreating(true);
      setSelectedTemplateId(null);
    });
  };

  const handleSelectTemplate = (id: number) => {
    handleActionWithConfirm(() => {
      setIsCreating(false);
      setSelectedTemplateId(id);
    });
  };

  const handleSave = () => {
    if (!templateName.trim()) return;

    if (isCreating) {
      addTemplate(templateName, templateItems);
      setIsCreating(false);
    } else if (selectedTemplateId) {
      updateTemplate(selectedTemplateId, { name: templateName, items: templateItems });
    }
  };

  const handleDelete = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this template?")) {
      deleteTemplate(id);
      if (selectedTemplateId === id) {
        setSelectedTemplateId(null);
        setIsCreating(false);
      }
    }
  };

  // Item management functions (mirrored from AddTestProcedure)
  const addItem = () => {
    setTemplateItems([
      ...templateItems,
      {
        id: nextItemId,
        question: "",
        answerType: "text",
        options: [{ text: "", isNormal: true }, { text: "", isNormal: false }, { text: "", isNormal: false }, { text: "", isNormal: false }],
      },
    ]);
    setNextItemId(nextItemId + 1);
  };

  const updateItem = (id: number, field: keyof TestItem, value: any) => {
    setTemplateItems(templateItems.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const deleteItem = (id: number) => {
    setTemplateItems(templateItems.filter(item => item.id !== id));
  };
  
  const updateOption = (itemId: number, optionIndex: number, value: string) => {
    setTemplateItems(templateItems.map(item => {
        if (item.id === itemId) {
            const newOptions = [...item.options];
            newOptions[optionIndex] = { ...newOptions[optionIndex], text: value };
            return { ...item, options: newOptions };
        }
        return item;
    }));
  };

  const toggleOptionNormal = (itemId: number, optionIndex: number) => {
    setTemplateItems(templateItems.map(item => {
        if (item.id === itemId) {
            const newOptions = [...item.options];
            newOptions[optionIndex] = { ...newOptions[optionIndex], isNormal: !newOptions[optionIndex].isNormal };
            return { ...item, options: newOptions };
        }
        return item;
    }));
  };

  const addOption = (itemId: number) => {
    setTemplateItems(templateItems.map(item => {
        if (item.id === itemId) {
            return { ...item, options: [...item.options, { text: "", isNormal: false }] };
        }
        return item;
    }));
  };

  const removeOption = (itemId: number, optionIndex: number) => {
    setTemplateItems(templateItems.map(item => {
        if (item.id === itemId && item.options.length > 2) {
            const newOptions = item.options.filter((_, idx) => idx !== optionIndex);
            return { ...item, options: newOptions };
        }
        return item;
    }));
  };


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl h-[90vh] flex flex-col p-0 gap-0 overflow-hidden bg-white">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 shrink-0">
          <div>
            <DialogTitle>Manage Templates</DialogTitle>
            <DialogDescription>Create, edit, and remove test procedure templates.</DialogDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5 text-slate-500" />
          </Button>
        </div>

        {/* Content Area - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6 bg-white">
          
          {/* Top Section: Templates List */}
          <div className="mb-8 p-4 bg-slate-50 rounded-xl border border-slate-200">
             <div className="flex items-center gap-2 mb-4">
                <FileStack className="w-5 h-5 text-blue-600" />
                <h3 className="font-medium text-slate-800">Templates</h3>
             </div>
             
             {templates.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 bg-white rounded-lg border-2 border-dashed border-slate-200 text-center">
                    <div className="bg-slate-50 p-4 rounded-full mb-4">
                        <FileStack className="w-8 h-8 text-slate-400" />
                    </div>
                    <h4 className="text-slate-900 font-semibold mb-2">No Templates Created</h4>
                    <p className="text-slate-500 text-sm mb-6 max-w-sm">Create your first template to save commonly used test procedures and checklists.</p>
                    <Button onClick={handleStartCreate} variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50 gap-2">
                        <Plus className="w-4 h-4" />
                        Create New Template
                    </Button>
                </div>
             ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {templates.map(template => (
                      <div
                        key={template.id}
                        className={`relative p-4 pt-8 bg-white rounded-lg border-2 transition-all cursor-pointer hover:shadow-md group min-h-[100px] ${
                          selectedTemplateId === template.id
                            ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200"
                            : "border-slate-200 hover:border-blue-300"
                        }`}
                        onClick={() => handleSelectTemplate(template.id)}
                      >
                        {template.isDefault && (
                            <div className="absolute top-2 left-2">
                                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                            </div>
                        )}
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                                onClick={(e) => handleDelete(template.id, e)}
                                className="p-1.5 rounded hover:bg-red-50 text-slate-400 hover:text-red-500"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="flex items-center gap-2 mb-2">
                            <FileStack className="w-4 h-4 text-blue-500 flex-shrink-0" />
                            <span className="font-medium text-sm text-slate-800 truncate">{template.name}</span>
                        </div>
                        <p className="text-xs text-slate-500">{template.items.length} test items</p>
                      </div>
                    ))}

                    <button
                      onClick={handleStartCreate}
                      className={`p-4 bg-white rounded-lg border-2 border-dashed transition-all flex flex-col items-center justify-center gap-2 min-h-[100px] ${
                        isCreating 
                            ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200" 
                            : "border-slate-300 hover:border-blue-400 hover:bg-blue-50"
                      }`}
                    >
                      <Plus className={`w-6 h-6 ${isCreating ? "text-blue-600" : "text-blue-500"}`} />
                      <span className={`text-xs font-medium ${isCreating ? "text-blue-700" : "text-slate-600"}`}>New Template</span>
                    </button>
                 </div>
             )}
          </div>

          {/* Bottom Section: Editor */}
          {(selectedTemplateId || isCreating) ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-slate-800">
                        {isCreating ? "New Template Items" : "Edit Template Items"}
                    </h2>
                    <Button onClick={addItem} className="gap-2 bg-blue-600 hover:bg-blue-700">
                        <Plus className="w-4 h-4" /> Add Item
                    </Button>
                </div>

                {/* Template Name Input */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Template Name</label>
                    <Input 
                        value={templateName}
                        onChange={(e) => setTemplateName(e.target.value)}
                        placeholder="e.g., Security Audit v2"
                        className="max-w-md border-slate-300"
                    />
                </div>

                {templateItems.length === 0 ? (
                     <div className="text-center py-16 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
                        <ClipboardCheck className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                        <p className="text-slate-600 font-medium mb-1">No items in this template</p>
                        <p className="text-slate-400 text-sm mb-6">Add items to define the checklist structure.</p>
                        <Button onClick={addItem} variant="outline" className="gap-2 border-blue-300 text-blue-600 hover:bg-blue-50">
                            <Plus className="w-4 h-4" /> Add First Item
                        </Button>
                     </div>
                ) : (
                    <div className="space-y-4 pb-12">
                        {templateItems.map((item, index) => (
                             <div key={item.id} className="border border-slate-200 rounded-xl p-5 bg-slate-50/50">
                                <div className="flex items-start gap-4">
                                    <div className="flex items-center gap-2 pt-2">
                                        <GripVertical className="w-4 h-4 text-slate-300" />
                                        <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-medium">
                                            {index + 1}
                                        </span>
                                    </div>
                                    <div className="flex-1 space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">Question</label>
                                            <Input
                                                value={item.question}
                                                onChange={(e) => updateItem(item.id, "question", e.target.value)}
                                                placeholder="Enter question..."
                                                className="bg-white border-slate-200"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">Answer Type</label>
                                            <div className="flex items-center gap-3">
                                                <button
                                                  onClick={() => updateItem(item.id, "answerType", "multiple_choice")}
                                                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all text-sm ${
                                                    item.answerType === "multiple_choice" ? "border-blue-500 bg-blue-50 text-blue-700" : "border-slate-200 bg-white text-slate-600"
                                                  }`}
                                                >
                                                  <List className="w-3.5 h-3.5" /> Multiple Choice
                                                </button>
                                                <button
                                                  onClick={() => updateItem(item.id, "answerType", "text")}
                                                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all text-sm ${
                                                    item.answerType === "text" ? "border-green-500 bg-green-50 text-green-700" : "border-slate-200 bg-white text-slate-600"
                                                  }`}
                                                >
                                                  <MessageSquare className="w-3.5 h-3.5" /> Text
                                                </button>
                                                <button
                                                  onClick={() => updateItem(item.id, "answerType", "ox")}
                                                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all text-sm ${
                                                    item.answerType === "ox" ? "border-purple-500 bg-purple-50 text-purple-700" : "border-slate-200 bg-white text-slate-600"
                                                  }`}
                                                >
                                                  <CheckSquare className="w-3.5 h-3.5" /> O/X
                                                </button>
                                            </div>
                                        </div>
                                        
                                        {/* Dynamic Options for Multiple Choice */}
                                        {item.answerType === "multiple_choice" && (
                                            <div className="pl-1">
                                                <div className="flex items-center justify-between mb-2">
                                                    <label className="text-xs font-medium text-slate-500 uppercase">Options</label>
                                                    <button onClick={() => addOption(item.id)} className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                                                        <Plus className="w-3 h-3" /> Add Option
                                                    </button>
                                                </div>
                                                <div className="space-y-2">
                                                    {item.options.map((opt, optIdx) => (
                                                        <div key={optIdx} className="flex items-center gap-2">
                                                            <span className="text-xs font-mono text-slate-400 w-4">{optIdx+1}</span>
                                                            <Input 
                                                                value={opt.text} 
                                                                onChange={(e) => updateOption(item.id, optIdx, e.target.value)}
                                                                className="h-8 text-sm bg-white" 
                                                                placeholder={`Option ${optIdx+1}`}
                                                            />
                                                            <label className="flex items-center gap-1 cursor-pointer">
                                                                <input type="checkbox" checked={opt.isNormal} onChange={() => toggleOptionNormal(item.id, optIdx)} className="rounded border-slate-300 text-blue-600" />
                                                                <span className={`text-xs ${opt.isNormal ? "text-blue-600 font-medium" : "text-slate-400"}`}>Normal</span>
                                                            </label>
                                                            {item.options.length > 2 && (
                                                                <button onClick={() => removeOption(item.id, optIdx)} className="text-slate-400 hover:text-red-500">
                                                                    <Trash2 className="w-3.5 h-3.5" />
                                                                </button>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <button onClick={() => deleteItem(item.id)} className="p-2 hover:bg-red-50 rounded text-slate-400 hover:text-red-500 transition-colors">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                             </div>
                        ))}
                    </div>
                )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full py-12 text-slate-400">
                <FileStack className="w-16 h-16 mb-4 text-slate-200" />
                <p className="text-lg font-medium text-slate-600">Select a template to edit</p>
                <p className="text-sm">or create a new one to get started</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-white flex justify-end gap-3 shrink-0 z-10">
          <Button variant="outline" onClick={onClose} className="border-slate-300 text-slate-700">Cancel</Button>
          <Button onClick={handleSave} disabled={(!selectedTemplateId && !isCreating) || !templateName.trim()} className="bg-blue-600 hover:bg-blue-700 gap-2">
            <Save className="w-4 h-4" />
            {isCreating ? "Create Template" : "Save Changes"}
          </Button>
        </div>
      </DialogContent>

      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Load Template?</AlertDialogTitle>
            <AlertDialogDescription>
              템플릿을 불러오시겠습니까? 변경사항이 초기화됩니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmAction} className="bg-blue-600 hover:bg-blue-700">Load Template</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Dialog>
  );
}
