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
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

const Index = () => {
  const { data: session } = useSession();
  const [search, setSearch] = useState();
  const [machineMechano, setMachineMechano] = useState({});
  const [machineMechanoValue, setMachineMechanoValue] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ values: machineMechano });
  const router = useRouter();
  const { id } = router.query;

  const { data: oldData } = useGetOneQuery({
    key: "mmechano-one",
    url: URLS.updateMachineMechano,
    id: `${id}/`,
    headers: { token: `${get(session, "user.token")}` },
    enabled:
      !!id &&
      !!(get(session, "user.token") && get(session, "user.role") === "company"),
  });

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

  const { mutate: editAdds, isLoading } = usePutQuery({
    listKeyId: "mmechano-one",
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

  useEffect(() => {
    if (get(oldData, "data") && !isEmpty(get(oldData, "data"))) {
      setMachineMechano(get(oldData, "data"));
      setSearch(get(oldData, "data.mmechano_name"));
    }
  }, [oldData]);

  const onSubmit = ({
    mmechano_description,
    mmechano_rent_price,
    mmechano_rent_price_currency,
    mmechano_amount,
    sertificate_blank_num,
    sertificate_reestr_num,
    mmechano_measure,
    mmechano_owner,
  }) => {
    let formData = new FormData();

    formData.append("mmechano_description", mmechano_description);
    formData.append("mmechano_rent_price", mmechano_rent_price);
    formData.append(
      "mmechano_rent_price_currency",
      mmechano_rent_price_currency
    );

    formData.append("mmechano_amount", mmechano_amount);
    formData.append("sertificate_blank_num", sertificate_blank_num);
    formData.append("sertificate_reestr_num", sertificate_reestr_num);

    formData.append("mmechano_amount", mmechano_amount);
    formData.append("mmechano_measure", mmechano_measure);
    formData.append("mmechano_owner", mmechano_owner);
    editAdds(
      {
        url: `${URLS.updateMachineMechano}${id}/`,
        attributes: formData,
      },
      {
        onSuccess: () => {
          toast.success("E'lon muvaffaqiyatli tahrirlandi", {
            position: "top-center",
          });
          router.push("/dashboard/machine-mechano");
        },
        onError: (error) => {
          toast.error(`Error is ${error}`, { position: "top-right" });
        },
      }
    );
  };

  const updateData = (_id) => {
    if (_id) {
      updateData({
        url: URLS.updateMachineMechano,
        attributes: {
          id: _id,
        },
        config: {
          headers: { token: `${get(session, "user.token")}` },
        },
      });
    }
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
              {...register("mmechano_description")}
              defaultValue={get(oldData, "data.mmechano_description")}
              rows={5}
              className="py-[14px] px-[16px] bg-white w-full border border-[#E2E8F0] rounded-[12px]"
            ></textarea>
          </div>

          {/* Material narxi */}
          <div className={"col-span-6 "}>
            <h4 className={"text-[#28366D] text-base "}>Material narxi</h4>

            <input
              placeholder={""}
              type={"number"}
              defaultValue={get(oldData, "data.mmechano_rent_price")}
              {...register("mmechano_rent_price", { required: true })}
              className="py-[14px] px-[16px] bg-white w-full border border-[#E2E8F0] rounded-[12px]"
              required={true}
            />
          </div>

          <div className={"col-span-3 "}>
            <h4 className={"text-[#28366D] text-base "}>Valyuta</h4>
            <select
              className="py-[14px] px-[16px] bg-white w-full border border-[#E2E8F0] rounded-[12px]"
              defaultValue={get(oldData, "data.mmechano_rent_price_currency")}
              {...register("mmechano_rent_price_currency")}
            >
              <option>UZS</option>
              <option>USD</option>
              <option>RUB</option>
            </select>
          </div>

          {/* Material o'lchov birligi */}
          <div className={"col-span-3"}>
            <h4 className={"text-[#28366D] text-base "}>
              Material o’lchov birligi
            </h4>
            <input
              placeholder={"*qidiruv natijasiga ko’ra avtomatik to’ldiriladi"}
              className="py-[14px] px-[16px] bg-white w-full border border-[#E2E8F0] rounded-[12px]"
              {...register("mmechano_measure")}
              defaultValue={get(oldData, "data.mmechano_measure")}
              disabled={true}
            />
          </div>

          {/*Material miqdori*/}
          <div className={"col-span-6"}>
            <h4 className={"text-[#28366D] text-base "}>Material miqdori</h4>
            <input
              placeholder={"Material miqdori"}
              type={"number"}
              defaultValue={get(oldData, "data.mmechano_amount")}
              {...register("mmechano_amount", { required: true })}
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
              defaultValue={get(oldData, "data.mmechano_measure")}
              {...register("mmechano_measure")}
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
