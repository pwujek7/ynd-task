import { Avatar, AvatarImage } from "@/components/ui/avatar";

export function UserAvatar({ src }: { src: string }) {
  return (
    <Avatar className="mr-2">
      <AvatarImage src={src} />
    </Avatar>
  );
}
