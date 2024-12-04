import { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { shopServices } from "./shop.service";

const createShop = catchAsync(async (req: Request, res: Response) => {
  const result = await shopServices.createShop(req);
  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Shop Created successfully!",
    data: result,
  });
});
const getAllShops = catchAsync(async (req: Request, res: Response) => {
  const result = await shopServices.getAllShops(req);
  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "All shop retrieved successfully!",
    data: result,
  });
});

export const shopControllers = {
  createShop,
  getAllShops,
};
