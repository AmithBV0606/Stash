import React from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from "@/components/modal";
import { Button } from "@workspace/ui/components/button";
import { Label } from "@workspace/ui/components/label";
import { CirclePlus, Wallet } from "lucide-react";

export function AddMoneyModal() {
  const [open, setOpen] = React.useState<boolean>(false);

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <ModalTrigger asChild>
        <Button size="lg" className="cursor-pointer" variant={"outline"}>
          <CirclePlus className="size-5" />
          Add Money
        </Button>
      </ModalTrigger>

      <ModalContent className="md:max-w-md bg-black">
        <ModalHeader className="items-center py-10 -m-4 bg-[#151515] rounded-md">
          <Wallet className="size-9" />

          <div className="flex flex-col items-center space-y-1">
            <ModalTitle className="text-2xl font-semibold">
              Add Money
            </ModalTitle>

            <ModalDescription className="text-muted-foreground text-center text-sm">
              Add money to your wallet by choosing the bank.
            </ModalDescription>
          </div>
        </ModalHeader>

        <ModalBody className="space-y-6 -m-4 mt-2">
          <div className="grid gap-2">
            <Label>Choose Bank</Label>

            <select name="" id="" className="border-2 p-2 rounded-lg">
              <option value="">Hdfc</option>
              <option value="">Axis</option>
              <option value="">Idfc</option>
              <option value="">SBI</option>
            </select>
          </div>
        </ModalBody>

        <ModalFooter>
          <Button
            type="submit"
            className="w-full cursor-pointer"
            variant={"secondary"}
          >
            Proceed To Pay
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
