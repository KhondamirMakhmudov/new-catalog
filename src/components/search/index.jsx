import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import DownIcon from "../icons/down";

const Search = () => {
  const [openSearch, setOpenSearch] = useState(false);
  const [openDepartment, setOpenDepartment] = useState(false);
  return (
    <>
      <div
        className={
          "w-full max-w-[700px] grid grid-cols-12 border border-[#E6E5ED] rounded-[8px]   items-center relative"
        }
      >
        <div className="col-span-9" onClick={() => setOpenSearch(!openSearch)}>
          <button>
            <Image
              src={"/icons/search.svg"}
              alt={"search"}
              width={20}
              height={20}
              className={"ml-[16px] absolute top-[10px] bottom-0"}
            />
          </button>
          <input
            type={"text"}
            placeholder={"Qidirmoq..."}
            className={
              "placeholder:text-[#B3B1C0] text-[#020E03] pl-[44px] w-full text-sm font-medium py-[9px] rounded-[8px] focus:border-0"
            }
          />
          <div></div>
        </div>

        <div className="col-span-3 place-items-center">
          <div className="">
            <button
              onClick={() => setOpenDepartment(!openDepartment)}
              className="flex items-center gap-x-[10px]"
            >
              <div className="w-[1px] h-[16px] bg-[#E6E5ED] mr-[12px]"></div>
              <p className="text-sm text-[#939699] ">
                Bo&apos;limlar bo&apos;yicha
              </p>
              <DownIcon
                color="#939699"
                classNames={`${
                  openDepartment ? "rotate-180" : "rotate-0"
                } transition-all duration-200`}
              />
            </button>
          </div>
          {openDepartment && (
            <motion.div
              className={"absolute right-0 top-[40px] z-50"}
              initial={{ opacity: 0, translateY: "30px" }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ul className=" space-y-[4px] p-[12px] rounded-[8px] border border-[#E6E5ED] bg-white text-xs">
                <li>
                  <button className="bg-[#F7F7F7] hover:bg-[#F4F7FB] transition-all duration-200 text-black w-full p-[8px] text-start rounded-[4px]">
                    Material va jihozlar
                  </button>
                </li>
                <li>
                  <button className="bg-[#F7F7F7] hover:bg-[#F4F7FB] transition-all duration-200 text-black w-full p-[8px] text-start rounded-[4px]">
                    Mashina va mexanizmlar
                  </button>
                </li>
                <li>
                  <button className="bg-[#F7F7F7] hover:bg-[#F4F7FB] transition-all duration-200 text-black w-full p-[8px] text-start rounded-[4px]">
                    Uskuna va qurilmalar
                  </button>
                </li>
                <li>
                  <button className="bg-[#F7F7F7] hover:bg-[#F4F7FB] transition-all duration-200 text-black w-full p-[8px] text-start rounded-[4px]">
                    Qurilish ishlari
                  </button>
                </li>
              </ul>
            </motion.div>
          )}
        </div>

        {openSearch && (
          <motion.div
            initial={{ opacity: 0, translateY: "30px" }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-[700px] absolute h-[200px] bg-white bottom-0 top-[50px] z-30 rounded-[8px] border border-[#E6E5ED]"
          ></motion.div>
        )}
      </div>
    </>
  );
};

export default Search;
