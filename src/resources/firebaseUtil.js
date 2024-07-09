import { collection, addDoc } from "firebase/firestore";
import { db } from "@/resources/firebase";

export async function addSalaryData(data) {
  const { emailAddress, location, date, specialty, yearsExperience, pay } = data;

  const salaryData = {
    emailAddress: emailAddress,
    location: location,
    date: new Date(date),
    specialty: specialty,
    experience: yearsExperience,
    pay: pay,
  };

  const docRef = await addDoc(collection(db, 'salaries'), salaryData);
  return docRef.id;
}