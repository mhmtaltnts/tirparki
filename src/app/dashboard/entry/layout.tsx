import EntrySideNav from "@/components/sidebar/entry-side-nav";
import React from "react";

export default function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex min-h-screen w-full flex-col bg-muted/40">
      {children}
    </section>
  );
}
