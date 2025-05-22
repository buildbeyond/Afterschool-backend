import mongoose, { Document } from "mongoose";
import bcrypt from "bcryptjs";
import { IUserBase } from "../types/types";

export interface UserDocument extends Document, IUserBase {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    avatar: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: ["parent", "coach"],
      required: true,
    },
    recipientNumbers: {
      type: String,
      default: "",
    },
    companyName: {
      type: String,
      default: "",
    },
    businessNumbers: {
      type: String,
      default: "",
    },
    guardianName: {
      type: String,
      default: "",
    },
    serviceSlot: {
      type: Object,
      default: {
        attendance: [
          { start: "", end: "" },
          { start: "", end: "" },
          { start: "", end: "" },
          { start: "", end: "" },
          { start: "", end: "" },
          { start: "", end: "" },
        ],
        holiday: [
          { start: "", end: "" },
          { start: "", end: "" },
          { start: "", end: "" },
          { start: "", end: "" },
          { start: "", end: "" },
          { start: "", end: "" },
        ],
      },
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error;
  }
};

export const User = mongoose.model<UserDocument>("User", userSchema);
