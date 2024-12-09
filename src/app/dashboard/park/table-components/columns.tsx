"use client";

import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { createColumnHelper } from "@tanstack/react-table";
import { ColumnDef } from "@tanstack/react-table";
import type { ParkEntryType } from "@/lib/data/park-data";
import { formatDateToLocal } from "@/lib/utils";

const columnHelper = createColumnHelper<ParkEntryType>();

export const columns: ColumnDef<ParkEntryType>[] = [
  columnHelper.accessor("trailer", {
    id: "Dorse",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Dorse" />
    ),
  }),

  columnHelper.accessor("truck", {
    id: "Çekici",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Çekici" />
    ),
  }),
  {
    id: "Firma",
    accessorKey: "customer.name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Firma" />
    ),
  },

  columnHelper.accessor("createdAt", {
    id: "Giriş Tarihi",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Giriş Tarihi" />
    ),
    cell: ({ row }) => {
      let dateStr = row?.getValue<string>("Giriş Tarihi");

      return (
        <div className="text-left">{formatDateToLocal(dateStr, "tr-TR")}</div>
      );
    },
  }),
];
