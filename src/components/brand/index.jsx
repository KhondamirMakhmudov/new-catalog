import Image from "next/image";
import Link from "next/link";

const Brand = () => {
  return (
    <Link href={"/"}>
      <div className={"uppercase flex gap-x-[6px] items-center"}>
        <Image src={"/icons/logo.svg"} alt={"logo"} width={29} height={32} />
        <h1 className={"lg:text-xs md:text-[10px] text-0 font-bold"}>
          Qurilish resurslari <br />
          milliy klassifikatori
        </h1>
      </div>
    </Link>
  );
};

export default Brand;
