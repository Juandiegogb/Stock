import express from "express";
import userController from "../controllers/usersController.js";

const router = express.Router();

export default router;

// User section
router.post("/createUser", userController.createUser);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.put("/updateUser/:id", userController.updateUser);
router.delete("/deleteUser");
router.get("/getUsers", userController.getUsers);
router.get("/getUser/:id", userController.getUser);

// Element section
router.post("/createElement");
router.put("/updateElement");
router.delete("/deleteElement");
router.get("/getElement");
router.get("/getElements");

//Sale section
router.post("/createSale");
router.put("/updateSale");
router.delete("/deleteSale");
router.get("/getSale");
router.get("/getSales");

//Provider section
router.post("/createProvider");
router.put("/updateProvider");
router.delete("/deleteProvider");
router.get("/getProvider");
router.get("/getProviders");
