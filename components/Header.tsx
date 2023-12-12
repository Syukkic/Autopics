import Image from 'next/image';
import React from 'react';

function Header() {
  return (
    <header className="flex p-5 justify-between sticky top-0 bg-white z-50 shadow-md">
      <div className="flex space-x-2 items-center">
        <Image src="/open-ai-logo.png" alt="logo" width={30} height={30} />
      </div>
      <div>
        <h1 className="font-bold">AI Arts Generation</h1>
        <h2 className="text-xs">Powered by DALL·E 2</h2>
      </div>
    </header>
  );
}

export default Header;
