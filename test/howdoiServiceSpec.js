'use strict';
const chai = require('chai');
const expect = require('chai').expect;
const spies = require('chai-spies');
const request = require('request');
const constants = require('../constants');
const howdoiService = require('../services/howdoiService');

describe('Module howdoiService', () => {
  chai.use(spies);

  it('should correctly call the howdoi service api', () => {
    const sampleQueries = [
      'howdoi convert mp4 to mp3',
      'howdoi declare array in python',
      'howdoi abc xyz',
    ];
    sampleQueries.forEach(function(query) {
      request.get(constants.SERVER_HOWDOI_PREFIX_URL + query, (error, response, body) => {
        expect(response.statusCode).to.equal(200);
        expect(body).to.be.a('string');
      });
    });
  });

  // TODO: Check why this is failing.
  it('should check for the callback', (done) => {
    const QUERY_ENCODED = encodeURIComponent('declare array python');
    const callback = (data) => {
      expect(data).to.exist;
      done();
    };
    const spy = chai.spy(callback);
    howdoiService.getHowdoiResult(spy, QUERY_ENCODED);
  });
});
