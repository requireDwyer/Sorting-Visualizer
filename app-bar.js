const barContainer = document.querySelector(".container__bar");
const barHeights = [400, 100, 300, 150, 50, 100, 300, 250, 320, 380, 210, 453, 293, 134, 123, 239];
let bars = [];

function drawBars() {
  for (let i = 0; i < bars.length; i++) {
    bars[i].classList.add("bar");
    barContainer.appendChild(bars[i]);
    bars[i].style.height = `${barHeights[i]}px`;
  }
}

function updateBars() {
  for (let i = 0; i < barHeights.length; i++) {
    bars[i] = document.createElement("div");
  }
}

function clearBars() {
  for (let i = 0; i < bars.length; i++) {
    barContainer.removeChild(bars[i]);
  }
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function bubbleSort(array) {
  let end = array.length - 1;
  let sorted = false;
  while (!sorted) {
    sorted = true;
    for (let j = 0; j < end; j++) {
      if (array[j] > array[j + 1]) {
        sorted = false;
        await swap(array, j, j + 1);
        clearBars();
        updateBars();
        drawBars();
      }
    }
    end--;
    if (sorted === true) return array;
  }
}

async function swap(array, indexOne, indexTwo) {
  await sleep(250);
  const temp = array[indexOne];
  array[indexOne] = array[indexTwo];
  array[indexTwo] = temp;
}

updateBars();
drawBars();
bubbleSort(barHeights);
console.log(barHeights);
