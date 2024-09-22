import bcrypt from "bcryptjs";
import user from "../models/userModel.js";
import { createToken } from "../tools/token.js";
import companyDB from "../models/companyModel.js";
const userController = {};

userController.createUser = async (req, res) => {
  const { username, name, password, role, company } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  try {
    await user.create({
      username,
      name: name.toUpperCase(),
      password: hashedPassword,
      role,
      company,
    });
    res.status(200).json({ message: "User created!" });
  } catch (error) {
    console.log(error);
    if (error.errorResponse.code === 11000) {
      res.status(400).json({ message: "Username alredy exist" });
    }
  }
};

userController.login = async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  const userInfo = await user.findOne({ username }).lean();
  if (!userInfo || userInfo.active === false) {
    res.status(400).json({ message: "The user doesn't exist or is inactive" });
  } else {
    const isMatch = bcrypt.compareSync(password, userInfo.password);
    if (isMatch) {
      delete userInfo.password;
      const token = createToken(userInfo);
      res.cookie("token", token);
      res.status(200).json({ message: "Welcome", userInfo });
    } else {
      res.status(400).json({ message: "Incorrect password" });
    }
  }
};

userController.logout = (req, res) => {
  res.cookie("token", "", { maxAge: 0 });
  res.status(200).json({ message: "Bye" });
};

userController.getUsers = async (req, res) => {
  const companyId = req.params.companyId;
  try {
    const response = await user.find({ company: companyId });
    res.status(200).json({ response });
  } catch (error) {
    res.status(400).json({ message: "DB error", error });
  }
};

userController.getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const userInfo = await user.findById(id).lean();
    res.json(userInfo);
  } catch (error) {
    res.status(400).json({ message: "DB error", error });
  }
};

userController.updateUser = async (req, res) => {
  console.log(req.body);
  const id = req.params.id;
  const allowedData = ["username", "name", "password", "role", "active"];
  for (let key in req.body) {
    if (!allowedData.includes(key) || req.body[key].trim() == "") {
      delete req.body[key];
    }
  }

  if ("password" in req.body) {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
  }

  if ("name" in req.body) {
    req.body.name = String(req.body.name).toUpperCase();
  }

  try {
    console.log(req.body);
    const data = req.body;
    const userInfo = await user.findOneAndUpdate({ _id: id }, data);
    res.status(200).json({ message: "User updated succesfully" });
  } catch (error) {
    res.status(400).json({ message: "We can't update the user" });
  }
};

userController.deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    await user.findOneAndDelete({ _id: id });
    res.status(200).json({ message: "User deleted succesfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error deleting user" });
  }
};

userController.createAdmin = async (req, res) => {
  const { name, username, company, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  let newCompany = "";
  try {
    newCompany = await companyDB.create({ name: company });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error });
  }

  try {
    await user.create({
      username,
      name,
      company: newCompany._id,
      password: hashedPassword,
      role: "admin",
    });
    return res.status(200).json({ message: "Admin user created succesfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error });
  }
};

export default userController;
