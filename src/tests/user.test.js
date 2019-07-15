require('dotenv').config();

const chaiHttp = require('chai-http');
const chai = require('chai');
const app = require('../../app');


// Configure chai
chai.use(chaiHttp);
chai.should();

let currect_login_details = {
	email: 'renmoney@email.com',
	password: '123456'
}

let wrong_login_details = {
	email: 'wrong@email.com',
	password: 'notsure'
}

let invalid_email_data = {
	email: 'wrong@email',
	password: 'notsure'
}

describe('User', () => {

	describe('POST /"', () => {

		it('it should throw 401 when invalid login attempt', (done) => {
			chai.request(app)
				.post('/api/user/login')
				.send(wrong_login_details)
				.end((err, res) => {
					res.should.have.status(401);
					res.body.should.be.a('object');
					done();
				});
		});

		it('it should throw 400 when invalid email supplied', (done) => {
			chai.request(app)
				.post('/api/user/login')
				.send(invalid_email_data)
				.end((err, res) => {
					res.should.have.status(400);
					res.body.should.be.a('object');
					res.body.message.should.be.equal('Invalid email address');
					done();
				});
		});

		it('it should throw 200 when login success', (done) => {
			chai.request(app)
				.post('/api/user/login')
				.send(currect_login_details)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.data.should.have.property('token');
					done();
				});
		});

	});
});