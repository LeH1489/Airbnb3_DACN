import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

interface IParams {
  reservationId?: string;
}

//create a new reservation
export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new NextResponse("Unauthorized!", { status: 401 });
    }

    const { reservationId } = params;

    if (!reservationId || typeof reservationId !== "string") {
      return new NextResponse("Invalid ID!", { status: 401 });
    }

    //cancel reservation:
    //2 type of user can cancel the reservation:
    //current user (guest) and creator of the listing (listing owner)
    const reservationCancelled = await prisma.reservation.deleteMany({
      where: {
        id: reservationId,
        OR: [
          { userId: currentUser.id },
          { listing: { userId: currentUser.id } },
        ],
      },
    });
    return NextResponse.json(reservationCancelled);
  } catch (error: any) {
    console.log(error, "ERROR_RESERVATION_CANCEL");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
