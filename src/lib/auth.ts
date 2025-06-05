import CredentialProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { prisma } from "../../backend/database";
import { error } from "console";

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
                    const ifUserExists = await prisma.user.findUnique({
                        where: {
                            email,
                        },
                    });
                    const comparingPassword = await bcrypt.compare(
                        password,
                        ifUserExists?.password || ""
                    );
                    if (!ifUserExists || !comparingPassword) {
                        return null;
                    }
                    return {
                        id: ifUserExists.id,
                        name: ifUserExists.name,
                        email: ifUserExists.email,
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
