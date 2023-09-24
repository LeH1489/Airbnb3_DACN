import prisma from "@/app/libs/prismadb";

//get all messages by conversationId
const getMessages = async (conversationId: string) => {
  try {
    const messagesByConversationId = await prisma.message.findMany({
      where: {
        conversationId: conversationId,
      },
      include: {
        sender: true,
        seen: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return messagesByConversationId;
  } catch (error: any) {
    return [];
  }
};

export default getMessages;
