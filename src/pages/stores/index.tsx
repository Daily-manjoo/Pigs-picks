import React, {useRef, useEffect, useCallback} from "react";
import Image from "next/image";
import { StoreType} from "@/interface";
import axios from "axios";
import Loading from "@/components/Loading";
import { useRouter } from "next/router";
import { useInfiniteQuery } from "react-query";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import Loader from "@/components/Loader";
import SearchFilter from "@/components/SearchFilter";

export default function StoreListPage(){
    const router = useRouter();
    const {page = "1"}: any = router.query;
    const ref = useRef<HTMLDivElement | null>(null);
    const pageRef = useIntersectionObserver(ref, {});
    const isPageEnd = !!pageRef?.isIntersecting;

    const fetchStores = async({pageParam = 1}) => {
        const {data} = await axios("/api/stores?page=" + pageParam, {
            params: {
                limit: 10,
                page: pageParam,
            }
        });
        console.log("Received data:", data);
        return data;
    }

    const {data: stores, isFetching, fetchNextPage, isFetchingNextPage, hasNextPage, isError, isLoading} = useInfiniteQuery("stores", fetchStores, {
        getNextPageParam: (lastPage: any) => lastPage.data?.length > 0 ? lastPage.page + 1 : undefined
    })

    // 0.5초 뒤 무한스크롤 기능
    const fetchNext = useCallback(async () => {
        const res = await fetchNextPage();
        if(res.isError){
            console.log(res.error);
        }
    }, [fetchNextPage])

    useEffect(() => {
        let timerId: NodeJS.Timeout | undefined;
        if(isPageEnd && hasNextPage){
            timerId = setTimeout(() => {
                fetchNext()
            }, 500); //0.5초 뒤 타이머
        }

        return () => clearTimeout(timerId);
    }, [fetchNext, hasNextPage, isPageEnd])

    if(isError){
        return <div className="w-full h-screen mx-auto pt-[10%] text-red-500 text-center font-semibold">다시 시도해주세요.</div>
    }

    return(
        <div className="px-4 md:max-w-4xl mx-auto py-8">
            {/* search filter */}
            <SearchFilter />
            <ul role="list" className="divide-y divide-gray-100">
                {isLoading ? <Loading /> : stores?.pages?.map((page, index) => (
                    <React.Fragment key={index}>
                        {page.data.map((store: StoreType, i:number)=> ( //page라는 배열 안에 store 배열이 더 있으므로 두번 매핑
                            <li className="flex justify-between gap-x-6 py-5" key={i}>
                            <div className="flex gap-x-4">
                                <Image src={store?.category ? `/images/markers/${store?.category}.png` 
                                : "/images/markers/default.png"
                                }
                                width={48}
                                height={48}
                                alt="아이콘" />
                                <div>
                                    <div className="text-sm font-semibold leading-9 text-gray-900">
                                        {store?.name}
                                    </div>
                                    <div className="mt-1 text-xs truncate font-semibold leading-5 text-gray-500">
                                        {store?.name}
                                    </div>
                                </div>
                            </div>
                            <div className="hidden sm:flex sm:flex-col sm:items-end">
                                <div className="text-sm font-semibold leading-9 text-gray-900">
                                    {store?.address}
                                </div>
                                <div className="text-sm font-semibold leading-9 text-gray-900">
                                    {store?.phone || "번호없음"} | {store?.foodCertifyName} | {store?.category}
                                </div>
                            </div>
                        </li>
                        ))}
                    </React.Fragment>
                ))}
            </ul>
            {(isFetching || hasNextPage || isFetchingNextPage) && <Loader />}
            <div className="w-full touch-none h-10 mb-10" ref={ref} />
        </div>
    );
}