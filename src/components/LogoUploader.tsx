import { Upload, X } from "lucide-react";
import { useRef } from "react";

interface Props {
  logo: string | null;
  onChange: (v: string | null) => void;
}
export function LogoUploader({ logo, onChange }: Props) {
  const ref = useRef<HTMLInputElement>(null);
  const handle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result as string);
    reader.readAsDataURL(file);
  };
  return (
    <div className="flex items-center gap-3 rounded-xl border border-dashed border-border/70 bg-background/40 p-3">
      {logo ? (
        <img src={logo} alt="logo" className="h-12 w-12 rounded-lg object-contain" />
      ) : (
        <div className="grid h-12 w-12 place-items-center rounded-lg bg-foreground/5">
          <Upload className="h-5 w-5 text-muted-foreground" />
        </div>
      )}
      <div className="min-w-0 flex-1 text-sm">
        <div className="font-medium">Center logo</div>
        <div className="text-xs text-muted-foreground">PNG/JPG · embedded in QR center</div>
      </div>
      <input ref={ref} type="file" accept="image/*" onChange={handle} className="hidden" />
      <button
        onClick={() => ref.current?.click()}
        className="shrink-0 rounded-lg border border-border/60 bg-background/60 px-3 py-1.5 text-xs font-medium hover:bg-foreground/5"
      >
        {logo ? "Replace" : "Upload"}
      </button>
      {logo && (
        <button
          onClick={() => onChange(null)}
          className="grid h-7 w-7 shrink-0 place-items-center rounded-lg text-muted-foreground hover:bg-foreground/5"
          aria-label="Remove logo"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}