// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "@lib/prisma";
import createToken from '@/src/utils/create-token';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { email } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })
    
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    // create a token and send it to the user's email
    const token = createToken();

    const resetPasswordToken = await prisma.token.create({
      data: {
        userId: user.id,
        token,
      },
    });

    /**
     * TODO: Send the token to the user's email
     */
    return res.status(200).json({ message: "Token created successfully", resetPasswordToken, url: `http://localhost:3000/auth/reset-password?token=${token}` });

  } catch (error) {
    console.log("🚀 ~ file: reset-password.ts:37 ~ error:", error)
    res.status(500).json({ message: "Something went wrong" });
  }
}
