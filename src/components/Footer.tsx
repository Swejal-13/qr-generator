export function Footer() {
  return (
    <footer className="mx-auto mt-16 max-w-6xl px-4 pb-10">
      <div className="flex flex-col items-start justify-between gap-6 rounded-2xl p-6 qf-glass md:flex-row md:items-center">
        <div>
          <div className="text-base font-semibold">QRForge</div>
          <div className="text-sm text-muted-foreground">
  Created by{" "}
  <span className="font-semibold text-foreground">
    Swejal Patade
  </span>
  <br />
  📧{" "}
  <a
    href="mailto:swejalpatade@gmail.com"
    className="underline-offset-4 hover:underline"
  >
    swejalpatade@gmail.com
  </a>
</div>
        </div>
        <a
          href="https://digitalheroesco.com"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-500 to-cyan-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:opacity-90"
        >
          Built for Digital Heroes →
        </a>
      </div>
      <p className="mt-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} QRForge. All rights reserved.
      </p>
    </footer>
  );
}