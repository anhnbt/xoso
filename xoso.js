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
  let listName = String(document.getElementById("listName").value);
  let result = document.getElementById("result");

  if (listName !== "") {
    playAudio(ROLLER_AUDIO);
    let lines = listName.split("\n");
    interval = setInterval(function () {
      let numRandOne = Math.round(Math.random() * lines.length);
      // let numRandTwo = Math.round(Math.random() * lines.length);
      // result.innerHTML = "<span>" + linkify(lines[numRandOne]) + "</span><span>" + linkify(lines[numRandTwo]) + "</span>";
      result.innerHTML = "<span>" + linkify(lines[numRandOne]) + "</span>";
    }, 50);
    setTimeout(function () {
      clearInterval(interval);
      pauseAudio(ROLLER_AUDIO);
      playAudio(JACKPOT_AUDIO);
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
        // let numRandTwo =
        //   Math.floor(Math.random() * adjustedHigh) + parseFloat(0);
          // result.innerHTML =  "<span>" + numRandOne + "</span><span>" + numRandTwo + "</span>";
          result.innerHTML =  "<span>" + numRandOne + "</span>";
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

function isRandomChecked(e) {
    if (e.checked === true) {
        document.getElementById("listName").value = '';
        document.getElementById("listName").disabled = true;
    } else {
        document.getElementById("listName").disabled = false;
    }
}

window.onload = function() {
  document.addEventListener("keydown", function (event) {
    if (event.keyCode == "32") {
      spin();
    }
  });
};
