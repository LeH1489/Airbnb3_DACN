import { User } from "@prisma/client";
import { FullCoversationType } from "../types";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

//get other user (only 1 user) from the current user's conversation
const useOtherUser = (
  conversation:
    | FullCoversationType
    | {
        users: User[];
      }
) => {
  const session = useSession();

  const otherUser = useMemo(() => {
    const currentUserEmail = session?.data?.user?.email;
    const otherUser = conversation.users.filter(
      (user) => user.email !== currentUserEmail
    );

    return otherUser[0];
  }, [session?.data?.user?.email, conversation.users]);

  return otherUser;
};

export default useOtherUser;
