import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center p-4">
      <Link href="/" className="flex items-center gap-4">
        <Image src="/logo.png" alt="logo" width={200} height={200} />
      </Link>
      <div className="flex items-center gap-4">
        <button className="bg-white text-black px-4 py-2 rounded-md">
          Login
        </button>
      </div>
    </div>
  );
};

export default Navbar;
