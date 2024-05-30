// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { StoreApiResponse, StoreType } from "../../interface";
import prisma from "@/db";
import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

interface ResponseType {
  page?: string;
  limit?: string;
  q?: string;
  district?: string;
  id?: string;
  user?: boolean;
  storeId?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StoreApiResponse | StoreType[] | StoreType | null>
) {
  const { page = "", limit = "", q, district, id }: ResponseType = req.query;
  const session = await getServerSession(req, res, authOptions);

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
  } else if (req.method === "PUT") {
    //데이터 수정 처리
    const formData = req.body;
    const headers = {
      Authorization: `KakaoAK ${process.env.KAKAO_CLIENT_ID}`,
    };

    const { data } = await axios.put(
      `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURI(
        formData.address
      )}`,
      formData,
      { headers }
    );

    const result = await prisma.store.update({
      where: { id: formData.id },
      data: { ...formData, lat: data.documents[0].y, lng: data.documents[0].x },
    });

    return res.status(200).json(result);
  } else if (req.method === "DELETE") {
    // 데이터 삭제 처리
    if (id) {
      const result = await prisma.store.delete({
        where: {
          id: parseInt(id),
        },
      });

      return res.status(200).json(result);
    } else {
      //id값이 없는 경우
      return res.status(500).json(null);
    }
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
        include: {
          likes: {
            where: session ? { userId: session.user.id } : {}, //session 로그인이 된 경우 id를 가져오고 아니면 빈 쿼리 보내주기
            include: { user: true }, //user 정보 포함하도록 명시적 요청
          },
        },
      });

      return res.status(200).json(id ? stores[0] : stores);
    }
  }
}
