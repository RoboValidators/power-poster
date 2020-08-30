import Queue from "bull";

import { PowerUpJob, Events, BlockAppliedJob } from "./types";

import db from "./database";
import PowerupService from "./services/PowerupService";
import BlockAppliedService from "./services/BlockAppliedService";
import LoggerService from "./services/LoggerService";

const publish = new Queue<PowerUpJob | BlockAppliedJob>("publish");

publish.process(async (job, done) => {
  const { event } = job.data;
  const logger = LoggerService.getLogger();

  // Everything available with a PowerUp Event
  if (event === Events.PowerUp) {
    const { stake } = job.data as PowerUpJob;

    // Save every stake, this is required for the BlockApplied event
    await db.pushStake(stake);

    await PowerupService.check(stake);

    logger.info(`Handled ${event} for stake ${stake.id}`);
  }

  // Stake NOT available with a Block Applied Event
  if (event === Events.BlockApplied) {
    const { block } = job.data as BlockAppliedJob;
    await BlockAppliedService.check(block);
  }

  done(null, { job });
});

export default publish;
