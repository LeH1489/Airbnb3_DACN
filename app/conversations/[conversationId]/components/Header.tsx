"use client";

import Avatar from "@/app/components/Avatar";
import useOtherUser from "@/app/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { HiChevronLeft } from "react-icons/hi";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import ProfileDrawer from "./ProfileDrawer";
import useActiveList from "@/app/hooks/useActiveList";

interface HeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}
const Header: React.FC<HeaderProps> = ({ conversation }) => {
  const otherUser = useOtherUser(conversation);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { members } = useActiveList();
  const isActive = members.indexOf(otherUser?.email!) !== -1;

  const statusText = useMemo(() => {
    return isActive ? "Online" : "Offline";
  }, [conversation, isActive]);
  return (
    <>
      <ProfileDrawer
        data={conversation}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
      <div
        className="
    bg-white
      w-full
      flex
      border-b-[1px] 
      sm:px-4
      pt-2
      pb-4
      px-4
      lg:px-6
      justify-between
      items-center
      shadow-sm
    "
      >
        <div className="flex gap-3 items-center">
          <Link
            className="
        lg:hidden 
        block
        text-sky-500
        hover:text-sky-600
        transition
        cursor-pointer
        "
            href="/conversation"
          >
            <HiChevronLeft size={32} />
          </Link>
          <Avatar src={otherUser?.image} large onlineMark />
          <div className="flex flex-col">
            <div>{conversation.name || otherUser.name}</div>
            <div className="text-sm font-light text-neutral-500">
              {statusText}
            </div>
          </div>
        </div>

        <HiEllipsisHorizontal
          size={32}
          onClick={() => setDrawerOpen(true)}
          className="
        text-rose-500 
        cursor-pointer 
        hover:bg-gray-100 
        rounded-full 
        border-0
        transition"
        />
      </div>
    </>
  );
};

export default Header;
