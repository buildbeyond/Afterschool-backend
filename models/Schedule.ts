import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "../types/types";

export interface ISchedule extends Document {
  user: mongoose.Types.ObjectId | IUser;
  month: string;
  year: string;
  entries: Array<{
    date: string;
    day: string;
    isHoliday: boolean;
    beAbsent: boolean;
    wasAbsent: boolean;
    plannedStart: string;
    plannedEnd: string;
    plannedPickup: boolean;
    plannedReturn: boolean;
    plannedPickupLocation: string;
    plannedReturnLocation: string;
    actualStart: string;
    actualEnd: string;
    lunch: boolean;
    dinner: boolean;
    hadSnack: boolean;
    hadLunch: boolean;
    hadDinner: boolean;
    additionalUse: boolean;
    notes: string;
    remarks: string;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const ScheduleSchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    month: { type: String, required: true },
    year: { type: String, required: true },
    entries: [
      {
        date: { type: String, required: true },
        day: { type: String, required: true },
        isHoliday: { type: Boolean, default: false },
        beAbsent: { type: Boolean, default: false },
        wasAbsent: { type: Boolean, default: false },
        plannedStart: { type: String, default: "" },
        plannedEnd: { type: String, default: "" },
        plannedPickup: { type: Boolean, default: false },
        plannedReturn: { type: Boolean, default: false },
        plannedPickupLocation: { type: String, default: "学校" },
        plannedReturnLocation: { type: String, default: "学校" },
        actualStart: { type: String, default: "" },
        actualEnd: { type: String, default: "" },
        lunch: { type: Boolean, default: true },
        dinner: { type: Boolean, default: true },
        hadSnack: { type: Boolean, default: false },
        hadLunch: { type: Boolean, default: false },
        hadDinner: { type: Boolean, default: false },
        additionalUse: { type: Boolean, default: false },
        notes: { type: String, default: "" },
        remarks: { type: String, default: "" },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<ISchedule>("Schedule", ScheduleSchema);
