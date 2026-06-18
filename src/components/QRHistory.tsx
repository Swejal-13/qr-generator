import { History, RefreshCw } from "lucide-react";

export interface HistoryItem {
  id: string;
  text: string;
  fg: string;
  bg: string;
  ts: number;
}

interface Props {
  items: HistoryItem[];
  onPick: (item: HistoryItem) => void;
  onClear: () => void;
}

export function QRHistory({ items, onPick, onClear }: Props) {
  if (items.length === 0) return null;
  return (
    <div className="rounded-2xl p-5 qf-glass">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <History className="h-4 w-4" /> Recent QR codes
        </div>
        <button
          onClick={onClear}
          className="text-xs text-muted-foreground hover:text-foreground"
        >
          Clear
        </button>
      </div>
      <ul className="grid gap-2">
        {items.map((i) => (
          <li key={i.id}>
            <button
              onClick={() => onPick(i)}
              className="flex w-full items-center gap-3 rounded-xl border border-border/50 bg-background/40 px-3 py-2 text-left transition hover:bg-foreground/5"
            >
              <div
                className="h-8 w-8 shrink-0 rounded-md border border-border/60"
                style={{ background: i.bg }}
              >
                <div
                  className="m-1 h-6 w-6 rounded-sm"
                  style={{ background: i.fg, opacity: 0.85 }}
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium">{i.text}</div>
                <div className="text-xs text-muted-foreground">
                  {new Date(i.ts).toLocaleString()}
                </div>
              </div>
              <RefreshCw className="h-4 w-4 shrink-0 text-muted-foreground" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}