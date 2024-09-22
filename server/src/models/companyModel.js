import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  name: { type: String, unique: true },
});

const company = mongoose.model("company", companySchema);
export default company;
