import { app } from "@arkecosystem/core-container";
import { Logger } from "@arkecosystem/core-interfaces";
import Client from "node-telegram-bot-api";

import { Publisher, Publishers, Options } from "../types";
import OptionsService from "../services/OptionsService";

const logger = app.resolvePlugin<Logger.ILogger>("logger");

export default class Telegram implements Publisher {
  public client: Client;
  public options: Options;

  constructor() {
    this.options = OptionsService.getOptions();
    this.client = new Client(this.options.telegram.token);
  }

  async publish(status: string): Promise<void> {
    try {
      const result = await this.client.sendMessage(this.options.telegram.channelId, status);
      logger.info(`Posted ${result.text} on ${result.chat.title}`);
    } catch (error) {
      logger.error(JSON.stringify(error, null, 4));
      logger.error(`[${this.toString()}] failed for status ${status}. Reason: ${error.errors}`);
    }
  }

  toString(): string {
    return Publishers.TELEGRAM;
  }
}
