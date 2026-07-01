from django.db import models
from apps.core.base_models import PublishableModel
from apps.quality.models import EvidenceDocument

class FacultyMember(PublishableModel):
    class PersonnelType(models.TextChoices):
        FACULTY = "faculty", "Faculty"
        ACADEMIC_STAFF = "academic_staff", "Academic Staff"
        LABORATORY_TECHNICIAN = "laboratory_technician", "Laboratory Technician"

    class FacultyStatus(models.TextChoices):
        ACTIVE_FULL_TIME = "active_full_time", "Active Full-Time"
        STUDY_LEAVE = "study_leave", "Study Leave"
        SABBATICAL_LEAVE = "sabbatical_leave", "Sabbatical Leave"

    personnel_type = models.CharField(
        max_length=32,
        choices=PersonnelType.choices,
        default=PersonnelType.FACULTY,
    )
    faculty_status = models.CharField(
        max_length=32,
        choices=FacultyStatus.choices,
        default=FacultyStatus.ACTIVE_FULL_TIME,
        blank=True,
        help_text="Use only when personnel type is Faculty.",
    )
    position = models.CharField(max_length=255, blank=True)
    employment_classification = models.CharField(max_length=255, blank=True)
    faculty_category = models.CharField(max_length=255, blank=True)
    highest_degree = models.CharField(max_length=255, blank=True)
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=50, blank=True)
    photo = models.ImageField(upload_to="faculty/", blank=True, null=True)
    educational_background = models.TextField(blank=True)
    specialization_areas = models.TextField(blank=True)
    research_interests = models.TextField(blank=True)
    courses_taught = models.TextField(blank=True)
    advising_areas = models.TextField(blank=True)
    certifications = models.TextField(blank=True)
    awards = models.TextField(blank=True)
    office = models.CharField(max_length=255, blank=True)
    seo_title = models.CharField(max_length=255, blank=True)
    seo_description = models.TextField(blank=True)
    og_title = models.CharField(max_length=255, blank=True)
    og_description = models.TextField(blank=True)
    
    evidence_documents = models.ManyToManyField(
        EvidenceDocument,
        blank=True,
        related_name="faculty_members"
    )

    def __str__(self):
        return self.title
