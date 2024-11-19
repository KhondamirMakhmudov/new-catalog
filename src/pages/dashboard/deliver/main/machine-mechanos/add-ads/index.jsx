import MainContent from "@/layouts/dashboard/deliver/components/main-page/main";
import DeliverDashboard from "@/layouts/dashboard/deliver/dashboard";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { URLS } from "@/constants/url";
import { KEYS } from "@/constants/key";
import useGetQuery from "@/hooks/api/useGetQuery";
import usePostQuery from "@/hooks/api/usePostQuery";
import { get, isEmpty, find, head, debounce } from "lodash";
import { toast } from "react-hot-toast";
import Select from "react-select";
const Index = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [machineMechano, setMachineMechano] = useState({});
  const [machineMechanoValue, setMachineMechanoValue] = useState(null);
  const [warning, setWarning] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ values: machineMechano });

  const { data: machineMechanos, isLoadingMachineMechano } = useGetQuery({
    key: KEYS.machinesMechanos,
    url: URLS.machinesMechanos,
    params: {
      key: "name",
      value: search,
      page_size: 100,
    },
    enabled: !!search,
  });

  const { mutate: addAds, isLoading } = usePostQuery({
    listKeyId: KEYS.myMachineMechano,
  });

  useEffect(() => {
    if (!isEmpty(head(get(machineMechanos, "data.results", [])))) {
      setMachineMechano(
        find(
          get(machineMechanos, "data.results", []),
          ({ mmechano_csr_code }) => mmechano_csr_code === machineMechanoValue
        )
      );
    }
  }, [machineMechanos, machineMechanoValue]);

  const onSubmit = ({
    mmechano_csr_code,
    mmechano_description,
    mmechano_rent_price,
    mmechano_rent_price_currency,
    mmechano_image,
    mmechano_amount,
    sertificate_blank_num,
    sertificate_reestr_num,
    mmechano_owner,
    mmechano_measure,
  }) => {
    let formData = new FormData();
    formData.append("mmechano_name", mmechano_csr_code);
    formData.append("mmechano_description", mmechano_description);
    formData.append("mmechano_rent_price", mmechano_rent_price);
    formData.append(
      "mmechano_rent_price_currency",
      mmechano_rent_price_currency
    );

    formData.append("mmechano_amount", mmechano_amount);
    formData.append("sertificate_blank_num", sertificate_blank_num);
    formData.append("sertificate_reestr_num", sertificate_reestr_num);
    formData.append("mmechano_owner", mmechano_owner);
    formData.append("mmechano_measure", mmechano_measure);

    addAds(
      {
        url: URLS.machineMechanoAddAds,
        attributes: formData,
      },
      {
        onSuccess: () => {
          toast.success("E'lon muvaffaqiyatli joylandi", {
            position: "top-center",
          });
          router.push("/dashboard/deliver/main/machine-mechanos");
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
        {" "}
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
              options={get(machineMechanos, "data.results", []).map(
                (machine) => ({
                  value: get(machine, "mmechano_csr_code"),
                  label: get(machine, "mmechano_name"),
                })
              )}
              defaultValue={search}
              onChange={(val) => setMachineMechanoValue(get(val, "value"))}
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
            <label>Mashina va mexanizmlar kategoriyasi</label>
            <input
              defaultValue={get(machineMechano, "mmechano_category_name")}
              disabled={true}
              type="text"
              placeholder="Tanlang"
              className="py-[14px] px-[16px] bg-white w-full border border-[#E2E8F0] rounded-[12px]"
            />
          </div>

          <div className="col-span-4 space-y-[10px]">
            <label>Mashina va mexanizmlar guruhi</label>
            <input
              defaultValue={get(machineMechano, "mmechano_group_name")}
              disabled={true}
              type="text"
              placeholder="Tanlang"
              className="py-[14px] px-[16px] bg-white w-full border border-[#E2E8F0] rounded-[12px]"
            />
            <input
              placeholder={
                "Грунтовка полимерная для повышения адгезия битумно-полимерных мастик и герметиков при герметизации деформационных швов асфальта"
              }
              className={"hidden"}
              value={1}
              {...register("mmechano_owner", { required: true })}
            />
          </div>

          <div className="col-span-6 space-y-[10px]">
            <label>Mahsulot nomi</label>
            <input
              type="text"
              defaultValue={get(machineMechano, "mmechano_name")}
              disabled={true}
              placeholder="Tanlang"
              className="py-[14px] px-[16px] bg-white w-full border border-[#E2E8F0] rounded-[12px]"
            />
          </div>

          <div className="col-span-4 space-y-[10px]">
            <label>Mahsulot narxi</label>
            <input
              type="number"
              {...register("mmechano_rent_price", { required: true })}
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
              {...register("mmechano_rent_price_currency")}
            >
              <option>UZS</option>
              <option>USD</option>
              <option>RUB</option>
            </select>
          </div>

          <div className="col-span-6 space-y-[10px]">
            <label>Mahsulot miqdori</label>
            <input
              type="number"
              {...register("mmechano_amount", { required: true })}
              placeholder="Tanlang"
              className="py-[14px] px-[16px] bg-white w-full border border-[#E2E8F0] rounded-[12px]"
            />
          </div>

          <div className="col-span-3 space-y-[10px]">
            <label>Mahsulot o’lchov birligi</label>
            <input
              type="text"
              defaultValue={get(machineMechano, "mmechano_measure")}
              disabled={true}
              placeholder="Tanlang"
              className="py-[14px] px-[16px] bg-white w-full border border-[#E2E8F0] rounded-[12px]"
            />
          </div>

          <div className="col-span-3 space-y-[10px]">
            <label>Mahsulot miqdor o’lchov birligi</label>
            <input
              type="text"
              placeholder="Tanlang"
              {...register("mmechano_amount_measure")}
              disabled={true}
              className="py-[14px] px-[16px] bg-white w-full border border-[#E2E8F0] rounded-[12px]"
            />
          </div>

          <div className="col-span-12 space-y-[10px]">
            <label>Mahsulot tavsifi</label>

            <textarea
              {...register("mmechano_description")}
              name="about-material"
              className=" py-[14px] px-[16px] bg-white w-full border border-[#E2E8F0] rounded-[12px]"
            ></textarea>
          </div>

          <div className="col-span-6 space-y-[10px]">
            <label>Mahsulot sertifikati</label>
            <input
              {...register("sertificate_blank_num", { required: true })}
              type="text"
              placeholder="Tanlang"
              className="py-[14px] px-[16px] bg-white w-full border border-[#E2E8F0] rounded-[12px]"
            />
          </div>
          <div className="col-span-6 space-y-[10px]">
            <label>Mahsulot rester raqami</label>
            <input
              {...register("sertificate_reestr_num", { required: true })}
              type="text"
              placeholder="Tanlang"
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
