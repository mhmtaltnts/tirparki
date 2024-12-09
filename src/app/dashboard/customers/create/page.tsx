import React from 'react';
import { CreateCustomerForm } from './create-customer-form';
import prisma from '@/lib/prisma';
import { auth } from '@/app/api/auth/[...nextauth]/auth';

export default async function CrateCustomerPage() {
  const session = await auth();
  const customers = await prisma.user.findMany();
  return <CreateCustomerForm user={session?.user} />;
}
