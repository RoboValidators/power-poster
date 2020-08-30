import { Collection } from "fireorm";
import { Utils } from "@arkecosystem/crypto";

import { StakeTimestamps, Stake } from "../../types";

@Collection()
export default class StakeModel implements Stake {
  id: string;
  senderPublicKey?: string;
  status: "grace" | "canceled" | "active" | "released" | "redeemed";
  timestamps: StakeTimestamps;
  duration: number;
  amount: Utils.BigNumber;
  power: Utils.BigNumber;
}
