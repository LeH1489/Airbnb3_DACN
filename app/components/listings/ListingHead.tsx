"use client";

import useCountries from "@/app/hooks/useCountries";
import { User } from "@prisma/client";
import Heading from "../Heading";
import Image from "next/image";
import HeartButton from "../HeartButton";
import { useState } from "react";
import ImageModal from "../modals/ImageModal";

interface ListingHeadProps {
  title: string;
  locationValue: string;
  imageSrc: string[];
  address: string;
  id: string;
  currentUser?: User | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  locationValue,
  imageSrc,
  id,
  address,
  currentUser,
}) => {
  const { getByValue } = useCountries();

  const location = getByValue(locationValue);

  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [srcEachImg, setSrcEachImg] = useState<string | null>(null);

  const setImageModalOpenEachImage = (src: string) => {
    setImageModalOpen(true);
    setSrcEachImg(src);
  };

  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
        large
      />
      <div className="flex flex-row justify-between">
        <div className="flex sm:flex-row flex-col gap-3 md:items-center">
          <div className="underline font-semibold">2 reviews</div>
          <div className="hidden md:block text-gray-600">·</div>
          <div className="text-gray-600">SuperHost</div>
          <div className="hidden md:block text-gray-600">·</div>
          <div className="underline font-semibold">{address}</div>
        </div>
        <div className="flex flex-row gap-1">
          <HeartButton listingId={id} currentUser={currentUser} />
          <p className="underline">Save</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 rounded-md bg-white overflow-hidden h-[411px]">
        {imageSrc.map((imageUrl, index) => (
          <div
            key={index}
            className={`relative cursor-pointer hover:opacity-70 transition p-20 border-neutral-300 ${
              index === 0
                ? "col-span-2 row-span-2"
                : index > 0
                ? "col-span-1"
                : ""
            }`}
          >
            <ImageModal
              key={index}
              src={srcEachImg}
              isOpen={imageModalOpen}
              onClose={() => setImageModalOpen(false)}
            />
            <Image
              onClick={() => setImageModalOpenEachImage(imageUrl)}
              alt={`Upload ${index + 1}`}
              layout="fill"
              objectFit="cover"
              src={imageUrl}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default ListingHead;
