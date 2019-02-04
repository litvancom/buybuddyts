import { EntityRepository, Repository } from "typeorm";
import { ListItem } from "../entity/ListItem";
import { IBuyBuddyRepository } from "./IBuyBuddyRepository";

@EntityRepository(ListItem)
export class ListItemRepository extends Repository<ListItem> implements IBuyBuddyRepository {}

