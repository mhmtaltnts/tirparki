'use client';

import { Input } from '@/components/ui/input';
import { DataTableViewOptions } from './data-table-view-options';

export function DataTableToolbar({ table }) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Dorse ara..."
          value={table.getColumn('trailer')?.getFilterValue() ?? ''}
          onChange={(event) =>
            table.getColumn('trailer')?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
