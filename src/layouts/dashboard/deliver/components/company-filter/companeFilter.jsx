import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const CompanyFilterAds = ({ children }) => {
  const router = useRouter();
  const [selectDepartment, setSelectDepartment] = useState("all");
  const handleSelectDepartment = (nav) => {
    setSelectDepartment(nav);
  };
  return (
    <div className="font-gilroy">
      <ul className="flex items-center gap-x-[12px] mt-[20px]">
        <li
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
        </li>

        <li
          onClick={() => {
            handleSelectDepartment("materials");
          }}
        >
          <button
            className={`py-[10px] px-[20px] ${
              selectDepartment === "materials"
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
              selectDepartment === "machine-mechanos"
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
              selectDepartment === "technos"
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

export default CompanyFilterAds;
