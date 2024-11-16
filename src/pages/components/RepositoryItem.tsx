import { Repository } from "@/interfaces/repository";
import { StarFilledIcon } from "@radix-ui/react-icons";

export function RepositoryItem({ repository }: { repository: Repository }) {
  return (
    <div className="flex relative py-2 mx-0 md:mx-4 lg:mx-8 xl:mx-12 mb-8 border-b">
      <div>
        <p className="font-medium">{repository.name}</p>
        <p className="w-[90%] md:w-[95%]">{repository.description}</p>
      </div>
      <div className="absolute right-0 top-[8px] flex items-center">
        {repository.stargazers_count}
        <StarFilledIcon className="ml-1" />
      </div>
    </div>
  );
}
