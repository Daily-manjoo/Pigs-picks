import { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { AiOutlineClose, AiOutlineInfoCircle, AiOutlineCheck, AiOutlinePhone } from "react-icons/ai";
import { HiOutlineMapPin } from "react-icons/hi2";
import { StoreType } from "@/interface";

interface StoreBoxProps {
    store: StoreType | null;
    setStore: Dispatch<SetStateAction<any>>;
}

//store에서 x를 눌렀을때 현재값을 없애주기위해 store, setStore 둘 다 받음
export default function StoreBox({store, setStore}: StoreBoxProps){
    return (
        <div className="fixed transition ease-in-out delay-150 inset-x-0 mx-auto bottom-20 rounded-lg shadow-lg max-w-sm md:max-w-wl z-10 w-full bg-white">
            {store && (
                <>
                <div className="p-6">
                    <div className="flex justify-between items-start">
                        <div className="flex gap-4 items-center">
                            <Image src={store?.category ? `/images/markers/${store?.category}.png` : "/images/markers/default.png"
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
                    <div className="mt-2 flex gap-2 items-center text-sm">
                        <HiOutlineMapPin />
                        {store?.address}
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
                <button type="button" onClick={() => window.alert('상세보기 예시')} className="w-full bg-blue-700 hover:bg-blue-500 focus:bg-blue-500 py-3 text-white font-semibold rounded-b-lg">
                    상세보기
                </button>
            </>
            )}
        </div>
    );
}