import { StoreType } from "@/interface";
import axios from "axios";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useQuery } from "react-query";

import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
interface LikeProps {
  storeId: number;
}

export default function Like({ storeId }: LikeProps) {
  const { data: session } = useSession(); //로그인 된 사용자만 찜할 수 있도록
  const fetchStore = async () => {
    const { data } = await axios(`/api/stores?id=${storeId}`);
    return data as StoreType;
  };

  const { data: store } = useQuery(`like-store-${storeId}`, fetchStore, {
    enabled: !!storeId, //useQuery는 storeId값이 있는 경우에만 사용해야하기 때문
    refetchOnWindowFocus: false,
  });
  const toggleLike = async () => {
    //찜하기 / 찜취소 로직
    if (session?.user && store) {
      try {
        const like = await axios.post("/api/likes", {
          storeId: store.id, //내가 누른 가게가 몇 번째 가게인지 백엔드에서 인지
        });
        console.log(like);
        if (like.status === 201) {
          toast.success("가게를 찜하였습니다.");
        } else {
          toast.warn("찜을 취소했습니다.");
        }
      } catch (e) {
        console.log(e);
      }
    }
  };
  return (
    <button type="button" onClick={toggleLike}>
      {/*로그인 된 사용자가 좋아요 눌렀다면 */}
      {store?.likes?.length ? ( // 찜한 like 데이터는 각 스토어별로 최대 하나씩 있기 때문에 length>0이 아니다.
        <AiFillHeart className="hover:text-red-600 focus:text-red-600 text-red-500" />
      ) : (
        <AiOutlineHeart className="hover:text-red-600 focus:text-red-600" />
      )}
    </button>
  );
}
