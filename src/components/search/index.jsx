import Image from "next/image";

const Search = () => {
  return (
    <div
      className={
        "w-full max-w-[729px] border border-[#E6E5ED] rounded-[8px]  flex items-center"
      }
    >
      <button>
        <Image
          src={"/icons/search.svg"}
          alt={"search"}
          width={20}
          height={20}
          className={"ml-[16px]"}
        />
      </button>
      <input
        type={"text"}
        placeholder={"Qidirmoq..."}
        className={
          "placeholder:text-[#B3B1C0] text-[#020E03] text-sm font-medium py-[9px] pl-[8px] w-full rounded-[8px]"
        }
      />
    </div>
  );
};

export default Search;
