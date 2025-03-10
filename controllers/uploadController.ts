import { Request, RequestHandler, Response } from "express";
import multer, { FileFilterCallback } from "multer";
import { AuthRequest } from "../types/types";
import fs from "fs";
import { User } from "../models/User";

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

const imagesPath = "./uploads/images";

if (!fs.existsSync(imagesPath)) {
  fs.mkdirSync(imagesPath, { recursive: true });
}

export const fileStorage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    callback: DestinationCallback
  ): void => {
    callback(null, imagesPath);
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
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    callback(null, true);
  } else {
    callback(new Error("Invalid file type"));
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
};
