const { RedditDriver } = require("./modules/reddit_driver.js");

//Declare driver and run automation tests
(async function() {
    try {
        //Declare driver
        const driver = await new RedditDriver().initDriver();
        console.log("Created and initialized Reddit Driver");

        const message = "This message is from my browser automation tool! " +
            "It was sent programmatically without manual input from me :)";
        await driver.runLoginAndSendChat({ message: message });
    } catch (error) {
        console.log("Error = " + error);
    } finally {
        console.log("Finishing program...");
    }
})();