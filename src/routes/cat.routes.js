import { Router } from "express";
import { getCats,getCatById,updatedCatById, createCat, deleteCatById, getCatsByAgeRange } from "../controllers/cat.controller.js";
import { verifyUser } from "../middlewares/auth.middlewares.js";
const router = Router();

router.route("/cats").get(getCats)
router.route("/cats/search").get(getCatsByAgeRange)
router.route("/cats/:id").get(getCatById)
router.route("/cats").post(verifyUser,createCat)
router.route("/cats/:id").put(verifyUser,updatedCatById)
router.route("/cats/:id").delete(verifyUser,deleteCatById)

export default router;
