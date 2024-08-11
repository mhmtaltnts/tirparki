import EntrySideNav from '@/components/sidebar/entry-side-nav';
import React from 'react';

export default function UsersLayout({ children }) {
  return (
    <section className="flex min-h-screen w-full flex-col bg-muted/40">
      <EntrySideNav />
      <div className="md:ml-[56px]">{children}</div>
    </section>
  );
}
