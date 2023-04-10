// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "@lib/prisma";
import {encryptPassword} from '@/src/utils/password-encryption';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { email, password, fullName } = req.body;
    console.log(req.body);
    
    if (!email || !password) {
      res.status(400).json({ message: "Email and password are required" });
    }

    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })
    
    if (user) {
      res.status(400).json({ message: "User already exists" });
    }

    const encryptedPassword = encryptPassword(password);


    const newUser = await prisma.user.create({
      data: {
        email,
        password: encryptedPassword,
        fullName,
      }
    });


    res.status(201).json({ message: "User created successfully", user: newUser });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}
