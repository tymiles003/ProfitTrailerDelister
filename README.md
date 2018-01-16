# Delister for ProfitTrailer - Bittrex #
Detect automatically markets, which are going to be delisted and set them automatically in Sell Only Mode and Panic Sell Mode.
## Warning ##
This will only work for Bittrex.

Use it on your own risk. 

__Delister can and WILL cause profit loss.__

## Prerequisits
1. Linux
2. ProfitTrailer for Bittrex
3. NodeJS
4. NPM
5. (Optional) pm2

## Usage ##
1. Clone or download this tool
2. Switch into the Delister directory
3. __npm install request__
4. Configure config.json. Enter path to ProfitTrailer and update interval in seconds
5. __pm2 start pm2-DelisterStart.json__
6. (optional) If you don't want to use pm2, use __node Delister.js__ instead

## Donations ##
Donations are welcome.


BTC: 1Wed1w9PmR1w6tE5C8gBgcPVoREyPj5GW

ETH: 0x129A5539bf4Dd22329835dF9FDdE2c72548F7fF2

XEM: NBTSOZDPC3WB27OQK4KVX2FBXVBTME6LHNI3YBMH
