"use client";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";

export default function Mybreadcrub() {
  const pathname = usePathname();
  const paths = pathname.split("/");

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem key="home">
          <BreadcrumbLink href="/">Ana Sayfa</BreadcrumbLink>
        </BreadcrumbItem>
        {paths.map((path, index) => {
          const href = `${paths.slice(0, index + 1).join("/")}`;
          console.log(href);
          const isLast = index === paths.length - 1;

          return (
            <React.Fragment key={index}>
              <BreadcrumbItem key={index}>
                {isLast ? (
                  <BreadcrumbPage>
                    {BreadCrumbList.find((item) => item.path === href)?.name}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={href}>
                    {BreadCrumbList.find((item) => item.path === href)?.name}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator key={`${path}-separator`} />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

const BreadCrumbList = [
  {
    path: "/dashboard",
    name: "Yönetim Paneli",
  },
  {
    path: "/dashboard/park",
    name: "Parktaki Araçlar",
  },
  {
    path: "/dashboard/departed",
    name: "Çıkan Araçlar",
  },
  {
    path: "/dashboard/entry",
    name: "Araç Çıkışı",
  },
  {
    path: "/dashboard/entry/new",
    name: "Yeni Araç Girişi",
  },
  {
    path: "/dashboard/users",
    name: "Tüm Kullanıcılar",
  },
];
