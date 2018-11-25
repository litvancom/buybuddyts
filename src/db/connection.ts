import knex from "knex";

import {dbConnection} from "../config";

export default knex(dbConnection);
