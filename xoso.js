const TIME_DELAY = 3000;
const ROLLER_AUDIO = document.getElementById("roller");
const JACKPOT_AUDIO = document.getElementById("jackpot");
const XOSO_AUDIO = document.getElementById("audioXoSo");

function playAudio(x) {
  x.play();
}

function pauseAudio(x) {
  x.pause();
}

function IsNumeric(n) {
  return !isNaN(n);
}

function linkify(text) {
  let urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
  return text.replace(urlRegex, function (url) {
    return '<a href="' + url + '">' + url + "</a>";
  });
}

function spin() {
  playAudio(XOSO_AUDIO);
  let listNameDOM = document.getElementById("listName");
  let listName = removeEmptyLine(String(listNameDOM.value));
  listNameDOM.value = listName;
  let result = document.getElementById("result");
  let numRandOne = numRandTwo = numRandThree = numRandFour = "";
  if (listName !== "") {
    playAudio(ROLLER_AUDIO);
    let lines = listName.split("\n");
    interval = setInterval(function () {
      // Lay ngau nhien 4 ten
      numRandOne = getRandomWithOneExclusion(lines.length, 0, 0, 0);
      numRandTwo = getRandomWithOneExclusion(lines.length, numRandOne, 0, 0);
      numRandThree = getRandomWithOneExclusion(lines.length, numRandOne, numRandTwo, 0);
      numRandFour = getRandomWithOneExclusion(lines.length, numRandOne, numRandTwo, numRandThree);
      result.innerHTML = "<span>" + lines[numRandOne] + "</span><span>" + lines[numRandTwo] + "</span><span>" + lines[numRandThree] + "</span><span>" + lines[numRandFour] + "</span>";
    }, 50);
    setTimeout(function () {
      clearInterval(interval);
      pauseAudio(ROLLER_AUDIO);
      playAudio(JACKPOT_AUDIO);
      // Xoa ten trung
      listName = removeEmptyLine(listName.replace(lines[numRandOne], ""));
      listName = removeEmptyLine(listName.replace(lines[numRandTwo], ""));
      listName = removeEmptyLine(listName.replace(lines[numRandThree], ""));
      listName = removeEmptyLine(listName.replace(lines[numRandFour], ""));
      // Cap nhat lai list
      listNameDOM.value = listName;
    }, TIME_DELAY);
  } else {
    let numLow = parseFloat(document.getElementById("lownumber").value);
    let numHigh = parseFloat(document.getElementById("highnumber").value);
    let adjustedHigh = parseFloat(numHigh) - parseFloat(numLow) + 1;

    if (IsNumeric(numLow) && IsNumeric(numHigh) && numLow <= numHigh && numLow != "" && numHigh != "") {
      playAudio(ROLLER_AUDIO);
      interval = setInterval(function () {
        let numRandOne =
          Math.floor(Math.random() * adjustedHigh) + parseFloat(0);
        result.innerHTML = "<span>" + numRandOne + "</span>";
      }, 50);
      setTimeout(function () {
        clearInterval(interval);
        pauseAudio(ROLLER_AUDIO);
        playAudio(JACKPOT_AUDIO);
      }, TIME_DELAY);
    } else {
      result.innerHTML = "Vui lòng nhập lại số...";
    }
  }
}

function getRandomWithOneExclusion(lengthOfArray, indexToExcludeOne, indexToExcludeTwo, indexToExcludeThree){

  var rand = null;  //an integer

    while(rand === null || rand === indexToExcludeOne || rand == indexToExcludeTwo || rand == indexToExcludeThree){
      rand = Math.round(Math.random() * (lengthOfArray - 1));
    }

  return rand;
}

function removeEmptyLine(text) {
  return text.replace(/(\r?\n)\s*\1+/g, '$1').trim();
}

function isRandomChecked(e) {
  if (e.checked === true) {
    document.getElementById("listName").value = '';
    document.getElementById("listName").disabled = true;
  } else {
    document.getElementById("listName").disabled = false;
  }
}

window.onload = function () {
  document.addEventListener("keydown", function (event) {
    if (event.keyCode == "32") {
      spin();
    }
  });
};
