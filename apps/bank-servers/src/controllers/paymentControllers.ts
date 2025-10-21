import axios from "axios";
import { Request, Response } from "express";

export async function PaymentController(request: Request, response: Response) {
  const { user_id, email, amount } = request.body;
  const { bank_name } = request.params;

  console.log("From /payment/:bank_name :", bank_name);

  if (!user_id && !email && !bank_name) {
    return response.status(400).json({
      success: false,
      message: "Either the userId or the email or the bank name is missing.",
    });
  }

  if (!amount) {
    return response.status(400).json({
      success: false,
      message: "Please enter the amount you want to add to your wallet.",
    });
  }

  // Here is the part where, the bank deducts the money from the users account and sends it to Stash wallet company's account.

  // Once the transaction is complete, the banking servers hit the Stash company's "add-money" webhook, to notify the stash about the transactions.

  // Hitting the stash's webhook
  try {
    const updateStash = await axios.post(
      `http://localhost:3000/api/webhook/deposit`,
      {
        user_id: user_id,
        email: email,
        amount: Number(amount),
        bank_name: bank_name,
      }
    );

    console.log("Update Stash Webhook", updateStash);

    if (!updateStash?.data?.success) {
      return response.status(502).json({
        success: false,
        message: "Stash deposit webhook responded with an error.",
      });
    }
  } catch (err) {
    return response.status(502).json({
      success: false,
      message: "Failed to reach stash deposit webhook.",
    });
  }

  return response.json({
    success: true,
    message: "We've updated the transaction to stash's deposit webhook.",
  });
}
