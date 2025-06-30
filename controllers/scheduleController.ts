import { Response } from "express";
import { AuthRequest, IUser } from "../types/types";
import Schedule, { ISchedule } from "../models/Schedule";

export const scheduleController = {
  createSchedule: async (req: AuthRequest, res: Response) => {
    try {
      const { month, year, entries } = req.body;
      const userId = req.user?.userId;

      // Check if schedule already exists for this month/year
      const existingSchedule = await Schedule.findOne({
        user: userId,
        month,
        year,
      });

      if (existingSchedule) {
        // Update existing schedule
        existingSchedule.entries = entries;
        await existingSchedule.save();
        return res.status(200).json({
          message: "Schedule updated successfully",
          schedule: existingSchedule,
        });
      }

      // Create new schedule
      const newSchedule = new Schedule({
        user: userId,
        month,
        year,
        entries,
      });

      await newSchedule.save();
      res.status(201).json({
        message: "Schedule created successfully",
        schedule: newSchedule,
      });
    } catch (error) {
      console.error("Schedule creation error:", error);
      res.status(500).json({ message: "Server error" });
    }
  },

  getSchedule: async (req: AuthRequest, res: Response) => {
    try {
      const { month, year } = req.query;
      const userId = req.user?.userId;

      const schedule = await Schedule.findOne({
        user: userId,
        month,
        year,
      });

      if (!schedule) {
        return res.status(404).json({ message: "Schedule not found" });
      }

      res.status(200).json({ schedule });
    } catch (error) {
      console.error("Get schedule error:", error);
      res.status(500).json({ message: "Server error" });
    }
  },

  getStats: async (req: AuthRequest, res: Response) => {
    try {
      const { month, day, year } = req.query;

      // For coaches, get statistics across all users
      const schedules: ISchedule[] = await Schedule.find({
        month,
        year,
      }).populate("user");

      if (schedules.length === 0) {
        return res
          .status(404)
          .json({ message: "No schedules found for this period" });
      }

      // Calculate statistics
      const stats = schedules
        .filter(
          (schedule) =>
            schedule.entries.filter((entry) => entry.date === day).length
        )
        .map((schedule) => {
          return {
            user: {
              id: (schedule.user as IUser)._id,
              username: (schedule.user as IUser).username,
              avatar: (schedule.user as IUser).avatar,
            },
            scheduleInfo: schedule.entries.filter(
              (entry) => entry.date === day
            )[0],
          };
        });

      res.status(200).json({ stats });
    } catch (error) {
      console.error("Statistics error:", error);
      res.status(500).json({ message: "Server error" });
    }
  },

  updateScheduleStats: async (req: AuthRequest, res: Response) => {
    try {
      const { day } = req.body;

      if (day) {
        const { scheduleUpdates, month, year } = req.body;
        const updatePromises = scheduleUpdates.map(async (update: any) => {
          const schedule = await Schedule.findOne({
            user: update.user.id,
            month,
            year,
          });

          if (schedule) {
            const entryIndex = schedule.entries.findIndex(
              (entry) => entry.date === day
            );
            if (entryIndex !== -1) {
              // Preserve existing entry data and merge with updates
              await Schedule.updateOne(
                {
                  _id: schedule._id,
                  "entries.date": day,
                },
                {
                  $set: {
                    [`entries.${entryIndex}.actualStart`]:
                      update.scheduleInfo.actualStart,
                    [`entries.${entryIndex}.actualEnd`]:
                      update.scheduleInfo.actualEnd,
                    [`entries.${entryIndex}.actualAmount`]:
                      update.scheduleInfo.actualAmount,
                    [`entries.${entryIndex}.isHoliday`]:
                      update.scheduleInfo.isHoliday,
                    [`entries.${entryIndex}.wasPresent`]:
                      update.scheduleInfo.wasPresent,
                    [`entries.${entryIndex}.wasAbsent`]:
                      update.scheduleInfo.wasAbsent,
                    [`entries.${entryIndex}.plannedStart`]:
                      update.scheduleInfo.plannedStart,
                    [`entries.${entryIndex}.plannedEnd`]:
                      update.scheduleInfo.plannedEnd,
                    [`entries.${entryIndex}.plannedPickupLocation`]:
                      update.scheduleInfo.plannedPickupLocation,
                    [`entries.${entryIndex}.plannedReturnLocation`]:
                      update.scheduleInfo.plannedReturnLocation,
                    [`entries.${entryIndex}.plannedPickup`]:
                      update.scheduleInfo.plannedPickup,
                    [`entries.${entryIndex}.plannedReturn`]:
                      update.scheduleInfo.plannedReturn,
                    [`entries.${entryIndex}.additionalUse`]:
                      update.scheduleInfo.additionalUse,
                    [`entries.${entryIndex}.hadSnack`]:
                      update.scheduleInfo.hadSnack,
                    [`entries.${entryIndex}.lunch`]: update.scheduleInfo.lunch,
                    [`entries.${entryIndex}.dinner`]:
                      update.scheduleInfo.dinner,
                    [`entries.${entryIndex}.hadLunch`]:
                      update.scheduleInfo.hadLunch,
                    [`entries.${entryIndex}.hadDinner`]:
                      update.scheduleInfo.hadDinner,
                    [`entries.${entryIndex}.remarks`]:
                      update.scheduleInfo.remarks,
                    [`entries.${entryIndex}.supportType`]:
                      update.scheduleInfo.supportType,
                    [`entries.${entryIndex}.familySupport`]:
                      update.scheduleInfo.familySupport,
                    [`entries.${entryIndex}.medicalSupport`]:
                      update.scheduleInfo.medicalSupport,
                    [`entries.${entryIndex}.extendedSupport`]:
                      update.scheduleInfo.extendedSupport,
                    [`entries.${entryIndex}.concentratedSupport`]:
                      update.scheduleInfo.concentratedSupport,
                    [`entries.${entryIndex}.specializedSupport`]:
                      update.scheduleInfo.specializedSupport,
                    [`entries.${entryIndex}.communitySupport`]:
                      update.scheduleInfo.communitySupport,
                    [`entries.${entryIndex}.bathSupport`]:
                      update.scheduleInfo.bathSupport,
                    [`entries.${entryIndex}.childCareSupport`]:
                      update.scheduleInfo.childCareSupport,
                    [`entries.${entryIndex}.selfSupport`]:
                      update.scheduleInfo.selfSupport,
                    [`entries.${entryIndex}.guardianConfirmation`]:
                      update.scheduleInfo.guardianConfirmation,
                  },
                }
              );
            }
          }
        });

        await Promise.all(updatePromises);
        res
          .status(200)
          .json({ message: "Schedule statistics updated successfully" });
      } else {
        const { scheduleUpdates, userId, month, year } = req.body;
        console.log(scheduleUpdates);
        console.log(userId);
        console.log(month);
        console.log(year);
        const existingSchedule = await Schedule.findOne({
          user: userId,
          month,
          year,
        });
        console.log(existingSchedule);

        if (existingSchedule) {
          // Update existing schedule
          existingSchedule.entries = scheduleUpdates;
          await existingSchedule.save();
          return res.status(200).json({
            message: "Schedule updated successfully",
            schedule: existingSchedule,
          });
        }
      }
    } catch (error) {
      console.error("Update schedule stats error:", error);
      res.status(500).json({
        message: "Server error",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },

  getIndividual: async (req: AuthRequest, res: Response) => {
    try {
      const { month, year, userId } = req.query;
      const schedule = await Schedule.findOne({
        user: userId,
        month,
        year,
      }).populate("user");

      if (!schedule) {
        return res.status(404).json({ message: "Schedule not found" });
      }

      res.status(200).json({ schedule });
    } catch (error) {
      console.error("Get individual schedule error:", error);
      res.status(500).json({ message: "Server error" });
    }
  },
};
