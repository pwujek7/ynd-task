import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

type ErrorMessageProps = {
  message?: string | undefined;
};

export function ErrorMessage({ message }: ErrorMessageProps) {
  const errorMessage = message
    ? `An error has occurred: ${message}`
    : "Something went wrong. Please try again later.";

  return (
    <div className="flex flex-row items-center mx-auto">
      <ExclamationTriangleIcon
        className="mr-2"
        color="red"
        aria-label="Error Icon"
      />
      <p className="text-red-500">{errorMessage}</p>
    </div>
  );
}
