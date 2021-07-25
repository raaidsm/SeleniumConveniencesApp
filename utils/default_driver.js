const { Builder, By, until } = require("selenium-webdriver");
const Firefox = require("selenium-webdriver/firefox");
const options = new Firefox.Options();

const initDefaultDriver = async () => {
    options.setPreference("dom.webnotifications.enabled", false);
    return new Builder().forBrowser("firefox").setFirefoxOptions(options).build();
};

const findElement = async (driver, elementSelector) => {
    return driver.findElement(By.css(elementSelector));
};

const waitToFindElement = async (driver, elementSelector, maxWaitTime) => {
    return driver.wait(until.elementLocated(By.css(elementSelector)), maxWaitTime);
};

module.exports = { initDefaultDriver, findElement, waitToFindElement };