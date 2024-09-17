import mongoose from "mongoose";

export async function DBconnect() {
  const uri = process.env.uri;
  await mongoose
    .connect(uri, { dbName: "stock" })
    .then(() => {
      console.log("DB is connected");
    })
    .catch((error) => {
      console.log(error);
    });
}
