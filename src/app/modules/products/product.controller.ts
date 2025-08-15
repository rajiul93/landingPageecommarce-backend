// controllers/product.controller.ts
import { Request, Response } from "express";

import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { productService } from "./product.service";

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const userId = (req as any).user?.id || (req as any).user?._id;
  console.log("userId:", req?.user?.userId as string )
  const result = await productService.createProduct(req.body, userId);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Product created successfully",
    data: result,
  });
});

export const productController = {
  createProduct,
};
