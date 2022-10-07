import { PatternType } from "./@types";
import { LinkModel } from "./db/model";
// import * as dotenv from 'dotenv'
// dotenv.config()

export function urlSchema(
  SCHEME: string,
  HOST: string,
  PORT: number,
  URL: string | undefined
) {
  return `${SCHEME}://${HOST}:${PORT}/${URL}`;
}

/**
 * find document with genUrl & return it
 */
export async function getUrlDoc(pattern: PatternType) {
  const query = LinkModel.findOne(pattern);
  const doc = await query.exec();
  return doc;
}

export function writelog(...log: unknown[]) {
  process.env.NODE_ENV == "prod" ? null : console.log(...log);
}
