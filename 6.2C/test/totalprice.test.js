const { expect } = require('chai');
const { calculateTotalPrice } = require('../services/books.service');

describe('calculateTotalPrice()', () => {

  it('should return total price when both inputs are valid numbers', () => {
    const result = calculateTotalPrice(10, 20);
    expect(result).to.be.a('number');
    expect(result).to.be.greaterThan(0);
  });

  it('should throw an error when a price is negative', () => {
    expect(() => calculateTotalPrice(-5, 10)).to.throw();
  });

  it('should handle zero values correctly', () => {
    const result = calculateTotalPrice(0, 0);
    expect(result).to.be.a('number');
  });

});
