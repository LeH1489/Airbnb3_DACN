import prisma from "@/app/libs/prismadb";
import getSession from "./getSession";

//get all users
const getUsers = async () => {
  const session = await getSession();

  if (!session?.user?.email) {
    return [];
  }

  try {
    const getAllUsers = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        NOT: {
          email: session.user.email, //not including current users
        },
      },
    });

    return getAllUsers;
  } catch (error: any) {
    return [];
  }
};

export default getUsers;
