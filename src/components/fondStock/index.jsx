import React, { useState } from "react";
import Marquee from "react-fast-marquee";
import Image from "next/image";
import useGetQuery from "@/hooks/api/useGetQuery";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import { get, head } from "lodash";

import { NumericFormat } from "react-number-format";
import ContentLoader from "../loader/content-loader";
import SimpleLoader from "../loader/simple-loader";

const FondStock = () => {
  const {
    data: birja,
    isLoading,
    isFetching,
  } = useGetQuery({
    key: KEYS.apiBirja,
    url: URLS.apiBirja,
  });

  return (
    <>
      {isLoading || isFetching ? (
        <SimpleLoader />
      ) : (
        <div className={` bg-[#2C2727] transition-all duration-500`}>
          <div>
            <Marquee autoFill={true} pauseOnClick={true} direction={"right"}>
              {get(birja, "data", []).map((item, index) => (
                <div
                  key={index}
                  className={
                    "p-[15px] bg-[#131313] flex  mx-[4px] my-[4px] rounded-[6px] font-gilroy"
                  }
                >
                  <div className="flex flex-col max-w-[140px]">
                    <h4
                      className={
                        "line-clamp-1 text-sm text-white mb-[10px] flex-1"
                      }
                    >
                      {get(item, "name")}
                    </h4>

                    <div className={"flex items-center gap-x-[4px] "}>
                      <NumericFormat
                        thousandSeparator={" "}
                        displayType="text"
                        value={Number(get(item, "price")).toFixed(1)}
                        className="bg-transparent text-sm font-semibold flex-grow text-[#9D9D9D]"
                      />
                      {Number(get(item, "changeSum")) > 0 ? (
                        <Image
                          src={"/images/increase.png"}
                          alt={"increase"}
                          width={20}
                          height={20}
                        />
                      ) : Number(get(item, "changeSum")) < 0 ? (
                        <Image
                          src={"/images/decrease.png"}
                          alt={"decrease"}
                          width={20}
                          height={20}
                        />
                      ) : (
                        ""
                      )}

                      <span
                        className={`${
                          Number(get(item, "changeSum")) > 0
                            ? "text-green-500"
                            : Number(get(item, "changeSum")) < 0
                            ? "text-red-500"
                            : "text-white"
                        }  row-span-1  text-sm `}
                      >
                        {Number(get(item, "changeSum")).toFixed(2)}(
                        {get(item, "changePresent")})
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </Marquee>
          </div>
        </div>
      )}
    </>
  );
};

export default FondStock;
