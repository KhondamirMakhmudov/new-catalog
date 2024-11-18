import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const MyAdsAll = ({ children }) => {
  const router = useRouter();
  const [selectDepartment, setSelectDepartment] = useState("all");
  const handleSelectDepartment = (nav) => {
    router.push(`/dashboard/deliver/main/${nav}`);
    setSelectDepartment(nav);
  };
  return (
    <div>
      <ul className="flex items-center gap-x-[12px] mt-[20px]">
        <li
          onClick={() => {
            handleSelectDepartment("all");
          }}
        >
          <button
            className={`py-[10px] px-[20px] ${
              router.pathname === "/dashboard/deliver/my-ads/all"
                ? "bg-[#0256BA] text-white border-none"
                : "bg-white text-[#718096] border border-[#E6E6E6]"
            }  rounded-[8px] text-sm `}
          >
            Barcha e&apos;lonlar
          </button>
        </li>

        <li
          onClick={() => {
            handleSelectDepartment("materials");
          }}
        >
          <button
            className={`py-[10px] px-[20px] ${
              router.pathname === "/dashboard/deliver/my-ads/materials"
                ? "bg-[#0256BA] text-white border-none"
                : "bg-white text-[#718096] border border-[#E6E6E6]"
            }  rounded-[8px] text-sm `}
          >
            Material va jihozlar
          </button>
        </li>

        <li
          onClick={() => {
            handleSelectDepartment("machine-mechanos");
          }}
        >
          <button
            className={`py-[10px] px-[20px] ${
              router.pathname === "/dashboard/deliver/my-ads/machine-mechanos"
                ? "bg-[#0256BA] text-white border-none"
                : "bg-white text-[#718096] border border-[#E6E6E6]"
            }  rounded-[8px] text-sm `}
          >
            Mashina va mexanizmlar
          </button>
        </li>

        <li
          onClick={() => {
            handleSelectDepartment("technos");
          }}
        >
          <button
            className={`py-[10px] px-[20px] ${
              router.pathname === "/dashboard/deliver/my-ads/technos"
                ? "bg-[#0256BA] text-white border-none"
                : "bg-white text-[#718096] border border-[#E6E6E6]"
            }  rounded-[8px] text-sm `}
          >
            Uskuna va qurilmalar
          </button>
        </li>

        <li
          onClick={() => {
            handleSelectDepartment("works");
          }}
        >
          <Link href={"#"}>
            <button
              className={`py-[10px] px-[20px] ${
                router.pathname === "/dashboard/deliver/my-ads/works"
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

export default MyAdsAll;
