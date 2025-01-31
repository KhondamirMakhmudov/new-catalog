import Image from "next/image";
import { useState } from "react";
const Documents = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button className="flex gap-x-[5px]">
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
        <ul className=" space-y-[4px] p-[12px] rounded-[8px] border border-[#E6E5ED] bg-white text-xs">
          <li>
            <Link href={"/materials"}>
              <button className="bg-[#F7F7F7] hover:bg-[#F4F7FB] transition-all duration-200 text-black w-full p-[8px] text-start rounded-[4px]">
                Material va jihozlar
              </button>
            </Link>
          </li>
          <li>
            <Link href={"/machine-mechano"}>
              <button className="bg-[#F7F7F7] hover:bg-[#F4F7FB] transition-all duration-200 text-black w-full p-[8px] text-start rounded-[4px]">
                Mashina va mexanizmlar
              </button>
            </Link>
          </li>
          <li>
            <Link href={"/technos"}>
              <button className="bg-[#F7F7F7] hover:bg-[#F4F7FB] transition-all duration-200 text-black w-full p-[8px] text-start rounded-[4px]">
                Uskuna va qurilmalar
              </button>
            </Link>
          </li>
          <li>
            <Link href={"/works"}>
              <button className="bg-[#F7F7F7] hover:bg-[#F4F7FB] transition-all duration-200 text-black w-full p-[8px] text-start rounded-[4px]">
                Qurilish ishlari
              </button>
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Documents;
