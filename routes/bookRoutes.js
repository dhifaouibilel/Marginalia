// routes/bookRoutes.js
import express from "express";
import { getBooks, getBookCards, newBook, createBook, getBookDetails, deleteBook, editBookForm, editBook } from "../controllers/bookController.js";
//, createBook, deleteBook, updateBook

const router = express.Router();
router.get("/", getBooks);
router.get("/genre/:slug", getBooks);       // ← you dropped this one; see #4
router.get("/api/books", getBookCards);
router.get("/api/books/:slug", getBookCards);
router.get("/books/:id", getBookDetails)


router.get("/add", newBook)
router.post("/add", createBook)
router.post("/books/:id/delete", deleteBook)
router.get("/books/:id/edit", editBookForm)
router.post("/books/:id/edit", editBook)

// router.post("/edit", updateBook)

export default router;

