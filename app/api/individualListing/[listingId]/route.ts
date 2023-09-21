import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;
}

//get listing by id
export async function GET(request: Request, { params }: { params: IParams }) {
  try {
    const { listingId } = params;

    if (!listingId || typeof listingId !== "string") {
      return new NextResponse("Invalid ID!", { status: 400 });
    }

    const invidualListing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        user: true,
        reviews: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    return NextResponse.json(invidualListing);
  } catch (error: any) {
    console.log(error, "ERROR_INDIVIDUAL_LISTING_GET");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
