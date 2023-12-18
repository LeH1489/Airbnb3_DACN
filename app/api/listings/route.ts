import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

//create a new Listing
export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const bodyFromRequest = await request.json();

    const {
      title,
      description,
      imageSrc,
      category,
      roomCount,
      bathroomCount,
      guestCount,
      location,
      price,
      address,
      communicationLink,
    } = bodyFromRequest;

    const newListing = await prisma.listing.create({
      data: {
        title,
        description,
        imageSrc: [...imageSrc],
        category,
        roomCount,
        bathroomCount,
        guestCount,
        locationValue: location.value,
        price: parseInt(price, 10),
        address,
        communicationLink,
        userId: currentUser.id,
      },
    });

    return NextResponse.json(newListing);
  } catch (error: any) {
    console.log(error, "ERROR_LISTING_CREATE");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
