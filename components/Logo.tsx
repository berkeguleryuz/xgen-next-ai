import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-4">
      <Image src="/logo.png" alt="logo" width={200} height={200} />
    </Link>
  );
};

export default Logo