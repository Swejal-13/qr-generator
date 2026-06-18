import { useEffect, useMemo, useRef, useState } from "react";
import QRCode from "qrcode";
import { Copy, RotateCcw, Sparkles, Link as LinkIcon, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { ColorPicker } from "./ColorPicker";
import { LogoUploader } from "./LogoUploader";
import { DownloadButtons } from "./DownloadButtons";
import { QRHistory, type HistoryItem } from "./QRHistory";

type ECL = "L" | "M" | "Q" | "H";
const HKEY = "qrforge-history";

export function QRGenerator() {
  const [text, setText] = useState("https://digitalheroesco.com");
  const [size, setSize] = useState(320);
  const [fg, setFg] = useState("#0f172a");
  const [bg, setBg] = useState("#ffffff");
  const [ecl, setEcl] = useState<ECL>("M");
  const [logo, setLogo] = useState<string | null>(null);
  const [svgString, setSvgString] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const isUrl = useMemo(() => {
    try {
      new URL(text);
      return true;
    } catch {
      return false;
    }
  }, [text]);

  // load history
  useEffect(() => {
    try {
      const raw = localStorage.getItem(HKEY);
      if (raw) setHistory(JSON.parse(raw));
    } catch {}
  }, []);

  // render QR (canvas + svg + optional logo)
  useEffect(() => {
    const value = text.trim() || " ";
    const canvas = canvasRef.current;
    if (!canvas) return;
    QRCode.toCanvas(canvas, value, {
      errorCorrectionLevel: ecl,
      margin: 2,
      width: size,
      color: { dark: fg, light: bg },
    }).then(() => {
      if (!logo) return;
      const img = new Image();
      img.onload = () => {
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        const s = size * 0.22;
        const x = (size - s) / 2;
        ctx.fillStyle = bg;
        ctx.fillRect(x - 4, x - 4, s + 8, s + 8);
        ctx.drawImage(img, x, x, s, s);
      };
      img.src = logo;
    });
    QRCode.toString(value, {
      type: "svg",
      errorCorrectionLevel: ecl,
      margin: 2,
      width: size,
      color: { dark: fg, light: bg },
    }).then(setSvgString);
  }, [text, size, fg, bg, ecl, logo]);

  const saveToHistory = () => {
    if (!text.trim()) return;
    const item: HistoryItem = {
      id: crypto.randomUUID(),
      text: text.trim(),
      fg,
      bg,
      ts: Date.now(),
    };
    const next = [item, ...history.filter((h) => h.text !== item.text)].slice(0, 10);
    setHistory(next);
    localStorage.setItem(HKEY, JSON.stringify(next));
    toast.success("Saved to history");
  };

  const reset = () => {
    setText("");
    setFg("#0f172a");
    setBg("#ffffff");
    setSize(320);
    setEcl("M");
    setLogo(null);
    toast.message("Reset to defaults");
  };

  const copy = async () => {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const pickHistory = (i: HistoryItem) => {
    setText(i.text);
    setFg(i.fg);
    setBg(i.bg);
    toast.message("Loaded from history");
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(HKEY);
  };

  return (
    <section className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 pt-8 lg:grid-cols-[1.1fr_1fr]">
      {/* Controls */}
      <div className="rounded-3xl p-6 qf-glass">
        <div className="mb-5 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-fuchsia-500" />
          <h2 className="text-lg font-bold tracking-tight">Design your QR</h2>
        </div>

        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Text or URL
        </label>
        <div className="relative">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value.slice(0, 1000))}
            placeholder="Paste a URL or any text…"
            rows={3}
            className="w-full resize-none rounded-xl border border-border/60 bg-background/60 px-4 py-3 pr-12 text-sm outline-none focus:border-fuchsia-400/60 focus:ring-2 focus:ring-fuchsia-400/20"
          />
          <button
            onClick={copy}
            className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-lg text-muted-foreground hover:bg-foreground/5"
            aria-label="Copy text"
          >
            <Copy className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            {text && isUrl ? (
              <span className="qf-chip text-emerald-600 dark:text-emerald-400">
                <LinkIcon className="h-3 w-3" /> Valid URL
              </span>
            ) : text ? (
              <span className="qf-chip">Plain text</span>
            ) : null}
          </div>
          <span>{text.length} / 1000</span>
        </div>

        <div className="mt-5 grid gap-3">
          <ColorPicker label="Foreground" value={fg} onChange={setFg} />
          <ColorPicker label="Background" value={bg} onChange={setBg} />

          <div className="rounded-xl border border-border/60 bg-background/40 px-3 py-3">
            <div className="mb-2 flex items-center justify-between text-sm font-medium">
              <span>Size</span>
              <span className="font-mono text-xs text-muted-foreground">{size}px</span>
            </div>
            <input
              type="range"
              min={150}
              max={500}
              step={10}
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="w-full accent-fuchsia-500"
            />
          </div>

          <div className="rounded-xl border border-border/60 bg-background/40 px-3 py-3">
            <div className="mb-2 flex items-center gap-2 text-sm font-medium">
              <ShieldCheck className="h-4 w-4" /> Error correction
            </div>
            <div className="grid grid-cols-4 gap-2">
              {(["L", "M", "Q", "H"] as ECL[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setEcl(l)}
                  className={
                    "rounded-lg border px-2 py-1.5 text-xs font-semibold transition " +
                    (ecl === l
                      ? "border-fuchsia-400/60 bg-fuchsia-500/10 text-fuchsia-700 dark:text-fuchsia-300"
                      : "border-border/60 hover:bg-foreground/5")
                  }
                >
                  {l}
                  <span className="ml-1 text-[10px] opacity-60">
                    {l === "L" ? "7%" : l === "M" ? "15%" : l === "Q" ? "25%" : "30%"}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <LogoUploader logo={logo} onChange={setLogo} />

          <div className="flex gap-2 pt-1">
            <button
              onClick={saveToHistory}
              className="flex-1 rounded-xl bg-gradient-to-r from-fuchsia-500 to-cyan-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:opacity-90"
            >
              Save to history
            </button>
            <button
              onClick={reset}
              className="inline-flex items-center gap-2 rounded-xl border border-border/60 bg-background/60 px-4 py-2.5 text-sm font-semibold transition hover:bg-foreground/5"
            >
              <RotateCcw className="h-4 w-4" /> Reset
            </button>
          </div>
        </div>
      </div>

      {/* Preview + downloads + history */}
      <div className="grid gap-6">
        <div className="rounded-3xl p-6 qf-glass">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold tracking-tight">Live preview</h2>
            <span className="qf-chip">Updates in real-time</span>
          </div>
          <div
            className="mx-auto flex items-center justify-center rounded-2xl border border-border/60 p-6 shadow-inner"
            style={{ background: bg }}
          >
            <canvas ref={canvasRef} className="max-w-full rounded-lg" />
          </div>
          <div className="mt-5">
            <DownloadButtons canvasRef={canvasRef} svgString={svgString} />
          </div>
          <div className="mt-4 rounded-xl border border-border/50 bg-background/40 p-3 text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">Tip:</span> use error correction{" "}
            <span className="font-mono">H</span> when embedding a logo so the QR stays scannable.
          </div>
        </div>
        <QRHistory items={history} onPick={pickHistory} onClear={clearHistory} />
      </div>
    </section>
  );
}