const request = require('supertest');
const app = require('../index.js');
const assert = require('assert');

(async () => {
    try {
        // 1. Successful health check
        let res = await request(app).get('/');
        assert.strictEqual(res.statusCode, 200);
        assert.strictEqual(res.body.status, 'healthy');
        assert.strictEqual(res.body.service, 'catalyst-serverless-function');
        console.log('Health check test passed');

        // 2. Resource information response
        res = await request(app).get('/?action=resource');
        assert.strictEqual(res.statusCode, 200);
        assert(res.body.nodeVersion);
        assert(res.body.memoryUsage);
        console.log('Resource check test passed');

        // 3. Three-second CPU benchmark
        res = await request(app).get('/?action=benchmark&seconds=3');
        assert.strictEqual(res.statusCode, 200);
        assert.strictEqual(res.body.durationSeconds, 3);
        assert(res.body.actualDurationMs >= 3000);
        console.log('Benchmark check test passed');

        // 4. Invalid benchmark duration
        res = await request(app).get('/?action=benchmark&seconds=5');
        assert.strictEqual(res.statusCode, 400);
        assert(res.body.error);
        console.log('Invalid benchmark duration test passed');

        // 5. Unknown action
        res = await request(app).get('/?action=unknown');
        assert.strictEqual(res.statusCode, 404);
        assert(res.body.error);
        console.log('Unknown action test passed');

        // 6. Missing environment variable (simulate fallback)
        delete process.env.NAME;
        res = await request(app).get('/');
        assert.strictEqual(res.body.name, 'World');
        console.log('Missing env var test passed');

        console.log('All tests passed successfully.');
    } catch (e) {
        console.error('Test failed:', e);
        process.exit(1);
    }
})();
