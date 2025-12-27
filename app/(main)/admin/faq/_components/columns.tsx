"use client";

import { ColumnDef } from "@tanstack/react-table";
import Actions from "./Actions";
import { Faq } from "@/lib/generated/prisma/client";
import Link from "@/components/link";
import { Pages, Routes } from "@/app/types/enums";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.



export const columns: ColumnDef<Faq>[] = [
  {
    accessorKey: "question",
    cell: ({ cell, row }) => {
      return (
        <Link
          className="text-rose-400"
          href={`${Routes.ADMIN}/${Pages.FAQ}/${Pages.EDIT}/${row.original.id}`}
        >
          {row.original.question}
        </Link>
      );
    },
  },

  {
    accessorKey: "answer",
    header: "الاجابة",
  },
  {
    id: "actions",
    header: "تحكم",
    cell: ({ row }) => {
      return <Actions key={row.original.id} row={row} />;
    },
  },
];
