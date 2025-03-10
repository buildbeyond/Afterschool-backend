import { Request } from "express";
import { Types } from "mongoose";

// Base interface without Mongoose-specific fields
export interface IUserBase {
  username: string;
  email: string;
  password: string;
  role: string;
  avatar: string;
}

// Interface for populated user documents
export interface IUser extends IUserBase {
  _id: Types.ObjectId;
}

export interface IMessage {
  _id: string;
  sender: Types.ObjectId | IUser;
  receiver: Types.ObjectId | IUser;
  content: string;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ILoginInput {
  email: string;
  password: string;
}

export interface IRegisterInput extends Omit<IUserBase, "role"> {
  role?: string;
}

export interface AuthRequest extends Request {
  user?: {
    userId: string;
  };
}
