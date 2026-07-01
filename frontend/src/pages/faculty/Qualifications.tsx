import { Link } from "react-router-dom";
import { Seo } from "@/components/Seo";
import { PageHero } from "@/components/ui/hero-section";
import { Section } from "@/components/ui/section";

export default function Qualifications() {
  return (
    <>
      <Seo
        title="Faculty Qualifications"
        description="Faculty qualification information for the Department of Computer Applications, pending official Department validation."
      />
      <PageHero
        title="Faculty Qualifications"
        subtitle="Verified faculty qualification records will be maintained through the Department directory and supporting evidence documents."
      />
      <Section>
        <div className="max-w-4xl rounded-md border border-border bg-muted/30 p-5 text-sm leading-7 text-muted-foreground">
          <p>
            Faculty qualification summaries, degree information, certifications, and related evidence are To be provided
            by the Department.
          </p>
          <p className="mt-4">
            Any public qualification summary should be based on published Django-backed faculty records and official
            Department validation.
          </p>
          <Link to="/faculty" className="mt-5 inline-block font-semibold text-accent hover:text-secondary">
            View Faculty and Academic Staff
          </Link>
        </div>
      </Section>
    </>
  );
}
