"use client";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { formatDateToLocal } from "@/lib/utils";

type ParkingRate = {
  id: string;
  rate: number;
  createdAt: Date;
  updatedAt: Date;
};

export const columns: ColumnDef<ParkingRate>[] = [
  
  {
    accessorKey: "rate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Hourly Rate" />
    ),
    cell: ({ row }) => {
      return <div className="font-medium">${row.getValue("rate")}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => {
      const dateStr = row.getValue("createdAt") as string;
      return <div>{formatDateToLocal(dateStr, "tr-TR")}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
