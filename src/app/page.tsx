"use client";

import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/resources/firebase";
import { Navigation } from "@/components/navigation";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "salaries"));
        const salaries = querySnapshot.docs.map((doc) => {
          const salary = doc.data();
          return {
            location: `${salary.city ?? "Unknown"}, ${salary.state ?? "Unknown"}`,
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
    <div className="container mx-auto">
      <div className="flex col flex-col gap-4">
        <h1 className="px-2 sm:p-0 text-4xl font-extrabold tracking-tight">
          Know you worth!
        </h1>
        <div className="sm:w-3/5">
          <p className="px-2 sm:p-0 text-left sm:text-justify">
            Pay transparency is essential in nursing, as it empowers
            professionals to make informed career decisions, advocate for fair
            compensation, and address wage disparities. By openly sharing salary
            information, nurses can ensure equitable pay, foster trust within
            the workplace, and contribute to a more supportive and just
            healthcare environment.
          </p>
        </div>
        <div className="flex">
          <h2 className="px-2 sm:p-0 text-3xl font-semibold tracking-tight">
            Compare facilities:
          </h2>
        </div>
      </div>
    </div>
  );
}
