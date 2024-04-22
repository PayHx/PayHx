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

interface Salary {
  specialty: string,
  experience: number,
  city: string,
  pay: number
}

async function getSalaries(): Promise<Salary[]> {
  const result = await fetch('http://localhost:4000/salaries')

  return result.json()
}

export default async function Home() {
  const salaries = await getSalaries()

  return (
    <main className="p-4">
      <Table>
        <TableCaption>Powered </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead  className="w-[200px]">Specialty</TableHead>
            <TableHead className="text-right">Experience</TableHead>
            <TableHead className="text-right">City</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {salaries.map((salary) => (
            <TableRow key={salary.specialty}>
              <TableCell className="font-medium">{salary.specialty}</TableCell>
              <TableCell className="text-right">{salary.experience}</TableCell>
              <TableCell className="text-right">{salary.city}</TableCell>
              <TableCell className="text-right">${salary.pay}/hr</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  )
}