import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { prisma } from "@repo/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const bank_name = body.bank_name ?? body.bank; // accept either key
    const amount = Number(body.amount);

    const session = await getServerSession(authOptions);
    console.log("Session from Deposit : ", session);

    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, message: "Not authenticated" },
        { status: 401 }
      );
    }

    if (!bank_name || !Number.isFinite(amount) || amount <= 0) {
      return NextResponse.json(
        { success: false, message: "Invalid payload" },
        { status: 400 }
      );
    }

    const updateBalance = await prisma.balance.update({
      where: {
        userId: parseInt(session.user.id),
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
