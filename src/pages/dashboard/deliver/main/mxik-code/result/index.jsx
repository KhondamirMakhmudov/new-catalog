import MainContent from "@/layouts/dashboard/deliver/components/main-page/main";
import DeliverDashboard from "@/layouts/dashboard/deliver/dashboard";

const Index = () => {
  return (
    <DeliverDashboard>
      <MainContent>
        <h1 className="text-2xl font-semibold">So‘rov natijasi</h1>

        <p className="my-[15px] text-gray-500">
          Quyida siz yuborgan mahsulotlar bo‘yicha MXIK kodlarini ko‘rishingiz
          mumkin. Agar kod hali belgilanmagan bo‘lsa, iltimos, 1–3 ish kunini
          kuting — natija tayyor bo‘lishi bilanoq shu yerda yangilanadi.
        </p>

        <table className="w-full border-separate border-spacing-y-2">
          <thead>
            <tr className="rounded-[10px]">
              <th className="px-4 py-2 text-[10px] bg-white text-gray-900 font-bold">
                №
              </th>
              <th className="text-[10px] text-center bg-white text-gray-900 font-bold">
                Material nomi
              </th>
              <th className="text-[10px] text-center bg-white text-gray-900 font-bold">
                Tavsifi
              </th>
              <th className="text-center text-[10px] bg-white text-gray-900 font-bold">
                Oldingi MXIK
              </th>
              <th className="text-center text-[10px] bg-white text-gray-900 font-bold rounded-tr-[10px]">
                GOST
              </th>
              <th className="text-[10px] text-center bg-white text-gray-900 font-bold">
                Yangi MXIK
              </th>
              <th className="text-[10px] text-center bg-white text-gray-900 font-bold">
                Resurs kodi
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white rounded-[10px] shadow-sm">
              <td className="px-4 py-2 text-[10px] text-center">1</td>
              <td className="text-[10px] text-center">Sement 400</td>
              <td className="text-[10px] text-center">
                Yuqori mustahkamlikka ega qurilish materiali
              </td>
              <td className="text-[10px] text-center">—</td>
              <td className="text-[10px] text-center">GOST 10178-85</td>
              <td className="text-[10px] text-center">2523.29.0000</td>
              <td className="text-[10px] text-center">SC-00123</td>
            </tr>
            <tr className="bg-white rounded-[10px] shadow-sm">
              <td className="px-4 py-2 text-[10px] text-center">2</td>
              <td className="text-[10px] text-center">Keramik g‘isht</td>
              <td className="text-[10px] text-center">
                Issiqlikni saqlovchi devor materiali
              </td>
              <td className="text-[10px] text-center">6904.10.0000</td>
              <td className="text-[10px] text-center">GOST 530-2012</td>
              <td className="text-[10px] text-center">6904.90.0000</td>
              <td className="text-[10px] text-center">SC-00258</td>
            </tr>
          </tbody>
        </table>
      </MainContent>
    </DeliverDashboard>
  );
};

export default Index;
