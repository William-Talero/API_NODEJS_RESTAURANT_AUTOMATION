import { Auth } from "../interfaces/auth.interface";
import { User } from "../interfaces/user.interface";
import userModel from "../models/user";
import { encrypt, verified } from "../utils/bcrypt.handle";
import { generateToken } from "../utils/jwt.handle";

const resgisterUser = async (authUser: User) => {
  const checkIs = await userModel.findOne({ email: authUser.email });
  if (checkIs) {
    return "ERROR_USER_ALREADY_EXISTS";
  }
  authUser.password = await encrypt(authUser.password);
  const user = new userModel(authUser);
  return await user.save();
};

const loginUser = async (userLogin: Auth) => {
  const checkIs = await userModel.findOne({ email: userLogin.email });
  if (!checkIs) {
    return "ERROR_USER_NOT_FOUND";
  }
  const verify = await verified(userLogin.password, checkIs.password);
  if (!verify) {
    return "ERROR_PASSWORD_IS_INCORRECT";
  }

  const token = await generateToken(checkIs.email);

  const data = {
    token: token,
    user: checkIs
    };

  return data;
};

export default { resgisterUser, loginUser };
