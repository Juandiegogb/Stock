import mongoose from "mongoose";

const providerSchema = new mongoose.Schema({
  name: { type: String, unique: true },
});

const provider = mongoose.model("provider", providerSchema);
export default provider;
