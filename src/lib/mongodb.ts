import { MongoClient } from "mongodb";
const uri = process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017/bazardor";
const globalMongo = globalThis as unknown as { mongoClient?: MongoClient };
export const mongoClient = globalMongo.mongoClient ?? new MongoClient(uri);
if (process.env.NODE_ENV !== "production")
  globalMongo.mongoClient = mongoClient;
export const db = mongoClient.db();
