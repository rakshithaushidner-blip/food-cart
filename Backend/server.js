import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 4000;

// Security headers
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));

// CORS - restricted to your frontend only
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting on auth routes (stops brute force)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { success: false, message: "Too many attempts. Try again in 15 minutes." },
});

connectDB();

// Routes
app.use("/api/food",  foodRouter);
app.use("/api/user",  authLimiter, userRouter);
app.use("/api/cart",  cartRouter);
app.use("/api/order", orderRouter);
app.use("/images",    express.static("uploads"));

// Health check - required for cloud platforms (Render, Railway, etc.)
app.get("/health", (req, res) => {
  res.json({ status: "ok", app: "FoodCart", uptime: process.uptime() });
});

app.get("/", (req, res) => res.send("FoodCart API is running ✓"));

// Global error handler
app.use((err, req, res, _next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason);
});

app.listen(port, () => {
  console.log(`✓ FoodCart server running on http://localhost:${port}`);
});
