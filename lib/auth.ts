import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Burada kendi authentication mantığınızı implement edebilirsiniz
        // Örnek olarak basit bir kontrol:
        if (credentials?.email === "admin@example.com" && credentials?.password === "admin123") {
          return {
            id: "1",
            email: "admin@example.com",
            name: "Admin User",
          };
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
}; 