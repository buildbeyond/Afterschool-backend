import mongoose from "mongoose";
import { IAttachment } from "../types/types";

const attachmentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    fileContent: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Attachment = mongoose.model<IAttachment>(
  "Attachment",
  attachmentSchema
);
