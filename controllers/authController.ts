import { Request, Response, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { ILoginInput, IRegisterInput } from "../types/types";
import { AuthRequest } from "../types/types";

export const authController = {
  register: (async (req: Request, res: Response) => {
    try {
      const { username, email, password, role }: IRegisterInput = req.body;

      const existingUser = await User.findOne({
        $or: [{ email }, { username }],
      });

      if (existingUser) {
        return res.status(400).json({ message: "すでに同じユーザーが存在します。" });
      }

      const user = new User({ username, email, password, role });
      await user.save();

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
        expiresIn: "7d",
      });

      res.status(201).json({ user, token });
    } catch (error) {
      res.status(500).json({
        message: "Server error",
        details: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }) as RequestHandler,

  login: (async (req: Request, res: Response) => {
    try {
      const { email, password }: ILoginInput = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "ユーザーが見つかりません。" });
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ message: "パスワードが正しくありません。" });
      }

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
        expiresIn: "7d",
      });

      res.json({ user, token });
    } catch (error) {
      res.status(500).json({ message: "サーバーエラー" });
    }
  }) as RequestHandler,

  getCurrentUser: (async (req: AuthRequest, res: Response) => {
    try {
      const user = await User.findById(req.user?.userId).select("-password");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ user });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }) as RequestHandler,

  saveProfile: (async (req: AuthRequest, res: Response) => {
    try {
      const { profileData } = req.body;
      const userId = req.user?.userId;
      const user = await User.findByIdAndUpdate(
        userId,
        {
          $set: profileData,
        },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ message: "ユーザーが見つかりません。" });
      }
      res.json({ user });
    } catch (error) {
      res.status(500).json({ message: "サーバーエラー" });
    }
  }) as RequestHandler,
};
