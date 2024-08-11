import Link from 'next/link';
import React from 'react';
import { Allura } from 'next/font/google';
import { Icons } from '@/components/icons';
import { CircleParking } from 'lucide-react';
import { siteConfig } from '@/config/site';

const allura = Allura({ subsets: ['latin'], weight: '400' });

export const SiteLogo = () => {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <CircleParking className="h-8 w-8" />
      <span className="inline-block font-bold">{siteConfig.name}</span>
    </Link>
  );
};
