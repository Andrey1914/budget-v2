import { MongoClient, MongoClientOptions, Db } from "mongodb";

const uri: string = process.env.MONGODB_URI as string;
const options: MongoClientOptions = {};

export const MONGODB_DB: string = process.env.MONGODB_DB || "budget-v2";

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

clientPromise
  .then(() => {
    console.log(`Connected to MongoDB (DB: ${MONGODB_DB})`);
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB", error);
  });

/**
 * Хелпер для быстрого получения объекта базы данных
 * @param dbName Опциональное имя БД (по умолчанию из MONGODB_DB)
 */
export async function getDb(dbName: string = MONGODB_DB): Promise<Db> {
  const connectedClient = await clientPromise;
  return connectedClient.db(dbName);
}

export default clientPromise;

// import { MongoClient, MongoClientOptions, Db } from "mongodb";

// const uri: string = process.env.MONGODB_URI as string;
// const options: MongoClientOptions = {};

// export const MONGODB_DB: string = process.env.MONGODB_DB || "budget-v2";

// let client: MongoClient;
// let clientPromise: Promise<MongoClient>;

// declare global {
//   var _mongoClientPromise: Promise<MongoClient> | undefined;
// }

// if (!process.env.MONGODB_URI) {
//   throw new Error("Please add your Mongo URI to .env.local");
// }

// if (process.env.NODE_ENV === "development") {
//   if (!global._mongoClientPromise) {
//     client = new MongoClient(uri, options);
//     global._mongoClientPromise = client.connect();
//   }
//   clientPromise = global._mongoClientPromise;
// } else {
//   client = new MongoClient(uri, options);
//   clientPromise = client.connect();
// }

// clientPromise
//   .then(() => {
//     console.log(`Connected to MongoDB (DB: ${MONGODB_DB})`);
//   })
//   .catch((error) => {
//     console.error("Failed to connect to MongoDB", error);
//   });

// /**
//  * Хелпер для быстрого получения объекта базы данных
//  * @param dbName Опциональное имя БД (по умолчанию из MONGODB_DB)
//  */
// export async function getDb(dbName: string = MONGODB_DB): Promise<Db> {
//   const connectedClient = await clientPromise;
//   return connectedClient.db(dbName);
// }

// export default clientPromise;
