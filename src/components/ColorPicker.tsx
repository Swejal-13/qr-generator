interface Props {
  label: string;
  value: string;
  onChange: (v: string) => void;
}
export function ColorPicker({ label, value, onChange }: Props) {
  return (
    <label className="flex items-center justify-between gap-3 rounded-xl border border-border/60 bg-background/40 px-3 py-2 text-sm">
      <span className="font-medium">{label}</span>
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-24 rounded-md border border-border/60 bg-transparent px-2 py-1 font-mono text-xs"
        />
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-8 w-8 cursor-pointer rounded-md border border-border/60 bg-transparent"
        />
      </div>
    </label>
  );
}