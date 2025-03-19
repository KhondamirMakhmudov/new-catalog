import React, { useEffect, useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import useGetQuery from "@/hooks/api/useGetQuery";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import { get } from "lodash";

const HorizonChart = () => {
  const { data: company } = useGetQuery({
    key: KEYS.companyCount,
    url: URLS.companyCount,
  });

  const [chartData, setChartData] = useState([]);

  const regionColors = useMemo(
    () => ({
      "Toshkent shahri": "#AFEEEE",
      Navoiy: "#F5F0D4",
      Toshkent: "#C6D8FF",
      Buxoro: "#abcdef",
      Namangan: "#87CEEB",
      Samarqand: "#B0C4DE",
      Jizzax: "#FDEED9",
      Fargona: "#66CDAA",
      Xorazm: "#FFE4B5",
      Surxondaryo: "#B5F2EA",
      Sirdaryo: "#9370DB",
      Qashqadaryo: "#C3FBD8",
      "Rossiya federatsiyasi": "#ff33aa",
      Andijon: "#2E8B57",
      "Qoraqalpogiston Respublikasi": "#D7B59F",
    }),
    []
  ); // Memoize to avoid re-creation on every render

  useEffect(() => {
    const regions = get(company, "data", []).map((item) => ({
      region: get(item, "region"),
      companyCount: get(item, "company_count"),
      fill: regionColors[get(item, "region")] || "#0256BA",
    }));

    setChartData(regions);
  }, [company, regionColors]); // Include both dependencies

  return (
    <div
      style={{ width: "100%", height: "400px" }}
      className="text-xs font-gilroy"
    >
      <ResponsiveContainer>
        <BarChart data={chartData} layout="vertical">
          <CartesianGrid />
          <XAxis type="number" />
          <YAxis dataKey="region" type="category" width={150} interval={0} />
          <Tooltip
            formatter={(value, name) => [`${value}`, "Korxonalar soni"]}
            labelFormatter={(label) => `Mintaqa: ${label}`}
          />
          <Bar dataKey="companyCount" fill="#8884d8" isAnimationActive={true}>
            {chartData.map((entry, index) => (
              <cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HorizonChart;
