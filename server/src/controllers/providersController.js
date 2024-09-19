import provider from "../models/providerModel.js";

const providerController = {};

providerController.createProvider = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ message: "The name was not defined" });
  } else {
    try {
      const modifiedName = String(name).trim().toUpperCase();
      await provider.create({ name: modifiedName });
      res.status(200).json({ message: "Provider created" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Database error" });
    }
  }
};

export default providerController;
