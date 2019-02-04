import { EntityRepository, Repository } from "typeorm";
import { SharedList } from "../entity/SharedList";
import { IBuyBuddyRepository } from "./IBuyBuddyRepository";

@EntityRepository(SharedList)
export class SharedListRepository extends Repository<SharedList> implements IBuyBuddyRepository {}
