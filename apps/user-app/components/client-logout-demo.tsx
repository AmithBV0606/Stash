"use client";

import { Button } from "@workspace/ui/components/button";
import { signOut } from "next-auth/react";
import React from "react";

export default function ClientLogoutDemo() {
  const handleLogout = () => {
    signOut({
      callbackUrl: "/",
      redirect: true,
    });
  };

  return (
    <div>
      <Button
        size="sm"
        className="cursor-pointer p-2"
        variant={"destructive"}
        onClick={handleLogout}
      >
        Logout
      </Button>
    </div>
  );
}
