"use client";

import Image from "next/image";
import { UserEditActionCell } from "./user-action-cell";
import { roles } from "./data";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { UserDataT } from "@/lib/schemas/user-schemas";

export const columns: ColumnDef<UserDataT>[] = [
  {
    accessorKey: "name",
    header: "Ad Soyad",
  },
  { accessorKey: "email", header: "E-posta" },
  {
    accessorKey: "image",
    header: "Fotoğraf",
    cell: ({ row }) => {
      if (
        row.getValue("image") === undefined ||
        row.getValue("image") === null ||
        row.getValue("image") === ""
      ) {
        return <Image src="/noavatar.png" alt="" width={40} height={40} />;
      } else {
        return (
          <Image src={row.getValue("image")} alt="" width={40} height={40} />
        );
      }
    },
  },
  {
    accessorKey: "role",
    header: "Rol",
    cell: ({ row }) => {
      const role = roles.find((role) => role.value === row.getValue("role"));

      if (!role) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          {role.icon && (
            <role.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{role.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },

  {
    id: "actions",
    cell: (props) => <UserEditActionCell row={props.row} />,
  },
];
