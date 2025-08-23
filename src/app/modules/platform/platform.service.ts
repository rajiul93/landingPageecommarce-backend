
import { CreateImagePayload } from "./platform.interface";
import { PlatformModel } from "./platform.model";
 

const createImage = async (payload: CreateImagePayload, file:any) => {
  const image = await PlatformModel.create(payload);
  return image;
};

 
export const imageService = {
  createImage,
 
};
