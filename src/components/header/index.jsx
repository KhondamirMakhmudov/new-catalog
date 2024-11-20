import Image from "next/image";
import Brand from "../brand";
import CatalogButton from "../buttons/catalog";
import Basket from "../buttons/basket";
import Selected from "../buttons/selected";
import WebAccess from "../buttons/web-accessibility";
import Login from "../buttons/login";
import Search from "../search";
import Lang from "../lang";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

const Header = () => {
  const [openDepartment, setOpenDepartment] = useState(false);
  return (
    <header>
      <div className={"text-white bg-[#0256BA] py-[13px]   font-gilroy"}>
        <div className="container ">
          {/* top of the header. will be component in next time */}
          <div className={"flex justify-between"}>
            <ul className={"flex gap-x-[32px]"}>
              <li>
                <button
                  onClick={() => setOpenDepartment(!openDepartment)}
                  className="flex items-center gap-x-[10px]"
                >
                  <p>Bo&apos;limlar</p>
                  <Image
                    src={"/icons/down.svg"}
                    alt={"down"}
                    width={18}
                    height={18}
                    className={`${
                      openDepartment ? "rotate-180" : "rotate-0"
                    } transition-all duration-200`}
                  />
                </button>

                {openDepartment && (
                  <motion.div
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
              </li>

              <li>
                <Link href={"#"}>Klassifikator haqida</Link>
              </li>

              <li>
                <Link href={"/loyihalar"}>Loyihalar</Link>
              </li>

              <li>
                <Link href={"#"}>Monitoring</Link>
              </li>

              <li>
                <Link href={"/integrations"}>Integratsiya</Link>
              </li>

              <li>
                <Link href={"#"}>Kontaktlar</Link>
              </li>
            </ul>
            <div className={"flex items-center"}>
              <div className={"flex gap-x-[10px]"}>
                <h4>Toshkent shahri</h4>
                <Image
                  src={"/icons/down.svg"}
                  alt={"down"}
                  width={18}
                  height={18}
                />
              </div>

              <div className={"bg-[#4885CD] w-[1px] h-[11px] mx-[13px]"}></div>

              <Lang />
            </div>
          </div>
        </div>
      </div>

      <div
        className={"bg-white py-[20px] font-gilroy rounded-b-[24px] shadow-xl"}
      >
        <div className={"container flex items-center justify-between"}>
          <Brand />

          <CatalogButton />

          <Search />

          <ul className={"flex gap-x-[12px]"}>
            <li>
              <WebAccess />
            </li>
            <li>
              <Selected />
            </li>
            <li>
              <Basket />
            </li>
          </ul>

          <Login />
        </div>
      </div>
    </header>
  );
};

export default Header;
