const ModbusRTU = require("modbus-serial");

const modbusClient = new ModbusRTU();
const modbusHost = "127.0.0.1";
const modbusPort = 502;

modbusClient
  .connectTCP(modbusHost, { port: modbusPort })
  .then(() => {
    console.log("Connected to Modbus PLC");
  })
  .catch((err) => {
    console.error("Error connecting to Modbus PLC:", err);
  });

module.exports = { modbusClient };
