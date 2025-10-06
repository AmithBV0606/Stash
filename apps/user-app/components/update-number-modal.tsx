"use client";

import { PhoneCall } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import { Input } from "@workspace/ui/components/input";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function UpdateNumberModal() {
  const [open, setOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const { update } = useSession();

  const router = useRouter();

  const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();

    try {
      const { data } = await axios.post("/api/add-phone-number", {
        number: phoneNumber,
      });

      await update(); // To update the session with new phone number

      toast.success(data.message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      setOpen(false);

      router.refresh();
    } catch (error: any) {
      toast.error(error.message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  // Open the modal automatically when the component mounts
  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="*:not-first:mt-2">
              <div className="relative">
                <Input
                  id="dialog-subscribe"
                  className="peer ps-9"
                  placeholder="Phone Number"
                  type="text"
                  aria-label="Email"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  value={phoneNumber}
                />
                <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                  <PhoneCall size={16} aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>

          <Button
            type="submit"
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
