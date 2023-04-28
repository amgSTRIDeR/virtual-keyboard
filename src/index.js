import './scss/style.scss';

const bodyElement = document.querySelector('.body');
const screenElement = document.querySelector('.screen');
const specialRow = document.querySelector('.special-row');
const firstRow = document.querySelector('.first-row');
const secondRow = document.querySelector('.second-row');
const thirdRow = document.querySelector('.third-row');
const fourthRow = document.querySelector('.fourth-row');
const fifthRow = document.querySelector('.fifth-row');
let previousScrollPosition = window.pageYOffset;

class Key {
  constructor(key) {
    this.key = key;
  }

  render() {
    const keyElement = document.createElement('div');
    keyElement.classList.add('key');
    keyElement.dataset.code = this.key.code;

    keyElement.innerHTML = `<p class="language_en">
    <span class="main-symbol">${this.key.enSymbol}</span>
    <span class="additional-symbol">${this.key.enShiftSymbol || ''}</span>
    </p>
    <p class="language_ru">
    <span class="main-symbol">${this.key.ruSymbol}</span>
    <span class="additional-symbol">${this.key.ruShiftSymbol || ''}</span>
    </p>`;

    keyElement.style.flexGrow = this.key.flexGrow;
    if (this.key.callback) {
      keyElement.addEventListener('mousedown', () => {
        this.key.callback(keyElement, `body_${this.key.code.toLowerCase()}`);

        const keyPressAudio = document.createElement('audio');
        keyPressAudio.src = './assets/keypress.mp3';
        keyPressAudio.volume = 0.3;

        if (bodyElement.classList.contains('body_sound-off')) {
          keyPressAudio.volume = 0;
        } else {
          keyPressAudio.volume = 0.3;
        }

        keyPressAudio.play();
      });
    }

    return keyElement;
  }
}

function changeLanguage() {
  bodyElement.classList.toggle('body_ru');
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
    bodyElement.classList.contains('body_shiftleft')
    || bodyElement.classList.contains('body_shiftright')
  ) {
    if (bodyElement.classList.contains('body_ru')) {
      symbol = this.ruShiftSymbol;
    } else {
      symbol = this.enShiftSymbol;
    }
  } else if (bodyElement.classList.contains('body_ru')) {
    symbol = this.ruSymbol;
  } else {
    symbol = this.enSymbol;
  }

  if (
    (bodyElement.classList.contains('body_shiftleft')
      && bodyElement.classList.contains('body_capslock'))
    || (bodyElement.classList.contains('body_shiftright')
      && bodyElement.classList.contains('body_capslock'))
  ) {
    symbol = symbol.toLowerCase();
  } else if (
    bodyElement.classList.contains('body_shiftleft')
    || bodyElement.classList.contains('body_shiftright')
    || bodyElement.classList.contains('body_capslock')
  ) {
    symbol = symbol.toUpperCase();
  }

  const startPos = screenElement.selectionStart;
  const endPos = screenElement.selectionEnd;
  screenElement.value = screenElement.value.substring(0, startPos)
    + symbol
    + screenElement.value.substring(endPos, screenElement.value.length);
  screenElement.setSelectionRange(startPos + 1, startPos + 1);
}

function deletePrevious() {
  const startPos = screenElement.selectionStart;
  const endPos = screenElement.selectionEnd;
  screenElement.value = screenElement.value.substring(0, startPos - 1)
    + screenElement.value.substring(endPos, screenElement.value.length);
  screenElement.setSelectionRange(startPos - 1, startPos - 1);
}

