import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  BarChart3,
  MapPin,
  Smartphone,
  Clock,
  Megaphone,
  Layers,
  Activity,
  Repeat,
} from "lucide-react";

export const Route = createFileRoute("/analytics")({
  head: () => ({
    meta: [
      { title: "QR Analytics – QRForge" },
      {
        name: "description",
        content:
          "Learn how QR analytics work, the difference between static and dynamic QR codes, and what data marketers can track.",
      },
      { property: "og:title", content: "QR Analytics – QRForge" },
      {
        property: "og:description",
        content:
          "What QR analytics are, static vs dynamic QR codes, trackable data, and marketing use cases.",
      },
    ],
  }),
  component: AnalyticsPage,
});

function AnalyticsPage() {
  return (
    <div className="min-h-screen qf-gradient-bg">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 pt-12">
        <header className="text-center">
          <span className="qf-chip mb-4">
            <Activity className="h-3 w-3 text-cyan-500" /> Insights guide
          </span>
          <h1 className="mx-auto max-w-3xl bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-4xl font-black tracking-tight text-transparent sm:text-5xl">
            Understanding QR Code Analytics
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
            QR analytics turn every scan into actionable insight — who, where, when, and on
            what device. Here's everything you need to know.
          </p>
        </header>

        <section className="mt-12 grid gap-5 sm:grid-cols-2">
          <Card
            icon={<Layers className="h-5 w-5" />}
            title="Static QR codes"
            body="Encode data directly into the QR pattern. Free, permanent, and unchangeable — but offer no analytics or editing after printing."
          />
          <Card
            icon={<Repeat className="h-5 w-5" />}
            title="Dynamic QR codes"
            body="Point to a short URL that redirects to your destination. The destination — and the campaign — can be edited any time, and every scan is tracked."
          />
        </section>

        <section className="mt-12">
          <h2 className="mb-5 text-2xl font-bold tracking-tight">What you can track</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Stat icon={<BarChart3 className="h-5 w-5" />} title="Total scans" body="Lifetime and per-campaign scan counts in real time." />
            <Stat icon={<Smartphone className="h-5 w-5" />} title="Device type" body="iOS, Android, desktop, plus browser and OS breakdowns." />
            <Stat icon={<MapPin className="h-5 w-5" />} title="Geographic location" body="Country, region, and city derived from scan IP." />
            <Stat icon={<Clock className="h-5 w-5" />} title="Date & time" body="Hour-of-day and day-of-week heatmaps for every campaign." />
          </div>
        </section>

        <section className="mt-12 rounded-3xl p-8 qf-glass">
          <div className="flex items-start gap-4">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-fuchsia-500 to-cyan-500 text-white shadow-lg">
              <Megaphone className="h-6 w-6" />
            </div>
            <div className="min-w-0">
              <h2 className="text-2xl font-bold tracking-tight">Marketing use cases</h2>
              <p className="mt-2 text-muted-foreground">
                From print to packaging to OOH — measure what was previously invisible.
              </p>
            </div>
          </div>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              "Compare scan performance across billboard locations",
              "A/B test packaging designs by region",
              "Track conference handout pickup vs scan rate",
              "Re-route a printed QR after a campaign pivots",
              "Measure dwell-time on landing pages by scan source",
              "Trigger retargeting audiences from scan events",
            ].map((u) => (
              <li
                key={u}
                className="flex items-start gap-2 rounded-xl border border-border/50 bg-background/40 px-4 py-3 text-sm"
              >
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-500" />
                {u}
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function Card({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-3xl p-6 qf-glass transition hover:-translate-y-0.5">
      <div className="mb-3 grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-fuchsia-500/15 to-cyan-500/15 text-fuchsia-600 dark:text-fuchsia-300">
        {icon}
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-1.5 text-sm text-muted-foreground">{body}</p>
    </div>
  );
}

function Stat({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl border border-border/50 bg-background/40 p-5 qf-glass">
      <div className="mb-2 text-fuchsia-600 dark:text-fuchsia-300">{icon}</div>
      <div className="text-sm font-semibold">{title}</div>
      <div className="mt-1 text-xs text-muted-foreground">{body}</div>
    </div>
  );
}