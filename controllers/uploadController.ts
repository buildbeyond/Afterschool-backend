import { Request, RequestHandler, Response } from "express";
import multer, { FileFilterCallback } from "multer";
import { AuthRequest } from "../types/types";
import fs from "fs";
import { User } from "../models/User";
import { Attachment } from "../models/Attachment";

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

const defaultPath = "./uploads/default";
const imagesPath = "./uploads/images";
const attachmentPath = "./uploads/attachments";

if (!fs.existsSync(defaultPath)) {
  fs.mkdirSync(defaultPath, { recursive: true });
}
if (!fs.existsSync(imagesPath)) {
  fs.mkdirSync(imagesPath, { recursive: true });
}
if (!fs.existsSync(attachmentPath)) {
  fs.mkdirSync(attachmentPath, { recursive: true });
}

export const fileStorage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    callback: DestinationCallback
  ): void => {
    let dest = defaultPath;
    if (req.url.includes("uploadAvatar")) {
      dest = imagesPath;
    } else if (req.url.includes("uploadAttachment")) {
      dest = attachmentPath;
    }
    callback(null, dest);
  },

  filename: (
    req: Request,
    file: Express.Multer.File,
    callback: FileNameCallback
  ): void => {
    callback(null, `${Date.now()}-${file.originalname}`);
  },
});

export const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback
): void => {
  if (req.baseUrl.includes("uploadAvatar")) {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      callback(null, true);
    } else {
      callback(new Error("Invalid file type"));
    }
  } else if (req.baseUrl.includes("uploadAttachment")) {
    callback(null, true);
  } else {
    callback(null, true);
  }
};

const upload = multer({ storage: fileStorage, fileFilter: fileFilter });

export const uploadController = {
  uploadAvatar: [
    upload.single("avatar"),
    (async (req: AuthRequest, res: Response) => {
      try {
        const file = req.file;
        if (!file) {
          return res.status(400).json({ message: "No file uploaded" });
        }
        const user = await User.findById(req.user?.userId);
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        user.avatar = `${req.protocol}://${req.get("host")}/${file.path.replace(
          "./",
          ""
        )}`;
        await user.save();
        res.json({
          message: "Avatar uploaded successfully",
          user: { avatar: user.avatar },
        });
      } catch (error) {
        res.status(500).json({ message: "Server error" });
      }
    }) as RequestHandler,
  ],
  uploadAttachment: [
    upload.single("attachment"),
    (async (req: AuthRequest, res: Response) => {
      try {
        const file = req.file;
        if (!file) {
          return res.status(400).json({ message: "No file uploaded" });
        }
        const user = await User.findById(req.user?.userId);
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        const newAttachment = new Attachment({
          user: user.id,
          fileName: file.originalname,
          fileContent: file.path,
        });
        await newAttachment.save();
        res.json({
          message: "Attachment uploaded successfully",
          attachment: newAttachment._id,
        });
      } catch (error) {
        res.status(500).json({ message: "Server error" });
      }
    }) as RequestHandler,
  ],
};
