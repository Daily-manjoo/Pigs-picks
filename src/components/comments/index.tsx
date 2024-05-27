import { useSession } from "next-auth/react";
import CommentForm from "./CommentForm";

interface CommentProps {
  storeId: number;
}

export default function Comments({ storeId }: CommentProps) {
  const { status } = useSession();
  return (
    <div className="md:max-w-2xl px-2 py-8 mb-20 mx-auto">
      {/*comment form*/}
      {status === "authenticated" && <CommentForm storeId={storeId} />}

      {/*comment list*/}
    </div>
  );
}
