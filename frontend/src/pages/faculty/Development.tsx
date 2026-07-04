import { Link } from "react-router-dom";
import { Seo } from "@/components/Seo";
import { PageHero } from "@/components/ui/hero-section";
import { Section } from "@/components/ui/section";

export default function Development() {
  return (
    <>
      <Seo
        title="Faculty Development"
        description="Faculty development information for the Department of Computer Applications, pending official Department validation."
      />
      <PageHero
        title="Faculty Development"
        subtitle="Professional development information will be published from official Department records when available."
      />
      <Section>
        <div className="max-w-4xl rounded-md border border-border bg-muted/30 p-5 text-sm leading-7 text-muted-foreground">
          <p>Faculty development activities, scholarships, trainings, and related evidence are To be provided by the Department.</p>
          <p className="mt-4">
            Published entries should be based on verified Department records and applicable university documentation.
          </p>
          <Link to="/faculty" className="mt-5 inline-block font-semibold text-accent hover:text-secondary">
            View Faculty and Academic Staff
          </Link>
        </div>
      </Section>
    </>
  );
}
