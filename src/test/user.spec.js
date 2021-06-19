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

  });
};

export default runUserTests;
