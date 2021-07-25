const { Builder } = require("selenium-webdriver");
const Firefox = require("selenium-webdriver/firefox");
const options = new Firefox.Options();

const initDefaultDriver = async () => {
    options.setPreference("dom.webnotifications.enabled", false);
    return new Builder().forBrowser("firefox").setFirefoxOptions(options).build();
};

module.exports = { initDefaultDriver };