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
      getPaginationRowModel: getPaginationRowModel(),
      onSortingChange: setSorting,
      getSortedRowModel: getSortedRowModel(),
      onColumnFiltersChange: setColumnFilters,
      getFilteredRowModel: getFilteredRowModel(),
      state: {
        sorting,
        columnFilters,
      },
      initialState: {
        pagination: {
          pageSize: 50, // Hardcoded number of rows per page
        },
      },
    })

    const currentPage = table.getState().pagination.pageIndex;
    const pageCount = table.getPageCount();

    const renderPageNumbers = () => {
      const visiblePages = [];
      const maxVisiblePages = 5;
      
      // Always show first and last page
      visiblePages.push(0);
      
      if (currentPage > 2) {
          visiblePages.push('ellipsis-start');
      }

      for (let i = Math.max(1, currentPage - 1); i <= Math.min(pageCount - 2, currentPage + 1); i++) {
          visiblePages.push(i);
      }

      if (currentPage < pageCount - 3) {
          visiblePages.push('ellipsis-end');
      }
      
      visiblePages.push(pageCount - 1);

      return visiblePages;
  }

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
          <div className="max-h-[40rem] overflow-y-auto">
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
          </div>

          <div className="flex justify-center py-4">
          <Pagination>
              <PaginationContent>
                  <PaginationItem>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.preventDefault(); // Prevents default scrolling behavior
                        table.previousPage();
                      }}
                      disabled={!table.getCanPreviousPage()}
                    >
                    Previous
                    </Button>
                  </PaginationItem>

                  {renderPageNumbers().map((page, index) => (
                      page === 'ellipsis-start' || page === 'ellipsis-end' ? (
                          <PaginationEllipsis key={index} />
                      ) : (
                          <PaginationItem key={index}>
                              <PaginationLink
                                  href="#"
                                  onClick={(e) => {
                                    e.preventDefault();  // Prevents default scrolling behavior
                                    table.setPageIndex(Number(page));
                                  }}
                                  isActive={table.getState().pagination.pageIndex === page}
                              >
                                  {typeof page === 'number' ? page + 1 : page}
                              </PaginationLink>
                          </PaginationItem>
                      )
                  ))}

                  <PaginationItem>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.preventDefault(); // Prevents default scrolling behavior
                        table.nextPage();
                      }}
                      disabled={!table.getCanNextPage()}
                    >
                    Next
                    </Button>
                  </PaginationItem>
              </PaginationContent>
          </Pagination>
      </div>
        </div>
      )
  }