import { Router } from "express";
import {
  getCounterController,
  incrementController,
  decrementController,
  resetController,
} from "../controllers/counter.controller.js";

const router = Router();

router.get("/counter", getCounterController);
router.post("/counter/increment", incrementController);
router.post("/counter/decrement", decrementController);
router.post("/counter/reset", resetController);

export default router;
