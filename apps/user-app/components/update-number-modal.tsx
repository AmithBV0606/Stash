"use client";

import { PhoneCall } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog";
import { Input } from "@workspace/ui/components/input";

export default function UpdateNumberModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Card details</Button>
      </DialogTrigger>

      <DialogContent className="space-y-2">
        <div className="flex flex-col gap-4">
          <div
            className="flex size-11 shrink-0 items-center justify-center rounded-full border border-gray-500"
            aria-hidden="true"
          >
            <PhoneCall className="opacity-80" size={16} />
          </div>

          <DialogHeader>
            <DialogTitle className="text-left">
              Update your phone number
            </DialogTitle>

            <DialogDescription className="text-left">
              In-order to send or receive money via phone number, you need to
              add your phone number.
            </DialogDescription>
          </DialogHeader>
        </div>

        <form className="space-y-5">
          <div className="space-y-4">
            <div className="*:not-first:mt-2">
              <div className="relative">
                <Input
                  id="dialog-subscribe"
                  className="peer ps-9"
                  placeholder="Phone Number"
                  type="email"
                  aria-label="Email"
                />
                <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                  <PhoneCall size={16} aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>

          <Button
            type="button"
            variant={"secondary"}
            className="w-full cursor-pointer"
          >
            Save
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
