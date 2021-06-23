// RADIO BUTTONS
const radioHTMLCollection = document.getElementsByClassName("radio");
const radioButtons = [...radioHTMLCollection];

radioButtons[2].classList.add("radio--selected");
let radioButtonSelected = "insertion";

radioButtons.forEach((radioButton) => {
  radioButton.addEventListener("click", (event) => radioButtonHandler(event));
});

const clearStyleFromList = (array, className) => {
  array.forEach((element) => element.classList.remove(className));
};

const radioButtonHandler = (event) => {
  clearStyleFromList(radioButtons, "radio--selected");
  radioButtonSelected = event.target.innerText.toLowerCase();
  event.target.classList.add("radio--selected");
};

// START-STOP BUTTONS
const startStopHTMLCollection = document.getElementsByClassName("start-stop");
const startStopButtons = [...startStopHTMLCollection];

let startStopButton = "";

startStopButtons.forEach((button) => {
  button.addEventListener("click", (event) => startStopButtonHandler(event));
});

const startStopButtonHandler = (event) => {
  const buttonName = `${event.target.innerText.toLowerCase()}--radio`;
  clearStyleFromList(startStopButtons, "sort--radio--selected");
  clearStyleFromList(startStopButtons, "stop--radio--selected");
  event.target.classList.add(`${buttonName}--selected`);
  startStopButton = buttonName;
};
