"use client";

import { PredefinedCategories } from "@/app/components/navbar/Categories";
import useLoginModal from "@/app/hooks/useLoginModal";
import { Listing, Reservation, Review, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import axios from "axios";
import toast from "react-hot-toast";
import Container from "@/app/components/Container";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import ListingReservation from "@/app/components/listings/ListingReservation";
import { Range } from "react-date-range";
import Star from "./Star";
import Reviews from "./Reviews";
import useListing from "@/app/hooks/useListing";
import ReiewInput from "./ReiewInput";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useConfettiStore } from "@/app/hooks/useConfettiStore";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface ListingClienProps {
  listing: Listing & { user: User };
  currentUser?: User | null;
  reservations?: Reservation[];
}

const ListingClient: React.FC<ListingClienProps> = ({
  listing,
  currentUser,
  reservations = [],
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();
  const confetti = useConfettiStore();

  //lấy gián tiếp chứ không lấy trực tiếp từ listing.category bởi vì ta sẽ lấy cả label, icon, desc
  //còn listing.category chỉ trả về mỗi tên
  const category = useMemo(() => {
    return PredefinedCategories.find((cate) => cate.label === listing.category);
  }, [listing.category]);

  //disable dates that have been booked by guest before
  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });
    return dates;
  }, [reservations]);

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  //func to create a reservation
  const onCreateReservation = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    setIsLoading(true); //not allow user to interact

    // axios
    //   .post(`/api/reservations`, {
    //     totalPrice,
    //     startDate: dateRange.startDate,
    //     endDate: dateRange.endDate,
    //     listingId: listing?.id,
    //   })
    //   .then(() => {
    //     toast.success("Reservation success");
    //     setDateRange(initialDateRange);
    //     router.push("/trips");
    //     router.refresh();
    //   })
    //   .catch(() => {
    //     toast.error("Reservation failed!");
    //   })
    //   .finally(() => {
    //     setIsLoading(false);
    //   });

    const resonse = await axios.post(`/api/reservations/checkout`, {
      totalPrice,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      listingId: listing?.id,
    });

    window.location.assign(resonse.data.url);
    confetti.onOpen();
  }, [totalPrice, dateRange, listing?.id, router, currentUser, loginModal]);

  //changing the total price depending on how many days user select
  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );

      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price]);

  //get listing by swr
  const { data: fetchedListing } = useListing(listing.id as string);

  return (
    <>
      <Container>
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col gap-2">
            <ListingHead
              title={listing.title}
              imageSrc={listing.imageSrc}
              locationValue={listing.locationValue}
              id={listing.id}
              currentUser={currentUser}
              address={listing.address}
            />
            <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
              <div className="col-span-4">
                <ListingInfo
                  user={listing.user}
                  category={category}
                  description={listing.description}
                  roomCount={listing.roomCount}
                  guestCount={listing.guestCount}
                  bathroomCount={listing.bathroomCount}
                  locationValue={listing.locationValue}
                  address={listing.address}
                  communicationLink={listing.communicationLink}
                />
              </div>
              <div className="order-first mb-10 md:order-last md:col-span-3">
                <ListingReservation
                  price={listing.price}
                  totalPrice={totalPrice}
                  onChangeDate={(value) => setDateRange(value)}
                  dateRange={dateRange}
                  onSubmit={onCreateReservation}
                  disabled={isLoading}
                  disabledDates={disabledDates}
                />
              </div>
            </div>
            <div className="mt-5 mb-5">
              <hr />
            </div>

            {/* listingStarReview */}
            <div>
              <Star />
            </div>

            {/* listingReview */}
            <div>
              <Reviews reviews={fetchedListing?.reviews} />
            </div>

            {/* ReviewInput */}
            <div>
              <ReiewInput
                placeholder="Help others by sharing your feedback. Write a review now..."
                listingId={listing.id}
                currentUser={currentUser!}
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default ListingClient;
