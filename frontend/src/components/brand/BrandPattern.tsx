import { cn } from "@/lib/utils";

interface BrandPatternProps {
  subtle?: boolean;
  className?: string;
}

export function BrandPattern({ subtle = false, className }: BrandPatternProps) {
  return <div aria-hidden="true" className={cn(subtle ? "brand-network-subtle" : "brand-network", className)} />;
}
