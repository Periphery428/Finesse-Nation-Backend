// import {describe} from "mocha";

let server = require("../src/server/index");
let chai = require("chai");
let chaiHttp = require("chai-http");
let expect = chai.expect;

chai.use(chaiHttp);

describe("votes", () => {
    let targetEventId = "5e879f2e9b0c280017f52431";
    let emailId = "cs428Node@gmail.com";

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
                    expect(res.status).to.equal(200);
                    done();
                });
        });

    it("it should upvote/downvote an event - Upvote", (done) => {
        let voteInfo = {
            "eventId": targetEventId,
            "emailId": 'test@gmail.com',
            "vote": "1"
        };
        chai.request(server)
            .post("/api/vote")
            .set("api_token", process.env.API_TOKEN)
            .send(voteInfo)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.status).to.equal(200);
                done();
            });
    });

    it("it should upvote/downvote an event - No Vote", (done) => {
        let voteInfo = {
            "eventId": targetEventId,
            "emailId": 'hello@gmail.com',
            "vote": "4"
        };
        chai.request(server)
            .post("/api/vote")
            .set("api_token", process.env.API_TOKEN)
            .send(voteInfo)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.status).to.equal(200);
                done();
            });
    });

        it("it should return list of upvotes and downvotes for an event", (done) => {
            chai.request(server)
                .get("/api/vote/eventPoints?eventId=5e879f2e9b0c280017f52431")
                .set("api_token", process.env.API_TOKEN)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    done();
                });
        });

        //get points for user
        it("it should return points earned by a user", (done) => {
            chai.request(server)
                .get("/api/vote/userPoints?emailId=cs428Node@gmail.com")
                .set("api_token", process.env.API_TOKEN)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    done();
                });
        });

        it("it should return status of voting for an event by a user - Downvote Scenario", (done) => {
            chai.request(server)
                .get("/api/vote/info?eventId="+targetEventId+"&emailId="+emailId)
                .set("api_token", process.env.API_TOKEN)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    done();
                });
        });

        it("it should return status of voting for an event by a user - Upvote Scenario", (done) => {
            chai.request(server)
                .get("/api/vote/info?eventId="+targetEventId+"&emailId="+'test@gmail.com')
                .set("api_token", process.env.API_TOKEN)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    done();
                });
        });

        it("it should return status of voting for an event by a user - NO Vote Scenario", (done) => {
            chai.request(server)
                .get("/api/vote/info?eventId="+targetEventId+"&emailId="+'never_mind@gmail.com')
                .set("api_token", process.env.API_TOKEN)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    done();
                });
        });
});