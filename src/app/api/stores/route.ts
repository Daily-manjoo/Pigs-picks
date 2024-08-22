// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextResponse } from "next/server";
import type { NextApiRequest, NextApiResponse } from "next";
import { StoreApiResponse, StoreType } from "@/interface";
import prisma from "@/db";
import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") as string;
  const limit = searchParams.get("limit") as string;
  const q = searchParams.get("q") as string;
  const district = searchParams.get("district") as string;
  const id = searchParams.get("id") as string;

  const session = await getServerSession(authOptions);

  //GET 요청 처리
  if (page) {
    const skipPage = parseInt(page) - 1; //인덱스는 0부터, 페이지는 1부터 시작하니까 -1을 해준다
    const count = await prisma.store.count(); //총 레코드 개수 넘겨주기
    const stores = await prisma.store.findMany({
      orderBy: { id: "asc" },
      where: {
        name: q ? { contains: q } : {},
        address: district ? { contains: district } : {},
      },
      take: parseInt(limit), //페이지 당 목록 10개만 가져오기
      skip: skipPage * 10, //다음으로 건너뛸 데이터 수
    });

    //페이지네이션 하기 위해 전달할 것들: totalPage, data, page

    return NextResponse.json(
      {
        page: parseInt(page),
        data: stores,
        totalCount: count,
        totalPage: Math.ceil(count / 10),
      },
      {
        status: 200,
      }
    );
  } else {
    const stores = await prisma.store.findMany({
      orderBy: { id: "asc" },
      where: {
        id: id ? parseInt(id) : {}, //id가 있다면 가져오고 없으면 무시
      },
      include: {
        likes: {
          where: session ? { userId: session.user.id } : {}, //session 로그인이 된 경우 id를 가져오고 아니면 빈 쿼리 보내주기
          include: { user: true }, //user 정보 포함하도록 명시적 요청
        },
      },
    });

    return NextResponse.json(id ? stores[0] : stores, {
      status: 200,
    });
  }
}
