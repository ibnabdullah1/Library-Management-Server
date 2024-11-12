import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BorrowServices } from "./borrow.service";

const borrow = catchAsync(async (req, res) => {
  const result = await BorrowServices.borrow(req.body);

  sendResponse(res, {
    success: true,
    status: httpStatus.CREATED,
    message: "Book borrowed successfully",
    data: result,
  });
});
const borrowReturn = catchAsync(async (req, res) => {
  await BorrowServices.returnBorrow(req.body);

  sendResponse(res, {
    success: true,
    status: httpStatus.CREATED,
    message: "Book returned successfully",
  });
});
const borrowOverdue = catchAsync(async (req, res) => {
  const result = await BorrowServices.borrowOverdue();

  if (result.length > 0) {
    return res.status(200).json({
      success: true,
      status: 200,
      message: "Overdue borrow list fetched",
      data: result,
    });
  } else {
    return res.status(200).json({
      success: true,
      status: 200,
      message: "No overdue books",
      data: [],
    });
  }
});

export const BorrowControllers = {
  borrow,
  borrowReturn,
  borrowOverdue,
};
