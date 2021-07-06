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
// RANGES
const speedRange = document.getElementById("sort-speed");
let delay = Number(speedRange.value);
speedRange.addEventListener("change", (event) => {
  delay = Number(event.target.value);
});
// SORTING
const barContainer = document.querySelector(".container__bar");
let bars = [];

const defaultColor = "#242c33";
const compareColor = "#f4c240";
// const swapColor = "#f49640";
const swapColor = "#E01E5A";
const semiSortedColor = "#97A926";
const completeColor = "#2eb67d";
const insertSwapColor = "#2E95B6";
const holeColor = "#2E54B6";
const smallestColor = "#F193C0";

function initializeBars(numberOfBars) {
  for (let i = 0; i < numberOfBars; i++) {
    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = `${getRandomNumberBetweenInteger(50, 450)}px`;
    bars.push(bar);
    barContainer.appendChild(bar);
  }
}

function getRandomNumberBetweenInteger(minimum, maximum) {
  return Math.round(Math.random() * (maximum - minimum) + minimum);
}

async function bubbleSort(array) {
  let end = array.length - 1;
  let sorted = false;
  while (!sorted) {
    sorted = true;
    for (let i = 0; i < end; i++) {
      await colorChangeDelay(array, [i, i + 1], compareColor);
      if (parseInt(array[i].style.height) > parseInt(array[i + 1].style.height)) {
        sorted = false;
        await colorChangeDelay(array, [i, i + 1], swapColor);
        swap(array, i, i + 1);
        await colorChangeDelay(array, [i, i + 1], swapColor);
      }
      removeColor(array, [i, i + 1]);
    }
    colorChange(array, [end], completeColor);
    end--;
  }
  for (let i = 0; i < end + 1; i++) {
    colorChange(array, [i], completeColor);
  }
}

async function selection(array) {
  for (let i = 0; i < array.length - 1; i++) {
    let minimum = i;
    for (let j = i + 1; j < array.length; j++) {
      colorChange(array, [minimum], smallestColor);
      await colorChangeDelay(array, [j], compareColor);
      removeColor(array, [j, minimum]);
      if (parseInt(array[j].style.height) < parseInt(array[minimum].style.height)) {
        minimum = j;
      }
    }
    await colorChangeDelay(array, [i, minimum], swapColor);
    swap(array, i, minimum);
    await colorChangeDelay(array, [i, minimum], swapColor);
    removeColor(array, [minimum]);
    colorChange(array, [i], completeColor);
  }
  colorChange(array, [array.length - 1], completeColor);
}

async function insertionSort(array) {
  colorChange(array, [0], semiSortedColor);
  for (let i = 1; i < array.length; i++) {
    let current = parseInt(array[i].style.height);
    let j = i;
    while (j > 0 && parseInt(array[j - 1].style.height) > current) {
      array[j].style.height = array[j - 1].style.height;
      j--;
    }
    array[j].style.height = `${current}px`;
  }
}

function colorChangeDelay(array, indexes, colorState) {
  return new Promise((resolve) => {
    indexes.forEach((index) => {
      array[index].style.backgroundColor = colorState;
    });
    setTimeout(() => {
      resolve();
    }, delay);
  });
}

function colorChange(array, indexes, colorState) {
  indexes.forEach((index) => {
    array[index].style.backgroundColor = colorState;
  });
}

function removeColor(array, indexes) {
  indexes.forEach((index) => {
    array[index].style.backgroundColor = defaultColor;
  });
}

function swap(array, indexOne, indexTwo) {
  const temp = array[indexOne].style.height;
  array[indexOne].style.height = array[indexTwo].style.height;
  array[indexTwo].style.height = temp;
}

initializeBars(0);
