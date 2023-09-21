"use client";

import useCountries from "@/app/hooks/useCountries";
import useSearchModal from "@/app/hooks/useSearchModal";
import { differenceInDays } from "date-fns";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { BiSearch } from "react-icons/bi";

const Search = () => {
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const { getByValue } = useCountries();

  const locationValue = params?.get("locationValue");
  const startDate = params?.get("startDate");
  const endDate = params?.get("endDate");
  const guestCount = params?.get("guestCount");

  const locationLabel = useMemo(() => {
    if (locationValue) {
      return getByValue(locationValue as string)?.label;
    }
    return "Anywhere";
  }, [getByValue, locationValue]);

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);
      let diff = differenceInDays(end, start);

      if (diff === 0) {
        diff = 1;
      }

      return `${diff} Days`;
    }
    return "Any week";
  }, [startDate, endDate]);

  const guestLabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} Guests`;
    }
    return "Add guests";
  }, [guestCount]);

  return (
    <div
      onClick={searchModal.onOpen}
      className="
      lg:absolute
      lg:left-0
      lg:right-0
      lg:m-auto
    w-full
    md:w-[350px]
    border-[1px]
    py-1.5
    rounded-full
    shadow
    hover:shadow-lg
    transition
    cursor-pointer
    drop-shadow-sm
    "
    >
      <div
        className="
    flex flex-row justify-between items-center
    "
      >
        <div className="text-sm font-semibold px-5">{locationLabel}</div>
        <div
          className="
        hidden
        sm:block
        text-sm
        font-semibold
        px-4
        border-x-[1px]
        text-center
        flex-1
        "
        >
          {durationLabel}
        </div>
        <div
          className="
        flex
        flex-row
        items-center
        text-sm
        text-gray-500
        pl-4
        pr-2
        gap-3
        "
        >
          <div className="hidden sm:block">{guestLabel}</div>
          <div className="bg-rose-500 text-white p-2 rounded-full">
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
