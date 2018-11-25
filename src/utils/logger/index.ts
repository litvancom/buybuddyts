import pino from "pino";

export const logger = pino({
  name: "bbl",
  level: "debug",
  prettyPrint: true
});

export const logCath = (e: any) => {
  logger.error(e);
};
