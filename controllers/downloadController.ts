import { Response, RequestHandler } from "express";
import { AuthRequest } from "../types/types";
import excel from "exceljs";
import fs from "fs";
import Schedule from "../models/Schedule";
import { User } from "../models/User";

const downloadPath = "./downloads";

const timediff = (start: string, end: string) => {
  const startDate = new Date(`1990-01-01 ${start}`);
  const endDate = new Date(`1990-01-01 ${end}`);
  const diff = endDate.getTime() - startDate.getTime();
  return diff;
};

export const downloadController = {
  downloadReportData: (async (req: AuthRequest, res: Response) => {
    if (!req.user?.userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const { month, year, user: parentId } = req.query;
    const schedule = (
      await Schedule.find({
        user: parentId,
        month,
        year,
      })
    )[0];
    const filename = `${downloadPath}/output_user_${req.user?.userId}.xlsx`;
    const workbook = new excel.Workbook();
    workbook.xlsx
      .readFile(`${downloadPath}/sample.xlsx`)
      .then(async () => {
        const worksheet = workbook.getWorksheet("Sheet1");
        if (worksheet) {
          // TODO: edit some values regarding the statistics data
          const coach = await User.findById(req.user?.userId);
          const parent = await User.findById(parentId);
          if (!coach) {
            return res.status(404).json({ error: "Coach not found" });
          }
          if (!parent) {
            return res.status(404).json({ error: "Parent not found" });
          }
          // Userinfo
          for (let i = 0; i < 10; ++i) {
            worksheet.getCell(
              ["H3", "I3", "J3", "K3", "L3", "M3", "N3", "O3", "P3", "Q3"][i]
            ).value = parseInt(coach.recipientNumbers?.[i]) || null;
          }
          for (let i = 0; i < 10; ++i) {
            worksheet.getCell(
              [
                "CB3",
                "CC3",
                "CD3",
                "CE3",
                "CF3",
                "CG3",
                "CH3",
                "CI3",
                "CJ3",
                "CK3",
              ][i]
            ).value = parseInt(coach.recipientNumbers?.[i]) || null;
          }
          worksheet.getCell(
            `BH5`
          ).value = `${coach.companyName} ${coach.username}`;
          worksheet.getCell(`AB3`).value = parent.guardianName || null;
          worksheet.getCell(`AB4`).value = `(${parent.username})` || null;
          for (let i = 0; i < 6; ++i) {
            worksheet.getCell(
              ["N6", "T6", "Z6", "AF6", "AL6", "AR6"][i]
            ).value = `${coach.serviceSlot.attendance[i].start}-${coach.serviceSlot.attendance[i].end}`;
            worksheet.getCell(
              ["N7", "T7", "Z7", "AF7", "AL7", "AR7"][i]
            ).value = `${coach.serviceSlot.holiday[i].start}-${coach.serviceSlot.holiday[i].end}`;
          }
          //
          let index = 13;
          schedule.entries.forEach((entry) => {
            if (entry.day != "土" && entry.day != "日") {
              worksheet.getCell(`B${index}`).value = entry.date;
              worksheet.getCell(`E${index}`).value = entry.day;
              worksheet.getCell(`H${index}`).value = entry.wasAbsent
                ? "欠席"
                : null;
              worksheet.getCell(`N${index}`).value = entry.wasAbsent
                ? null
                : entry.isHoliday
                ? 2
                : 1;
              worksheet.getCell(`R${index}`).value = entry.actualStart;
              worksheet.getCell(`V${index}`).value = entry.actualEnd;
              worksheet.getCell(`Z${index}`).value =
                Math.round(
                  timediff(entry.actualStart, entry.actualEnd) / 1000 / 60 / 30
                ) / 2 || null;
              worksheet.getCell(`AD${index}`).value = entry.plannedPickup
                ? 1
                : null;
              worksheet.getCell(`AG${index}`).value = entry.plannedReturn
                ? 1
                : null;
              worksheet.getCell(`AJ${index}`).value = entry.familySupport
                ? parseInt(entry.familySupport)
                : null;
              worksheet.getCell(`AN${index}`).value = entry.medicalSupport
                ? 1
                : null;
              worksheet.getCell(`AR${index}`).value = entry.extendedSupport
                ? parseInt(entry.extendedSupport)
                : null;
              worksheet.getCell(`AV${index}`).value = entry.concentratedSupport
                ? 1
                : null;
              worksheet.getCell(`AZ${index}`).value = entry.specializedSupport
                ? 1
                : null;
              worksheet.getCell(`BD${index}`).value = entry.communitySupport
                ? 1
                : null;
              worksheet.getCell(`BH${index}`).value = entry.bathSupport
                ? 1
                : null;
              worksheet.getCell(`BL${index}`).value = entry.childCareSupport
                ? 1
                : null;
              worksheet.getCell(`BP${index}`).value = entry.selfSupport
                ? 1
                : null;
              worksheet.getCell(`BT${index}`).value = entry.guardianConfirmation
                ? 1
                : null;
              worksheet.getCell(`BY${index}`).value = entry.remarks;
              index++;
            }
          });
        }
        await workbook.xlsx.writeFile(filename);
        res.download(filename, "report.xlsx", (err) => {
          if (err) {
            console.log(err);
          }
          fs.unlink(filename, (err) => {
            if (err) {
              console.log(err);
            }
          });
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ error: "Failed to parse XLSX file" });
      });
  }) as RequestHandler,
};
