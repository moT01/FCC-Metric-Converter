/*
*       Complete the handler logic below
*/

function ConvertHandler() {
  this.getNum = input => {
    const regex = /[a-z]/i;
    const index = input.search(regex);
    return input.slice(0, index) || "1";
  };
  
  this.getUnit = input => {
    const regex = /[a-z]/i;
    const index = input.search(regex);
    const unit  = input.slice(index, input.length).toLowerCase();
    const units = ["gal", "l", "lbs", "kg", "mi", "km"];

    if(units.indexOf(unit) < 0) {
      return 'invalid unit';
    }
    return unit;
  };
  
  this.convert = (initNum, initUnit) => {
    const convert = {
      gal: number => number * 3.78541,
      l  : number => number / 3.78541,
      lbs: number => number * 0.453592,
      kg : number => number / 0.453592,
      mi : number => number * 1.60934,
      km : number => number / 1.60934
    }
    initNum = eval(initNum);
    return convert[initUnit](initNum).toFixed(5);
  };
    
  this.getReturnUnit = initUnit => {
    const convertUnit = {
      gal:   "l",
      l  : "gal",
      lbs:  "kg",
      kg : "lbs",
      mi :  "km",
      km :  "mi"
    }
    return convertUnit[initUnit];
  };

  this.spellOutUnit = unit => {
    const units = {
      gal: "gallons",
      l: "liters",
      lbs: "pounds",
      kg: "kilograms",
      mi: "miles",
      km: "kilometers",
    }
    return units[unit];
  };

  this.getString = (initNum, initUnit, returnNum, returnUnit) => {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;
