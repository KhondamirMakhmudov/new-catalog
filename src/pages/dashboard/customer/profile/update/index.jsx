import CustomerDashboard from "@/layouts/dashboard/customer/dashboard";
import MainContent from "@/layouts/dashboard/customer/components/main-content";
import Image from "next/image";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import useGetQuery from "@/hooks/api/useGetQuery";
import { useSession } from "next-auth/react";
import { get } from "lodash";
import { useRouter } from "next/router";
import usePutQuery from "@/hooks/api/usePutQuery";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
const Index = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const { data: session } = useSession();

  const { mutate: editAdds, isLoading } = usePutQuery({
    listKeyId: "update-profile-customer",
  });

  const onSubmit = ({ first_name, last_name, company, email, phone }) => {
    let formData = new FormData();

    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("company", company);
    formData.append("email", email);
    formData.append("phone", phone);

    editAdds(
      {
        url: URLS.aboutProfileUpdate,
        attributes: formData,
        config: {
          headers: { token: `${get(session, "user.token")}` },
        },
      },
      {
        onSuccess: () => {
          toast.success("E'lon muvaffaqiyatli tahrirlandi", {
            position: "top-center",
          });
          router.push("/dashboard/customer/profile");
        },
        onError: (error) => {
          toast.error(`Error is ${error}`, { position: "top-right" });
        },
      }
    );
  };
  return (
    <CustomerDashboard>
      <MainContent>
        <h1 className="text-[26px] font-bold">
          Sizning profilingiz, sizning hayotingiz
        </h1>

        <p className="text-[#718096] text-sm">
          Oqilona yuboring, sarflang va tejang
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-12 gap-[16px] mt-[16px]"
        >
          <div className="col-span-12 md:col-span-6 lg:col-span-6">
            <label className="text-[#718096]">Ismingiz</label>
            <input
              type="text"
              {...register("first_name", { required: true })}
              placeholder="Kiriting"
              className="py-[14px] px-[16px] bg-white w-full border border-[#E2E8F0] rounded-[12px]"
            />
          </div>

          <div className="col-span-12 md:col-span-6 lg:col-span-6">
            <label className="text-[#718096]">Familiyangiz</label>
            <input
              type="text"
              {...register("last_name", { required: true })}
              placeholder="Kiriting"
              className="py-[14px] px-[16px] bg-white w-full border border-[#E2E8F0] rounded-[12px]"
            />
          </div>

          <div className="col-span-12 md:col-span-6 lg:col-span-6">
            <label className="text-[#718096]">JSHSHIR</label>
            <input
              type="text"
              {...register("company", { required: true })}
              placeholder="Kiriting"
              className="py-[14px] px-[16px] bg-white w-full border border-[#E2E8F0] rounded-[12px]"
            />
          </div>

          <div className="col-span-12 md:col-span-6 lg:col-span-6">
            <label className="text-[#718096]">Pochta</label>
            <input
              type="text"
              placeholder="Kiriting"
              {...register("email", { required: true })}
              className="py-[14px] px-[16px] bg-white w-full border border-[#E2E8F0] rounded-[12px]"
            />
          </div>

          <div className="col-span-6">
            <label className="text-[#718096]">Telefon raqamingiz</label>
            <input
              type="text"
              {...register("phone", { required: true })}
              placeholder="Kiriting"
              className="py-[14px] px-[16px] bg-white w-full border border-[#E2E8F0] rounded-[12px]"
            />
          </div>
          <button className="col-span-12 w-full bg-[#0256BA] rounded-[12px] py-[12px] text-white">
            Tahrirlash
          </button>
        </form>
      </MainContent>
    </CustomerDashboard>
  );
};

export default Index;
