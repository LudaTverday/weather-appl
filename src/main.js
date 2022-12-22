import { DataForm } from "./ui/DataForm.js";
import { WeatherDataProcessor } from "./data/WeatherDataProcessor.js";
import { TemperatureList } from "./ui/TemperaturesList.js";
import { Citis } from "./ui/optionsCiti.js";
import { getminMaxDate } from "./data/minMaxDate.js";

const weatherProcessor = new WeatherDataProcessor();


const dataForm = new DataForm({
   idForm: "form-data", idDateFrom: "dayFrom", idDateTo: "dayTo", idHourFrom: "hourFrom",
   idHourTo: "hourTo", idErrorMessage: "error-message", minMaxDays: getminMaxDate()
});

const cityOptions = new Citis("city");
const temperatureList = new TemperatureList({ idLIst: "list-output", idCity: "city-output" });

cityOptions.setCitiesOptions(weatherProcessor.getCities());
dataForm.addHandler(async (dataFromForm) => {
   const promiseData = weatherProcessor.getData(dataFromForm);
   console.log(promiseData);
   temperatureList.showTemperatures(await promiseData, dataFromForm);
}
)







