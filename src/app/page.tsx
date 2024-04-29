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
import salaries from '@/resources/CaliforniaData.json';

interface Salary {
  Timestamp?: string,
  "City "?: string,
  "Hospital Name/Campus"?: string,
  "Years of Experience "?: number,
  "Specialty (Cardiac, ER, GI, L&D, etc)"?: string,
  "Hourly Base Pay (Diff not included)"?: number,
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
            <TableHead className="text-left w-[100px]">City</TableHead>
            <TableHead className="text-left">Hospital/Campus Name</TableHead>
            <TableHead className="text-left">Experience</TableHead>
            <TableHead className="text-left">Speciality</TableHead>
            <TableHead className="text-left">Pay</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {salaries.map((salary) => (
            <TableRow key={salary.Timestamp}>
              <TableCell className="text-left">{salary.Timestamp}</TableCell>
              <TableCell className="text-left">{salary["City "]}</TableCell>
              <TableCell className="text-left">{salary["Hospital Name/Campus"]}</TableCell>
              <TableCell className="text-left">{salary["Years of Experience "]}</TableCell>
              <TableCell className="text-left">{salary["Specialty (Cardiac, ER, GI, L&D, etc)"]}</TableCell>
              <TableCell className="text-left">${salary["Hourly Base Pay (Diff not included)"]}/hr</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>
    </main>
  )
}