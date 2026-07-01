from rest_framework import serializers
from .models import FacultyMember


class FacultyMemberSerializer(serializers.ModelSerializer):
    evidence_documents = serializers.StringRelatedField(many=True, read_only=True)
    personnel_type_display = serializers.CharField(source="get_personnel_type_display", read_only=True)
    faculty_status_display = serializers.CharField(source="get_faculty_status_display", read_only=True)

    class Meta:
        model = FacultyMember
        fields = [
            "id",
            "title",
            "slug",
            "personnel_type",
            "personnel_type_display",
            "faculty_status",
            "faculty_status_display",
            "position",
            "employment_classification",
            "faculty_category",
            "highest_degree",
            "email",
            "phone",
            "photo",
            "educational_background",
            "specialization_areas",
            "research_interests",
            "courses_taught",
            "advising_areas",
            "certifications",
            "awards",
            "office",
            "seo_title",
            "seo_description",
            "og_title",
            "og_description",
            "featured",
            "is_published",
            "updated_at",
            "evidence_documents",
        ]
