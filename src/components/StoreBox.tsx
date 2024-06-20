"use client";

import Image from "next/image";
import {
  AiOutlineClose,
  AiOutlineInfoCircle,
  AiOutlineCheck,
  AiOutlinePhone,
} from "react-icons/ai";
import { RiMapPinLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { currentStoreState } from "@/atom";
import Like from "./Like";

export default function StoreBox() {
  const router = useRouter();
  const [store, setStore] = useRecoilState(currentStoreState);

  return (
    <div className="fixed transition justify-center ease-in-out delay-150 inset-x-0 mx-auto bottom-12 transform -translate-y-1/2 rounded-lg shadow-lg max-w-sm md:max-w-wl z-10 w-full bg-white">
      {store && (
        <>
          <div className="p-6">
            <div className="flex justify-between items-start">
              <div className="flex gap-4 items-center">
                <Image
                  src={
                    store?.category
                      ? `/images/markers/${store?.category}.png`
                      : "/images/markers/default.png"
                  }
                  width={40}
                  height={40}
                  alt="아이콘 이미지"
                />
                <div>
                  <div className="semi-bold">{store?.name}</div>
                  <div className="text-sm">{store?.storeType}</div>
                </div>
              </div>
              <button type="button" onClick={() => setStore(null)}>
                <AiOutlineClose />
              </button>
            </div>

            <div className="flex justify-between gap-4">
              <div className="mt-2 flex gap-2 items-center text-sm col-span-3">
                <RiMapPinLine />
                {store?.address || "주소가 없습니다."}
              </div>
              <Like storeId={store.id} />
            </div>

            <div className="mt-2 flex gap-2 items-center text-sm">
              <AiOutlinePhone />
              {store?.phone}
            </div>
            <div className="mt-2 flex gap-2 items-center text-sm">
              <AiOutlineInfoCircle />
              {store?.storeType}
            </div>
            <div className="mt-2 flex gap-2 items-center text-sm">
              <AiOutlineCheck />
              {store?.category}
            </div>
          </div>
          <button
            type="button"
            onClick={() => router.push(`/stores/${store.id}`)}
            className="w-full bg-blue-700 hover:bg-blue-500 focus:bg-blue-500 py-3 text-white font-semibold rounded-b-lg"
          >
            상세보기
          </button>
        </>
      )}
    </div>
  );
}
