import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Not authorized. Please login." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = decoded.id;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "Session expired. Please login again." });
    }
    return res.status(403).json({ success: false, message: "Invalid token." });
  }
};

// Admin middleware - checks for admin credentials in header
export const adminMiddleware = async (req, res, next) => {
  const adminKey = req.headers["x-admin-key"];
  if (!adminKey || adminKey !== process.env.ADMIN_PASSWORD) {
    return res.status(403).json({ success: false, message: "Admin access denied." });
  }
  next();
};

export default authMiddleware;
