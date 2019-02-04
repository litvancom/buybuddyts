import { getCustomRepository, ObjectType, Repository } from "typeorm";
import { UserRepository } from "../repository/userRepository";
import { Injectable } from "@graphql-modules/core/dist/di";

@Injectable()
export class RepositoryProvider {
  public getUserRepository(): UserRepository {
    return getCustomRepository(UserRepository);
  }

  public getRepository<T>(repo: ObjectType<T>): T {
    return getCustomRepository(repo);
  }
}
