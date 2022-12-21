export class WeatherDataProcessor {
    #cityGeoCodes;
    constructor() {
        this.#cityGeoCodes = [{ city: "Eilat", latitude: 29.5577, longitude: 34.9519 },
        { city: "Tel Aviv-Yafo", latitude: 32.0853, longitude: 34.7818 }, { city: "Jerusalem", latitude: 31.7683, longitude: 35.2137 },
        { city: "Haifa", latitude: 32.7940, longitude: 34.9818 }, { city: "Ashdod", latitude: 31.8044, longitude: 34.6553 },
        { city: "Netanya", latitude: 32.3215, longitude: 34.8532 }]
    }
    getData(requestObject) {
        //{city, dayFrom, dayTo, hourFrom, hourTo}
        const url = this.getUrl(requestObject);
        const promiseResponse = fetch(url);
        return this.processData(promiseResponse.then(response => response.json()), requestObject);
    }
    getUrl(requestObj) {
        //TODO creates url for request and returrns one
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
        const objects = [];
    //     promiseData.then(data =>            
    //        objects = data.hourly.time.reduce((res, cur, index) => {
    //             let hour = cur.slice(-5, -3);
    //             if (+hour >= hourFromForm && +hour <= hourToForm) {
    //                 res.push({
    //                     date: cur.slice(0, 10),
    //                     hour: cur.slice(-5), 
    //                     temperature: data.hourly.temperature_2m[index]
    //                 })
    //             }
    //         },[]
    //         ) //return {city, objects:[{data, hour, temperature},...] }
    // )    
        promiseData.then(data =>            
            data.hourly.time.forEach((cur, index) => {
                let hour = cur.slice(-5, -3);
                if (+hour >= hourFromForm && +hour <= hourToForm) {
                    objects.push({
                        date: cur.slice(0, 10),
                        hour: cur.slice(-5), 
                        temperature: data.hourly.temperature_2m[index]
                    })
                }
            }
            ) //return {city, objects:[{data, hour, temperature},...] }
    )
        console.log(objects);
        objects.forEach(cur => console.log(cur));
        return { city: requestObject.city, dataObjects: objects }
        
    }
}


/*
        
    }
}
promiseData.hourly[time].forEach((cur, index) => {
             objects.push ({data: cur.slice(9),
            hour: cur.slice(-4), temperature: data.temperature_2m[index]})
        })
        
        //return {city, objects:[{data, hour, temperature},...] }

const hourFromForm = requestObject.hourFrom;
       console.log(hourFromForm);
       const hourToForm = requestObject.hourTo;
       const arrayHoursTemperature = promiseData.then(data => {
       return data.hourly.time.reduce((res, cur, ind) => {
            let hour = cur.slice(-5);
            if(+hour>=hourFromForm&&+hour<=hourToForm){
                res.push({date: cur.slice(0,10),
                    hour: hour, temperature: data.hourly.temperature_2m[ind]})              

            }
            
           //return {city, objects:[{data, hour, temperature},...] }
       console.log(res);
        } , [])  

    } )
    return {city:requestObject.city, objects: arrayHoursTemperature}
    */