"use client";

import Button from "@/app/components/Button";
import useListing from "@/app/hooks/useListing";
import { User } from "@prisma/client";
import axios from "axios";
import Image from "next/image";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

interface ReviewProps {
  placeholder: string;
  listingId: string; //for comment
  currentUser: User;
}

const ReiewInput: React.FC<ReviewProps> = ({
  placeholder,
  listingId,
  currentUser,
}) => {
  if (!currentUser) {
    return null;
  }

  const [isLoading, setIsLoading] = useState(false);
  const [body, setBody] = useState("");

  //get listing by id using swr
  const { mutate: mutateListing } = useListing(listingId as string);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      const url = `/api/reviews/${listingId}`;

      await axios.post(url, { body });

      toast.success("Review created");
      setBody("");
      mutateListing();
    } catch (error) {
      toast.error("Failed to create review!");
    } finally {
      setIsLoading(false);
    }
  }, [body, listingId]);

  return (
    <div className="mt-5 flex flex-col gap-y-3">
      <div className="flex flex-row gap-3">
        <div className="w-12">
          <Image
            alt="User Image"
            width="48"
            height="44"
            src={currentUser.image || "/images/placeholder.png"}
            className="rounded-full object-cover"
          />
        </div>
        <div className="w-full">
          <textarea
            disabled={isLoading}
            onChange={(e) => setBody(e.target.value)}
            value={body}
            className="disabled:opacity-30 peer resize-y mt-3 w-full bg-white
            ring-0 outline-none text-small placeholder-neutral-500 text-black overflow-y-auto
            "
            placeholder={placeholder}
          ></textarea>
          <hr
            className="opacity-0 peer-focus:opacity-100 h-[1px] 
            w-full border-neutral-800 transition"
          />
        </div>
      </div>

      <div className="w-full flex flex-row-reverse">
        <div className="w-24">
          <Button
            label="Review"
            small
            onClick={onSubmit}
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default ReiewInput;
