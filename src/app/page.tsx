'use client'
import React, { useEffect, useState} from 'react';
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { strict } from 'assert';
import salaries from '@/resources/TestData.json';
//import salaries from '@/resources/MasterData.json';
// import from firebase
import { collection, getDocs } from 'firebase/firestore';
import { db } from "@/resources/firebase";
import { getEnvironmentData } from 'worker_threads';

// interface Salary {
//   emailAddress: string,
//   location: string,
//   date: any,
//   specialty: string,
//   experience: number,
//   pay: number
// }

/* interface Salary {
  "Month Year"?: string | number,
  State?: string,
  City?: string | number,
  "Years of Experience"?: string | number,
  "Specialty (Cardiac, ER, GI, L&D, etc)"?: string | number,
  "Hourly Base Pay (Diff not included)"?: string | number,
  "Shift Diff Amount (if any)"?: string | number,
  "Type Of Shift Diff (nights, Baylor, Critical Care, Etc)"?: string | number
} */

/* TESTING */
type Payment = {
  date: string
  state: string,
  city: string,
  experience: number
  specialty: string
  pay: number
  shiftType: string
  shiftDiff: number | null | undefined
}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    }
  },
  {
    accessorKey: "location",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Location
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    }
  },
  {
    accessorKey: "experience",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-full flex justify-center"
        >
          Experience
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <div className="text-center font-medium">{row.getValue("experience")}</div>
    },
  },
  {
    accessorKey: "specialty",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Specialty
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "shiftType",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Shift Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "shiftDiff",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Shift Diff
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const shiftDiff = row.getValue("shiftDiff");
  
      return (
        <div className="text-right" style={{ paddingRight: '100px' }}>
          {shiftDiff != null ? shiftDiff : ""}
        </div>
      );
    },
  },
  {
    accessorKey: "pay",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-full flex justify-end"
        >
          Pay
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("pay"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
 
      return <div className="text-right font-medium">{formatted}/hr</div>
    },
  },
]

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

async function getData(): Promise<Payment[]> {
  return salaries.map(salary => ({
    ...salary,
    location: `${salary.city}, ${salary.state}`
  }));
}
/* TESTING */

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

export default async function Home() {
  const data = await getData()
  // get data from JSON FILE
  //const salaries = await getSalaries()
  //const salaries = await getSalaries()

  // get data from DATABASE
  // const [salaries, setSalaries] = useState<Salary[]>([]);

  // useEffect(() => {
  //   const fetchSalaries = async () => {
  //     try {
  //       const querySnapshot = await getDocs(collection(db, 'salaries'));
  //       const fetchedSalaries = querySnapshot.docs.map(doc => doc.data() as Salary);
  //       setSalaries(fetchedSalaries);
  //     } catch (error) {
  //       console.error('Error fetching salaries:', error);
  //       // Handle error state if needed
  //     }
  //   };

  //   fetchSalaries();
  // }, []);

  // if (!salaries || salaries.length === 0) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
    // FROM DATABASE
    // <main className="p-4">
    //   <div className="table-container">
    //     <Table>
    //       <TableCaption>Powered by you</TableCaption>
    //       <TableHeader>
    //         <TableRow>
    //           <TableHead className="text-left table-cell table-header-sticky">Date</TableHead>
    //           <TableHead className="text-left table-cell table-header-sticky">Location</TableHead>
    //           <TableHead className="text-left table-cell table-header-sticky">Experience</TableHead>
    //           <TableHead className="text-left table-cell table-header-sticky">Speciality</TableHead>
    //           <TableHead className="text-left table-cell table-header-sticky">Pay</TableHead>
    //         </TableRow>
    //       </TableHeader>
    //       <TableBody>
    //       {salaries.map((salary, index) => (
    //         <TableRow key={index} className={index % 2 === 0 ? 'table-row-even' : 'table-row-odd'}>
    //           <TableCell className="text-left table-cell">{salary.date.toDate().toLocaleDateString()}</TableCell>
    //           <TableCell className="text-left table-cell text-nowrap">{`${String(salary.location|| "").trim()}`}</TableCell>
    //           <TableCell className="text-left table-cell">{salary.experience}</TableCell>
    //           <TableCell className="text-left table-cell">{salary.specialty}</TableCell>
    //           <TableCell className="text-left table-cell">${salary.pay}/hr</TableCell>
    //       </TableRow>
    //       ))}
    //       </TableBody>
    //     </Table>
    //   </div>
    // </main>

    // FROM JSON FILE
    /*<main className="p-4">
      <div className="table-container">
        <Table>
          <TableCaption>Powered </TableCaption>
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
              <TableCell className="text-left table-cell text-nowrap">{salary["Month Year"]}</TableCell>
              <TableCell className="text-left table-cell text-nowrap">{`${String(salary.City || "").trim()}, ${salary.State}`}</TableCell>
              <TableCell className="text-left table-cell">{salary["Years of Experience"]}</TableCell>
              <TableCell className="text-left table-cell">{salary["Specialty (Cardiac, ER, GI, L&D, etc)"]}</TableCell>
              <TableCell className="text-left table-cell">${salary["Hourly Base Pay (Diff not included)"]}/hr</TableCell>
              <TableCell className="text-left table-cell">{salary["Shift Diff Amount (if any)"]}</TableCell>
             <TableCell className="text-left table-cell">{salary["Type Of Shift Diff (nights, Baylor, Critical Care, Etc)"]}</TableCell>
            </TableRow>
          ))}
          </TableBody>
        </Table>
      </div>
    </main>*/
  ) 
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  })
 
  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter specialty..."
          value={(table.getColumn("specialty")?.getFilterValue() as string) ?? ""}
          onChange={(event) => 
            table.getColumn("specialty")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="background-color">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, index) => (
                <TableRow
                  key={index}
                  data-state={row.getIsSelected() && "selected"}
                  className={index % 2 === 0 ? 'table-row-even' : 'table-row-odd'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  )
}