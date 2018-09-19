import HexAverage from './js/Average';
import './scss/normalize.scss';
import './scss/main.scss';

const button = document.querySelector('#go');
const a = document.querySelector('#colour-a');
const b = document.querySelector('#colour-b');
const printNumber = document.querySelector('#print-number');

[a, b].forEach((_input) => {
  const input = _input;
  input.addEventListener('click', () => {
    if (input.value.length) {
      input.setSelectionRange(0, input.value.length);
    } else {
      input.value = '#';
    }
  });
  input.addEventListener('keyup', () => {
    const newValue = input.value.replace(/#/g, '');
    input.value = `#${newValue}`;
  });
});

button.addEventListener('click', () => {
  const hexA = a.value;
  const hexB = b.value;
  const Average = new HexAverage(hexA, hexB);
  Average.validate((valid) => {
    if (valid) {
      const avg = Average.getAverageValue();
      if (!avg.includes('NaN')) {
        document.body.style.backgroundColor = avg;
        printNumber.innerHTML = avg;
      } else {
        printNumber.innerHTML = 'Error!';
      }
    } else {
      // Handling invalid hex would go here...
    }
  });
});
