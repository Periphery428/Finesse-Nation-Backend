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
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });
});
