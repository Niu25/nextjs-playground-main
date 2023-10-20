import nodemailer from 'nodemailer';
import { NextResponse } from "next/server";
import { signJwtAccessToken } from "../../JWT/jwt";



const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,   // SMTP server host (MailDev)
  port: process.env.EMAIL_SERVER_PORT,        // SMTP server port (MailDev)
});

export async function POST(req, res) {
  
    try {
      // Access the data sent in the request body
      const { email, subject, text } = await req.json();
      const payload = {
        email, 
      };
      const { accessToken, verificationLink } = signJwtAccessToken(payload);

      // Prepare the email
      const mailOptions = {
        from: 'sender@example.com',
        to: email,
        subject: subject,
        text: `Click the following link to verify your email: ${verificationLink}`,
      };
      console.log('JWT Token:', accessToken);
      console.log('Verification Link:', verificationLink);

      // Send the email
      await transporter.sendMail(mailOptions);

      return NextResponse.json(mailOptions,{ message: 'Email sent successfully' }, { status: 200 });
    } catch (error) {
        console.error("Email sending failed:", error);
        return NextResponse.json(
          { error: "Email sending failed" },
          { status: 500 }
        );
    }
   
};



