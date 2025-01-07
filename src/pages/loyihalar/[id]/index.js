import Header from "@/components/header";
import Link from "next/link";
import RightIcon from "@/components/icons/right";
import Image from "next/image";
import { useState } from "react";
import useGetQuery from "@/hooks/api/useGetQuery";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import { motion } from "framer-motion";
import KindergardenProject from "@/components/model-projects/kindergarden";
import SchoolProject from "@/components/model-projects/school";
import MedicineProject from "@/components/model-projects/medicine";
import { useRouter } from "next/router";
import Footer from "@/components/footer";

const Index = () => {
  const router = useRouter();
  const [tab, setTab] = useState("bogcha");
  const [showAllProjects, setShowAllProjects] = useState(!false);

  const {
    data: kinderGarden,
    isLoading: isLoadingKinderGarden,
    isFetching: isFetchingKindergarden,
  } = useGetQuery({
    key: KEYS.kindergarden,
    url: URLS.kindergarden,
  });

  const selectProject = (tab) => {
    router.push(`/loyihalar/${tab}`);
    setTab(tab);
  };

  return (
    <div className="bg-[#F7F7F7] min-h-screen">
      <Header />

      <main className="container mb-[46px]">
        <section className="mt-[16px] flex items-center space-x-[12px] font-gilroy">
          <button
            onClick={() => router.back()}
            className="text-[#262D33] text-sm font-semibold"
          >
            <div className="bg-[#9AA8BC] rounded-full p-[5px] rotate-180">
              <RightIcon color="white" />
            </div>
          </button>
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
          <h1 className="text-[32px] font-bold my-[16px]">Barcha loyihalar</h1>
          <div className="grid grid-cols-12 gap-x-[30px]">
            <motion.div
              initial={{ translateX: "-80px", opacity: 0 }}
              animate={{ translateX: "0px", opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="col-span-3 self-start font-gilroy bg-white p-[16px] border border-[#E0E2F0] rounded-[12px]"
            >
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
                <motion.ul
                  className="mt-[10px] space-y-[10px]"
                  initial={{ opacity: 0, translateY: "30px" }}
                  animate={{ opacity: 1, translateY: "0" }}
                  transition={{ duration: 0.3 }}
                >
                  <li onClick={() => selectProject("bogcha")}>
                    <div
                      className={`${
                        tab === "bogcha" ? "bg-[#E7EDF5]" : "bg-[#F7F7F7]"
                      } p-[10px] flex items-center gap-x-[8px] rounded-[12px] cursor-pointer`}
                    >
                      <div className=" px-[1px] py-[6px] bg-white border border-[#E6E5ED] rounded-[10px] inline-block">
                        <Image
                          src={"/images/kindergarten.png"}
                          alt={"kindergarten"}
                          width={42}
                          height={42}
                        />
                      </div>

                      <p className="flex-1">Bog&apos;cha</p>

                      <div className="bg-[#9AA8BC] inline-block rounded-full">
                        {tab === "bogcha" ? (
                          <Image
                            src={"/icons/checked.svg"}
                            alt="checked"
                            width={20}
                            height={20}
                          />
                        ) : (
                          <RightIcon color="white" />
                        )}
                      </div>
                    </div>
                  </li>

                  <li onClick={() => selectProject("poliklinika")}>
                    <div
                      className={`${
                        tab === "poliklinika" ? "bg-[#E7EDF5]" : "bg-[#F7F7F7]"
                      } p-[10px] flex items-center gap-x-[8px] rounded-[12px] cursor-pointer`}
                    >
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
                        {tab === "poliklinika" ? (
                          <Image
                            src={"/icons/checked.svg"}
                            alt="checked"
                            width={20}
                            height={20}
                          />
                        ) : (
                          <RightIcon color="white" />
                        )}
                      </div>
                    </div>
                  </li>

                  <li onClick={() => selectProject("maktab")}>
                    <div
                      className={`${
                        tab === "maktab" ? "bg-[#E7EDF5]" : "bg-[#F7F7F7]"
                      } p-[10px] flex items-center gap-x-[8px] rounded-[12px] cursor-pointer`}
                    >
                      <div
                        className={` px-[1px] py-[6px] bg-white border border-[#E6E5ED] rounded-[10px] inline-block`}
                      >
                        <Image
                          src={"/images/school.png"}
                          alt={"school"}
                          width={42}
                          height={42}
                        />
                      </div>

                      <p className="flex-1">Maktab</p>

                      <div className="bg-[#9AA8BC] inline-block rounded-full">
                        {tab === "maktab" ? (
                          <Image
                            src={"/icons/checked.svg"}
                            alt="checked"
                            width={20}
                            height={20}
                          />
                        ) : (
                          <RightIcon color="white" />
                        )}
                      </div>
                    </div>
                  </li>
                </motion.ul>
              )}
            </motion.div>

            <div className="col-span-9 font-gilroy">
              <div className="w-full border border-[#D7D9E7] rounded-[10px] mb-[50px]">
                {tab === "bogcha" && <KindergardenProject />}

                {tab === "maktab" && <SchoolProject />}

                {tab === "poliklinika" && <MedicineProject />}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
