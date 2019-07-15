require('dotenv').config();

const chaiHttp = require('chai-http');
const chai = require('chai');
const app = require('../../app');


// Configure chai
chai.use(chaiHttp);
chai.should();

let login_details = {
	email: 'renmoney@email.com',
	password: '123456'
}

describe('Loans', () => {

	describe('GET /', () => {

		it('it should throw 401 while fetch available loans without auth token', (done) => {
			chai.request(app)
				.get('/api/loan/available-loans')
				.end((err, res) => {
					res.should.have.status(401);
					res.body.should.be.a('object');
					done();
				});
		});

		it('it should fetch all available loans', (done) => {
			chai.request(app)
				.post('/api/user/login')
				.send(login_details)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.data.should.have.property('token');

					let token =res.body.data.token;

					chai.request(app)
						.get('/api/loan/available-loans')
						.set('Authorization', token)
						.end((err, res) => {
							res.should.have.status(200);
							res.body.should.be.a('object');
							done();
						});
				});
		});

	});
});