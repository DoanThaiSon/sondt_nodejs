import express from "express";
import { createBanner, getAllBanners } from "../controllers/bannerController.js";

const router = express.Router();

router.get("/", getAllBanners);
router.post("/", createBanner);


export default router;
