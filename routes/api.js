/*
*       Complete the API routing below
*/
'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');
const convertHandler = new ConvertHandler();

module.exports = function (app) {
  function isDecimal(input) {
    const regex = /^\d*.\d+$/gi;  
    return regex.test(input);
  }

  function isInteger(input) {
    const regex = /^\d+$/gi;
    return regex.test(input);
  }

  function containsSpace(input) {
    const regex = /\s/gi;
    return regex.test(input);
  }

  function validNumber(input) {
    if(containsSpace(input)) {
      return false;
    }
      
    const inputArray = input.split('/');
    if(inputArray.length > 2) {
      return false;
    }

    for(let i=0; i<inputArray.length; i++) {
      if(!isDecimal(inputArray[i]) && !isInteger(inputArray[i])) {
        return false;
      }
    }

    return true;
  }

  function validUnit(input) {
    const units = ["gal", "l", "lbs", "kg", "mi", "km"];

    if(units.indexOf(input) < 0) {
      return false;
    }
    return true;
  }

  app.route('/api/convert').get(function (req, res){
      let input = req.query.input;
      let initNum = convertHandler.getNum(input);  
      let initUnit = convertHandler.getUnit(input);
      let errorString = "";
      
      if(!validNumber(initNum)) {
        errorString += "invalid number";
      }

      if(!validUnit(initUnit)) {
        if(errorString.length === 0) {
          errorString += "invalid unit";
        } else {
          errorString += " and unit";
        }
      }

      if(errorString.length > 0) {
        res.send(errorString);
      }

      var returnNum = convertHandler.convert(initNum, initUnit);
      var returnUnit = convertHandler.getReturnUnit(initUnit);
      var toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

      res.json({
        initNum: initNum,
        initUnit: initUnit, 
        returnNum: returnNum, 
        returnUnit: returnUnit, 
        string: toString,
      });
    });
};
