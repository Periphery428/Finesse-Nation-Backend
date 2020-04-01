let server = require("../src/server/index");
let chai = require("chai");
let chaiHttp = require("chai-http");
let expect = chai.expect;

chai.use(chaiHttp);

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
            "eventTitle": "Mocha Test Event",
            "emailId": "darko123@gmail.com",
            "school": "UIUC",
            "description": "Mocha test event description.",
            "location": "Mocha location",
            "isActive" : true,
            "duration": "2 hrs",
            "postedTime": "Wed Aug 21 2019 01:58:52 GMT+0200",
            "image": "",
            "category" : "Food"
        };
        chai.request(server)
            .post("/api/food/addEvent")
            .set("api_token", process.env.API_TOKEN)
            .send(event)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.text).to.equal("Success: added new event = Mocha Test Event");
                done();
            });
    });

    it("it should return _id of created event", (done) => {
        chai.request(server)
            .get("/api/food/getEvents")
            .set("api_token", process.env.API_TOKEN)
            .end((err, res) => {

                // console.log("Length of body "+res.body.length);
                // console.log(res.body[0]);

                for(let i = 0; i < res.body.length; i++) {
                    if (res.body[i].eventTitle === "Mocha Test Event" && res.body[i].description === "Mocha test event description.") {
                        targetEventId = res.body[i]._id;
                        break;
                    }
                }
                //console.log("*****"+targetEventId);
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(targetEventId).to.be.length.greaterThan(0);
                done();
            });
    });

    it("it should update created event", (done) => {
        let eventUpdate = {
            "eventId": targetEventId.toString(),
            //"_id": "5e83fc6360e608486d74c60a",
            "eventTitle": "Mocha Test Event",
            "emailId": "darko123@gmail.com",
            "school": "UIUC",
            "description": "Mocha test event description.",
            "location": "Mocha location",
            "isActive" : true,
            "duration": "2 hrs",
            "postedTime": "Wed Aug 21 2019 01:58:52 GMT+0200",
            "image": "",
            "category" : "Food"
        };
        chai.request(server)
            .post("/api/food/updateEvent")
            .set("api_token", process.env.API_TOKEN)
            .send(eventUpdate)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.text).to.equal("Success: updated event _id = " + targetEventId);
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
                expect(res.text).to.equal("Success: deleted event _id = " + targetEventId);
                done();
            });
    });
});