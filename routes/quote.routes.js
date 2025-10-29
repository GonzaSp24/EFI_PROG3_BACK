import express from "express"
const router = express.Router()
import { verifyToken } from "../middleware/auth.middleware.js"
import { getAllQuotes, getQuoteById, createQuote, updateQuote, deleteQuote } from "../controllers/quote.controller.js"

router.use(verifyToken)

router.get("/", getAllQuotes)
router.get("/:id", getQuoteById)
router.post("/", createQuote)
router.put("/:id", updateQuote)
router.delete("/:id", deleteQuote)

export default router
