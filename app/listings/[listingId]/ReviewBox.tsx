"use client";

import Image from "next/image";
import { format } from "date-fns";

interface ReviewBoxProps {
  data: Record<string, any>;
  date: Date;
  body: string;
}

const ReviewBox: React.FC<ReviewBoxProps> = ({ data, date, body }) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-row gap-3">
        <div className="w-12">
          <Image
            alt="User Image"
            width="48"
            height="44"
            src={data.user.image || "/images/placeholder.png"}
            className="rounded-full object-cover"
          />
        </div>
        <div>
          <p className="font-semibold">{data.user.name}</p>
          <p className="text-gray-400 font-light">
            {format(new Date(date), "MMMM yyyy")}
          </p>
        </div>
      </div>
      <div>{body}</div>
    </div>
  );
};

export default ReviewBox;

export const dynamic = "force-dynamic";
