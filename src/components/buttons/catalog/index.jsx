import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
const CatalogButton = ({ dropdown }) => {
  const [openDepartment, setOpenDepartment] = useState(false);
  return (
    <div>
      <button
        onMouseEnter={() => setOpenDepartment(true)}
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
      </button>{" "}
      {openDepartment && (
        <motion.div
          onMouseLeave={() => setOpenDepartment(false)}
          className={"absolute z-50"}
          initial={{ opacity: 0, translateY: "30px" }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.2 }}
        >
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
        </motion.div>
      )}
    </div>
  );
};

export default CatalogButton;
