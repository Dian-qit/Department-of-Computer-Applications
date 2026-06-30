from rest_framework import serializers
from .models import Program

class ProgramSerializer(serializers.ModelSerializer):
    degree_level_display = serializers.CharField(source="get_degree_level_display", read_only=True)
    program_educational_objectives_list = serializers.SerializerMethodField()
    outcomes_list = serializers.SerializerMethodField()
    specialization_tracks_list = serializers.SerializerMethodField()
    curriculum_evidence_list = serializers.SerializerMethodField()
    quality_evidence_list = serializers.SerializerMethodField()
    career_opportunities_list = serializers.SerializerMethodField()
    admission_requirements_list = serializers.SerializerMethodField()
    progression_requirements_list = serializers.SerializerMethodField()
    historical_notes_list = serializers.SerializerMethodField()

    class Meta:
        model = Program
        fields = [
            "id",
            "code",
            "title",
            "slug",
            "degree_level",
            "degree_level_display",
            "overview",
            "duration",
            "curriculum_load",
            "recognition",
            "program_educational_objectives",
            "program_educational_objectives_list",
            "outcomes",
            "outcomes_list",
            "specialization_tracks",
            "specialization_tracks_list",
            "curriculum_evidence",
            "curriculum_evidence_list",
            "quality_evidence",
            "quality_evidence_list",
            "career_opportunities",
            "career_opportunities_list",
            "admission_requirements",
            "admission_requirements_list",
            "progression_requirements",
            "progression_requirements_list",
            "historical_notes",
            "historical_notes_list",
            "faq_intro",
            "featured",
            "updated_at",
        ]

    def _lines(self, value):
        return [line.strip() for line in (value or "").splitlines() if line.strip()]

    def get_outcomes_list(self, obj):
        return self._lines(obj.outcomes)

    def get_program_educational_objectives_list(self, obj):
        return self._lines(obj.program_educational_objectives)

    def get_specialization_tracks_list(self, obj):
        return self._lines(obj.specialization_tracks)

    def get_curriculum_evidence_list(self, obj):
        return self._lines(obj.curriculum_evidence)

    def get_quality_evidence_list(self, obj):
        return self._lines(obj.quality_evidence)

    def get_career_opportunities_list(self, obj):
        return self._lines(obj.career_opportunities)

    def get_admission_requirements_list(self, obj):
        return self._lines(obj.admission_requirements)

    def get_progression_requirements_list(self, obj):
        return self._lines(obj.progression_requirements)

    def get_historical_notes_list(self, obj):
        return self._lines(obj.historical_notes)
