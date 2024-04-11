// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { StoreApiResponse, StoreType } from "../../interface";
import prisma from "@/db";
import axios from "axios";

interface ResponseType {
  page?: string;
  limit?: string;
  q?: string;
  district?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StoreApiResponse | StoreType[] | StoreType | null>
) {
  const { page = "", limit = "", q, district }: ResponseType = req.query;
  if (req.method === "POST") {
    //데이터 생성 처리
    const formData = req.body;
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

    return res.status(200).json(result);
  } else {
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

      res.status(200).json({
        page: parseInt(page),
        data: stores,
        totalCount: count,
        totalPage: Math.ceil(count / 10),
      });
    } else {
      const { id }: { id?: string } = req.query;
      const stores = await prisma.store.findMany({
        orderBy: { id: "asc" },
        where: {
          id: id ? parseInt(id) : {}, //id가 있다면 가져오고 없으면 무시
        },
      });

      return res.status(200).json(id ? stores[0] : stores);
    }
  }
}
