import { showErrorMessage } from "./erroreMessage.js";
export class DataForm {
    #formElement;
    #formInputElements;
    #dateFromElement;
    #dateToElement;
    #hourFromElement;
    #hourToElement;
    #errorElement;
    #objMinMaxDay;
    #dateFrom;
    #dateTo;
    #hourTo;
    #hourFrom;
    constructor(params) {
        this.#formElement = document.getElementById(params.idForm);
        this.#formInputElements = document.querySelectorAll(`#${params.idForm} [name]`)
        this.#dateFromElement = document.getElementById(params.idDateFrom);
        this.#dateToElement = document.getElementById(params.idDateTo);
        this.#hourFromElement = document.getElementById(params.idHourFrom);
        this.#hourToElement = document.getElementById(params.idHourTo);
        this.#errorElement = document.getElementById(params.idErrorMessage);
        this.#objMinMaxDay = params.minMaxDays;
        this.setMinMaxDays(this.#objMinMaxDay);
        this.validInputDateFrom();
        this.validInputDateTo();
        this.validInputHourFrom();
        this.validInputHourTo();
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
    setMinMaxDays(objMinMaxDays){
        this.#dateFromElement.min = objMinMaxDays.minDay;
        this.#dateFromElement.max = objMinMaxDays.maxDay;
        this.#dateToElement.min = objMinMaxDays.minDay;
        this.#dateToElement.max = objMinMaxDays.maxDay;
    }
    validInputDateFrom() {
        const message = "Date FROM must be least date TO";
        this.#dateFromElement.addEventListener("change", (event) => {
            this.#dateFrom = this.#dateFromElement.value;
            if (this.#dateFrom && this.dateFrom > this.#dateTo)
                showErrorMessage(this.#errorElement, message);
        })}
    validInputDateTo(){
        const message = "Date FROM must be least date TO";
        this.#dateToElement.addEventListener("change", (event) => {
            this.#dateTo = this.#dateToElement.value;
            if (this.#dateTo && this.#dateFrom > this.#dateTo)
                showErrorMessage(this.#errorElement, message);
        })
    }
    validInputHourFrom() {
        const message = "Hour FROM must be least hour TO";
        this.#hourFromElement.addEventListener("change", (event) => {
            this.#hourFrom = +event.target.value;
            if (this.#hourFrom && this.#hourTo < this.#hourFrom) {
                showErrorMessage(this.#errorElement, message);
            }
        })}
    validInputHourTo(){
        const message = "Hour FROM must be least hour TO";
        this.#hourToElement.addEventListener("change", (event) => {
           this.#hourTo = +this.#hourToElement.value;
            if (this.#hourTo && this.#hourTo < this.#hourFrom) {
                showErrorMessage(this.#errorElement, message);
            }
        })
    }
}