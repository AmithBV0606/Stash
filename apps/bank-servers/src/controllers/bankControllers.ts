import { Request, Response } from "express";
import crypto from "crypto";

export async function BankController(request: Request, response: Response) {
  const { user_id } = request.body;
  const { bank_name } = request.params;

  if (!user_id || !bank_name) {
    return response.status(400).json({
      success: false,
      message: "Bank name or user ID missing.",
    });
  }

  const token = crypto.randomBytes(50).toString("hex").slice(0, 100);

  return response.json({ token });
}
