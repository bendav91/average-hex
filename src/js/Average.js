/**
 * Class to Avererage two hex values
 */
class HexAverage {
  constructor(string1 = '#000000', string2 = '#FFFFFF') {
    this.colourA = HexAverage.prepareColour(string1);
    this.colourB = HexAverage.prepareColour(string2);
    this.arrA = [];
    this.arrB = [];
    this.decArrayA = [];
    this.decArrayB = [];
  }

  /**
     * Setter for this colour A
     * @param {string} hex
     */
  hexA(hex) {
    this.colourA = hex;
  }

  /**
     * Setter for colour B
     * @param {string} hex
     */
  hexB(hex) {
    this.colourB = hex;
  }

  /**
     * Getter for utility purposes
     */
  get colours() {
    return {
      colourA: this.colourA,
      colourB: this.colourB,
    };
  }

  /**
     * Getter for utility purposes
     */
  get colourArrays() {
    return {
      colourA: this.arrA,
      colourB: this.arrB,
    };
  }

  /**
     * Getter for utility purposes
     */
  get colourDecimalArrays() {
    return {
      colourA: this.decArrayA,
      colourB: this.decArrayB,
    };
  }

  /**
     * Takes a callback function and supplies it with a true or false value
     * allowing dev to handle errors.
     * @param {function} _callback
     */
  validate(_callback = () => {}) {
    const callback = _callback;
    callback(!!(HexAverage.checkLength(this.colourA) && HexAverage.checkLength(this.colourB)));
    return true;
  }

  /**
     * Removes # from string if one is present.
     * Returns a string.
     * @param {string} _hexString
     */
  static prepareColour(_hexString = '#000000') {
    let hexString = _hexString;
    hexString = hexString.replace(/#/g, '');
    return hexString;
  }

  /**
     * Checks the hex value for a correct length
     * Returns t or f.
     * @param {string} _hexValue
     */
  static checkLength(_hexValue = '000000') {
    return !!(_hexValue.length === 6);
  }

  /**
     * Returns an array full of arrays with each RGB value as a pair...
     * E.g. [[00], [00], [00]]
     * @param {string} _hexValue
     */
  static chunkIntoArray(_hexValue = '000000') {
    const hexValue = _hexValue;
    const part1 = [hexValue.substring(0, 2)];
    const part2 = [hexValue.substring(2, 4)];
    const part3 = [hexValue.substring(4, 6)];
    return [part1, part2, part3];
  }

  /**
     * Will set the arrays with valid chunked colours
     */
  setArraysWithValidChunkedColours() {
    this.arrA = HexAverage.chunkIntoArray(this.colourA);
    this.arrB = HexAverage.chunkIntoArray(this.colourB);
    return true;
  }

  /**
     * Converts 2 digit base 16 value to decimal
     * @param {string} _val
     */
  static toDecimal(_val = 'FF') {
    const val = _val;
    return parseInt(val, 16);
  }

  /**
     * Creates the array in decimal format
     * @param {array} arr
     */
  static createDecimalArray(arr = []) {
    return arr.map(val => HexAverage.toDecimal(val[0]));
  }

  /**
     * The main beef of the class
     */
  getAverageValue() {
    this.setArraysWithValidChunkedColours();
    this.decArrayA = HexAverage.createDecimalArray(this.arrA);
    this.decArrayB = HexAverage.createDecimalArray(this.arrB);
    const averagePortion1 = [Math.floor((this.decArrayA[0] + this.decArrayB[0]) / 2)];
    const averagePortion2 = [Math.floor((this.decArrayA[1] + this.decArrayB[1]) / 2)];
    const averagePortion3 = [Math.floor((this.decArrayA[2] + this.decArrayB[2]) / 2)];
    const averageArray = [averagePortion1, averagePortion2, averagePortion3];
    return `#${HexAverage.assembleAverageHex(HexAverage.formatAverageHex(averageArray))}`;
  }

  /**
     * Formats an array back to base 16
     * @param {array} _averageArray
     */
  static formatAverageHex(_averageArray = [[255, 255, 255]]) {
    const averageArray = _averageArray;
    return averageArray.map(portion => portion[0].toString(16));
  }

  /**
     * Performs a simple join to convert the array to a string
     * @param {array} _array
     */
  static assembleAverageHex(_array) {
    const array = _array;
    return array.join('');
  }
}

export default HexAverage;
