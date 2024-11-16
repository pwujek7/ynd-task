import useUserContext from "@/context/UserContext";
import { User } from "@/interfaces/user";
import { Repository } from "@/interfaces/repository";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserAvatar } from "@/pages/components/UserAvatar";
import { cn } from "@/lib/utils";
import { CaretDownIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import { RepositoryItem } from "@/pages/components/RepositoryItem";

export function UserItem({ user }: { user: User }) {
  const {
    repositories: { data, isLoading, isError, error },
    selectedUser,
    setSelectedUser,
  } = useUserContext();

  const isExpanded = selectedUser === user.login;

  const handleUserClick = (username: string) => {
    setSelectedUser(isExpanded ? "" : username);
  };

  const isLoadingForThisUser = selectedUser === user.login && isLoading;
  const hasDataForSelectedUser = selectedUser === user.login && data?.length;

  const renderUserLink = () => (
    <a
      href={user.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="!mt-3 underline flex items-center"
    >
      <GitHubLogoIcon className="mr-1" />
      View on GitHub
    </a>
  );

  if (isError) return <p>{"An error has occurred: " + error?.message}</p>;

  return (
    <Card className="mb-2">
      <CardHeader
        onClick={() => handleUserClick(user.login)}
        className="cursor-pointer"
      >
        <div className="flex flex-row items-center w-full">
          <UserAvatar src={user.avatar_url} />
          <CardTitle>{user.login}</CardTitle>
          <CaretDownIcon
            className={cn("ml-auto", isExpanded && "rotate-180")}
          />
        </div>
        {isExpanded && renderUserLink()}
      </CardHeader>
      {isExpanded && (
        <CardContent className={cn(hasDataForSelectedUser && "p-6 pt-0")}>
          {isLoadingForThisUser && <p>Loading...</p>}
          {hasDataForSelectedUser ? (
            <>
              {data.map((repo: Repository) => (
                <RepositoryItem key={repo.id} repository={repo} />
              ))}
            </>
          ) : null}
        </CardContent>
      )}
    </Card>
  );
}
