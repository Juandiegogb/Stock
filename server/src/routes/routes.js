import express from "express";
import userController from "../controllers/usersController.js";
import elementController from "../controllers/elementsController.js";
import providerController from "../controllers/providersController.js";

const router = express.Router();

export default router;

// User section
router.post("/createUser", userController.createUser);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.put("/updateUser/:id", userController.updateUser);
router.delete("/deleteUser/:id", userController.deleteUser);
router.get("/getUsers", userController.getUsers);
router.get("/getUser/:id", userController.getUser);

// Element section
router.post("/createElement", elementController.createElement);
router.put("/updateElement/:id", elementController.updateElement);
router.delete("/deleteElement/:id", elementController.deleteElement);
router.get("/getElement/:id", elementController.getElement);
router.get("/getElements", elementController.getElements);

//Sale section
router.post("/createSale");
router.put("/updateSale");
router.delete("/deleteSale");
router.get("/getSale");
router.get("/getSales");

//Provider section
router.post("/createProvider", providerController.createProvider);
router.put("/updateProvider");
router.delete("/deleteProvider");
router.get("/getProvider");
router.get("/getProviders");
