from django.db import migrations, models


BSCA = {
    "code": "BSCA",
    "title": "Bachelor of Science in Computer Applications",
    "slug": "bsca",
    "degree_level": "UNDERGRAD",
    "overview": "The BSCA program prepares applied-computing professionals for software development, embedded systems, IoT, instrumentation, data handling, and technology-enabled organizational work.",
    "duration": "4 years",
    "curriculum_load": "147 academic units plus NSTP, with 700-hour OJT",
    "recognition": "BOR-approved curriculum, Resolution No. 129, Series of 2018",
    "outcomes": "\n".join([
        "Apply computing, mathematics, electronics, and systems concepts to solve real organizational and community problems.",
        "Design, implement, test, and document software and embedded-computing solutions using appropriate tools and standards.",
        "Conduct supervised undergraduate research and communicate results through technical reports, presentations, and prototypes.",
        "Demonstrate ethical, professional, collaborative, and lifelong-learning behavior in computing practice.",
    ]),
    "curriculum_evidence": "\n".join([
        "Structured four-year study plan with general education, professional computing courses, specialization courses, research, thesis, and OJT.",
        "Specialization exposure includes embedded systems, computer vision, HDL programming, digital signal processing, IoT, AI for IoT, applied IoT, and robotics systems.",
        "BCA197 On-the-Job Training requires 700 hours, giving accreditors a clear industry immersion point for outcomes evidence.",
        "BCA198 Research Methods and BCA199 Undergraduate Thesis provide a visible student-research pathway.",
    ]),
    "quality_evidence": "\n".join([
        "Curriculum map showing every course contribution to program outcomes.",
        "Syllabi with outcomes, assessment tasks, rubrics, references, and continuous improvement notes.",
        "OJT memoranda, supervisor evaluations, student portfolios, and employer feedback.",
        "Thesis abstracts, prototype documentation, defense rubrics, and adviser-panel evaluation records.",
    ]),
    "admission_requirements": "\n".join([
        "University admission eligibility and compliance with current undergraduate admission policies.",
        "Department orientation on program outcomes, retention rules, professional conduct, and computing laboratory use.",
        "Advising record for course sequencing, prerequisite compliance, and academic intervention where needed.",
    ]),
    "progression_requirements": "\n".join([
        "Completion of prerequisite courses before advanced programming, systems, embedded, and research courses.",
        "Research-methods preparation before thesis work.",
        "OJT deployment only after the department verifies readiness, documentation, and host-office requirements.",
    ]),
    "career_opportunities": "\n".join([
        "Software developer",
        "Systems analyst",
        "IoT or embedded-systems developer",
        "Data and application support specialist",
        "QA tester or technical documentation specialist",
        "Graduate-study candidate in computing and allied fields",
    ]),
    "is_published": True,
    "featured": True,
    "sort_order": 10,
}


