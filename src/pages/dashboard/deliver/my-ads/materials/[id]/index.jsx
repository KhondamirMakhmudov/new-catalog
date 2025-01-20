import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import useGetOneQuery from "@/hooks/api/useGetOneQuery";
import useGetQuery from "@/hooks/api/useGetQuery";
import MainContent from "@/layouts/dashboard/customer/components/main-content";
import DeliverDashboard from "@/layouts/dashboard/deliver/dashboard";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { get, isEmpty, find, head } from "lodash";
import usePutQuery from "@/hooks/api/usePutQuery";
import Title from "@/components/title";

const Index = () => {
  const [search, setSearch] = useState("");
  const [material, setMaterial] = useState({});
  const [materialValue, setMaterialValue] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ values: material });

  const router = useRouter();
  const { id } = router.query;

  const { data: oldData } = useGetOneQuery({
    key: "material-one",
    url: URLS.updateMaterial,
    id: `${id}/`,
    enabled: !!id,
  });

  const { data: materials, isLoadingMaterial } = useGetQuery({
    key: KEYS.materials,
    url: URLS.materials,
    params: {
      key: "name",
      value: search,
      page_size: 100,
    },
    enabled: !!search,
  });

  const { mutate: editAdds, isLoading } = usePutQuery({
    listKeyId: "material-one",
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

  useEffect(() => {
    if (get(oldData, "data") && !isEmpty(get(oldData, "data"))) {
      setMaterial(get(oldData, "data"));
      setSearch(get(oldData, "data.material_name"));
    }
  }, [oldData]);

  const onSubmit = ({
    material_description,
    material_price,
    material_price_currency,

    material_amount,
    sertificate_blank_num,
    sertificate_reestr_num,

    material_measure,
  }) => {
    let formData = new FormData();

    formData.append("material_description", material_description);
    formData.append("material_price", material_price);
    formData.append("material_price_currency", material_price_currency);

    formData.append("material_amount", material_amount);
    formData.append("sertificate_blank_num", sertificate_blank_num);
    formData.append("sertificate_reestr_num", sertificate_reestr_num);

    formData.append("material_amount_measure", material_measure);
    formData.append("material_measure", material_measure);
    editAdds(
      {
        url: `${URLS.updateMaterial}${id}/`,
        attributes: formData,
      },
      {
        onSuccess: () => {
          toast.success("E'lon muvaffaqiyatli tahrirlandi", {
            position: "top-center",
          });
          router.push("/dashboard/deliver/my-ads/materials");
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
        <Title>E&apos;lonni tahrirlash</Title>
        <form
          className={"grid grid-cols-12 gap-x-[30px]"}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={"col-span-12 gap-x-[30px]"}>
            <h4 className={"text-[#28366D] text-base my-[10px]"}>
              Material tavsifi
            </h4>
            <textarea
              {...register("material_description")}
              defaultValue={get(oldData, "data.material_description")}
              rows={5}
              className="py-[14px] px-[16px] bg-white w-full border border-[#E2E8F0] rounded-[12px]"
            ></textarea>
          </div>

          {/* Material narxi */}
          <div className={"col-span-6 "}>
            <h4 className={"text-[#28366D] text-base "}>Material narxi</h4>
            <div className={"flex items-center rounded-[5px]"}>
              <input
                placeholder={""}
                type={"number"}
                defaultValue={get(oldData, "data.material_price")}
                {...register("material_price", { required: true })}
                className="py-[14px] px-[16px] bg-white w-full border border-[#E2E8F0] rounded-[12px]"
                required={true}
              />

              <select
                className={"p-[16px]"}
                defaultValue={get(oldData, "data.material_price_currency")}
                {...register("material_price_currency")}
              >
                <option>UZS</option>
                <option>USD</option>
                <option>RUB</option>
              </select>
            </div>
          </div>

          {/* Material o'lchov birligi */}
          <div className={"col-span-6"}>
            <h4 className={"text-[#28366D] text-base "}>
              Material o’lchov birligi
            </h4>
            <input
              placeholder={"*qidiruv natijasiga ko’ra avtomatik to’ldiriladi"}
              className="py-[14px] px-[16px] bg-white w-full border border-[#E2E8F0] rounded-[12px]"
              {...register("material_measure")}
              defaultValue={get(oldData, "data.material_measure")}
              disabled={true}
            />
          </div>

          {/*Material miqdori*/}
          <div className={"col-span-6"}>
            <h4 className={"text-[#28366D] text-base "}>Material miqdori</h4>
            <input
              placeholder={"Material miqdori"}
              type={"number"}
              defaultValue={get(oldData, "data.material_amount")}
              {...register("material_amount", { required: true })}
              className="py-[14px] px-[16px] bg-white w-full border border-[#E2E8F0] rounded-[12px]"
            />
          </div>

          {/*Material miqdor o’lchov birligi*/}
          <div className={"col-span-6"}>
            <h4 className={"text-[#28366D] text-base "}>
              Material miqdor o’lchov birligi
            </h4>
            <input
              placeholder={"*qidiruv natijasiga ko’ra avtomatik to’ldiriladi"}
              className="py-[14px] px-[16px] bg-white w-full border border-[#E2E8F0] rounded-[12px]"
              defaultValue={get(oldData, "data.material_measure")}
              {...register("material_amount_measure")}
              disabled={true}
            />
          </div>

          <div className={"col-span-6"}>
            {/*Mahsulot sertifikati reestr raqami*/}
            <div>
              <h4 className={"text-[#28366D] text-base "}>
                Mahsulot sertifikati blank raqami
              </h4>
              <input
                placeholder={"Mahsulot sertifikati blank raqami"}
                defaultValue={get(oldData, "data.sertificate_blank_num")}
                {...register("sertificate_blank_num", { required: true })}
                className="py-[14px] px-[16px] bg-white w-full border border-[#E2E8F0] rounded-[12px]"
                required={true}
              />
            </div>

            {/*Mahsulot sertifikati reestr raqami*/}
            <div>
              <h4 className={"text-[#28366D] text-base "}>
                Mahsulot sertifikati reestr raqami
              </h4>
              <input
                placeholder={"Mahsulot sertifikati reestr raqami"}
                {...register("sertificate_reestr_num", { required: true })}
                defaultValue={get(oldData, "data.sertificate_reestr_num")}
                className="py-[14px] px-[16px] bg-white w-full border border-[#E2E8F0] rounded-[12px]"
                required={true}
              />
            </div>
          </div>

          <button
            className={
              "col-span-12 w-[190px] text-base text-white bg-[#1890FF] py-[12px] px-[54px] rounded-[5px] mt-[30px]"
            }
          >
            <p>Tahrirlash</p>
          </button>
        </form>
      </MainContent>
    </DeliverDashboard>
  );
};

export default Index;
