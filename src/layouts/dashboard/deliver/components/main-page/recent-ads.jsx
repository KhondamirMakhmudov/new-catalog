import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const RecentAds = ({ children }) => {
  const router = useRouter();
  const [selectDepartment, setSelectDepartment] = useState("all");
  const handleSelectDepartment = (nav) => {
    router.push(`/dashboard/deliver/main/${nav}`);
    setSelectDepartment(nav);
  };
  return (
    <div>
      <ul className="flex items-center gap-x-[12px] mt-[20px]">
        <li>
          <Link
            href={"#"}
            onClick={() => {
              handleSelectDepartment("all");
            }}
          >
            <button
              className={`py-[10px] px-[20px] ${
                selectDepartment === "all"
                  ? "bg-[#0256BA] text-white border-none"
                  : "bg-white text-[#718096] border border-[#E6E6E6]"
              }  rounded-[8px] text-sm `}
            >
              Barcha e&apos;lonlar
            </button>
          </Link>
        </li>

        <li
          onClick={() => {
            handleSelectDepartment("materials");
          }}
        >
          <Link href={"#"}>
            <button
              className={`py-[10px] px-[20px] ${
                selectDepartment === "materials"
                  ? "bg-[#0256BA] text-white border-none"
                  : "bg-white text-[#718096] border border-[#E6E6E6]"
              }  rounded-[8px] text-sm `}
            >
              Material va jihozlar
            </button>
          </Link>
        </li>

        <li
          onClick={() => {
            handleSelectDepartment("machine-mechanos");
          }}
        >
          <Link href={"#"}>
            <button
              className={`py-[10px] px-[20px] ${
                selectDepartment === "mmechano"
                  ? "bg-[#0256BA] text-white border-none"
                  : "bg-white text-[#718096] border border-[#E6E6E6]"
              }  rounded-[8px] text-sm `}
            >
              Mashina va mexanizmlar
            </button>
          </Link>
        </li>

        <li
          onClick={() => {
            handleSelectDepartment("technos");
          }}
        >
          <Link href={"#"}>
            <button
              className={`py-[10px] px-[20px] ${
                selectDepartment === "technos"
                  ? "bg-[#0256BA] text-white border-none"
                  : "bg-white text-[#718096] border border-[#E6E6E6]"
              }  rounded-[8px] text-sm `}
            >
              Uskuna va qurilmalar
            </button>
          </Link>
        </li>

        <li
          onClick={() => {
            handleSelectDepartment("works");
          }}
        >
          <Link href={"#"}>
            <button
              className={`py-[10px] px-[20px] ${
                selectDepartment === "works"
                  ? "bg-[#0256BA] text-white border-none"
                  : "bg-white text-[#718096] border border-[#E6E6E6]"
              }  rounded-[8px] text-sm `}
            >
              Qurilish ishlari
            </button>
          </Link>
        </li>
      </ul>

      <div>{children}</div>
    </div>
  );
};

export default RecentAds;
