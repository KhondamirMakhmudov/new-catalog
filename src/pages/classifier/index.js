import Header from "@/components/header";
import { useState } from "react";
import Link from "next/link";
import RightIcon from "@/components/icons/right";
import { URLS } from "@/constants/url";
import { KEYS } from "@/constants/key";
import useGetQuery from "@/hooks/api/useGetQuery";
import { NumericFormat } from "react-number-format";
import { get, debounce } from "lodash";
import clsx from "clsx";
import { motion } from "framer-motion";
import Image from "next/image";
import ContentLoader from "@/components/loader/content-loader";

const Index = () => {
  const [count, setCount] = useState(0);
  const [showAllProjects, setShowAllProjects] = useState(!false);
  const [search, setSearch] = useState("");
  const [volumeId, setVolumeId] = useState(null);
  const [partId, setPartId] = useState(null);
  const [chapterId, setChapterId] = useState(null);
  const [groupId, setGroupId] = useState(null);

  const { data: classifier, isLoading: isLoadingClassifier } = useGetQuery({
    key: KEYS.classifier,
    url: URLS.classifier,
    params: {
      key: "volumes",
    },
  });

  const { data: volumes, isLoading: isLoadingVolumes } = useGetQuery({
    key: KEYS.classifier,
    url: URLS.classifier,
    params: {
      key: "volumes",
    },
  });

  const {
    data: parts,
    isLoading: isLoadingParts,
    isFetching: isFetchingParts,
  } = useGetQuery({
    key: [KEYS.classifier, volumeId],
    url: URLS.classifier,
    params: {
      key: "parts",
      parent: volumeId,
    },
    enabled: !!volumeId,
  });
  const {
    data: chapters,
    isLoading: isLoadingChapters,
    isFetching: isFetchingChapters,
  } = useGetQuery({
    key: [KEYS.classifier, volumeId, partId],
    url: URLS.classifier,
    params: {
      key: "chapters",
      parent: partId,
    },
    enabled: !!partId,
  });
  const {
    data: groups,
    isLoading: isLoadingGroups,
    isFetching: isFetchingGroups,
  } = useGetQuery({
    key: [KEYS.classifier, volumeId, partId, chapterId],
    url: URLS.classifier,
    params: {
      key: "groups",
      parent: chapterId,
    },
    enabled: !!chapterId,
  });
  return (
    <div className="bg-[#F7F7F7]">
      <Header />
      <main className="container mb-[46px]">
        <section className="mt-[16px] flex items-center space-x-[12px] font-gilroy">
          <Link href={"/"} className="text-[#262D33] text-sm font-semibold">
            Bosh sahifa
          </Link>
          <RightIcon color="#BCBFC2" />
          <Link className="text-[#0256BA] text-sm font-semibold" href={"#"}>
            Klassifikator
          </Link>
        </section>

        <section>
          <h1 className="font-bold text-[32px] my-[16px] font-anybody">
            Qurilish resurslari Klassifikatori
          </h1>

          <div className="grid grid-cols-12 gap-x-[30px] font-gilroy">
            <div className={"col-span-12 "}>
              <div className={"mb-5"}>
                <div className={"mb-2.5"}>
                  <label className={""} htmlFor="#">
                    Qidiruv
                  </label>
                  <p className={"text-sm text-[#516164]"}>
                    *
                    <NumericFormat
                      value={count}
                      displayType={"text"}
                      thousandSeparator={" "}
                    />{" "}
                    natija topildi
                  </p>
                </div>
                <input
                  onChange={debounce(function (e) {
                    setSearch(e.target.value);
                  }, 500)}
                  placeholder={"Kerakli mahsulot nomini yozing"}
                  className={
                    "border border-transparent w-full px-5 py-2.5  bg-white placeholder:italic placeholder:text-[#516164] h-[46px] rounded-[5px] outline-none focus:border-[#28366D]"
                  }
                  type="text"
                />
                {search && search.length < 4 && (
                  <span className={"text-red-500 text-xs font-light"}>
                    Kamida 4 ta belgi kiriting
                  </span>
                )}
              </div>
            </div>
            <div className="col-span-3  max-h-[200vh]">
              <ul className={"bg-white shadow-category p-2"}>
                {get(volumes, "data.results", []).map((volume, i) => (
                  <li
                    onClick={(e) => {
                      e.stopPropagation();
                      setGroupId(null);
                      setChapterId(null);
                      setPartId(null);
                      setVolumeId(get(volume, "id"));
                    }}
                    className={clsx(
                      " transition cursor-pointer text-xs text-[#475467] hover:bg-[#EDF4FC]",
                      {
                        "text-[#1B41C6] font-medium hover:bg-transparent":
                          get(volume, "id") == volumeId,
                        "!mb-0":
                          get(volumes, "data.results", [])?.length == i + 1,
                      }
                    )}
                    key={get(volume, "id")}
                  >
                    <div className={"flex items-start"}>
                      <motion.div
                        className={"mr-2 flex-none"}
                        animate={{
                          rotate: get(volume, "id") == volumeId ? 90 : 0,
                        }}
                      >
                        <Image
                          src={"/icons/arrow_right.svg"}
                          alt="arrow_right"
                          width={16}
                          height={16}
                        />
                      </motion.div>
                      <span>{get(volume, "volume_name")}</span>
                    </div>
                    {get(volume, "id") == volumeId &&
                      (isLoadingParts || isFetchingParts ? (
                        <ContentLoader
                          classNames={"!bg-transparent min-h-[25vh]"}
                        />
                      ) : (
                        <ul className={"pl-3 py-1.5"}>
                          {get(parts, "data.results", []).map((part, j) => (
                            <li
                              onClick={(e) => {
                                e.stopPropagation();
                                setGroupId(null);
                                setChapterId(null);
                                setPartId(get(part, "id"));
                              }}
                              className={clsx(
                                " transition cursor-pointer mb-2  hover:text-[#1B41C6] text-xs text-[#28366D] font-normal",
                                {
                                  "!text-[#017EFA] !font-medium":
                                    get(part, "id") == partId,
                                  "!mb-0":
                                    get(parts, "data.results", [])?.length ==
                                    j + 1,
                                }
                              )}
                              key={get(part, "id")}
                            >
                              <div className={"flex items-start"}>
                                <motion.div
                                  className={"mr-2 flex-none "}
                                  animate={{
                                    rotate: get(part, "id") == partId ? 90 : 0,
                                  }}
                                >
                                  <Image
                                    src={"/icons/arrow_right.svg"}
                                    alt="arrow_right"
                                    width={16}
                                    height={16}
                                  />
                                </motion.div>
                                <span>{get(part, "part_name")}</span>
                              </div>
                              {get(part, "id") == partId &&
                                (isLoadingChapters || isFetchingChapters ? (
                                  <ContentLoader
                                    classNames={"!bg-transparent min-h-[25vh]"}
                                  />
                                ) : (
                                  <ul className={"pl-5 py-1.5"}>
                                    {get(chapters, "data.results", []).map(
                                      (chapter, k) => (
                                        <li
                                          className={clsx(
                                            " transition cursor-pointer mb-1.5  hover:text-[#1B41C6] text-sm text-[#28366D] font-normal",
                                            {
                                              "!text-[#017EFA] !font-medium":
                                                get(chapter, "id") == chapterId,
                                              "!mb-0":
                                                get(
                                                  chapters,
                                                  "data.results",
                                                  []
                                                )?.length ==
                                                k + 1,
                                            }
                                          )}
                                          key={get(chapter, "id")}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setGroupId(null);
                                            setChapterId(get(chapter, "id"));
                                          }}
                                        >
                                          <div className={"flex items-start"}>
                                            <motion.div
                                              className={"mr-2 flex-none "}
                                              animate={{
                                                rotate:
                                                  get(chapter, "id") ==
                                                  chapterId
                                                    ? 90
                                                    : 0,
                                              }}
                                            >
                                              <Image
                                                src={"/icons/arrow_right.svg"}
                                                alt="arrow_right"
                                                width={16}
                                                height={16}
                                              />
                                            </motion.div>
                                            <span>
                                              {get(chapter, "chapter_name")}
                                            </span>
                                          </div>
                                          {get(chapter, "id") == chapterId &&
                                            (isLoadingGroups ||
                                            isFetchingGroups ? (
                                              <ContentLoader
                                                classNames={
                                                  "!bg-transparent min-h-[25vh]"
                                                }
                                              />
                                            ) : (
                                              <ul className={"pl-9 py-1.5"}>
                                                {get(
                                                  groups,
                                                  "data.results",
                                                  []
                                                ).map((group, l) => (
                                                  <li
                                                    key={get(group, "id")}
                                                    className={clsx(
                                                      " transition cursor-pointer mb-1.5  hover:text-[#1B41C6] text-sm text-[#28366D] font-normal",
                                                      {
                                                        "!text-[#017EFA] !font-medium":
                                                          get(group, "id") ===
                                                          groupId,
                                                        "!mb-0":
                                                          get(
                                                            groups,
                                                            "data.results",
                                                            []
                                                          )?.length ===
                                                          l + 1,
                                                      }
                                                    )}
                                                    onClick={(e) => {
                                                      e.stopPropagation();
                                                      setGroupId(
                                                        get(group, "id")
                                                      );
                                                    }}
                                                  >
                                                    {get(group, "group_name")}
                                                  </li>
                                                ))}
                                              </ul>
                                            ))}
                                        </li>
                                      )
                                    )}
                                  </ul>
                                ))}
                            </li>
                          ))}
                        </ul>
                      ))}
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-9 tablet:mt-0 mt-[30px]">
              <div className="grid grid-cols-12 tablet:gap-x-8 gap-x-4 ">
                {/* <div className="col-span-12">
                  {volumeId ? (
                    <GridView
                      getCount={setCount}
                      url={URLS.classifierResources}
                      key={[KEYS.classifierResources, volumeId]}
                      params={
                        search && search?.length > 3
                          ? {
                              key: "name",
                              value: search,
                            }
                          : {
                              key: groupId
                                ? "group"
                                : chapterId
                                ? "chapter"
                                : partId
                                ? "part"
                                : "volume",
                              value: groupId
                                ? groupId
                                : chapterId
                                ? chapterId
                                : partId
                                ? partId
                                : volumeId,
                            }
                      }
                      columns={columns}
                    />
                  ) : (
                    <GridView
                      getCount={setCount}
                      url={URLS.classifier}
                      key={KEYS.classifier}
                      params={
                        search && search?.length > 3
                          ? {
                              key: "name",
                              parent: search,
                            }
                          : { key: "resources" }
                      }
                      columns={columns}
                    />
                  )}
                </div> */}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
