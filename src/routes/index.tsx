import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { QRGenerator } from "@/components/QRGenerator";
import { Sparkles, Zap, Palette, Image as ImageIcon } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "QRForge – Advanced QR Code Generator" },
      {
        name: "description",
        content:
          "Design beautiful, scannable QR codes with custom colors, logos, and download as PNG, JPG or SVG.",
      },
      { property: "og:title", content: "QRForge – Advanced QR Code Generator" },
      {
        property: "og:description",
        content:
          "Design beautiful, scannable QR codes with custom colors, logos, and download as PNG, JPG or SVG.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen qf-gradient-bg">
      <Navbar />
      <main>
        <section className="mx-auto max-w-6xl px-4 pt-12 text-center">
          <span className="qf-chip mb-4">
            <Sparkles className="h-3 w-3 text-fuchsia-500" /> Fast · Free · No sign-up
          </span>
          <h1 className="mx-auto max-w-3xl bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-4xl font-black tracking-tight text-transparent sm:text-6xl">
            Craft QR codes that look as good as your brand.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Customize colors, embed a logo, and export pixel-perfect PNG, JPG, or SVG —
            all in your browser, all in real time.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm">
            <Feature icon={<Zap className="h-4 w-4" />} label="Live preview" />
            <Feature icon={<Palette className="h-4 w-4" />} label="Color control" />
            <Feature icon={<ImageIcon className="h-4 w-4" />} label="Logo embed" />
          </div>
        </section>

        <QRGenerator />
      </main>
      <Footer />
    </div>
  );
}

function Feature({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="qf-chip">
      {icon} {label}
    </span>
  );
}
