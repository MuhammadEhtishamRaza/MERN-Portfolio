import express from "express";
import multer from "multer";
import { storage } from "../config/cloudinary.js";
import {
  deletePortfolioData,
  getPortfolioData,
  sendPortfolioData,
  updatePortfolioData,
} from "../controllers/portfolio.controller.js";

const router = express.Router();
const upload = multer({ storage });

router.get("/portfolio", getPortfolioData);
router.post("/portfolio", upload.single("image"), sendPortfolioData);
router.put("/portfolio/:id", upload.single("image"), updatePortfolioData);
router.delete("/portfolio/:id", deletePortfolioData);

export default router;
