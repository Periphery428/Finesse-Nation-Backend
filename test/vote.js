// import {describe} from "mocha";

let server = require("../src/server/index");
let chai = require("chai");
let chaiHttp = require("chai-http");
let expect = chai.expect;

chai.use(chaiHttp);

describe("votes", () => {
    // -------------------- Before tests --------------------
    let emailId = "testmocha1@mochauniversity.edu";
    let targetEventId;

    it("it should create new user for voting tests", (done) => {
        let newUser = {
            "emailId": emailId,
            "password": "testmocha1pass"
        };
        chai.request(server)
            .post("/api/user/signup")
            .set("api_token", process.env.API_TOKEN)
            .send(newUser)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.token).to.be.a("string");
                expect(res).to.be.json;
                done();
            });
    });

    it("it should create an event for voting tests", (done) => {
        let event = {
            "eventTitle": "Mocha Test Event",
            "emailId": "mochatest@gmail.com",
            "school": "UIUC",
            "description": "Mocha test event description.",
            "location": "Mocha location",
            "isActive": [],
            "duration": "2 hrs",
            "postedTime": "2020-04-01 03:29:03.693069",
            "image": "",
            "category": "Food"
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

    it("it should return _id of created event for voting tests", (done) => {
        chai.request(server)
            .get("/api/food/getEvents")
            .set("api_token", process.env.API_TOKEN)
            .end((err, res) => {
                for (let i = 0; i < res.body.length; i++) {
                    if (res.body[i].eventTitle === "Mocha Test Event" && res.body[i].description === "Mocha test event description.") {
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

    // -------------------- Test cases --------------------
    it("it should fail upvote/downvote an event for empty eventId", (done) => {
        let voteInfo = {
            "eventId": "",
            "emailId": emailId,
            "vote": "-1"
        };
        chai.request(server)
            .post("/api/vote")
            .set("api_token", process.env.API_TOKEN)
            .send(voteInfo)
            .end((err, res) => {
                expect(res).to.have.status(400);
                done();
            });
    });

    it("it should return status of voting for an event by a user - No vote Scenario", (done) => {
        chai.request(server)
            .get("/api/vote/info?eventId=" + targetEventId + "&emailId=" + emailId)
            .set("api_token", process.env.API_TOKEN)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.status).to.equal("NOT_VOTED");
                done();
            });
    });

    it("it should upvote/downvote an event - Downvote", (done) => {
        let voteInfo = {
            "eventId": targetEventId,
            "emailId": emailId,
            "vote": "-1"
        };
        chai.request(server)
            .post("/api/vote")
            .set("api_token", process.env.API_TOKEN)
            .send(voteInfo)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                done();
            });
    });

    it("it should return list of one downvote for an event", (done) => {
        chai.request(server)
            .get("/api/vote/eventPoints?eventId=" + targetEventId)
            .set("api_token", process.env.API_TOKEN)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.upVote).to.equal(0);
                expect(res.body.downVote).to.equal(1);
                expect(res).to.be.json;
                done();
            });
    });

    it("it should return status of voting for an event by a user - Downvote Scenario", (done) => {
        chai.request(server)
            .get("/api/vote/info?eventId=" + targetEventId + "&emailId=" + emailId)
            .set("api_token", process.env.API_TOKEN)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.status).to.equal("DOWNVOTE");
                done();
            });
    });

    it("it should upvote/downvote an event - Upvote", (done) => {
        let voteInfo = {
            "eventId": targetEventId,
            "emailId": emailId,
            "vote": "1"
        };
        chai.request(server)
            .post("/api/vote")
            .set("api_token", process.env.API_TOKEN)
            .send(voteInfo)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                done();
            });
    });

    it("it should return list of one upvote for an event", (done) => {
        chai.request(server)
            .get("/api/vote/eventPoints?eventId=" + targetEventId)
            .set("api_token", process.env.API_TOKEN)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.upVote).to.equal(1);
                expect(res.body.downVote).to.equal(0);
                expect(res).to.be.json;
                done();
            });
    });

    it("it should return status of voting for an event by a user - Upvote Scenario", (done) => {
        chai.request(server)
            .get("/api/vote/info?eventId=" + targetEventId + "&emailId=" + emailId)
            .set("api_token", process.env.API_TOKEN)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.status).to.equal("UPVOTE");
                done();
            });
    });

    it("it should upvote/downvote an event - No Vote", (done) => {
        let voteInfo = {
            "eventId": targetEventId,
            "emailId": emailId,
            "vote": "2"
        };
        chai.request(server)
            .post("/api/vote")
            .set("api_token", process.env.API_TOKEN)
            .send(voteInfo)
            .end((err, res) => {
                expect(res).to.have.status(400);
                done();
            });
    });

    //get points for user
    it("it should return points earned by a user", (done) => {
        chai.request(server)
            .get("/api/vote/userPoints?emailId=" + emailId)
            .set("api_token", process.env.API_TOKEN)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                done();
            });
    });

    // -------------------- After tests --------------------

    it("it should fail delete created for invalid targetEventId/emailId combo", (done) => {
        let voteDelete = {
            "eventId": targetEventId,
            "emailId": 'z' + emailId
        };
        chai.request(server)
            .post("/api/vote/deleteVote")
            .set("api_token", process.env.API_TOKEN)
            .send(voteDelete)
            .end((err, res) => {
                expect(res).to.have.status(400);
                done();
            });
    });

    it("it should delete created vote", (done) => {
        let voteDelete = {
            "eventId": targetEventId,
            "emailId": emailId
        };
        chai.request(server)
            .post("/api/vote/deleteVote")
            .set("api_token", process.env.API_TOKEN)
            .send(voteDelete)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.text).to.equal("Vote (eventId=" + targetEventId + ", emailId=" + emailId + ") deleted.");
                done();
            });
    });

    it("it should delete created event for voting tests", (done) => {
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

    it("it should delete user for cleanup on voting tests", (done) => {
        let userEmailId = {
            "emailId": emailId
        };
        chai.request(server)
            .post("/api/user/deleteUser")
            .set("api_token", process.env.API_TOKEN)
            .send(userEmailId)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.message).to.equal("User (testmocha1@mochauniversity.edu) deleted.");
                expect(res).to.be.json;
                done();
            });
    });
});
