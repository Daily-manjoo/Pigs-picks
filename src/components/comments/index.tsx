/* eslint-disable @next/next/no-img-element */
import { useSession } from "next-auth/react";
import CommentForm from "./CommentForm";
import { useQuery } from "react-query";
import axios from "axios";
import { useRouter } from "next/router";
import { CommentApiResponse } from "@/interface";

interface CommentProps {
  storeId: number;
}

export default function Comments({ storeId }: CommentProps) {
  const { status } = useSession();
  const router = useRouter();
  const { page = "1" }: any = router.query;

  const fetchComments = async () => {
    const { data } = await axios(
      `/api/comments?storeId=${storeId}&limit=10&page=${page}`
    );

    return data as CommentApiResponse;
  };

  const { data: comments } = useQuery(`comments-${storeId}`, fetchComments);

  return (
    <div className="md:max-w-2xl px-2 py-8 mb-20 mx-auto">
      {/*comment form*/}
      {status === "authenticated" && <CommentForm storeId={storeId} />}
      <div className="my-10">
        {comments?.data && comments?.data?.length > 0 ? (
          comments?.data?.map((comment) => (
            <div
              key={comment.id}
              className="space-x-4 flex text-sm text-gray-500"
            >
              <div>
                <img
                  src={comment?.user?.image || "/images/markers/default.png"}
                  width={40}
                  height={40}
                  className="rounded-full bg-gray-10"
                  alt="profile"
                />
              </div>
              <div></div>
              <div></div>
            </div>
          ))
        ) : (
          <div className="border border-gray-200 p-4 rounded-md text-sm text-gray-400">
            댓글이 없습니다.
          </div>
        )}
      </div>
      {/*comment list*/}
    </div>
  );
}
