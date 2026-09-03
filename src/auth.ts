import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { createUser, loggedAsAdmin } from "./app/dashboard/actions";

import { User } from "types";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
      checks: ["none"],
      issuer: "https://github.com",
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        const { name, email, image } = user as User;
        console.log("Intentando iniciar sesión con email:", email);

        const userFound = await loggedAsAdmin(email);
        console.log("Resultado de loggedAsAdmin:", userFound);

        if (!userFound) {
          console.log(
            "Usuario no encontrado en base de datos. Intentando crear...",
          );
          await createUser(name, email, image);
          return false;
        }

        if (userFound.role == "ADMIN") {
          console.log("¡Usuario ADMIN verificado con éxito!");
          return true;
        }

        console.log("El usuario no es ADMIN. Denegando acceso.");
        return false;
      } catch (error) {
        console.error("❌ ERROR CRÍTICO EN EL SIGN_IN CALLBACK:", error);
        return false;
      }
    },
    // async signIn({ user, account, profile }) {
    //   try {
    //     const { name, email, image } = user as User;

    //     //console.log({ user, account, profile });
    //     //console.log('Current email', email);
    //     const userFound = await loggedAsAdmin(email); // We need to know if the user is an admin or not

    //     if (!userFound) {
    //       await createUser(name, email, image);
    //       return false;
    //     }
    //     if (userFound.role == "ADMIN") return true;
    //     return false;
    //   } catch (error) {
    //     console.error("We found the following error: ", error);
    //     return false;
    //   }
    // },
  },
  pages: {
    signIn: "/dashboard",
    signOut: "/",
    error: "/",
  },
});
