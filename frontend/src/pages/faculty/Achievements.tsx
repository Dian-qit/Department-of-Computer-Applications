import { Link } from "react-router-dom";
import { Seo } from "@/components/Seo";
import { PageHero } from "@/components/ui/hero-section";
import { Section } from "@/components/ui/section";

export default function Achievements() {
  return (
    <>
      <Seo
        title="Faculty Achievements"
        description="Verified faculty achievements and recognitions for the Department of Computer Applications."
      />
      <PageHero
        title="Faculty Achievements"
        subtitle="Awards, recognitions, publications, and professional accomplishments will be published only when official verified records are available."
      />
      <Section>
        <div className="max-w-4xl rounded-md border border-border bg-muted/30 p-5 text-sm leading-7 text-muted-foreground">
          <p>Verified faculty achievements and recognitions are To be provided by the Department.</p>
          <p className="mt-4">
            This page is reserved for official, evidence-supported information and does not display unvalidated awards,
            statistics, or publication counts.
          </p>
          <Link to="/faculty" className="mt-5 inline-block font-semibold text-accent hover:text-secondary">
            View Faculty and Academic Staff
          </Link>
        </div>
      </Section>
    </>
  );
}
