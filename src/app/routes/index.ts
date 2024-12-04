import express from "express";
import { AuthRoutes } from "../modules/Auth/auth.routes";
import { productRoutes } from "../modules/Product/product.routes";
import { shopRoutes } from "../modules/Shop/shop.routes";
import { userRoutes } from "../modules/User/user.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/user",
    route: userRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/shop",
    route: shopRoutes,
  },
  {
    path: "/product",
    route: productRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
