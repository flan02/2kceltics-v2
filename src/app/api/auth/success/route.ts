import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest, NextResponse } from "next/server";


export async function GET(_req: NextRequest, res: NextResponse) {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const user = getUser();
  console.log("User from Kinde", user);

  const isAuth = isAuthenticated();
  console.log("is authenticated", isAuth);


  if (!user || user == null || !user.id) {
    throw new Error("something went wrong with authentication" + user);
  }

  let dbUser = await db.user.findUnique({
    where: { kindeId: user.id }
  })

  if (!dbUser) {
    dbUser = await db.user.create({
      data: {
        kindeId: user.id,
        firstName: user.given_name ?? "",
        lastName: user.family_name ?? "",
        email: user.email ?? "", // Using nullish coalescing operator to provide a default empty string value
        picture: user.picture ?? "",
        given_name: user.given_name ?? "",

      }
    });
  }

  return NextResponse.redirect("http://localhost:3000/dashboard");
}