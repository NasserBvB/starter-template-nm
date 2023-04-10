// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "@lib/prisma";
import {comparePassword} from '@utils/password-encryption';
import generateToken from '@/src/utils/generate-jwt';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isPasswordCorrect = comparePassword(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const jwt = generateToken(user);

    return res.status(200).json({ message: "User logged in successfully", token: jwt, user });

  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" }); 
  }
}
