import { createConnection } from "typeorm";
import { User } from "../entity/User";
import { logger } from "../utils/logger";
import { SharedList } from "../entity/SharedList";
import { List } from "../entity/List";
import { ListItem } from "../entity/ListItem";
import { SocialId } from "../entity/SocialId";

export const connection = createConnection({
  type: "postgres",
  host: "localhost",
  port: 5433,
  username: "postgres",
  password: "Instance@1",
  database: "buyBuddyTypeOrm",
  entities: [User, List, ListItem, SharedList, SocialId],
  synchronize: true,
  logging: true
}).catch((error: Error) => logger.error(error));
