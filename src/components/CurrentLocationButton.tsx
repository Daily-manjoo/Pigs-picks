import { MdMyLocation } from "react-icons/md";

export default function CurrentLocationButton() {
  const handleCurrnetPosition = () => {};

  return (
    <button
      type="button"
      className="fixed z-10 p-2 right-10 bottom-20 bg-blue-100 rounded-md hover:shadow-lg focus:shadow-lg hover:bg-blue-200 shadow"
      onClick={handleCurrnetPosition}
    >
      <MdMyLocation className="w-5 h-5" />
    </button>
  );
}
