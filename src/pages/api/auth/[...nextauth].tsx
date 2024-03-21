import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import GoogleProvider from 'next-auth/providers/google';
import NaverProvider from 'next-auth/providers/naver';
import KakaoProvider from "next-auth/providers/kakao"

const prisma = new PrismaClient();

export const authOptions = {
    session: {
        strategy: 'jwt' as const, //로그인 이후에도 middleware.ts의 경로 접근하기 위해 명시
        maxAge: 60 * 60 * 24, //세션 최대 수명(초단위 표시, 24시간 유지)
        updateAge: 60 * 60 * 2, //세션 업데이트 주기(초단위 표시, 2시간 유지 )
    },
    adapter: PrismaAdapter(prisma),
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
        })
    ],
    pages: {
        signIn: "/users/login", //해당 경로로 이동
    }
};

export default NextAuth(authOptions as any);