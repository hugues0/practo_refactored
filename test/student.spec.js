const chai = require('chai');
const expect = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/index');
const should = chai.should();
chai.use(chaiHttp);
chai.should();


describe('POST/',() => {

    it('New student, it should return 201',done =>{
        const student = {
            name: 'KALISA Emmanuel'
        }

        chai
        .request(app)
        .post('/api/v1/students')
        .send(student)
        .end((err,res) =>{
            expect(res.statusCode).to.equal(201);
            done();
        });
    });


});