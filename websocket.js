const ModbusRTU = require("modbus-serial");
const WebSocket = require("ws");

const modbusHost = "127.0.0.1";
const modbusPort = 502;
const tanks = {
  tank1: [0, 2, 4, 6, 8],
  tank2: [10, 12, 14, 16, 18],
  tank3: [20, 22, 24, 26, 28],
  tank4: [30, 32, 34, 36, 38],
};

const wss = new WebSocket.Server({ port: 8082 });
console.log("WebSocket server started");

let modbusClient = new ModbusRTU();
let intervalId;

function connectModbus() {
  modbusClient
    .connectTCP(modbusHost, { port: modbusPort })
    .then(() => {
      console.log("Connected to Modbus PLC");
      startPolling();
    })
    .catch((err) => {
      console.error("Error connecting to Modbus PLC:", err);
      setTimeout(connectModbus, 1000);
    });
}

function readFloatValues(tank) {
  return Promise.all(
    tanks[tank].map((addr) => modbusClient.readHoldingRegisters(addr, 2))
  )
    .then((results) =>
      results.map((result) => {
        if (result.err) {
          console.error(`Error reading from PLC for ${tank}:`, result.err);
          return null;
        }
        return result.buffer.readFloatBE(0).toFixed(2);
      })
    )
    .catch((err) => {
      console.error(`Error reading from PLC for ${tank}:`, err);
      return Array(tanks[tank].length).fill(null);
    });
}

function sendData() {
  const data = {};
  Promise.all(Object.keys(tanks).map((tank) => readFloatValues(tank)))
    .then((values) => {
      Object.keys(tanks).forEach((tank, index) => {
        data[tank] = values[index];
      });
      const jsonData = JSON.stringify(data);
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(jsonData);
        }
      });
    })
    .catch((err) => {
      console.error("Error sending data:", err);
    });
}

function startPolling() {
  sendData(); // Initial send
  intervalId = setInterval(sendData, 1000); // Send data every second
}

wss.on("close", () => {
  console.log("WebSocket server stopped");
  clearInterval(intervalId);
});

connectModbus();
