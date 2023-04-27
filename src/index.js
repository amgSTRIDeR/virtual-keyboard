import './scss/style.scss';

class Key {
  constructor(key) {
    this.key = key;
  }

  render() {
    const keyElement = document.createElement('div');
    keyElement.classList.add('key');
    keyElement.dataset.code = this.key.code;
    keyElement.innerHTML = `<p class="language_en">${
      this.key.enSymbol
    }<span class="additional-symbol">${
      this.key.enShiftSymbol || ''
    }</span></p><p class="language_ru">${
      this.key.ruSymbol
    }<span class="additional-symbol">${
      this.key.ruShiftSymbol || ''
    }</span></p>`;

    keyElement.style.flexGrow = this.key.flexGrow;
    if (this.key.callback) {
      keyElement.addEventListener('click', () => {
        this.key.callback(keyElement, `body_${this.key.code.toLowerCase()}`);
      });
    }

    return keyElement;
  }
}

const bodyElement = document.querySelector('.body');
const screenElement = document.querySelector('.screen');
const firstRow = document.querySelector('.first-row');
const secondRow = document.querySelector('.second-row');
const thirdRow = document.querySelector('.third-row');
const fourthRow = document.querySelector('.fourth-row');
const fifthRow = document.querySelector('.fifth-row');

let currentLanguage = localStorage.getItem('language') || 'en';

function changeLanguage() {
  if (currentLanguage === 'en') {
    currentLanguage = 'ru';
    bodyElement.classList.add('body_ru');
    localStorage.setItem('language', 'ru');
  } else {
    currentLanguage = 'en';
    bodyElement.classList.remove('body_ru');
    localStorage.setItem('language', 'en');
  }
}

function isNeedToChangeLanguage(element) {
  if (
    element.dataset.code === 'AltLeft' &&
    bodyElement.classList.contains('body_shiftleft') &&
    !bodyElement.classList.contains('body_altleft')
  ) {
    return true;
  }

  if (
    element.dataset.code === 'ShiftLeft' &&
    bodyElement.classList.contains('body_altleft') &&
    !bodyElement.classList.contains('body_shiftleft')
  ) {
    return true;
  }
  return false;
}

function toggleElement(element, bodyClass) {
  bodyElement.classList.toggle(bodyClass);
  element.classList.toggle('active');

  if (isNeedToChangeLanguage(element)) {
    changeLanguage();
  }
}

function handleButtonDown(element, bodyClass) {
  if (!bodyElement.classList.contains(bodyClass)) {
    bodyElement.classList.add(bodyClass);
    element.classList.add('active');
  }

  if (isNeedToChangeLanguage(element)) {
    changeLanguage();
  }
}

function handleButtonUp(element, bodyClass) {
  bodyElement.classList.remove(bodyClass);
  element.classList.remove('active');

  if (isNeedToChangeLanguage(element)) {
    changeLanguage();
  }
}

function typeSymbol() {
  console.log(this);
}

