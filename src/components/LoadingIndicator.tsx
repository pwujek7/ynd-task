import { Half2Icon } from "@radix-ui/react-icons";

export function LoadingIndicator() {
  return (
    <div className="flex justify-center mt-6 mb-12">
      <Half2Icon className="animate-flip-lr" />
    </div>
  );
}
