import { EventEmitter } from "@arkecosystem/core-interfaces";

import queue from "./queue";
import { PowerUp, Events, Options } from "./types";
import OptionsService from "./services/OptionsService";

class Listener {
  setUp(options: Partial<Options>, emitter: EventEmitter.EventEmitter) {
    // Setup cron job
    queue.add({ event: Events.Cron }, { repeat: { cron: OptionsService.getOptions().cron } });

    // Setup powerUp trigger and queue
    emitter.on(Events.PowerUp, async ({ stake, block }: PowerUp) => {
      if (block.height > options.startHeight) {
        queue.add({ stake, block, event: Events.PowerUp });
      }
    });
  }
}

export default new Listener();
