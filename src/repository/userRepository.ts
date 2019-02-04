import { EntityRepository, Repository } from "typeorm";
import { User } from "../entity/User";
import { IBuyBuddyRepository } from "./IBuyBuddyRepository";

@EntityRepository(User)
export class UserRepository extends Repository<User> implements IBuyBuddyRepository {}
