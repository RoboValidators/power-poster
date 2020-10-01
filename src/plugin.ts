/* eslint-disable @typescript-eslint/no-explicit-any */
import { Container, Logger, EventEmitter } from "@arkecosystem/core-interfaces";

import { defaults, alias } from "./defaults";
import listener from "./listener";
import Options from "./services/plugin/OptionsService";
import LoggerService from "./services/plugin/LoggerService";
import pkg from "../package.json";
import ContainerService from "./services/plugin/ContainerService";

const wall = (text: string) => `============= ${text.toUpperCase()} =============`;

export const plugin: Container.IPluginDescriptor = {
  pkg,
  defaults,
  alias,
  async register(container: Container.IContainer, options) {
    const emitter = container.resolvePlugin<EventEmitter.EventEmitter>("event-emitter");
    const logger = container.resolvePlugin<Logger.ILogger>("logger");
    logger.info(wall(`Registering ${alias}.`));

    LoggerService.setLogger(logger);
    Options.setOptions(options as any);
    ContainerService.setContainer(container);
    listener.setUp(options, emitter);
  },
  async deregister(container: Container.IContainer, _) {
    container.resolvePlugin<Logger.ILogger>("logger").info(wall(`Deregistering ${alias}.`));
  }
};
