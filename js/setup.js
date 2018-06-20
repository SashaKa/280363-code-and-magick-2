'use strict';

var WIZARD_FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)]'];
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var ESC_KEY_CODE = 27;
var ENTER_KEY_CODE = 13;
var WIZARDS_QUANTITY = 4;

// functions for random choises

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getRandomElFromArr = function (arr) {
  return arr[getRandomNumber(0, arr.length)];
};

var getRandomFullName = function () {
  return getRandomElFromArr(WIZARD_FIRST_NAMES) + ' ' + getRandomElFromArr(WIZARD_LAST_NAMES);
};

// //////////////////////////////////////////////////////////////////////

var getWizards = function (qty) {
  var wizards = [];
  for (var i = 0; i < qty; i++) {
    wizards.push({
      name: getRandomFullName(),
      coatColor: getRandomElFromArr(WIZARD_COAT_COLORS),
      eyesColors: getRandomElFromArr(WIZARD_EYES_COLORS)
    });
  }
  return wizards;
};

var getElementWizard = function (featureWizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = featureWizard.name;
  wizardCoat.style.fill = featureWizard.coatColor;
  wizardEyes.style.fill = featureWizard.eyesColors;
  return wizardElement;
};

var getElementsWizard = function (arr) {
  var elementsWizards = document.createDocumentFragment();
  for (var i = 0; i < arr.length; i++) {
    var wizardElements = getElementWizard(arr[i]);
    elementsWizards.appendChild(wizardElements);
  }
  return elementsWizards;
};

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = document.querySelector('.setup-close');
var setupOpenIcon = document.querySelector('.setup-open-icon');
var setupUserName = document.querySelector('.setup-user-name');
var wizardCoat = document.querySelector('.wizard-coat');
var wizardEyes = document.querySelector('.wizard-eyes');
var wizardFireball = document.querySelector('input[name = fireball-color]');
var inputWizardCoat = document.querySelector('input[name = coat-color]');
var inputWizardEyes = document.querySelector('input[name = eyes-color]');
var inputWizardFireball = document.querySelector('input[name = fireball-color]');

var onClosePopupEsc = function (evt) {
  if (evt.keyCode === ESC_KEY_CODE) {
    closePopup();
  }
};

var onDeleteAddClosePopupEsc = function () {
  document.removeEventListener('keydown', onClosePopupEsc);
};

// Changes for wizards

var onGetRandomCoatColor = function () {
  var randomCoatColor = getRandomElFromArr(WIZARD_COAT_COLORS);
  wizardCoat.style.fill = randomCoatColor;
  inputWizardCoat.value = randomCoatColor;
};
var onGetRandomEyesColor = function () {
  var randomEyesColor = getRandomElFromArr(WIZARD_EYES_COLORS);
  wizardEyes.style.fill = randomEyesColor;
  inputWizardEyes.value = randomEyesColor;
};
var onGetRandomFireballColor = function () {
  var randomFireballColor = getRandomElFromArr(WIZARD_FIREBALL_COLORS);
  wizardFireball.style.background = randomFireballColor;
  inputWizardFireball.value = randomFireballColor;
};

// Opening and closing popup

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onClosePopupEsc);
  wizardCoat.addEventListener('click', onGetRandomCoatColor);
  wizardEyes.addEventListener('click', onGetRandomEyesColor);
  wizardFireball.addEventListener('click', onGetRandomFireballColor);
  setupUserName.addEventListener('focus', onDeleteAddClosePopupEsc);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onClosePopupEsc);
  wizardCoat.removeEventListener('click', onGetRandomCoatColor);
  wizardEyes.removeEventListener('click', onGetRandomEyesColor);
  wizardFireball.removeEventListener('click', onGetRandomFireballColor);
  setupUserName.removeEventListener('blur', onDeleteAddClosePopupEsc);
};

// Functions for event

setupOpen.addEventListener('click', function () {
  openPopup();
});
setupOpenIcon.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEY_CODE) {
    openPopup();
  }
});
setupClose.addEventListener('click', function () {
  closePopup();
});
setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEY_CODE) {
    closePopup();
  }
});

var setupSimilarList = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
.content
.querySelector('.setup-similar-item');
var wizards = getWizards(WIZARDS_QUANTITY);
var elementWizards = getElementsWizard(wizards);
setupSimilarList.appendChild(elementWizards);
