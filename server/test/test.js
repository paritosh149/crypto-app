var expect = require('chai').expect;
const {isValidTime} = require('../utils/BestProfit');

describe('is valid time', function(){

    // add a test hook
    beforeEach(function() {
      // ...some logic before each test is run
    })

  it('should return true', function(){
    var input = '0915';
    var result = isValidTime(input);

    expect(result).to.be.true;
  });

  it('should return false', function(){
    var input = '0975';
    var result = isValidTime(input);

    expect(result).to.be.false;
  });

});