import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import bcrypt from "bcrypt";


export async function POST(req) {
  
    const { userName, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    try {
      const prisma = new PrismaClient();
      const newUser = await prisma.TestUser.create({
        data: {
          userName,
          password : hashedPassword, 
        },
      });

      await prisma.$disconnect();
      return NextResponse.json(newUser,{status:200});

    } catch (error) {
      console.error('Fehler beim Erstellen des Benutzers:', error);
      
  }
}