"use client"

import { ColumnDef } from "@tanstack/react-table"
import { SortingFn } from "@tanstack/react-table";
import { parse } from "date-fns"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"

export type Payment = {
    date: string,
    state: string,
    city: string,
    specialty: string | null,
    hospital: string | null | undefined,
    union: string | null | undefined,
    pay: number,
    experience: number,
    shiftType: string | null | undefined,
    shiftDiff: number | null | undefined,
  }

  const normalizeDate = (dateString: string): string => {
    // Map of full months to abbreviated months
    const monthMap: Record<string, string> = {
      January: "Jan",
      February: "Feb",
      March: "Mar",
      April: "Apr",
      May: "May",
      June: "Jun",
      July: "Jul",
      August: "Aug",
      September: "Sep",
      October: "Oct",
      November: "Nov",
      December: "Dec",
    };
  
    // Split the date string into month and year
    const [month, year] = dateString.split(" ");
  
    // Replace the full month name with the abbreviated month
    const shortMonth = monthMap[month] || month; // Fallback to the original value if not found
  
    return `${shortMonth} ${year}`;
  };
  
  const dateSortingFn: SortingFn<any> = (rowA, rowB, columnId) => {
    const format = "MMM yyyy"; // Adjust format for short months
    const dateA = parse(normalizeDate(rowA.getValue<string>(columnId)), format, new Date());
    const dateB = parse(normalizeDate(rowB.getValue<string>(columnId)), format, new Date());
  
    return dateA.getTime() - dateB.getTime(); // Ascending order
  };
  
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
      },
      cell: ({ row }) => {
        const rawDate = row.getValue<string>("date");
        const normalizedDate = normalizeDate(rawDate); // Normalize for display
        return <span>{normalizedDate}</span>;
      },
      sortingFn: dateSortingFn,
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
      accessorKey: "hospital",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Hospital
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: "union",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Union
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
      }
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