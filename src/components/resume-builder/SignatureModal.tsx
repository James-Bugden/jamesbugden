import { useRef, useState, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eraser, Upload } from "lucide-react";

interface SignatureModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (dataUrl: string) => void;
}

export function SignatureModal({ open, onClose, onSave }: SignatureModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawing, setDrawing] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const getCtx = () => canvasRef.current?.getContext("2d") ?? null;

  const startDraw = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    const ctx = getCtx();
    if (!ctx) return;
    setDrawing(true);
    const rect = canvasRef.current!.getBoundingClientRect();
    const pos = "touches" in e ? e.touches[0] : e;
    ctx.beginPath();
    ctx.moveTo(pos.clientX - rect.left, pos.clientY - rect.top);
  }, []);

  const draw = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!drawing) return;
    const ctx = getCtx();
    if (!ctx) return;
    const rect = canvasRef.current!.getBoundingClientRect();
    const pos = "touches" in e ? e.touches[0] : e;
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#111827";
    ctx.lineTo(pos.clientX - rect.left, pos.clientY - rect.top);
    ctx.stroke();
  }, [drawing]);

  const stopDraw = useCallback(() => setDrawing(false), []);

  const clear = () => {
    const ctx = getCtx();
    if (!ctx || !canvasRef.current) return;
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  const save = () => {
    if (!canvasRef.current) return;
    const dataUrl = canvasRef.current.toDataURL("image/png");
    onSave(dataUrl);
    onClose();
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      onSave(reader.result as string);
      onClose();
    };
    reader.readAsDataURL(file);
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">Create Signature</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-xl overflow-hidden bg-gray-50">
            <canvas
              ref={canvasRef}
              width={400}
              height={160}
              className="w-full cursor-crosshair touch-none"
              onMouseDown={startDraw}
              onMouseMove={draw}
              onMouseUp={stopDraw}
              onMouseLeave={stopDraw}
              onTouchStart={startDraw}
              onTouchMove={draw}
              onTouchEnd={stopDraw}
            />
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={clear} className="gap-1.5">
              <Eraser className="w-4 h-4" /> Clear
            </Button>
            <Button variant="outline" size="sm" onClick={() => fileRef.current?.click()} className="gap-1.5">
              <Upload className="w-4 h-4" /> Upload Image
            </Button>
            <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
            <div className="flex-1" />
            <Button onClick={save} size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
              Save Signature
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
