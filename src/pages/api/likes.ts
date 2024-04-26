import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import prisma from "@/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user) {
    return res.status(401);
  }

  if (req.method === "POST") {
    //찜하기 로직 처리
    const { storeId }: { storeId: number } = req.body;

    // Like 데이터가 있는지 확인
    let like = await prisma.like.findFirst({
      //찜 데이터는 스토어 당 최대 하나이기 때문에
      where: {
        storeId,
        userId: session?.user?.id,
      },
    });

    //이미 찜했다면 like 데이터 삭제, 아니면 데이터 생성
    if (like) {
      like = await prisma.like.delete({
        where: {
          id: like.id,
        },
      });
      return res.status(204).json(like);
    } else {
      like = await prisma.like.create({
        data: {
          storeId,
          userId: session?.user?.id,
        },
      });
      return res.status(201).json(like);
    }
  }
}
