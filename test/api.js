import app from '../src/server';
import chai from 'chai';
const should = chai.should();
const asset = chai.asser;
import chaiHttp from 'chai-http';
chai.use(chaiHttp);
import http from 'http';
const request = require('supertest');

describe('Api Tests', () => {
  // Start server before running tests
  before((done) => {
    console.log('Starting server to run tests...');
    app.server.listen('8080', (err, result) => {
      done(err);
    });
  })

  // Close server after all tests passed or failed
  after((done) => {
    console.log('Server is going to be closed...');
    app.server.close();
    done();
  });

  it('Should exist', (done) => {
    should.exist(app);
    done();
  });

  it('Should be listening to localhost:8080', (done) => {
    request(app)
      .get('/')
      .expect(404)
      .end(done);
  });

  it('Should get Api version', (done) => {
    request(app)
      .get('/api')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((res) => {
        should.exist(res.body.version)
      })
      .end(done);
  });
});
