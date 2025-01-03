'use client';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { Sidebar } from './Sidebar';
import { useSheetStore } from '@/store/sheet';

export function MobileMenu() {
  const { open, updateOpen } = useSheetStore((state) => ({
    open: state.open,
    updateOpen: state.updateOpen,
  }));

  return (
    <div className='md:hidden'>
      <Sheet open={open} onOpenChange={(open) => updateOpen(open)}>
        <SheetTrigger asChild>
          <Menu />
        </SheetTrigger>
        <SheetContent side='left' className='p-0'>
          <Sidebar />
        </SheetContent>
      </Sheet>
    </div>
  );
}
