import mongoose from "mongoose";

const elementSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  code: {
    type: Number,
    unique: true,
    required: true,
  },
  provider: {
    type: "ObjectId",
    ref: "provider",
  },
});

const element = mongoose.model("element", elementSchema);
export default element;
