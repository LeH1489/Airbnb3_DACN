"use client";

import useCountries from "@/app/hooks/useCountries";
import { User } from "@prisma/client";
import { IconType } from "react-icons";
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import dynamic from "next/dynamic";
import Heading from "../Heading";
import { useCallback, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import LoadingModal from "../LoadingModal";

const Map = dynamic(() => import("../Map"), {
  ssr: false,
});

interface ListingInfoProps {
  user: User;
  description: string;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  category:
    | {
        icon: IconType;
        label: string;
        description: string;
      }
    | undefined;
  locationValue: string;
  address: string;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  description,
  guestCount,
  roomCount,
  bathroomCount,
  category,
  locationValue,
  address,
}) => {
  const router = useRouter();

  const { getByValue } = useCountries();

  //tọa độ
  const coordinates = getByValue(locationValue)?.latlng;

  const [isLoading, setIsLoading] = useState(false);

  //create a new conversation
  const createNewConversation = useCallback(() => {
    setIsLoading(true);

    axios
      .post("/api/conversations", {
        userId: user.id,
      })
      .then((data) => {
        //data.data.id ==== id of new conversation
        router.push(`/conversations/${data.data.id}`);
      })
      .finally(() => setIsLoading(false));
  }, [user, router]);

  return (
    <>
      {isLoading && <LoadingModal />}
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row items-center gap-2 font-semibold text-xl">
            <div>Hosted by {user?.name}</div>
            <Avatar src={user?.image} />
            <button
              onClick={createNewConversation}
              className="p-2  rounded-full hover:bg-neutral-200 hover:text-white"
            >
              Chat with host
            </button>
          </div>
          <div className="flex flex-row items-center gap-4 font-ligth text-neutral-500">
            <div>{guestCount} guests</div>
            <div>{roomCount} rooms</div>
            <div>{bathroomCount} bathrooms</div>
          </div>
        </div>
        <hr />
        {category && (
          <ListingCategory
            icon={category.icon}
            label={category.label}
            description={category.description}
          />
        )}
        <hr />
        <div
          className="text-lg font-light text-neutral-500"
          style={{ whiteSpace: "pre-line" }}
        >
          {description}
        </div>
        <hr />
        <Heading title="Where you will be" />
        <Map center={coordinates} />
        <p className="font-semibold">{address}</p>
      </div>
    </>
  );
};

export default ListingInfo;
