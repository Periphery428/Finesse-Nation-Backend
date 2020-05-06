# Finesse-Nation-Backend

[![Node.js CI](https://github.com/Periphery428/Finesse-Nation-Backend/workflows/Node.js%20CI/badge.svg?branch=master)](https://github.com/Periphery428/Finesse-Nation-Backend/actions) ![Lint](https://github.com/Periphery428/Finesse-Nation-Backend/workflows/Lint/badge.svg) [![Coverage Status](https://coveralls.io/repos/github/Periphery428/Finesse-Nation-Backend/badge.png?branch=master)](https://coveralls.io/github/Periphery428/Finesse-Nation-Backend?branch=master&service=github)

There are free meals and giveaways on campus all the time. Finesse Nation is an app that would allow users to share where the free items are located on campus.

Developed using Node.js (server) and React (client).

[Read the docs](project_documentation.pdf)
```bash
# Contributors
# Jeffrey Josol, Shilpa Rani, Robert Beckwith, Aditya Pandey, Krastan Dimitrov
```

## Quick Start

```bash
# Install dependencies in both server(/) and client(src/client) locations
npm install

# Run mocha (nodejs) and jest (reactjs) tests
npm run test
# Run tests with coverage
npm run test-cov

# Run nodejs server from (/)
npm run start

# Run reactjs client from (src/client)
npm run start
```

```bash
# Developer Notes Only

# Connect to mongodb atlas
mongo "mongodb+srv://mongoclustercs428-pijzh.mongodb.net/test"  --username <username> --password <password>

# Environment variables
# Place credential in .env file located in root dir:
MONGODB_USERNAME=<username>
MONGODB_PASSWORD=<password>
API_TOKEN=<api_token>
MAILTRAP_USERNAME=<mailtrap_username>
MAILTRAP_PASSWORD=<mailtrap_password>
EMAIL_USERNAME=<email_username>
EMAIL_PASSWORD=<email_password>

# Use in nodejs:
let password = process.env.MONGODB_PASSWORD;
```

```bash
# Server REST APIs

# Must use API Key to use API.
Add to all headers: "api_token":"<api_token>"
```

```bash
HTTP api swagger documentation:
https://finesse-nation.herokuapp.com/api-docs
```

