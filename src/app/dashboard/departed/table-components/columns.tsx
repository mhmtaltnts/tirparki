"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/data-table-column-header";

import { statuses } from "./data";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { formatDateToLocal } from "@/lib/utils";
import { type DepartedSchemaT } from "@/lib/schemas/departed-schemas";

export const columns: ColumnDef<DepartedSchemaT>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    meta: "hidden sm:inline-block",
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "trailer",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="DORSE" />
    ),
  },
  {
    accessorKey: "truck",
    id: "Getiren",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="GETİREN" />
    ),
    meta: "hidden md:table-cell",
  },

  {
    accessorKey: "exit.truck",
    id: "Götüren",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="GÖTÜREN" />
    ),
  },
  {
    accessorKey: "customer.name",
    id: "customer",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="FİRMA" />
    ),
    meta: "hidden sm:table-cell",
  },
  /* columnHelper.accessor('customs.desc', {
    id: 'Gümrük',
    meta: { className: 'hidden sm:table-block' },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="GÜMRÜK" />
    ),
  }), */
  {
    accessorKey: "customs.desc",
    id: "Gümrük",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="GÜMRÜK" />
    ),
    meta: "hidden md:table-cell",
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("Gümrük")}</div>,
  },
  /* columnHelper.accessor('invoice.status', {
    id: 'Ödeme statusu',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ÖDEME statusU" />
    ),
  }), */

  {
    accessorKey: "invoice.status",
    id: "Ödeme Durumu",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ÖDEME statusU" />
    ),
    meta: "hidden sm:table-cell",
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("Ödeme statusu"),
      );

      if (!status) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{status.label}</span>
        </div>
      );
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
      let dateStr = row.getValue("Giriş Tarihi") as string;
      //let istanbulOffset = 3 * 60;
      return (
        <span className="font-scargol text-left">
          {formatDateToLocal(dateStr, "tr-TR")}
        </span>
      );
    },
  },
  {
    accessorKey: "exit.createdAt",
    id: "Çıkış Tarihi",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ÇIKIŞ TARİHİ" />
    ),
    meta: "hidden sm:table-cell",
    cell: ({ row }) => {
      let dateStr = row.getValue("Çıkış Tarihi") as string;

      return (
        <span className="font-scargol text-left">
          {formatDateToLocal(dateStr, "tr-TR")}
        </span>
      );
    },
  },
];
