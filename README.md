# Compendia/ARK Core - Power Bot

<p align="center">
    <img src="./.github/Bindie-announce.png" alt="bindie" width="125px" heigth="160px" />
</p>

> A Twitter & Telegram bot announcing Big $BIND stakes and daily stake reports

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Installation

#### Configuration required for path ~/.config/<nos | ark>-core/<network>/plugins.js

```javascript
module.exports = {
    // AFTER @arkecosystem/core-api & @arkecosystem/core-wallet-api
    "@robovalidators/power-bot": {
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
        txUrl: "https://explorer.nos.dev/transactions", // API endpoint for transactions
        token: "nos", // Token you want to use (used in price API call)
        currency: "USD" // Token value currency you want to query and post
    },
    // Any other plugins ..
};
```

```bash
# Navigate to plugins folder
cd ~/nos-core/plugins/

# Clone repo
git clone https://github.com/RoboValidators/power-bot

# Install deps
cd power-bot && yarn

# Build the project
yarn bild

# Start the validator/relay
ccontrol start relay | forger | core

# If you see ============== POWER-BOT ==============
# in your logs during startup, everything is set and done!

```

## Security

If you discover a security vulnerability within this package, please send an e-mail to hello@bindie.io. All security vulnerabilities will be promptly addressed.

## Credits

- [Bindie Dev](https://bindie.io/)

## License

[MIT](LICENSE) © [RoboValidators](https://bindie.io/)
