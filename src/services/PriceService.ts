import axios, { AxiosInstance } from "axios";
import { setupCache } from "axios-cache-adapter";

import OptionsService from "./plugin/OptionsService";
import { Options } from "../types";
import Parser from "../utils/parser";
import BigNumber from "bignumber.js";

class PriceService {
  public static instance: PriceService;

  public client: AxiosInstance;
  public options: Options;
  public host = "https://api.coingecko.com/api/v3/";

  private constructor() {
    this.options = OptionsService.getOptions();

    const cache = setupCache({
      maxAge: 15 * 60 * 1000 // 15 minute cache
    });

    this.client = axios.create({
      adapter: cache.adapter,
      baseURL: this.host
    });
  }

  public static get() {
    if (!PriceService.instance) {
      PriceService.instance = new PriceService();
    }

    return PriceService.instance;
  }

  public async getPrice(tokenId = this.options.tokenId): Promise<number> {
    const response = await this.client.get("simple/price", {
      params: {
        ids: tokenId,
        vs_currencies: this.options.currency
      }
    });

    return response.data[tokenId.toLowerCase()][this.options.currency.toLowerCase()];
  }

  public async getTotalPrice(amount: BigNumber, tokenId = this.options.tokenId) {
    const price = await this.getPrice(tokenId);

    return amount.times(price).toFixed(2);
  }

  public async isTimesGreaterThan(amount: BigNumber, times = 1, tokenId = this.options.tokenId) {
    const minimum = Parser.toBN(this.options.minimumAmount);
    const totalValue = Parser.toBN(await this.getTotalPrice(amount, tokenId));

    return totalValue.isGreaterThan(minimum.times(times));
  }
}

export default PriceService.get;
