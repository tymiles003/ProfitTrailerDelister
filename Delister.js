const config = require("./config.json");
const fs = require("fs");
const request = require("request");
const url = "https://bittrex.com/api/v1.1/public/getmarkets";
const delimiter = "### Created by delister, do not delete these lines and let them at the end ###";
const pairsConfigurationFile = config["profitTrailerPath"] + "/trading/PAIRS.properties";

if (!fs.existsSync(pairsConfigurationFile)) {
	logMessage("ProfitTrailer not found!");
	logMessage("Exiting... (3)");
	process.exit(3);
}

var pairsConfiguration = fs.readFileSync(pairsConfigurationFile, "utf8");
const market = pairsConfiguration.split("MARKET = ")[1].split("\n")[0].trim();

getData()
setInterval(getData, config["checkInterval"] * 1000);

function getData() {
	pairsConfiguration = fs.readFileSync(pairsConfigurationFile, "utf8");
	request({
		url: url,
		json: true
	}, function (error, response, body) {
		if(!error && response.statusCode === 200) {
			processPanicSells(body);		
		}
	})
}

function processPanicSells(json) {

	if (pairsConfiguration.indexOf(delimiter) === -1) {
		fs.appendFileSync(pairsConfigurationFile, "\n\n" + delimiter);
	}

	json["result"].forEach(function(currency) {
		if (currency["Notice"] != null && currency["Notice"].indexOf("market is being delisted on") !== -1 && currency["BaseCurrency"] == market) {
			const baseCurrency = currency["BaseCurrency"];
			const marketCurrency = currency["MarketCurrency"];
			const delistDate = currency["Notice"].split(" on ")[1];
			const somString = baseCurrency + "-" + marketCurrency + "_sell_only_mode = true";
			const panicSellString = baseCurrency + "-" + marketCurrency + "_panic_sell_enabled = true";
			const noTradeString = baseCurrency + "-" + marketCurrency + "_trading_enabled = false";

			logMessage(baseCurrency + "-" + marketCurrency + " is going to be delisted on " + delistDate);

			if (pairsConfiguration.indexOf(noTradeString) !== -1) {
				logMessage(baseCurrency + "-" + marketCurrency + " already disabled for trading.");
			} else {
				if (pairsConfiguration.indexOf(somString) === -1) {
					logMessage("Adding " + baseCurrency + "-" + marketCurrency + " to SOM.");
					fs.appendFileSync(pairsConfigurationFile, "\n" + somString);
				} else {
					logMessage(baseCurrency + "-" + marketCurrency + " already in SOM.");
				}
	
				if (pairsConfiguration.indexOf(panicSellString) === -1) {
					logMessage("Adding " + baseCurrency + "-" + marketCurrency + " to Panic Sell mode.");
					fs.appendFileSync(pairsConfigurationFile, "\n" + panicSellString);
				} else {
					logMessage(baseCurrency + "-" + marketCurrency + " already in Panic Sell Mode.");
				}
			}
		}
	})
}

function getTimestamp() {
	const date = new Date();
	return date.toLocaleDateString() + " - " + date.toLocaleTimeString();
}

function logMessage(message) {
	console.log("[" + getTimestamp() + "] " + message);
}
