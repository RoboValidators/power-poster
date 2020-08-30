import Queue from "bull";

import { PowerUpJob, Events, CronJob } from "./types";

import db from "./database";
import PowerupService from "./services/PowerupService";
import ReportService from "./services/ReportService";
import LoggerService from "./services/LoggerService";
import { alias } from "./defaults";
import OptionsService from "./services/OptionsService";

const publishQueue = new Queue<PowerUpJob | CronJob>("publish");

publishQueue.process(async (job, done) => {
  const { event } = job.data;
  const logger = LoggerService.getLogger();

  // Everything available with a PowerUp Event
  if (event === Events.PowerUp) {
    const { stake } = job.data as PowerUpJob;

    // Save every stake, this is required for the BlockApplied event
    await db.pushStake(stake);

    await PowerupService.check(stake);

    logger.info(`${alias} handled event ${event} for stake ${stake.id}`);
  }

  if (event === Events.Cron) {
    await ReportService.check();
    logger.info(`${alias} handled event ${event}`);
  }

  done(null, { job });
});

// Add cron job
publishQueue.add({ event: Events.Cron }, { repeat: { cron: OptionsService.getOptions().cron } });

export default publishQueue;
