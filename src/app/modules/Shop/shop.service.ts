import { Shop } from "@prisma/client";
import { fileUploader } from "../../helpers/fileUploader";
import { IFile } from "../../interfaces/file";
import prisma from "../../utils/prisma";

const createShop = async (req: any): Promise<Shop> => {
  const file = req.file as IFile;
  const isOwner = await prisma.user.findUnique({
    where: { email: req?.user.email },
  });

  if (!isOwner) {
    throw new Error("Owner not found");
  }

  // Handle file upload if present
  if (file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
    req.body.logo = uploadToCloudinary?.secure_url;
  }

  // Create the shop and link it to the user as the owner
  const result = await prisma.shop.create({
    data: {
      ...req.body,
      owner: {
        connect: { id: isOwner.id },
      },
    },
  });

  return result;
};
const getAllShops = async (req: any) => {
  const isOwner = await prisma.user.findUnique({
    where: { email: req?.user.email },
  });

  const shops = await prisma.shop.findMany({
    where: {
      ownerId: isOwner?.id,
    },
    include: {
      owner: true,
      products: true,
      orders: true,
    },
  });
  return shops;
};

export const shopServices = {
  createShop,
  getAllShops,
};
