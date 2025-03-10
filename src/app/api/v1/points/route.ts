import { NextRequest, NextResponse } from "next/server";
import { getPointsAndTier } from "@/app/actions";
import { auth } from "@/auth";

// export async function POST(req: NextRequest, res: NextResponse) {
//   try {
//     const { count } = await req.json()
//     // console.log('new count', count);
//     await db.visitCounter.update({
//       where: {
//         id: '66b3b02747a37ebedad1f3ba'
//       },
//       data: {
//         count
//       }
//     })
//     return NextResponse.json({ status: 200 })
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json({ status: 500 })
//   }

// }

export async function GET(req: NextRequest, res: NextResponse) {

  try {
    const session = await auth()
    const userPointsAndTier = await getPointsAndTier(session?.user?.email!)
    console.log('api server data', userPointsAndTier);
    return NextResponse.json({ userData: userPointsAndTier })

  } catch (error) {
    console.log(error);
    return NextResponse.json({ userData: null })
  }


}