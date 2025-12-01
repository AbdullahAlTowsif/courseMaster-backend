import { envVars } from "../../config/env";
import { createNewAccessTokenWithRefreshToken } from "../../utils/userTokens";
import bcrypt from "bcrypt";
import { User } from "../user/user.model";
import AppError from "../../errorHelpers/AppError";
import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";

const getNewAccessToken = async (refreshToken: string) => {
  const newAccessToken = await createNewAccessTokenWithRefreshToken(
    refreshToken
  );

  return {
    accessToken: newAccessToken,
  };
};



const changePassword = async (
  oldPassword: string,
  newPassword: string,
  decodedToken: JwtPayload
) => {
  const user = await User.findById(decodedToken.userId);

  const isOldPasswordMatch = await bcrypt.compare(
    oldPassword,
    user!.password
  );
  if (!isOldPasswordMatch) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Old Password does not match");
  }

  user!.password = await bcrypt.hash(
    newPassword,
    Number(envVars.BCRYPT_SALT_ROUND)
  );
  await user!.save();
};

export const AuthService = {
    getNewAccessToken,
    changePassword,
}
