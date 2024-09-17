import * as chai from 'chai';
import chaiHttp = require('chai-http');

// const chaiHttp = require('chai-http');
//import mocha from 'mocha'
import 'mocha';


chai.use(chaiHttp);

// const serverUrl = "http://localhost:3000";
const server = "https://api.buddypassadmin.com";

describe("Users", () => {
    // beforeEach((done) => {
    //     Book.remove({}, (err) => {
    //         done();
    //     });
    // });
    describe("/POST User", () => {
        it("It will login the user!", (done) => {
            chai.request(server)
                .post('/api/v1/app/auth/login')
                .send({ username: "lakshit002", password: "12345678" })
                .end((res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                })
            done();
        });
    });


    describe("/POST Register USER", () => {
        it("I will register the user!", (done) => {
            chai.request(server)
                .post('/api/v1/app/auth/register')
                .send({ username: "lakshit21", email: "lakshit21@yopmail.com", password: "lakshit12345" })
                .end((res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    res.body.should.have.property('status');
                    res.body.should.have.property('status').eql(200);

                })
            done();

        })
    })
});