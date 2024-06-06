import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface CommentFormProps {
  storeId: number;
  refetch: () => void;
}

export default function CommentForm({ storeId, refetch }: CommentFormProps) {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm();
  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        const result = await axios.post("/api/comments", {
          ...data,
          storeId, //body값은 파라미터로
        });

        if (result.status === 200) {
          toast.success("댓글을 등록했습니다.");
          resetField("body"); //바디값 리셋
        } else {
          toast.error("다시 시도해주세요.");
        }
      })}
      className="flex flex-col space-y-2"
    >
      {errors?.body?.type === "required" && (
        <div className="text-xs text-red-500">필수로 입력해주세요.</div>
      )}
      <textarea
        rows={3}
        placeholder="댓글을 입력해주세요!"
        {...register("body", { required: true })}
        className="w-full block min-h-[120px] resize-none rounded-md border bg-transparent py-2 px-4 text-black placeholder:text-gray-400 text-sm leading-6"
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 text-sm font-semibold mt-2 rounded-md shadow-sm "
      >
        작성하기
      </button>
    </form>
  );
}
