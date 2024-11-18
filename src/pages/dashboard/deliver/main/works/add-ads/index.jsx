import MainContent from "@/layouts/dashboard/deliver/components/main-page/main";
import DeliverDashboard from "@/layouts/dashboard/deliver/dashboard";

const Index = () => {
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
        <form className="grid grid-cols-12 gap-[16px] mt-[16px]">
          <div className="col-span-12 space-y-[10px]">
            <label>Qidiruv</label>
            <input
              type="text"
              placeholder="Mahsulotni rus tilida kiriting"
              className="py-[14px] px-[16px] bg-white w-full border border-[#E2E8F0] rounded-[12px]"
            />
          </div>

          <div className="col-span-4 space-y-[10px]">
            <label>Qurilish ishlari bo’limi</label>
            <input
              type="text"
              placeholder="Tanlang"
              className="py-[14px] px-[16px] bg-white w-full border border-[#E2E8F0] rounded-[12px]"
            />
          </div>

          <div className="col-span-4 space-y-[10px]">
            <label>Qurilish ishlari kategoriyasi</label>
            <input
              type="text"
              placeholder="Tanlang"
              className="py-[14px] px-[16px] bg-white w-full border border-[#E2E8F0] rounded-[12px]"
            />
          </div>

          <div className="col-span-4 space-y-[10px]">
            <label>Qurilish ishlari guruhi</label>
            <input
              type="text"
              placeholder="Tanlang"
              className="py-[14px] px-[16px] bg-white w-full border border-[#E2E8F0] rounded-[12px]"
            />
          </div>

          <div className="col-span-6 space-y-[10px]">
            <label>Material nomi</label>
            <input
              type="text"
              placeholder="Tanlang"
              className="py-[14px] px-[16px] bg-white w-full border border-[#E2E8F0] rounded-[12px]"
            />
          </div>

          <div className="col-span-4 space-y-[10px]">
            <label>Material narxi</label>
            <input
              type="text"
              placeholder="Tanlang"
              className="py-[14px] px-[16px] bg-white w-full border border-[#E2E8F0] rounded-[12px]"
            />
          </div>

          <div className="col-span-2 space-y-[10px]">
            <label>Materiallar bo’limi</label>
            <input
              type="text"
              placeholder="Tanlang"
              className="py-[14px] px-[16px] bg-white w-full border border-[#E2E8F0] rounded-[12px]"
            />
          </div>

          <div className="col-span-6 space-y-[10px]">
            <label>Material miqdori</label>
            <input
              type="text"
              placeholder="Tanlang"
              className="py-[14px] px-[16px] bg-white w-full border border-[#E2E8F0] rounded-[12px]"
            />
          </div>

          <div className="col-span-3 space-y-[10px]">
            <label>Material o’lchov birligi</label>
            <input
              type="text"
              placeholder="Tanlang"
              className="py-[14px] px-[16px] bg-white w-full border border-[#E2E8F0] rounded-[12px]"
            />
          </div>

          <div className="col-span-3 space-y-[10px]">
            <label>Material miqdor o’lchov birligi</label>
            <input
              type="text"
              placeholder="Tanlang"
              className="py-[14px] px-[16px] bg-white w-full border border-[#E2E8F0] rounded-[12px]"
            />
          </div>

          <div className="col-span-12 space-y-[10px]">
            <label>Material miqdori</label>

            <textarea
              name="about-material"
              className=" py-[14px] px-[16px] bg-white w-full border border-[#E2E8F0] rounded-[12px]"
            ></textarea>
          </div>

          <div className="col-span-6 space-y-[10px]">
            <label>Mahsulot sertifikati</label>
            <input
              type="text"
              placeholder="Tanlang"
              className="py-[14px] px-[16px] bg-white w-full border border-[#E2E8F0] rounded-[12px]"
            />
          </div>
          <div className="col-span-6 space-y-[10px]">
            <label>Mahsulot rester raqami</label>
            <input
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
