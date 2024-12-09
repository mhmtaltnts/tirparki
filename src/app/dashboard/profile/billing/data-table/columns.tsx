import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { formatDateToLocal } from "@/lib/utils";
import { createColumnHelper } from "@tanstack/react-table";

type BillingT = {
  entry: {
    trailer: string;
    truck: string;
    createdAt: Date;
  };
  exit: {
    createdAt: Date;
  };
  invoice: {
    amount: number;
    status: string;
  };
};

const columnHelper = createColumnHelper<BillingT>();

const columns = [
  columnHelper.accessor("entry.trailer", {
    id: "Dorse",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Dorse" />
    ),
  }),
  columnHelper.accessor("entry.truck", {
    id: "Çekici",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Çekici" />
    ),
  }),
  columnHelper.accessor("entry.createdAt", {
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
  ,
];
