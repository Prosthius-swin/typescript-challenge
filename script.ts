// Import stylesheets
import { Colours, ColoursHelper } from './models/colours.enum.js';
import { BodyParts, BodyPartsHelper } from './models/bodyParts.enum.js';
import { SpinRecord } from './models/spin.js';

// used to make the spinner spin
let spinnerCounter = 0;

// container for the spinner 
let spinnerCycle;

// used to keep track of how many spins have been requested
let spinCount = 1;

// used to keep track of the results of the spin
let selectedColour: string;
let selectedBodyPart: string;

// use to store the results of spins
let spinHistoryArray: Array<SpinRecord> = [];

//let historyTableBody: string;

const colourDiv = document.getElementById('colourResult');

let getAmountCounter: number = 0;

// sets up an array of strings to represent the colours from the enum
let coloursArray: Array<string> = [];
for (let colour in Colours) {
  if (isNaN(Number(colour))) {
    coloursArray.push(colour);
  }
}

const bodyPartP = document.getElementById('bodyPartText');

// TODO see above and create an array of strings to store the bodypart strings from the enum
let bodyPartsArray: Array<string> = [];
for (let bodyPart in BodyParts) {
  if (isNaN(Number(bodyPart))) {
    bodyPartsArray.push(bodyPart);
  }
}


// TODO add eventlistners to buttons
const spinBtn = <HTMLButtonElement> document.getElementById('spin-btn');
spinBtn.addEventListener('click', () => spinBtnHandler(2000, 100)); 

const statsBtn = <HTMLButtonElement> document.getElementById('stats-btn');
statsBtn.addEventListener('click', () => statsBtnHandler());

// TODO handles the spin button click
// time in ms, interval in ms
function spinBtnHandler(time: number, interval: number) {
  
  // start spinner rotating through colours
  spinnerCycle = setInterval(() => spinSpinners(), interval);

  // TODO randomly select colour from array
  let colourIndex: number = Math.floor(Math.random() * 4);
  selectedColour = coloursArray[colourIndex];

  // TODO randomly select bodyPart from array
  let bodyPartIndex: number = Math.floor(Math.random() * 4);
  selectedBodyPart = bodyPartsArray[bodyPartIndex];

  spinBtn.disabled = true;
  
  // set timer to stop the spinners rotating
  setTimeout(() => stopSpinners(), time);
}

// rotates between the colours in Colours.enum.  
function spinSpinners() {
  spinnerCounter++;

  colourDiv.style.backgroundColor = coloursArray[spinnerCounter%coloursArray.length];

  bodyPartP.innerHTML = bodyPartsArray[spinnerCounter%bodyPartsArray.length];
}

// stops spinner after time parameter, time in ms
function stopSpinners() {
  clearInterval(spinnerCycle)
  // TODO set colourDiv and bodyPartP to the randomly spun results
  colourDiv.style.backgroundColor = selectedColour;
  bodyPartP.innerHTML = selectedBodyPart;

  spinBtn.disabled = false;
  addToHistory();

  spinCount++;
}


// TODO add the newly spun result to the history table
function addToHistory() {
  spinHistoryArray.push(new SpinRecord(selectedColour as unknown as Colours, selectedBodyPart as unknown as BodyParts, spinCount));

  let historyTableBody: string = '';

  for (let i in spinHistoryArray) {
    historyTableBody += `<tr>
                            <td>${spinHistoryArray[i].num}</td>
                            <td>${spinHistoryArray[i].colour}</td>
                            <td>${spinHistoryArray[i].bodyPart}</td>
                          </tr>`;
  }
  (document.getElementById('historyTableBody') as HTMLOptionElement).innerHTML = historyTableBody;
}

function statsBtnHandler() {
  // TODO set the statsResults div innerHTML to the amount and last spun number that the user has chosen
  // eg. Red LeftHand spun 10 times
  //     Red LeftHand last spun at num 23

  getAmountCounter = 0;

  let statsResults: string = '';
  let colourSelectorValue: string = (document.getElementById('colourSelect') as HTMLInputElement).value;
  let bodyPartSelectorValue: string = (document.getElementById('bodyPartSelect') as HTMLInputElement).value;
  
  if (getLastSpun(colourSelectorValue, bodyPartSelectorValue) === 0) {
    statsResults = `<p>${colourSelectorValue} ${bodyPartSelectorValue} spun ${getAmount(colourSelectorValue, bodyPartSelectorValue)} time(s)</p>
                    <p>${colourSelectorValue} ${bodyPartSelectorValue} has not been spun yet`;
  } else {
    statsResults = `<p>${colourSelectorValue} ${bodyPartSelectorValue} spun ${getAmount(colourSelectorValue, bodyPartSelectorValue)} times</p>
                    <p>${colourSelectorValue} ${bodyPartSelectorValue} last spun at num ${getLastSpun(colourSelectorValue, bodyPartSelectorValue)}</p>`;
  }


  (document.getElementById('statsResults') as HTMLOptionElement).innerHTML = statsResults;
}

// TODO returns the amount of times the combination of selected of colour and body part have been spun
function getAmount(colour, bodyPart): number {
  let numTimesSpun: number = 0;

    for(let i = 0; i < spinHistoryArray.length; i++) {
      if(spinHistoryArray[i].colour === ColoursHelper.get(colour) && spinHistoryArray[i].bodyPart === BodyPartsHelper.get(bodyPart)) {
        numTimesSpun++;
      }
    }
  return numTimesSpun;
}

// TODO return the last num which the combination of selected of colour and body part have been spun
function getLastSpun(colour, bodyPart): number {
  let lastSpun: number = 0;
  let arrPosition: number;

  for(let i = spinHistoryArray.length; i > 0; i--) {
    arrPosition = i - 1;

    if(spinHistoryArray[arrPosition].colour === ColoursHelper.get(colour) && spinHistoryArray[arrPosition].bodyPart === BodyPartsHelper.get(bodyPart)) {
      lastSpun = spinHistoryArray[arrPosition].num;
      break;
    }
  }
  return lastSpun;
}