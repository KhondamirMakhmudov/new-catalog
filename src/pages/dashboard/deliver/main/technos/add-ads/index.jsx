import MainContent from "@/layouts/dashboard/deliver/components/main-page/main";
import DeliverDashboard from "@/layouts/dashboard/deliver/dashboard";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import useGetQuery from "@/hooks/api/useGetQuery";
import usePostQuery from "@/hooks/api/usePostQuery";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import { get, isEmpty, find, head, debounce } from "lodash";
import Select from "react-select";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

const Index = () => {
  const { data: session } = useSession();
  const [search, setSearch] = useState("");
  const [warning, setWarning] = useState(false);
  const [technoValue, setTechnoValue] = useState(null);
  const [techno, setTechno] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ values: techno });
  const router = useRouter();
  const { data: technos, isLoadingTechno } = useGetQuery({
    key: KEYS.technos,
    url: URLS.technos,
    params: {
      key: "name",
      value: search,
      page_size: 100,
    },
    enabled: !!search,
  });

  const { mutate: addAds, isLoading } = usePostQuery({
    listKeyId: KEYS.myTechnos,
    hideSuccessToast: true,
  });

  useEffect(() => {
    if (!isEmpty(head(get(technos, "data.results", [])))) {
      setTechno(
        find(
          get(technos, "data.results", []),
          ({ techno_csr_code }) => techno_csr_code === technoValue
        )
      );
    }
  }, [technos, technoValue]);

  const onSubmit = ({
    techno_csr_code,
    techno_description,
    techno_price,
    techno_price_currency,
    techno_amount,
    sertificate_blank_num,
    sertificate_reestr_num,
    techno_owner,
    techno_measure,
  }) => {
    let formData = new FormData();
    formData.append("techno_name", techno_csr_code);
    formData.append("techno_description", techno_description);
    formData.append("techno_price", techno_price);
    formData.append("techno_price_currency", techno_price_currency);
    formData.append("techno_amount", techno_amount);
    formData.append("sertificate_blank_num", sertificate_blank_num);
    formData.append("sertificate_reestr_num", sertificate_reestr_num);
    formData.append("techno_owner", techno_owner);
    formData.append("techno_amount_measure", techno_measure);
    formData.append("techno_measure", techno_measure);
    addAds(
      {
        url: URLS.technoAddAds,
        attributes: formData,
        config: {
          headers: { token: `${get(session, "user.token")}` },
        },
      },
      {
        onSuccess: () => {
          toast.success("E'lon muvaffaqiyatli joylandi", {
            position: "top-center",
          });
          router.push("/dashboard/deliver/main/technos");
        },
        onError: (error) => {
          toast.error(`Error is ${error},`, { position: "top-right" });
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
              options={get(technos, "data.results", []).map((techno) => ({
                value: get(techno, "techno_csr_code"),
                label: get(techno, "techno_name"),
              }))}
              defaultValue={search}
              onChange={(val) => setTechnoValue(get(val, "value"))}
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
            <label>Uskunalar va qurilmalar bo’limi</label>
            <input
              type="text"
              defaultValue={get(techno, "techno_volume_name")}
              disabled={true}
              placeholder="Tanlang"
              className="py-[14px] px-[16px] bg-white w-full border border-[#E2E8F0] rounded-[12px]"
            />
          </div>

          <div className="col-span-4 space-y-[10px]">
            <label>Uskunalar va qurilmalar kategoriyasi</label>
            <input
              type="text"
              disabled={true}
              defaultValue={get(techno, "techno_category_name")}
              placeholder="Tanlang"
              className="py-[14px] px-[16px] bg-white w-full border border-[#E2E8F0] rounded-[12px]"
            />
          </div>

          <div className="col-span-4 space-y-[10px]">
            <label>Uskunalar va qurilmalar guruhi</label>
            <input
              type="text"
              defaultValue={get(techno, "techno_group_name")}
              disabled={true}
              placeholder="Tanlang"
              className="py-[14px] px-[16px] bg-white w-full border border-[#E2E8F0] rounded-[12px]"
            />
          </div>

          <div className="col-span-6 space-y-[10px]">
            <label>Mahsulot nomi</label>
            <input
              type="text"
              defaultValue={get(techno, "techno_name")}
              {...register("techno_name", { required: true })}
              disabled={true}
              placeholder="Tanlang"
              className="py-[14px] px-[16px] bg-white w-full border border-[#E2E8F0] rounded-[12px]"
            />
          </div>

          <div className="col-span-4 space-y-[10px]">
            <label>Mahsulot narxi</label>
            <input
              type="number"
              {...register("techno_price", { required: true })}
              placeholder="Tanlang"
              className="py-[14px] px-[16px] bg-white w-full border border-[#E2E8F0] rounded-[12px]"
            />

            <input
              placeholder={
                "Грунтовка полимерная для повышения адгезия битумно-полимерных мастик и герметиков при герметизации деформационных швов асфальта"
              }
              className={"hidden"}
              value={1}
              {...register("techno_owner", { required: true })}
            />
          </div>

          <div className="col-span-2 space-y-[10px]">
            <label>Valyuta</label>
            <select
              className={
                "p-[16px] w-full border border-[#E2E8F0] rounded-[12px]"
              }
              {...register("techno_price_currency")}
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
              {...register("techno_amount", { required: true })}
              placeholder="Tanlang"
              className="py-[14px] px-[16px] bg-white w-full border border-[#E2E8F0] rounded-[12px]"
            />
          </div>

          <div className="col-span-3 space-y-[10px]">
            <label>Mahsulot o’lchov birligi</label>
            <input
              type="text"
              {...register("techno_measure")}
              defaultValue={get(techno, "techno_measure")}
              disabled={true}
              placeholder="Tanlang"
              className="py-[14px] px-[16px] bg-white w-full border border-[#E2E8F0] rounded-[12px]"
            />
          </div>

          <div className="col-span-3 space-y-[10px]">
            <label>Mahsulot miqdor o’lchov birligi</label>
            <input
              type="text"
              defaultValue={get(techno, "techno_measure")}
              {...register("techno_amount_measure")}
              disabled={true}
              placeholder="Tanlang"
              className="py-[14px] px-[16px] bg-white w-full border border-[#E2E8F0] rounded-[12px]"
            />
          </div>

          <div className="col-span-12 space-y-[10px]">
            <label>Mahsulot tavsifi</label>

            <textarea
              {...register("techno_description")}
              name="about-material"
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
              {...register("sertificate_reestr_num", { required: true })}
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
