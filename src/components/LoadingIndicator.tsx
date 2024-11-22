import { cn } from "@/lib/utils";
import { Half2Icon } from "@radix-ui/react-icons";

type LoadingIndicatorProps = {
  className?: string;
};

export function LoadingIndicator({ className }: LoadingIndicatorProps) {
  return (
    <div className={cn("flex justify-center mt-6 mb-12", className)}>
      <Half2Icon
        className="animate-flip-lr"
        aria-label="Loading Icon"
        data-testid="loading-icon"
      />
    </div>
  );
}
