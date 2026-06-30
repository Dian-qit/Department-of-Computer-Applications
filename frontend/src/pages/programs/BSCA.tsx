import { CheckCircle2, FileCheck2, GraduationCap, ListChecks } from "lucide-react";
import { PageHero } from "@/components/ui/hero-section";
import { Section, SectionHeader } from "@/components/ui/section";
import { useProgram } from "@/hooks/useAcademics";
import { bscaProgram, normalizeProgram, qaStandards } from "./programData";

function BulletPanel({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="card-elevated p-5">
      <h3 className="mb-4 text-lg font-semibold text-primary">{title}</h3>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-6 text-muted-foreground">
            <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-secondary" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function BSCA() {
  const { data, isError } = useProgram("bsca");
  const program = normalizeProgram(data, bscaProgram);

  return (
    <>
      <PageHero
        title={program.title}
        subtitle="A four-year applied-computing degree with embedded systems, IoT, research, thesis, and supervised industry immersion."
      />

      <Section>
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            {isError && (
              <p className="mb-4 rounded-md border border-border bg-muted/30 p-4 text-sm text-muted-foreground">
                Showing built-in BSCA content because the live Django program record could not be reached.
              </p>
            )}
            <p className="mb-6 text-lg leading-8 text-muted-foreground">{program.summary}</p>
            <div className="rounded-md border-l-4 border-secondary bg-secondary/10 p-5">
              <h2 className="mb-2 text-xl font-semibold text-primary">Official Curriculum Identity</h2>
              <p className="text-sm leading-6 text-muted-foreground">
                {program.recognition}. The public page should be supported internally by the approved curriculum,
                curriculum map, syllabi, faculty loading, laboratory inventory, OJT records, thesis outputs, and annual
                program-improvement minutes.
              </p>
            </div>
          </div>
          <dl className="grid gap-3">
            {[
              ["Program Code", program.code],
              ["Level", program.level],
              ["Duration", program.duration],
              ["Curriculum Load", program.units],
            ].map(([label, value]) => (
              <div key={label} className="rounded-md border border-border bg-muted/30 p-4">
                <dt className="text-sm font-semibold text-primary">{label}</dt>
                <dd className="mt-1 text-sm text-muted-foreground">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Section variant="muted">
        <SectionHeader
          title="Program Educational Objectives"
          subtitle="The BSCA program develops graduates for career growth, graduate study, lifelong learning, and ethical professional practice."
        />
        <div className="grid gap-4 md:grid-cols-2">
          {program.peos.map((peo, index) => (
            <div key={peo} className="card-elevated flex gap-4 p-5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                {index + 1}
              </div>
              <p className="text-sm leading-6 text-muted-foreground">{peo}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader
          title="Program Outcomes"
          subtitle="The CA01-CA09 outcomes group graduate capability across foundations, design and implementation, teamwork and communication, ethics, and lifelong learning."
        />
        <div className="grid gap-4 md:grid-cols-2">
          {program.outcomes.map((outcome, index) => (
            <div key={outcome} className="card-elevated flex gap-4 p-5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-bold text-secondary-foreground">
                {index + 1}
              </div>
              <p className="text-sm leading-6 text-muted-foreground">{outcome}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section variant="muted">
        <SectionHeader
          title="Tracks and Focus Areas"
          subtitle="The program’s distinctive applied-computing space is strengthened by embedded systems and Internet of Things pathways."
        />
        <div className="grid gap-3 md:grid-cols-2">
          {program.tracks.map((track) => (
            <div key={track} className="rounded-md border border-border bg-background p-4 text-sm leading-6 text-muted-foreground">
              {track}
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader title="Curriculum and Assessment Evidence" align="left" />
        <div className="grid gap-5 lg:grid-cols-2">
          <BulletPanel title="Curriculum Features" items={program.curriculumEvidence} />
          <BulletPanel title="Evidence to Keep Ready" items={program.qualityEvidence} />
        </div>
      </Section>

      <Section variant="muted">
        <SectionHeader title="Student Pathway" />
        <div className="grid gap-5 lg:grid-cols-3">
          <BulletPanel title="Admission and Advising" items={program.admissions} />
          <BulletPanel title="Progression and Retention" items={program.progression} />
          <BulletPanel title="Graduate Roles" items={program.careers} />
        </div>
      </Section>

      <Section>
        <div className="grid gap-5 lg:grid-cols-3">
          <div className="card-elevated p-5">
            <GraduationCap className="mb-4 h-8 w-8 text-secondary" />
            <h3 className="mb-2 text-lg font-semibold text-primary">CHED COPC Readiness</h3>
            <p className="text-sm leading-6 text-muted-foreground">
              Show approved curriculum, qualified faculty, library and laboratory support, student policies, and
              assessment records tied to program outcomes.
            </p>
          </div>
          <div className="card-elevated p-5">
            <ListChecks className="mb-4 h-8 w-8 text-secondary" />
            <h3 className="mb-2 text-lg font-semibold text-primary">AACCUP Level III Readiness</h3>
            <p className="text-sm leading-6 text-muted-foreground">
              Highlight instruction, research, extension, faculty development, student achievement, linkages, and
              documented improvements from evaluation results.
            </p>
          </div>
          <div className="card-elevated p-5">
            <FileCheck2 className="mb-4 h-8 w-8 text-secondary" />
            <h3 className="mb-2 text-lg font-semibold text-primary">AUN-QA Readiness</h3>
            <p className="text-sm leading-6 text-muted-foreground">
              Maintain clear expected learning outcomes, curriculum alignment, teaching-learning evidence, assessment
              rubrics, stakeholder feedback, and output measures.
            </p>
          </div>
        </div>
        <div className="mt-5 rounded-md border border-border bg-muted/30 p-5">
          <h3 className="mb-3 text-lg font-semibold text-primary">Crosswalk Reminder</h3>
          <ul className="grid gap-2 text-sm leading-6 text-muted-foreground md:grid-cols-2">
            {qaStandards.map((standard) => (
              <li key={standard}>{standard}</li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
}
