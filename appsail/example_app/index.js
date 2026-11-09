const express = require('express');
const app = express();

const port = process.env.X_ZOHO_CATALYST_LISTEN_PORT || 9000;

app.get('/', (req, res) => {
    res.status(200).json({
        message: "Hello from Zoho Catalyst AppSail!",
        uptime: process.uptime(),
        port: port
    });
});

app.listen(port, () => {
    console.log(`AppSail application listening on port ${port}`);
});
