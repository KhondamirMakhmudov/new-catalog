import DeliverDashboard from "@/layouts/dashboard/deliver/dashboard";
import MainSectionContent from "@/layouts/dashboard/deliver/components/main-page/content";
import MainContent from "@/layouts/dashboard/deliver/components/main-page/main";
import { motion } from "framer-motion";
import { useState } from "react";
import { get } from "lodash";
import Link from "next/link";

const Index = () => {
  const [pasteData, setPasteData] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [rows, setRows] = useState([
    {
      material: "",
      resourceCode: "",
      resourceName: "",
      unit: "",
      price: "",
      secondCode: "",
    },
  ]);

  const handlePaste = (e) => {
    e.preventDefault(); // default paste'ni to'xtatamiz
    const text = e.clipboardData.getData("text");
    const lines = text.trim().split("\n");

    const parsedRows = lines.map((line) => {
      const [material, resourceCode, resourceName, unit, price, secondCode] =
        line.split("\t");
      return {
        material: material?.trim() || "",
        resourceCode: resourceCode?.trim() || "",
        resourceName: resourceName?.trim() || "",
        unit: unit?.trim() || "",
        price: price?.trim() || "",
        secondCode: secondCode?.trim() || "",
      };
    });

    // Agar faqat bitta bo‘sh row bo‘lsa va u ham bo‘sh bo‘lsa — o‘rniga qo‘yamiz
    if (rows.length === 1 && Object.values(rows[0]).every((v) => v === "")) {
      setRows(parsedRows);
    } else {
      setRows([...rows, ...parsedRows]);
    }
  };

  const handleChange = (index, field, value) => {
    const updated = [...rows];
    updated[index][field] = value;
    setRows(updated);
  };

  const addRow = () => {
    setRows([
      ...rows,
      {
        material: "",
        resourceCode: "",
        resourceName: "",
        unit: "",
        // price: "",
        // secondCode: "",
      },
    ]);
  };

  const handleDeleteRow = (indexToDelete) => {
    if (rows.length > 1) {
      const updatedRows = rows.filter((_, index) => index !== indexToDelete);
      setRows(updatedRows);
    }
  };

  const handleSubmit = () => {
    console.log("Yakunlangan ma'lumotlar:", rows);
    // Bu yerga POST request yuborish yoki boshqa logic qo'yishingiz mumkin
  };
  return (
    <DeliverDashboard>
      <MainContent>
        <h1 className="text-2xl font-semibold">Yangi MXIK kod olish</h1>

        <p className="my-[15px] text-gray-500">
          Sizning mahsulotingizga to&apos;g&apos;ri keladigan yangilangan MXIK
          kodini topish yoki qurilish materiali bo&apos;yicha yangi MXIK kodi
          olish uchun so&apos;rov yuboring!
        </p>

        <p className="text-gray-500">
          Mahsulotlarni birma-bir kiriting yoki shunchaki exceldan bizning
          jadvalga nusxalang!
        </p>

        <div className="font-gilroy bg-white  border border-[#E0E2F0]  mt-[12px]">
          <motion.table
            className="w-full border-collapse "
            initial={{ opacity: 0, translateY: "30px" }}
            animate={{ opacity: 1, translateY: "0" }}
            transition={{ duration: 0.4 }}
          >
            <thead className="text-black text-start rounded-[10px]">
              <tr className="rounded-[10px]">
                <th
                  className={
                    "px-4 py-2 text-[10px]  bg-white  text-gray-900  font-bold "
                  }
                >
                  №
                </th>
                <th className=" text-[10px]  text-center  bg-white text-gray-900  font-bold ">
                  Material nomi
                </th>
                <th className=" text-[10px]  text-center  bg-white text-gray-900  font-bold ">
                  Tavsifi
                </th>
                <th className=" text-center text-[10px]   bg-white text-gray-900  font-bold ">
                  Oldingi MXIK
                </th>
                <th className=" text-center text-[10px]   bg-white text-gray-900  font-bold  rounded-tr-[10px]">
                  GOST
                </th>
              </tr>
            </thead>

            <tbody onPaste={handlePaste}>
              {rows.map((row, index) => (
                <tr key={index} className="bg-white">
                  <td className=" px-2 py-1 text-[12px] text-center">
                    {index + 1}
                  </td>
                  <td className=" px-2 py-1">
                    <input
                      type="text"
                      value={row.material}
                      onChange={(e) =>
                        handleChange(index, "material", e.target.value)
                      }
                      className="w-full text-[12px] border px-2 py-1 rounded"
                    />
                  </td>
                  <td className=" px-2 py-1">
                    <input
                      type="text"
                      value={row.resourceCode}
                      onChange={(e) =>
                        handleChange(index, "resourceCode", e.target.value)
                      }
                      className="w-full text-[12px] border px-2 py-1 rounded"
                    />
                  </td>
                  <td className=" px-2 py-1">
                    <input
                      type="text"
                      value={row.resourceName}
                      onChange={(e) =>
                        handleChange(index, "resourceName", e.target.value)
                      }
                      className="w-full text-[12px] border px-2 py-1 rounded"
                    />
                  </td>
                  <td className=" px-2 py-1">
                    <input
                      type="text"
                      value={row.unit}
                      onChange={(e) =>
                        handleChange(index, "unit", e.target.value)
                      }
                      className="w-full text-[12px] border px-2 py-1 rounded"
                    />
                  </td>
                  {/* <td className=" px-2 py-1">
                    <input
                      type="number"
                      value={row.price}
                      onChange={(e) =>
                        handleChange(index, "price", e.target.value)
                      }
                      className="w-full text-[12px] border px-2 py-1 rounded"
                    />
                  </td> */}
                  {/* <td className=" px-2 py-1">
                    <input
                      type="text"
                      value={row.secondCode}
                      onChange={(e) =>
                        handleChange(index, "secondCode", e.target.value)
                      }
                      className="w-full text-[12px] border px-2 py-1 rounded"
                    />
                  </td> */}
                  <td className="px-2 py-1 text-center">
                    <button
                      onClick={() => handleDeleteRow(index)}
                      className="text-red-500 hover:text-red-700 text-sm"
                      title="Qatorni o‘chirish"
                    >
                      ❌
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </motion.table>
        </div>

        {/* <div className="mt-4">
          <label className="block text-sm font-semibold mb-1">
            Excel’dan nusxa ko‘chirish va bu yerga qo‘yish:
          </label>
          <textarea
            onPaste={handlePaste}
            rows={4}
            className="w-full border px-3 py-2 rounded text-sm"
            placeholder="Excel'dan 6 ustunli qiymatlarni tanlab, bu yerga Ctrl+V qiling..."
          />
        </div> */}

        {/* Murojaat uchun tel */}

        <div className="my-[15px] space-y-2">
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="phone1"
            >
              Telefon raqami (asosiy)
            </label>
            <input
              type="tel"
              id="phone1"
              name="phone1"
              placeholder="Kiriting"
              className=" px-4 py-2 border w-1/3 border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="phone2"
            >
              Qo‘shimcha raqam (1)
            </label>
            <input
              type="tel"
              id="phone2"
              name="phone2"
              placeholder="Kiriting"
              className=" px-4 py-2 border w-1/3 border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="phone3"
            >
              Qo‘shimcha raqam (2)
            </label>
            <input
              type="tel"
              id="phone3"
              name="phone3"
              placeholder="Kiriting"
              className=" px-4 py-2 border w-1/3 border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex gap-4 mt-4">
          <button
            onClick={addRow}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 text-sm"
          >
            + Qator qo&apos;shish
          </button>

          <button
            onClick={() => {
              handleSubmit();
              setOpenModal(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
          >
            Yakunlash
          </button>
        </div>

        {openModal && (
          <div
            className={`fixed inset-0  z-50 bg-black bg-opacity-75 flex justify-center items-center `}
          >
            <div
              className={
                "w-[480px] p-[30px] rounded-[5px] bg-white flex justify-center items-center flex-col"
              }
            >
              {/* <div className="p-[18px] rounded-full bg-[#FAEBEB] mx-auto inline-block ">
                <Image
                  src={"/images/info-circle.png"}
                  alt={"circle"}
                  width={24}
                  height={24}
                  className={"  cursor-pointer"}
                />
              </div> */}

              <h1 className="font-bold text-[32px] mt-[10px] text-center">
                So‘rovingiz muvaffaqiyatli yuborildi!
              </h1>
              <p className="font-medium text-[#75758B] text-center">
                Yuborgan so‘rovingiz 1–3 ish kunida ko‘rib chiqiladi. Jarayon
                yakunlangach, natijani shu yerda ko‘rishingiz mumkin:
              </p>
              <br />

              <div className={"gap-x-[20px] mt-[20px] w-full"}>
                <Link href={"/dashboard/deliver/main/mxik-code/result"}>
                  <button className="bg-[#0256BA] text-white rounded-[12px] py-2 w-full">
                    Ko'rish
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </MainContent>
    </DeliverDashboard>
  );
};

export default Index;
