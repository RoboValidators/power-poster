import BigNumber from "bignumber.js";
import moment from "moment";
import { Managers } from "@arkecosystem/crypto";
import { Database } from "@arkecosystem/core-interfaces";

import db from "../database";
import { Plugins, StakeData } from "../types";
import MessageBuilder from "../utils/messageBuilder";
import publisherService from "./PublisherService";
import Parser from "../utils/parser";
import PriceService from "./PriceService";
import ContainerService from "./plugin/ContainerService";

export default class ReportService {
  static async check() {
    const lastReport = await db.getLastReport();
    const stakes = await db.getStakes();

    if (stakes.length > 0) {
      const stakeLevels = Object.keys(Managers.configManager.getMilestone().stakeLevels);

      const stakeData: StakeData = [];
      let overallTotal = new BigNumber(0);

      // Get total amount per stakeLevel
      stakeLevels.forEach((stakeLevel) => {
        const filteredStakes = stakes.filter((stake) => stake.duration.toString() === stakeLevel);
        const total = filteredStakes.reduce((acc, stake) => {
          return acc.plus(Parser.normalize(stake.amount));
        }, new BigNumber(0));

        if (!total.isZero()) {
          overallTotal = overallTotal.plus(total);
          stakeData.push({
            stakeLevel,
            total
          });
        }
      });

      // Only publish if totatValue > (minimumAmount*x)
      if (PriceService().isTimesGreaterThan(overallTotal, 3)) {
        const status = await MessageBuilder.buildAggroMessage(stakeData, lastReport);
        await publisherService.publishAll(status);

        const dbService = ContainerService.resolve<Database.IDatabaseService>(Plugins.DATABASE);
        const lastBlock = await dbService.getLastBlock();

        const date = moment(Managers.configManager.getMilestone().epoch).add(
          lastBlock.data.timestamp,
          "seconds"
        );

        // Set new last published and reset stakes
        await db.setLastReport(moment(date).toDate() || new Date());
        await db.clearStakes();
      }
    }
  }
}
