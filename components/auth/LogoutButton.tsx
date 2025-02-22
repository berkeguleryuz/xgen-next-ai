"use client";

import { Button } from "@/components/ui/button";
import { logout } from "@/utils/auth/auth-actions";
import React from "react";

const LogoutButton = () => {
  const handleLogout = async () => {
    await logout();
  };

  return (
    <Button onClick={handleLogout} className="bg-red-600 hover:bg-red-700">
      Logout
    </Button>
  );
};

export default LogoutButton;
