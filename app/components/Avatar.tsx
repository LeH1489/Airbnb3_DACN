"use client";

import Image from "next/image";
import useActiveList from "../hooks/useActiveList";
import { User } from "@prisma/client";

//src == currentUser?.image from UserMenu
interface AvatarProps {
  src: string | null | undefined;
  large?: boolean;
  onlineMark?: boolean;
  user?: User;
}

const Avatar: React.FC<AvatarProps> = ({ src, large, onlineMark, user }) => {
  const { members } = useActiveList();
  const isActive = members.indexOf(user?.email!) !== -1;

  return (
    <div className="relative">
      <Image
        className="rounded-full relative"
        height={large ? "44" : "30"}
        width={large ? "44" : "30"}
        alt="Avatar"
        src={src || "/images/placeholder.png"}
      />
      {isActive && onlineMark && (
        <span
          className="
      absolute
      block
      rounded-full
      bg-rose-500
      ring-2
      ring-white
      top-0
      right-0
      h-1 
      w-1
      md:h-2
      md:w-2
      "
        />
      )}
    </div>
  );
};

export default Avatar;
