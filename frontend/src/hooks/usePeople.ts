import { useQuery } from "@tanstack/react-query";
import { fetchJSON } from "@/lib/api";
import type { FacultyDirectoryMember, FacultyMember } from "@/types/api";

export function useFaculty() {
  return useQuery<FacultyDirectoryMember[]>({
    queryKey: ["people", "faculty"],
    queryFn: () => fetchJSON<FacultyDirectoryMember[]>("/api/people/faculty/"),
  });
}

export function useFacultyMember(slug: string | undefined) {
  return useQuery<FacultyMember>({
    queryKey: ["people", "faculty", slug],
    queryFn: () => fetchJSON<FacultyMember>(`/api/people/faculty/${slug}/`),
    enabled: Boolean(slug),
  });
}
