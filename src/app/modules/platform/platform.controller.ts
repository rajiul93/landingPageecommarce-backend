import { Request, Response } from "express";
import httpStatus from 'http-status';
import sendResponse from "../../utils/sendResponse";
import { PlatformModel } from "./platform.model";
import { imageService } from "./platform.service";

const createImage = async (req: Request, res: Response) => {
 
  const image = await imageService.createImage(req.body,req.file);
  res.status(201).json({
    success: true,
    message: "Image uploaded successfully",
    data: image
  });
};
const updatePlatform = async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await PlatformModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
 
  console.log("BODY:", req.body);
  console.log("PARAM ID:", req.params.id);
 sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'update  platform successfully',
    data: result,
  });
};

 

export const imageController = {
  createImage, 
  updatePlatform
};
