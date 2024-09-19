import { type FC, useMemo } from 'react'
import { motion } from 'framer-motion'
import { cardVariants } from '../../../../animations'
import {
  useReactTable,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table'
import { useSignature } from '../../../../hooks'

// Define os dados da tabela
interface Invoice {
  name: string
  date: string
  status: string
  valueInvested: string
}

export const MyInvoices: FC = () => {
  const { getAllSignaturesByUserId } = useSignature()
  const { data: signatures } = getAllSignaturesByUserId

  // Dados da tabela - Mapeia as assinaturas para o formato de Invoice
  const data = useMemo<Invoice[]>(
    () =>
      signatures?.map((signature) => ({
        name: signature.kirvano_type,
        date: new Date(signature.created_at).toLocaleDateString(),
        status: signature.status,
        valueInvested: signature.price,
      })) || [],
    [signatures],
  )

  // Define a estrutura das colunas
  const columnHelper = createColumnHelper<Invoice>()

  const columns = useMemo(
    () => [
      columnHelper.accessor('name', {
        header: 'Nome',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('date', {
        header: 'Data',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('valueInvested', {
        header: 'Valor Investido',
        cell: (info) => info.getValue(),
      }),
    ],
    [columnHelper],
  )

  // Criação da instância da tabela com paginação
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    pageCount: Math.ceil(data.length / 5), // Define o número total de páginas
    state: {
      pagination: {
        pageIndex: 0,
        pageSize: 5,
      },
    },
    onPaginationChange: (updater) => {
      table.setState((prev) => ({
        ...prev,
        pagination:
          typeof updater === 'function' ? updater(prev.pagination) : updater,
      }))
    },
  })

  return (
    <section className="w-full mt-12">
      {/* Cabeçalho */}
      <motion.header
        className="flex flex-col border-b-[1px] border-solid border-[#333333] mb-6 pb-3"
        initial="hidden"
        animate="visible"
        variants={cardVariants}
      >
        <span className="text-white text-lg flex items-start justify-start">
          Faturas
        </span>
        <span className="text-[#909090] text-sm mt-4">
          Listagem de faturas.
        </span>
      </motion.header>

      {/* Tabela de Faturas */}
      <motion.div
        className="w-full mt-6"
        initial="hidden"
        animate="visible"
        variants={cardVariants}
      >
        <table className="min-w-full bg-[#1e1e1e]">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="text-white text-left p-4 border-b border-[#333]"
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
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="text-[#909090] p-4 border-b border-[#333]"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Paginação */}
        <div className="flex justify-between items-center mt-4">
          <button
            className="px-4 py-2 bg-[#333333] text-white rounded"
            onClick={() =>
              table.setPageIndex(table.getState().pagination.pageIndex - 1)
            }
            disabled={table.getState().pagination.pageIndex === 0}
          >
            Anterior
          </button>
          <span className="text-white">
            Página {table.getState().pagination.pageIndex + 1} de{' '}
            {table.getPageCount()}
          </span>
          <button
            className="px-4 py-2 bg-[#333333] text-white rounded"
            onClick={() =>
              table.setPageIndex(table.getState().pagination.pageIndex + 1)
            }
            disabled={
              table.getState().pagination.pageIndex >= table.getPageCount() - 1
            }
          >
            Próxima
          </button>
        </div>
      </motion.div>
    </section>
  )
}
