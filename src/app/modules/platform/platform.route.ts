import express, { NextFunction, Request, Response } from "express";
import AppError from "../../error/AppError";
import validateRequest from "../../middleware/validateRequest";
import { deleteFile, upload } from "../../utils/sendImage";
import { imageController } from "./platform.controller";
import { PlatformModel } from "./platform.model";
import { createImageSchema } from "./platform.validation";

const router = express.Router();

router.post(
  "/",
  upload.array("files", 2),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.files || (req.files as Express.Multer.File[]).length < 2) {
        throw new AppError(400, "Two files (logo and favIcon) are required");
      }

      const files = req.files as Express.Multer.File[];
      const logoFile = files[0];
      const favIconFile = files[1];

      // body parse
      let parsedBody: any = {};
      if (req?.body?.data) {
        try {
          parsedBody = JSON.parse(req.body.data);
          console.log(parsedBody)
        } catch (e) {
          throw new AppError(400, "Invalid JSON in 'data' field");
        }
      }

      // merge all data
      req.body = {
        ...parsedBody, // siteName, etc
        logo: {
          url: logoFile.filename,
          alt: logoFile.originalname,
        },
        favIcon: {
          url: favIconFile.filename,
          alt: favIconFile.originalname,
        },
      };

      next();
    } catch (err) {
      next(err);
    }
  },
  validateRequest(createImageSchema),
  imageController.createImage
);

router.put(
  "/:id",
  upload.array("files", 2),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const files = req.files as Express.Multer.File[];

      // আগের ডেটা বের করি
      const existingImage = await PlatformModel.findById(id);
      console.log("first", existingImage);

      if (!existingImage) {
        // id না পাওয়া গেলে আপলোড হওয়া ফাইল ডিলিট করি
        if (files && files.length > 0) {
          files.forEach((file) => deleteFile(file.filename));
        }
        throw new AppError(404, "Image id not found");
      }

      // id পাওয়া গেলে আগের মতো ডেটা update করি
      let parsedBody: any = {};
      if (req?.body?.data) {
        try {
          parsedBody = JSON.parse(req.body.data);
        } catch (e) {
          throw new AppError(400, "Invalid JSON in 'data' field");
        }
      }

      let updatedData: any = {
        ...parsedBody,
        logo: existingImage.logo,
        favIcon: existingImage.favIcon,
      };

      if (files && files.length > 0) {
        if (files[0]) { 
          deleteFile(existingImage.logo.url); 
          updatedData.logo = {
            url: files[0].filename,
            alt: files[0].originalname,
          };
        }

        if (files[1]) { 
          deleteFile(existingImage.favIcon.url);
          updatedData.favIcon = {
            url: files[1].filename,
            alt: files[1].originalname,
          };
        }
      }

      req.body = updatedData;
      next();
    } catch (err) {
      next(err);
    }
  },
  imageController.updatePlatform
);



export const platformRoutes = router;
