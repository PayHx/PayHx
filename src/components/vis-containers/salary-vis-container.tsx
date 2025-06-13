"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/resources/firebase";
import SalaryVis from "@/components/salary-vis";
import { states, specialties } from "@/constants/submitSalaryFormOptions";
import Fuse from "fuse.js";
interface SalaryData {
  id: string;
  experience: number;
  pay: number;
  hospital: string;
  city: string;
  state: string;
  specialty: string;
}

// Because some state and specialty entries don't match the predefined list, fuzzy search is used to match the entry to the predefined list
const stateList = states.map(({ value }) => value);
const specialtyList = specialties.map(({ value }) => value);
const fuseState = new Fuse(stateList);
const fuseSpecialty = new Fuse(specialtyList);
function matchState(string: string) {
  let result = "Unknown";
  const matches = fuseState.search(string);
  if (matches.length > 0) {
    result = matches[0].item;
  } else if (string === "Arkana, Baxter County, Arkansas") {
    result = "Arkansas";
  } else {
    console.warn("Unmatched state string: " + string);
  }
  return result;
}
function matchSpecialty(string: string) {
  let result = "Unknown";
  const matches = fuseSpecialty.search(string);
  if (matches.length > 0) {
    result = matches[0].item;
  } else {
    console.warn("Unmatched specialty string: " + string);
  }
  return result;
}

export default function SalaryVisContainer() {
  const [data, setData] = useState<SalaryData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "salaries"));
        const salaries = querySnapshot.docs.map((doc) => {
          const salary = doc.data();
          return {
            id: doc.id,
            city: salary.city ?? "Unknown",
            state: matchState(salary.state),
            experience: salary.experience ?? 0,
            specialty: matchSpecialty(salary.specialty),
            hospital: salary.hospital ?? "Unknown",
            pay: Math.abs(
              typeof salary.pay === "string"
                ? parseFloat(salary.pay.replace(/[$,]/g, "")) || 0
                : salary.pay ?? 0
            ),
          };
        });

        console.log("Fetched Salary Data for Scatterplot Page:", salaries);
        setData(salaries);
      } catch (error) {
        console.error("Error fetching salaries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return loading ? (
    <div className="text-center p-5">Loading visuals...</div>
  ) : (
    <SalaryVis data={data} />
  );
}
