import CredentialProvider from "next-auth/providers/credentials";

export const authOptions = {
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
            method: 'POST', 
            headers: {
              "Content-Type": "application/json"
            }, 
            body: JSON.stringify({
              email: email, 
              password: password
            })
          })
          const response = await findUser.json()
          if (!findUser.ok) {
            return null
          }
          return {
            id: response.id,
            name: response.name,
            email: response.email,
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

  },
  callbacks: {
    async signIn({
      username,
      email,
      password,
    }: {
      username: string;
      email: string;
      password: string;
    }) {
      return null;
    },
  },
};
