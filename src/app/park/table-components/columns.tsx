'use client';

import { DataTableColumnHeader } from '@/components/data-table-column-header';
import { createColumnHelper } from '@tanstack/react-table';
import { ColumnDef } from '@tanstack/react-table';
import type { ParkTrailerT } from '@/lib/schemas/park-schemas';
import { formatDateToLocal } from '@/lib/utils';

const columnHelper = createColumnHelper<ParkTrailerT>();

export const columns: ColumnDef<ParkTrailerT>[] = [
  columnHelper.accessor('trailer', {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="DORSE" />
    ),
  }),

  columnHelper.accessor('truck', {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="GETİREN" />
    ),
  }),
  columnHelper.accessor('customer.name', {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="FİRMA" />
    ),
  }),

  columnHelper.accessor('createdAt', {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="GİRİŞ TARİHİ" />
    ),
    cell: ({ row }) => {
      let dateStr = row?.getValue<string>('createdAt');

      return (
        <div className="text-left font-scargol">
          {formatDateToLocal(dateStr, 'tr-TR')}
        </div>
      );
    },
  }),
];
