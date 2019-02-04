import bluebird = require("bluebird");
import jwt = require("jsonwebtoken");
import moment = require("moment");
import requestPromise = require("request-promise");
import { Inject, Injectable } from "@graphql-modules/core/dist/di";
import { RepositoryProvider } from "./repositoryProvider";
import { UserRepository } from "../repository/userRepository";

const secret = "secret";
//
const jwtSignToken = bluebird.promisify(jwt.sign);

@Injectable()
export default class AuthProvider {
  constructor(@Inject(RepositoryProvider) private repositoryProvider: RepositoryProvider) {}

  public signToken(data: any) {
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

  public async checkAuth(authorization: any) {
    if (!authorization) {
      return null;
    }
    const {
      data: { id }
    }: any = jwt.verify(authorization, secret);
    return await this.repositoryProvider.getRepository(UserRepository).findOne(id);
  }

  public async fbCheckToken(token: any) {
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
