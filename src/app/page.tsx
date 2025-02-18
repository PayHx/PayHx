"use client"

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

// salaries from json
//import salaries from '@/resources/TestData.json';
import salaries from '@/resources/MasterData.json';

// salaries from firebase
import { collection, getDocs } from 'firebase/firestore';
import { db } from "@/resources/firebase";
import { getEnvironmentData } from 'worker_threads';

import { Payment, columns } from "@/components/columns"
import { DataTable } from "@/components/data-table"

async function getData(): Promise<Payment[]> {
  try {
    const querySnapshot = await getDocs(collection(db, "your_collection_name"));
    
    return querySnapshot.docs.map(doc => {
      const salary = doc.data(); // Get document data

      return {
        location: `${salary.city}, ${salary.state}`,
        date: salary.date,
        city: salary.city,
        state: salary.state,
        experience: salary.experience,
        specialty: salary.specialty,
        hospital: salary.hospital,
        union: salary.union,
        pay: salary.pay,
        shiftDiffType: salary.shiftDiffType === "NA" || salary.shiftDiffType === null ? "" : String(salary.shiftDiffType),
        shiftDiffPay: salary.shiftDiffPay ?? null
      };
    });
  } catch (error) {
    console.error("Error fetching salaries:", error);
    return [];
  }
}


export default function Home() {
  const [data, setData] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "salaries"));
        const salaries = querySnapshot.docs.map(doc => {
          const salary = doc.data();
          return {
            location: `${salary.city}, ${salary.state}`,
            date: salary.date,
            city: salary.city,
            state: salary.state,
            experience: salary.experience,
            specialty: salary.specialty,
            hospital: salary.hospital,
            union: salary.union,
            pay: salary.pay,
            shiftDiffType: salary.shiftDiffType === "NA" || salary.shiftDiffType === null ? "" : String(salary.shiftDiffType),
            shiftDiffPay: salary.shiftDiffPay ?? null
          };
        });

        setData(salaries);
      } catch (error) {
        console.error("Error fetching salaries:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <div className="text-center p-5">Loading...</div>;

  return (
    <div className="container mx-auto py-10 max-w-screen-2xl">
      <DataTable columns={columns} data={data} />
    </div>
  ) 
}