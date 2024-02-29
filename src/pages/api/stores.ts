// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {StoreApiResponse} from "../../interface"
import { PrismaClient } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StoreApiResponse>,
) {
  const {page="1"}: {page? : string} = req.query;
  const prisma = new PrismaClient();
  const skipPage = parseInt(page) - 1; //인덱스는 0부터, 페이지는 1부터 시작하니까 -1을 해준다
  const count = await prisma.store.count(); //총 레코드 개수 넘겨주기
  const stores = await prisma.store.findMany({
    orderBy: {id: "asc"},
    take: 10, //페이지 당 목록 10개만 가져오기
    skip: skipPage * 10, //다음으로 건너뛸 데이터 수
  });

  //페이지네이션 하기 위해 전달할 것들: totalPage, data, page

  res.status(200).json({
    page: parseInt(page),
    data: stores,
    totalCount: count,
    totalPage: Math.ceil(count / 10),
  })
}
