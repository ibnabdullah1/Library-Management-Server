import { UserRole } from "@prisma/client";
import express, { NextFunction, Request, Response } from "express";
import { fileUploader } from "../../helpers/fileUploader";
import auth from "../../middlewares/auth";
import { shopControllers } from "./shop.controller";
import { shopValidation } from "./shop.validation";

const router = express.Router();

router.post(
  "/create-shop",
  fileUploader.upload.single("file"),
  auth(UserRole.VENDOR),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = shopValidation.createShop.parse(JSON.parse(req.body.data));
    return shopControllers.createShop(req, res, next);
  }
);
router.get("/", auth(UserRole.VENDOR), shopControllers.getAllShops);

export const shopRoutes = router;
