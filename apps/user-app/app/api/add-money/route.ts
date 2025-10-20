import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { user_id, bank_name } = await req.json();

    if (!user_id && !bank_name) {
      return NextResponse.json({
        success: false,
        message: "Bank name not selected.",
      });
    }

    const { data } = await axios.post(
      `http://localhost:3001/bank/${bank_name}`,
      {
        user_id,
      }
    );

    if (!data) {
      return NextResponse.json({
        success: false,
        message: "Token was not generated due to some server error.",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Successfully forwarded the request to bank servers.",
      token: data.token,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to forwarded the request to the bank servers.",
      },
      { status: 500 }
    );
  }
}
