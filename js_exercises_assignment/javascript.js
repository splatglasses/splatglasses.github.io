function tickUp() {
  var counterSpan = document.getElementById("counter");
  var current = parseInt(counterSpan.textContent, 10);
  counterSpan.textContent = current + 1;
}

function tickDown() {
  var counterSpan = document.getElementById("counter");
  var current = parseInt(counterSpan.textContent, 10);
  counterSpan.textContent = current - 1;
}

function runForLoop() {
  var max = parseInt(document.getElementById("counter").textContent, 10);
  var result = "";
  for (var i = 0; i <= max; i++) {
    result += i + " ";
  }
  document.getElementById("forLoopResult").textContent = result.trim();
}

function showOddNumbers() {
  var max = parseInt(document.getElementById("counter").textContent, 10);
  var result = "";
  for (var i = 1; i <= max; i += 2) {
    result += i + " ";
  }
  document.getElementById("oddNumberResult").textContent = result.trim();
}

function addMultiplesToArray() {
  var max = parseInt(document.getElementById("counter").textContent, 10);
  var arr = [];
  for (var i = max; i >= 5; i--) {
    if (i % 5 === 0) {
      arr.push(i);
    }
  }
  console.log(arr);
}

function printCarObject() {
  var type = document.getElementById("carType").value;
  var mpg = document.getElementById("carMPG").value;
  var color = document.getElementById("carColor").value;
  var car = { cType: type, cMPG: mpg, cColor: color };
  console.log(car);
}

function loadCar(carNumber) {
  var carObj;
  if (carNumber === 1) {
    carObj = carObject1;
  } else if (carNumber === 2) {
    carObj = carObject2;
  } else if (carNumber === 3) {
    carObj = carObject3;
  }
  
  document.getElementById("carType").value = carObj.cType;
  document.getElementById("carMPG").value = carObj.cMPG;
  document.getElementById("carColor").value = carObj.cColor;
}

function changeColor(colorNumber) {
  var color;
  if (colorNumber === 1) {
    color = "red";
  } else if (colorNumber === 2) {
    color = "green";
  } else if (colorNumber === 3) {
    color = "blue";
  }
  document.getElementById("styleParagraph").style.color = color;
}
