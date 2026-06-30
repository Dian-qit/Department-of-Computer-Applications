import { useQuery } from "@tanstack/react-query";
import { fetchJSON } from "@/lib/api";
import type { Program } from "@/types/api";

export function usePrograms() {
  return useQuery<Program[]>({
    queryKey: ["academics", "programs"],
    queryFn: () => fetchJSON<Program[]>("/api/academics/programs/"),
  });
}

export function useProgram(slug: string) {
  return useQuery<Program>({
    queryKey: ["academics", "programs", slug],
    queryFn: () => fetchJSON<Program>(`/api/academics/programs/${slug}/`),
  });
}
