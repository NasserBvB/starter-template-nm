// Generate a jwt token
import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

const generateToken = (user: User) => {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.fullName,
    },
    JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
  return token;
};

export default generateToken;