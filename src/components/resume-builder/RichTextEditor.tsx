import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import {
  Bold, Italic, Underline as UnderlineIcon, List, ListOrdered,
  Link as LinkIcon, AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Sparkles, CheckCheck, Wand2, Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface RichTextEditorProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  showAiTools?: boolean;
  aiContext?: string;
}

async function callResumeAi(action: string, text: string, context?: string): Promise<string> {
  const { data, error } = await supabase.functions.invoke("resume-ai", {
    body: { action, text, context },
  });
  if (error) throw new Error(error.message || "AI request failed");
  if (data?.error) throw new Error(data.error);
  return data?.result || "";
}

export function RichTextEditor({ value, onChange, placeholder, showAiTools = false, aiContext }: RichTextEditorProps) {
  const skipUpdate = useRef(false);
  const [aiLoading, setAiLoading] = useState<string | null>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: false }),
      Underline,
      Link.configure({ openOnClick: false }),
      TextAlign.configure({ types: ["paragraph"] }),
    ],
    content: value || "",
    onUpdate: ({ editor }) => {
      skipUpdate.current = true;
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "min-h-[80px] px-3 py-2 text-sm outline-none prose prose-sm max-w-none [&_ul]:list-disc [&_ol]:list-decimal [&_ul]:pl-5 [&_ol]:pl-5",
      },
    },
  });

  useEffect(() => {
    if (!editor) return;
    if (skipUpdate.current) {
      skipUpdate.current = false;
      return;
    }
    const current = editor.getHTML();
    if (current !== value) {
      editor.commands.setContent(value || "");
    }
  }, [value, editor]);

  const handleAiAction = useCallback(async (action: string) => {
    if (!editor || aiLoading) return;
    setAiLoading(action);
    try {
      const currentText = editor.getHTML();
      const result = await callResumeAi(action, currentText, aiContext);
      if (result) {
        editor.commands.setContent(result);
        skipUpdate.current = true;
        onChange(result);
        toast({ title: "AI applied", description: `${action === "improve" ? "Writing improved" : action === "grammar" ? "Grammar checked" : "Content generated"}` });
      }
    } catch (e: any) {
      toast({ title: "AI Error", description: e.message, variant: "destructive" });
    } finally {
      setAiLoading(null);
    }
  }, [editor, aiLoading, aiContext, onChange]);

  if (!editor) return null;

  const setLink = () => {
    const url = window.prompt("Enter URL");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const ToolBtn = ({
    active,
    onClick,
    children,
  }: {
    active?: boolean;
    onClick: () => void;
    children: React.ReactNode;
  }) => (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={cn(
        "p-1.5 rounded transition-colors",
        active ? "bg-purple-100 text-purple-700" : "text-gray-500 hover:bg-gray-200"
      )}
    >
      {children}
    </button>
  );

  const AiBtn = ({ action, label, icon: Icon }: { action: string; label: string; icon: React.ElementType }) => (
    <button
      type="button"
      onClick={() => handleAiAction(action)}
      disabled={!!aiLoading}
      className={cn(
        "flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors",
        "bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200",
        aiLoading === action && "opacity-70"
      )}
    >
      {aiLoading === action ? <Loader2 className="w-3 h-3 animate-spin" /> : <Icon className="w-3 h-3" />}
      {label}
    </button>
  );

  return (
    <div className="rounded-lg border border-gray-200 bg-[#F5F3EE] overflow-hidden">
      {/* AI Toolbar */}
      {showAiTools && (
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gradient-to-r from-purple-50 to-violet-50 border-b border-purple-100">
          <Sparkles className="w-3.5 h-3.5 text-purple-500 flex-shrink-0" />
          <span className="text-[10px] font-semibold text-purple-600 mr-1">AI</span>
          <AiBtn action="improve" label="Improve Writing" icon={Wand2} />
          <AiBtn action="grammar" label="Grammar Check" icon={CheckCheck} />
          <AiBtn action="starter" label="Starter" icon={Sparkles} />
        </div>
      )}

      {/* Formatting Toolbar */}
      <div className="flex items-center gap-0.5 px-2 py-1 border-b border-gray-200 bg-white/60 flex-wrap">
        <ToolBtn active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}>
          <Bold className="w-4 h-4" />
        </ToolBtn>
        <ToolBtn active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}>
          <Italic className="w-4 h-4" />
        </ToolBtn>
        <ToolBtn active={editor.isActive("underline")} onClick={() => editor.chain().focus().toggleUnderline().run()}>
          <UnderlineIcon className="w-4 h-4" />
        </ToolBtn>
        <div className="w-px h-5 bg-gray-200 mx-1" />
        <ToolBtn active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}>
          <List className="w-4 h-4" />
        </ToolBtn>
        <ToolBtn active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          <ListOrdered className="w-4 h-4" />
        </ToolBtn>
        <div className="w-px h-5 bg-gray-200 mx-1" />
        <ToolBtn active={editor.isActive("link")} onClick={setLink}>
          <LinkIcon className="w-4 h-4" />
        </ToolBtn>
        <div className="w-px h-5 bg-gray-200 mx-1" />
        <ToolBtn active={editor.isActive({ textAlign: "left" })} onClick={() => editor.chain().focus().setTextAlign("left").run()}>
          <AlignLeft className="w-4 h-4" />
        </ToolBtn>
        <ToolBtn active={editor.isActive({ textAlign: "center" })} onClick={() => editor.chain().focus().setTextAlign("center").run()}>
          <AlignCenter className="w-4 h-4" />
        </ToolBtn>
        <ToolBtn active={editor.isActive({ textAlign: "right" })} onClick={() => editor.chain().focus().setTextAlign("right").run()}>
          <AlignRight className="w-4 h-4" />
        </ToolBtn>
        <ToolBtn active={editor.isActive({ textAlign: "justify" })} onClick={() => editor.chain().focus().setTextAlign("justify").run()}>
          <AlignJustify className="w-4 h-4" />
        </ToolBtn>
      </div>
      <EditorContent editor={editor} />
      {/* Word count */}
      {(() => {
        const text = editor.getText();
        const words = text.trim() ? text.trim().split(/\s+/).length : 0;
        const bullets = (editor.getHTML().match(/<li>/gi) || []).length;
        const tooLong = words > 150;
        const tooShort = words > 0 && words < 20;
        return (
          <div className={cn(
            "flex items-center gap-2 px-3 py-1 text-[10px] border-t border-gray-100",
            tooLong ? "text-amber-600 bg-amber-50" : tooShort ? "text-amber-500 bg-amber-50/50" : "text-gray-400"
          )}>
            <span>{words} word{words !== 1 ? "s" : ""}</span>
            {bullets > 0 && <span>· {bullets} bullet{bullets !== 1 ? "s" : ""}</span>}
            {tooLong && <span className="ml-auto font-medium">Consider shortening</span>}
            {tooShort && <span className="ml-auto font-medium">Consider adding more detail</span>}
          </div>
        );
      })()}
    </div>
  );
}
