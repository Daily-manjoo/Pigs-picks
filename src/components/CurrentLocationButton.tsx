import { mapState } from "@/atom";
import { useState } from "react";
import { MdMyLocation } from "react-icons/md";
import { useRecoilValue } from "recoil";
import { toast } from "react-toastify";
import FullPageLoader from "./FullPageLoader";

export default function CurrentLocationButton() {
  const [loading, setLoading] = useState<boolean>(false); //내 위치가 로딩중인지, 끝났는지
  const map = useRecoilValue(mapState);
  const handleCurrnetPosition = () => {
    setLoading(true);

    //geolocation으로 현재 위치 가져오기

    const options = {
      enableHighAccuracy: false,
      timeout: 5000, //5초동안 가져오기
      maximumAge: Infinity, //캐싱되는 위치
    };

    if (navigator.geolocation && map) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentPosition = new window.kakao.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude
          );

          if (currentPosition) {
            setLoading(false);
            map.panTo(currentPosition);
            toast.success("현재 위치로 이동되었습니다.");
          }

          return currentPosition;
        },
        () => {
          toast.error("현재 위치를 가져올 수 없습니다.");
          setLoading(false);
        },
        options
      );
    }
  };

  return (
    <>
      {loading && <FullPageLoader />}
      <button
        type="button"
        className="fixed z-10 p-2 right-10 bg-white bottom-20 rounded-md hover:shadow-lg focus:shadow-lg hover:bg-blue-100 shadow"
        onClick={handleCurrnetPosition}
      >
        <MdMyLocation className="w-5 h-5" />
      </button>
    </>
  );
}
