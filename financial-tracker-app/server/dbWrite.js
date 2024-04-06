import { MongoClient } from "mongodb";

// const uri = process.env.MONGO_URI;
// const dbName = process.env.DATABASE_NAME;
// const collectionName = process.env.COLLECTION_NAME;


// FIX LATER
const uri = "mongodb+srv://owenHumphrey:ZZCk9IceQvBsHSxL@humphreyfellows.uqkop5v.mongodb.net/?retryWrites=true&w=majority&appName=HumphreyFellows"
const dbName = "financial-tracker"
const collectionName = "userInfo";

// Data to be inserted
const userData = {
  username: "hi",
  password: "example_password",
  company: "example_company",
  email: "yo@example.com",
};

// Function to write data to MongoDB
async function dbWrite(credentials, userData) {
  const uri = credentials[uri];
  const dbName = credentials[dbName];
  const collectionName = credentials[collectionName];

  const client = new MongoClient(uri);

  try {
    await client.connect();

    const db = client.db(dbName);
    const usersCollection = db.collection(collectionName);

    // Ensure unique index on  username to prevent duplicate entries
    await usersCollection.createIndex({ email: 1 }, { unique: true });

    const result = await usersCollection.insertOne(userData);

    console.log(`Inserted ${result.insertedId} document into the collection`);
  } catch (error) {
    if (error.code === 11000) {
      console.error("Duplicate key error:", error.keyValue);
    } else {
      console.error("Error occurred:", error);
    }
  } finally {
    await client.close();
  }
}

export default dbWrite;
