import bluebird = require("bluebird");
import jwt = require("jsonwebtoken");
import UserModel from "../../db/model/user";
import moment = require("moment");
import requestPromise = require("request-promise");

const secret = "secret";
//
const jwtSignToken = bluebird.promisify(jwt.sign);

export default class AuthService {
  public static signToken(data: any) {
    const exp = moment()
      .utc()
      .add(1, "y")
      .unix();
    return jwtSignToken(
      {
        exp,
        data: {
          id: data.id
        }
      },
      secret
    );
  }

  public static async checkAuth(authorization: any) {
    if (!authorization) {
      return null;
    }
    const {
      data: { id }
    }: any = jwt.verify(authorization, secret);
    const [user = {}] = await UserModel.findUserById(id);
    delete user.password;

    return user;
  }

  public static async fbCheckToken(token: any) {
    const options = {
      method: "GET",
      url: "https://graph.facebook.com/v3.2/me",
      qs: {
        fields: "id,name,email",
        access_token: token,
        headers: {
          Accept: "application/json"
        }
      },
      transform: (data: any) => JSON.parse(data)
    };
    // fixme implement token check
    return await requestPromise(options);
  }
}
