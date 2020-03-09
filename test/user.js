let server = require("../src/server/index");
let chai = require("chai");
let chaiHttp = require("chai-http");
let expect = chai.expect;

chai.use(chaiHttp);

describe("login", () => {
    it("it should signup a new user", (done) => {
        let newUser = {
            "userName": "testmocha1",
            "emailId": "testmocha1@mochauniversity.edu",
            "password": "testmocha1pass"
        };
        chai.request(server)
            .post("/api/user/signup")
            .set("api_token", process.env.API_TOKEN)
            .send(newUser)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                done();
            });
    });

    it("it should login as user with correct password", (done) => {
        let loginCreds = {
            "emailId": "testmocha1@mochauniversity.edu",
            "password": "testmocha1pass"
        };
        chai.request(server)
            .post("/api/user/login")
            .set("api_token", process.env.API_TOKEN)
            .send(loginCreds)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                done();
            });
    });

    it("it should not login as user with incorrect password", (done) => {
        let loginCreds = {
            "emailId": "testmocha1@mochauniversity.edu",
            "password": "testmocha2pass"
        };
        chai.request(server)
            .post("/api/user/login")
            .set("api_token", process.env.API_TOKEN)
            .send(loginCreds)
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res).to.be.json;
                done();
            });
    });

    it("it should delete user for cleanup", (done) => {
        let emailId = {
            "emailId": "testmocha1@mochauniversity.edu"
        };
        chai.request(server)
            .post("/api/user/deleteUser")
            .set("api_token", process.env.API_TOKEN)
            .send(emailId)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                done();
            });
    });
});
