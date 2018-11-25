
export const port = process.env.PORT || 4000;
export const dbConnection = {
    client: "pg",
    connection:
        process.env.DATABASE_URL || "postgres://postgres:Instance%401@localhost:5434/buybuddy",
};
