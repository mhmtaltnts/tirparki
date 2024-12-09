"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

import { usePathname } from "next/navigation";

type ItemType = {
  title: string;
  href: string;
};

const MainLink = ({ item }: { item: ItemType }) => {
  const pathName = usePathname();

  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center text-sm font-medium text-muted-foreground",
        {
          "rounded-md p-2 underline underline-offset-4 brightness-150":
            pathName.split("/")[1] === item.href.split("/")[1],
        },
      )}
    >
      {item.title}
    </Link>
  );
};

export default MainLink;
