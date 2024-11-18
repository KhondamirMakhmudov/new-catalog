import Image from "next/image";

const ArrowRightButton = () => {
  return (
    <div
      className={
        "  py-[13px] w-full justify-center space-x-[12px]  items-center border border-[#D7D9DC] inline-flex rounded-[8px]"
      }
    >
      <p className={"text-[#21201FCC]"}>Qarang</p>
      <Image
        src={"/icons/arrow-right.svg"}
        alt="arrow-right"
        width={20}
        height={20}
      />
    </div>
  );
};

export default ArrowRightButton;
