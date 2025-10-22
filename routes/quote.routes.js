const express = require("express")
const router = express.Router()
const { verifyToken } = require("../middleware/auth.middleware")
const { getAllQuotes, getQuoteById, createQuote, updateQuote, deleteQuote } = require("../controllers/quote.controller")

router.use(verifyToken)

router.get("/", getAllQuotes)
router.get("/:id", getQuoteById)
router.post("/", createQuote)
router.put("/:id", updateQuote)
router.delete("/:id", deleteQuote)

module.exports = router
