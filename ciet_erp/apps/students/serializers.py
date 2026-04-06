from rest_framework import serializers
from apps.students.models import (
    StudentProfile, Certification, Project,
    EducationBackground, Internship, Event, Course, Research, SemesterResult
)
from apps.accounts.serializers import UserSerializer


class CertificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certification
        fields = [
            'id', 'cert_type', 'title', 'issuer', 'issued_date',
            'cert_url', 'file', 'is_verified', 'rejection_reason', 'created_at'
        ]


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = [
            'id', 'project_type', 'title', 'description', 'tech_stack',
            'cover_image', 'is_group', 'team_size', 'repo_url', 'is_verified', 'created_at'
        ]


class EducationBackgroundSerializer(serializers.ModelSerializer):
    class Meta:
        model = EducationBackground
        fields = [
            'id', 'edu_type', 'institution', 'board_university',
            'year_of_passing', 'score', 'score_type', 'is_verified'
        ]


class InternshipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Internship
        fields = [
            'id', 'organization', 'role', 'start_date', 'end_date',
            'technologies', 'description', 'supervisor_name', 'supervisor_email',
            'certificate', 'created_at'
        ]


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = [
            'id', 'name', 'scope', 'role', 'position',
            'organizer', 'location', 'event_date', 'created_at'
        ]


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = [
            'id', 'title', 'source', 'platform', 'completion_percentage',
            'certificate_url', 'is_verified', 'created_at'
        ]


class ResearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Research
        fields = [
            'id', 'research_type', 'title', 'advisor_name', 'advisor_email',
            'outcome', 'publisher', 'publication_url', 'published_date', 'is_verified', 'created_at'
        ]


class SemesterResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = SemesterResult
        fields = [
            'id', 'semester', 'exam_name', 'subject_code', 'subject_name',
            'score', 'max_score', 'grade', 'is_verified', 'created_at'
        ]


class StudentProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    certifications = CertificationSerializer(many=True, read_only=True)
    projects = ProjectSerializer(many=True, read_only=True)
    education = EducationBackgroundSerializer(many=True, read_only=True)
    internships = InternshipSerializer(many=True, read_only=True)
    events = EventSerializer(many=True, read_only=True)
    courses = CourseSerializer(many=True, read_only=True)
    research = ResearchSerializer(many=True, read_only=True)
    semester_results = SemesterResultSerializer(many=True, read_only=True)
    photo_url = serializers.SerializerMethodField()

    class Meta:
        model = StudentProfile
        fields = [
            'id', 'user', 'roll_no', 'batch', 'department', 'section',
            'cgpa', 'resume', 'photo', 'photo_url',
            'linkedin_url', 'github_url', 'leetcode_url',
            'hackerrank_url', 'codechef_url', 'codeforces_url',
            'personal_email', 'personal_phone',
            'personal_email_verified', 'personal_phone_verified',
            'is_public', 'slug',
            'certifications', 'projects', 'education',
            'internships', 'events', 'courses', 'research', 'semester_results',
        ]
        read_only_fields = ['id', 'slug', 'cgpa', 'roll_no']

    def get_photo_url(self, obj):
        request = self.context.get('request')
        if obj.photo and request:
            return request.build_absolute_uri(obj.photo.url)
        return None
