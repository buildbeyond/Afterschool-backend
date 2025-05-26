import { Request } from "express";
import { Types } from "mongoose";

// Base interface without Mongoose-specific fields
export interface IUserBase {
  username: string;
  email: string;
  password: string;
  role: string;
  avatar: string;
  recipientNumbers: string;
  companyName: string;
  businessNumbers: string;
  guardianName: string;
  serviceSlot: {
    attendance: { start: string; end: string }[];
    holiday: { start: string; end: string }[];
  };
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
  attachment: string;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAttachment {
  _id: string;
  user: Types.ObjectId | IUser;
  fileName: string;
  fileContent: string;
  createAt: Date;
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
