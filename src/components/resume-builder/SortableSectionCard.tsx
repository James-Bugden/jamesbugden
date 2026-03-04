import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";

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
      {...listeners}
    >
      {children}
    </div>
  );
}
