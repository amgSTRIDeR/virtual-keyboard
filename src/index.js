import './scss/style.scss';

class Key {
  constructor(key, callback, widthCoef = 1) {
    this.key = key;
    this.callback = callback;
    this.widthCoef = widthCoef;
  }

  render() {
    const keyElement = document.createElement('div');
    keyElement.classList.add('key');
    keyElement.dataset.key = this.key.enSymbol;
    keyElement.innerText = this.key.enSymbol;
    keyElement.style.width = this.key.width;
    keyElement.style.flexGrow = this.key.flexGrow;
    return keyElement;
  }
}

const keysArray = [
  {
    enSymbol: '~',
    ruSymbol: 'ё',
    enShiftSymbol: '`',
    ruShiftSymbol: 'Ё',
    flexGrow: '0',
  },
  {
    enSymbol: '1',
    ruSymbol: '1',
    enShiftSymbol: '!',
    ruShiftSymbol: '!',
    flexGrow: '0',
  },
  {
    enSymbol: '2',
    ruSymbol: '2',
    enShiftSymbol: '@',
    ruShiftSymbol: '"',
    flexGrow: '0',
  },
  {
    enSymbol: '3',
    ruSymbol: '3',
    enShiftSymbol: '#',
    ruShiftSymbol: '№',
    flexGrow: '0',
  },
  {
    enSymbol: '4',
    ruSymbol: '4',
    enShiftSymbol: '$',
    ruShiftSymbol: ';',
    flexGrow: '0',
  },
  {
    enSymbol: '5',
    ruSymbol: '5',
    enShiftSymbol: '%',
    ruShiftSymbol: '%',
    flexGrow: '0',
  },
  {
    enSymbol: '6',
    ruSymbol: '6',
    enShiftSymbol: '^',
    ruShiftSymbol: ':',
    flexGrow: '0',
  },
  {
    enSymbol: '7',
    ruSymbol: '7',
    enShiftSymbol: '&',
    ruShiftSymbol: '?',
    flexGrow: '0',
  },
  {
    enSymbol: '8',
    ruSymbol: '8',
    enShiftSymbol: '*',
    ruShiftSymbol: '*',
    flexGrow: '0',
  },
  {
    enSymbol: '9',
    ruSymbol: '9',
    enShiftSymbol: '(',
    ruShiftSymbol: '(',
    flexGrow: '0',
  },
  {
    enSymbol: '0',
    ruSymbol: '0',
    enShiftSymbol: ')',
    ruShiftSymbol: ')',
    flexGrow: '0',
  },
  {
    enSymbol: '-',
    ruSymbol: '-',
    enShiftSymbol: '_',
    ruShiftSymbol: '_',
    flexGrow: '0',
  },
  {
    enSymbol: '=',
    ruSymbol: '=',
    enShiftSymbol: '+',
    ruShiftSymbol: '=',
    flexGrow: '0',
  },
  {
    enSymbol: 'Backspace',
    ruSymbol: 'Backspace',
    enShiftSymbol: 'Backspace',
    ruShiftSymbol: 'Backspace',
    flexGrow: '1',
  },
  {
    enSymbol: 'Tab',
    ruSymbol: 'Tab',
    enShiftSymbol: 'Tab',
    ruShiftSymbol: 'Tab',
    flexGrow: '1',
  },
  {
    enSymbol: 'q',
    ruSymbol: 'й',
    enShiftSymbol: 'Q',
    ruShiftSymbol: 'Й',
    flexGrow: '0',
  },
  {
    enSymbol: 'w',
    ruSymbol: 'ц',
    enShiftSymbol: 'W',
    ruShiftSymbol: 'Ц',
    flexGrow: '0',
  },
  {
    enSymbol: 'e',
    ruSymbol: 'у',
    enShiftSymbol: 'E',
    ruShiftSymbol: 'У',
    flexGrow: '0',
  },
  {
    enSymbol: 'r',
    ruSymbol: 'к',
    enShiftSymbol: 'R',
    ruShiftSymbol: 'К',
    flexGrow: '0',
  },
  {
    enSymbol: 't',
    ruSymbol: 'е',
    enShiftSymbol: 'T',
    ruShiftSymbol: 'Е',
    flexGrow: '0',
  },
  {
    enSymbol: 'y',
    ruSymbol: 'н',
    enShiftSymbol: 'Y',
    ruShiftSymbol: 'Н',
    flexGrow: '0',
  },
  {
    enSymbol: 'u',
    ruSymbol: 'г',
    enShiftSymbol: 'U',
    ruShiftSymbol: 'Г',
    flexGrow: '0',
  },
  {
    enSymbol: 'i',
    ruSymbol: 'ш',
    enShiftSymbol: 'I',
    ruShiftSymbol: 'Ш',
    flexGrow: '0',
  },
  {
    enSymbol: 'o',
    ruSymbol: 'щ',
    enShiftSymbol: 'O',
    ruShiftSymbol: 'Щ',
    flexGrow: '0',
  },
  {
    enSymbol: 'p',
    ruSymbol: 'з',
    enShiftSymbol: 'P',
    ruShiftSymbol: 'З',
    flexGrow: '0',
  },
  {
    enSymbol: '[',
    ruSymbol: 'х',
    enShiftSymbol: '{',
    ruShiftSymbol: 'Х',
    flexGrow: '0',
  },
  {
    enSymbol: ']',
    ruSymbol: 'ъ',
    enShiftSymbol: '}',
    ruShiftSymbol: 'Ъ',
    flexGrow: '0',
  },
  {
    enSymbol: '\\',
    ruSymbol: '\\',
    enShiftSymbol: '|',
    ruShiftSymbol: '/',
    flexGrow: '0',
  },
  {
    enSymbol: 'del',
    ruSymbol: 'del',
    enShiftSymbol: '|',
    ruShiftSymbol: '/',
    flexGrow: '0',
  },
  {
    enSymbol: 'CapsLock',
    ruSymbol: 'CapsLock',
    enShiftSymbol: 'CapsLock',
    ruShiftSymbol: 'CapsLock',
    flexGrow: '1',
  },
  {
    enSymbol: 'a',
    ruSymbol: 'ф',
    enShiftSymbol: 'A',
    ruShiftSymbol: 'Ф',
    flexGrow: '0',
  },
  {
    enSymbol: 's',
    ruSymbol: 'ы',
    enShiftSymbol: 'S',
    ruShiftSymbol: 'Ы',
    flexGrow: '0',
  },
  {
    enSymbol: 'd',
    ruSymbol: 'в',
    enShiftSymbol: 'D',
    ruShiftSymbol: 'В',
    flexGrow: '0',
  },
  {
    enSymbol: 'f',
    ruSymbol: 'а',
    enShiftSymbol: 'F',
    ruShiftSymbol: 'А',
    flexGrow: '0',
  },
  {
    enSymbol: 'g',
    ruSymbol: 'п',
    enShiftSymbol: 'G',
    ruShiftSymbol: 'П',
    flexGrow: '0',
  },
  {
    enSymbol: 'h',
    ruSymbol: 'р',
    enShiftSymbol: 'H',
    ruShiftSymbol: 'Р',
    flexGrow: '0',
  },
  {
    enSymbol: 'j',
    ruSymbol: 'о',
    enShiftSymbol: 'J',
    ruShiftSymbol: 'О',
    flexGrow: '0',
  },
  {
    enSymbol: 'k',
    ruSymbol: 'л',
    enShiftSymbol: 'K',
    ruShiftSymbol: 'Л',
    flexGrow: '0',
  },
  {
    enSymbol: 'l',
    ruSymbol: 'д',
    enShiftSymbol: 'L',
    ruShiftSymbol: 'Д',
    flexGrow: '0',
  },
  {
    enSymbol: ';',
    ruSymbol: 'ж',
    enShiftSymbol: ':',
    ruShiftSymbol: 'Ж',
    flexGrow: '0',
  },
  {
    enSymbol: "'",
    ruSymbol: 'э',
    enShiftSymbol: '"',
    ruShiftSymbol: 'Э',
    flexGrow: '0',
  },
  {
    enSymbol: 'Enter',
    ruSymbol: 'Enter',
    enShiftSymbol: 'Enter',
    ruShiftSymbol: 'Enter',
    flexGrow: '1',
  },
  {
    enSymbol: 'Shift',
    ruSymbol: 'Shift',
    enShiftSymbol: 'Shift',
    ruShiftSymbol: 'Shift',
    flexGrow: '1',
  },
  {
    enSymbol: 'z',
    ruSymbol: 'я',
    enShiftSymbol: 'Z',
    ruShiftSymbol: 'Я',
    flexGrow: '0',
  },
  {
    enSymbol: 'x',
    ruSymbol: 'ч',
    enShiftSymbol: 'X',
    ruShiftSymbol: 'Ч',
    flexGrow: '0',
  },
  {
    enSymbol: 'c',
    ruSymbol: 'с',
    enShiftSymbol: 'C',
    ruShiftSymbol: 'С',
    flexGrow: '0',
  },
  {
    enSymbol: 'v',
    ruSymbol: 'м',
    enShiftSymbol: 'V',
    ruShiftSymbol: 'М',
    flexGrow: '0',
  },
  {
    enSymbol: 'b',
    ruSymbol: 'и',
    enShiftSymbol: 'B',
    ruShiftSymbol: 'И',
    flexGrow: '0',
  },
  {
    enSymbol: 'n',
    ruSymbol: 'т',
    enShiftSymbol: 'N',
    ruShiftSymbol: 'Т',
    flexGrow: '0',
  },
  {
    enSymbol: 'm',
    ruSymbol: 'ь',
    enShiftSymbol: 'M',
    ruShiftSymbol: 'Ь',
    flexGrow: '0',
  },
  {
    enSymbol: ',',
    ruSymbol: 'б',
    enShiftSymbol: '<',
    ruShiftSymbol: 'Б',
    flexGrow: '0',
  },
  {
    enSymbol: '.',
    ruSymbol: 'ю',
    enShiftSymbol: '>',
    ruShiftSymbol: 'Ю',
    flexGrow: '0',
  },
  {
    enSymbol: '/',
    ruSymbol: '.',
    enShiftSymbol: '?',
    ruShiftSymbol: ',',
    flexGrow: '0',
  },
  {
    enSymbol: 'ArrowTop',
    ruSymbol: 'ArrowTop',
    enShiftSymbol: 'ArrowTop',
    ruShiftSymbol: 'ArrowTop',
    flexGrow: '0',
  },
  {
    enSymbol: 'Shift',
    ruSymbol: 'Shift',
    enShiftSymbol: 'Shift',
    ruShiftSymbol: 'Shift',
    flexGrow: '0',
  },
  {
    enSymbol: 'Ctrl',
    ruSymbol: 'Ctrl',
    enShiftSymbol: 'Ctrl',
    ruShiftSymbol: 'Ctrl',
    flexGrow: '0',
  },
  {
    enSymbol: 'Win',
    ruSymbol: 'Win',
    enShiftSymbol: 'Win',
    ruShiftSymbol: 'Win',
    flexGrow: '0',
  },
  {
    enSymbol: 'Alt',
    ruSymbol: 'Alt',
    enShiftSymbol: 'Alt',
    ruShiftSymbol: 'Alt',
    flexGrow: '0',
  },
  {
    enSymbol: ' ',
    ruSymbol: ' ',
    enShiftSymbol: ' ',
    ruShiftSymbol: ' ',
    flexGrow: '1',
  },
  {
    enSymbol: 'Alt',
    ruSymbol: 'Alt',
    enShiftSymbol: 'Alt',
    ruShiftSymbol: 'Alt',
    flexGrow: '0',
  },
  {
    enSymbol: 'Ctrl',
    ruSymbol: 'Ctrl',
    enShiftSymbol: 'Ctrl',
    ruShiftSymbol: 'Ctrl',
    flexGrow: '0',
  },
  {
    enSymbol: 'ArrowLeft',
    ruSymbol: 'ArrowLeft',
    enShiftSymbol: 'ArrowLeft',
    ruShiftSymbol: 'ArrowLeft',
    flexGrow: '0',
  },
  {
    enSymbol: 'ArrowDown',
    ruSymbol: 'ArrowDown',
    enShiftSymbol: 'ArrowDown',
    ruShiftSymbol: 'ArrowDown',
    flexGrow: '0',
  },
  {
    enSymbol: 'ArrowRight',
    ruSymbol: 'ArrowRight',
    enShiftSymbol: 'ArrowRight',
    ruShiftSymbol: 'ArrowRight',
    flexGrow: '0',
  },
];

