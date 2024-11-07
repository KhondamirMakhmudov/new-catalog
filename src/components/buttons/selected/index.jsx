import Image from "next/image";

const Selected = () => {
  return (
    <button
      className={
        "p-[9px] bg-[#EBF2FA] rounded-[8px] active:scale-110 scale-100 transition-all duration-200"
      }
    >
      <Image src={"/icons/heart.svg"} alt={"heart"} width={20} height={20} />
    </button>
  );
};

export default Selected;
