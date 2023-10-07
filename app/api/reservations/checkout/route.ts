import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { stripe } from "../../../libs/stripe";
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

    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
    });

    if (!listing) {
      return new NextResponse("Not found", { status: 404 });
    }

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        quantity: 1,
        price_data: {
          currency: "USD",
          product_data: {
            name: listing.title,
            description: listing.description!,
          },
          unit_amount: Math.round(totalPrice! * 100),
        },
      },
    ];

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/listings/${listing.id}?success=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/listings/${listing.id}?canceled=1`,
      metadata: {
        listingId: listing.id,
        userId: currentUser.id,
      },
    });

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

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.log(error, "ERROR_RESERVATION_CREATE");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
