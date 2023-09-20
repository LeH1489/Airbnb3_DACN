import { getServerSession } from "next-auth";

import { authOptions } from "../api/auth/[...nextauth]/route";

//server action
export default async function getSession() {
  return await getServerSession(authOptions);
}
