import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/db";
import GoogleProvider from "next-auth/providers/google";
import NaverProvider from "next-auth/providers/naver";
import KakaoProvider from "next-auth/providers/kakao";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt" as const, //로그인 이후에도 middleware.ts의 경로 접근하기 위해 명시
    maxAge: 60 * 60 * 24, //세션 최대 수명(초단위 표시, 24시간 유지)
    updateAge: 60 * 60 * 2, //세션 업데이트 주기(초단위 표시, 2시간 유지 )
  },
  adapter: PrismaAdapter(prisma) as any,
  //Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID || "",
      clientSecret: process.env.NAVER_CLIENT_SECRET || "",
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID || "",
      clientSecret: process.env.KAKAO_CLIENT_SECRET || "",
    }),
  ],
  pages: {
    signIn: "/users/login", //해당 경로로 이동
  },

  //NextAuth callback 정의
  //어떤 user가 가게를 찜했는지 알 수 있게 user의 id값 추가
  callbacks: {
    session: ({ session, token }) => ({
      //사용자가 로그인을 유지하는동안 세션 관리 방식 정의
      ...session,
      user: {
        ...session.user,
        id: token.sub,
      },
    }),
    jwt: async ({ user, token }) => {
      //사용자가 로그인했을 때 jwt을 생성하고 사용자정보를 포함시킨다
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions as any);
export { handler as GET, handler as POST };
