import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { prisma } from "@repo/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const userId = body.user_id;
    const email = body.email;
    const amount = Number(body.amount);
    const bank_name = body.bank_name ?? body.bank;

    if (!bank_name || !Number.isFinite(amount) || amount <= 0) {
      return NextResponse.json(
        { success: false, message: "Invalid payload" },
        { status: 400 }
      );
    }

    const updateBalance = await prisma.balance.update({
      where: {
        userId: parseInt(userId),
      },
      data: {
        amount: { increment: amount },
      },
    });

    return NextResponse.json({
      success: true,
      message: "Money has been successfully added to your wallet.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to add money to your wallet.",
      },
      { status: 500 }
    );
  }
}