function deleteNext() {
  const startPos = screenElement.selectionStart;
  const endPos = screenElement.selectionEnd;
  screenElement.value = screenElement.value.substring(0, startPos)
    + screenElement.value.substring(endPos + 1, screenElement.value.length);
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

function addTabulation() {
  const startPos = screenElement.selectionStart;
  const endPos = screenElement.selectionEnd;
  screenElement.value = `${screenElement.value.substring(
    0,
    startPos,
  )}\t${screenElement.value.substring(endPos, screenElement.value.length)}`;
  screenElement.setSelectionRange(startPos + 1, startPos + 1);
}

function scroolScreen() {
  if (screenElement.selectionStart === screenElement.selectionEnd) {
    screenElement.scrollTop = screenElement.scrollHeight;
  }
}

const keysArray = [
  {
    code: 'Backquote',
    enSymbol: '`',
    ruSymbol: 'ё',
    ruShiftSymbol: 'Ё',
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
    enShiftSymbol: 'Backspace',
    ruShiftSymbol: 'Backspace',
    flexGrow: '1',
    callback: deletePrevious,
  },
  {
    code: 'Tab',
    enSymbol: 'Tab',
    ruSymbol: 'Tab',
    enShiftSymbol: 'Tab',
    ruShiftSymbol: 'Tab',
    flexGrow: '1',
    callback: addTabulation,
  },
  {
    code: 'KeyQ',
    enSymbol: 'q',
    ruSymbol: 'й',
    enShiftSymbol: 'Q',
    ruShiftSymbol: 'Й',
    callback: typeSymbol,
  },
  {
    code: 'KeyW',
    enSymbol: 'w',
    ruSymbol: 'ц',
    enShiftSymbol: 'W',
    ruShiftSymbol: 'ц',
    callback: typeSymbol,
  },
  {
    code: 'KeyE',
    enSymbol: 'e',
    ruSymbol: 'у',
    enShiftSymbol: 'E',
    ruShiftSymbol: 'У',
    callback: typeSymbol,
  },
  {
    code: 'KeyR',
    enSymbol: 'r',
    ruSymbol: 'к',
    enShiftSymbol: 'R',
    ruShiftSymbol: 'К',
    callback: typeSymbol,
  },
  {
    code: 'KeyT',
    enSymbol: 't',
    ruSymbol: 'е',
    enShiftSymbol: 'T',
    ruShiftSymbol: 'Е',
    callback: typeSymbol,
  },
  {
    code: 'KeyY',
    enSymbol: 'y',
    ruSymbol: 'н',
    enShiftSymbol: 'Y',
    ruShiftSymbol: 'Н',
    callback: typeSymbol,
  },
  {
    code: 'KeyU',
    enSymbol: 'u',
    ruSymbol: 'г',
    enShiftSymbol: 'U',
    ruShiftSymbol: 'Г',
    callback: typeSymbol,
  },
  {
    code: 'KeyI',
    enSymbol: 'i',
    ruSymbol: 'ш',
    enShiftSymbol: 'I',
    ruShiftSymbol: 'Ш',
    callback: typeSymbol,
  },
  {
    code: 'KeyO',
    enSymbol: 'o',
    ruSymbol: 'щ',
    enShiftSymbol: 'O',
    ruShiftSymbol: 'Щ',
    callback: typeSymbol,
  },
  {
    code: 'KeyP',
    enSymbol: 'p',
    ruSymbol: 'з',
    enShiftSymbol: 'P',
    ruShiftSymbol: 'З',
    callback: typeSymbol,
  },
  {
    code: 'BracketLeft',
    enSymbol: '[',
    ruSymbol: 'х',
    enShiftSymbol: '{',
    ruShiftSymbol: 'Х',
    callback: typeSymbol,
  },
  {
    code: 'BracketRight',
    enSymbol: ']',
    ruSymbol: 'ъ',
    enShiftSymbol: '}',
    ruShiftSymbol: 'Ъ',
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
    enShiftSymbol: 'Del',
    ruShiftSymbol: 'Del',
    callback: deleteNext,
  },
  {
    code: 'CapsLock',
    enSymbol: 'CapsLock',
    ruSymbol: 'CapsLock',
    enShiftSymbol: 'CapsLock',
    ruShiftSymbol: 'CapsLock',
    flexGrow: '1',
    callback: toggleElement,
  },
  {
    code: 'KeyA',
    enSymbol: 'a',
    ruSymbol: 'ф',
    enShiftSymbol: 'A',
    ruShiftSymbol: 'Ф',
    callback: typeSymbol,
  },
  {
    code: 'KeyS',
    enSymbol: 's',
    ruSymbol: 'ы',
    enShiftSymbol: 'S',
    ruShiftSymbol: 'Ы',
    callback: typeSymbol,
  },
  {
    code: 'KeyD',
    enSymbol: 'd',
    ruSymbol: 'в',
    enShiftSymbol: 'D',
    ruShiftSymbol: 'В',
    callback: typeSymbol,
  },
  {
    code: 'KeyF',
    enSymbol: 'f',
    ruSymbol: 'а',
    enShiftSymbol: 'F',
    ruShiftSymbol: 'А',
    callback: typeSymbol,
  },
  {
    code: 'KeyG',
    enSymbol: 'g',
    ruSymbol: 'п',
    enShiftSymbol: 'G',
    ruShiftSymbol: 'П',
    callback: typeSymbol,
  },
  {
    code: 'KeyH',
    enSymbol: 'h',
    ruSymbol: 'р',
    enShiftSymbol: 'H',
    ruShiftSymbol: 'Р',
    callback: typeSymbol,
  },
  {
    code: 'KeyJ',
    enSymbol: 'j',
    ruSymbol: 'о',
    enShiftSymbol: 'J',
    ruShiftSymbol: 'О',
    callback: typeSymbol,
  },
  {
    code: 'KeyK',
    enSymbol: 'k',
    ruSymbol: 'л',
    enShiftSymbol: 'K',
    ruShiftSymbol: 'Л',
    callback: typeSymbol,
  },
  {
    code: 'KeyL',
    enSymbol: 'l',
    ruSymbol: 'д',
    enShiftSymbol: 'L',
    ruShiftSymbol: 'Д',
    callback: typeSymbol,
  },
  {
    code: 'Semicolon',
    enSymbol: ';',
    ruSymbol: 'ж',
    enShiftSymbol: ':',
    ruShiftSymbol: 'Ж',
    callback: typeSymbol,
  },
  {
    code: 'Quote',
    enSymbol: "'",
    ruSymbol: 'э',
    enShiftSymbol: '"',
    ruShiftSymbol: 'Э',
    callback: typeSymbol,
  },
  {
    code: 'Enter',
    enSymbol: 'Enter',
    ruSymbol: 'Enter',
    enShiftSymbol: 'Enter',
    ruShiftSymbol: 'Enter',
    flexGrow: '1',
    callback: toNewLine,
  },
  {
    code: 'ShiftLeft',
    enSymbol: 'Shift',
    ruSymbol: 'Shift',
    enShiftSymbol: 'Shift',
    ruShiftSymbol: 'Shift',
    flexGrow: '1',
    callback: toggleElement,
  },
  {
    code: 'KeyZ',
    enSymbol: 'z',
    ruSymbol: 'я',
    enShiftSymbol: 'Z',
    ruShiftSymbol: 'Я',
    callback: typeSymbol,
  },
  {
    code: 'KeyX',
    enSymbol: 'x',
    ruSymbol: 'ч',
    enShiftSymbol: 'X',
    ruShiftSymbol: 'Ч',
    callback: typeSymbol,
  },
  {
    code: 'KeyC',
    enSymbol: 'c',
    ruSymbol: 'с',
    enShiftSymbol: 'C',
    ruShiftSymbol: 'С',
    callback: typeSymbol,
  },
  {
    code: 'KeyV',
    enSymbol: 'v',
    ruSymbol: 'м',
    enShiftSymbol: 'V',
    ruShiftSymbol: 'М',
    callback: typeSymbol,
  },
  {
    code: 'KeyB',
    enSymbol: 'b',
    ruSymbol: 'и',
    enShiftSymbol: 'B',
    ruShiftSymbol: 'И',
    callback: typeSymbol,
  },
  {
    code: 'KeyN',
    enSymbol: 'n',
    ruSymbol: 'т',
    enShiftSymbol: 'N',
    ruShiftSymbol: 'Т',
    callback: typeSymbol,
  },
  {
    code: 'KeyM',
    enSymbol: 'm',
    ruSymbol: 'ь',
    enShiftSymbol: 'M',
    ruShiftSymbol: 'Ь',
    callback: typeSymbol,
  },
  {
    code: 'Comma',
    enSymbol: ',',
    ruSymbol: 'б',
    enShiftSymbol: '<',
    ruShiftSymbol: 'Б',
    callback: typeSymbol,
  },
  {
    code: 'Period',
    enSymbol: '.',
    ruSymbol: 'ю',
    enShiftSymbol: '>',
    ruShiftSymbol: 'Ю',
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
    enShiftSymbol: '↑',
    ruShiftSymbol: '↑',
    callback: moveCursorToStart,
  },
  {
    code: 'ShiftRight',
    enSymbol: 'Shift',
    ruSymbol: 'Shift',
    enShiftSymbol: 'Shift',
    ruShiftSymbol: 'Shift',
    callback: toggleElement,
  },
  {
    code: 'ControlLeft',
    enSymbol: 'Ctrl',
    ruSymbol: 'Ctrl',
    enShiftSymbol: 'Ctrl',
    ruShiftSymbol: 'Ctrl',
    callback: toggleElement,
  },
  {
    code: 'MetaLeft',
    enSymbol: 'Win',
    ruSymbol: 'Win',
    enShiftSymbol: 'Win',
    ruShiftSymbol: 'Win',
    callback: toggleElement,
  },
  {
    code: 'AltLeft',
    enSymbol: 'Alt',
    ruSymbol: 'Alt',
    enShiftSymbol: 'Alt',
    ruShiftSymbol: 'Alt',
    callback: toggleElement,
  },
  {
    code: 'Space',
    enSymbol: ' ',
    ruSymbol: ' ',
    enShiftSymbol: ' ',
    ruShiftSymbol: ' ',
    flexGrow: '1',
    callback: typeSymbol,
  },
  {
    code: 'AltRight',
    enSymbol: 'Alt',
    ruSymbol: 'Alt',
    enShiftSymbol: 'Alt',
    ruShiftSymbol: 'Alt',
    callback: toggleElement,
  },
  {
    code: 'ControlRight',
    enSymbol: 'Ctrl',
    ruSymbol: 'Ctrl',
    enShiftSymbol: 'Ctrl',
    ruShiftSymbol: 'Ctrl',
    callback: toggleElement,
  },
  {
    code: 'ArrowLeft',
    enSymbol: '←',
    ruSymbol: '←',
    enShiftSymbol: '←',
    ruShiftSymbol: '←',
    callback: moveCursorLeft,
  },
  {
    code: 'ArrowDown',
    enSymbol: '↓',
    ruSymbol: '↓',
    enShiftSymbol: '↓',
    ruShiftSymbol: '↓',
    callback: moveCursorToEnd,
  },
  {
    code: 'ArrowRight',
    enSymbol: '→',
    ruSymbol: '→',
    enShiftSymbol: '→',
    ruShiftSymbol: '→',
    callback: moveCursorRight,
  },
  {
    code: 'LanguageSwitch',
    enSymbol: '',
    ruSymbol: '',
    enShiftSymbol: '',
    ruShiftSymbol: '',
    callback: () => {
      bodyElement.classList.toggle('body_ru');
    },
  },
  {
    code: 'ThemeSwitch',
    enSymbol: '',
    ruSymbol: '',
    enShiftSymbol: '',
    ruShiftSymbol: '',
    callback: () => {
      bodyElement.classList.toggle('body_light');
    },
  },
  {
    code: 'VolumeSwitch',
    enSymbol: '',
    ruSymbol: '',
    enShiftSymbol: '',
    ruShiftSymbol: '',
    callback: () => {
      bodyElement.classList.toggle('body_sound-off');
    },
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
  } else if (index < 64) {
    fifthRow.insertAdjacentElement('beforeend', new Key(key).render());
  } else {
    specialRow.insertAdjacentElement('beforeend', new Key(key).render());
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
          event.preventDefault();
          key.classList.remove('active');
      }
      scroolScreen();
    }
  });
});

screenElement.addEventListener('blur', () => {
  previousScrollPosition = window.pageYOffset;
  screenElement.focus();
});

screenElement.addEventListener('focus', (event) => {
  event.preventDefault();
  window.scrollTo(0, previousScrollPosition);
});

window.onload = () => {
  screenElement.focus();

  if (localStorage.getItem('language-ru')) {
    bodyElement.classList.add('body_ru');
  }

  if (localStorage.getItem('theme-light')) {
    bodyElement.classList.add('body_light');
  }

  if (localStorage.getItem('sound-off')) {
    bodyElement.classList.add('body_sound-off');
  }
};

window.onbeforeunload = () => {
  if (bodyElement.classList.contains('body_ru')) {
    localStorage.setItem('language-ru', 'true');
  } else {
    localStorage.removeItem('language-ru');
  }

  if (bodyElement.classList.contains('body_light')) {
    localStorage.setItem('theme-light', 'true');
  } else {
    localStorage.removeItem('theme-light');
  }

  if (bodyElement.classList.contains('body_sound-off')) {
    localStorage.setItem('sound-off', 'true');
  } else {
    localStorage.removeItem('sound-off');
  }
};
