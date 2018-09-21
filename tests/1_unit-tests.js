/*
*       FILL IN EACH UNIT TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]----
*       (if additional are added, keep them at the very end!)
*/

const chai = require('chai');
const assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');
const convertHandler = new ConvertHandler();

suite('Unit Tests', () => {
  suite('Function convertHandler.getNum(input)', () => {
    test('Whole number input', done => {
      const input = '32L';
      assert.equal(convertHandler.getNum(input), 32);
      done();
    });
    
    test('Decimal Input', done => {
      const input = '32.0L';
      assert.equal(convertHandler.getNum(input), 32.0);
      done();
    });
    
    test('Fractional Input', done => {
      const input = '30 3/4L';
      assert.equal(convertHandler.getNum(input), '30 3/4');
      done();
    });
    
    test('Fractional Input w/ Decimal', done => {
      const input = '30 3.3/4.4L';
      assert.equal(convertHandler.getNum(input), '30 3.3/4.4');
      done();
    });
    
    test('Invalid Input (double fraction)', done => {
      const input = '30 3/4 4/5L';
      assert.equal(convertHandler.getNum(input), '30 3/4 4/5');
      done();
    });
    
    test('No Numerical Input', done => {
      const input = 'L';
      assert.equal(convertHandler.getNum(input), '1');
      done();
    }); 
  });
  

  suite('Function convertHandler.getUnit(input)', () => {
    test('For Each Valid Unit Inputs', done => {
      var input = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
      input.forEach(unit => {
        assert.equal(convertHandler.getUnit(unit), unit.toLowerCase());
      });
      done();
    });
    
    test('Unknown Unit Input', done => {
      const input = '10pounds';
      assert.equal(convertHandler.getUnit(input), 'invalid unit');
      done();
    });
  });
  

  suite('Function convertHandler.getReturnUnit(initUnit)', () => {
    test('For Each Valid Unit Inputs', done => {
      var input = ['gal','l','mi','km','lbs','kg'];
      var expect = ['l','gal','km','mi','kg','lbs'];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
      });
      done();
    });
  });  
  
  suite('Function convertHandler.spellOutUnit(unit)', () => {
    test('For Each Valid Unit Inputs', done => {
      var input = ['gal','l','mi','km','lbs','kg'];
      var expect = ['gallons','liters','miles','kilometers','pounds','kilograms'];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.spellOutUnit(ele), expect[i]);
      });
      done();
    });
  });
  
  suite('Function convertHandler.convert(num, unit)', () => {
    test('Gal to L', done => {
      var input = [5, 'gal'];
      var expected = 18.9271;
      assert.approximately(parseFloat(convertHandler.convert(input[0],input[1])),expected, 0.1);
      done();
    });
    
    test('L to Gal', done => {
      var input = [5, 'l'];
      var expected = 1.32086;
      assert.approximately(parseFloat(convertHandler.convert(input[0],input[1])),expected, 0.1);
      done();
    });
    
    test('Mi to Km', done => {
      var input = [5, 'mi'];
      var expected = 8.04672;
      assert.approximately(parseFloat(convertHandler.convert(input[0],input[1])),expected, 0.1);
      done();
    });
    
    test('Km to Mi', done => {
      var input = [5, 'km'];
      var expected = 3.10686;
      assert.approximately(parseFloat(convertHandler.convert(input[0],input[1])),expected, 0.1);
      done();
    });
    
    test('Lbs to Kg', done => {
      var input = [5, 'lbs'];
      var expected = 2.26796;
      assert.approximately(parseFloat(convertHandler.convert(input[0],input[1])),expected, 0.1);
      done();
    });
    
    test('Kg to Lbs', done => {
      var input = [5, 'kg'];
      var expected = 11.0231;
      assert.approximately(parseFloat(convertHandler.convert(input[0],input[1])),expected, 0.1);
      done();
    });
  });
});