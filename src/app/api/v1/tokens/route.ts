import { db } from "@/db";
import { validateTokenSet } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";



export async function GET(req: NextRequest) {
  try {
    // Obtener el email desde la URL
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId"); // userId es el email en tu caso

    console.log('UserId from GET', userId);

    if (!userId) {
      return NextResponse.json({ error: "We don't retrieve user email param" }, { status: 400 });
    }

    const decodedUserId = decodeURIComponent(userId);
    // Buscar en la base de datos si existe un token para ese email
    const userToken = await db.tokens.findUnique({
      where: {
        email: decodedUserId
      },
      select: {
        twitch: true
      }
    });

    const validToken = validateTokenSet(userToken?.twitch);

    if (!validToken) {
      //if (!userToken || !userToken.twitch) {

      console.log('Token current value is null');

      return NextResponse.json({ isValid: false, message: "There is not valid token" }, { status: 404 });
    }

    // Verificar si el token aún es válido
    const isTokenActive = new Date().getTime() < new Date(validToken?.data?.expires_in!).getTime();

    return NextResponse.json({
      isValid: isTokenActive,
      accessToken: validToken?.data?.accessToken,
      expires_in: validToken?.data?.expires_in,
    });

  } catch (error) {
    console.error("Error in GET /api/v1/tokens:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
