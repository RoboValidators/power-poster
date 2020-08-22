export const defaults = {
  telegram: {
    token: "",
    channelId: ""
  },
  twitter: {
    consumerKey: "",
    consumerSecret: "",
    accessKey: "",
    accessSecret: ""
  },
  minimumAmount: 0,
  startHeight: 0,
  interval: 86400, // 86 400 seconds = 1 day
  txUrl: "https://bindscan.io/transactions",
  token: "BIND",
  currency: "USD"
};

export const alias = "power-poster";
