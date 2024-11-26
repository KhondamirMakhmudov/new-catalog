import ReactPaginate from "react-paginate";
import Image from "next/image";

const ProjectPagination = ({ pageCount, onPageChange }) => {
  return (
    <div className={"text-lg"}>
      <ReactPaginate
        onPageChange={onPageChange}
        pageCount={pageCount}
        nextLabel={
          <button className="bg-[#EAF0F8] p-[6px] rounded-[8px] ">
            <Image
              src={"/icons/arrow-right-paginate.svg"}
              alt="navigation"
              width={20}
              height={20}
              className=" rotate-180"
            />
          </button>
        }
        previousLabel={
          <button className="bg-[#EAF0F8] p-[6px] rounded-[8px]">
            <Image
              src={"/icons/arrow-right-paginate.svg"}
              alt="navigation"
              width={20}
              height={20}
              className=" "
            />
          </button>
        }
        className={
          "flex justify-center space-x-[4px] text-sm font-semibold items-center"
        }
        pageClassName={""}
        pageLinkClassName={
          "inline-flex min-w-[32px] h-8 rounded-[10px] justify-center items-center text-[#0256BA]  "
        }
        nextClassName={""}
        pageRangeDisplayed={3}
        previousClassName={"text-white"}
        activeLinkClassName={"!bg-[#0256BA] !text-white"}
      />
    </div>
  );
};

export default ProjectPagination;
