//next-auth의 id값 타입 설정

import NextAuth from "next-auth/next";

declare module "next-auth" {
  interface session {
    user: {
      id: number;
      name?: string;
      email: string;
      image?: string;
    };
  }
}