const keysArray = [
  {
    code: 'Backquote',
    enSymbol: '`',
    ruSymbol: 'ё',
    enShiftSymbol: '~',
    callback: typeSymbol,
  },
  {
    code: 'Digit1',
    enSymbol: '1',
    ruSymbol: '1',
    enShiftSymbol: '!',
    ruShiftSymbol: '!',
  },
  {
    code: 'Digit2',
    enSymbol: '2',
    ruSymbol: '2',
    enShiftSymbol: '@',
    ruShiftSymbol: '"',
  },
  {
    code: 'Digit3',
    enSymbol: '3',
    ruSymbol: '3',
    enShiftSymbol: '#',
    ruShiftSymbol: '№',
  },
  {
    code: 'Digit4',
    enSymbol: '4',
    ruSymbol: '4',
    enShiftSymbol: '$',
    ruShiftSymbol: ';',
  },
  {
    code: 'Digit5',
    enSymbol: '5',
    ruSymbol: '5',
    enShiftSymbol: '%',
    ruShiftSymbol: '%',
  },
  {
    code: 'Digit6',
    enSymbol: '6',
    ruSymbol: '6',
    enShiftSymbol: '^',
    ruShiftSymbol: ':',
  },
  {
    code: 'Digit7',
    enSymbol: '7',
    ruSymbol: '7',
    enShiftSymbol: '&',
    ruShiftSymbol: '?',
  },
  {
    code: 'Digit8',
    enSymbol: '8',
    ruSymbol: '8',
    enShiftSymbol: '*',
    ruShiftSymbol: '*',
  },
  {
    code: 'Digit9',
    enSymbol: '9',
    ruSymbol: '9',
    enShiftSymbol: '(',
    ruShiftSymbol: '(',
  },
  {
    code: 'Digit0',
    enSymbol: '0',
    ruSymbol: '0',
    enShiftSymbol: ')',
    ruShiftSymbol: ')',
  },
  {
    code: 'Minus',
    enSymbol: '-',
    ruSymbol: '-',
    enShiftSymbol: '_',
    ruShiftSymbol: '_',
  },
  {
    code: 'Equal',
    enSymbol: '=',
    ruSymbol: '=',
    enShiftSymbol: '+',
    ruShiftSymbol: '=',
  },
  {
    code: 'Backspace',
    enSymbol: 'Backspace',
    ruSymbol: 'Backspace',
    flexGrow: '1',
  },
  {
    code: 'Tab',
    enSymbol: 'Tab',
    ruSymbol: 'Tab',
    flexGrow: '1',
  },
  {
    code: 'KeyQ',
    enSymbol: 'q',
    ruSymbol: 'й',
  },
  {
    code: 'KeyW',
    enSymbol: 'w',
    ruSymbol: 'ц',
  },
  {
    code: 'KeyE',
    enSymbol: 'e',
    ruSymbol: 'у',
  },
  {
    code: 'KeyR',
    enSymbol: 'r',
    ruSymbol: 'к',
  },
  {
    code: 'KeyT',
    enSymbol: 't',
    ruSymbol: 'е',
  },
  {
    code: 'KeyY',
    enSymbol: 'y',
    ruSymbol: 'н',
  },
  {
    code: 'KeyU',
    enSymbol: 'u',
    ruSymbol: 'г',
  },
  {
    code: 'KeyI',
    enSymbol: 'i',
    ruSymbol: 'ш',
  },
  {
    code: 'KeyO',
    enSymbol: 'o',
    ruSymbol: 'щ',
  },
  {
    code: 'KeyP',
    enSymbol: 'p',
    ruSymbol: 'з',
  },
  {
    code: 'BracketLeft',
    enSymbol: '[',
    ruSymbol: 'х',
    enShiftSymbol: '{',
  },
  {
    code: 'BracketRight',
    enSymbol: ']',
    ruSymbol: 'ъ',
    enShiftSymbol: '}',
  },
  {
    code: 'Backslash',
    enSymbol: '\\',
    ruSymbol: '\\',
    enShiftSymbol: '|',
    ruShiftSymbol: '/',
  },
  {
    code: 'Delete',
    enSymbol: 'Del',
    ruSymbol: 'Del',
  },
  {
    code: 'CapsLock',
    enSymbol: 'CapsLock',
    ruSymbol: 'CapsLock',
    flexGrow: '1',
    callback: toggleElement,
  },
  {
    code: 'KeyA',
    enSymbol: 'a',
    ruSymbol: 'ф',
  },
  {
    code: 'KeyS',
    enSymbol: 's',
    ruSymbol: 'ы',
  },
  {
    code: 'KeyD',
    enSymbol: 'd',
    ruSymbol: 'в',
  },
  {
    code: 'KeyF',
    enSymbol: 'f',
    ruSymbol: 'а',
  },
  {
    code: 'KeyG',
    enSymbol: 'g',
    ruSymbol: 'п',
  },
  {
    code: 'KeyH',
    enSymbol: 'h',
    ruSymbol: 'р',
  },
  {
    code: 'KeyJ',
    enSymbol: 'j',
    ruSymbol: 'о',
  },
  {
    code: 'KeyK',
    enSymbol: 'k',
    ruSymbol: 'л',
  },
  {
    code: 'KeyL',
    enSymbol: 'l',
    ruSymbol: 'д',
  },
  {
    code: 'Semicolon',
    enSymbol: ';',
    ruSymbol: 'ж',
    enShiftSymbol: ':',
  },
  {
    code: 'Quote',
    enSymbol: "'",
    ruSymbol: 'э',
    enShiftSymbol: '"',
  },
  {
    code: 'Enter',
    enSymbol: 'Enter',
    ruSymbol: 'Enter',
    flexGrow: '1',
  },
  {
    code: 'ShiftLeft',
    enSymbol: 'Shift',
    ruSymbol: 'Shift',
    flexGrow: '1',
    callback: toggleElement,
  },
  {
    code: 'KeyZ',
    enSymbol: 'z',
    ruSymbol: 'я',
  },
  {
    code: 'KeyX',
    enSymbol: 'x',
    ruSymbol: 'ч',
  },
  {
    code: 'KeyC',
    enSymbol: 'c',
    ruSymbol: 'с',
  },
  {
    code: 'KeyV',
    enSymbol: 'v',
    ruSymbol: 'м',
  },
  {
    code: 'KeyB',
    enSymbol: 'b',
    ruSymbol: 'и',
  },
  {
    code: 'KeyN',
    enSymbol: 'n',
    ruSymbol: 'т',
  },
  {
    code: 'KeyM',
    enSymbol: 'm',
    ruSymbol: 'ь',
  },
  {
    code: 'Comma',
    enSymbol: ',',
    ruSymbol: 'б',
    enShiftSymbol: '<',
  },
  {
    code: 'Period',
    enSymbol: '.',
    ruSymbol: 'ю',
    enShiftSymbol: '>',
  },
  {
    code: 'Slash',
    enSymbol: '/',
    ruSymbol: '.',
    enShiftSymbol: '?',
    ruShiftSymbol: ',',
  },
  {
    code: 'ArrowUp',
    enSymbol: '↑',
    ruSymbol: '↑',
  },
  {
    code: 'ShiftRight',
    enSymbol: 'Shift',
    ruSymbol: 'Shift',
    callback: toggleElement,
  },
  {
    code: 'ControlLeft',
    enSymbol: 'Ctrl',
    ruSymbol: 'Ctrl',
    callback: toggleElement,
  },
  {
    code: 'MetaLeft',
    enSymbol: 'Win',
    ruSymbol: 'Win',
    callback: toggleElement,
  },
  {
    code: 'AltLeft',
    enSymbol: 'Alt',
    ruSymbol: 'Alt',
    callback: toggleElement,
  },
  {
    code: 'Space',
    enSymbol: ' ',
    ruSymbol: ' ',
    flexGrow: '1',
  },
  {
    code: 'AltRight',
    enSymbol: 'Alt',
    ruSymbol: 'Alt',
    callback: toggleElement,
  },
  {
    code: 'ControlRight',
    enSymbol: 'Ctrl',
    ruSymbol: 'Ctrl',
    callback: toggleElement,
  },
  {
    code: 'ArrowLeft',
    enSymbol: '←',
    ruSymbol: '←',
  },
  {
    code: 'ArrowDown',
    enSymbol: '↓',
    ruSymbol: '↓',
  },
  {
    code: 'ArrowRight',
    enSymbol: '→',
    ruSymbol: '→',
  },
];

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

