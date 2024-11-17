import { Repository } from "@/interfaces/repository";
import { StarFilledIcon } from "@radix-ui/react-icons";

export function RepositoryItem({ repository }: { repository: Repository }) {
  const { name, description, stargazers_count } = repository;

  return (
    <div className="flex relative py-2 mx-0 md:mx-4 lg:mx-8 xl:mx-12 mb-8 border-b">
      <div className="w-full">
        <p className="font-medium">{name}</p>
        <p className="w-[80%] md:w-[90%] 2xl:w-[95%]">{description}</p>
      </div>
      <div className="absolute right-0 top-[8px] flex items-center">
        {stargazers_count}
        <StarFilledIcon className="ml-1" aria-label="Star Icon" />
      </div>
    </div>
  );
}
