import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req) {
  const prisma = new PrismaClient();
  const { email, password } = await req.json();
  const hashedPassword = await bcrypt.hash(password, 10);
  // console.log(hashedPassword);
  // console.log(`This is password ${password}, this is email ${email}`);
  try {
    const newUser = await prisma.Admin.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    await prisma.$disconnect();
    return NextResponse.json(
      { message: `Registration successful for user ${email}`, user: newUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("Fehler beim Erstellen des Benutzers:", error);
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