const screenElement = document.querySelector('.screen');
const keyboardElement = document.querySelector('.keyboard');
const firstRow = document.querySelector('.first-row');
const secondRow = document.querySelector('.second-row');
const thirdRow = document.querySelector('.third-row');
const fourthRow = document.querySelector('.fourth-row');
const fifthRow = document.querySelector('.fifth-row');

keysArray.forEach((key, index) => {
  if (index < 14) {
    firstRow.insertAdjacentElement('beforeend', new Key(key).render());
  } else if (index < 29) {
    secondRow.insertAdjacentElement('beforeend', new Key(key).render());
  } else if (index < 42) {
    thirdRow.insertAdjacentElement('beforeend', new Key(key).render());
  } else if (index < 55) {
    fourthRow.insertAdjacentElement('beforeend', new Key(key).render());
  } else {
    fifthRow.insertAdjacentElement('beforeend', new Key(key).render());
  }
});

keyboardElement.addEventListener('click', (event) => {
  const key = event.target.closest('.key');
  if (key) {
    screenElement.insertAdjacentHTML('beforeend', key.dataset.key);
  }
});

const keysElementsArray = Array.from(document.querySelectorAll('.key'));

document.addEventListener('keydown', (event) => {
  keysElementsArray.forEach((key) => {
    if (event.key === key.dataset.key) {
      key.classList.add('active');

      key.dispatchEvent(
        new MouseEvent('click', {
          bubbles: true,
        }),
      );
    }
  });
});

document.addEventListener('keyup', (event) => {
  keysElementsArray.forEach((key) => {
    if (event.key === key.dataset.key) {
      key.classList.remove('active');
    }
  });
});
