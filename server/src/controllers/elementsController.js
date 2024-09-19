import element from "../models/elementModel.js";
const elementController = {};

elementController.createElement = async (req, res) => {
  const { name, price, provider, stock, code } = req.body;
  const modifiedName = String(name).trim().toUpperCase();
  try {
    await element.create({ name: modifiedName, price, provider, stock, code });
    res.status(200).json({ message: "Element created" });
  } catch (error) {
    res.send(error.name);
  }
};

elementController.updateElement = async (req, res) => {
  const allowedData = ["name", "price", "stock", "code", "provider"];
  const id = req.params.id;

  for (let data in req.body) {
    if (!allowedData.includes(data) || req.body[data] == "")
      delete req.body[data];
  }

  const cleanBody = req.body;
  try {
    await element.findOneAndUpdate({ _id: id }, cleanBody);
    res.status(200).json({ message: "Element updated successfully" });
  } catch (error) {
    if (error.name === "CastError") {
      res.status(400).json({
        message: "The quantity and code must be a number",
        error: error,
      });
    }
    res.status(400).json({
      message: "Database error",
      error: error,
    });
  }
};

elementController.getElements = async (req, res) => {
  try {
    const elements = await element.find().populate("provider");
    res.json(elements);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Database error" });
  }
};

elementController.deleteElement = async (req, res) => {
  const id = req.params.id;
  try {
    await element.findByIdAndDelete(id);
    res.status(200).json({ message: "Element deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Database error" });
  }
};

elementController.getElement = async (req, res) => {
  const id = req.params.id;
  try {
    const elementToFind = await element.findOne({ _id: id });
    if (!elementToFind) {
      res.status(400).json({ message: "Element id doesn't exist" });
    } else {
      res.json(elementToFind);
    }
  } catch (error) {
    res.status(400).json({ message: "Database error" });
  }
};

export default elementController;
