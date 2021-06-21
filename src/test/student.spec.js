import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../index";
import mockData from "./mockData";
import generateToken from "../helpers/tokengen";

chai.use(chaiHttp);
chai.should();

const runStudentsTests = () => {
  describe("Create a new student (post)", () => {
    it("It should return 401 when accessing a protected route with no token provided ", (done) => {
      chai
        .request(app)
        .post("/api/v1/students")
        .send(mockData.studentComplete)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          done();
        });
    });

    it("It should return 201 when a new student is registered ", (done) => {
      const signed = mockData.userWithId.id;
      const token = generateToken({ signed });
      chai
        .request(app)
        .post("/api/v1/students")
        .set("token", token)
        .send(mockData.studentComplete)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          done();
        });
    });
    it("It should return 422 when a new student name is empty ", (done) => {
      const signed = mockData.userWithId.id;
      const token = generateToken({ signed });
      chai
        .request(app)
        .post("/api/v1/students")
        .set("token", token)
        .send(mockData.studentEmpty)
        .end((err, res) => {
          expect(res.status).to.equal(422);
          done();
        });
    });
    it("It should return 422 when a new student name is invalid ", (done) => {
      const signed = mockData.userWithId.id;
      const token = generateToken({ signed });
      chai
        .request(app)
        .post("/api/v1/students")
        .set("token", token)
        .send(mockData.studentInvalid)
        .end((err, res) => {
          expect(res.status).to.equal(422);
          done();
        });
    });
  });
  describe("Get students (GET)", () => {
    it("It should return a list of students with status 200", (done) => {
      const signed = mockData.userWithId.id;
      const token = generateToken({ signed });
      chai
        .request(app)
        .get("/api/v1/students")
        .set("token", token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
    it("It should return a single student with given ID with status 200", (done) => {
      const signed = mockData.userWithId.id;
      const token = generateToken({ signed });
      chai
        .request(app)
        .get("/api/v1/students/1")
        .set("token", token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
    it("It should return 404 when searching for non existent student", (done) => {
      const signed = mockData.userWithId.id;
      const token = generateToken({ signed });
      chai
        .request(app)
        .get("/api/v1/students/10")
        .set("token", token)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });
  });
  describe("Delete students (DELETE)", () => {
    it("It should return 200 after deleting a student", (done) => {
      const signed = mockData.userWithId.id;
      const token = generateToken({ signed });
      chai
        .request(app)
        .delete("/api/v1/students/2")
        .set("token", token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
    it("It should return 404 when trying to delete a non existing student", (done) => {
      const signed = mockData.userWithId.id;
      const token = generateToken({ signed });
      chai
        .request(app)
        .delete("/api/v1/students/20")
        .set("token", token)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });
  });
  describe("Update students (UPDATE)", () => {
    it("It should return 404 when trying to update a non existing student", (done) => {
      const signed = mockData.userWithId.id;
      const token = generateToken({ signed });
      chai
        .request(app)
        .put("/api/v1/students/20")
        .set("token", token)
        .send(mockData.studentComplete)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });
    it("It should return 422 when trying to update a student with invalid data", (done) => {
      const signed = mockData.userWithId.id;
      const token = generateToken({ signed });
      chai
        .request(app)
        .put("/api/v1/students/1")
        .set("token", token)
        .send(mockData.studentInvalid)
        .end((err, res) => {
          expect(res.status).to.equal(422);
          done();
        });
    });
    it("It should return 202 after updating a student", (done) => {
      const signed = mockData.userWithId.id;
      const token = generateToken({ signed });
      chai
        .request(app)
        .put("/api/v1/students/1")
        .set("token", token)
        .send(mockData.updatedStudent)
        .end((err, res) => {
          expect(res.status).to.equal(202);
          done();
        });
    });
  });
};

export default runStudentsTests;
