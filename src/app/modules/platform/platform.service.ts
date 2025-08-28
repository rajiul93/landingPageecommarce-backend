
import { CreateImagePayload } from "./platform.interface";
import { PlatformModel } from "./platform.model";
 

const createImage = async (payload: CreateImagePayload, file:any) => {
  const image = await PlatformModel.create(payload);
  return image;
};
const updatePlatform = async (payload: CreateImagePayload, id:string) => {
  const image = await PlatformModel.create(payload);
  return image;
};

 
export const imageService = {
  createImage,
 updatePlatform
};
