import { EventEmitter } from "@arkecosystem/core-interfaces";

import queue from "./queue";
import { PowerUp, Events, Options } from "./types";

class Listener {
  setUp(options: Partial<Options>, emitter: EventEmitter.EventEmitter) {
    emitter.on(Events.PowerUp, async ({ stake, block }: PowerUp) => {
      if (block.height > options.startHeight) {
        queue.add({ stake, block, event: Events.PowerUp });
      }
    });
  }
}

export default new Listener();
