/* import Search from '@/components/search'; */

import React from 'react';
import CustomersTable from './customers-table';
import prisma from '@/lib/prisma';

export default async function customerPage() {
  const customers = await prisma.customer.findMany();
  return <CustomersTable customers={customers} />;
}
