import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";
import { GripVertical } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";

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
        "flex flex-row items-stretch bg-white rounded-xl shadow-sm transition-shadow duration-200",
        isDragging && "shadow-xl opacity-80 ring-2 ring-green-200"
      )}
      {...attributes}
    >
      <TooltipProvider delayDuration={400}>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              {...listeners}
              className="flex items-center px-1 cursor-grab active:cursor-grabbing text-muted-foreground/30 hover:text-muted-foreground/60 hover:bg-muted/50 rounded-l-xl transition-colors"
            >
              <GripVertical className="w-4 h-4" />
            </div>
          </TooltipTrigger>
          <TooltipContent side="left" className="text-xs">Drag to reorder</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}
