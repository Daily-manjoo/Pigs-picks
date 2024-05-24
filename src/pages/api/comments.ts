import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import prisma from "@/db";
import { CommentInterface, CommentApiResponse } from "@/interface";

interface ResponseType {
  page?: string;
  limit?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CommentInterface | CommentApiResponse>
) {
  const session = await getServerSession(req, res, authOptions); //현재 로그인된 사용자의 정보 가져오기

  if (req.method === "POST") {
    //댓글 생성 로직
    if (!session?.user) {
      return res.status(401);
    }
  } else if (req.method === "DELETE") {
    //댓글 삭제 로직
  } else {
    //댓글 가져오기
  }
}
