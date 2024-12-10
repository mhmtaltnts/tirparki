"use client";

import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { EntryActionCell } from "./entry-action-cell";

import { createColumnHelper } from "@tanstack/react-table";
import { ColumnDef } from "@tanstack/react-table";
import type { ParkEntryT } from "@/lib/schemas/entry-schemas";
import { formatDateToLocal } from "@/lib/utils";

export const columns: ColumnDef<ParkEntryT>[] = [
  {
    accessorKey: "trailer",
    id: "Dorse",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="DORSE" />
    ),
  },

  {
    accessorKey: "truck",
    id: "Çekici",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ÇEKİCİ" />
    ),
  },
  {
    accessorKey: "customer.name",
    id: "Müşteri",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="FİRMA" />
    ),
  },

  {
    accessorKey: "cargo",
    id: "Kargo",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="KARGO" />
    ),
  },
  {
    accessorKey: "customs.desc",
    id: "Gümrük",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="GÜMRÜK" />
    ),
  },
  {
    accessorKey: "invoice.status",
    id: "Ödeme Durumu",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ÖDEME DURUMU" />
    ),
    cell: ({ row }) => {
      let status = row?.getValue<string>("Ödeme Durumu");
      if (status === "PAID") {
        return <div className="text-green-500">Ödendi</div>;
      } else {
        return <div className="text-red-500">Beklemede</div>;
      }
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },

  {
    accessorKey: "createdAt",
    id: "Giriş Tarihi",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="GİRİŞ TARİHİ" />
    ),
    cell: ({ row }) => {
      let dateStr = row?.getValue<string>("Giriş Tarihi");

      return (
        <div className="text-right font-medium">
          {formatDateToLocal(dateStr, "tr-TR")}
        </div>
      );
    },
  },

  {
    id: "actions",
    cell: (prop) => <EntryActionCell row={prop.row} />,
  },
];
