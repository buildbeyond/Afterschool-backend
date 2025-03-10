import { Response, NextFunction } from "express";
import { AuthRequest } from "../types/types";
import { User } from "../models/User";

export const checkRole = (roles: string[]) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const user = await User.findById(req.user?.userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (!roles.includes(user.role)) {
        return res.status(403).json({
          message: "You don't have permission to access this resource",
        });
      }

      next();
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };
};
