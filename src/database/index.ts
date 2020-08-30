/* eslint-disable @typescript-eslint/no-explicit-any */
import admin from "firebase-admin";
import fireorm from "fireorm";

import serviceAccount from "../../serviceAccountKey.json";
import stakeRepository from "./repositories/StakeRepository";
import reportRepository from "./repositories/ReportRepository";
import ReportModel from "./models/Report";
import { Stake } from "../types";

const lastReportId = "bindie";

export default class DB {
  private static firestore: FirebaseFirestore.Firestore;

  private constructor() {}

  static async initialize(): Promise<void> {
    if (!DB.firestore) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as any),
        databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
      });

      const firestore = admin.firestore();
      fireorm.initialize(firestore);
      DB.firestore = firestore;
    }
  }

  static async pushStake(stake: Stake) {
    await stakeRepository.create(stake);
  }

  static async getStakes(): Promise<Stake[]> {
    return stakeRepository.find();
  }

  static async clearStakes(): Promise<void> {
    (await stakeRepository.find()).forEach((stake) => {
      stakeRepository.delete(stake.id);
    });
  }

  static async getLastReport(): Promise<Date> {
    const result = await reportRepository.findById(lastReportId);
    if (result) {
      return result.date;
    }

    // Set new default date
    const newDate = new Date();
    await DB.setLastReport(newDate);
    return newDate;
  }

  static async setLastReport(date: Date): Promise<void> {
    const report = new ReportModel();
    report.id = lastReportId;
    report.date = date;

    await reportRepository.update(report);
  }
}
