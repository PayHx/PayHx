import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { strict } from 'assert';
//import salaries from '@/resources/CaliforniaData.json';
import salaries from '@/resources/MasterData.json';

interface Salary {
  Timestamp?: string,
  "Month/Year"?: string,
  State?: string,
  "City "?: string,
  "Hospital Name/ Campus (Optional)"?: string,
  "Years of Experience "?: number,
  "Specialty (Cardiac, ER, GI, L&D, etc)"?: string,
  "Hourly Base Pay (Diff not included)"?: number,
  "Shift Diff Amount (if any) "?: number,
  "Type Of Shift Diff (nights, Baylor, Critical Care, Etc) "?: string
}

async function getSalaries(): Promise<Salary[]> {
  //const result = await fetch('http://localhost:4000/salaries')
  const result = salaries;

  return result
}

export default async function Home() {
  const salaries = await getSalaries()

  return (
    <main className="p-4">
      <div style={{maxHeight: 478, maxWidth:1100, margin: '33px 0px 0px 150px',  overflowY: 'auto', border: '1px solid black'}}>
      <Table>
        <TableCaption>Powered </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Timestamp</TableHead>
            <TableHead className="text-left">Month/Year</TableHead>
            <TableHead className="text-left">State</TableHead>
            <TableHead className="text-left w-[100px]">City</TableHead>
            <TableHead className="text-left">Hospital/Campus Name</TableHead>
            <TableHead className="text-left">Experience</TableHead>
            <TableHead className="text-left">Speciality</TableHead>
            <TableHead className="text-left">Pay</TableHead>
            <TableHead className="text-left">Shift Diff Amount (if any)</TableHead>
            <TableHead className="text-left">Type of Shift Diff (nights, Baylor, Critical Care, etc)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {salaries.map((salary) => (
            <TableRow key={salary.Timestamp}>
              <TableCell className="text-left">{salary.Timestamp}</TableCell>
              <TableCell className="text-left">{salary["Month/Year"]}</TableCell>
              <TableCell className="text-left">{salary.State}</TableCell>
              <TableCell className="text-left">{salary["City "]}</TableCell>
              <TableCell className="text-left">{salary["Hospital Name/ Campus (Optional)"]}</TableCell>
              <TableCell className="text-left">{salary["Years of Experience "]}</TableCell>
              <TableCell className="text-left">{salary["Specialty (Cardiac, ER, GI, L&D, etc)"]}</TableCell>
              <TableCell className="text-left">${salary["Hourly Base Pay (Diff not included)"]}/hr</TableCell>
              <TableCell className="text-left">{salary["Shift Diff Amount (if any) "]}</TableCell>
              <TableCell className="text-left">{salary["Type Of Shift Diff (nights, Baylor, Critical Care, Etc) "]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>
    </main>
  )
}