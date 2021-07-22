const { RedditDriver } = require("./modules/reddit_driver.js");

//Declare driver and run automation tests
(async function() {
    try {
        //Declare driver
        const driver = new RedditDriver();
        await driver.initDriver();
        console.log("Created and initialized Reddit Driver");

        //Go to site
        await driver.get("https://www.reddit.com/login/?dest=https%3A%2F%2Fwww.reddit.com%2F");

        //Enter username and password
        await driver.enterUsernameAndPassword();

        //Click on the user dropdown
        await driver.clickUserDropdown();

        //Click on the Profile link
        await driver.clickProfileLink();

        //Click on the chat link to open the chat menu
        await driver.clickChatLink();

        //Click on the chat area and enter some text
        const message = "This message is from my browser automation tool! " +
            "It was sent programmatically without manual input from me :)";
        await driver.typeIntoChat({ message: message });
    } catch (error) {
        console.log("Error = " + error);
    } finally {
        console.log("Finishing program...");
    }
})();