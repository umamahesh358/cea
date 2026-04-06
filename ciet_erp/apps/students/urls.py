from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.students import views

# ── API Router (under /api/v1/students/) ───────────────────
router = DefaultRouter()
router.register(r'profiles', views.StudentProfileViewSet, basename='student-profile')
router.register(r'internships', views.InternshipViewSet, basename='internships')
router.register(r'projects', views.ProjectViewSet, basename='projects')
router.register(r'certifications', views.CertificationViewSet, basename='certifications')
router.register(r'events', views.EventViewSet, basename='events')
router.register(r'research', views.ResearchViewSet, basename='research')
router.register(r'courses', views.CourseViewSet, basename='courses')
router.register(r'education', views.EducationBackgroundViewSet, basename='education')
router.register(r'semester-results', views.SemesterResultViewSet, basename='semester-results')

# ── UI URLs (under /student/) ──────────────────────────────
ui_urlpatterns = [
    path('portal/',               views.StudentPortalView.as_view(),        name='student-portal'),
    path('portal/profile/',       views.StudentPortalView.as_view(),        name='student-portal-profile'),
    path('portal/academics/',     views.StudentPortalView.as_view(),        name='student-portal-academics'),
    path('portal/certifications/', views.StudentPortalView.as_view(),       name='student-portal-certifications'),
    path('portal/projects/',      views.StudentPortalView.as_view(),        name='student-portal-projects'),
    path('portal/internships/',   views.StudentPortalView.as_view(),        name='student-portal-internships'),
    path('portal/events/',        views.StudentPortalView.as_view(),        name='student-portal-events'),
    path('portal/courses/',       views.StudentPortalView.as_view(),        name='student-portal-courses'),
    path('portal/research/',      views.StudentPortalView.as_view(),        name='student-portal-research'),
    path('portal/education/',     views.StudentPortalView.as_view(),        name='student-portal-education'),
    path('portal/cohorts/',       views.StudentPortalView.as_view(),        name='student-portal-cohorts'),
    path('portal/transcript/',    views.StudentPortalView.as_view(),        name='student-portal-transcript'),
    path('portal/settings/',      views.StudentPortalView.as_view(),        name='student-portal-settings'),
    # Catch-all: React Router handles all remaining /student/portal/* routes
    path('portal/<path:subpath>', views.StudentPortalView.as_view(),        name='student-portal-catchall'),
    path('portal/contact-otp/',   views.StudentContactOtpView.as_view(),    name='student-contact-otp'),
    path('portal/toggle-public/', views.TogglePublicProfileView.as_view(),  name='student-toggle-public'),
    path('verification/queue/',   views.StudentVerificationQueueView.as_view(), name='student-verification-queue'),
    path('detail/<uuid:pk>/',     views.StudentManagementDetailView.as_view(), name='student-detail'),
    path('p/<slug:slug>/',        views.PublicStudentProfileView.as_view(), name='student-public-profile'),
]

# API-only patterns
urlpatterns = [path('', include(router.urls))]

# Trigger reload
