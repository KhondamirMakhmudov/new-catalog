import Image from "next/image";
import Link from "next/link";

const Brand = () => {
  return (
    <Link href={"/"}>
      <div className={"uppercase flex gap-x-[6px]"}>
        <Image src={"/images/logo.png"} alt={"logo"} width={37} height={32} />
        <h1 className={"text-xs font-bold"}>
          Qurilish resurslari <br />
          milliy klassifikatori
        </h1>
      </div>
    </Link>
  );
};

export default Brand;
