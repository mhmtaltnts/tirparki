'use client';

import { Dialog, DialogOverlay, DialogContent } from '@/components/ui/dialog';
import { AlertConcustomertion } from './alert-concustomertion';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function Modal({ children }) {
  const [showExitConcustomertion, setShowExitConcustomertion] = useState(false);
  const router = useRouter();

  const closeModal = () => {
    router.back();
  };

  const handleOpenChange = () => {
    const isUserFormModified = localStorage.getItem('userFormModified');
    if (isUserFormModified && JSON.parse(isUserFormModified)) {
      setShowExitConcustomertion(true);
    } else {
      router.back();
    }
  };

  return (
    <Dialog defaultOpen={true} open={true} onOpenChange={handleOpenChange}>
      <DialogOverlay className="bg-transparent">
        <DialogContent className="overflow-y-hidden">{children}</DialogContent>
      </DialogOverlay>
    </Dialog>
  );
}
