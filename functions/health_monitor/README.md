# Catalyst Health Monitor Serverless Function

This is a lightweight Node.js Serverless Function for Zoho Catalyst that provides health checks and basic resource monitoring.

## Features

- **Health Check**: Returns a standard health status JSON object.
- **Resource Monitor**: Returns Node.js execution environment information.
- **Benchmark**: Performs a small CPU benchmark bound by 3 seconds maximum.

## Deployment Instructions

1. **Create Catalyst Project**: If you haven't already, go to the Zoho Catalyst console and create a new project.
2. **Install CLI**: Ensure you have the Catalyst CLI installed (`npm install -g zcatalyst-cli`).
3. **Login**: Run `catalyst login` to authenticate with your Zoho account.
4. **Deploy**: In the root directory of this repository (where `catalyst.json` is located), run `catalyst deploy`.
5. **Environment Variable**: To configure the `NAME` variable:
   - Go to your Catalyst Web Console.
   - Navigate to **Serverless -> Functions -> health_monitor -> Environments**.
   - Add a new variable `NAME` with your desired value.
6. **Testing**:
   - The function will be deployed to an endpoint similar to `https://<project-domain>.zohocatalyst.com/serverless/health_monitor`.
   - Test Health: `https://<project-domain>.zohocatalyst.com/serverless/health_monitor`
   - Test Resource: `https://<project-domain>.zohocatalyst.com/serverless/health_monitor?action=resource`
   - Test Benchmark: `https://<project-domain>.zohocatalyst.com/serverless/health_monitor?action=benchmark&seconds=3`
7. **Logs & Resource Usage**:
   - In the Catalyst console, go to **Logs -> Serverless** to view the function execution logs.
   - You can see memory usage and execution time limitations inside the execution history. Catalyst functions are limited by the memory allocation (default 128MB) and timeout settings. The metrics provided in the `action=resource` call are process-level (Node.js) metrics inside the container, not guaranteed exact physical cloud metrics.

## Limitations

- The function memory limit is restricted to what is configured in `catalyst.json` or the Catalyst Console.
- The `action=benchmark` endpoint limits duration to a max of 3 seconds to avoid hitting timeout limits.
- Metrics returned by `action=resource` report inside the sandbox. Do not assume host-level resource visibility.
