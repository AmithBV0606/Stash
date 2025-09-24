import { prisma } from "@repo/db";
import { CustomUser } from "@repo/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body: CustomUser = await request.json();

    // Check if the user exists in our Database :
    let user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    // If not, create a new entry for the user in our Database :
    if (!user) {
      user = await prisma.user.create({
        data: body,
      });
    }

    // If the user already exists in our Database :
    return NextResponse.json({
      success: true,
      message: "Authentication successfull.",
      user,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
}
