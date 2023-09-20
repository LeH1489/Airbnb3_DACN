import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;
}

//Add favorites
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

    //get FavoritesIds array field of current user
    let favoriteIdsUpdated = [...(currentUser.favoriteIds || [])];
    ////push id of the listing (from url) to favoriteIDs field of current user
    favoriteIdsUpdated.push(listingId);

    const userUpdated = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        favoriteIds: favoriteIdsUpdated,
      },
    });

    return NextResponse.json(userUpdated);
  } catch (error: any) {
    console.log(error, "ERROR_FAVORITE_ADD");
    return new NextResponse("Internal Error", { status: 500 });
  }
}

//Add favorites
export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
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

    //get FavoritesIds array field of current user
    let favoriteIdsUpdated = [...(currentUser.favoriteIds || [])];

    //return true ==> elements is included in array, return false ==> elements is eliminated from array
    favoriteIdsUpdated = favoriteIdsUpdated.filter((id) => id !== listingId);

    const userUpdated = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        favoriteIds: favoriteIdsUpdated,
      },
    });

    return NextResponse.json(userUpdated);
  } catch (error: any) {
    console.log(error, "ERROR_FAVORITE_DELETE");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
