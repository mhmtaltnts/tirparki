import React from 'react';
import { Search } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const SearchBar = ({ setSearch }) => {
  return (
    <div className="relative flex">
      <Input
        type="text"
        id="search"
        placeholder="Müşteri Ara..."
        onChange={(e) => setSearch(e.target.value)}
      />

      <Search className="absolute right-2 top-1/2 -translate-y-1/2" />
    </div>
  );
};

export default SearchBar;
