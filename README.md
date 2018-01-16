# Delister for ProfitTrailer - Bittrex #
## Warning ##
This will only use for Bittrex.
Use it on your own risk. Delister can and WILL cause profit loss.

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
