import type { Program } from "@/types/api";

export type ProgramProfile = {
  slug: string;
  code: string;
  title: string;
  level: string;
  duration: string;
  units: string;
  recognition: string;
  summary: string;
  route: string;
  outcomes: string[];
  curriculumEvidence: string[];
  qualityEvidence: string[];
  admissions: string[];
  progression: string[];
  careers: string[];
};

export const bscaProgram: ProgramProfile = {
  slug: "bsca",
  code: "BSCA",
  title: "Bachelor of Science in Computer Applications",
  level: "Undergraduate",
  duration: "4 years",
  units: "147 academic units plus NSTP, with 700-hour OJT",
  recognition: "BOR-approved curriculum, Resolution No. 129, Series of 2018",
  summary:
    "The BSCA program prepares applied-computing professionals for software development, embedded systems, IoT, instrumentation, data handling, and technology-enabled organizational work.",
  route: "/programs/bsca",
  outcomes: [
    "Apply computing, mathematics, electronics, and systems concepts to solve real organizational and community problems.",
    "Design, implement, test, and document software and embedded-computing solutions using appropriate tools and standards.",
    "Conduct supervised undergraduate research and communicate results through technical reports, presentations, and prototypes.",
    "Demonstrate ethical, professional, collaborative, and lifelong-learning behavior in computing practice.",
  ],
  curriculumEvidence: [
    "Structured four-year study plan with general education, professional computing courses, specialization courses, research, thesis, and OJT.",
    "Specialization exposure includes embedded systems, computer vision, HDL programming, digital signal processing, IoT, AI for IoT, applied IoT, and robotics systems.",
    "BCA197 On-the-Job Training requires 700 hours, giving accreditors a clear industry immersion point for outcomes evidence.",
    "BCA198 Research Methods and BCA199 Undergraduate Thesis provide a visible student-research pathway.",
  ],
  qualityEvidence: [
    "Curriculum map showing every course contribution to program outcomes.",
    "Syllabi with outcomes, assessment tasks, rubrics, references, and continuous improvement notes.",
    "OJT memoranda, supervisor evaluations, student portfolios, and employer feedback.",
    "Thesis abstracts, prototype documentation, defense rubrics, and adviser-panel evaluation records.",
  ],
  admissions: [
    "University admission eligibility and compliance with current undergraduate admission policies.",
    "Department orientation on program outcomes, retention rules, professional conduct, and computing laboratory use.",
    "Advising record for course sequencing, prerequisite compliance, and academic intervention where needed.",
  ],
  progression: [
    "Completion of prerequisite courses before advanced programming, systems, embedded, and research courses.",
    "Research-methods preparation before thesis work.",
    "OJT deployment only after the department verifies readiness, documentation, and host-office requirements.",
  ],
  careers: [
    "Software developer",
    "Systems analyst",
    "IoT or embedded-systems developer",
    "Data and application support specialist",
    "QA tester or technical documentation specialist",
    "Graduate-study candidate in computing and allied fields",
  ],
};

export const mscaProgram: ProgramProfile = {
  slug: "msca",
  code: "MSCA",
  title: "Master of Science in Computer Applications",
  level: "Graduate",
  duration: "Coursework, comprehensive examination, thesis proposal, thesis defense",
  units: "31 units for the regular track; 43 units when bridging courses are required",
  recognition: "Revised graduate curriculum with thesis and publication requirements",
  summary:
    "The MSCA program develops graduate-level research capability in applied computing, embedded systems, IoT, machine learning, cloud computing, cybersecurity, analytics, and related computing applications.",
  route: "/programs/msca",
  outcomes: [
    "Formulate research problems grounded in computing theory, applied systems, and documented societal or industry need.",
    "Design and evaluate advanced computing solutions using rigorous methods, defensible data, and ethical research practice.",
    "Produce a thesis and a publication-quality research output appropriate for refereed or juried scholarly venues.",
    "Lead computing projects, mentor technical teams, and contribute to institutional research, extension, and innovation agendas.",
  ],
  curriculumEvidence: [
    "Core courses cover advanced computer organization, advanced operating systems, research methods, emerging technologies, ICT for peace and development, systematic review, and thesis.",
    "Specialization courses include advanced embedded systems, digital signal processing, computer vision, machine learning for embedded systems, IoT, IoT network security, cloud computing, and big-data analytics for IoT.",
    "Comprehensive examination is taken after the required core preparation and before thesis progression.",
    "Graduation requires a thesis and at least one research output accepted in a refereed journal or equivalent juried scholarly outlet.",
  ],
  qualityEvidence: [
    "Graduate faculty qualifications, research supervision load, adviser expertise, and panel membership records.",
    "Course syllabi with graduate-level outcomes, assessment rubrics, research tasks, and current references.",
    "Comprehensive examination policies, results, item analysis, and improvement actions.",
    "Thesis proposals, ethics documentation, defense minutes, publication evidence, and citation or utilization records.",
  ],
  admissions: [
    "Graduate-school admission compliance, transcript review, and program-fit evaluation.",
    "Bridging-course prescription for applicants needing additional preparation in computing foundations.",
    "Orientation on research ethics, thesis supervision, graduate retention, residency, and publication expectations.",
  ],
  progression: [
    "Completion of core coursework before comprehensive examination.",
    "Enrollment in graduate residency when no other course is taken while preparing for examination or thesis requirements.",
    "Successful thesis proposal defense before implementation, final defense, and publication documentation.",
  ],
  careers: [
    "Graduate researcher",
    "Computing faculty member or trainer",
    "Systems architect",
    "IoT, AI, or analytics specialist",
    "Technology project lead",
    "Doctoral-study candidate",
  ],
};

