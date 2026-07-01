import { Link, useParams } from "react-router-dom";
import type { ReactNode } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { Seo } from "@/components/Seo";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/ui/hero-section";
import { useFacultyMember } from "@/hooks/usePeople";

const TO_BE_PROVIDED = "To be provided by the Department";

function valueOrPlaceholder(value?: string) {
  return value?.trim() || TO_BE_PROVIDED;
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function ProfileSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t border-border pt-6">
      <h2 className="mb-3 text-lg font-semibold text-primary">{title}</h2>
      <div className="text-sm leading-7 text-muted-foreground">{children}</div>
    </section>
  );
}

export default function FacultyProfile() {
  const { slug } = useParams();
  const { data: member, isLoading, isError } = useFacultyMember(slug);

  if (isLoading) {
    return (
      <>
        <Seo title="Faculty Profile" description="Faculty and staff profile information." />
        <Section>
          <p className="text-sm text-muted-foreground">Loading faculty or staff profile...</p>
        </Section>
      </>
    );
  }

  if (isError || !member) {
    return (
      <>
        <Seo title="Faculty Profile Unavailable" description="Faculty and staff profile information could not be loaded." />
        <PageHero
          title="Faculty Profile Unavailable"
          subtitle="The requested faculty or staff profile could not be loaded from the Department directory."
        />
        <Section>
          <div className="rounded-md border border-border bg-muted/30 p-5 text-sm text-muted-foreground">
            Complete individual faculty and staff profile information is {TO_BE_PROVIDED}.
          </div>
          <Link to="/faculty" className="mt-6 inline-block text-sm font-semibold text-accent hover:text-secondary">
            Back to Faculty and Academic Staff
          </Link>
        </Section>
      </>
    );
  }

  const seoTitle = member.seo_title || member.title;
  const seoDescription =
    member.seo_description ||
    `${member.title} profile in the Department of Computer Applications faculty and staff directory.`;
  const expertise = member.specialization_areas || member.research_interests;

  return (
    <>
      <Seo
        title={seoTitle}
        description={seoDescription}
        ogTitle={member.og_title || seoTitle}
        ogDescription={member.og_description || seoDescription}
      />
      <PageHero
        title={member.title}
        subtitle={`${member.personnel_type_display}${member.position ? ` - ${member.position}` : ""}`}
      />

      <Section>
        <div className="grid gap-8 lg:grid-cols-[18rem_1fr]">
          <aside className="space-y-5">
            <div className="aspect-square w-full overflow-hidden rounded-md border border-border bg-muted">
              {member.photo ? (
                <img src={member.photo} alt={`${member.title} profile photo`} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-4xl font-semibold text-primary">
                  {initials(member.title)}
                </div>
              )}
            </div>

            <div className="space-y-3 rounded-md border border-border p-4 text-sm">
              <div>
                <p className="font-semibold text-primary">{member.personnel_type_display}</p>
                {member.personnel_type === "faculty" && member.faculty_status_display && (
                  <p className="mt-1 text-muted-foreground">{member.faculty_status_display}</p>
                )}
              </div>
              <p className="text-muted-foreground">{valueOrPlaceholder(member.position)}</p>
              {member.email && (
                <a className="flex items-center gap-2 text-accent hover:text-secondary" href={`mailto:${member.email}`}>
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  {member.email}
                </a>
              )}
              {member.phone && (
                <p className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  {member.phone}
                </p>
              )}
              {member.office && (
                <p className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                  {member.office}
                </p>
              )}
              {!member.email && !member.phone && !member.office && (
                <Link to="/about/contact" className="font-semibold text-accent hover:text-secondary">
                  Department contact inquiry
                </Link>
              )}
            </div>
          </aside>

          <div className="space-y-8">
            <ProfileSection title="Academic / Professional Profile">
              <dl className="grid gap-4 md:grid-cols-2">
                <div>
                  <dt className="font-semibold text-foreground">Highest Degree</dt>
                  <dd>{valueOrPlaceholder(member.highest_degree)}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-foreground">Specialization Areas</dt>
                  <dd>{valueOrPlaceholder(member.specialization_areas)}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-foreground">Research Interests</dt>
                  <dd>{valueOrPlaceholder(member.research_interests)}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-foreground">Teaching Areas or Courses Taught</dt>
                  <dd>{valueOrPlaceholder(member.courses_taught)}</dd>
                </div>
              </dl>
              <div className="mt-5">
                <p className="font-semibold text-foreground">Educational Background</p>
                <p>{valueOrPlaceholder(member.educational_background)}</p>
              </div>
              {member.employment_classification && (
                <p className="mt-4">Employment classification: {member.employment_classification}</p>
              )}
              {member.faculty_category && <p className="mt-2">Faculty category: {member.faculty_category}</p>}
            </ProfileSection>

            <ProfileSection title="Advising / Thesis Supervision">
              <p>{valueOrPlaceholder(member.advising_areas)}</p>
            </ProfileSection>

            <ProfileSection title="Certifications and Awards">
              <dl className="grid gap-4 md:grid-cols-2">
                <div>
                  <dt className="font-semibold text-foreground">Certifications</dt>
                  <dd>{valueOrPlaceholder(member.certifications)}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-foreground">Awards and Recognitions</dt>
                  <dd>{valueOrPlaceholder(member.awards)}</dd>
                </div>
              </dl>
            </ProfileSection>

            {member.evidence_documents.length > 0 && (
              <ProfileSection title="Evidence / Documents">
                <ul className="space-y-2">
                  {member.evidence_documents.map((document) => (
                    <li key={document}>{document}</li>
                  ))}
                </ul>
              </ProfileSection>
            )}

            <ProfileSection title="Contact and Inquiry">
              <p>
                For Department-level inquiries, contact the Department of Computer Applications through the official
                contact page.
              </p>
              <Link to="/about/contact" className="mt-3 inline-block font-semibold text-accent hover:text-secondary">
                Contact the Department
              </Link>
            </ProfileSection>

            {expertise && (
              <p className="text-xs text-muted-foreground">
                Profile information is displayed from published Django-backed Department records.
              </p>
            )}

            <Link to="/faculty" className="inline-block text-sm font-semibold text-accent hover:text-secondary">
              Back to Faculty and Academic Staff
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
