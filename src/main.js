import { DataForm } from "./ui/DataForm.js";
import { WeatherDataProcessor } from "./data/WeatherDataProcessor.js";
import { TemperatureList } from "./ui/TemperaturesList.js";

const weatherProcessor = new WeatherDataProcessor();


const dataForm = new DataForm({idForm: "form-data", idDateFrom: "dayFrom", idDateTo: "dayTo", idHourFrom: "hourFrom",
idHourTo: "hourTo", idErrorMessage: "error-message" });


const temperatureList = new TemperatureList ({idLIst: "list-output",idCity: "city-output" });
dataForm.addHandler((dataFromForm) => {
   const promiseData = weatherProcessor.getData(dataFromForm);
    console.log(promiseData);
  promiseData.then(data => temperatureList.showTemperatures(data,dataFromForm));
  // temperatureList.showTemperatures(promiseData);
})







// //https://api.open-meteo.com/v1/gfs?latitude=31.0461&longitude=34.8516&hourly=temperature_2m&timezone=IST&start_date=2022-12-18&end_date=2023-01-03
// let latitude = 31.046;
// let longitude=34.851;
// let start_date="2022-12-18";
// let end_date="2022-12-18";
// const baseUrl = "https://api.open-meteo.com/v1/gfs?";
// const baseParams = "&hourly=temperature_2m&timezone=IST&";
// const url = `${baseUrl}latitude=${latitude}&longitude=${longitude}${baseParams}start_date=${start_date}&end_date=${end_date}`
// let promiseResponse = fetch(url);
// let promiseData = promiseResponse.then(response => response.json());
// let dataProcessing = promiseData.then(data => console.log(data.hourly.temperature_2m));
// //.then((response) => response.json())
//.then(data => console.log(data.hourly.temperature_2m))



/*function displayUserName (userName) {
    console.log(userName);
}
function getUserNameById(id,processFun) {
    setTimeout(function(id) {
        processFun("user" + "id")
    }, 5000, id);
}
getUserNameById(100,displayUserName);
console.log("waiting for result...it takes some time");
*/