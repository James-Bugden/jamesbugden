import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";
import { GripVertical } from "lucide-react";

interface SortableSectionCardProps {
  id: string;
  children: React.ReactNode;
}

export function SortableSectionCard({ id, children }: SortableSectionCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "bg-white rounded-xl shadow-sm transition-shadow duration-200",
        isDragging && "shadow-xl opacity-80 ring-2 ring-green-200"
      )}
      {...attributes}
    >
      <div
        {...listeners}
        className="flex items-center justify-center py-1.5 cursor-grab active:cursor-grabbing text-muted-foreground/40 hover:text-muted-foreground/70 transition-colors"
      >
        <GripVertical className="w-4 h-4" />
      </div>
      {children}
    </div>
  );
}
