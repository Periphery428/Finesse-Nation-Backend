let server = require("../src/server/index");
let chai = require("chai");
let chaiHttp = require("chai-http");
let expect = chai.expect;

chai.use(chaiHttp);

describe("comments", () => {
    let targetEventId = "5e83d7b01ed1c835cffc0f15";

    it("it should create a comment for an event", (done) => {
        let comment = {
            "eventId": "5e83d7b01ed1c835cffc0f15",
            "emailId": "darko123@gmail.com",
            "comment": "TEST Amazing Event",
            "postedTime": "2020-04-01 03:29:03.693069"
        };
        chai.request(server)
            .post("/api/comment")
            .set("api_token", process.env.API_TOKEN)
            .send(comment)
            .end((err, res) => {
                expect(res).to.have.status(200);
                // expect(res.text).to.equal("Success: added new comment = Mocha Test Comment");
                done();
            });
    });

    it("it checks for errors while creating a comment for an event", (done) => {
        let comment = {
            "eventI": "5e83d7b01ed1c835cffc0f15",
            "emailI": "darko123@gmail.com",
            "commen": "TEST Amazing Event",
            "postedTime": "2020-04-01 03:29:03.693069"
        };
        chai.request(server)
            .post("/api/comment")
            .set("api_token", process.env.API_TOKEN)
            .send(comment)
            .end((err, res) => {
                expect(res).to.have.status(400);
                // expect(res.text).to.equal("Success: added new comment = Mocha Test Comment");
                done();
            });
    });



    describe("comments", () => {
        it("it should return list of comment associated with an event", (done) => {
            chai.request(server)
                .get("/api/comment/targetEventId")
                .set("api_token", process.env.API_TOKEN)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    done();
                });
        });
    });
});
