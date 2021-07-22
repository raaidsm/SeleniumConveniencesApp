const syncDelay = (milliseconds) => {
    console.log("Starting synchronous delay");
    const startTime = new Date().getTime();
    let endTime = 0;
    while(endTime - startTime < milliseconds) {
        endTime = new Date().getTime();
    }
    console.log("Ending synchronous delay");
};
const asyncDelay = (milliseconds) => {
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
};

module.exports = { syncDelay, asyncDelay };