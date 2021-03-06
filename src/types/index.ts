import { Interfaces, Utils } from "@arkecosystem/crypto";
import { Interfaces as StakeInterfaces } from "@nosplatform/stake-transactions-crypto";
import { Container } from "@arkecosystem/core-interfaces";
import BigNumber from "bignumber.js";

export type Stake = StakeInterfaces.IStakeObject;
export type Block = Interfaces.IBlockData;
export type ParserType = Utils.BigNumber | BigNumber | string | number;
export type StakeTimestamps = StakeInterfaces.IStakeTimestamps;

export type StakeData = {
  stakeLevel: string;
  total: BigNumber;
}[];

export interface PowerUp {
  stake: Stake;
  block: Block;
}

export interface PowerUpJob extends PowerUp {
  event: Events;
}

export interface CronJob {
  event: Events;
}

export interface Publisher {
  publish(status: string): Promise<void>;
  toString(): string;
}

export interface Options extends Container.IPluginOptions {
  telegram: {
    token: string;
    channelId: string;
  };
  twitter: {
    consumerKey: string;
    consumerSecret: string;
    accessKey: string;
    accessSecret: string;
  };
  minimumAmount: number;
  startHeight: number;
  txUrl: string;
  token: string;
  tokenId: string;
  currency: string;
  cron: string;
}

export enum Publishers {
  TWITTER = "TWITTER",
  TELEGRAM = "TELEGRAM"
}

export enum Events {
  Cron = "cron",
  PowerUp = "stake.powerup"
}

export enum Plugins {
  DATABASE = "database",
  LOGGER = "logger",
  EVENT_EMITTER = "event-emitter"
}
