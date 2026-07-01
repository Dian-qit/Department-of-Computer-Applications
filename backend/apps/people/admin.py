from django.contrib import admin
from .models import FacultyMember


@admin.action(description="Mark selected faculty members as published")
def mark_published(modeladmin, request, queryset):
    queryset.update(is_published=True)


@admin.action(description="Mark selected faculty members as unpublished")
def mark_unpublished(modeladmin, request, queryset):
    queryset.update(is_published=False)


@admin.register(FacultyMember)
class FacultyMemberAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "personnel_type",
        "faculty_status",
        "position",
        "email",
        "is_published",
        "featured",
        "sort_order",
        "updated_at",
    )
    list_filter = (
        "is_published",
        "featured",
        "personnel_type",
        "faculty_status",
        "position",
        "employment_classification",
        "faculty_category",
    )
    search_fields = (
        "title",
        "position",
        "highest_degree",
        "email",
        "specialization_areas",
        "research_interests",
        "educational_background",
        "courses_taught",
        "advising_areas",
    )
    ordering = ("sort_order", "title")
    prepopulated_fields = {"slug": ("title",)}
    readonly_fields = ("created_at", "updated_at")
    filter_horizontal = ("evidence_documents",)
    actions = [mark_published, mark_unpublished]
    fieldsets = (
        (
            "Identity and Classification",
            {
                "fields": (
                    "title",
                    "slug",
                    "personnel_type",
                    "faculty_status",
                    "position",
                    "employment_classification",
                    "faculty_category",
                    "highest_degree",
                    "photo",
                )
            },
        ),
        (
            "Public Contact",
            {
                "fields": (
                    "email",
                    "phone",
                    "office",
                )
            },
        ),
        (
            "Academic and Professional Profile",
            {
                "fields": (
                    "educational_background",
                    "specialization_areas",
                    "research_interests",
                    "courses_taught",
                    "advising_areas",
                    "certifications",
                    "awards",
                )
            },
        ),
        (
            "Evidence Documents",
            {
                "fields": ("evidence_documents",),
            },
        ),
        (
            "Publishing and Display",
            {
                "fields": (
                    "is_published",
                    "featured",
                    "sort_order",
                    "last_updated_note",
                )
            },
        ),
        (
            "SEO Metadata",
            {
                "classes": ("collapse",),
                "fields": (
                    "seo_title",
                    "seo_description",
                    "og_title",
                    "og_description",
                ),
            },
        ),
        (
            "System",
            {
                "classes": ("collapse",),
                "fields": ("created_at", "updated_at"),
            },
        ),
    )
