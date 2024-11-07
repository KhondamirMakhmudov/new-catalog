import Image from "next/image";

const Basket = () => {
  return (
    <button
      className={
        "p-[9px] bg-[#EBF2FA] rounded-[8px] active:scale-110 scale-100 transition-all duration-200"
      }
    >
      <Image src={"/icons/basket.svg"} alt={"basket"} width={20} height={20} />
    </button>
  );
};

export default Basket;
