// Create a unique hash token
// Path: src/utils/create-token.ts
import crypto from 'crypto';

export default function createToken() {
  return crypto.randomBytes(32).toString('hex');
}