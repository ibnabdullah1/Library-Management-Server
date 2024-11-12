import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createBook = async (data: any) => {
  const result = prisma.book.create({
    data: data,
  });

  return result;
};
const getAllBooks = async () => {
  const result = prisma.book.findMany();

  return result;
};
const getSingleBook = async (id: string) => {
  const result = prisma.book.findUnique({
    where: {
      bookId: id,
    },
  });

  return result;
};
const deleteSingleBook = async (id: string) => {
  const result = prisma.book.delete({
    where: {
      bookId: id,
    },
  });

  return result;
};
const updateSingleBook = async (
  id: string,
  data: {
    title?: string;
    genre?: string;
    publishedYear?: number;
    totalCopies?: number;
    availableCopies?: number;
  }
) => {
  const result = prisma.book.update({
    where: {
      bookId: id,
    },
    data,
  });

  return result;
};

export const BookServices = {
  createBook,
  getAllBooks,
  getSingleBook,
  updateSingleBook,
  deleteSingleBook,
};
