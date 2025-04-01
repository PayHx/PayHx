// What the columns look like for the data-table. Formatting for date
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { SortingFn } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Timestamp } from "firebase/firestore";

export type SalaryData = {
  date: Timestamp,
  state: string,
  city: string,
  specialty: string | null,
  hospital: string | null | undefined,
  union: string | null | undefined,
  pay: number | null | undefined,
  experience: number,
  shiftDiffType: string | null | undefined,
  shiftDiffPay: number | null | undefined,
}

const dateSortingFn: SortingFn<any> = (rowA, rowB, columnId) => {
  const dateA: Timestamp = rowA.getValue<Timestamp>(columnId);
  const dateB: Timestamp = rowB.getValue<Timestamp>(columnId);

  // ✅ If both dates are null, consider them equal
  if (!dateA && !dateB) return 0;

  // ✅ If dateA is null, move it to the bottom
  if (!dateA) return 1;

  // ✅ If dateB is null, move it to the bottom
  if (!dateB) return -1;

  // ✅ Safe to call .toDate() now
  return dateA.toDate().getTime() - dateB.toDate().getTime();
};

export const columns: ColumnDef<SalaryData>[] = [
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
      const timestamp = row.getValue<Timestamp | null | undefined>("date");

      // ✅ Check if timestamp is null before calling .toDate()
      if (!timestamp) {
        return <span>-</span>; // Show "-" for missing dates
      }

      const formattedDate = timestamp.toDate().toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      });

      return <span>{formattedDate}</span>;
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
    cell: ({ row }) => {
      const hospital = row.getValue<string | number | null | undefined>("hospital");

      if (!hospital) {
        return "-";
      }

      return <div>{hospital}</div>
    }
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
    cell: ({ row }) => {
      const union = row.getValue<string | number | null | undefined>("union");

      if (!union) {
        return "-";
      }

      return <div>{union}</div>
    }
  },
  {
    accessorKey: "shiftDiffType",
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
    cell: ({ row }) => {
      const shiftDiffType = row.getValue<string | number | null | undefined>("shiftDiffType");

      if (!shiftDiffType || shiftDiffType === "NA" || shiftDiffType === "na") {
        return "-";
      }

      return <div>{shiftDiffType}</div>
    }
  },
  {
    accessorKey: "shiftDiffPay",
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
      const shiftDiffPay = row.getValue<string | number | null | undefined>("shiftDiffPay");

      if (!shiftDiffPay || shiftDiffPay === "NA" || shiftDiffPay === "na") {
        return "-";
      }

      return <div>{shiftDiffPay}</div>
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
      const rawValue = row.getValue<number | string | null | undefined>("pay");

      // If null/undefined/0, show a dash
      if (!rawValue) {
        return <div className="text-right font-medium">-</div>;
      }

      let amount: number;

      // Handle string with "$" or comma
      if (typeof rawValue === "string") {
        const cleaned = rawValue.replace(/[^0-9.]/g, ""); // Remove $ and commas
        amount = parseFloat(cleaned);
      } else {
        amount = rawValue;
      }

      if (isNaN(amount)) {
        return <div className="text-right font-medium">-</div>;
      }

      return (
        <div className="text-right font-medium">${amount}/hr</div>
      );
    },
  },
]