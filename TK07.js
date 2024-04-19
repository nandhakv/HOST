const url = 'http://your-soap-service-url'; // replace with your SOAP service URL
const headers = {
  'Content-Type': 'text/xml; charset=utf-8',
  'Authorization': 'Basic ' + btoa(username + ':' + password)
};

const body = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tank="http://Tank_Closing_Data_WS">
    <soapenv:Header/>
    <soapenv:Body>
        <tank:Tank_Closing_Data_Input_MT>
            <Input_Data>
                <CLOSING_DATE>2023-04-08</CLOSING_DATE>
                <CLOSING_TIME>12:29:20</CLOSING_TIME>
                <PLANT_CODE>3102</PLANT_CODE>
                <TANK_NO>S007</TANK_NO>
                <MATERIAL> </MATERIAL>
                <TANK_DIP>  9546</TANK_DIP>
                <WATER_DIP>0</WATER_DIP>
                <DENSITY>545</DENSITY>
                <MATERIAL_TEMP>  28</MATERIAL_TEMP>
                <VAPOUR_TEMP>  37</VAPOUR_TEMP>
                <VAPOUR_PRESSURE>5.16</VAPOUR_PRESSURE>
                <EVENT_ID>3102200016</EVENT_ID>
                <USERNAME>PIDOTECH</USERNAME>
            </Input_Data>
        </tank:Tank_Closing_Data_Input_MT>
    </soapenv:Body>
</soapenv:Envelope>`;

fetch(url, { method: 'POST', headers, body })
  .then(response => response.text())
  .then(text => console.log(text))
  .catch(err => console.error(err));
