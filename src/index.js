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
      keyElement.addEventListener('mousedown', () => {
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

function isNeedToChangeLanguage() {
  if (
    bodyElement.classList.contains('body_shiftleft')
     && bodyElement.classList.contains('body_altleft')
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
  let symbol = '';
  if (
    (bodyElement.classList.contains('body_shiftleft') &&
      bodyElement.classList.contains('body_capslock')) ||
    (!bodyElement.classList.contains('body_shiftleft') &&
      !bodyElement.classList.contains('body_capslock'))
  ) {
    if (bodyElement.classList.contains('body_ru')) {
      symbol = this.ruSymbol;
    } else {
      symbol = this.enSymbol;
    }
  } else if (bodyElement.classList.contains('body_ru')) {
    if (this.ruShiftSymbol) {
      symbol = this.ruShiftSymbol;
    } else {
      symbol = this.ruSymbol.toUpperCase();
    }
  } else if (this.enShiftSymbol) {
    symbol = this.enShiftSymbol;
  } else {
    symbol = this.enSymbol.toUpperCase();
  }

  const startPos = screenElement.selectionStart;
  const endPos = screenElement.selectionEnd;
  screenElement.value =
    screenElement.value.substring(0, startPos) +
    symbol +
    screenElement.value.substring(endPos, screenElement.value.length);
  screenElement.setSelectionRange(startPos + 1, startPos + 1);
}

function deletePrevious() {
  const startPos = screenElement.selectionStart;
  const endPos = screenElement.selectionEnd;
  screenElement.value =
    screenElement.value.substring(0, startPos - 1) +
    screenElement.value.substring(endPos, screenElement.value.length);
  screenElement.setSelectionRange(startPos - 1, startPos - 1);
}

function deleteNext() {
  const startPos = screenElement.selectionStart;
  const endPos = screenElement.selectionEnd;
  screenElement.value =
    screenElement.value.substring(0, startPos) +
    screenElement.value.substring(endPos + 1, screenElement.value.length);
  screenElement.setSelectionRange(startPos, startPos);
}

function moveCursorLeft() {
  const startPos = screenElement.selectionStart;
  screenElement.setSelectionRange(startPos - 1, startPos - 1);
}

function moveCursorRight() {
  const startPos = screenElement.selectionStart;
  screenElement.setSelectionRange(startPos + 1, startPos + 1);
}

function moveCursorToStart() {
  screenElement.setSelectionRange(0, 0);
}

function moveCursorToEnd() {
  screenElement.setSelectionRange(
    screenElement.value.length,
    screenElement.value.length,
  );
}

function toNewLine() {
  const startPos = screenElement.selectionStart;
  const endPos = screenElement.selectionEnd;
  screenElement.value = `${screenElement.value.substring(
    0,
    startPos,
  )}\n${screenElement.value.substring(endPos, screenElement.value.length)}`;
  screenElement.setSelectionRange(startPos + 1, startPos + 1);
}

function scroolScreen() {
  if (screenElement.selectionStart === screenElement.selectionEnd) {
    screenElement.scrollTop = screenElement.scrollHeight;
  }
}

function addTabulation() {
  const startPos = screenElement.selectionStart;
  const endPos = screenElement.selectionEnd;
  screenElement.value = `${screenElement.value.substring(
    0,
    startPos,
  )}\t${screenElement.value.substring(endPos, screenElement.value.length)}`;
  screenElement.setSelectionRange(startPos + 1, startPos + 1);
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
    callback: typeSymbol,
  },
  {
    code: 'Digit2',
    enSymbol: '2',
    ruSymbol: '2',
    enShiftSymbol: '@',
    ruShiftSymbol: '"',
    callback: typeSymbol,
  },
  {
    code: 'Digit3',
    enSymbol: '3',
    ruSymbol: '3',
    enShiftSymbol: '#',
    ruShiftSymbol: '№',
    callback: typeSymbol,
  },
  {
    code: 'Digit4',
    enSymbol: '4',
    ruSymbol: '4',
    enShiftSymbol: '$',
    ruShiftSymbol: ';',
    callback: typeSymbol,
  },
  {
    code: 'Digit5',
    enSymbol: '5',
    ruSymbol: '5',
    enShiftSymbol: '%',
    ruShiftSymbol: '%',
    callback: typeSymbol,
  },
  {
    code: 'Digit6',
    enSymbol: '6',
    ruSymbol: '6',
    enShiftSymbol: '^',
    ruShiftSymbol: ':',
    callback: typeSymbol,
  },
  {
    code: 'Digit7',
    enSymbol: '7',
    ruSymbol: '7',
    enShiftSymbol: '&',
    ruShiftSymbol: '?',
    callback: typeSymbol,
  },
  {
    code: 'Digit8',
    enSymbol: '8',
    ruSymbol: '8',
    enShiftSymbol: '*',
    ruShiftSymbol: '*',
    callback: typeSymbol,
  },
  {
    code: 'Digit9',
    enSymbol: '9',
    ruSymbol: '9',
    enShiftSymbol: '(',
    ruShiftSymbol: '(',
    callback: typeSymbol,
  },
  {
    code: 'Digit0',
    enSymbol: '0',
    ruSymbol: '0',
    enShiftSymbol: ')',
    ruShiftSymbol: ')',
    callback: typeSymbol,
  },
  {
    code: 'Minus',
    enSymbol: '-',
    ruSymbol: '-',
    enShiftSymbol: '_',
    ruShiftSymbol: '_',
    callback: typeSymbol,
  },
  {
    code: 'Equal',
    enSymbol: '=',
    ruSymbol: '=',
    enShiftSymbol: '+',
    ruShiftSymbol: '=',
    callback: typeSymbol,
  },
  {
    code: 'Backspace',
    enSymbol: 'Backspace',
    ruSymbol: 'Backspace',
    flexGrow: '1',
    callback: deletePrevious,
  },
  {
    code: 'Tab',
    enSymbol: 'Tab',
    ruSymbol: 'Tab',
    flexGrow: '1',
    callback: addTabulation,
  },
  {
    code: 'KeyQ',
    enSymbol: 'q',
    ruSymbol: 'й',
    callback: typeSymbol,
  },
  {
    code: 'KeyW',
    enSymbol: 'w',
    ruSymbol: 'ц',
    callback: typeSymbol,
  },
  {
    code: 'KeyE',
    enSymbol: 'e',
    ruSymbol: 'у',
    callback: typeSymbol,
  },
  {
    code: 'KeyR',
    enSymbol: 'r',
    ruSymbol: 'к',
    callback: typeSymbol,
  },
  {
    code: 'KeyT',
    enSymbol: 't',
    ruSymbol: 'е',
    callback: typeSymbol,
  },
  {
    code: 'KeyY',
    enSymbol: 'y',
    ruSymbol: 'н',
    callback: typeSymbol,
  },
  {
    code: 'KeyU',
    enSymbol: 'u',
    ruSymbol: 'г',
    callback: typeSymbol,
  },
  {
    code: 'KeyI',
    enSymbol: 'i',
    ruSymbol: 'ш',
    callback: typeSymbol,
  },
  {
    code: 'KeyO',
    enSymbol: 'o',
    ruSymbol: 'щ',
    callback: typeSymbol,
  },
  {
    code: 'KeyP',
    enSymbol: 'p',
    ruSymbol: 'з',
    callback: typeSymbol,
  },
  {
    code: 'BracketLeft',
    enSymbol: '[',
    ruSymbol: 'х',
    enShiftSymbol: '{',
    callback: typeSymbol,
  },
  {
    code: 'BracketRight',
    enSymbol: ']',
    ruSymbol: 'ъ',
    enShiftSymbol: '}',
    callback: typeSymbol,
  },
  {
    code: 'Backslash',
    enSymbol: '\\',
    ruSymbol: '\\',
    enShiftSymbol: '|',
    ruShiftSymbol: '/',
    callback: typeSymbol,
  },
  {
    code: 'Delete',
    enSymbol: 'Del',
    ruSymbol: 'Del',
    callback: deleteNext,
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
    callback: typeSymbol,
  },
  {
    code: 'KeyS',
    enSymbol: 's',
    ruSymbol: 'ы',
    callback: typeSymbol,
  },
  {
    code: 'KeyD',
    enSymbol: 'd',
    ruSymbol: 'в',
    callback: typeSymbol,
  },
  {
    code: 'KeyF',
    enSymbol: 'f',
    ruSymbol: 'а',
    callback: typeSymbol,
  },
  {
    code: 'KeyG',
    enSymbol: 'g',
    ruSymbol: 'п',
    callback: typeSymbol,
  },
  {
    code: 'KeyH',
    enSymbol: 'h',
    ruSymbol: 'р',
    callback: typeSymbol,
  },
  {
    code: 'KeyJ',
    enSymbol: 'j',
    ruSymbol: 'о',
    callback: typeSymbol,
  },
  {
    code: 'KeyK',
    enSymbol: 'k',
    ruSymbol: 'л',
    callback: typeSymbol,
  },
  {
    code: 'KeyL',
    enSymbol: 'l',
    ruSymbol: 'д',
    callback: typeSymbol,
  },
  {
    code: 'Semicolon',
    enSymbol: ';',
    ruSymbol: 'ж',
    enShiftSymbol: ':',
    callback: typeSymbol,
  },
  {
    code: 'Quote',
    enSymbol: "'",
    ruSymbol: 'э',
    enShiftSymbol: '"',
    callback: typeSymbol,
  },
  {
    code: 'Enter',
    enSymbol: 'Enter',
    ruSymbol: 'Enter',
    flexGrow: '1',
    callback: toNewLine,
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
    callback: typeSymbol,
  },
  {
    code: 'KeyX',
    enSymbol: 'x',
    ruSymbol: 'ч',
    callback: typeSymbol,
  },
  {
    code: 'KeyC',
    enSymbol: 'c',
    ruSymbol: 'с',
    callback: typeSymbol,
  },
  {
    code: 'KeyV',
    enSymbol: 'v',
    ruSymbol: 'м',
    callback: typeSymbol,
  },
  {
    code: 'KeyB',
    enSymbol: 'b',
    ruSymbol: 'и',
    callback: typeSymbol,
  },
  {
    code: 'KeyN',
    enSymbol: 'n',
    ruSymbol: 'т',
    callback: typeSymbol,
  },
  {
    code: 'KeyM',
    enSymbol: 'm',
    ruSymbol: 'ь',
    callback: typeSymbol,
  },
  {
    code: 'Comma',
    enSymbol: ',',
    ruSymbol: 'б',
    enShiftSymbol: '<',
    callback: typeSymbol,
  },
  {
    code: 'Period',
    enSymbol: '.',
    ruSymbol: 'ю',
    enShiftSymbol: '>',
    callback: typeSymbol,
  },
  {
    code: 'Slash',
    enSymbol: '/',
    ruSymbol: '.',
    enShiftSymbol: '?',
    ruShiftSymbol: ',',
    callback: typeSymbol,
  },
  {
    code: 'ArrowUp',
    enSymbol: '↑',
    ruSymbol: '↑',
    callback: moveCursorToStart,
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
    callback: typeSymbol,
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
    callback: moveCursorLeft,
  },
  {
    code: 'ArrowDown',
    enSymbol: '↓',
    ruSymbol: '↓',
    callback: moveCursorToEnd,
  },
  {
    code: 'ArrowRight',
    enSymbol: '→',
    ruSymbol: '→',
    callback: moveCursorRight,
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
          event.preventDefault();
          key.classList.add('active');
          key.dispatchEvent(new MouseEvent('mousedown'));
      }
      scroolScreen();
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

screenElement.addEventListener('blur', () => {
  screenElement.focus();
});

window.onload = () => {
  screenElement.focus();
};
