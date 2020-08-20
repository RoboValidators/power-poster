/* eslint-disable @typescript-eslint/no-explicit-any */
import { Container, Logger } from "@arkecosystem/core-interfaces";

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

    Options.setOptions(options as any);
    listener.setUp(options);
  },
  async deregister(container: Container.IContainer, _) {
    container.resolvePlugin<Logger.ILogger>("logger").info(wall(`Deregistering ${alias}.`));
  }
};
