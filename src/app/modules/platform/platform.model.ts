import { Schema, model } from "mongoose";
import { CreateImagePayload } from "./platform.interface";

const imageSchema = new Schema<CreateImagePayload>(
  {
    siteName:{type:String, required:true},
    logo: { url: { type: String, required: true }, alt: { type: String } },
    favIcon: { url: { type: String, required: true }, alt: { type: String } },
  },
  { timestamps: true }
);

export const PlatformModel = model<CreateImagePayload>("Platform", imageSchema);
