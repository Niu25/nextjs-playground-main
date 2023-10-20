import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { signJwtAccessToken } from "../../JWT/jwt";

export async function POST(request) {
  const body = await request.json();

  const prisma = new PrismaClient();
  const user = await prisma.TestUser.findFirst({
    where: {
      userName: body.username,
    },
  });
  if (user && (await bcrypt.compare(body.password, user.password)))  {
    const { password, ...userWithoutPass } = user;
    const accessToken = signJwtAccessToken(userWithoutPass);
    const result = {
      ...userWithoutPass,
      accessToken,
    };
   
   
    //console.log(user);
    return new NextResponse(JSON.stringify(result));
  } else return new NextResponse(JSON.stringify(null));

  //return user && (await bcryptjs.compare(body.password, user.password)) ? new NextResponse(JSON.stringify(user)) : new NextResponse(JSON.stringify(null)) ;
}
