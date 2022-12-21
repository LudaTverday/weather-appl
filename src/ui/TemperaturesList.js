export class TemperatureList {
    #listOutputElem;
    #cityOutputElem;
    constructor(params) {
        this.#listOutputElem = document.getElementById(params.idLIst);
        this.#cityOutputElem = document.getElementById(params.idCity);
    }
    showTemperatures(dataObj) {
        console.log(dataObj);
        const arrayData = dataObj.dataObjects;
        this.#cityOutputElem.innerHTML = `${dataObj.city}`;
       console.log(arrayData);
       this.#listOutputElem.innerHTML = `${arrayData}`;
       // this.#listOutputElem.innerHTML = this.getTemperaturAndHour(arrayData);
        console.log(this.getTemperaturAndHour(arrayData));
    }
    getTemperaturAndHour(array) {
       // console.log(array.length);
       let arrayList = array.map(cur => {
        console.log(cur)
          return  `<ul class="dataList">
            <li>Hour:${cur.hour}</li>
            <li>Temp:${cur.temperature}</li>
            </ul>`
     } )
        return arrayList.join('');
    }

    // getHourAndTemperature(array) {
    //     const listArray = array.map(cur => 
    //        `<div>${cur.date}</div>
    //         <div>${cur.hour}</div>
    //         <div>${cur.temperature_2m}</div>`
    //     )
    //     //console.log(listArray);
    //     return listArray.join('');
    // }
}

/*
return `<div>Date:${cur.date}</div>
             <div>Hours:${cur.hour}</div>
             <div>Temperature:${cur.temperature}</div>`
        }).join('')}
function getDate(objects){
    return objects.map(obj =>{
        `<div>${obj.date}
        <div>${getHourAndTemperature(objects)}</div>
        </div>`
    }).join('');
}*/
function getHourAndTemperature(array) {
    const listArray = array.map(cur => {
        console.log(cur.hour)
        return `<div>${cur.date}</div>
        <div>${cur.hour}</div>
        <div>${cur.temperature_2m}</div>`
    })
    //console.log(listArray);
    return listArray.join('');




    return objects.map(obj => {
        `<div>${obj.hour}</div>
        <div>${obj.temperature}</div>`
    }), join('')
}