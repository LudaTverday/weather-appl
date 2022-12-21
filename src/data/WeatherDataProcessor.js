export class WeatherDataProcessor {
    #cityGeoCodes;
    constructor() {
        this.#cityGeoCodes = [{ city: "Eilat", latitude: 29.5577, longitude: 34.9519 },
        { city: "Tel Aviv-Yafo", latitude: 32.0853, longitude: 34.7818 }, { city: "Jerusalem", latitude: 31.7683, longitude: 35.2137 },
        { city: "Haifa", latitude: 32.7940, longitude: 34.9818 }, { city: "Ashdod", latitude: 31.8044, longitude: 34.6553 },
        { city: "Netanya", latitude: 32.3215, longitude: 34.8532 }]
    }
    getData(requestObject) {
        const url = this.getUrl(requestObject);
        const promiseResponse = fetch(url);
        return this.processData(promiseResponse.then(response => response.json()), requestObject);
    }
    getUrl(requestObj) {
        const city = requestObj.city;
        const i = this.#cityGeoCodes.reduce((res, object, index) => {
            if (object.city === city) {
                res = index;
            }
            return res;
        }, -1)
        const baseUrl = "https://api.open-meteo.com/v1/gfs?";
        const baseParams = "&hourly=temperature_2m&timezone=IST&";
        const url = `${baseUrl}latitude=${this.#cityGeoCodes[i].latitude}&longitude=${this.#cityGeoCodes[i].longitude}${baseParams}start_date=${requestObj.dayFrom}&end_date=${requestObj.dayTo}`;
        return url;
    }
    processData(promiseData, requestObject) {
        const hourFromForm = requestObject.hourFrom;
        const hourToForm = requestObject.hourTo;
     const promDataAr =  promiseData.then(data =>            
        data.hourly.time.map((cur, index) => {            
              return {
                    date: cur.slice(0, 10),
                    hour: cur.slice(-5), 
                    temperature: data.hourly.temperature_2m[index]
                }            
        }))
       return promDataAr.then(data => data.filter(cur => {
                let hour = +cur.hour.slice(0,2);
                return hour >=hourFromForm && hour<=hourToForm
            }))
        
}


