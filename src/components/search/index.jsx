import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import DownIcon from "../icons/down";
import useGetQuery from "@/hooks/api/useGetQuery";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import { get } from "lodash";
import ContentLoader from "../loader/content-loader";

const Search = () => {
  const [openSearch, setOpenSearch] = useState(false);
  const [openDepartment, setOpenDepartment] = useState(false);
  const [category, setCategory] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [selectedDepartment, setSelectedDepartment] =
    useState("Bo'limlar bo'yicha");

  const handleSelect = (department, categoryValue) => {
    setSelectedDepartment(department);
    setOpenDepartment(false);
    setCategory(categoryValue);
  };

  const {
    data: globalSearch,
    isLoading,
    isFetching,
  } = useGetQuery({
    key: KEYS.globalSearch,
    url: URLS.globalSearch,
    params: {
      name_value: nameValue,
      category: category,
    },
  });
  return (
    <>
      <div
        className={
          "w-full max-w-[700px] grid grid-cols-12 border border-[#E6E5ED] rounded-[8px]   items-center relative"
        }
      >
        <div className="col-span-8" onClick={() => setOpenSearch(!openSearch)}>
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
            onChange={(e) => {
              const value = e.target.value;
              setNameValue(value);
            }}
            className={
              "placeholder:text-[#B3B1C0] text-[#020E03] pl-[44px] w-full text-sm font-medium py-[9px] rounded-[8px] focus:border-0"
            }
          />
        </div>

        <div className="col-span-4 place-items-center">
          <div className="">
            <button
              onClick={() => setOpenDepartment(!openDepartment)}
              aria-expanded={openDepartment}
              aria-label="Toggle Department Dropdown"
              className="flex items-center gap-x-[10px]"
            >
              <div className="w-[1px] h-[16px] bg-[#E6E5ED] mr-[12px]"></div>
              <p className="text-sm text-[#939699] ">{selectedDepartment}</p>
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
                  <button
                    onClick={() =>
                      handleSelect("Material va jihozlar", "material")
                    }
                    className="bg-[#F7F7F7] hover:bg-[#F4F7FB] transition-all duration-200 text-black w-full p-[8px] text-start rounded-[4px]"
                  >
                    Material va jihozlar
                  </button>
                </li>
                <li>
                  <button
                    onClick={() =>
                      handleSelect("Mashina va mexanizmlar", "mmechno")
                    }
                    className="bg-[#F7F7F7] hover:bg-[#F4F7FB] transition-all duration-200 text-black w-full p-[8px] text-start rounded-[4px]"
                  >
                    Mashina va mexanizmlar
                  </button>
                </li>
                <li>
                  <button
                    onClick={() =>
                      handleSelect("Uskuna va qurilmalar", "techno")
                    }
                    className="bg-[#F7F7F7] hover:bg-[#F4F7FB] transition-all duration-200 text-black w-full p-[8px] text-start rounded-[4px]"
                  >
                    Uskuna va qurilmalar
                  </button>
                </li>
              </ul>
            </motion.div>
          )}
        </div>

        {nameValue.trim() !== "" && (
          <motion.div
            initial={{ opacity: 0, translateY: "30px" }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-[700px] max-h-[432px] px-[12px]  overflow-y-scroll absolute h-[200px] bg-white bottom-0 top-[50px] z-30 rounded-[8px] border border-[#E6E5ED]"
          >
            {isLoading || isFetching ? (
              <ContentLoader />
            ) : (
              <div>
                {category === "material" && (
                  <ul className="py-[16px]">
                    {get(globalSearch, "data.materials")?.map((item) => (
                      <li key={get(item, "id")}>
                        <p className="text-sm font-medium">
                          <Link
                            href={`/materials/${get(
                              item,
                              "material_csr_code"
                            )}`}
                          >
                            {get(item, "material_name")}
                          </Link>
                        </p>
                        <div className="w-full h-[1px] bg-[#E6E5ED] my-[16px]"></div>
                      </li>
                    ))}
                  </ul>
                )}

                {category === "mmechno" && (
                  <ul className="py-[16px]">
                    {get(globalSearch, "data.mmechano")?.map((item) => (
                      <li key={get(item, "id")}>
                        <p className="text-sm font-medium">
                          <Link
                            href={`/machine-mechano/${get(
                              item,
                              "mmechano_csr_code"
                            )}`}
                          >
                            {get(item, "mmechano_name")}
                          </Link>
                        </p>
                        <div className="w-full h-[1px] bg-[#E6E5ED] my-[16px]"></div>
                      </li>
                    ))}
                  </ul>
                )}

                {category === "techno" && (
                  <ul className="py-[16px]">
                    {get(globalSearch, "data.techno")?.map((item) => (
                      <li key={get(item, "id")}>
                        <p className="text-sm font-medium">
                          <Link
                            href={`/machine-mechano/${get(
                              item,
                              "techno_csr_code"
                            )}`}
                          >
                            {get(item, "techno_name")}
                          </Link>
                        </p>
                        <div className="w-full h-[1px] bg-[#E6E5ED] my-[16px]"></div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </>
  );
};

export default Search;
