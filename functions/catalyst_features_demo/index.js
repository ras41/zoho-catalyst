const express = require('express');
const catalyst = require('zcatalyst-sdk-node');
const app = express();

app.use(express.json());

// Initialize Catalyst App for every request
app.use((req, res, next) => {
    const catalystApp = catalyst.initialize(req);
    res.locals.catalystApp = catalystApp;
    next();
});

// Demonstrate Data Store
app.get('/datastore', async (req, res) => {
    try {
        const app = res.locals.catalystApp;
        const datastore = app.datastore();

        // This requires a table named 'SampleTable' to exist in the Catalyst project
        const table = datastore.table('SampleTable');

        // Example: Inserting a row
        // const insertPromise = table.insertRow({ Name: "TestUser", Age: 25 });

        // Example: Getting all rows
        const rows = await table.getPagedRows({ nextToken: undefined, maxRows: 10 });

        res.status(200).json({ success: true, rows });
    } catch (error) {
        console.log("Data Store error: Make sure you created 'SampleTable' in the console.");
        res.status(500).json({ error: error.message, note: "Check if SampleTable exists in Data Store." });
    }
});

// Demonstrate Cache
app.get('/cache', async (req, res) => {
    try {
        const app = res.locals.catalystApp;
        const cache = app.cache();

        // Default segment
        const segment = cache.segment();

        // Put a value
        await segment.put('last_accessed', Date.now().toString(), 1); // TTL in hours

        // Get a value
        const val = await segment.get('last_accessed');

        res.status(200).json({ success: true, cached_value: val });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Demonstrate ZCQL (Zoho Catalyst Query Language)
app.get('/zcql', async (req, res) => {
    try {
        const app = res.locals.catalystApp;
        const zcql = app.zcql();

        const query = "SELECT ROWID, CREATORID, CREATEDTIME FROM SampleTable LIMIT 5";
        const result = await zcql.executeZCQLQuery(query);

        res.status(200).json({ success: true, result });
    } catch (error) {
        res.status(500).json({ error: error.message, note: "Check if SampleTable exists." });
    }
});

module.exports = app;
