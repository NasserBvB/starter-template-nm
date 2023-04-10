// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "@lib/prisma";
import {encryptPassword} from '@/src/utils/password-encryption';

const markTokenAsExpired = async (tokenId: number) => {
  await prisma.token.update({
    where: {
      id: tokenId
    },
    data: {
      expired: true
    }
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({ message: "Token and password are required" });
    }

    const resetPasswordToken = await prisma.token.findFirst({
      where: {
        token
      }
    })
    
    if (!resetPasswordToken) {
      return res.status(400).json({ message: "Token does not exist" });
    }

    // Check token validity of 1 hour
    const tokenValidity = new Date().getTime() - new Date(resetPasswordToken.createdAt).getTime();
    if (tokenValidity > 3600000) {
      await markTokenAsExpired(resetPasswordToken.id);
      return res.status(400).json({ message: "Token has expired" });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: resetPasswordToken.userId
      }
    });

    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const encryptedPassword = encryptPassword(password);

    await prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        password: encryptedPassword
      }
    });

    await markTokenAsExpired(resetPasswordToken.id);

    return res.status(200).json({ message: "Password changed successfully" });

  } catch (error) {
    console.log("🚀 ~ file: change-password.ts:53 ~ error:", error)
    res.status(500).json({ message: "Something went wrong", error });
  }
}
