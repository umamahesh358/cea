import { useQuery } from "@tanstack/react-query";
import { fetchStudentProfile } from "@/lib/api";

/**
 * Shared hook for fetching the current student's full profile.
 * Used by HeroSection, BentoGrid, ActivityFeed, Navbar, etc.
 * 5-minute cache via TanStack Query.
 */
export function useStudentProfile() {
  return useQuery({
    queryKey: ["studentProfile"],
    queryFn: fetchStudentProfile,
    staleTime: 5 * 60 * 1000,  // 5 minutes
    retry: 1,
  });
}
