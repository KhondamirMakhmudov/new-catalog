import Image from "next/image";

const CatalogButton = ({ dropdown }) => {
  return (
    <button
      className={
        "flex items-center gap-x-[8px] text-white px-[14px] py-[10px] rounded-[8px] bg-[#0256BA]"
      }
    >
      <Image
        src={"/icons/catalog-icon.svg"}
        alt={"catalog-icon"}
        width={20}
        height={20}
      />

      <p className={"text-sm"}>Katalog</p>
    </button>
  );
};

export default CatalogButton;
