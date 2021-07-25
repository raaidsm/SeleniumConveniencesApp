const { Key } = require("selenium-webdriver");
const { readFile } = require("fs").promises;
const { defaultMaxLoadTime, initDefaultDriver, findElement, waitToFindElement } = require("../utils/default_driver");
const { asyncDelay } = require("../utils/delay.js");

class RedditDriver {
    //Construction methods
    constructor() {
        this.driver = null;
        this.username = null;
        this.password = null;
        this.usernameFieldSelector = "#loginUsername";
        this.passwordFieldSelector = "#loginPassword";
        this.userDropdownSelector = "#USER_DROPDOWN_ID";
        this.profileLinkSelector = "a._1YWXCINvcuU7nk0ED-bta8";
        this.chatLinkSelector = "a._1x6pySZ2CoUnAfsFhGe7J1";
        this.chatTextAreaSelector = "form#MessageInputTooltip--Container > div > div > textarea";
    }
    async initDriver() {
        //Initialize Firefox driver
        this.driver = await initDefaultDriver();

        //Initialize username and password
        const info = JSON.parse(await readFile("./text/info.json", "utf8"));
        this.username = info.reddit_username;
        this.password = info.reddit_password;

        return this;
    }

    //Public methods
    async run(typingIntoChatParameters) {
        //Go to site
        await this.get("https://www.reddit.com/login/?dest=https%3A%2F%2Fwww.reddit.com%2F");

        //Enter username and password
        await this.enterUsernameAndPassword();

        //Click on the user dropdown
        await this.clickUserDropdown();

        //Click on the Profile link
        await this.clickProfileLink();

        //Click on the chat link to open the chat menu
        await this.clickChatLink();

        //Click on the chat area and enter some text
        await this.typeIntoChat(typingIntoChatParameters);
    }

    async get(url) {
        await this.driver.get(url);
    }
    async enterUsernameAndPassword() {
        const usernameField = await findElement(this.driver, this.usernameFieldSelector);
        await usernameField.sendKeys(this.username);
        const passwordField = await findElement(this.driver, this.passwordFieldSelector);
        await passwordField.sendKeys(this.password);
        await passwordField.sendKeys(Key.ENTER);
        console.log("Successfully entered username and password");
    }
    async clickUserDropdown() {
        //Wait to find the element to determine the correct page having been loaded
        let userDropdown = await waitToFindElement(this.driver, this.userDropdownSelector, defaultMaxLoadTime);

        //Refresh the page to properly set its connection to the driver
        await this.driver.navigate().refresh();

        //Find the element again and click it
        userDropdown = await waitToFindElement(this.driver, this.userDropdownSelector, defaultMaxLoadTime);
        await userDropdown.click();
        console.log("Successfully clicked on the user dropdown");
    }
    async clickProfileLink() {
        const profileLink = await findElement(this.driver, this.profileLinkSelector);
        await profileLink.click();
        console.log("Successfully clicked on the profile link");
    }
    async clickChatLink() {
        const chatLink = await findElement(this.driver, this.chatLinkSelector);
        await chatLink.click();
        console.log("Successfully clicked on the chat link");
    }
    async typeIntoChat({ message="", receiver=null, send=false }) {
        const chatTextArea = await waitToFindElement(this.driver, this.chatTextAreaSelector, defaultMaxLoadTime);
        await asyncDelay(500);

        if (receiver !== null) {
            this.driver.executeScript("[..." +
                "document.querySelectorAll('" +
                "a._3X4hbg4asgVvLaVYU6dUzs > div._3bFoFHzAF-p75iQXilwXZu > h4 > span" +
                "')].find(span => span.innerText === '" + receiver + "')." +
                "parentElement.parentElement.parentElement.click();");
        }
        await chatTextArea.sendKeys(message);
        if (send === true) {
            await chatTextArea.sendKeys(Key.ENTER);
        }
        console.log("Successfuly typed in" + (send === true ? " and sent" : "") + " message: " + message);
    }
}

module.exports = { RedditDriver };