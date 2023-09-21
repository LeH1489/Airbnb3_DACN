"use client";

import { useRouter } from "next/navigation";
import { AiOutlineMenu, AiOutlineGlobal } from "react-icons/ai";
import Avatar from "../Avatar";
import { useCallback, useEffect, useRef, useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import useRentModal from "@/app/hooks/useRentModal";

interface UserMenuProps {
  currentUser: User | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();

  const [isOpen, setIsOpen] = useState(false);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal]);

  //dropdown
  //Start: close the Usermenu when user clicks outside of it
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  //End: close the Usermenu when user clicks outside of it

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-1">
        <div
          onClick={onRent}
          className="
      hidden
      md:block
      text-sm
      font-semibold
      cursor-pointer
      px-4
      py-3
      hover:bg-neutral-100
      rounded-full
      transition
      "
        >
          Gobnb your home
        </div>

        <div className="hidden md:block px-4 py-3 hover:bg-neutral-100 rounded-full ">
          <AiOutlineGlobal size={18} />
        </div>

        <div
          onClick={() => setIsOpen((prev) => !prev)}
          className="
      flex
      flex-row
      items-center
      gap-3
      border-[1px]
      rounded-full
      p-4
      md:py-1
      md:px-2
      cursor-pointer
      hover:shadow-md
      transition
      ml-2
      "
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          ref={menuRef}
          className="
        absolute 
        bg-white
        rounded-xl 
        shadow-xl
        drop-shadow-2xl
        w-[40vw]
        md:w-4/5
        overflow-hidden
        right-0
        top-12
        text-sm
        tracking-wider
        z-20
        border-neutral-300
        border-none
        "
        >
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem
                  onClick={() => router.push("/trips")}
                  label="Messages"
                  bold
                />
                <MenuItem
                  onClick={() => router.push("/trips")}
                  label="Trips"
                  bold
                />
                <MenuItem
                  onClick={() => router.push("/favorites")}
                  label="Wishlists"
                  bold
                />
                <hr />
                <MenuItem
                  onClick={() => router.push("/reservations")}
                  label="Reservations"
                />
                <MenuItem
                  onClick={() => router.push("/properties")}
                  label="Manage listings"
                />
                <MenuItem onClick={rentModal.onOpen} label="Gobnb your home" />
                <hr />
                <MenuItem onClick={() => signOut()} label="Log out" />
              </>
            ) : (
              <>
                <MenuItem onClick={loginModal.onOpen} label="Login" />
                <MenuItem onClick={registerModal.onOpen} label="Register" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
