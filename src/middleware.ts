import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  // console.log("Middleware ejecutándose solo en dashboard");
  const { getUser } = getKindeServerSession();
  const user = getUser();
  // console.log("Middleware user from Kindle", user);
  if (user && user.email === process.env.ADMIN_EMAIL) {
    return NextResponse.next();
  }
  // Aquí puedes agregar cualquier lógica que necesites
  else if (req.nextUrl.pathname === '/dashboard') {
    return NextResponse.redirect(new URL('/login', req.url))
  }
  else {
    return NextResponse.redirect(new URL('/', req.url))
  }
}

// Si deseas que el middleware se ejecute en todas las rutas, no necesitas la configuración `matcher`
// Si prefieres limitarlo a ciertas rutas, puedes añadir el config
export const config = {
  matcher: ['/dashboard(.*)'], // Aplica a todas las rutas
};
