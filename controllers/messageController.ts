import { Request, Response, RequestHandler } from "express";
import { Message } from "../models/Message";
import { User } from "../models/User";
import { AuthRequest, IUser } from "../types/types";
import { Types } from "mongoose";

export const messageController = {
  // Get the coach (used by parents to send messages)
  getCoach: (async (req: AuthRequest, res: Response) => {
    try {
      const coach = await User.findOne({ role: "coach" }).select("-password");
      if (!coach) {
        return res.status(404).json({ message: "コーチが見つかりません。" });
      }
      res.json({ coach });
    } catch (error) {
      res.status(500).json({ message: "サーバーエラー" });
    }
  }) as RequestHandler,

  // Get parent list (only for coach)
  getParentList: (async (req: AuthRequest, res: Response) => {
    try {
      // Get all parents
      const parents = await User.find({ role: "parent" }).select("-password");

      // Get the latest message for each parent
      const parentsWithLastMessage = await Promise.all(
        parents.map(async (parent) => {
          const lastMessage = await Message.findOne({
            $or: [
              { sender: parent._id, receiver: req.user?.userId },
              { sender: req.user?.userId, receiver: parent._id },
            ],
          })
            .sort({ createdAt: -1 })
            .select("content createdAt");

          return {
            ...parent.toObject(),
            lastMessage: lastMessage
              ? {
                  content: lastMessage.content,
                  createdAt: lastMessage.createdAt,
                }
              : null,
          };
        })
      );

      res.json(parentsWithLastMessage);
    } catch (error) {
      res.status(500).json({ message: "サーバーエラー" });
    }
  }) as RequestHandler,

  // Get conversation between two users
  getConversation: (async (req: AuthRequest, res: Response) => {
    try {
      const { otherUserId } = req.params;

      const messages = await Message.find({
        $or: [
          { sender: req.user?.userId, receiver: otherUserId },
          { sender: otherUserId, receiver: req.user?.userId },
        ],
      })
        .sort({ createdAt: 1 })
        .populate("sender receiver", "username");

      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: "サーバーエラー" });
    }
  }) as RequestHandler,

  // Send a message
  sendMessage: (async (req: AuthRequest, res: Response) => {
    try {
      const { receiver, content } = req.body;

      const message = new Message({
        sender: req.user?.userId,
        receiver,
        content,
      });

      await message.save();
      await message.populate("sender receiver", "username");

      res.status(201).json(message);
    } catch (error) {
      res.status(500).json({ message: "サーバーエラー" });
    }
  }) as RequestHandler,

  // Mark message as read
  markAsRead: (async (req: AuthRequest, res: Response) => {
    try {
      const { messageId } = req.params;

      const message = await Message.findByIdAndUpdate(
        messageId,
        { read: true },
        { new: true }
      );

      if (!message) {
        return res
          .status(404)
          .json({ message: "メッセージが見つかりません。" });
      }

      res.json(message);
    } catch (error) {
      res.status(500).json({ message: "サーバーエラー" });
    }
  }) as RequestHandler,
};
