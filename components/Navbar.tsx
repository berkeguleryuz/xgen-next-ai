import React from "react";
import Logo from "./Logo";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center p-4">
      <Logo />
      <div className="flex items-center gap-4">
        <Link href="/login" className="bg-white text-black px-4 py-2 rounded-md">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
