const express = require('express');
const app = express();
const os = require('os');

app.use(express.json());

app.all('/', (req, res) => {
    const action = req.query.action || 'health';

    if (action === 'health') {
        const response = {
            status: "healthy",
            service: "catalyst-serverless-function",
            name: process.env.NAME || "World",
            timestamp: Date.now()
        };
        return res.status(200).json(response);
    }

    if (action === 'resource') {
        const memoryUsage = process.memoryUsage();
        const response = {
            nodeVersion: process.version,
            platform: process.platform,
            architecture: process.arch,
            uptime: process.uptime(),
            memoryUsage: {
                rss: memoryUsage.rss,
                heapTotal: memoryUsage.heapTotal,
                heapUsed: memoryUsage.heapUsed,
                external: memoryUsage.external
            },
            cpuUsage: process.cpuUsage(),
            envStatus: Object.keys(process.env).length > 0 ? 'configured' : 'empty',
            timestamp: Date.now()
        };
        return res.status(200).json(response);
    }

    if (action === 'benchmark') {
        const durationStr = req.query.seconds || '3';
        const duration = parseInt(durationStr, 10);

        if (isNaN(duration) || duration <= 0 || duration > 3) {
            return res.status(400).json({ error: "Invalid duration. Must be between 1 and 3 seconds." });
        }

        const start = Date.now();
        let iterations = 0;
        let result = 0;

        // Lightweight calculation loop
        while (Date.now() - start < duration * 1000) {
            result += Math.sqrt(iterations);
            iterations++;
        }

        const response = {
            durationSeconds: duration,
            actualDurationMs: Date.now() - start,
            iterations: iterations,
            benchmarkResult: result,
            note: "Benchmark results are not standardized CPU performance scores."
        };
        return res.status(200).json(response);
    }

    return res.status(404).json({ error: "Unknown action" });
});

module.exports = app;
