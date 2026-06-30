from django.db import models
from apps.core.base_models import PublishableModel
from apps.quality.models import EvidenceDocument

class Program(PublishableModel):
    DEGREE_LEVELS = [
        ("UNDERGRAD", "Undergraduate"),
        ("GRAD", "Graduate"),
    ]

    code = models.CharField(max_length=20, unique=True)
    degree_level = models.CharField(max_length=20, choices=DEGREE_LEVELS)
    overview = models.TextField()
    duration = models.CharField(max_length=255, blank=True)
    curriculum_load = models.CharField(max_length=255, blank=True)
    recognition = models.CharField(max_length=255, blank=True)
    program_educational_objectives = models.TextField(blank=True, help_text="Enter one program educational objective per line.")
    outcomes = models.TextField(blank=True, help_text="Enter one program outcome per line.")
    specialization_tracks = models.TextField(blank=True, help_text="Enter one specialization track, focus area, or track course per line.")
    curriculum_evidence = models.TextField(blank=True, help_text="Enter one curriculum feature or evidence item per line.")
    quality_evidence = models.TextField(blank=True, help_text="Enter one accreditation evidence item per line.")
    career_opportunities = models.TextField(blank=True)
    admission_requirements = models.TextField(blank=True)
    progression_requirements = models.TextField(blank=True, help_text="Enter one progression or retention requirement per line.")
    historical_notes = models.TextField(blank=True, help_text="Enter historical notes, linkages, or dated curriculum notes. Avoid presenting expired linkages as current offers.")
    faq_intro = models.TextField(blank=True)
    curriculum_pdf = models.FileField(upload_to="programs/curricula/", blank=True, null=True)

    evidence_documents = models.ManyToManyField(
        EvidenceDocument,
        blank=True,
        related_name="programs"
    )

    def __str__(self):
        return self.code
