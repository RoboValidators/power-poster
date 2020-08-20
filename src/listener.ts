import { app } from "@arkecosystem/core-container";
import { EventEmitter } from "@arkecosystem/core-interfaces";

import queue from "./queue";
import { PowerUp, Events, Block, Options } from "./types";

const emitter = app.resolvePlugin<EventEmitter.EventEmitter>("event-emitter");

class Listener {
  setUp(options: Partial<Options>) {
    emitter.on(Events.PowerUp, async ({ stake, block }: PowerUp) => {
      if (block.height > options.startHeight) {
        queue.add({ stake, block, event: Events.PowerUp });
      }
    });

    emitter.on(Events.BlockApplied, async (block: Block) => {
      // TODO set limiter if(block.height % 100) to prevent checking on every block
      if (block.height > options.startHeight) {
        queue.add({ stake: null, block, event: Events.BlockApplied });
      }
    });
  }
}

export default new Listener();
