from django.contrib import admin
from .models import Program


@admin.action(description="Mark selected programs as published")
def mark_published(modeladmin, request, queryset):
    queryset.update(is_published=True)


@admin.register(Program)
class ProgramAdmin(admin.ModelAdmin):
    list_display = ("code", "title", "degree_level", "is_published", "featured", "updated_at")
    list_filter = ("degree_level", "is_published", "featured")
    search_fields = ("code", "title", "overview", "recognition")
    prepopulated_fields = {"slug": ("title",)}
    readonly_fields = ("created_at", "updated_at")
    filter_horizontal = ("evidence_documents",)
    actions = [mark_published]
    fieldsets = (
        ("Program Identity", {
            "fields": (
                "code",
                "title",
                "slug",
                "degree_level",
                "overview",
                "duration",
                "curriculum_load",
                "recognition",
            )
        }),
        ("Accreditation-Ready Content", {
            "fields": (
                "program_educational_objectives",
                "outcomes",
                "specialization_tracks",
                "curriculum_evidence",
                "quality_evidence",
            ),
            "description": "Use one item per line so the website can display these as structured evidence lists.",
        }),
        ("Student Pathway", {
            "fields": (
                "admission_requirements",
                "progression_requirements",
                "career_opportunities",
                "faq_intro",
            ),
            "description": "Use one item per line for admissions, progression, and career entries.",
        }),
        ("Documents and Historical Notes", {
            "fields": (
                "curriculum_pdf",
                "evidence_documents",
                "historical_notes",
            ),
            "description": "Put expired or previous affiliations here as historical evidence only, not as current offers.",
        }),
        ("Publishing", {
            "fields": (
                "is_published",
                "featured",
                "sort_order",
                "last_updated_note",
                "created_at",
                "updated_at",
            )
        }),
    )
