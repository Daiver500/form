(function () {

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
    closeModalButton.addEventListener("click", closeModalButton);
    modalMain.addEventListener("click", windowClickHandler);
    document.addEventListener("keydown", modalEscPressHandler);
  };

  const closeModal = () => {
    modalMain.classList.add("hidden");
    document.body.style.overflow = "";
    closeModalButton.removeEventListener("click", openModalButton);
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
