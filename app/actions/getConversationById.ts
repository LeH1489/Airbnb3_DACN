import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

//server action
//get single conversation by id
const getConversationById = async (conversationId: string) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.email) {
      return null;
    }

    const conversationById = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
      },
    });

    return conversationById;
  } catch (error: any) {
    return null;
  }
};

export default getConversationById;
