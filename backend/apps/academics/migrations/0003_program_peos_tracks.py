from django.db import migrations, models


BSCA_PRESENTATION_CONTENT = {
    "overview": "Developing intelligent applications for connected communities, the BSCA program prepares RIDE graduates: Researchers, Innovators, Developers, and Educators with strong computing foundations, research preparation, and industry immersion.",
    "recognition": "AACCUP Level III re-accredited from October 16, 2025 to October 15, 2029; aligned with CHED PSG under CMO No. 25, Series of 2015; homegrown MSU-IIT applied-computing program since 2010.",
    "program_educational_objectives": "\n".join([
        "Professional growth and advancement in career.",
        "Pursuit of graduate studies or further training.",
        "Continuous professional development and lifelong learning.",
        "Ethical and competent practice of the computer applications profession.",
    ]),
    "outcomes": "\n".join([
        "CA01 - Apply knowledge of mathematics and sciences to solve computer electronics problems.",
        "CA02 - Analyze a problem, formulate, and identify solutions for computer applications and technology problems using analytical tools appropriate to areas of specialization.",
        "CA03 - Apply design principles using software and firmware for broadly defined computer applications.",
        "CA04 - Implement and evaluate computer application systems, components, or processes to meet specific needs.",
        "CA05 - Select and apply appropriate techniques, resources, and modern computing and ICT tools necessary for computer applications practice.",
        "CA06 - Function effectively as a member or leader of a development team, recognizing different roles within a team to accomplish a common goal.",
        "CA07 - Communicate effectively with the computer applications community and society at large through logical writing, presentations, and clear instructions.",
        "CA08 - Understand and commit to professional ethics, responsibilities, and norms of computer and cyber technology practice.",
        "CA09 - Recognize the need for, and have the ability to engage in, independent learning for continual development as a technology specialist.",
    ]),
    "specialization_tracks": "\n".join([
        "Embedded Systems Track: edge devices, control, interfacing, and embedded intelligence.",
        "Computer Vision.",
        "HDL Programming.",
        "Embedded Systems Programming.",
        "Digital Signal Processing.",
        "Internet of Things Track: connectivity, data exchange, smart monitoring, and intelligent systems.",
        "Programming for IoT.",
        "Applied IoT.",
        "Artificial Intelligence in IoT.",
        "Robotics Systems.",
    ]),
    "curriculum_evidence": "\n".join([
        "Applied computing focus on real-world design, development, integration, and deployment of computing applications and systems.",
        "Two specialization pathways in Embedded Systems and Internet of Things.",
        "Hands-on laboratory and project work through programming demonstrations, guided laboratory sessions, and project-based learning.",
        "Applied research, research methods, and undergraduate thesis development.",
        "700-hour supervised industry immersion for workplace readiness, including opportunities with national and international companies.",
        "Emerging technology orientation aligned with Industry 4.0, IoT, AI, and current technological demands.",
    ]),
    "career_opportunities": "\n".join([
        "Application developer.",
        "System or application developer.",
        "Software support developer.",
        "Embedded systems developer.",
        "Firmware developer.",
        "IoT developer.",
        "Smart systems developer.",
        "Applied research assistant.",
        "Prototype and solutions developer.",
        "Innovation and technology project contributor.",
        "Technical trainer.",
        "Laboratory or academic support role.",
        "Future computing educator.",
        "MS in Computer Applications or other graduate studies.",
    ]),
}


def add_bsca_presentation_content(apps, schema_editor):
    Program = apps.get_model("academics", "Program")
    try:
        program = Program.objects.get(code="BSCA")
    except Program.DoesNotExist:
        return

    for field, value in BSCA_PRESENTATION_CONTENT.items():
        current = getattr(program, field, "")
        if value and value not in (current or ""):
            setattr(program, field, value)
    program.save()


class Migration(migrations.Migration):

    dependencies = [
        ("academics", "0002_program_accreditation_fields"),
    ]

    operations = [
        migrations.AddField(
            model_name="program",
            name="program_educational_objectives",
            field=models.TextField(blank=True, help_text="Enter one program educational objective per line."),
        ),
        migrations.AddField(
            model_name="program",
            name="specialization_tracks",
            field=models.TextField(blank=True, help_text="Enter one specialization track, focus area, or track course per line."),
        ),
        migrations.RunPython(add_bsca_presentation_content, migrations.RunPython.noop),
    ]
