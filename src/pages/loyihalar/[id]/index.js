import Header from "@/components/header";
import Link from "next/link";
import RightIcon from "@/components/icons/right";
import Image from "next/image";
import { useState } from "react";
const Index = () => {
  const [tab, setTab] = useState("maktab");
  const [showAllProjects, setShowAllProjects] = useState(false);

  const selectProject = (tab) => {
    setTab(tab);
  };

  return (
    <div className="bg-[#F7F7F7] h-screen">
      <Header />

      <main className="container">
        <section className="mt-[16px] flex items-center space-x-[12px] font-gilroy">
          <Link href={"/"} className="text-[#262D33] text-sm font-semibold">
            Bosh sahifa
          </Link>
          <RightIcon color="#BCBFC2" />
          <Link
            className="text-[#262D33] text-sm font-semibold"
            href={"/loyihalar"}
          >
            Loyihalar
          </Link>
          <RightIcon color="#BCBFC2" />
          <Link className="text-[#0256BA] text-sm font-semibold" href={"#"}>
            Barcha loyihalar
          </Link>
        </section>

        <section>
          <h1 className="text-[32px] font-bold my-[16px]">Maktab</h1>
          <div className="grid grid-cols-12 gap-x-[30px]">
            <div className="col-span-3 font-gilroy bg-white p-[16px] border border-[#E0E2F0] rounded-[12px]">
              <div className="flex justify-between items-center">
                <h4 className="font-extrabold">Boshqa loyihalar</h4>
                <button onClick={() => setShowAllProjects(!showAllProjects)}>
                  <RightIcon
                    classname={`${
                      !showAllProjects ? "rotate-90" : "-rotate-90"
                    } transition-all duration-200`}
                    color="#BCBFC2"
                  />
                </button>
              </div>

              {showAllProjects && (
                <ul className="mt-[10px] space-y-[10px]">
                  <li>
                    <div className="bg-[#F4F4F4] p-[10px] flex items-center gap-x-[8px] rounded-[12px]">
                      <div className=" px-[1px] py-[6px] bg-white border border-[#E6E5ED] rounded-[10px] inline-block">
                        <Image
                          src={"/images/school.png"}
                          alt={"school"}
                          width={42}
                          height={42}
                        />
                      </div>

                      <p className="flex-1">Maktab</p>

                      <div className="bg-[#9AA8BC] inline-block rounded-full">
                        <RightIcon color="white" />
                      </div>
                    </div>
                  </li>

                  <li>
                    <div className="bg-[#F4F4F4] p-[10px] flex items-center gap-x-[8px] rounded-[12px]">
                      <div className=" px-[1px] py-[6px] bg-white border border-[#E6E5ED] rounded-[10px] inline-block">
                        <Image
                          src={"/images/medicine.png"}
                          alt={"medicine"}
                          width={42}
                          height={42}
                        />
                      </div>

                      <p className="flex-1">Poliklinika</p>

                      <div className="bg-[#9AA8BC] inline-block rounded-full">
                        <RightIcon color="white" />
                      </div>
                    </div>
                  </li>

                  <li>
                    <div className="bg-[#F4F4F4] p-[10px] flex items-center gap-x-[8px] rounded-[12px]">
                      <div className=" px-[1px] py-[6px] bg-white border border-[#E6E5ED] rounded-[10px] inline-block">
                        <Image
                          src={"/images/school.png"}
                          alt={"school"}
                          width={42}
                          height={42}
                        />
                      </div>

                      <p className="flex-1">Maktab</p>

                      <div className="bg-[#9AA8BC] inline-block rounded-full">
                        <RightIcon color="white" />
                      </div>
                    </div>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
