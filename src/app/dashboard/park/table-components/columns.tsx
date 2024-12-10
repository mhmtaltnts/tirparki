"use client";

import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { createColumnHelper } from "@tanstack/react-table";
import { ColumnDef } from "@tanstack/react-table";
import type { ParkPublicType } from "@/lib/schemas/park-schemas";
import { formatDateToLocal } from "@/lib/utils";

const columnHelper = createColumnHelper<ParkPublicType>();

export const columns: ColumnDef<ParkPublicType>[] = [
  {
    accessorKey: "trailer",
    id: "Dorse",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Dorse" />
    ),
  },

  {
    accessorKey: "truck",
    id: "Çekici",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Çekici" />
    ),
  },
  {
    id: "Firma",
    accessorKey: "customer.name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Firma" />
    ),
  },

  {
    accessorKey: "createdAt",
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
  },
];
