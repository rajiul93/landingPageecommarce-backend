import { Request, Response } from "express";
import { imageService } from "./platform.service";

const createImage = async (req: Request, res: Response) => {
 
  const image = await imageService.createImage(req.body,req.file);
  res.status(201).json({
    success: true,
    message: "Image uploaded successfully",
    data: image
  });
};

 

export const imageController = {
  createImage, 
};