const keysElementsArray = Array.from(document.querySelectorAll('.key'));

document.addEventListener('keydown', (event) => {
  keysElementsArray.forEach((key) => {
    if (event.code === key.dataset.code) {
      const currentKeyCode = key.dataset.code.toLowerCase();
      const bodyClass = `body_${currentKeyCode}`;
      switch (currentKeyCode) {
        case 'shiftleft':
        case 'shiftright':
        case 'controlleft':
        case 'controlright':
        case 'altleft':
        case 'altright':
        case 'metaleft':
          handleButtonDown(key, bodyClass);
          break;
        case 'capslock':
          key.classList.toggle('active');
          bodyElement.classList.toggle(bodyClass);
          break;
        default:
          key.classList.add('active');
          key.dispatchEvent(new MouseEvent('click'));
      }
    }
  });
});

document.addEventListener('keyup', (event) => {
  keysElementsArray.forEach((key) => {
    if (event.code === key.dataset.code) {
      const currentKeyCode = key.dataset.code.toLowerCase();
      const bodyClass = `body_${currentKeyCode}`;
      switch (currentKeyCode) {
        case 'shiftleft':
        case 'shiftright':
        case 'controlleft':
        case 'controlright':
        case 'altleft':
        case 'altright':
        case 'metaleft':
          handleButtonUp(key, bodyClass);
          break;
        case 'capslock':
          break;
        default:
          key.classList.remove('active');
      }
    }
  });
});
