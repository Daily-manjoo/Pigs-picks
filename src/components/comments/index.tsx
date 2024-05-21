import { useForm } from "react-hook-form";

interface CommentProps {
  storeId: number;
}

export default function Comments({ storeId }: CommentProps) {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm();
  return (
    <div className="md:max-w-2xl px-2 py-8 mb-20 mx-auto">
      {/*comment form*/}
      <div className="flex flex-col space-y-4">
        <form
          onSubmit={handleSubmit(async (data) => {
            console.log(data);
          })}
        >
          <textarea
            rows={3}
            placeholder="댓글을 입력해주세요!"
            {...register("body", { required: true })}
            className="w-full block min-h-[120px] resize-none border-0 bg-transparent py-2 px-4 text-black placeholder:text-gray-400 text-sm leading-6"
          />
        </form>
        {/*error box*/}
        <div className="text-xs text-red-500">필수로 입력해주세요.</div>
      </div>
      {/*comment list*/}
    </div>
  );
}
