/* eslint-disable @typescript-eslint/no-explicit-any */
import { Container, Logger, EventEmitter } from "@arkecosystem/core-interfaces";

import { defaults, alias } from "./defaults";
import listener from "./listener";
import Options from "./services/OptionsService";

const wall = (text: string) => `============= ${text.toUpperCase()} =============`;

export const plugin: Container.IPluginDescriptor = {
  pkg: require("../package.json"),
  defaults,
  alias,
  async register(container: Container.IContainer, options) {
    container.resolvePlugin<Logger.ILogger>("logger").info(wall(`Registering ${alias}.`));
    const emitter = container.resolvePlugin<EventEmitter.EventEmitter>("event-emitter");

    Options.setOptions(options as any);
    listener.setUp(options, emitter);
  },
  async deregister(container: Container.IContainer, _) {
    container.resolvePlugin<Logger.ILogger>("logger").info(wall(`Deregistering ${alias}.`));
  }
};
