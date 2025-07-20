import CredentialProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string,
      name: string,
      email: string
    }
  }
  interface User {
    id: string,
    name: string,
    email: string
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "eg. jsmith@gmail.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const { email, password } = credentials;

        try {
          const findUser = await fetch(`${process.env.BASE_URL}/user/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
              password: password,
            }),
          });
          const response = await findUser.json();
          if ((response.message !== "Login successful" || !response.user)) {
            return null;
          }
          return {
            id: response.user.id,
            name: response.user.name,
            email: response.user.email,
          };
        } catch (err) {
          console.log("Error in finding user: ", err);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
    signOut: "/",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      console.log("🔥 jwt callback - user:", user);
      console.log("🔥 jwt callback - token BEFORE:", token);

      if (user) {
          token.id = user.id;
          token.name = user.name;
          token.email = user.email;
      }
      console.log("🔥 jwt callback - token AFTER:", token);

      return token;
    },
    async session({session, token}) {
      console.log("🔥 session callback - token BEFORE:", session);
      console.log("🔥 session.id as string")
      session.user.name = token.name as string;
      session.user.email = token.email as string;
      console.log("🔥 session callback - token AFTER:", session);
      return session;
    }
  },
};
