import React from 'react';

export default function UsersLayout({ children, modal }) {
  return (
    <div className="flex flex-1 flex-col">
      {children}
      {modal}
    </div>
  );
}
