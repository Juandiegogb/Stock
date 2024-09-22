import mongoose from "mongoose";

export async function DBconnect() {
  const db_password = process.env.db_password;
  const db_user = process.env.db_user;
  const uri = process.env.uri
    .replace("<db_username>", db_user)
    .replace("<db_password>", db_password);
  await mongoose
    .connect(uri, {
      dbName: "stock",
    })
    .then(() => {
      console.log("DB is connected");
    })
    .catch((error) => {
      console.log(error);
    });
}
