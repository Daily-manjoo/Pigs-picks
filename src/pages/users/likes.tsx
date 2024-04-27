import { LikeApiResponse } from "@/interface";
import axios from "axios";
import { useQuery } from "react-query";

export default function LikesPage() {
  const fetchLikes = async () => {
    const { data } = await axios("/api/likes");
    return data as LikeApiResponse;
  };

  const { data } = useQuery("likes", fetchLikes);

  return (
    <div>
      <h1>Likes Page</h1>
    </div>
  );
}
