import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../index";
import mockData from "./mockData";

chai.use(chaiHttp);
chai.should();

const runUserTests = () => {
  describe("Create a user account.(POST) ", () => {
    it("Should register a non registered user", (done) => {
      chai
        .request(app)
        .post("/api/v1/auth/signup")
        .send(mockData.userComplete)
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          done();
        });
    });

    it("Should not register a registered user", (done) => {
      chai
        .request(app)
        .post("/api/v1/auth/signup")
        .send(mockData.userComplete)
        .end((err, res) => {
          expect(res.statusCode).to.equal(409);
          done();
        });
    });

    it("Should not register a user with empty required fields", (done) => {
      chai
        .request(app)
        .post("/api/v1/auth/signup")
        .send(mockData.userNoUsername)
        .end((err, res) => {
          expect(res.statusCode).to.equal(422);
          done();
        });
    });
    it("Should not register a user with empty required fields", (done) => {
      chai
        .request(app)
        .post("/api/v1/auth/signup")
        .send(mockData.userNoPassword)
        .end((err, res) => {
          expect(res.statusCode).to.equal(422);
          done();
        });
    });

    it("Should not register a user with invalid data", (done) => {
      chai
        .request(app)
        .post("/api/v1/auth/signup")
        .send(mockData.userInvalidPassword)
        .end((err, res) => {
          expect(res.statusCode).to.equal(422);
          done();
        });
    });
    it("Should not register a user with invalid data", (done) => {
      chai
        .request(app)
        .post("/api/v1/auth/signup")
        .send(mockData.userInvalidUsername)
        .end((err, res) => {
          expect(res.statusCode).to.equal(422);
          done();
        });
    });
  });

  describe("Log into the system.(POST) ", () => {
    it("Should Login a registered user", (done) => {
      chai
        .request(app)
        .post("/api/v1/auth/signin")
        .send(mockData.userComplete)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          done();
        });
    });

    it("Should not login a user with invalid credentials", (done) => {
      chai
        .request(app)
        .post("/api/v1/auth/signin")
        .send(mockData.userInvalidCredentialsPassword)
        .end((err, res) => {
          expect(res.statusCode).to.equal(401);
          done();
        });
    });
    it("Should not login a user with invalid credentials", (done) => {
      chai
        .request(app)
        .post("/api/v1/auth/signin")
        .send(mockData.userInvalidCredentialsEmail)
        .end((err, res) => {
          expect(res.statusCode).to.equal(401);
          done();
        });
    });
  });
};

export default runUserTests;
