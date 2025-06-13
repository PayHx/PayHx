"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/resources/firebase";
import { SalaryData, columns } from "@/components/columns";
import { DataTable } from "@/components/data-table";
import Visualizations from "./visualizations/page";

export default function Home() {
  const [data, setData] = useState<SalaryData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "salaries"));
        const salaries = querySnapshot.docs.map((doc) => {
          const salary = doc.data();
          return {
            location: `${salary.city ?? "Unknown"}, ${
              salary.state ?? "Unknown"
            }`,
            date: salary.date ?? new Date(),
            city: salary.city ?? "Unknown",
            state: salary.state ?? "Unknown",
            experience: salary.experience ?? 0,
            specialty: salary.specialty ?? "Unknown",
            hospital: salary.hospital ?? "Unknown",
            union: salary.union ?? "Unknown",
            pay: salary.pay ?? 0,
            shiftDiffType:
              salary.shiftDiffType === "NA" || salary.shiftDiffType === null
                ? ""
                : String(salary.shiftDiffType),
            shiftDiffPay: salary.shiftDiffPay ?? null,
          };
        });

        console.log("Fetched Salary Data:", salaries);
        setData(salaries);
      } catch (error) {
        console.error("Error fetching salaries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center p-5">Loading...</div>;

  return (
    <div className="container mx-auto py-10 max-w-screen-2xl">
      <DataTable columns={columns} data={data} />

      <Visualizations />
    </div>
  );
}
