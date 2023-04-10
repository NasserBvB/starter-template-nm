import bcrypt from "bcrypt";


export function encryptPassword(password: string) {
  return bcrypt.hashSync(password, 10);
}

export function comparePassword(
  plainTextPassword: string,
  encryptedPassword: string
) {
  return bcrypt.compareSync(plainTextPassword, encryptedPassword);
}
