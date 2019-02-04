import { EntityRepository, Repository } from "typeorm";
import { List } from "../entity/List";
import { IBuyBuddyRepository } from "./IBuyBuddyRepository";

@EntityRepository(List)
export class ListRepository extends Repository<List> implements IBuyBuddyRepository {}

