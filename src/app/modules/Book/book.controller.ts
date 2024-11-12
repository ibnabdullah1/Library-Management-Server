import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BookServices } from "./book.service";

const createBook = catchAsync(async (req, res) => {
  const Book = await BookServices.createBook(req.body);

  sendResponse(res, {
    success: true,
    status: httpStatus.CREATED,
    message: "Book created successfully",
    data: Book,
  });
});
const getAllBooks = catchAsync(async (req, res) => {
  const Book = await BookServices.getAllBooks();

  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: "Books retrieved successfully",
    data: Book,
  });
});
const getSingleBook = catchAsync(async (req, res) => {
  const { bookId } = req.params;
  console.log(bookId);
  const Book = await BookServices.getSingleBook(bookId);

  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: "Books retrieved successfully",
    data: Book,
  });
});
const updateSingleBook = catchAsync(async (req, res) => {
  const { bookId } = req.params;
  const data = req.body;
  const Book = await BookServices.updateSingleBook(bookId, data);

  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: "Book update successfully",
    data: Book,
  });
});
const deleteSingleBook = catchAsync(async (req, res) => {
  const { bookId } = req.params;
  const Book = await BookServices.deleteSingleBook(bookId);

  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: "Book successfully deleted",
  });
});

export const BookControllers = {
  createBook,
  getAllBooks,
  getSingleBook,
  updateSingleBook,
  deleteSingleBook,
};
