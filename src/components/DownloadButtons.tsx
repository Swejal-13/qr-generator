import { Download } from "lucide-react";
import { toast } from "sonner";

interface Props {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  svgString: string;
  filename?: string;
}
export function DownloadButtons({ canvasRef, svgString, filename = "qrforge" }: Props) {
  const triggerDownload = (href: string, ext: string) => {
    const a = document.createElement("a");
    a.href = href;
    a.download = `${filename}.${ext}`;
    a.click();
    toast.success(`Downloaded ${ext.toUpperCase()}`);
  };

  const downloadRaster = (type: "image/png" | "image/jpeg", ext: "png" | "jpg") => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (ext === "jpg") {
      const tmp = document.createElement("canvas");
      tmp.width = canvas.width;
      tmp.height = canvas.height;
      const ctx = tmp.getContext("2d")!;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, tmp.width, tmp.height);
      ctx.drawImage(canvas, 0, 0);
      triggerDownload(tmp.toDataURL(type, 0.95), ext);
    } else {
      triggerDownload(canvas.toDataURL(type), ext);
    }
  };

  const downloadSvg = () => {
    const blob = new Blob([svgString], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    triggerDownload(url, "svg");
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const btn =
    "inline-flex items-center justify-center gap-2 rounded-xl border border-border/60 bg-background/60 px-3 py-2 text-sm font-semibold transition hover:bg-foreground/5";

  return (
    <div className="grid grid-cols-3 gap-2">
      <button onClick={() => downloadRaster("image/png", "png")} className={btn}>
        <Download className="h-4 w-4" /> PNG
      </button>
      <button onClick={() => downloadRaster("image/jpeg", "jpg")} className={btn}>
        <Download className="h-4 w-4" /> JPG
      </button>
      <button onClick={downloadSvg} className={btn}>
        <Download className="h-4 w-4" /> SVG
      </button>
    </div>
  );
}