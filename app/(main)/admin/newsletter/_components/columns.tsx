"use client";

import { Status } from "@/app/types/enums";
import { Newsletter } from "@/lib/generated/prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import Actions from "./Actions";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Newsletter>[] = [
  {
    accessorKey: "email",
    header: "البريد الالكتروني",
  },
  {
    accessorKey: "phone",
    header: "رقم الهاتف",
  },
  {
    accessorFn: ({ status }) => {
      return status === Status.ACTIVE ? "يمكن الارسال" : "غير مفعل";
    },
    header: "حالة الارسال",
  },

  {
    id: "actions",
    header: "تحكم",
    cell: ({ row }) => {
      return <Actions key={row.original.id} row={row} />;
    },
  },
];
