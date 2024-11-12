import express from "express";
import { BookControllers } from "./book.controller";
const router = express.Router();
router.post("/", BookControllers.createBook);
router.get("/", BookControllers.getAllBooks);
router.get("/:bookId", BookControllers.getSingleBook);
router.put("/:bookId", BookControllers.updateSingleBook);
router.delete("/:bookId", BookControllers.deleteSingleBook);
export const BookRoutes = router;
