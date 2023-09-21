import { Review, User } from "@prisma/client";

export type FullReviewType = Review & {
  users: User;
};
