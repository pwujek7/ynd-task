import useUserContext from "@/context/UserContext";
import { User } from "@/interfaces/user";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserAvatar } from "@/pages/components/UserAvatar";
import { cn } from "@/lib/utils";
import { CaretDownIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import { ErrorMessage } from "@/components/ErrorMessage";
import { RepositoriesList } from "@/pages/components/RepositoriesList";

export function UserItem({ user }: { user: User }) {
  const { login, html_url, avatar_url } = user;
  const {
    repositories: { data, isError, error },
    selectedUser,
    setSelectedUser,
  } = useUserContext();

  const isExpanded = selectedUser === user.login;

  const handleUserClick = (username: string) => {
    setSelectedUser(isExpanded ? "" : username);
  };

  const hasDataForSelectedUser = selectedUser === login && data?.length;

  const renderUserLink = () => (
    <a
      href={html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="!mt-3 underline flex items-center"
    >
      <GitHubLogoIcon className="mr-1" />
      View on GitHub
    </a>
  );

  if (isError) return <ErrorMessage message={error?.message} />;

  return (
    <Card className="mb-2">
      <CardHeader
        onClick={() => handleUserClick(login)}
        className="cursor-pointer"
      >
        <div className="flex flex-row items-center w-full">
          <UserAvatar src={avatar_url} />
          <CardTitle>{login}</CardTitle>
          <CaretDownIcon
            className={cn("ml-auto", isExpanded && "rotate-180")}
            aria-label="Caret Icon"
          />
        </div>
        {isExpanded && renderUserLink()}
      </CardHeader>
      {isExpanded && (
        <CardContent className={cn(hasDataForSelectedUser && "p-6 pt-0")}>
          <RepositoriesList userLogin={selectedUser} />
        </CardContent>
      )}
    </Card>
  );
}
