import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;
}

//Add review
export async function POST(request: Request, { params }: { params: IParams }) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    //get id of listing from url
    const { listingId } = params;

    if (!listingId || typeof listingId !== "string") {
      return new NextResponse("Invalid ID", { status: 401 });
    }

    const bodyFromRequest = await request.json();
    const { body } = bodyFromRequest;

    const newComment = await prisma.review.create({
      data: {
        body: body,
        userId: currentUser.id,
        listingId: listingId,
      },
    });

    return NextResponse.json(newComment);
  } catch (error: any) {
    console.log(error, "ERROR_REVIEW_CREATE");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
