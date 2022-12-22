export class Citis {
    #selectorElem;
    constructor(nameElem){
        this.#selectorElem = document.getElementById(nameElem);
    }
    setCitiesOptions(arrayCities){
        console.log(arrayCities);
        this.#selectorElem.innerHTML += this.getListCities(arrayCities);
    }
    getListCities(cities){
       const listCities = cities.map( cur => {
           return `<option id="option" value="${cur}">${cur}</option>`
        })
        return listCities.join('');
    }
   
}