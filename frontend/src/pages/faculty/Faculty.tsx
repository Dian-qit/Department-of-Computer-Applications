import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { Seo } from "@/components/Seo";
import { Section, SectionHeader } from "@/components/ui/section";
import { useFaculty } from "@/hooks/usePeople";
import type { FacultyMember } from "@/types/api";

const TO_BE_PROVIDED = "To be provided by the Department";

const complement = [
  { label: "Faculty Members", value: "11" },
  { label: "Active Full-Time Faculty", value: "9" },
  { label: "Faculty on Study Leave", value: "1" },
  { label: "Faculty on Sabbatical Leave", value: "1" },
  { label: "Academic Staff", value: "1" },
  { label: "Laboratory Technicians", value: "2" },
];

const personnelLabels: Record<string, string> = {
  all: "All personnel",
  faculty: "Faculty",
  academic_staff: "Academic Staff",
  laboratory_technician: "Laboratory Technician",
};

const statusLabels: Record<string, string> = {
  all: "All faculty statuses",
  active_full_time: "Active Full-Time",
  study_leave: "Study Leave",
  sabbatical_leave: "Sabbatical Leave",
};

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

function includesText(value: string | undefined, query: string) {
  return value?.toLowerCase().includes(query) ?? false;
}

function DirectoryRow({ member }: { member: FacultyMember }) {
  const expertise = member.specialization_areas || member.research_interests;

  return (
    <article className="grid gap-4 border-b border-border p-4 last:border-b-0 md:grid-cols-[4rem_1.4fr_1fr_1.4fr_auto] md:items-start">
      <div className="h-16 w-16 overflow-hidden rounded-md border border-border bg-muted">
        {member.photo ? (
          <img src={member.photo} alt={`${member.title} profile photo`} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-primary">
            {initials(member.title)}
          </div>
        )}
      </div>

      <div>
        <h2 className="text-base font-semibold leading-snug text-primary">{member.title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{member.personnel_type_display || personnelLabels[member.personnel_type]}</p>
        {member.personnel_type === "faculty" && member.faculty_status_display && (
          <p className="mt-1 text-xs font-medium uppercase tracking-wide text-secondary">{member.faculty_status_display}</p>
        )}
      </div>

      <div className="text-sm">
        <p className="font-medium text-foreground">{valueOrPlaceholder(member.position)}</p>
        <p className="mt-1 text-muted-foreground">{valueOrPlaceholder(member.highest_degree || member.educational_background)}</p>
      </div>

      <div className="text-sm text-muted-foreground">
        <p>{valueOrPlaceholder(expertise)}</p>
        {member.email && (
          <a className="mt-2 inline-block font-medium text-accent hover:text-secondary" href={`mailto:${member.email}`}>
            {member.email}
          </a>
        )}
      </div>

      <Link to={`/faculty/${member.slug}`} className="text-sm font-semibold text-accent hover:text-secondary">
        View profile
      </Link>
    </article>
  );
}

export default function Faculty() {
  const { data: people = [], isLoading, isError } = useFaculty();
  const [query, setQuery] = useState("");
  const [personnelType, setPersonnelType] = useState("all");
  const [facultyStatus, setFacultyStatus] = useState("all");

  const rankOptions = useMemo(
    () => Array.from(new Set(people.map((member) => member.position).filter(Boolean))).sort(),
    [people],
  );
  const expertiseAreas = useMemo(
    () =>
      people
        .flatMap((member) => [member.specialization_areas, member.research_interests])
        .filter(Boolean)
        .slice(0, 6),
    [people],
  );

  const filteredPeople = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return people.filter((member) => {
      const matchesPersonnel = personnelType === "all" || member.personnel_type === personnelType;
      const matchesStatus = facultyStatus === "all" || member.faculty_status === facultyStatus;
      const matchesSearch =
        !normalizedQuery ||
        includesText(member.title, normalizedQuery) ||
        includesText(member.position, normalizedQuery) ||
        includesText(member.specialization_areas, normalizedQuery) ||
        includesText(member.research_interests, normalizedQuery);

      return matchesPersonnel && matchesStatus && matchesSearch;
    });
  }, [facultyStatus, people, personnelType, query]);

  const facultyOnLeave = people.filter(
    (member) => member.personnel_type === "faculty" && ["study_leave", "sabbatical_leave"].includes(member.faculty_status),
  );
  const supportStaff = people.filter((member) => member.personnel_type !== "faculty");

  return (
    <>
      <Seo
        title="Faculty and Academic Staff"
        description="Faculty and academic staff directory for the Department of Computer Applications, College of Computer Studies, MSU-IIT."
      />

      <Section>
        <SectionHeader
          title="Faculty and Academic Staff"
          subtitle="The Department's faculty and academic staff support instruction, thesis supervision, research, extension, laboratory operations, and academic advising in computer applications and applied computing."
          align="left"
        />

        <div className="mb-10 overflow-hidden rounded-md border border-border">
          <table className="w-full border-collapse text-left text-sm">
            <caption className="sr-only">Faculty and staff complement of the Department of Computer Applications</caption>
            <tbody>
              {complement.map((item) => (
                <tr key={item.label} className="border-b border-border last:border-b-0">
                  <th scope="row" className="bg-muted/40 p-4 font-semibold text-primary">
                    {item.label}
                  </th>
                  <td className="p-4 text-lg font-semibold text-foreground">{item.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mb-10 max-w-4xl text-sm leading-7 text-muted-foreground">
          The Department has 11 faculty members, including 9 active full-time faculty members, 1 faculty member on study
          leave, and 1 faculty member on sabbatical leave. The Department is further supported by 1 academic staff member
          and 2 laboratory technicians.
        </p>

        <div className="mb-8 grid gap-3 rounded-md border border-border bg-muted/20 p-4 md:grid-cols-[1.5fr_1fr_1fr]">
          <label className="relative block">
            <span className="sr-only">Search by name, position, specialization, or research interest</span>
            <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-muted-foreground" aria-hidden="true" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="h-10 w-full rounded-md border border-input bg-background pl-9 pr-3 text-sm"
              placeholder="Search directory"
            />
          </label>

          <label>
            <span className="sr-only">Filter by personnel type</span>
            <select
              value={personnelType}
              onChange={(event) => setPersonnelType(event.target.value)}
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              {Object.entries(personnelLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span className="sr-only">Filter by faculty status</span>
            <select
              value={facultyStatus}
              onChange={(event) => setFacultyStatus(event.target.value)}
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              {Object.entries(statusLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
        </div>

        {isLoading && <p className="text-sm text-muted-foreground">Loading faculty and staff directory...</p>}
        {isError && (
          <p className="rounded-md border border-border bg-muted/30 p-5 text-sm text-muted-foreground">
            Faculty and staff profile data could not be loaded. Complete individual faculty and staff profile information
            is {TO_BE_PROVIDED}.
          </p>
        )}

        {!isLoading && !isError && people.length === 0 && (
          <div className="rounded-md border border-border bg-muted/30 p-5 text-sm text-muted-foreground">
            Complete individual faculty and staff profile information is {TO_BE_PROVIDED}.
          </div>
        )}

        {filteredPeople.length > 0 && (
          <div className="overflow-hidden rounded-md border border-border bg-background">
            <div className="border-b border-border bg-muted/40 px-4 py-3 text-sm font-semibold text-primary">
              Faculty Directory
            </div>
            {filteredPeople.map((member) => (
              <DirectoryRow key={member.id} member={member} />
            ))}
          </div>
        )}

        {!isLoading && !isError && people.length > 0 && filteredPeople.length === 0 && (
          <p className="rounded-md border border-border bg-muted/30 p-5 text-sm text-muted-foreground">
            No published faculty or staff record matches the selected filters.
          </p>
        )}
      </Section>

      <Section variant="muted">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="mb-3 text-xl font-semibold text-primary">Faculty on Leave</h2>
            {facultyOnLeave.length ? (
              <ul className="space-y-2 text-sm text-muted-foreground">
                {facultyOnLeave.map((member) => (
                  <li key={member.id}>
                    <Link to={`/faculty/${member.slug}`} className="font-medium text-accent hover:text-secondary">
                      {member.title}
                    </Link>{" "}
                    - {member.faculty_status_display}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm leading-7 text-muted-foreground">
                Individual records are {TO_BE_PROVIDED}. Aggregate count: 1 faculty member on study leave and 1 faculty
                member on sabbatical leave.
              </p>
            )}
          </div>

          <div>
            <h2 className="mb-3 text-xl font-semibold text-primary">Academic Support Staff and Laboratory Technicians</h2>
            {supportStaff.length ? (
              <ul className="space-y-2 text-sm text-muted-foreground">
                {supportStaff.map((member) => (
                  <li key={member.id}>
                    <Link to={`/faculty/${member.slug}`} className="font-medium text-accent hover:text-secondary">
                      {member.title}
                    </Link>{" "}
                    - {member.personnel_type_display}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm leading-7 text-muted-foreground">
                Individual academic staff and laboratory technician records are {TO_BE_PROVIDED}. Aggregate count: 1
                academic staff member and 2 laboratory technicians.
              </p>
            )}
          </div>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="mb-3 text-xl font-semibold text-primary">Faculty Expertise Summary</h2>
            {expertiseAreas.length ? (
              <ul className="space-y-2 text-sm text-muted-foreground">
                {expertiseAreas.map((area, index) => (
                  <li key={`${area}-${index}`}>{area}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">{TO_BE_PROVIDED}.</p>
            )}
          </div>

          <div>
            <h2 className="mb-3 text-xl font-semibold text-primary">Advising and Thesis Supervision</h2>
            <p className="text-sm leading-7 text-muted-foreground">
              Faculty members may support undergraduate and graduate thesis advising, research supervision, and academic
              mentoring subject to official Department assignment and applicable university policies.
            </p>
            <p className="mt-4 text-sm">
              <Link to="/about/contact" className="font-semibold text-accent hover:text-secondary">
                Contact the Department
              </Link>
            </p>
          </div>
        </div>

        {rankOptions.length > 0 && (
          <p className="mt-8 text-xs text-muted-foreground">
            Rank / position filters are available when official position data has been uploaded. Current listed positions:
            {" "}
            {rankOptions.join(", ")}.
          </p>
        )}
      </Section>
    </>
  );
}
