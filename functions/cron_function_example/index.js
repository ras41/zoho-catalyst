module.exports = (cronDetails, context) => {
    // Cron functions execute on a schedule
    console.log("Cron execution started.");
    console.log("Cron details: ", JSON.stringify(cronDetails));

    // Simulate some work
    console.log("Performing scheduled cleanup task...");

    context.closeWithSuccess();
};
