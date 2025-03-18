import React from "react";
import Logo from "./Logo";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

const MobileNavItems = () => {
  return (
    <div className="flex flex-col gap-4 mt-4">
      <Link
        className="text-white/70 hover:text-white transition-colors duration-200 font-medium px-4 py-3 rounded-lg hover:bg-lime-500/10 text-lg"
        href="/#pricing">
        Pricing
      </Link>
      <Link
        className="text-white/70 hover:text-white transition-colors duration-200 font-medium px-4 py-3 rounded-lg hover:bg-lime-500/10 text-lg"
        href="/#features">
        Features
      </Link>
      <Link
        className="text-white/70 hover:text-white transition-colors duration-200 font-medium px-4 py-3 rounded-lg hover:bg-lime-500/10 text-lg"
        href="/#faq">
        FAQ
      </Link>
      <div className="border-t border-lime-500/20 my-4" />
      <Link
        href="/login"
        className="bg-lime-500 text-white px-4 py-3 rounded-lg text-center font-medium hover:bg-lime-600 transition-colors duration-200">
        Login
      </Link>
    </div>
  );
};

const NavItems = () => {
  return (
    <div className="flex items-center gap-2">
      <Link
        className="text-white/70 hover:text-white transition-colors duration-200 font-medium px-4 py-2 rounded-lg hover:bg-lime-500/10"
        href="/#pricing">
        Pricing
      </Link>
      <Link
        className="text-white/70 hover:text-white transition-colors duration-200 font-medium px-4 py-2 rounded-lg hover:bg-lime-500/10"
        href="/#features">
        Features
      </Link>
      <Link
        className="text-white/70 hover:text-white transition-colors duration-200 font-medium px-4 py-2 rounded-lg hover:bg-lime-500/10"
        href="/#faq">
        FAQ
      </Link>
    </div>
  );
};

const Navbar = () => {
  return (
    <header className="w-full backdrop-blur-md fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-4 overflow-hidden">
      <Logo />
      <nav className="md:flex items-center gap-4 hidden">
        <NavItems />
        <Link
          href="/login"
          className="bg-lime-500 text-white px-4 py-2 rounded-lg text-center font-medium hover:bg-lime-600 transition-colors duration-200">
          Login
        </Link>
      </nav>
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              className="text-white  bg-transparent hover:bg-transparent"
              size="icon">
              <Menu className="text-white hover:text-lime-500" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-[300px] bg-black/95 border-lime-500/20 p-6">
            <SheetHeader>
              <SheetTitle>
                <Logo />
              </SheetTitle>
            </SheetHeader>
            <MobileNavItems />
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navbar;
