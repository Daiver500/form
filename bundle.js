/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./sass/style.scss":
/*!*************************!*\
  !*** ./sass/style.scss ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {
var __webpack_exports__ = {};
/*!*********************!*\
  !*** ./js/index.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sass_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sass/style.scss */ "./sass/style.scss");




})();

// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {
/*!*********************!*\
  !*** ./js/modal.js ***!
  \*********************/


// Маска

  const modalPhone = document.querySelector(".modal__phone");
  const maxPhoneNumber = 16;

  let maskOptions = {
    mask: '+{7}(000)000-00-00'
  };
  let modalMask = IMask(modalPhone, maskOptions);

  const checkModalPhoneInput = () => {
    if (modalPhone.value.length < maxPhoneNumber) {
      modalPhone.setCustomValidity("Номер должен быть из 10 цифр");
    } else {
      modalPhone.setCustomValidity("");
    }
    modalPhone.reportValidity();
  };

  if (modalPhone) {
    modalPhone.addEventListener("input", checkModalPhoneInput);
  }

// Модальное окно

  const openModalButton = document.querySelector(".main__button");
  const closeModalButton = document.querySelector(".modal__close");
  const closeModalSuccessButton = document.querySelector(".modal-success__close");
  const modalNameInput = document.querySelector(".modal__name");
  const modalPhoneInput = document.querySelector(".modal__phone");
  const modalMain = document.querySelector(".modal");
  const modalForm = document.querySelector(".modal__form");
  const modalMainInner = document.querySelector(".modal__inner");
  const modalSuccess = document.querySelector(".modal-success");
  const modalSuccessInner = document.querySelector(".modal-success__inner");

  modalMain.classList.add("hidden");
  modalMain.style.position = "fixed";
  modalSuccess.style.position = "fixed";
  modalMainInner.style.position = "fixed";
  modalSuccessInner.style.position = "fixed";

  const modalEscPressHandler = (evt) => {
    if (evt.key === `Escape`) {
      closeModal();
      evt.preventDefault();
    }
  };

  const windowClickHandler = (evt) => {
    const target = evt.target;
    if (target === modalMain) {
      closeModal();
    }
  };

  const openModal = () => {
    modalMain.classList.remove("hidden");
    document.body.style.overflow = "hidden";
    inputFocus();
    closeModalButton.addEventListener("click", closeModal);
    modalMain.addEventListener("click", windowClickHandler);
    document.addEventListener("keydown", modalEscPressHandler);
  };

  const closeModal = () => {
    modalMain.classList.add("hidden");
    document.body.style.overflow = "";
    closeModalButton.removeEventListener("click", openModal);
    modalMain.removeEventListener("click", windowClickHandler);
    document.removeEventListener("keydown", modalEscPressHandler);
  };

  if (openModalButton) {
    openModalButton.addEventListener("click", openModal);
  }

  if (closeModalButton) {
    closeModalButton.addEventListener("click", closeModal);
  }

  const modalSuccessEscPressHandler = (evt) => {
    if (evt.key === `Escape`) {
      closeSuccessModal();
      evt.preventDefault();
    }
  };

  const windowSuccessClickHandler = (evt) => {
    const target = evt.target;
    if (target === modalSuccess) {
      closeSuccessModal();
    }
  };

  const openSuccessModal = () => {
    modalMain.classList.add("hidden");
    modalSuccess.classList.remove("hidden");
    modalSuccessInner.classList.add("modal__animation");
    closeModalSuccessButton.addEventListener("click", closeSuccessModal);
    document.addEventListener("click", windowSuccessClickHandler);
    document.addEventListener("keydown", modalSuccessEscPressHandler);
  };

  const closeSuccessModal = () => {
    modalSuccess.classList.add("hidden");
    modalSuccessInner.classList.remove("modal__animation");
    closeModalSuccessButton.removeEventListener("click", closeSuccessModal);
    document.removeEventListener("click", windowSuccessClickHandler);
    document.removeEventListener("keydown", modalSuccessEscPressHandler);
  };

  modalForm.addEventListener("submit", function (evt) {
    evt.preventDefault();
    localStorageSet();
    modalPhoneInput.value = "";
    modalNameInput.value = "";
    openSuccessModal();
  });


  if (closeModalSuccessButton) {
    closeModalSuccessButton.addEventListener("click", closeSuccessModal);
  }

  // Local storage

  let isStorageSupport = true;
  let storage = "";

  try {
    storage = localStorage.getItem("login");
  } catch (err) {
    isStorageSupport = false;
  }

  const localStorageSet = (evt) => {
    if(!modalNameInput || !modalPhoneInput) {
      evt.preventDefault();
      modalNameInput.setCustomValidity("Нужно ввести имя кириллицей");
      modalPhoneInput.setCustomValidity("Нужно ввести телефон");
    } else {
      if(isStorageSupport) {
        localStorage.setItem("login", modalNameInput.value);
      }
    }
    modalNameInput.reportValidity();
    modalPhoneInput.reportValidity();
  };

  const inputFocus = () => {
    if (storage) {
      modalNameInput.value = storage;
      modalPhoneInput.focus();
    } else {
      modalNameInput.focus();
    }
  };


})();

/******/ })()
;