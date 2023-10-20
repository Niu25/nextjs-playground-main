/* import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";




export async function POST(req, res) {
  const { userName, password } = await req.json();
  try {
    const prisma = new PrismaClient();
    const newUser = await prisma.TestUser.create({
      data: {
        userName,
        password,
      },
    });
    await prisma.$disconnect();
    return NextResponse.json(newUser, { status: 200 });
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }

  //   const res = await fetch(DATA_SOURCE_URL, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       userName,
  //     }),
  //   });
  //   return NextResponse.json(newUser);
} */
