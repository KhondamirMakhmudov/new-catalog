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
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [warning, setWarning] = useState(false);
  const [material, setMaterial] = useState({});
  const [materialValue, setMaterialValue] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ values: material });
  const { data: materials, isLoadingMaterial } = useGetQuery({
    key: KEYS.materials,
    url: URLS.materials,
    params: {
      key: "name",
      value: search,
      page_size: 100,
    },
    headers: { token: `${get(session, "user.token")}` },
    enabled:
      !!search &&
      !!(get(session, "user.token") && get(session, "user.role") === "company"),
  });

  const { mutate: addAds, isLoading } = usePostQuery({
    listKeyId: KEYS.myMaterials,
    hideSuccessToast: true,
  });

  useEffect(() => {
    if (!isEmpty(head(get(materials, "data.results", [])))) {
      setMaterial(
        find(
          get(materials, "data.results", []),
          ({ material_csr_code }) => material_csr_code === materialValue
        )
      );
    }
  }, [materials, materialValue]);

  const onSubmit = ({
    material_csr_code,
    material_description,
    material_price,
    material_price_currency,
    material_amount,
    sertificate_blank_num,
    sertificate_reestr_num,
    material_owner,
    material_measure,
    material_image,
  }) => {
    let formData = new FormData();
    formData.append("material_name", material_csr_code);
    formData.append("material_description", material_description);
    formData.append("material_price", material_price);
    formData.append("material_price_currency", material_price_currency);
    formData.append(
      "https://backend-market.tmsiti.uz/media/materials/59.1.11.03-0971.jpg",
      material_image
    );
    formData.append("material_amount", material_amount);
    formData.append("sertificate_blank_num", sertificate_blank_num);
    formData.append("sertificate_reestr_num", sertificate_reestr_num);
    formData.append("material_owner", material_owner);
    formData.append("material_amount_measure", material_measure);
    formData.append("material_measure", material_measure);
    addAds(
      {
        url: URLS.addAds,
        attributes: formData,
      },
      {
        onSuccess: () => {
          toast.success("E'lon muvaffaqiyatli joylandi", {
            position: "top-center",
          });
          router.push("/dashboard/deliver/main/materials");
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
              options={get(materials, "data.results", []).map((material) => ({
                value: get(material, "material_csr_code"),
                label: get(material, "material_name"),
              }))}
              defaultValue={search}
              onChange={(val) => setMaterialValue(get(val, "value"))}
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
            <label>Materiallar bo’limi</label>
            <input
              defaultValue={get(material, "material_volume_name")}
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
              {...register("material_owner", { required: true })}
            />
          </div>

          <div className="col-span-4 space-y-[10px]">
            <label>Materiallar kategoriyasi</label>
            <input
              defaultValue={get(material, "material_category_name")}
              disabled={true}
              type="text"
              placeholder="Tanlang"
              className="py-[14px] px-[16px] bg-white w-full border border-[#E2E8F0] rounded-[12px]"
            />
          </div>

          <div className="col-span-4 space-y-[10px]">
            <label>Materiallar guruhi</label>
            <input
              defaultValue={get(material, "material_group_name")}
              type="text"
              {...register("material_name", { required: true })}
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
            />
          </div>

          <div className="col-span-6 space-y-[10px]">
            <label>Material nomi</label>
            <input
              {...register("material_name", { required: true })}
              type="text"
              placeholder="Tanlang"
              className="py-[14px] px-[16px] bg-white w-full border border-[#E2E8F0] rounded-[12px]"
            />
          </div>

          <div className="col-span-4 space-y-[10px]">
            <label>Material narxi</label>
            <input
              type="number"
              {...register("material_price", { required: true })}
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
              {...register("material_price_currency")}
            >
              <option>UZS</option>
              <option>USD</option>
              <option>RUB</option>
            </select>
          </div>

          <div className="col-span-6 space-y-[10px]">
            <label>Material miqdori</label>
            <input
              {...register("material_amount", { required: true })}
              type="number"
              placeholder="Tanlang"
              className="py-[14px] px-[16px] bg-white w-full border border-[#E2E8F0] rounded-[12px]"
            />
          </div>

          <div className="col-span-3 space-y-[10px]">
            <label>Material o’lchov birligi</label>
            <input
              type="text"
              {...register("material_measure")}
              defaultValue={get(material, "material_measure")}
              disabled={true}
              placeholder="Tanlang"
              className="py-[14px] px-[16px] bg-white w-full border border-[#E2E8F0] rounded-[12px]"
            />
          </div>

          <div className="col-span-3 space-y-[10px]">
            <label>Material miqdor o’lchov birligi</label>
            <input
              {...register("material_amount_measure")}
              type="text"
              placeholder="Tanlang"
              defaultValue={get(material, "material_measure")}
              {...register("material_amount_measure")}
              disabled={true}
              className="py-[14px] px-[16px] bg-white w-full border border-[#E2E8F0] rounded-[12px]"
            />
          </div>

          <div className="col-span-12 space-y-[10px]">
            <label>Material tavsifi</label>

            <textarea
              {...register("material_description")}
              name="about-material"
              placeholder="Izoh qoldiring"
              className=" py-[14px] px-[16px] bg-white w-full border border-[#E2E8F0] rounded-[12px]"
            ></textarea>

            <div className="hidden">
              <h4 className={"text-[#28366D] text-base "}>Material rasmi</h4>
              <label
                htmlFor="dropzone-file"
                className={
                  "shadow-2xl py-[20px] px-[30px] my-[10px] rounded-[5px] cursor-pointer  flex flex-col justify-center items-center  w-[320px] h-[224px] bg-white"
                }
              >
                <Image
                  src={"/icons/upload.svg"}
                  alt={"upload"}
                  width={48}
                  height={48}
                />
                <p>yuklash</p>
              </label>
              <input
                id={"dropzone-file"}
                type={"file"}
                {...register("material_image")}
              />
            </div>
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
