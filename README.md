# Finesse-Nation-Backend

[![Node.js CI](https://github.com/Periphery428/Finesse-Nation-Backend/workflows/Node.js%20CI/badge.svg?branch=master)](https://github.com/Periphery428/Finesse-Nation-Backend/actions) ![Lint](https://github.com/Periphery428/Finesse-Nation-Backend/workflows/Lint/badge.svg) [![Coverage Status](https://coveralls.io/repos/github/Periphery428/Finesse-Nation-Backend/badge.png?branch=master)](https://coveralls.io/github/Periphery428/Finesse-Nation-Backend?branch=master&service=github)

Backend for the free food service.

## Quick Start

```bash
# Install dependencies
npm install

# Run mocha (nodejs) and jest (reactjs) tests
npm run test
# Run tests with coverage
npm run test-cov

# Run server from root
npm run start

# Run server from src/client
npm run start
```

```bash
# Developer Notes Only

# Import test data on mongo database
mongoimport --db=free_food --collection:places --file=dbutil/foodPlaces.json --jsonArray

# Import data into mongodb atlas
mongoimport --uri "mongodb+srv://<username>:<password>@mongoclustercs428-pijzh.mongodb.net/free_food" --collection
 places
 --drop --file dbutil/foodPlaces.json --jsonArray

# Connect to mongodb atlas
mongo "mongodb+srv://mongoclustercs428-pijzh.mongodb.net/test"  --username <username> --password <password>

# Environment variables
# Place credential in .env file located in root dir:
MONGODB_USERNAME=<username>
MONGODB_PASSWORD=<password>
API_TOKEN=<api_token>
MAILTRAP_USERNAME=<mailtrap_username>
MAILTRAP_PASSWORD=<mailtrap_password>

# Use in nodejs:
let password = process.env.MONGODB_PASSWORD;
```

```bash
# Server REST APIs

# Must use API Key to use API.
Add to all headers: "api_token":"<api_token>"

# Refer to current postman collection for all http request to backend (Share current postman collection file to 
# team). File also in project root.
```

