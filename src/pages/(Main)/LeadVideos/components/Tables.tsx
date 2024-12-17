import { useMemo } from 'react'
import { Button } from '@/components'
import { motion } from 'framer-motion'
import type { LeadFormVideo } from '@/types'
import {
    flexRender,
    useReactTable,
    getCoreRowModel,
    createColumnHelper,
    getPaginationRowModel,
} from '@tanstack/react-table'

interface TablesProps {
    filteredData: LeadFormVideo[] | undefined
}

export const Tables = ({ filteredData }: TablesProps) => {
    const columnHelper = createColumnHelper<LeadFormVideo>()

    const columns = useMemo(
        () => [
            columnHelper.accessor('name', {
                header: 'Nome',
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor('email', {
                header: 'Email',
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor('phone', {
                header: 'Telefone',
                cell: (info) => info.getValue(),
            }),
        ],
        [columnHelper],
    )

    const table = useReactTable({
        data: filteredData || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        state: {
            pagination: {
                pageIndex: 0,
                pageSize: 5,
            },
        },
    })

    return (
        <motion.div
            className="w-full"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
        >
            <table className="min-w-full  rounded-md">
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id} className="border-b border-gray-700">
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    className="text-white p-3 text-left uppercase text-sm"
                                >
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext(),
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id} className="hover:bg-blue-500 transaction-all ">
                            {row.getVisibleCells().map((cell) => (
                                <td
                                    key={cell.id}
                                    className="text-gray-300 p-3"
                                >
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>


            <div className="flex justify-between items-center mt-4">
                <Button
                    className="px-4 py-2 bg-gray-600 text-white rounded disabled:bg-gray-700"
                    onClick={() =>
                        table.setPageIndex(table.getState().pagination.pageIndex - 1)
                    }
                    disabled={table.getState().pagination.pageIndex === 0}
                >
                    Anterior
                </Button>
                <span className="text-gray-300">
                    Página {table.getState().pagination.pageIndex + 1} de{' '}
                    {table.getPageCount()}
                </span>
                <Button
                    className="px-4 py-2 bg-gray-600 text-white rounded disabled:bg-gray-700"
                    onClick={() =>
                        table.setPageIndex(table.getState().pagination.pageIndex + 1)
                    }
                    disabled={
                        table.getState().pagination.pageIndex >= table.getPageCount() - 1
                    }
                >
                    Próxima
                </Button>
            </div>
        </motion.div>
    )
}