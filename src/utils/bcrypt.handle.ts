import * as bcrypt from "bcryptjs";

const encrypt = async(password: string) => {
  const salt = await bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

const verified = async(password: string, hash: string) => {
  const verify = await bcrypt.compareSync(password, hash);
  return verify;
};

export { encrypt, verified };
