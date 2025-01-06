import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/mongo.js";
import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";
import path from "path";

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 5000;
const __dirname = path.resolve();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json()); //allows us to parse incoming requests: req.body
app.use(cookieParser()); // allows to parse incoming cookies
app.use("/api/auth", authRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}
app.listen(port, () => {
  console.log(`Server running on port - ${port}`);
});