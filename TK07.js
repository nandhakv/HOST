const soap = require('soap');

const url = 'http://your-soap-service-url?wsdl'; // replace with your SOAP service URL
const args = {
  Input_Data: {
    CLOSING_DATE: '2023-04-08',
    CLOSING_TIME: '12:29:20',
    PLANT_CODE: '3102',
    TANK_NO: 'S007',
    MATERIAL: '',
    TANK_DIP: '9546',
    WATER_DIP: '0',
    DENSITY: '545',
    MATERIAL_TEMP: '28',
    VAPOUR_TEMP: '37',
    VAPOUR_PRESSURE: '5.16',
    EVENT_ID: '3102200016',
    USERNAME: 'PIDOTECH',
  },
};

soap.createClientAsync(url).then((client) => {
  return client.Tank_Closing_Data_Input_MT(args);
}).then((result) => {
  console.log(result);
}).catch((err) => {
  console.error(err);
});
