const formElem = document.querySelector("form");

const nameInput = document.querySelector("#name");
const surnameInput = document.querySelector("#surname");
const adressInput = document.querySelector("#adress");
const phoneInput = document.querySelector("#phone");
const emailInput = document.querySelector("#email");

const employersRadios = document.querySelectorAll("[name = 'employer']");
const eployerOther = document.querySelector("#eployerOther");

const buttonElem = document.querySelector(".btn");
const messageElem = document.querySelector("#message");

// const ULR_POST_MEMBER =

const inputsValidation = () => {
  // INPUTS VALUES
  const nameValue = nameInput.value.trim();

  const employersChecked = Array.from(employersRadios).map(employer => {
    return employer.checked ? (employer = true) : false;
  });
  const employerOtherValue = eployerOther.value;

  // CONDITIONS
  let errors = [];

  nameValue.length < 2 && errors.push("imie za krótkie");
  !employersChecked.includes(true) &&
    employerOtherValue === "" &&
    errors.push("zaznacz pracodawcę");

  //RETURN
  return errors.length > 0 ? errors : null;
};

formElem.addEventListener("submit", event => {
  event.preventDefault();

  console.log(inputsValidation());

  //VALIDATION PRINT
  if (inputsValidation()) {
    messageElem.innerText = inputsValidation().join(", ");
    return;
  } else {
    messageElem.innerText = null;
  }

  //CREATE MEMBER DATA OBJECT
  const formData = new FormData(formElem);
  const memberObject = Object.fromEntries(formData);

  console.log(memberObject);

  //CLEAN INPUTS FIELDS
  nameInput.value = "";
  employersRadios.forEach(employer => (employer.checked = false));
  eployerOther.value = "";

  let xhr = new XMLHttpRequest();

  //POST MEMBER
  // fetch(URL_POST_MEMBER, {
  //     method: 'POST',
  //     headers: {
  //         "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify(memberObject)
  // })
  //     .then(res => res.json())
  //     .then(data => console.log(data))
  //     .catch(err => console.log(err))
});
