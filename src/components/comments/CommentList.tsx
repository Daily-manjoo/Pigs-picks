import { CommentApiResponse } from "@/interface";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

interface CommentListProps {
  comments?: CommentApiResponse;
}

export default function CommentList({ comments }: CommentListProps) {
  const { data: session } = useSession();

  const handleDeleteComment = async (id: number) => {
    const confirm = window.confirm("댓글을 지우시겠습니까?");

    if (confirm) {
      try {
        const result = await axios.delete(`/api/comments?id=${id}`);

        if (result.status === 200) {
          toast.success("댓글이 삭제되었습니다.");
        } else {
          toast.error("다시 시도해주세요.");
        }
      } catch (e) {
        console.log(e);
      }
    }
  };
  return (
    <div className="my-10">
      {comments?.data && comments?.data?.length > 0 ? (
        comments?.data?.map((comment) => (
          <div
            key={comment.id}
            className="space-x-4 flex items-center text-sm mb-8 border-b border-gray-100 pb-8 text-gray-500"
          >
            <div>
              <img
                src={
                  comment?.user?.image || "/public/images/markers/default.png"
                }
                width={40}
                height={40}
                className="rounded-full h-10 w-10 bg-gray-10"
                alt="profile image"
              />
            </div>
            <div className="flex-col flex space-y-1 flex-1">
              <div>{comment?.user?.email}</div>
              <div className="text-xs">
                {new Date(comment.createdAt)?.toLocaleDateString()}
              </div>
              <div className="text-black mt-1 text-base">{comment.body}</div>
            </div>
            <div>
              {comment.userId === session?.user.id && (
                <button
                  type="button"
                  onClick={() => handleDeleteComment(comment.id)}
                  className="text-gra-500 underline hover:text-gray-400"
                >
                  삭제
                </button>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="border border-gray-200 p-4 rounded-md text-sm text-gray-400">
          댓글이 없습니다.
        </div>
      )}
    </div>
  );
}
