import { UserRole } from "@prisma/client";
import express from "express";
import auth from "../../middlewares/auth";
import { AuthController } from "./auth.controller";

const router = express.Router();

router.post("/login", AuthController.loginUser);

router.post("/refresh-token", AuthController.refreshToken);

router.post(
  "/change-password",
  auth(UserRole.ADMIN, UserRole.VENDOR, UserRole.CUSTOMER),
  AuthController.changePassword
);

router.post("/forgot-password", AuthController.forgotPassword);

router.post("/reset-password", AuthController.resetPassword);

export const AuthRoutes = router;
