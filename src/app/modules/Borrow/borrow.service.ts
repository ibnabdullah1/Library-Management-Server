import { PrismaClient } from "@prisma/client";
import { addDays } from "date-fns";
import httpStatus from "http-status";
import ApiError from "../../errors/ApiError";

const prisma = new PrismaClient();

const borrow = async (data: any) => {
  const bookExists = await prisma.book.findUnique({
    where: { bookId: data.bookId },
  });
  if (!bookExists) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Book does not exist with the provided bookId."
    );
  }

  // Validate that the member exists
  const memberExists = await prisma.member.findUnique({
    where: { memberId: data.memberId },
  });

  if (!memberExists) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Member does not exist with the provided memberId."
    );
  }
  const result = prisma.borrowRecord.create({
    data: data,
  });

  return result;
};

const returnBorrow = async ({ borrowId }: { borrowId: string }) => {
  // Fetch the borrow record to check if it exists and has not been returned yet
  const borrowRecord = await prisma.borrowRecord.findUnique({
    where: { borrowId },
  });

  if (!borrowRecord) {
    throw new ApiError(httpStatus.NOT_FOUND, "Borrow record not found");
  }

  if (borrowRecord.returnDate) {
    throw new ApiError(
      httpStatus.ALREADY_REPORTED,
      "This book has already been returned"
    );
  }

  // Update the borrow record to set the return date
  const updatedBorrowRecord = await prisma.borrowRecord.update({
    where: { borrowId },
    data: {
      returnDate: new Date(),
    },
  });

  // Increment availableCopies of the book
  await prisma.book.update({
    where: { bookId: borrowRecord.bookId },
    data: {
      availableCopies: {
        increment: 1,
      },
    },
  });

  return updatedBorrowRecord;
};

const borrowOverdue = async () => {
  const overdueRecords = await prisma.borrowRecord.findMany({
    where: {
      returnDate: null,
      borrowDate: { lt: addDays(new Date(), -14) },
    },
    include: { book: true, member: true },
  });
  const overdueList = overdueRecords.map((record) => ({
    borrowId: record.borrowId,
    bookTitle: record.book.title,
    borrowerName: record.member.name,
    overdueDays:
      Math.floor(
        (new Date().getTime() - record.borrowDate.getTime()) /
          (1000 * 60 * 60 * 24)
      ) - 14,
  }));

  return overdueList;
};

export const BorrowServices = {
  borrow,
  returnBorrow,
  borrowOverdue,
};
