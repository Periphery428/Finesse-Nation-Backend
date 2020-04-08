let server = require("../src/server/index");
let chai = require("chai");
let chaiHttp = require("chai-http");
let expect = chai.expect;

chai.use(chaiHttp);

describe("login", () => {
    let passwordResetToken = "";

    it("it should signup a new user", (done) => {
        let newUser = {
            "userName": "testmocha1",
            "emailId": "testmocha1@mochauniversity.edu",
            "password": "testmocha1pass",
            "school": "UIUC",
            "points": 0
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
                expect(res.body.token).to.be.a("string");
                expect(res.body.token).to.be.length.greaterThan(0);
                done();
            });
    });

    it("it should find existing user", (done) => {
        let email = {
            "emailId": "testmocha1@mochauniversity.edu"
        };
        chai.request(server)
            .post("/api/user/checkEmailExists")
            .set("api_token", process.env.API_TOKEN)
            .send(email)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.msg).to.equal("User found");
                done();
            });
    });

    it("it should not find existing user", (done) => {
        let email = {
            "emailId": "testmocha2@mochauniversity.edu"
        };
        chai.request(server)
            .post("/api/user/checkEmailExists")
            .set("api_token", process.env.API_TOKEN)
            .send(email)
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body.message).to.equal("User does not exist");
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
                expect(res.body.message).to.equal("Incorrect Password !");
                expect(res).to.be.json;
                done();
            });
    });

    it("it should not login as user with non-existent username", (done) => {
        let loginCreds = {
            "emailId": "testmochafake@mochauniversity.edu",
            "password": "testmochafakepass"
        };
        chai.request(server)
            .post("/api/user/login")
            .set("api_token", process.env.API_TOKEN)
            .send(loginCreds)
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body.message).to.equal("User does not exist");
                expect(res).to.be.json;
                done();
            });
    });

    it("it should not login as no api_key is passed", (done) => {
        let loginCreds = {
            "emailId": "testmocha1@mochauniversity.edu",
            "password": "testmocha1pass"
        };
        chai.request(server)
            .post("/api/user/login")
            .send(loginCreds)
            .end((err, res) => {
                expect(res).to.have.status(401);
                expect(res.body.message).to.equal("Request is not authorized.");
                expect(res).to.be.json;
                done();
            });
    });

    it("it should generate email link for password reset", (done) => {
        let loginCreds = {
            "emailId": "testmocha1@mochauniversity.edu"
        };
        chai.request(server)
            .post("/api/user/generatePasswordResetLink")
            .set("api_token", process.env.API_TOKEN)
            .send(loginCreds)
            .end((err, res) => {
                passwordResetToken = res.body.token;
                expect(res).to.have.status(200);
                expect(res.body.msg).to.equal("Password reset token sent to user email");
                done();
            });
    });
    

    it("it should check token is valid for password reset request", (done) => {
        let emailToken = {
            "emailId": "testmocha1@mochauniversity.edu",
            "token": passwordResetToken
        };
        chai.request(server)
            .post("/api/user/checkEmailTokenExists")
            .set("api_token", process.env.API_TOKEN)
            .send(emailToken)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.msg).to.equal("Found valid email/token");
                done();
            });
    });

    it("it should send successful request for notification change", (done) => {
        let emailId = "testmocha1@mochauniversity.edu";
        let notificationUpdate = {
            "emailId": emailId,
            "notifications": False
        };
        chai.request(server)
            .post("/api/user/changeNotifications")
            .set("api_token", process.env.API_TOKEN)
            .send(notificationUpdate)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.message).to.equal("Success: updated notifications for user = " + emailId);
                done();
            });
    });

    it("it should send successful request for password change", (done) => {
        let emailId = "testmocha1@mochauniversity.edu";
        let loginCreds = {
            "emailId": emailId,
            "password": "testmocha2pass"
        };
        chai.request(server)
            .post("/api/user/changePassword")
            .set("api_token", process.env.API_TOKEN)
            .send(loginCreds)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.message).to.equal("Success: updated password for user = " + emailId);
                done();
            });
    });


    it("it should assert users password was changed", (done) => {
        let loginCreds = {
            "emailId": "testmocha1@mochauniversity.edu",
            "password": "testmocha2pass"
        };
        chai.request(server)
            .post("/api/user/login")
            .set("api_token", process.env.API_TOKEN)
            .send(loginCreds)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.token).to.be.a("string");
                expect(res.body.token).to.be.length.greaterThan(0);
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
                expect(res.body.message).to.equal("User (testmocha1@mochauniversity.edu) deleted.");
                expect(res).to.be.json;
                done();
            });
    });
});
