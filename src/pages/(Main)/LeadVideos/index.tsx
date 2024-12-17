import { motion } from 'framer-motion'
import { Header } from './components/Header'
import { type FC, useMemo, useState } from 'react'
import { Button, HeaderFolder, Input } from '@/components'
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  createColumnHelper,
  getPaginationRowModel,
} from '@tanstack/react-table'


interface Contact {
  name: string
  email: string
  phone: string
}

export const LeadVideos: FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [contacts] = useState<Contact[]>([
    { name: 'João Silva', email: 'joao@email.com', phone: '000.000.000-00' },
    { name: 'Maria Lima', email: 'maria@email.com', phone: '111.111.111-11' },
    { name: 'Carlos Souza', email: 'carlos@email.com', phone: '222.222.222-22' },
  ])

  const filteredData = useMemo(
    () =>
      contacts.filter(
        (contact) =>
          contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contact.phone.includes(searchTerm),
      ),
    [searchTerm, contacts],
  )

  const columnHelper = createColumnHelper<Contact>()

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
    data: filteredData,
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
    <section className="w-full max-h-screen mx-8 overflow-auto pr-4 pb-28">
      <HeaderFolder name={'Teste'} />
      <Header />
      {/* Tabela */}
      <motion.div
        className="w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
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
    </section>
  )
}
