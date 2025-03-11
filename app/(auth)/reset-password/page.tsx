import Logo from "@/components/Logo";
import ChangePasswordForm from "@/components/settings/ChangePasswordForm";
import Image from "next/image";
import React from "react";

const ResetPasswordPage = async () => {
  return (
    <section className="h-screen w-full grid grid-cols-1 lg:grid-cols-2 max-sm:gap-48">
      <div className="relative md:flex w-full text-white hidden">
        <div className="w-full h-[30%] bg-gradient-to-t from-transparent to-black/60 absolute top-0 left-0 z-10" />
        <div className="w-full h-[40%] bg-gradient-to-b from-transparent to-black/50 absolute bottom-0 left-0 z-10" />
        <Image
          src="/login.avif"
          alt="login-bg"
          fill
          className="object-cover object-right"
        />
        <div className="relative z-20 flex items-start py-8">
          <Logo />
        </div>
      </div>
      <div className="relative max-sm:h-screen flex flex-col w-full text-white justify-center items-center">
        <div className="w-[400px]">
          <ChangePasswordForm />
        </div>
      </div>
    </section>
  );
};

export default ResetPasswordPage;
