import MainSectionContent from "@/layouts/dashboard/deliver/components/main-page/content";
import DeliverDashboard from "@/layouts/dashboard/deliver/dashboard";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const Index = () => {
  const router = useRouter();
  const [selectDepartment, setSelectDepartment] = useState("all");
  const handleSelectDepartment = (nav) => {
    router.push(`/dashboard/deliver/main/${nav}`);
    setSelectDepartment(nav);
  };
  return (
    <DeliverDashboard>
      <MainSectionContent>
        <ul className="flex items-center gap-x-[12px]">
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
                Material va jixozlar
              </button>
            </Link>
          </li>

          <li
            onClick={() => {
              handleSelectDepartment("mmechano");
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

        <div className="mt-[12px]">
          {selectDepartment === "all" && (
            <div>
              <h1>Bu yerga tez orada barcha e&apos;lonlar joylashtiriladi</h1>
            </div>
          )}
          {selectDepartment === "materials" && <div></div>}
          {selectDepartment === "mmechano" && (
            <div>
              <h1>Bu yerga tez orada barcha e&apos;lonlar joylashtiriladi</h1>
            </div>
          )}

          {selectDepartment === "technos" && (
            <div>
              <h1>Bu yerga tez orada barcha e&apos;lonlar joylashtiriladi</h1>
            </div>
          )}
          {selectDepartment === "works" && (
            <div>
              <h1>Bu yerga tez orada barcha e&apos;lonlar joylashtiriladi</h1>
            </div>
          )}
        </div>
      </MainSectionContent>
    </DeliverDashboard>
  );
};

export default Index;
