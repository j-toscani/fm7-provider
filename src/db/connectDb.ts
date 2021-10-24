import { Collection, MongoClient } from "mongodb";

let client: MongoClient;

const DB_USER = process.env.DB_USER;
const DB_PW = process.env.DB_PW;

const URL = `mongodb://${DB_USER}:${DB_PW}@fm7-db:27017/?authSource=admin`;

export async function connectDatabase(): Promise<void> {
  client = new MongoClient(URL);
  await client.connect();
}

export function getCollection<T>(name: string): Collection<T> {
  return client.db("fm7").collection<T>(name);
}
