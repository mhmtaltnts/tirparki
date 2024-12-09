/* import Search from '@/components/search'; */

import React from 'react';
import CustomersTable from './customers-table';
import prisma from '@/lib/prisma';

export default async function customerPage() {
  const customers = await prisma.user.findMany({where: {role: 'USER'}});
  return <CustomersTable customers={customers} />;
}
