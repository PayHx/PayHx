import React from 'react';
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
import salaries from '@/resources/MasterData.json';
// import from firebase

/* interface Salary {
  emailAddress?: string,
  location?: string,
  date?: string | number | Date,
  specialty?: string,
  experience?: number,
  pay?: number
} */

interface Salary {
  "Month Year"?: string | number,
  State?: string,
  "City "?: string | number,
  "Years of Experience "?: string | number,
  "Specialty (Cardiac, ER, GI, L&D, etc)"?: string | number,
  "Hourly Base Pay (Diff not included)"?: string | number,
  "Shift Diff Amount (if any) "?: string | number,
  "Type Of Shift Diff (nights, Baylor, Critical Care, Etc) "?: string | number
}

async function getSalaries(): Promise<Salary[]> {
  //const result = await fetch('http://localhost:4000/salaries')
  const results = salaries;

  return results;
}

/* const fetchSalaries = async (): Promise<Salary[]> => {
  const querySnapshot = await getDocs(collection(db, 'salaries'));
  const salaries = querySnapshot.docs.map(doc => doc.data() as Salary);

  return salaries;
} */
// location, data, specialty, experience, pay
export default async function Home() {
  const salaries = await getSalaries()

  if (!salaries) {
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
              <TableHead className="text-left table-cell table-header-sticky">Shift Diff Amount (if any)</TableHead>
              <TableHead className="text-left table-cell table-header-sticky">Type of Shift Diff (nights, Baylor, Critical Care, etc)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
          {salaries.map((salary, index) => (
            <TableRow key={index} className={index % 2 === 0 ? 'table-row-even' : 'table-row-odd'}>
              <TableCell className="text-left table-cell">{salary["Month Year"]}</TableCell>
              <TableCell className="text-left table-cell text-nowrap">{`${String(salary["City "] || "").trim()}, ${salary.State}`}</TableCell>
              <TableCell className="text-left table-cell">{salary["Years of Experience "]}</TableCell>
              <TableCell className="text-left table-cell">{salary["Specialty (Cardiac, ER, GI, L&D, etc)"]}</TableCell>
              <TableCell className="text-left table-cell">${salary["Hourly Base Pay (Diff not included)"]}/hr</TableCell>
              <TableCell className="text-left table-cell">{salary["Shift Diff Amount (if any) "]}</TableCell>
           <  TableCell className="text-left table-cell">{salary["Type Of Shift Diff (nights, Baylor, Critical Care, Etc) "]}</TableCell>
          </TableRow>
          ))}
          </TableBody>
        </Table>
      </div>
    </main>
  )
}