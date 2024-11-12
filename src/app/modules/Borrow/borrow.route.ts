import express from "express";
import { BorrowControllers } from "./borrow.controller";

const router = express.Router();
router.post("/borrow", BorrowControllers.borrow);
router.get("/borrow/overdue", BorrowControllers.borrowOverdue);
router.post("/return", BorrowControllers.borrowReturn);

export const BorrowRoutes = router;
