# Compendia Core - Power Poster

<p align="center">
    <img src="./.github/Bindie-announce.png" alt="bindie" width="125"/>
</p>

> A Twitter & Telegram bot announcing Big $BIND stakes and daily stake reports

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

## Installation

#### Configuration required for path ~/.config/compendia-core/network-name/plugins.js

```javascript
module.exports = {
    // AFTER @arkecosystem/core-api & @arkecosystem/core-wallet-api
    "@robovalidators/power-poster": {
        telegram: {
            token: "", // Telegram token (obtained from @BotFather)
            channelId: "" // ID of the telegram channel you want to announce in
        },
        twitter: {
            consumerKey: "", // Twitter API key
            consumerSecret: "", // Twitter API secret
            accessKey: "", // Twitter User Access Key
            accessSecret: "" // Twitter User Access Secret
        },
        minimumAmount: 0, // Minimum amount of USD to announce as a "whale"-post
        startHeight: 0, // Heigh to start the announcements from
        interval: 86400, // Interval between daily stake reports in seconds: 86 400 seconds = 1 day
        txUrl: "https://bindscan.io/transactions", // API endpoint for transactions
        token: "BIND", // Token you want to use (used in price API call)
        currency: "USD" // Token value currency you want to query and post
    },
    // Any other plugins ..
};
```

```bash
# Navigate to plugins folder
cd ~/compendia-core/plugins/

# Clone repo
git clone https://github.com/RoboValidators/power-poster

# Install deps
cd power-poster && yarn

# Build the project
yarn build

# Start the validator/relay
ccontrol start relay | forger | core

# If you see ============== POWER-POSTER ==============
# in your logs during startup, everything is set and done!
# **NOTE** The log will only appear AFTER syncing due to plugin order

```

## Security

If you discover a security vulnerability within this package, please send an e-mail to hello@bindie.io. All security vulnerabilities will be promptly addressed.

## Credits

- [Bindie Dev](https://t.me/BindieDev)
  - [Bindie Website](https://bindie.io/)
  - [Bindie Telegram stake bot](https://t.me/CompendiaStakes)
  - [Bindie Twitter stake bot](https://twitter.com/BindieBot)

## Support

POGGERS

## License

[MIT](LICENSE) © [RoboValidators](https://bindie.io/)
