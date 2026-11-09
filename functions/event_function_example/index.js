module.exports = (event, context) => {
    // Event functions trigger on Catalyst events like File Upload, Data Store Insert, etc.
    console.log("Event received: ", JSON.stringify(event));

    const eventData = event.data;
    const eventTime = event.time;
    const eventSource = event.source; // Data Store, Cache, File Store, etc.

    console.log(`Processing event from ${eventSource} at ${eventTime}`);

    context.closeWithSuccess();
};