export const programs = [bscaProgram, mscaProgram];

export const historicalLinkages = [
  "Earlier MSCA curriculum documents included an ERDT scholarship-aligned 34-unit structure.",
  "The department should present this as a previous ERDT-linked curriculum track, not as a current scholarship offer.",
  "This historical linkage may support future partnership, scholarship, and quality-assurance narratives when backed by dated documents and outputs.",
];

export const qaStandards = [
  "CHED COPC: curriculum authority, faculty qualifications, facilities, library and laboratory resources, admission-retention policies, and student-support evidence.",
  "AACCUP Level III: outcomes-based instruction, research, extension, faculty development, student performance, community impact, and documented continuous improvement.",
  "CHED COE readiness: strong faculty profile, research productivity, graduate outcomes, extension leadership, linkages, and visible centers of specialization.",
  "AUN-QA: program outcomes, curriculum design, teaching-learning strategy, student assessment, academic staff quality, support services, facilities, stakeholder feedback, and output measures.",
];

const fallbackBySlug = {
  bsca: bscaProgram,
  msca: mscaProgram,
};

function pickList(adminItems: string[] | undefined, fallbackItems: string[]) {
  return adminItems && adminItems.length > 0 ? adminItems : fallbackItems;
}

export function normalizeProgram(program: Program | undefined, fallback: ProgramProfile): ProgramProfile {
  if (!program) return fallback;

  return {
    ...fallback,
    code: program.code || fallback.code,
    title: program.title || fallback.title,
    slug: program.slug === "msca" ? "msca" : program.slug === "bsca" ? "bsca" : fallback.slug,
    level: program.degree_level_display || fallback.level,
    duration: program.duration || fallback.duration,
    units: program.curriculum_load || fallback.units,
    recognition: program.recognition || fallback.recognition,
    summary: program.overview || fallback.summary,
    route: `/programs/${program.slug || fallback.slug}`,
    outcomes: pickList(program.outcomes_list, fallback.outcomes),
    curriculumEvidence: pickList(program.curriculum_evidence_list, fallback.curriculumEvidence),
    qualityEvidence: pickList(program.quality_evidence_list, fallback.qualityEvidence),
    admissions: pickList(program.admission_requirements_list, fallback.admissions),
    progression: pickList(program.progression_requirements_list, fallback.progression),
    careers: pickList(program.career_opportunities_list, fallback.careers),
  };
}

export function normalizePrograms(adminPrograms: Program[] | undefined): ProgramProfile[] {
  if (!adminPrograms || adminPrograms.length === 0) return programs;

  const merged = programs.map((fallback) => {
    const adminProgram = adminPrograms.find((program) => program.slug === fallback.slug || program.code === fallback.code);
    return normalizeProgram(adminProgram, fallback);
  });

  const extraPrograms = adminPrograms
    .filter((program) => !fallbackBySlug[program.slug as keyof typeof fallbackBySlug])
    .map((program) => ({
      slug: program.slug === "msca" ? "msca" : "bsca",
      code: program.code,
      title: program.title,
      level: program.degree_level_display || program.degree_level,
      duration: program.duration || "See program details",
      units: program.curriculum_load || "See approved curriculum",
      recognition: program.recognition || "Published program record",
      summary: program.overview,
      route: `/programs/${program.slug}`,
      outcomes: program.outcomes_list || [],
      curriculumEvidence: program.curriculum_evidence_list || [],
      qualityEvidence: program.quality_evidence_list || [],
      admissions: program.admission_requirements_list || [],
      progression: program.progression_requirements_list || [],
      careers: program.career_opportunities_list || [],
    }));

  return [...merged, ...extraPrograms];
}
