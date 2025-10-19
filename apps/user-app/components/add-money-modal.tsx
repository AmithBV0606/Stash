"use client";

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
import { useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";

export function AddMoneyModal() {
  const [open, setOpen] = React.useState<boolean>(false);
  const [bank, setBank] = React.useState<string>("hdfc");

  const router = useRouter();

  const { data: session } = useSession();

  // console.log("User Id : ", session?.user.id);
  // console.log("Selected bank is : ", bank);

  const handleAddMoney = async () => {
    try {
      const { data } = await axios.post("/api/add-money", {
        user_id: session?.user.id,
        bank_name: bank,
      });

      console.log(data);

      if (data) {
        router.push(`/bank/${bank}?token=${data.token}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
            <Label>Please choose a bank</Label>

            <select
              name="bank"
              id="bank"
              className="border-2 p-2 rounded-lg"
              onChange={(e) => setBank(e.target.value)}
            >
              <option value="hdfc">Hdfc</option>
              <option value="axis">Axis</option>
              <option value="idfc">Idfc</option>
              <option value="sbi">SBI</option>
            </select>
          </div>
        </ModalBody>

        <ModalFooter>
          <Button
            type="submit"
            className="w-full cursor-pointer"
            variant={"secondary"}
            onClick={handleAddMoney}
          >
            Proceed To Pay
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
