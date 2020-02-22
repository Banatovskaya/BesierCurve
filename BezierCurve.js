"use strict";

var canvas1 = document.querySelectorAll("canvas")[0];
var canvas2 = document.querySelectorAll("canvas")[1];
var context1 = canvas1.getContext("2d"); //задумка чтоб на этот контекст вынести статичные рисунки пока не использовала
var context2 = canvas2.getContext("2d");
let btn = document.querySelectorAll("button")[0];
let pointQuantity = document.querySelector("input");
let param = document.querySelector("#param");
//let img;
//var a = param.childNodes;// getting childNodes
let point = [];
point[0] = document.querySelectorAll(".point")[0];
point[1] = document.querySelectorAll(".point")[1];
let flgMouseDown = false;
let start = document.querySelectorAll("button")[1];
let errDistanceX = 45; // margin-left for canvas;
let errDistanceY = 45; // margin-top for canvas
let interval = 0.001;
let pointMove;

context1.strokeStyle = "red";
context1.strokeRect(0, 0, 800, 600);
context2.strokeStyle = "green";
context2.strokeRect(5, 5, 990, 790);

let q = 0;
btn.addEventListener("click", function (event) {
   let target = event.target;
   target.style.backgroundColor = "red";
   let q = pointQuantity.value;
   if (q < 2) {
      alert("введите число более 1");
   };
   for (let i = 2; i < q; i++) {
      point[i] = document.createElement("button");
      point[i].textContent = i + 1;
      point[i].classList.add("point");
      point[i].style.left = `${70*(i+1)}px`;
      point[i].style.top = `${80*(i+1)}px`;
      param.appendChild(point[i]);
   };
});


param.addEventListener("mousedown", function (e) {
   flgMouseDown = true;
   let target = pointMove = e.target;
   if (target.classList == "point") {
      target.style.backgroundColor = "green";
   }
}, {
   once: false
});

canvas2.addEventListener("mousemove", function (e) {
   if (flgMouseDown) {
      clearInterval(timerMoveLine);

      let x = e.clientX;
      let y = e.clientY;
      pointMove.style.left = `${x}px`;
      pointMove.style.top = `${y}px`;
      requestAnimationFrame(function (time) {
         clearContext2();
         //   countArrMainPoint(point); // paint main line than it move
         let mainPoint = countArrMainPoint(point); // paint support line than it move
         countSupportLine(mainPoint, int);
         countFunction(mainPoint);
         if (flgStart == true && flgCountFinish == false) {
            let mainPoint = countArrMainPoint(point); // paint support line than it move
            countSupportLine(mainPoint, int); // paint support line than it move
            count();
         }
      });

   };
   e.preventDefault();

}, {
   once: false
});

document.addEventListener("mouseup", function (e) {
   flgMouseDown = false;
   e.preventDefault();
}, {
   once: false
});

function draw(arr, lineWidth) { // добавить через requestAnimationFrame
   let color = {
      0: "PaleTurquoise",
      1: "DarkSalmon",
      2: "SkyBlue",
      3: "Lavender",
      4: "gray",
      5: "Goldenrod"
   };
   context2.beginPath();
   context2.lineWidth = lineWidth;
   let col;
   if (arr.length > 7) {
      arr.length % 2 == 0 ? col = 0 : col = 3;
   } else {
      col = arr.length - 2
   };
   context2.strokeStyle = color[col];
   context2.moveTo(arr[0].x, arr[0].y);
   for (let i = 1; i < arr.length; i++) {
      context2.lineTo(arr[i].x, arr[i].y);
   };
   context2.stroke();
};

function drawPoint(x, y) { // добавить через requestAnimationFrame
   context2.beginPath();
   context2.arc(x, y, 6, 0, Math.PI * 2);
   context2.fillStyle = "red";
   context2.fill();
}

//koordinates of 1-st points
function countArrMainPoint(arr) {
   let newPoint = [];
   let obj = {};
   let x, y;
   for (let i = 0; i < arr.length; i++) {
      obj.x = +(arr[i].style.left.slice(0, -2)) - errDistanceX;
      obj.y = +arr[i].style.top.slice(0, -2) - errDistanceY;
      newPoint[i] = Object.assign({}, obj);
   }
   draw(newPoint, 3);
   return newPoint;
};

function clearContext2() {
   context2.clearRect(5, 5, 800, 600);
}


let int = interval;
let flgCountFinish = false;
let timerMoveLine;

function supportLineAnimation(arr) {

   timerMoveLine = setInterval(function moveLine() {
      clearContext2();
      countArrMainPoint(point);
      drawFuncion(f);
      console.log("4444")
      countSupportLine(arr, int);
      if (int < 1) {
         int = Math.round((int + interval) * 1000) / 1000;
         if (int >= 1) {
            int = 1;
            clearInterval(timerMoveLine);
            flgCountFinish = true;
         }
      }
   }, 10);
}

// koordinates for support lines
function countSupportLine(arr, int) {
   let nextPoint = [];
   let obj = {};
   for (let i = 0; i < arr.length - 1; i++) {
      // distance betveen 2 point * interval
      obj.x = Math.round(((arr[i + 1].x - arr[i].x) * int + arr[i].x) * 100) / 100;
      obj.y = Math.round(((arr[i + 1].y - arr[i].y) * int + arr[i].y) * 100) / 100;
      nextPoint[i] = Object.assign({}, obj);
   };
   if ((arr.length) > 2) {
      draw(nextPoint, 2)
      countSupportLine(nextPoint, int);

   } else {
      let x = nextPoint[0].x;
      let y = nextPoint[0].y;
      drawPoint(x, y);
   };
};
let f = [];

function countFunction(array) {
   let d = 0;
   let i = 0;
   for (let i = 0;; i++) {
      f[i] = Object.assign({}, paint(array, d));
      d = Math.round((d + 0.01) * 100) / 100;
      if (d >= 1) break;
   }
   drawFuncion(f);
}


let o = {};

function paint(arr, d) {

   let nextPoint = [];
   let obj = {};
   //  let a;
   for (let i = 0; i < arr.length - 1; i++) {
      // distance betveen 2 point * interval
      obj.x = Math.round(((arr[i + 1].x - arr[i].x) * d + arr[i].x) * 100) / 100;
      obj.y = Math.round(((arr[i + 1].y - arr[i].y) * d + arr[i].y) * 100) / 100;
      // obj.x = (arr[i + 1].x - arr[i].x) * d + arr[i].x;
      //   obj.y = (arr[i + 1].y - arr[i].y) * d + arr[i].y;
      nextPoint[i] = Object.assign({}, obj);

   };
   if ((arr.length) > 2) {
      paint(nextPoint, d);
   } else {
      o.x = nextPoint[0].x;
      o.y = nextPoint[0].y;

   }
   return (o);
}

function drawFuncion(arr) { // добавить через requestAnimationFrame
   context2.beginPath();
   context2.lineWidth = 3;
   context2.strokeStyle = "blue";
   context2.moveTo(point[0].x, point[0].y);
   for (let i = 0; i < arr.length; i++) {
      context2.lineTo(arr[i].x, arr[i].y);
   };
   context2.stroke();
}

function count() {
   let mainPoint = countArrMainPoint(point);
   countFunction(mainPoint);
   supportLineAnimation(mainPoint);
};

let flgStart = false;
start.addEventListener("click", function (event) {

   flgStart = !flgStart;
   if (flgStart == true) {
      count();
   } else {
      clearInterval(timerMoveLine);
      console.log(timerMoveLine)
   }

   console.log(flgStart)
});