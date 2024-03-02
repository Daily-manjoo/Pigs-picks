import { RefObject, useEffect, useState } from "react";

function useIntersectionObserver(elementRef: RefObject<Element>,
    {threshold = 0.1, root = null, rootMargin = "0%"}
    ) {
    const [entry, setEnetry] = useState<IntersectionObserverEntry>();
    const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
        setEnetry(entry)
    }

    useEffect(()=> {
        const node = elementRef.current; //관찰할 값 지정
        const hasIOSupport = !!window.IntersectionObserver; //브라우저 옵저버 지원 여부

        if(!node || !hasIOSupport) return;

        const observerParams = {threshold, root, rootMargin};
        const observer = new IntersectionObserver(updateEntry, observerParams);

        observer.observe(node);

        return () => observer.disconnect();
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [elementRef?.current, root, rootMargin, JSON.stringify(threshold)])
    
    return entry;
}

export default useIntersectionObserver;