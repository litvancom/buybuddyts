import knex = require("knex");

import config from "../config";

export default knex(config.dbConnection);
