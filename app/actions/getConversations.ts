import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

//server action

//get every conversation of the current user
const getConversations = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser?.id) {
    return [];
  }

  try {
    const conversations = await prisma.conversation.findMany({
      orderBy: {
        lastMessageAt: "desc",
      },
      where: {
        userIds: {
          has: currentUser.id, //get every conversations of the currentUser
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            sender: true, //author of the message
            seen: true, //array of people who has seen the message
          },
        },
      },
    });

    return conversations;
  } catch (error: any) {
    return [];
  }
};

export default getConversations;