MSCA = {
    "code": "MSCA",
    "title": "Master of Science in Computer Applications",
    "slug": "msca",
    "degree_level": "GRAD",
    "overview": "The MSCA program develops graduate-level research capability in applied computing, embedded systems, IoT, machine learning, cloud computing, cybersecurity, analytics, and related computing applications.",
    "duration": "Coursework, comprehensive examination, thesis proposal, thesis defense",
    "curriculum_load": "31 units for the regular track; 43 units when bridging courses are required",
    "recognition": "Revised graduate curriculum with thesis and publication requirements",
    "outcomes": "\n".join([
        "Formulate research problems grounded in computing theory, applied systems, and documented societal or industry need.",
        "Design and evaluate advanced computing solutions using rigorous methods, defensible data, and ethical research practice.",
        "Produce a thesis and a publication-quality research output appropriate for refereed or juried scholarly venues.",
        "Lead computing projects, mentor technical teams, and contribute to institutional research, extension, and innovation agendas.",
    ]),
    "curriculum_evidence": "\n".join([
        "Core courses cover advanced computer organization, advanced operating systems, research methods, emerging technologies, ICT for peace and development, systematic review, and thesis.",
        "Specialization courses include advanced embedded systems, digital signal processing, computer vision, machine learning for embedded systems, IoT, IoT network security, cloud computing, and big-data analytics for IoT.",
        "Comprehensive examination is taken after the required core preparation and before thesis progression.",
        "Graduation requires a thesis and at least one research output accepted in a refereed journal or equivalent juried scholarly outlet.",
    ]),
    "quality_evidence": "\n".join([
        "Graduate faculty qualifications, research supervision load, adviser expertise, and panel membership records.",
        "Course syllabi with graduate-level outcomes, assessment rubrics, research tasks, and current references.",
        "Comprehensive examination policies, results, item analysis, and improvement actions.",
        "Thesis proposals, ethics documentation, defense minutes, publication evidence, and citation or utilization records.",
    ]),
    "admission_requirements": "\n".join([
        "Graduate-school admission compliance, transcript review, and program-fit evaluation.",
        "Bridging-course prescription for applicants needing additional preparation in computing foundations.",
        "Orientation on research ethics, thesis supervision, graduate retention, residency, and publication expectations.",
    ]),
    "progression_requirements": "\n".join([
        "Completion of core coursework before comprehensive examination.",
        "Enrollment in graduate residency when no other course is taken while preparing for examination or thesis requirements.",
        "Successful thesis proposal defense before implementation, final defense, and publication documentation.",
    ]),
    "career_opportunities": "\n".join([
        "Graduate researcher",
        "Computing faculty member or trainer",
        "Systems architect",
        "IoT, AI, or analytics specialist",
        "Technology project lead",
        "Doctoral-study candidate",
    ]),
    "historical_notes": "\n".join([
        "Earlier MSCA curriculum documents included an ERDT scholarship-aligned 34-unit structure.",
        "The department should present this as a previous ERDT-linked curriculum track, not as a current scholarship offer.",
        "This historical linkage may support future partnership, scholarship, and quality-assurance narratives when backed by dated documents and outputs.",
    ]),
    "is_published": True,
    "featured": True,
    "sort_order": 20,
}


def seed_programs(apps, schema_editor):
    Program = apps.get_model("academics", "Program")
    for payload in (BSCA, MSCA):
        program, created = Program.objects.get_or_create(
            code=payload["code"],
            defaults=payload,
        )
        if created:
            continue

        changed = False
        for field, value in payload.items():
            current = getattr(program, field)
            if current in ("", None, False) and value not in ("", None):
                setattr(program, field, value)
                changed = True
        if changed:
            program.save()


class Migration(migrations.Migration):

    dependencies = [
        ("academics", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="program",
            name="curriculum_evidence",
            field=models.TextField(blank=True, help_text="Enter one curriculum feature or evidence item per line."),
        ),
        migrations.AddField(
            model_name="program",
            name="curriculum_load",
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.AddField(
            model_name="program",
            name="duration",
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.AddField(
            model_name="program",
            name="historical_notes",
            field=models.TextField(blank=True, help_text="Enter historical notes, linkages, or dated curriculum notes. Avoid presenting expired linkages as current offers."),
        ),
        migrations.AddField(
            model_name="program",
            name="outcomes",
            field=models.TextField(blank=True, help_text="Enter one program outcome per line."),
        ),
        migrations.AddField(
            model_name="program",
            name="progression_requirements",
            field=models.TextField(blank=True, help_text="Enter one progression or retention requirement per line."),
        ),
        migrations.AddField(
            model_name="program",
            name="quality_evidence",
            field=models.TextField(blank=True, help_text="Enter one accreditation evidence item per line."),
        ),
        migrations.AddField(
            model_name="program",
            name="recognition",
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.RunPython(seed_programs, migrations.RunPython.noop),
    ]
