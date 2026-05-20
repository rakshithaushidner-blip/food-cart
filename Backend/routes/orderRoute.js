import express from "express";
import authMiddleware, { adminMiddleware } from "../middleware/auth.js";
import { placeOrder, verifyOrder, userOrders, listOrders, updateStatus } from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/place",      authMiddleware, placeOrder);
orderRouter.post("/verify",     verifyOrder);
orderRouter.post("/userorders", authMiddleware, userOrders);
orderRouter.get("/list",        adminMiddleware, listOrders);   // ← now protected
orderRouter.post("/status",     adminMiddleware, updateStatus); // ← now protected

export default orderRouter;