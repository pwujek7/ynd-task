import { Avatar, AvatarImage } from "@/components/ui/avatar";

type UserAvatarProps = {
  src: string;
};

export function UserAvatar({ src }: UserAvatarProps) {
  return (
    <Avatar className="mr-2">
      <AvatarImage src={src} />
    </Avatar>
  );
}
