export class TemperatureList {
    #listOutputElem;
    #cityOutputElem;
    constructor(params) {
        this.#listOutputElem = document.getElementById(params.idLIst);
        this.#cityOutputElem = document.getElementById(params.idCity);
    }
    showTemperatures(dataObj, dataFromForm) {
       this.#cityOutputElem.innerHTML = `${dataFromForm.city}`;
        this.#listOutputElem.innerHTML = this.getTemperaturAndHour(dataObj);
    }
    getTemperaturAndHour(array) {
       let arrayList = array.map(cur => {
          return  `<ul class="dataList">
          <li>Day: ${cur.date}</li>
            <li>Hour: ${cur.hour}</li>
            <li>Temp: ${cur.temperature}&#8451;</li>
            </ul>`
     } )
        return arrayList.join('');
    }
}