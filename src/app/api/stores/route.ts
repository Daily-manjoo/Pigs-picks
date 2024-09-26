import { NextResponse } from "next/server";
import type { NextResponse as NextResponseType } from "next/server";
import { StoreApiResponse, StoreType } from "@/interface";
import prisma from "@/db";
import axios from "axios";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*", // 모든 도메인에서 접근 허용 (보안상 위험할 수 있음)
  // 'Access-Control-Allow-Origin': 'https://your-domain.com', // 특정 도메인만 허용할 때 사용
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// 공통 CORS 설정 함수
function setCorsHeaders(response: NextResponseType): NextResponseType {
  Object.entries(CORS_HEADERS).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  return response;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") as string;
  const limit = searchParams.get("limit") as string;
  const q = searchParams.get("q") as string;
  const district = searchParams.get("district") as string;
  const id = searchParams.get("id") as string;

  const session = await getServerSession(authOptions);

  let response;
  if (page) {
    const count = await prisma.store.count();
    const skipPage = parseInt(page) - 1;
    const stores = await prisma.store.findMany({
      orderBy: { id: "asc" },
      where: {
        name: q ? { contains: q } : {},
        address: district ? { contains: district } : {},
      },
      take: parseInt(limit),
      skip: skipPage * 10,
    });

    response = NextResponse.json(
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
        id: id ? parseInt(id) : {},
      },
      include: {
        likes: {
          where: session ? { userId: session.user.id } : {},
        },
      },
    });

    response = NextResponse.json(id ? stores[0] : stores, {
      status: 200,
    });
  }

  return setCorsHeaders(response); // CORS 설정 추가
}

export async function POST(req: Request) {
  const formData = await req.json();
  const headers = {
    Authorization: `KakaoAK ${process.env.KAKAO_CLIENT_ID}`,
  };

  const { data } = await axios.get(
    `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURI(
      formData.address
    )}`,
    { headers }
  );

  const result = await prisma.store.create({
    data: { ...formData, lat: data.documents[0].y, lng: data.documents[0].x },
  });

  const response = NextResponse.json(result, { status: 200 });
  return setCorsHeaders(response); // CORS 설정 추가
}

export async function PUT(req: Request) {
  const formData = await req.json();
  const headers = {
    Authorization: `KakaoAK ${process.env.KAKAO_CLIENT_ID}`,
  };

  const { data } = await axios.get(
    `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURI(
      formData.address
    )}`,
    { headers }
  );

  const result = await prisma.store.update({
    where: { id: formData.id },
    data: { ...formData, lat: data.documents[0].y, lng: data.documents[0].x },
  });

  const response = NextResponse.json(result, {
    status: 200,
  });
  return setCorsHeaders(response); // CORS 설정 추가
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (id) {
    const result = await prisma.store.delete({
      where: {
        id: parseInt(id),
      },
    });

    const response = NextResponse.json(result, {
      status: 200,
    });
    return setCorsHeaders(response); // CORS 설정 추가
  }

  const response = NextResponse.json(null, {
    status: 500,
  });
  return setCorsHeaders(response); // CORS 설정 추가
}

// OPTIONS 메서드에 대한 처리를 추가하여 CORS preflight 요청을 처리합니다.
export function OPTIONS() {
  const response = NextResponse.json({}, { status: 200 });
  return setCorsHeaders(response);
}
