"use client";

import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { EntryActionCell } from "./entry-action-cell";

import { createColumnHelper } from "@tanstack/react-table";
import { ColumnDef } from "@tanstack/react-table";
import type { ParkEntryType } from "@/lib/data/entry-data";
import { formatDateToLocal } from "@/lib/utils";

const columnHelper = createColumnHelper<ParkEntryType>();

export const columns: ColumnDef<ParkEntryType>[] = [
  columnHelper.accessor("trailer", {
    id: "Dorse",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="DORSE" />
    ),
  }),

  columnHelper.accessor("truck", {
    id: "Çekici",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ÇEKİCİ" />
    ),
  }),
  columnHelper.accessor("customer.name", {
    id: "Müşteri",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="FİRMA" />
    ),
  }),

  columnHelper.accessor("cargo", {
    id: "Kargo",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="KARGO" />
    ),
  }),
  columnHelper.accessor("customs.desc", {
    id: "Gümrük",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="GÜMRÜK" />
    ),
  }),
  columnHelper.accessor("invoice.status", {
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
  }),

  columnHelper.accessor("createdAt", {
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
  }),

  columnHelper.display({
    id: "actions",
    cell: (prop) => <EntryActionCell row={prop.row} />,
  }),
];
