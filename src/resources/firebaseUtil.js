import { collection, addDoc } from "firebase/firestore";
import { db } from "@/resources/firebase";

export async function addSalaryData(data) {
  const { emailAddress, city, state, date, specialty, hospital, zipcode, union, yearsExperience, pay, shiftDiffPay, shiftDiffType } = data;

  const salaryData = {
    emailAddress: emailAddress,
    city: city,
    state: state,
    date: new Date(date),
    specialty: specialty,
    hospital: hospital,
    zipcode: zipcode,
    union: union,
    experience: yearsExperience,
    pay: pay,
    shiftDiffPay: shiftDiffPay,
    shiftDiffType: shiftDiffType,
  };

  const docRef = await addDoc(collection(db, 'salaries'), salaryData);
  return docRef.id;
}