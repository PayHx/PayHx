'use client'
import React, { useEffect, useState, DO_NOT_USE_OR_YOU_WILL_BE_FIRED_CALLBACK_REF_RETURN_VALUES } from 'react';
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { strict } from 'assert';
//import salaries from '@/resources/TestData.json';
//import salaries from '@/resources/MasterData.json';
// import from firebase
import { collection, getDocs } from 'firebase/firestore';
import { db } from "@/resources/firebase";
import { firebase} from 'firebase/app';

interface Salary {
  emailAddress: string,
  location: string,
  date: firebase.firestore.Timestamp,
  specialty: string,
  experience: number,
  pay: number
}

/* interface Salary {
  "Month Year"?: string | number,
  State?: string,
  "City "?: string | number,
  "Years of Experience "?: string | number,
  "Specialty (Cardiac, ER, GI, L&D, etc)"?: string | number,
  "Hourly Base Pay (Diff not included)"?: string | number,
  "Shift Diff Amount (if any) "?: string | number,
  "Type Of Shift Diff (nights, Baylor, Critical Care, Etc) "?: string | number
} */

/* async function getSalaries(): Promise<Salary[]> {
  //const result = await fetch('http://localhost:4000/salaries')
  const results = salaries;

  return results;
} */

/* const fetchSalaries = async (): Promise<Salary[]> => {
  const querySnapshot = await getDocs(collection(db, 'salaries'));
  const salaries = querySnapshot.docs.map(doc => doc.data() as Salary);

  return salaries;
} */
// location, data, specialty, experience, pay
export default function Home() {
  //const salaries = await getSalaries()
  const [salaries, setSalaries] = useState<Salary[]>([]);

  useEffect(() => {
    const fetchSalaries = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'salaries'));
        const fetchedSalaries = querySnapshot.docs.map(doc => doc.data() as Salary);
        setSalaries(fetchedSalaries);
      } catch (error) {
        console.error('Error fetching salaries:', error);
        // Handle error state if needed
      }
    };

    fetchSalaries();
  }, []);

  if (!salaries || salaries.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <main className="p-4">
      <div className="table-container">
        <Table>
          <TableCaption>Powered by you</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left table-cell table-header-sticky">Date</TableHead>
              <TableHead className="text-left table-cell table-header-sticky">Location</TableHead>
              <TableHead className="text-left table-cell table-header-sticky">Experience</TableHead>
              <TableHead className="text-left table-cell table-header-sticky">Speciality</TableHead>
              <TableHead className="text-left table-cell table-header-sticky">Pay</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
          {salaries.map((salary, index) => (
            <TableRow key={index} className={index % 2 === 0 ? 'table-row-even' : 'table-row-odd'}>
              <TableCell className="text-left table-cell">{salary.date.toDate().toLocaleDateString()}</TableCell>
              <TableCell className="text-left table-cell text-nowrap">{`${String(salary.location|| "").trim()}`}</TableCell>
              <TableCell className="text-left table-cell">{salary.experience}</TableCell>
              <TableCell className="text-left table-cell">{salary.specialty}</TableCell>
              <TableCell className="text-left table-cell">${salary.pay}/hr</TableCell>
          </TableRow>
          ))}
          </TableBody>
        </Table>
      </div>
    </main>
  )
}