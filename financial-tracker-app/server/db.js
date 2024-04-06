//basic connection file

import pkg from "mongoose";
const { connect, connection, disconnect } = pkg;

// const uri = process.env.MONGO_URI;

// FIX LATER
const uri = "mongodb+srv://owenHumphrey:ZZCk9IceQvBsHSxL@humphreyfellows.uqkop5v.mongodb.net/?retryWrites=true&w=majority&appName=HumphreyFellows"

const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await connect(uri, clientOptions);
    await connection.db.admin().command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (e) {
    console.log(e);
  }
}
run().catch(console.dir);
