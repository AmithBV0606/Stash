"use client";

import { Button } from "@workspace/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog";
import Link from "next/link";
import Image from "next/image";
import { signIn } from "next-auth/react";

const handleGoogleAuth = async () => {
  signIn("google", {
    redirect: true,
    callbackUrl: "/dashboard/home",
  });
};

export default function AuthModal({ AuthType }: { AuthType: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="cursor-pointer"
          variant={AuthType === "Sign Up" ? "default" : "outline"}
        >
          {AuthType}
        </Button>
      </DialogTrigger>

      <DialogContent>
        <div className="flex flex-col items-center gap-4">
          <div
            className="flex size-11 shrink-0 items-center justify-center rounded-full border border-gray-500 p-1"
            aria-hidden="true"
          >
            <Link
              href="/"
              aria-label="home"
              className="flex items-center space-x-2"
            >
              <Image src={"/logo.png"} height={40} width={70} alt="Logo" />
            </Link>
          </div>

          <DialogHeader>
            <DialogTitle className="sm:text-center">{AuthType}</DialogTitle>
            <DialogDescription className="sm:text-center">
              {AuthType === "Sign Up"
                ? "We just need few details of yours from Google to get you started."
                : "We're using Google as identity provider to verify your identity."}
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="before:bg-border after:bg-border flex items-center before:h-px before:flex-1 after:h-px after:flex-1" />

        <Button
          className="cursor-pointer"
          variant={AuthType === "Sign Up" ? "default" : "outline"}
          onClick={handleGoogleAuth}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="0.98em"
            height="1em"
            viewBox="0 0 256 262"
          >
            <path
              fill="#4285f4"
              d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
            ></path>
            <path
              fill="#34a853"
              d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
            ></path>
            <path
              fill="#fbbc05"
              d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
            ></path>
            <path
              fill="#eb4335"
              d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
            ></path>
          </svg>
          {AuthType === "Sign Up"
            ? "Sign Up with Google"
            : "Continue with Google"}
        </Button>

        {AuthType === "Sign Up" ? (
          <p className="text-muted-foreground text-center text-xs">
            By signing up you agree to our{" "}
            <a className="underline hover:no-underline" href="#">
              Terms
            </a>
            .
          </p>
        ) : (
          <></>
        )}
      </DialogContent>
    </Dialog>
  );
}
