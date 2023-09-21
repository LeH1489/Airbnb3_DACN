"use client";

import ReviewBox from "./ReviewBox";

const ReviewData = [
  {
    id: 1,
    userImage: "/images/placeholder.png",
    username: "Meg",
    date: "September 2023",
    body: "Both Amelia and her lovely home are warm and welcoming, and the bed was super comfy. Thank you so much",
  },
  {
    id: 2,
    userImage: "/images/placeholder.png",
    username: "Thomas",
    date: "September 2023",
    body: "Both Amelia and her lovely home are warm and welcoming, and the bed was super comfy",
  },
  {
    id: 3,
    userImage: "/images/placeholder.png",
    username: "Mike",
    date: "September 2023",
    body: "Both Amelia and her lovely home are warm and welcoming, and the bed was super comfy",
  },
  {
    id: 4,
    userImage: "/images/placeholder.png",
    username: "David",
    date: "September 2023",
    body: "Both Amelia and her lovely home are warm and welcoming, and the bed was super comfy",
  },
  {
    id: 5,
    userImage: "/images/placeholder.png",
    username: "Martin",
    date: "September 2023",
    body: "Both Amelia and her lovely home are warm and welcoming, and the bed was super comfy",
  },
  {
    id: 6,
    userImage: "/images/placeholder.png",
    username: "Daniel",
    date: "September 2023",
    body: "Both Amelia and her lovely home are warm and welcoming, and the bed was super comfy",
  },
];

interface ReviewProps {
  reviews: Record<string, any>[];
}

const Reviews: React.FC<ReviewProps> = ({ reviews = [] }) => {
  return (
    <div className="mt-5 grid grid-cols-2 gap-x-10 gap-y-5 tracking-wide">
      {reviews.map((review: any) => (
        <ReviewBox
          key={review.id}
          data={review}
          date={review.createdAt}
          body={review.body}
        />
      ))}
    </div>
  );
};

export default Reviews;
