import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { stripe } from "../../libs/stripe";
import Stripe from "stripe";

//create a new reservation
export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const bodyFromRequest = await request.json();

    const { totalPrice, startDate, endDate, listingId } = bodyFromRequest;

    //create a reservation
    //create: automatically link our relation between listing and reservation
    const listingAndReservation = await prisma.listing.update({
      where: {
        id: listingId,
      },
      data: {
        reservations: {
          create: {
            userId: currentUser.id,
            startDate,
            endDate,
            totalPrice,
          },
        },
      },
    });
    return NextResponse.json(listingAndReservation);
  } catch (error: any) {
    console.log(error, "ERROR_RESERVATION_CREATE");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
