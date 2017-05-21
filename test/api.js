import app from '../src/index';
import chai from 'chai';
const should = chai.should();
const asset = chai.asser;
import chaiHttp from 'chai-http';
chai.use(chaiHttp);
import http from 'http';

const defaultGetOptions = (path) => ({
  'host': 'localhost',
  'port': '8080',
  'path': path,
  'method': "GET"
});

describe('Api Tests', () => {
  describe('GET /api', () => {

    before((done) => {
      app.server.listen('8080', (err, result) => {
        done(err);
      });
    })

    after((done) => {
      app.server.close();
      done();
    });

    it('should exist', (done) => {
      should.exist(app);
      done();
    });

    it('should be listening at localhost:8080', (done) => {
      const headers = defaultGetOptions('/');
      http.get(headers, (res) => {
        res.statusCode.should.eql(404);
        done();
      });
    });

    it('shoul get Api version', (done) => {
      const headers = defaultGetOptions('/api');
      http.get(headers, (res) => {
        // console.log(res);
        done();
      });
    });
    
  });
});