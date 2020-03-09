let server = require("../src/server/index");
let chai = require("chai");
let chaiHttp = require("chai-http");
let expect = chai.expect;

chai.use(chaiHttp);

describe("helloworld", () => {
    it("it should return hello world", (done) => {
        chai.request(server)
            .get("/api/food/helloworld")
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.text).to.equals("hello there, its working...");
                done();
            });
    });
});

describe("connection", () => {
    it("it should connect to mongodb atlas", (done) => {
        chai.request(server)
            .get("/api/food/testMongoConnection")
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });
});

describe("events", () => {
    it("it should return list of events", (done) => {
        chai.request(server)
            .get("/api/food/getEvents")
            .set("api_token", process.env.API_TOKEN)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                done();
            });
    });
});

describe("events", () => {
    let targetEventId = "";

    it("it should create an event", (done) => {
        let event = {
            "name": "Mocha Test Event",
            "description": "Mocha test event description.",
            "location": "Mocha location",
            "duration": "2 hrs",
            "timePosted": "Wed Aug 21 2019 01:58:52 GMT+0200",
            "image": ""
        };
        chai.request(server)
            .post("/api/food/addEvent")
            .set("api_token", process.env.API_TOKEN)
            .send(event)
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });

    it("it should return _id of created event", (done) => {
        chai.request(server)
            .get("/api/food/getEvents")
            .set("api_token", process.env.API_TOKEN)
            .end((err, res) => {
                for(let i = 0; i < res.body.length; i++) {
                    if(res.body[i].name === "Mocha Test Event" && res.body[i].description === "Mocha test event description.") {
                        targetEventId = res.body[i]._id;
                        break;
                    }
                }
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(targetEventId).to.be.length.greaterThan(0);
                done();
            });
    });

    it("it should update created event", (done) => {
        let eventUpdate = {
            "eventId": targetEventId,
            "name": "Mocha Test Event 2",
            "description": "Mocha Crawfish broil",
            "location": "Mocha location",
            "duration": "3 hrs",
            "timePosted": "Thu Aug 22 2019 01:58:52 GMT+0200"
        };
        chai.request(server)
            .post("/api/food/updateEvent")
            .set("api_token", process.env.API_TOKEN)
            .send(eventUpdate)
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });

    it("it should not update created event due to no api_key", (done) => {
        let eventUpdate = {
            "eventId": targetEventId,
            "name": "Mocha Test Event 2",
            "description": "Mocha Crawfish broil",
            "location": "Mocha location",
            "duration": "3 hrs",
            "timePosted": "Thu Aug 22 2019 01:58:52 GMT+0200"
        };
        chai.request(server)
            .post("/api/food/updateEvent")
            .send(eventUpdate)
            .end((err, res) => {
                expect(res).to.have.status(401);
                done();
            });
    });

    it("it should delete created event", (done) => {
        let eventDelete = {
            "eventId": targetEventId
        };
        chai.request(server)
            .post("/api/food/deleteEvent")
            .set("api_token", process.env.API_TOKEN)
            .send(eventDelete)
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });
});
