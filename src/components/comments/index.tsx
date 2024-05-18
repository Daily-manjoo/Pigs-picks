interface CommentProps {
  storeId: number;
}

export default function Comments({ storeId }: CommentProps) {
  return (
    <div className="md:max-w-2xl px-2 py-8 mb-20 mx-auto">
      <h1>댓글 폼과 리스트</h1>
      {/*comment form*/}
      {/*comment list*/}
    </div>
  );
}
