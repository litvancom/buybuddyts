import bluebird = require("bluebird");
import jwt = require("jsonwebtoken");
import UserModel from "../../db/model/user";

const secret = "secret";

const jwtSignToken = bluebird.promisify(jwt.sign);
export const signToken = (data: any) => {
  const hour = Math.floor(Date.now() / 1000) + 60 * 60;
  return jwtSignToken(
    {
      exp: hour * 24 * 365,
      data
    },
    secret
  );
};

export const checkAuth = async (authorization: any) => {
  if (!authorization) {
    return null;
  }
  const {
    data: { id }
  }: any = jwt.verify(authorization, secret);
  const [user = {}] = await UserModel.findUserById(id);
  delete user.password;

  return user;
};
