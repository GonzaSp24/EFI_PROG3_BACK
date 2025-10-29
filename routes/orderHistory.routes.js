import express from "express"
const router = express.Router()
import { verifyToken } from "../middleware/auth.middleware.js"
import { getAllOrderHistory, getOrderHistoryById, createOrderHistory } from "../controllers/orderHistory.controller.js"

router.use(verifyToken)

router.get("/", getAllOrderHistory)
router.get("/:id", getOrderHistoryById)
router.post("/", createOrderHistory)

export default router
