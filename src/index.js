import './scss/style.scss';

class Key {
  constructor(keyCode, callback, widthCoef = 1) {
    this.keyCode = keyCode;
    this.callback = callback;
    this.widthCoef = widthCoef;
  }

  render() {
    const key = document.createElement('div');
    key.classList.add('key');
    key.dataset.key = this.keyCode;
    key.style.width = `${this.widthCoef * 50}px`;
    key.innerText = this.keyCode;

    return key;
  }
}

const screenElement = document.querySelector('.screen');
const keyboardElement = document.querySelector('.keyboard');

keyboardElement.insertAdjacentElement('beforeend', new Key('1').render());
keyboardElement.insertAdjacentElement('beforeend', new Key('2').render());
keyboardElement.insertAdjacentElement('beforeend', new Key('3').render());

keyboardElement.addEventListener('click', (event) => {
  const key = event.target.closest('.key');
  if (key) {
    screenElement.insertAdjacentHTML('beforeend', key.dataset.key);
  }
});

const keysArray = Array.from(document.querySelectorAll('.key'));

document.addEventListener('keydown', (event) => {
  keysArray.forEach((key) => {
    if (event.key === key.dataset.key) {
      key.classList.add('active');

      key.dispatchEvent(new MouseEvent('click', {
        bubbles: true,
      }));
    }
  });
});

document.addEventListener('keyup', (event) => {
  keysArray.forEach((key) => {
    if (event.key === key.dataset.key) {
      key.classList.remove('active');
    }
  });
});
