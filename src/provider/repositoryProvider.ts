import { getCustomRepository, ObjectType, Repository } from "typeorm";
import { UserRepository } from "../repository/userRepository";
import { Injectable } from "@graphql-modules/core/dist/di";
import { IBuyBuddyRepository } from "../repository/IBuyBuddyRepository";

@Injectable()
export class RepositoryProvider {
  public getUserRepository(): UserRepository {
    return getCustomRepository(UserRepository);
  }

  public getRepository<T extends IBuyBuddyRepository>(repo: ObjectType<T>): T {
    return getCustomRepository(repo);
  }
}
