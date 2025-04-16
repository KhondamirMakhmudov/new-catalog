import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import MyMaterials from "@/pages/dashboard/deliver/main/materials";
import MainContent from "./main";

const MainSectionContent = ({ children }) => {
  const router = useRouter();
  const [selectDepartment, setSelectDepartment] = useState("all");
  const handleSelectDepartment = (nav) => {
    router.push(`/dashboard/deliver/main/${nav}`);
    setSelectDepartment(nav);
  };
  return (
    <MainContent>
      <div className="grid grid-cols-12 gap-x-[24px]">
        <div className="col-span-3 bg-white p-[24px] rounded-[16px] ">
          <Link
            href={"/dashboard/deliver/main/materials/add-ads"}
            className="flex items-center justify-center flex-col"
          >
            <button className="p-[18px] rounded-full bg-[#EBF1F9] mb-[24px]">
              <Image
                src={"/icons/add-circle.svg"}
                alt={"arrow-right"}
                width={28}
                height={28}
                className={""}
              />
            </button>

            <p className="font-semibold">Material va jihozlar</p>
          </Link>
        </div>
        <div className="col-span-3 bg-white p-[24px] rounded-[16px] ">
          <Link
            href={"/dashboard/deliver/main/mxik-code"}
            className="flex items-center justify-center flex-col"
          >
            <button className="p-[18px] rounded-full bg-[#EBF1F9] mb-[24px]">
              <Image
                src={"/icons/add-circle.svg"}
                alt={"arrow-right"}
                width={28}
                height={28}
                className={""}
              />
            </button>

            <p className="font-semibold">Yangi mxik kod olish</p>
          </Link>
        </div>
        {/* <div className="col-span-3 bg-white p-[24px] rounded-[16px] ">
          <Link
            href={"/dashboard/deliver/main/machine-mechanos/add-ads"}
            className="flex items-center justify-center flex-col"
          >
            <button className="p-[18px] rounded-full bg-[#EBF1F9] mb-[24px]">
              <Image
                src={"/icons/add-circle.svg"}
                alt={"arrow-right"}
                width={28}
                height={28}
                className={""}
              />
            </button>

            <p className="font-semibold text-center">Mashina va mexanizmlar</p>
          </Link>
        </div>

        <div className="col-span-3 bg-white p-[24px] rounded-[16px] ">
          <Link
            href={"/dashboard/deliver/main/technos/add-ads"}
            className="flex items-center justify-center flex-col"
          >
            <button className="p-[18px] rounded-full bg-[#EBF1F9] mb-[24px]">
              <Image
                src={"/icons/add-circle.svg"}
                alt={"arrow-right"}
                width={28}
                height={28}
                className={""}
              />
            </button>

            <p className="font-semibold text-center">Uskuna va qurilmalar</p>
          </Link>
        </div>

        <div className="col-span-3 bg-white p-[24px] rounded-[16px] ">
          <Link
            href={"/dashboard/deliver/main/works/add-ads"}
            className="flex items-center justify-center flex-col"
          >
            <button className="p-[18px] rounded-full bg-[#EBF1F9] mb-[24px]">
              <Image
                src={"/icons/add-circle.svg"}
                alt={"arrow-right"}
                width={28}
                height={28}
                className={""}
              />
            </button>

            <p className="font-semibold text-center">Qurilish ishlari</p>
          </Link>
        </div> */}

        <div className="col-span-12 mt-[23px]">{children}</div>
      </div>
    </MainContent>
  );
};

export default MainSectionContent;
