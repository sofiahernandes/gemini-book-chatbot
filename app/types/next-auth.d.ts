import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string; // optional: if you added roles
    };
  }

  interface User {
    id: string;
    role?: string;
  }
}
