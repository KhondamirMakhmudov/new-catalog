import { DarkModeIcon } from "@/components/icons/social-media/web-access/dark-mode";
import { SimpleVersionIcon } from "@/components/icons/social-media/web-access/simple-version";
import { VolumeIcon } from "@/components/icons/social-media/web-access/volume";
import Image from "next/image";
import { useState } from "react";

const WebAccess = () => {
  const [open, setOpen] = useState(false);
  const [fontSize, setFontSize] = useState(16); // Default font size

  const [tab, setTab] = useState("simple-version");
  const toggleButton = () => {
    setOpen(!open);
  };

  const handleFontSizeChange = (e) => {
    setFontSize(e.target.value);
  };
  const handleSelect = (tab) => {
    setTab(tab);
  };
  return (
    <div className="">
      <button
        onClick={toggleButton}
        className={
          "p-[9px] bg-[#EBF2FA] rounded-[8px] active:scale-110 scale-100 transition-all duration-200"
        }
      >
        <Image src={"/icons/eye.svg"} alt={"eye"} width={20} height={20} />
      </button>

      {open && (
        <div className="absolute w-[232px] min-h-[266px] bg-white z-30 rounded-[8px] p-[16px] font-gilroy">
          <h3 className="text-[#21201F] text-sm font-semibold">
            Ko&apos;rinish
          </h3>

          <ul className="text-xs space-y-[8px] mt-[8px]">
            <li>
              <button
                onClick={() => handleSelect("simple-version")}
                className={`${
                  tab === "simple-version"
                    ? "bg-[#EAF0F8] text-[#0251AF]"
                    : "bg-[#F7F7F7] text-[#21201F]"
                } p-[8px] w-full flex items-center gap-x-[8px] rounded-[4px] scale-100 active:scale-110 transition-all duration-300`}
              >
                <SimpleVersionIcon
                  color={`${tab === "simple-version" ? "#0256BA" : "#9AA8BC"}`}
                />
                <p>Oddiy versiya</p>
              </button>
            </li>

            <li>
              <button
                onClick={() => handleSelect("dark-mode")}
                className={`${
                  tab === "dark-mode"
                    ? "bg-[#EAF0F8] text-[#0251AF]"
                    : "bg-[#F7F7F7] text-[#21201F]"
                } p-[8px] w-full flex items-center gap-x-[8px] rounded-[4px] scale-100 active:scale-110 transition-all duration-300`}
              >
                <DarkModeIcon
                  color={`${tab === "dark-mode" ? "#0256BA" : "#9AA8BC"}`}
                />
                <p>Qora va oq versiya</p>
              </button>
            </li>

            <li>
              <button
                onClick={() => handleSelect("volume")}
                className={`${
                  tab === "volume"
                    ? "bg-[#EAF0F8] text-[#0251AF]"
                    : "bg-[#F7F7F7] text-[#21201F]"
                } p-[8px] w-full flex items-center gap-x-[8px] rounded-[4px] scale-100 active:scale-110 transition-all duration-300`}
              >
                <VolumeIcon color={tab === "volume" ? "#0256BA" : "#9AA8BC"} />
                <p>Ovozni yoqish</p>
              </button>
            </li>
          </ul>

          <div className="mt-[20px]">
            <h2 className="text-lg font-bold">Shrift hajmi</h2>
            <div className="h-[1px] w-full bg-[#E6E5ED] rounded-[12px] my-[8px]"></div>
            <div className="text-xs">
              <p>{fontSize}% ga kattalashtiring</p>
              <input
                type="range"
                min="10"
                max="100"
                value={fontSize}
                onChange={handleFontSizeChange}
                className="w-full mt-2 border-none"
              />
            </div>
            <p style={{ fontSize: `${fontSize}px` }} className="mt-4">
              1
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WebAccess;
