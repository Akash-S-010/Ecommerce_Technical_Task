import bcrypt from "bcryptjs";

export const genOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

export const hashOtp = async (code) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(code, salt);
};

export const compareOtp = (code, hash) => bcrypt.compare(String(code), hash);