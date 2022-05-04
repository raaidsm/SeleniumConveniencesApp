const { Key } = require("selenium-webdriver");
const { readFile } = require("fs").promises;
const { initDefaultDriver, findElement, waitToFindElement } = require("../utils/default_driver");
const { asyncDelay } = require("../utils/delay.js");

class TwitterDriver {
    //Construction methods
    constructor() {
        this.driver = null;
        this.username = null;
        this.password = null;
    }

    async initDriver() {
        //Initialize Firefox driver
        this.driver = await initDefaultDriver();

        //Initialize username and password
        const info = JSON.parse(await readFile("./text/info.json", "utf8"));
        this.username = info.twitter_username;
        this.password = info.twitter_password;

        return this;
    }
}

module.exports = { TwitterDriver };