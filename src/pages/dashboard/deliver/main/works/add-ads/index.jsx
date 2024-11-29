import MainContent from "@/layouts/dashboard/deliver/components/main-page/main";
import DeliverDashboard from "@/layouts/dashboard/deliver/dashboard";
import usePostQuery from "@/hooks/api/usePostQuery";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import Select from "react-select";
import { debounce, get, isEmpty, head, find } from "lodash";
import useGetQuery from "@/hooks/api/useGetQuery";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";

const Index = () => {
  const [search, setSearch] = useState("");
  const [work, setWork] = useState({});
  const [workValue, setWorkValue] = useState(null);
  const [warning, setWarning] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ values: work });
  const router = useRouter();

  const [file, setFile] = useState();

  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  const { data: works, isLoadingWork } = useGetQuery({
    key: KEYS.works,
    url: URLS.works,
    params: {
      key: "name",
      value: search,
      page_size: 100,
    },
    enabled: !!search,
  });

  const { mutate: addAds, isLoading } = usePostQuery({
    listKeyId: KEYS.myWork,
    hideSuccessToast: true,
  });

  useEffect(() => {
    if (!isEmpty(head(get(works, "data.results", [])))) {
      setWork(
        find(
          get(works, "data.results", []),
          ({ work_csr_code }) => work_csr_code === workValue
        )
      );
    }
  }, [works, workValue]);

  const onSubmit = ({
    work_csr_code,
    work_description,
    work_rent_price,
    work_rent_price_currency,
    work_amount,
    sertificate_blank_num,
    sertificate_reestr_num,
    work_owner,
    work_measure,
  }) => {
    let formData = new FormData();
    formData.append("work_name", work_csr_code);
    formData.append("work_description", work_description);
    formData.append("work_rent_price", work_rent_price);
    formData.append("work_rent_price_currency", work_rent_price_currency);
    formData.append("work_amount", work_amount);
    formData.append("sertificate_blank_num", sertificate_blank_num);
    formData.append("sertificate_reestr_num", sertificate_reestr_num);
    formData.append("work_owner", work_owner);
    formData.append("work_amount_measure", work_measure);
    formData.append("work_measure", work_measure);
    addAds(
      {
        url: URLS.workAddAds,
        attributes: formData,
      },
      {
        onSuccess: () => {
          toast.success("E'lon muvaffaqiyatli joylandi", {
            position: "top-center",
          });
          router.push("/dashboard/deliver/main/works");
        },
        onError: (error) => {
          toast.error(`Error is ${error}`, { position: "top-right" });
        },
      }
    );
  };
  return (
    <DeliverDashboard>
      <MainContent>
        <div className="font-gilroy">
          <h1 className="font-bold text-[26px]">Yangi qo’shish</h1>
          <p className="text-[#718096] text-sm mt-[6px]">
            Oqilona yuboring, sarflang va tejang
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-12 gap-[16px] mt-[16px]"
        >
          <div className="col-span-12 space-y-[10px]">
            <label>Qidiruv</label>
            <Select
              isClearable
              placeholder={"nomni rus tilida kiriting"}
              options={get(works, "data.results", []).map((item) => ({
                value: get(item, "work_csr_code"),
                label: get(item, "work_name"),
              }))}
              defaultValue={search}
              onChange={(val) => setWorkValue(get(val, "value"))}
              onKeyDown={debounce(function (e) {
                if (e.target.value.length > 3) {
                  setSearch(e.target.value);
                  setWarning(false);
                } else {
                  setWarning(true);
                }
              }, 500)}
            />
          </div>

          <div className="col-span-4 space-y-[10px]">
            <label>Qurilish ishlari kategoriyasi</label>
            <input
              type="text"
              defaultValue={get(work, "work_category_name")}
              disabled={true}
              placeholder="Tanlang"
              className="py-[14px] px-[16px] bg-white w-full border border-[#E2E8F0] rounded-[12px]"
            />
          </div>

          <div className="col-span-4 space-y-[10px]">
            <label>Qurilish ishlari guruhi</label>
            <input
              type="text"
              defaultValue={get(work, "work_group_name")}
              disabled={true}
              placeholder="Tanlang"
              className="py-[14px] px-[16px] bg-white w-full border border-[#E2E8F0] rounded-[12px]"
            />
          </div>

          <div className="col-span-6 space-y-[10px]">
            <label>Mahsulot nomi</label>
            <input
              type="text"
              defaultValue={get(work, "work_name")}
              disabled={true}
              placeholder="Tanlang"
              className="py-[14px] px-[16px] bg-white w-full border border-[#E2E8F0] rounded-[12px]"
            />
            <input
              placeholder={
                "Грунтовка полимерная для повышения адгезия битумно-полимерных мастик и герметиков при герметизации деформационных швов асфальта"
              }
              className={"hidden"}
              value={1}
              {...register("work_owner", { required: true })}
            />
          </div>

          <div className="col-span-4 space-y-[10px]">
            <label>Mahsulot narxi</label>
            <input
              type="number"
              {...register("work_rent_price", { required: true })}
              placeholder="Tanlang"
              className="py-[14px] px-[16px] bg-white w-full border border-[#E2E8F0] rounded-[12px]"
            />
          </div>

          <div className="col-span-2 space-y-[10px]">
            <label>Valyuta</label>
            <select
              className={
                "p-[16px] w-full border border-[#E2E8F0] rounded-[12px]"
              }
              {...register("work_price_currency")}
            >
              <option>UZS</option>
              <option>USD</option>
              <option>RUB</option>
            </select>
          </div>

          <div className="col-span-6 space-y-[10px]">
            <label>Mahsulot miqdori</label>
            <input
              type={"number"}
              {...register("work_amount", { required: true })}
              placeholder="Tanlang"
              className="py-[14px] px-[16px] bg-white w-full border border-[#E2E8F0] rounded-[12px]"
            />
          </div>

          <div className="col-span-3 space-y-[10px]">
            <label>Mahsulot o’lchov birligi</label>
            <input
              type="text"
              placeholder="Tanlang"
              {...register("work_measure")}
              defaultValue={get(work, "work_measure")}
              disabled={true}
              className="py-[14px] px-[16px] bg-white w-full border border-[#E2E8F0] rounded-[12px]"
            />
          </div>

          <div className="col-span-3 space-y-[10px]">
            <label>Mahsulot miqdor o’lchov birligi</label>
            <input
              type="text"
              defaultValue={get(work, "work_measure")}
              {...register("work_amount_measure")}
              disabled={true}
              placeholder="Tanlang"
              className="py-[14px] px-[16px] bg-white w-full border border-[#E2E8F0] rounded-[12px]"
            />
          </div>

          <div className="col-span-12 space-y-[10px]">
            <label>Mahsulot tavsifi</label>

            <textarea
              name="about-material"
              {...register("work_description")}
              placeholder="Izoh qoldiring"
              className=" py-[14px] px-[16px] bg-white w-full border border-[#E2E8F0] rounded-[12px]"
            ></textarea>
          </div>

          <div className="col-span-6 space-y-[10px]">
            <label>Mahsulot sertifikati</label>
            <input
              type="text"
              {...register("sertificate_blank_num", { required: true })}
              placeholder="Tanlang"
              className="py-[14px] px-[16px] bg-white w-full border border-[#E2E8F0] rounded-[12px]"
            />
          </div>
          <div className="col-span-6 space-y-[10px]">
            <label>Mahsulot rester raqami</label>
            <input
              type="text"
              placeholder="Tanlang"
              {...register("sertificate_reestr_num", { required: true })}
              className="py-[14px] px-[16px] bg-white w-full border border-[#E2E8F0] rounded-[12px]"
            />
          </div>

          <button className="col-span-12 w-full bg-[#0256BA] rounded-[12px] py-[12px] text-white">
            Keyingi
          </button>
        </form>
      </MainContent>
    </DeliverDashboard>
  );
};

export default Index;
