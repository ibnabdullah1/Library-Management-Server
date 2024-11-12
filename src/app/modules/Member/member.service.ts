import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createMember = async (data: any) => {
  const result = prisma.member.create({
    data: data,
  });

  return result;
};
const getAllMembers = async () => {
  const result = prisma.member.findMany();

  return result;
};
const getSingleMember = async (id: string) => {
  const result = prisma.member.findUnique({
    where: {
      memberId: id,
    },
  });

  return result;
};
const deleteSingleMember = async (id: string) => {
  const result = prisma.member.delete({
    where: {
      memberId: id,
    },
  });

  return result;
};
const updateSingleMember = async (
  id: string,
  data: {
    name?: string;
    email?: string;
    phone?: string;
  }
) => {
  const result = prisma.member.update({
    where: {
      memberId: id,
    },
    data,
  });

  return result;
};

export const MemberServices = {
  createMember,
  getAllMembers,
  getSingleMember,
  updateSingleMember,
  deleteSingleMember,
};
