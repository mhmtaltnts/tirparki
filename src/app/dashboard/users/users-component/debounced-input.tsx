'use client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search } from 'lucide-react';
import * as React from 'react';

export default function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}) {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value, onChange, debounce]);

  return (
    <div className="relative w-1/3  ">
      <Label htmlFor="search" className="sr-only">
        Ara
      </Label>
      <Input
        className="peer block w-full rounded-md border py-[19px] pl-16 text-sm outline-2 placeholder:text-gray-500"
        {...props}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Search className="absolute right-4 top-1/2 h-[24px] w-[24px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
