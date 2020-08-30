import axios from "axios";
import moment from "moment";

import db from "../database";
import { Block, BlockDTO } from "../types";
import MessageBuilder from "../utils/messageBuilder";
import publisherService from "./PublisherService";
import OptionsService from "./OptionsService";

export default class BlockAppliedService {
  static async check(block: Block) {
    const options = OptionsService.getOptions();

    const lastReport = await db.getLastReport();
    const nextMoment = moment(lastReport).add(options.interval, "seconds");

    if (nextMoment.isBefore(moment.now())) {
      const stakes = await db.getStakes();
      if (stakes.length > 0) {
        const status = await MessageBuilder.buildAggroMessage(stakes, lastReport);
        await publisherService.publishAll(status);

        // Set new last published and reset stakes
        const { data: blockDTO } = await axios.get<BlockDTO>(
          `http://localhost:4003/api/blocks/${block.id}`
        );

        await db.setLastReport(blockDTO.data.timestamp.human);
        await db.clearStakes();
      }
    }
  }
}
