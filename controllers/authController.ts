import { Request, Response, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { ILoginInput, IRegisterInput } from "../types/types";
import { AuthRequest } from "../types/types";
import sendResetEmail from "../utils/sendMail";
import crypto from "crypto";

export const authController = {
  register: (async (req: Request, res: Response) => {
    try {
      const { username, email, password, role }: IRegisterInput = req.body;

      const existingUser = await User.findOne({
        $or: [{ email }, { username }],
      });

      if (existingUser) {
        return res
          .status(400)
          .json({ message: "すでに同じユーザーが存在します。" });
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

  getAllParents: (async (req: AuthRequest, res: Response) => {
    try {
      const user = await User.findById(req.user?.userId);
      if (!user) {
        return res.status(404).json({ message: "ユーザーが見つかりません。" });
      }
      if (user.role != "coach") {
        return res.status(401).json({ message: "No permission." });
      }
      const parents = await User.find({
        role: "parent",
      }).select("id username avatar");
      res.json({ parents });
    } catch (err) {
      res.status(500).json({ message: "サーバーエラー" });
    }
  }) as RequestHandler,

  forgotPassword: (async (req: Request, res: Response) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send("User not found");

    const token = crypto.randomBytes(32).toString("hex");
    // user.resetToken = token;
    // user.resetTokenExpiry = Date.now() + 3600000;
    // await user.save();

    const resetLink = `https://yourapp.com/reset-password/${token}`;
    console.log(resetLink);
    // sendResetEmail(email, resetLink);

    res.send("Reset link sent (check your inbox)");
  }) as RequestHandler,

  resetPassword: (async (req: Request, res: Response) => {
    const { token } = req.params;
    const { password } = req.body;
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });
    if (!user) return res.status(400).send("Invalid or expired token");

    user.password = password;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    res.send("Password has been reset!");
  }) as RequestHandler,
};
