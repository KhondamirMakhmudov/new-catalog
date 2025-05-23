"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import RightIcon from "../icons/right";
import { useRouter } from "next/router";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const router = useRouter();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="lg:hidden">
      {/* Menu button */}
      <button
        className="bg-[#0256BA] p-[9px] rounded-md focus:outline-none"
        onClick={toggleMenu}
      >
        {!isOpen ? (
          <Image
            src="/icons/burger-menu.svg"
            alt="menu"
            width={20}
            height={20}
          />
        ) : (
          <Image
            src="/icons/close-menu.svg"
            alt="menu"
            width={20}
            height={20}
          />
        )}
      </button>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-[80px] left-0  w-full h-full  border-t border-t-[#E4E9F6] bg-white z-50  shadow-lg"
        >
          <nav className="mt-[19px] mx-[15px]">
            <ul
              style={{ fontFamily: "Anybody, sans-serif" }}
              className=" text-lg font-medium space-y-[6px]"
            >
              <li>
                <Link
                  href="/"
                  className={` px-[12px] py-[8px] flex font-medium items-center ${
                    router.pathname === "/"
                      ? "bg-[#EBF1F9] text-[#0256BA]"
                      : "bg-transparent text-black"
                  } justify-between  rounded-[8px]`}
                  onClick={toggleMenu}
                >
                  <p>Bosh sahifa</p>
                  <div
                    className={`${
                      router.pathname === "/"
                        ? " bg-[#0256BA]"
                        : "bg-[#9AA8BCFF]"
                    } inline-block rounded-full`}
                  >
                    <RightIcon color="white" />
                  </div>
                </Link>
              </li>
              <li>
                <button
                  onClick={() => setIsCatalogOpen(!isCatalogOpen)}
                  className=" px-[12px] py-[8px] flex items-center justify-between w-full rounded-[8px]"
                >
                  <p>Katalog</p>
                  <div
                    className={`bg-[#9AA8BC] inline-block rounded-full transition-transform ${
                      isCatalogOpen ? "-rotate-90" : "rotate-90"
                    }`}
                  >
                    <RightIcon color="white" />
                  </div>
                </button>
                {isCatalogOpen && (
                  <ul className="ml-4 mt-2 space-y-2">
                    <li>
                      <Link
                        href="/materials"
                        className={` px-[12px] py-[8px] flex font-medium items-center ${
                          router.pathname === "/materials"
                            ? "bg-[#EBF1F9] text-[#0256BA]"
                            : "bg-gray-200 text-black"
                        } justify-between  rounded-[8px]`}
                        onClick={toggleMenu}
                      >
                        Material va jihozlar
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/machine-mechano"
                        className={` px-[12px] py-[8px] flex font-medium items-center ${
                          router.pathname === "/machine-mechano"
                            ? "bg-[#EBF1F9] text-[#0256BA]"
                            : "bg-gray-200 text-black"
                        } justify-between  rounded-[8px]`}
                        onClick={toggleMenu}
                      >
                        Mashina va mexanizmlar
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/technos"
                        className={` px-[12px] py-[8px] flex font-medium items-center ${
                          router.pathname === "/technos"
                            ? "bg-[#EBF1F9] text-[#0256BA]"
                            : "bg-gray-200 text-black"
                        } justify-between  rounded-[8px]`}
                        onClick={toggleMenu}
                      >
                        Uskuna va qurilmalar
                      </Link>
                    </li>

                    <li>
                      <Link
                        href="/works"
                        className={` px-[12px] py-[8px] flex font-medium items-center ${
                          router.pathname === "/works"
                            ? "bg-[#EBF1F9] text-[#0256BA]"
                            : "bg-gray-200 text-black"
                        } justify-between  rounded-[8px]`}
                        onClick={toggleMenu}
                      >
                        Qurilish ishlari
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <Link
                  href="/classifier"
                  className={` px-[12px] py-[8px] flex font-medium items-center ${
                    router.pathname === "/classifier"
                      ? "bg-[#EBF1F9] text-[#0256BA]"
                      : "bg-transparent text-black"
                  } justify-between  rounded-[8px]`}
                  onClick={toggleMenu}
                >
                  <p>Klassifikator</p>
                  <div
                    className={`${
                      router.pathname === "/classifier"
                        ? " bg-[#0256BA]"
                        : "bg-[#9AA8BCFF]"
                    } inline-block rounded-full`}
                  >
                    <RightIcon color="white" />
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  href="/loyihalar"
                  className={` px-[12px] py-[8px] flex font-medium items-center ${
                    router.pathname === "/loyihalar"
                      ? "bg-[#EBF1F9] text-[#0256BA]"
                      : "bg-transparent text-black"
                  } justify-between  rounded-[8px]`}
                  onClick={toggleMenu}
                >
                  <p>Loyihalar</p>
                  <div
                    className={`${
                      router.pathname === "/loyihalar"
                        ? " bg-[#0256BA]"
                        : "bg-[#9AA8BCFF]"
                    } inline-block rounded-full`}
                  >
                    <RightIcon color="white" />
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  href="/monitoring"
                  className={` px-[12px] py-[8px] flex font-medium items-center ${
                    router.pathname === "/monitoring"
                      ? "bg-[#EBF1F9] text-[#0256BA]"
                      : "bg-transparent text-black"
                  } justify-between  rounded-[8px]`}
                  onClick={toggleMenu}
                >
                  <p>Monitoring</p>
                  <div className="bg-[#9AA8BC] inline-block rounded-full">
                    <RightIcon color="white" />
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  href="/integrations"
                  className={` px-[12px] py-[8px] flex font-medium items-center ${
                    router.pathname === "/integrations"
                      ? "bg-[#EBF1F9] text-[#0256BA]"
                      : "bg-transparent text-black"
                  } justify-between  rounded-[8px]`}
                  onClick={toggleMenu}
                >
                  <p>Integratsiya</p>
                  <div
                    className={`${
                      router.pathname === "/integrations"
                        ? " bg-[#0256BA]"
                        : "bg-[#9AA8BCFF]"
                    } inline-block rounded-full`}
                  >
                    <RightIcon color="white" />
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  href="/contacts"
                  className={` px-[12px] py-[8px] flex font-medium items-center ${
                    router.pathname === "/contacts"
                      ? "bg-[#EBF1F9] text-[#0256BA]"
                      : "bg-transparent text-black"
                  } justify-between  rounded-[8px]`}
                  onClick={toggleMenu}
                >
                  <p>Kontaktlar</p>
                  <div
                    className={`${
                      router.pathname === "/contacts"
                        ? " bg-[#0256BA]"
                        : "bg-[#9AA8BCFF]"
                    } inline-block rounded-full`}
                  >
                    <RightIcon color="white" />
                  </div>
                </Link>
              </li>
            </ul>
          </nav>
        </motion.div>
      )}
    </div>
  );
};

export default MobileMenu;
