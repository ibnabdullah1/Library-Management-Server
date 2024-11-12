import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { MemberServices } from "./member.service";

const createMember = catchAsync(async (req, res) => {
  const Member = await MemberServices.createMember(req.body);

  sendResponse(res, {
    success: true,
    status: httpStatus.CREATED,
    message: "Member created successfully",
    data: Member,
  });
});
const getAllMembers = catchAsync(async (req, res) => {
  const Member = await MemberServices.getAllMembers();

  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: "Members retrieved successfully",
    data: Member,
  });
});
const getSingleMember = catchAsync(async (req, res) => {
  const { memberId } = req.params;
  const Member = await MemberServices.getSingleMember(memberId);

  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: "Members retrieved successfully",
    data: Member,
  });
});
const updateSingleMember = catchAsync(async (req, res) => {
  const { memberId } = req.params;
  const data = req.body;
  const Member = await MemberServices.updateSingleMember(memberId, data);

  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: "Member update successfully",
    data: Member,
  });
});
const deleteSingleMember = catchAsync(async (req, res) => {
  const { memberId } = req.params;
  await MemberServices.deleteSingleMember(memberId);

  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: "Member successfully deleted",
  });
});

export const MemberControllers = {
  createMember,
  getAllMembers,
  getSingleMember,
  updateSingleMember,
  deleteSingleMember,
};
