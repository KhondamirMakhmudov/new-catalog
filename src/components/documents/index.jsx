import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
const Documents = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex gap-x-[5px] items-center"
      >
        <p>Me&apos;yoriy hujjatlar</p>
        <Image
          src={"/icons/down.svg"}
          alt={"down"}
          width={18}
          height={18}
          className={`${
            !open ? "rotate-0" : "rotate-180"
          } transition-all duration-300`}
        />
      </button>

      {open && (
        <ul className="absolute space-y-[4px] p-[12px] w-[200px] rounded-[8px] border border-[#E6E5ED] bg-white text-xs z-50">
          <li>
            <Link href={"/normative-documents/shnk"}>
              <button className="bg-[#F7F7F7] hover:bg-[#F4F7FB] transition-all duration-200 text-black w-full p-[8px] text-start rounded-[4px]">
                Shaharsozlik normalari va qoidalari
              </button>
            </Link>
          </li>
          <li>
            <Link href={"/normative-documents/building-regulations"}>
              <button className="bg-[#F7F7F7] hover:bg-[#F4F7FB] transition-all duration-200 text-black w-full p-[8px] text-start rounded-[4px]">
                Qurilish reglamentlari
              </button>
            </Link>
          </li>
          <li>
            <Link href={"/normative-documents/estimated-resource-norms"}>
              <button className="bg-[#F7F7F7] hover:bg-[#F4F7FB] transition-all duration-200 text-black w-full p-[8px] text-start rounded-[4px]">
                Smeta resurs normalari
              </button>
            </Link>
          </li>
          <li>
            <Link href={"/normative-documents/methodical-guides"}>
              <button className="bg-[#F7F7F7] hover:bg-[#F4F7FB] transition-all duration-200 text-black w-full p-[8px] text-start rounded-[4px]">
                Metodik qo'llanmalar
              </button>
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Documents;
