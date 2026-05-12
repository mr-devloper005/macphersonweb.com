import Link from "next/link";
import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SITE_CONFIG } from "@/lib/site-config";

const highlights = [
  { label: "PDF documents", value: "500+" },
  { label: "Categories", value: "20+" },
  { label: "Downloads", value: "10k+" },
];

const values = [
  { title: "Premium PDF Library", description: "Curated collection of high-quality PDF documents across multiple categories." },
  { title: "Clean Interface", description: "Elegant, distraction-free design focused on document discovery and access." },
  { title: "Easy Organization", description: "Smart categorization and search to find exactly what you need quickly." },
];

export default function AboutPage() {
  return (
    <PageShell
      title={`About ${SITE_CONFIG.name}`}
      description={`${SITE_CONFIG.name} is a premium platform for PDF document libraries and curated resource discovery.`}
      actions={
        <>
          <Button asChild>
            <Link href="/contact">Contact Us</Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="border-border bg-card">
          <CardContent className="space-y-4 p-6">
            <Badge variant="secondary">Our Story</Badge>
            <h2 className="text-2xl font-semibold text-foreground">
              A refined home for PDF resources and document discovery.
            </h2>
            <p className="text-sm text-muted-foreground">
              {SITE_CONFIG.name} provides a premium, curated library of PDF documents with powerful search and organization features.
              Find guides, reports, templates, and research papers in one elegant interface.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {highlights.map((item) => (
                <div key={item.label} className="rounded-lg border border-border bg-secondary/40 p-4">
                  <div className="text-2xl font-semibold text-foreground">{item.value}</div>
                  <div className="text-xs text-muted-foreground">{item.label}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <div className="space-y-4">
          {values.map((value) => (
            <Card key={value.title} className="border-border bg-card">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground">{value.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
