# Finesse-Nation-Backend

Backend for the free food service.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server (Use for developing with live code reloading)
npm run dev

# Build for production
npm run build

# Start production server
npm start
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
# Use in nodejs:
let password = process.env.MONGODB_PASSWORD;
```

```bash
# Hello world
GET http://localhost:8080/api/food/helloworld

# Basic server -> mongodb call
GET  https://finesse-nation.herokuapp.com/api/food/getEvents

POST https://finesse-nation.herokuapp.com/api/food/addEvent
{
    "name": "Adobe Talking Points",
    "description": "Seminar by Adobe about jobs. Will have salad.",
    "location": "DCL",
    "duration": "2.5 hrs"
}

```

