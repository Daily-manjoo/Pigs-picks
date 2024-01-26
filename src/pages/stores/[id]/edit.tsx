import { useRouter } from "next/router"

export default function StoreEditage(){
    const router = useRouter();
    const {id} = router.query;
    return(
        <div>
            <h1>Store Edit:{id}</h1>
        </div>
    )
}