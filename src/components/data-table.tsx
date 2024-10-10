"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

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
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"  


  interface DataTableProps<TData, TValue> {
    columns?: ColumnDef<TData, TValue>[]
    data?: TData[]
  }

  export function DataTable<TData, TValue>({
    columns = [],
    data = [],
  }: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
      []
    )
  
    // Debugging: Check if data and columns are defined and properly typed
    React.useEffect(() => {
        console.log('Data:', data);
        console.log('Columns:', columns);
    }, [data, columns]);

    if (!data || !columns) {
        console.error('Data or Columns is undefined');
    }

    // Check for empty data or columns before using useReactTable
    if (data.length === 0 || columns.length === 0) {
        console.error('Data or Columns is empty');
    }

    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
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
          <div className="flex items-center space-x-2 py-4">
            <Input
              placeholder="Filter specialty..."
              value={(table.getColumn("specialty")?.getFilterValue() as string) ?? ""}
              onChange={(event) => 
                table.getColumn("specialty")?.setFilterValue(event.target.value)
              }
              className="w-50"
            />

            <Input
              placeholder="Filter location..."
              value={(table.getColumn("location")?.getFilterValue() as string) ?? ""}
              onChange={(event) => 
                table.getColumn("location")?.setFilterValue(event.target.value)
              }
              className="w-50"
            />
          </div>
    
          {/*overflow-y-auto creates a scrollable area in table */}       
          <div className="rounded-md border max-h-[40rem]">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id} className="sticky top-0 bg-white shadow-md z-10">
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
      </div>
    )
  }