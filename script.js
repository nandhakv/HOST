function displayTime() {
  var currentTime = new Date();
  var timeString = currentTime.toLocaleTimeString();
  document.getElementById("time").innerHTML = timeString;
}

setInterval(displayTime, 1000);

var currentDate = new Date();
var day = currentDate.getDate();
var month = currentDate.getMonth() + 1;
var year = currentDate.getFullYear();

if (day < 10) {
  day = "0" + day;
}
if (month < 10) {
  month = "0" + month;
}

var formattedDate = day + "/" + month + "/" + year;
document.getElementById("date").innerHTML = formattedDate;

function home_btn() {
  window.location.href = "./home.html";
}

function tanks_btn() {
  window.location.href = "./tanks.html";
}

function sap_reports_btn() {
  window.location.href = "./sap-reports.html";
}

function reports_btn() {
  window.location.href = "./reports.html";
}

let tank1_params = [
  "primary_level",
  "secondary_level",
  "liqt_level",
  "vapt_level",
  "pressure_level",
];
let tank2_params = [
  "primary_level",
  "secondary_level",
  "liqt_level",
  "vapt_level",
  "pressure_level",
];
let tank3_params = [
  "primary_level",
  "secondary_level",
  "liqt_level",
  "vapt_level",
  "pressure_level",
];
let tank4_params = [
  "primary_level",
  "secondary_level",
  "liqt_level",
  "vapt_level",
  "pressure_level",
];

// Notification.requestPermission()
//         .then(permission =>{
//             if (permission === 'granted') {
//                 new Notification('Online')
//             }
//         })

function requestData() {
  const socket = new WebSocket("ws://localhost:8082");

  socket.onopen = function () {
    console.log("WebSocket connection established");
    socket.send("update");
  };

  socket.onmessage = function (event) {
    console.log("Received data:", event.data);
    const data = JSON.parse(event.data);
    Object.keys(data).forEach((tank) => {
      data[tank].forEach((value, index) => {
        const element = document.getElementById(`${tank}_params[${index}]`);
        if (element) {
          element.innerHTML = `${value}`;
        }
      });
    });
  };

  socket.onerror = function (error) {
    console.error("WebSocket error:", error);
  };

  socket.onclose = function (event) {
    console.log("WebSocket connection closed:", event);
  };
}

setInterval(requestData, 1000);
