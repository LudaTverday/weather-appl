import { showErrorMessage } from "./erroreMessage.js";
export class DataForm {
    #formElement;
    #formInputElements;
    #dateFromElement;
    #dateToElement;
    #hourFromElement;
    #hourToElement;
    #errorElement;
    constructor(params) {
        this.#formElement = document.getElementById(params.idForm);
        this.#formInputElements = document.querySelectorAll(`#${params.idForm} [name]`)
        this.#dateFromElement = document.getElementById(params.idDateFrom);
        this.#dateToElement = document.getElementById(params.idDateTo);
        this.#hourFromElement = document.getElementById(params.idHourFrom);
        this.#hourToElement = document.getElementById(params.idHourTo);
        this.#errorElement = document.getElementById(params.idErrorMessage);
        this.validInputDateFromTo();
        this.validInputHours();
    }
    addHandler(processFun) {
        this.#formElement.addEventListener("submit", (event) => {
            event.preventDefault();
            console.log("submitted");
            const arrInputElem = Array.from(this.#formInputElements);
            const formData = arrInputElem.reduce((inputData, field) => {
                inputData[field.name] = field.value;
                return inputData;
            }, {})
            console.log(formData);
            processFun(formData);
        })
    }
    validInputDateFromTo() {
        let dateFrom, yearFrom, monthFrom, dayFrom;
        let dateTo, yearTo, monthTo, dayTo;
        const message = "Date FROM must be least date TO";
        this.#dateFromElement.addEventListener("change", (event) => {
            dateFrom = this.#dateFromElement.value;
            console.log(dateFrom);
            yearFrom = +dateFrom.slice(3);
            monthFrom = +dateFrom.slice(5, 6);
            dayFrom = +dateFrom.slice(-1);
            if (dateFrom && dayFrom > dayTo)
                showErrorMessage(this.#errorElement, message);
        })
        this.#dateToElement.addEventListener("change", (event) => {
            dateTo = this.#dateToElement.value;
            yearTo = +dateTo.slice(3);
            monthTo = +dateTo.slice(5, 6);
            dayTo = +dateTo.slice(-1);
            if (dateTo && dayFrom > dayTo)
                showErrorMessage(this.#errorElement, message);
        })
    }
    validInputHours() {
        let hourFrom, hourTo;
        const message = "Hour FROM must be least hour TO";
        this.#hourFromElement.addEventListener("change", (event) => {
            hourFrom = +event.target.value;
            if (hourFrom && hourTo < hourFrom) {
                showErrorMessage(this.#errorElement, message);
            }
        })
        this.#hourToElement.addEventListener("change", (event) => {
            hourTo = +this.#hourToElement.value;
            if (hourTo && hourTo < hourFrom) {
                showErrorMessage(this.#errorElement, message);
            }
        })
    }
}