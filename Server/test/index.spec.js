/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import http from 'http';
import assert from 'assert';
import server from '../src/app';

describe('Backend', () => {
  it('should return 200', (done) => {
    http.get('http://127.0.0.1:3000', (res) => {
      assert.strictEqual(200, res.statusCode);
      done();
    });
  });
});
