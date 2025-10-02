import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@repo/db";

export async function POST(req: NextRequest) {
  try {
    const { number } = await req.json();

    if (!number) {
      return NextResponse.json({
        success: false,
        message: "Please enter your number to proceed.",
      });
    }

    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, message: "Not authenticated" },
        { status: 401 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: {
        email: session?.user?.email,
      },
      data: {
        number: number,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Phone number added successfully.",
      res: updatedUser,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
