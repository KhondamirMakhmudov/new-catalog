import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import DownIcon from "../icons/down";
import useGetQuery from "@/hooks/api/useGetQuery";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import { get } from "lodash";
import ContentLoader from "../loader/content-loader";
import SimpleLoader from "../loader/simple-loader";

const placeholderTexts = [
  "Бетоны и смеси",
  "Изделия из бетона, цемента и гипса",
  "Конструкции и детали инженерных сооружений",
  "Сухие строительные смеси и вяжущие",
  "Металлопрокат и изделия металлические",
];

const Search = () => {
  const [openSearch, setOpenSearch] = useState(false);
  const [openDepartment, setOpenDepartment] = useState(false);
  const [limit, setLimit] = useState(50);
  const [category, setCategory] = useState("material");
  const [nameValue, setNameValue] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState(
    "Material va jihozlar"
  );
  // placeholder
  const [placeholder, setPlaceholder] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [typingIndex, setTypingIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  const handleSelect = (department, categoryValue) => {
    setSelectedDepartment(department);
    setOpenDepartment(false);
    setCategory(categoryValue);
  };

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        if (!deleting) {
          setPlaceholder(
            (prev) => prev + placeholderTexts[currentIndex][typingIndex]
          );
          setTypingIndex((prev) => prev + 1);
          if (typingIndex === placeholderTexts[currentIndex].length - 1) {
            setDeleting(true);
          }
        } else {
          setPlaceholder((prev) => prev.slice(0, -1));
          if (placeholder === "") {
            setDeleting(false);
            setTypingIndex(0);
            setCurrentIndex((prev) => (prev + 1) % placeholderTexts.length);
          }
        }
      },
      deleting ? 50 : 70
    );

    return () => clearTimeout(timeout);
  }, [placeholder, typingIndex, deleting, currentIndex]);

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
      limit: limit,
    },
  });
  return (
    <>
      <div
        className={
          "w-full max-w-[700px] flex items-center border border-[#E6E5ED] rounded-[8px] relative"
        }
      >
        <div className="absolute place-items-center ml-[10px]">
          <div className="">
            <button
              onClick={() => setOpenDepartment(!openDepartment)}
              aria-expanded={openDepartment}
              aria-label="Toggle Department Dropdown"
              className="flex items-center gap-x-[10px]"
            >
              <p className="text-sm text-[#939699] ">{selectedDepartment}</p>
              <DownIcon
                color="#939699"
                classNames={`${
                  openDepartment ? "rotate-180" : "rotate-0"
                } transition-all duration-200`}
              />
              <div className="w-[1px] h-[16px] bg-[#E6E5ED] mr-[12px]"></div>
            </button>
          </div>
          {openDepartment && (
            <motion.div
              className={"absolute left-0 top-[40px] z-50"}
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
        <div
          className="col-span-9 flex-1 "
          onClick={() => setOpenSearch(!openSearch)}
        >
          <div className="">
            <button>
              <Image
                src={"/icons/search.svg"}
                alt={"search"}
                width={20}
                height={20}
                className={" absolute top-[10px] bottom-0 ml-[175px]"}
              />
            </button>
            <input
              type={"search"}
              placeholder={placeholder}
              onChange={(e) => {
                const value = e.target.value;
                setNameValue(value);
              }}
              className={
                "placeholder:text-[#B3B1C0] text-[#020E03] pl-[200px] w-full text-sm font-medium py-[9px] rounded-[8px] focus:border-0"
              }
            />
          </div>
        </div>

        {nameValue.trim() !== "" && (
          <motion.div
            initial={{ opacity: 0, translateY: "30px" }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-[700px] max-h-[432px] px-[12px]  overflow-y-scroll absolute h-[200px] bg-white bottom-0 top-[50px] z-30 rounded-[8px] border border-[#E6E5ED]"
          >
            {isLoading || isFetching ? (
              <SimpleLoader />
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
                    <li>
                      <button
                        onClick={() => setLimit((prev) => prev + 50)}
                        className="text-white bg-[#0256BA] hover:bg-[#1C73DA] w-full py-[8px] rounded-[12px] transition-all duration-200"
                      >
                        Ko&apos;proq
                      </button>
                    </li>
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
                    <li>
                      <button
                        onClick={() => setLimit((prev) => prev + 50)}
                        className="text-white bg-[#0256BA] hover:bg-[#1C73DA] w-full py-[8px] rounded-[12px] transition-all duration-200"
                      >
                        Ko&apos;proq
                      </button>
                    </li>
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
                    <li>
                      <button
                        onClick={() => setLimit((prev) => prev + 50)}
                        className="text-white bg-[#0256BA] hover:bg-[#1C73DA] w-full py-[8px] rounded-[12px] transition-all duration-200"
                      >
                        Ko&apos;proq
                      </button>
                    </li>
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
