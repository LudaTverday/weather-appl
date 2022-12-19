export class WeatherDataProcessor {
    #cityGeoCodes;
    constructor(){
        this.#cityGeoCodes = [{city: "Rehovot", latitude: 31.046, longitude: 34.851},
        {}]// TODO fill this array from internet
    }
getData(requestObject){
    //{city, dateFrom, dateTo, hoursFrom, hoursTo}
    const url = this.getUrl(requestObject);
    const promiseResponse = fetch(url);
    return this.processData(promiseResponse.then(response => response.json()));

}
getUrl(requestObj){
    //TODO creates url for request and returrns one
}
processData(promiseData){
    return promiseData(data => {
        //todo
        //return {city, objects:[{data, hour, temperature},...] }
    })
}
}